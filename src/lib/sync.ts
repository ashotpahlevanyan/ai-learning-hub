// Optional cloud sync of progress through Supabase (auth + one row per user).
// Progress always lives in localStorage first; sync merges it with the user's row when signed in.
// Off unless VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set at build time.
import { useSyncExternalStore } from 'react';
import type { SupabaseClient, User } from '@supabase/supabase-js';
import { getState, replaceState, subscribe, type AppState } from './store';
import { mergeStates, sameProgress } from './merge';

const URL_ = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const KEY_ = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
export const syncConfigured = !!(URL_ && KEY_);
/** Sign-in methods enabled in the Supabase dashboard, e.g. "github,google,email". */
export const providers = ((import.meta.env.VITE_AUTH_PROVIDERS as string | undefined) || 'github,email').split(',').map(s => s.trim()).filter(Boolean);

const AUTH_KEY = 'aiLearningHub.auth';
const TABLE = 'progress';
const PUSH_DELAY = 3000;

export interface SyncStatus {
  phase: 'off' | 'signed-out' | 'syncing' | 'synced' | 'error';
  email?: string;
  lastSync?: number;
  error?: string;
}

let status: SyncStatus = { phase: syncConfigured ? 'signed-out' : 'off' };
const listeners = new Set<() => void>();
const setStatus = (s: Partial<SyncStatus>) => { status = { ...status, ...s }; listeners.forEach(l => l()); };
export const useSyncStatus = () => useSyncExternalStore(cb => { listeners.add(cb); return () => { listeners.delete(cb); }; }, () => status, () => status);

let client: SupabaseClient | null = null;
let user: User | null = null;
let applying = false, running: Promise<void> | null = null, again = false;
let timer: ReturnType<typeof setTimeout> | undefined;

async function getClient() {
  if (!client) {
    const { createClient } = await import('@supabase/supabase-js');
    client = createClient(URL_!, KEY_!, { auth: { flowType: 'pkce', persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storageKey: AUTH_KEY } });
  }
  return client;
}

const hasStoredSession = () => { try { return !!localStorage.getItem(AUTH_KEY); } catch { return false; } };
const returningFromSignIn = () => new URLSearchParams(location.search).has('code');

/** Start sync at app load. Loads the Supabase client only for signed-in users or a sign-in redirect. */
export async function startSync() {
  if (!syncConfigured || !(hasStoredSession() || returningFromSignIn())) return;
  await connect();
}

let connected = false;
async function connect() {
  if (connected) return client!;
  connected = true;
  const c = await getClient();
  c.auth.onAuthStateChange((event, session) => {
    user = session?.user ?? null;
    if (!user) { setStatus({ phase: 'signed-out', email: undefined }); return; }
    setStatus({ email: user.email ?? user.user_metadata?.user_name ?? 'signed in' });
    // Defer: Supabase recommends not awaiting other client calls inside this callback.
    if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') setTimeout(() => void syncNow(), 0);
  });
  subscribe(() => { if (user && !applying) schedule(); });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && user) void syncNow(); });
  window.addEventListener('online', () => { if (user) void syncNow(); });
  return c;
}

function schedule() {
  clearTimeout(timer);
  timer = setTimeout(() => void syncNow(), PUSH_DELAY);
}

/** Pull the user's row, merge it with local progress, apply locally and write back what changed. */
export function syncNow(): Promise<void> {
  if (running) { again = true; return running; }
  running = (async () => {
    try {
      do {
        again = false;
        await syncOnce();
      } while (again);
    } finally { running = null; }
  })();
  return running;
}

async function syncOnce() {
  if (!client || !user) return;
  setStatus({ phase: 'syncing', error: undefined });
  try {
    const { data, error } = await client.from(TABLE).select('state').eq('user_id', user.id).maybeSingle();
    if (error) throw error;
    const remote = (data?.state ?? null) as AppState | null;
    const local = getState();
    const merged = remote?.ex ? mergeStates(local, remote) : local;
    if (!sameProgress(merged, local)) {
      applying = true;
      try { replaceState(merged); } finally { applying = false; }
    }
    if (!remote?.ex || !sameProgress(merged, remote)) {
      const { theme: _theme, ...shared } = merged;
      const { error: e2 } = await client.from(TABLE).upsert({ user_id: user.id, state: shared, updated_at: new Date().toISOString() });
      if (e2) throw e2;
    }
    setStatus({ phase: 'synced', lastSync: Date.now() });
  } catch (e) {
    setStatus({ phase: 'error', error: navigator.onLine ? (e as Error).message || 'Sync failed' : 'Offline: will sync when you reconnect' });
  }
}

const redirectTo = () => `${location.origin}${import.meta.env.BASE_URL}progress`;

export async function signInWith(provider: 'github' | 'google') {
  const c = await connect();
  const { error } = await c.auth.signInWithOAuth({ provider, options: { redirectTo: redirectTo() } });
  if (error) throw error;
}

export async function sendMagicLink(email: string) {
  const c = await connect();
  const { error } = await c.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo() } });
  if (error) throw error;
}

/** Replace the server copy with local progress, skipping the merge: used after an import or a reset. */
export async function replaceCloud() {
  if (!client || !user) return;
  clearTimeout(timer);
  if (running) await running;
  const { theme: _theme, ...shared } = getState();
  const { error } = await client.from(TABLE).upsert({ user_id: user.id, state: shared, updated_at: new Date().toISOString() });
  if (error) { setStatus({ phase: 'error', error: error.message }); throw error; }
  setStatus({ phase: 'synced', lastSync: Date.now() });
}

export const isSignedIn = () => !!user;

/** Sign out on this device. Local progress stays in the browser. */
export async function signOut() {
  if (!client) return;
  clearTimeout(timer);
  await client.auth.signOut();
}

/** Delete the synced copy from the server (local progress is kept), then sign out. */
export async function deleteCloudCopy() {
  if (!client || !user) return;
  clearTimeout(timer);
  const { error } = await client.from(TABLE).delete().eq('user_id', user.id);
  if (error) throw error;
  await signOut();
}

-- Cloud sync for AI Learning Hub progress. Run once in the Supabase SQL editor.
-- One row per signed-in user; row-level security lets each user read and write only their own row,
-- so the public anon key in the site's code is safe.

create table if not exists public.progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  state jsonb not null,
  updated_at timestamptz not null default now(),
  -- Progress for every exam is a few hundred KB at most; refuse anything far larger.
  constraint progress_state_size check (pg_column_size(state) < 2000000)
);

alter table public.progress enable row level security;

drop policy if exists "read own progress" on public.progress;
drop policy if exists "insert own progress" on public.progress;
drop policy if exists "update own progress" on public.progress;
drop policy if exists "delete own progress" on public.progress;

create policy "read own progress" on public.progress
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "insert own progress" on public.progress
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "update own progress" on public.progress
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "delete own progress" on public.progress
  for delete to authenticated using ((select auth.uid()) = user_id);

-- Signed-out visitors get nothing.
revoke all on public.progress from anon;
grant select, insert, update, delete on public.progress to authenticated;

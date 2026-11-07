import type { Flashcard } from './types';
import type { CardState, ExamProgress } from './store';
import { today } from './store';

export const DAY = 86_400_000;
export const NEW_CARDS_PER_DAY = 25;

export type Grade = 0 | 3 | 4 | 5; // again, hard, good, easy

/** SM-2 style scheduling. Pure: returns the next state for a card. */
export function nextCardState(prev: CardState | undefined, g: Grade, now = Date.now()): CardState {
  const c: CardState = prev ? { ...prev } : { ef: 2.5, int: 0, rep: 0, due: 0 };
  if (g < 3) {
    c.rep = 0; c.int = 0; c.due = now + 10 * 60_000;
  } else {
    if (c.rep === 0) c.int = g === 5 ? 3 : 1;
    else if (c.rep === 1) c.int = g === 3 ? 2 : g === 5 ? 5 : 3;
    else c.int = Math.round(c.int * (g === 3 ? 1.2 : g === 5 ? c.ef * 1.3 : c.ef));
    c.rep++;
    c.due = now + c.int * DAY;
  }
  c.ef = Math.max(1.3, c.ef + (0.1 - (5 - g) * (0.08 + (5 - g) * 0.02)));
  c.at = now;
  return c;
}

export function cardQueue(cards: Flashcard[], p: ExamProgress, domain: string, now = Date.now()) {
  const pool = cards.filter(c => domain === 'all' || c.domain === domain);
  const due = pool.filter(c => p.cards[c.id] && p.cards[c.id].due <= now);
  const introducedToday = Object.values(p.newCards).filter(d => d === today()).length;
  const fresh = pool.filter(c => !p.cards[c.id]).slice(0, Math.max(0, NEW_CARDS_PER_DAY - introducedToday));
  const learned = pool.filter(c => p.cards[c.id]?.rep > 0).length;
  return { due, fresh, total: pool.length, learned };
}

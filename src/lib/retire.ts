// Exams with a last sitting day: marked as retiring before it, retired after it. Retired exams stay
// reachable (saved progress keeps working) but drop to the end of the track list and point to the replacement.
import type { ExamSummary, Track } from './types';

/** Today's date as YYYY-MM-DD in the visitor's time zone. */
export const today = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export const isRetired = (s: ExamSummary, on = today()) => !!s.lastDay && on > s.lastDay;
/** Within `days` of the last day, not yet past it. */
export const isRetiring = (s: ExamSummary, on = today(), days = 60) => !!s.lastDay && on <= s.lastDay && daysBetween(on, s.lastDay) <= days;

export const daysBetween = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000);

/** "16 Nov 2026" */
export const fmtDay = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

/** Current exams first, in their listed order, then retired ones. */
export const orderForListing = (exams: ExamSummary[], on = today()) => [...exams.filter(e => !isRetired(e, on)), ...exams.filter(e => isRetired(e, on))];

export const replacementOf = (track: Track, s: ExamSummary) => (s.replacedBy ? track.exams.find(e => e.id === s.replacedBy) : undefined);

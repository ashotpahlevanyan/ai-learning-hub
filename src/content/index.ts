import type { Track } from '../lib/types';
import { claude } from './tracks/claude/track';

/**
 * Every learning track on the site. To add one (e.g. another provider's certifications),
 * create src/content/tracks/<id>/ with a track.ts and exam JSON files, then list it here.
 */
export const tracks: Track[] = [claude];

// Drafted but not published yet (content in tracks/gemini and tracks/openai). To publish, import and add here:
//   import { gemini } from './tracks/gemini/track';   // GAIL exam + Gemini API Developer course (GAIL runbook still to write)
//   import { openai } from './tracks/openai/track';   // AI Foundations + API & Agents Developer courses

export const getTrack = (id?: string) => tracks.find(t => t.id === id);
export const getExamSummary = (trackId?: string, examId?: string) => getTrack(trackId)?.exams.find(e => e.id === examId);

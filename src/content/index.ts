import type { Track } from '../lib/types';
import { claude } from './tracks/claude/track';
import { gemini } from './tracks/gemini/track';
import { openai } from './tracks/openai/track';

/**
 * Every learning track on the site. To add one (e.g. another provider's certifications),
 * create src/content/tracks/<id>/ with a track.ts and exam JSON files, then list it here.
 */
export const tracks: Track[] = [claude, gemini, openai];

export const getTrack = (id?: string) => tracks.find(t => t.id === id);
export const getExamSummary = (trackId?: string, examId?: string) => getTrack(trackId)?.exams.find(e => e.id === examId);

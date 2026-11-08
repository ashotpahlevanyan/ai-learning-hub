import type { Exam } from './types';

/** Minutes for one pass through an exam's material. Lessons use their stated reading time; practice is estimated. */
export interface StudyTime {
  lessons: number;
  questions: number;
  flashcards: number;
  total: number;
}

// One practice question, including reading the explanation, and one first pass over a flashcard.
export const QUESTION_MIN = 2;
export const CARD_MIN = 0.5;
export const DEFAULT_LESSON_MIN = 15;

export function studyTime(exam: Pick<Exam, 'lessons' | 'questions' | 'flashcards'>): StudyTime {
  const lessons = exam.lessons.reduce((s, l) => s + (l.minutes ?? DEFAULT_LESSON_MIN), 0);
  const questions = Math.round(exam.questions.length * QUESTION_MIN);
  const flashcards = Math.round(exam.flashcards.length * CARD_MIN);
  return { lessons, questions, flashcards, total: lessons + questions + flashcards };
}

/** "45 min", "4 h", "4.5 h": rounded to the nearest half hour above an hour. */
export function fmtHours(min: number): string {
  if (min < 60) return `${Math.round(min)} min`;
  const h = Math.round(min / 30) / 2;
  return `${h} h`;
}

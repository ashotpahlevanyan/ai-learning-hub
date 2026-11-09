export interface Domain {
  id: string;
  name: string;
  weight: number;
  summary?: string;
  subskills?: string[];
}

/** A public page in the provider's official documentation that backs the content. */
export interface Source {
  title: string;
  url: string;
}

export interface Lesson {
  id: string;
  domain: string;
  title: string;
  minutes?: number;
  summary?: string;
  /** `id` is a slug of the heading, unique within the lesson (added by scripts/normalize-content.mjs). */
  sections: { id: string; heading: string; body: string }[];
  keyPoints?: string[];
  gotchas?: { trap: string; correct: string }[];
  lab?: string;
  /** official docs to read more */
  sources?: Source[];
}

export interface Flashcard {
  id: string;
  domain: string;
  front: string;
  back: string;
}

export interface Question {
  id: string;
  domain: string;
  difficulty?: number;
  scenario?: string;
  stem: string;
  options: string[];
  /** indices into options; more than one means "select N" */
  answer: number[];
  explanation: string;
  rationales?: string[];
  /** official docs that back the answer */
  sources?: Source[];
}

/** "exam" prepares for a real certification; "course" is a skill path with a practice test but no official exam. */
export type Kind = 'exam' | 'course';

export interface Exam {
  id: string;
  kind?: Kind;
  code: string;
  name: string;
  level: string;
  price?: string;
  items: number;
  minutes: number;
  passing: number;
  audience?: string;
  format?: string;
  domains: Domain[];
  scenarios?: { title: string; description: string }[];
  lessons: Lesson[];
  flashcards: Flashcard[];
  questions: Question[];
  /** Set by the cert-prep pipeline when every question passed a blind re-answer check. */
  review?: Review;
}

export interface Review {
  date: string;
  questionsChecked: number;
  fixed: number;
  dropped: number;
}

/** Lightweight listing info, available without loading the full exam bundle. */
export interface ExamSummary {
  id: string;
  kind: Kind;
  code: string;
  name: string;
  level: string;
  tier: string;
  audience: string;
  items: number;
  minutes: number;
  price: string;
  /** Last day the exam can be taken (YYYY-MM-DD). After it the exam shows as retired. */
  lastDay?: string;
  /** Id of the exam in the same track that replaces this one. */
  replacedBy?: string;
  load: () => Promise<Exam>;
}

export interface Resource {
  title: string;
  url: string;
  note: string;
}

export interface Track {
  /** Short label for the top navigation; defaults to name. */
  navLabel?: string;
  id: string;
  name: string;
  provider: string;
  tagline: string;
  description: string;
  exams: ExamSummary[];
  resources: Resource[];
  /** Suggested order through the track's exams/courses for different roles. */
  paths?: { who: string; order: string[]; why: string }[];
  /** Who can sit the exams, booking notes, or "no official exam" notes. */
  note?: string;
  /** Long-form study guide in Markdown. */
  loadGuide: () => Promise<string>;
}

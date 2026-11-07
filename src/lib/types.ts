export interface Domain {
  id: string;
  name: string;
  weight: number;
  summary?: string;
  subskills?: string[];
}

export interface Lesson {
  id: string;
  domain: string;
  title: string;
  minutes?: number;
  summary?: string;
  sections: { heading: string; body: string }[];
  keyPoints?: string[];
  gotchas?: { trap: string; correct: string }[];
  lab?: string;
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
}

export interface Exam {
  id: string;
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
}

/** Lightweight listing info, available without loading the full exam bundle. */
export interface ExamSummary {
  id: string;
  code: string;
  name: string;
  level: string;
  tier: 'Foundations' | 'Professional';
  audience: string;
  items: number;
  minutes: number;
  price: string;
  load: () => Promise<Exam>;
}

export interface Resource {
  title: string;
  url: string;
  note: string;
}

export interface Track {
  id: string;
  name: string;
  provider: string;
  tagline: string;
  description: string;
  exams: ExamSummary[];
  resources: Resource[];
  /** Long-form study guide in Markdown. */
  loadGuide: () => Promise<string>;
}

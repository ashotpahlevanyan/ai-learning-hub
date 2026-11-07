import type { Exam, Track } from '../../../lib/types';

const load = (p: Promise<{ default: unknown }>) => p.then(m => m.default as Exam);

export const gemini: Track = {
  id: 'gemini',
  name: 'Google Gemini',
  provider: 'Google',
  tagline: 'Pass the Google Cloud Generative AI Leader exam and build with the Gemini API.',
  description:
    'Prep for Google Cloud’s Generative AI Leader certification, plus a hands-on Gemini API developer course: models, multimodal prompting, function calling, grounding, agents and the Gemini Enterprise Agent Platform.',
  exams: [
    {
      kind: 'exam', id: 'gail', code: 'GAIL', name: 'Generative AI Leader', level: 'Google Cloud · Foundational', tier: 'Foundational',
      audience: 'Business and technical leaders who shape gen AI adoption', items: 50, minutes: 90, price: '$99',
      load: () => load(import('./exams/gail.json')),
    },
    {
      kind: 'course', id: 'gemini-dev', code: 'GEM-DEV', name: 'Gemini API Developer', level: 'Developer course · no official exam', tier: 'Course',
      audience: 'Developers building apps and agents on Gemini', items: 40, minutes: 60, price: 'Free',
      load: () => load(import('./exams/gemini-dev.json')),
    },
  ],
  resources: [
    { title: 'Generative AI Leader certification', url: 'https://cloud.google.com/learn/certification/generative-ai-leader', note: 'Official exam page and exam guide. Check sections and fee before booking.' },
    { title: 'Google Skills', url: 'https://www.skills.google', note: 'Free official learning paths, including the Generative AI Leader path.' },
    { title: 'Gemini API documentation', url: 'https://ai.google.dev/gemini-api/docs', note: 'Models, prompting, function calling, structured output, caching, Live API.' },
    { title: 'Google AI Studio', url: 'https://aistudio.google.com', note: 'Try prompts and get an API key for free.' },
    { title: 'Gemini cookbook', url: 'https://github.com/google-gemini/cookbook', note: 'Runnable notebooks for every Gemini API feature.' },
    { title: 'Agent Development Kit', url: 'https://google.github.io/adk-docs/', note: 'Google’s open-source framework for building agents.' },
  ],
  paths: [
    { who: 'Business or product leader', order: ['gail'], why: 'Generative AI Leader tests strategy, Google’s gen AI offerings and responsible AI, not code.' },
    { who: 'Developer', order: ['gemini-dev', 'gail'], why: 'Build with the API first; the Leader exam then becomes mostly product review.' },
  ],
  note: 'Generative AI Leader is a real Google Cloud certification delivered by Kryterion (online or onsite). Gemini API Developer is this site’s course with a practice test; Google has no matching exam. For an ML engineering certification, see Google’s Professional Machine Learning Engineer exam, which added generative AI in its June 2026 refresh.',
  loadGuide: () => import('./runbook.md?raw').then(m => m.default),
};

import type { Exam, Track } from '../../../lib/types';

const load = (p: Promise<{ default: unknown }>) => p.then(m => m.default as Exam);

export const gemini: Track = {
  id: 'gemini',
  name: 'Google Gemini and Google Cloud AI',
  navLabel: 'Gemini',
  provider: 'Google',
  tagline: 'Pass Google Cloud’s Generative AI Leader and Professional Machine Learning Engineer exams, and build with the Gemini API.',
  description:
    'Prep for Google Cloud’s Generative AI Leader and Professional Machine Learning Engineer certifications, plus a hands-on Gemini API developer course: models, multimodal prompting, function calling, grounding, agents and the Gemini Enterprise Agent Platform.',
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
    {
      kind: 'exam', id: 'pmle', code: 'PMLE', name: 'Professional Machine Learning Engineer', level: 'Google Cloud · Professional', tier: 'Professional',
      audience: 'ML engineers building, serving and monitoring ML and gen AI on Gemini Enterprise Agent Platform (formerly Vertex AI)', items: 55, minutes: 120, price: '$200',
      load: () => load(import('./exams/pmle.json')),
    },
  ],
  resources: [
    { title: 'Generative AI Leader certification', url: 'https://cloud.google.com/learn/certification/generative-ai-leader', note: 'Official exam page and exam guide. Check sections and fee before booking.' },
    { title: 'Google Skills', url: 'https://www.skills.google', note: 'Free official learning paths, including the Generative AI Leader path.' },
    { title: 'Gemini API documentation', url: 'https://aistudio.google.com/docs', note: 'Models, prompting, function calling, structured output, caching, Live API.' },
    { title: 'Google AI Studio', url: 'https://aistudio.google.com', note: 'Try prompts and get an API key for free.' },
    { title: 'Gemini cookbook', url: 'https://github.com/google-gemini/cookbook', note: 'Runnable notebooks for every Gemini API feature.' },
    { title: 'Agent Development Kit', url: 'https://adk.dev', note: 'Google’s open-source framework for building agents.' },
  ],
  paths: [
    { who: 'Business or product leader', order: ['gail'], why: 'Generative AI Leader tests strategy, Google’s gen AI offerings and responsible AI, not code.' },
    { who: 'Developer', order: ['gemini-dev', 'gail'], why: 'Build with the API first; the Leader exam then becomes mostly product review.' },
    { who: 'ML engineer', order: ['gemini-dev', 'pmle'], why: 'Professional ML Engineer tests BigQuery ML, AutoML, Vertex AI training, serving, pipelines and monitoring, plus gen AI with Model Garden and RAG.' },
  ],
  note: 'Generative AI Leader is a real Google Cloud certification delivered by Pearson VUE (online or at a test centre). Gemini API Developer is this site’s course with a practice test; Google has no matching exam. Professional Machine Learning Engineer is Google Cloud’s ML engineering certification; its current guide adds generative AI (Model Garden, Agent Builder RAG, gen AI evaluation). The guide still says Vertex AI; Google renamed it Gemini Enterprise Agent Platform in April 2026, and the lessons teach both names.',
  loadGuide: () => import('./runbook.md?raw').then(m => m.default),
};

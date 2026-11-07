import type { Exam, Track } from '../../../lib/types';

const load = (p: Promise<{ default: unknown }>) => p.then(m => m.default as Exam);

export const openai: Track = {
  id: 'openai',
  name: 'OpenAI GPT',
  navLabel: 'OpenAI',
  provider: 'OpenAI',
  tagline: 'Use ChatGPT well at work, then build apps and agents on the OpenAI API.',
  description:
    'Two courses with practice tests: AI Foundations for everyday work with ChatGPT, aligned to OpenAI Academy, and API & Agents Developer covering the Responses API, tools, structured outputs, the Agents SDK, evals and safety.',
  exams: [
    {
      kind: 'course', id: 'openai-found', code: 'OAI-FND', name: 'AI Foundations with ChatGPT', level: 'Business course · no official exam yet', tier: 'Course',
      audience: 'Professionals using ChatGPT in daily work', items: 40, minutes: 60, price: 'Free',
      load: () => load(import('./exams/openai-found.json')),
    },
    {
      kind: 'course', id: 'openai-dev', code: 'OAI-DEV', name: 'OpenAI API & Agents Developer', level: 'Developer course · no official exam', tier: 'Course',
      audience: 'Developers building apps and agents on the OpenAI API', items: 40, minutes: 60, price: 'Free',
      load: () => load(import('./exams/openai-dev.json')),
    },
  ],
  resources: [
    { title: 'OpenAI Academy', url: 'https://academy.openai.com', note: 'Free official courses: AI Foundations, Applied AI Foundations, Agents and Workflows.' },
    { title: 'OpenAI API docs', url: 'https://developers.openai.com/api/docs', note: 'Responses API, tools, structured outputs, realtime, evals.' },
    { title: 'Agents guide', url: 'https://developers.openai.com/api/docs/guides/agents', note: 'Choosing between the Responses API, Agents SDK and Agents API.' },
    { title: 'Agents SDK (Python)', url: 'https://github.com/openai/openai-agents-python', note: 'Open-source framework for agent loops, handoffs, guardrails and tracing.' },
    { title: 'OpenAI Cookbook', url: 'https://cookbook.openai.com', note: 'Runnable examples for every API feature.' },
  ],
  paths: [
    { who: 'Business user', order: ['openai-found'], why: 'Prompting, checking output and safe use of ChatGPT at work.' },
    { who: 'Developer', order: ['openai-found', 'openai-dev'], why: 'Foundations is a fast warm-up; the developer course is the main event.' },
  ],
  note: 'As of November 2026 OpenAI has no public certification exam: the proctored OpenAI Certification is an invite-only pilot for some ChatGPT Enterprise and Edu workspaces. These are this site’s courses; when OpenAI opens a public exam, an exam-prep path can be added here.',
  loadGuide: () => import('./runbook.md?raw').then(m => m.default),
};

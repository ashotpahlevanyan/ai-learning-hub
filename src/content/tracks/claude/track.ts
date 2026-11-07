import type { Exam, Track } from '../../../lib/types';

// Exam bundles are large, so each one loads on demand.
const load = (p: Promise<{ default: unknown }>) => p.then(m => m.default as Exam);

export const claude: Track = {
  id: 'claude',
  name: 'Claude',
  provider: 'Anthropic',
  tagline: 'Prepare for all four Anthropic Claude certifications.',
  description:
    'Lessons, spaced-repetition flashcards, scenario practice questions and timed mock exams for the Associate, Developer and Architect certifications, plus a full written study runbook.',
  exams: [
    {
      id: 'ccao-f', code: 'CCAO-F', name: 'Claude Certified Associate', level: 'Associate · Foundations', tier: 'Foundations',
      audience: 'Professionals who use Claude in daily work', items: 60, minutes: 120, price: '$99',
      load: () => load(import('./exams/ccao-f.json')),
    },
    {
      id: 'ccdv-f', code: 'CCDV-F', name: 'Claude Certified Developer', level: 'Developer · Foundations', tier: 'Foundations',
      audience: 'Developers building on the Claude API', items: 53, minutes: 120, price: '$125',
      load: () => load(import('./exams/ccdv-f.json')),
    },
    {
      id: 'ccar-f', code: 'CCAR-F', name: 'Claude Certified Architect', level: 'Architect · Foundations', tier: 'Foundations',
      audience: 'Engineers designing agents, tools and Claude Code setups', items: 60, minutes: 120, price: '$125',
      load: () => load(import('./exams/ccar-f.json')),
    },
    {
      id: 'ccar-p', code: 'CCAR-P', name: 'Claude Certified Architect', level: 'Architect · Professional', tier: 'Professional',
      audience: 'Senior architects leading enterprise Claude programs', items: 63, minutes: 120, price: '$175',
      load: () => load(import('./exams/ccar-p.json')),
    },
  ],
  resources: [
    { title: 'Anthropic Academy', url: 'https://anthropic.skilljar.com', note: 'Free official courses: API, MCP, Claude Code, Agent Skills, AI Fluency.' },
    { title: 'Claude documentation', url: 'https://docs.claude.com', note: 'Messages API, tool use, prompt caching, Claude Code, Agent SDK.' },
    { title: 'Anthropic engineering blog', url: 'https://www.anthropic.com/engineering', note: 'Building effective agents, context engineering, writing tools for agents.' },
    { title: 'Model Context Protocol', url: 'https://modelcontextprotocol.io', note: 'MCP spec, concepts and SDK quickstarts.' },
    { title: 'Prompt engineering tutorial', url: 'https://github.com/anthropics/courses', note: 'Interactive notebooks from Anthropic.' },
    { title: 'Claude cookbooks', url: 'https://github.com/anthropics/claude-cookbooks', note: 'Runnable recipes: tool use, RAG, caching, sub-agents.' },
  ],
  loadGuide: () => import('./runbook.md?raw').then(m => m.default),
};

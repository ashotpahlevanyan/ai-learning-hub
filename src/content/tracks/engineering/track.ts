import type { Exam, Track } from '../../../lib/types';

const load = (p: Promise<{ default: unknown }>) => p.then(m => m.default as Exam);

export const engineering: Track = {
  id: 'engineering',
  name: 'Software Engineering for Builders',
  navLabel: 'Engineering',
  provider: 'Independent courses',
  tagline: 'The engineering stack for building and running products alone or with a small team: system design, PostgreSQL, TypeScript and LLM applications.',
  description:
    'Four in-depth courses for engineers who ship whole products: system design and reliability, PostgreSQL and SQL at expert level, TypeScript and the JavaScript runtime, and production LLM applications with RAG, agents, MCP and evals. Every lesson has a worked example and a hands-on lab, and code was run on real PostgreSQL, the TypeScript compiler and Python.',
  exams: [
    {
      kind: 'course', id: 'system-design', code: 'SYS-DESIGN', name: 'System Design for Builders', level: 'In-depth engineering course · no official exam', tier: 'Course',
      audience: 'Senior engineers, architects and founders', items: 40, minutes: 60, price: 'Free',
      load: () => load(import('./exams/system-design.json')),
    },
    {
      kind: 'course', id: 'postgres', code: 'PG-SQL', name: 'PostgreSQL and SQL in Depth', level: 'In-depth engineering course · no official exam', tier: 'Course',
      audience: 'Developers and architects who run on Postgres', items: 40, minutes: 60, price: 'Free',
      load: () => load(import('./exams/postgres.json')),
    },
    {
      kind: 'course', id: 'typescript', code: 'TS-DEEP', name: 'TypeScript in Depth', level: 'In-depth engineering course · no official exam', tier: 'Course',
      audience: 'Developers who write TypeScript every day', items: 40, minutes: 60, price: 'Free',
      load: () => load(import('./exams/typescript.json')),
    },
    {
      kind: 'course', id: 'llm-engineering', code: 'LLM-ENG', name: 'LLM Application Engineering', level: 'In-depth engineering course · no official exam', tier: 'Course',
      audience: 'Engineers building production LLM features and agents', items: 40, minutes: 60, price: 'Free',
      load: () => load(import('./exams/llm-engineering.json')),
    },
  ],
  resources: [
    { title: 'The Amazon Builders’ Library', url: 'https://builder.aws.com/learn/topics/builders-library', note: 'How Amazon builds and operates reliable systems: timeouts, retries, caching, load shedding.' },
    { title: 'Google SRE books', url: 'https://sre.google/books/', note: 'SLOs, error budgets, alerting and incident response, free online.' },
    { title: 'PostgreSQL documentation', url: 'https://www.postgresql.org/docs/current/', note: 'The reference for SQL, indexes, MVCC and operations.' },
    { title: 'The TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', note: 'The official guide to the type system.' },
    { title: 'Building effective agents', url: 'https://www.anthropic.com/engineering/building-effective-agents', note: 'Workflows vs agents and the patterns that work in production.' },
    { title: 'Model Context Protocol specification', url: 'https://modelcontextprotocol.io/specification/latest', note: 'How agents connect to tools and data.' },
  ],
  paths: [
    { who: 'Solo founder or small-team builder', order: ['typescript', 'postgres', 'llm-engineering', 'system-design'], why: 'Master the language and the database you build on, add the AI layer, then learn to design and operate the whole system.' },
    { who: 'Architect or tech lead', order: ['system-design', 'postgres', 'llm-engineering', 'typescript'], why: 'Start with trade-offs and reliability, go deep on the data layer, then the AI systems you will be asked to design.' },
    { who: 'Engineer preparing for senior interviews', order: ['system-design', 'typescript', 'postgres'], why: 'System design rounds first, then the language and database depth that senior loops probe. Pair with the Foundations DSA course.' },
  ],
  note: 'These are this site’s own courses with practice tests, not vendor certifications. They complement the Foundations track (math, Python and algorithms) and the vendor AI exams.',
  loadGuide: () => import('./runbook.md?raw').then(m => m.default),
};

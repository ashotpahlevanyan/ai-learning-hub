import type { Exam, Track } from '../../../lib/types';

const load = (p: Promise<{ default: unknown }>) => p.then(m => m.default as Exam);

export const engineering: Track = {
  id: 'engineering',
  name: 'Software Engineering for Builders',
  navLabel: 'Engineering',
  provider: 'Independent courses',
  tagline: 'The engineering stack for building and running products alone or with a small team: system design, PostgreSQL, TypeScript, React and Next.js, DevOps and LLM applications.',
  description:
    'Six in-depth courses for engineers who ship whole products: system design and reliability, PostgreSQL and SQL at expert level, TypeScript and the JavaScript runtime, React and Next.js with Server Components and caching, DevOps for small teams, and production LLM applications with RAG, agents, MCP and evals. Every lesson has a worked example and a hands-on lab, and code was run on real PostgreSQL, the TypeScript compiler and Python.',
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
    {
      kind: 'course', id: 'react-next', code: 'REACT-NEXT', name: 'React and Next.js in Depth', level: 'In-depth engineering course · no official exam', tier: 'Course',
      audience: 'Developers building full-stack web products', items: 40, minutes: 60, price: 'Free',
      load: () => load(import('./exams/react-next.json')),
    },
    {
      kind: 'course', id: 'devops', code: 'DEVOPS', name: 'DevOps for Small Teams', level: 'In-depth engineering course · no official exam', tier: 'Course',
      audience: 'Developers who ship and run their own products', items: 40, minutes: 60, price: 'Free',
      load: () => load(import('./exams/devops.json')),
    },
    {
      kind: 'course', id: 'product-growth', code: 'GROWTH', name: 'Product Analytics and Growth for Builders', level: 'In-depth engineering course · no official exam', tier: 'Course',
      audience: 'Founders and engineers who own the product numbers', items: 40, minutes: 60, price: 'Free',
      load: () => load(import('./exams/product-growth.json')),
    },
    {
      kind: 'course', id: 'agents-mcp', code: 'AGENTS-MCP', name: 'AI Agents and MCP in Depth', level: 'In-depth engineering course · no official exam', tier: 'Course',
      audience: 'Engineers who build agents, tool integrations and MCP servers', items: 40, minutes: 60, price: 'Free',
      load: () => load(import('./exams/agents-mcp.json')),
    },
    {
      kind: 'course', id: 'mobile-expo', code: 'MOBILE', name: 'Mobile Apps with Expo and React Native', level: 'In-depth engineering course · no official exam', tier: 'Course',
      audience: 'Web developers shipping iOS and Android apps', items: 40, minutes: 60, price: 'Free',
      load: () => load(import('./exams/mobile-expo.json')),
    },
    {
      kind: 'course', id: 'app-security', code: 'APPSEC', name: 'Application Security for Web and LLM Apps', level: 'In-depth engineering course · no official exam', tier: 'Course',
      audience: 'Engineers who build and run web products and AI features without a security team', items: 40, minutes: 60, price: 'Free',
      load: () => load(import('./exams/app-security.json')),
    },
  ],
  resources: [
    { title: 'The Amazon Builders’ Library', url: 'https://builder.aws.com/learn/topics/builders-library', note: 'How Amazon builds and operates reliable systems: timeouts, retries, caching, load shedding.' },
    { title: 'Google SRE books', url: 'https://sre.google/books/', note: 'SLOs, error budgets, alerting and incident response, free online.' },
    { title: 'PostgreSQL documentation', url: 'https://www.postgresql.org/docs/current/', note: 'The reference for SQL, indexes, MVCC and operations.' },
    { title: 'The TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', note: 'The official guide to the type system.' },
    { title: 'Building effective agents', url: 'https://www.anthropic.com/engineering/building-effective-agents', note: 'Workflows vs agents and the patterns that work in production.' },
    { title: 'Next.js documentation', url: 'https://nextjs.org/docs', note: 'The App Router, Server Components, caching and deployment.' },
    { title: 'GitHub Actions documentation', url: 'https://docs.github.com/en/actions', note: 'Workflows, security hardening and OIDC deployments.' },
    { title: 'Model Context Protocol specification', url: 'https://modelcontextprotocol.io/specification/latest', note: 'How agents connect to tools and data.' },
  ],
  paths: [
    { who: 'Solo founder or small-team builder', order: ['typescript', 'react-next', 'postgres', 'llm-engineering', 'devops', 'system-design'], why: 'Master the language, the UI framework and the database you build on, add the AI layer, learn to ship and run it, then design the whole system.' },
    { who: 'Architect or tech lead', order: ['system-design', 'postgres', 'devops', 'llm-engineering', 'typescript'], why: 'Start with trade-offs and reliability, go deep on the data layer and operations, then the AI systems you will be asked to design.' },
    { who: 'Backend or data engineer moving to full-stack', order: ['typescript', 'react-next', 'devops'], why: 'The language and runtime first, then rendering, data flow and caching on the web, then delivery and operations.' },
    { who: 'Engineer preparing for senior interviews', order: ['system-design', 'typescript', 'postgres'], why: 'System design rounds first, then the language and database depth that senior loops probe. Pair with the Foundations DSA course.' },
  ],
  note: 'These are this site’s own courses with practice tests, not vendor certifications. They complement the Foundations track (math, Python and algorithms) and the vendor AI exams.',
  loadGuide: () => import('./runbook.md?raw').then(m => m.default),
};

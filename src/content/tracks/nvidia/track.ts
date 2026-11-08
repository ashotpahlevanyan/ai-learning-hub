import type { Exam, Track } from '../../../lib/types';

const load = (p: Promise<{ default: unknown }>) => p.then(m => m.default as Exam);

export const nvidia: Track = {
  id: 'nvidia',
  name: 'NVIDIA AI',
  navLabel: 'NVIDIA',
  provider: 'NVIDIA',
  tagline: 'Pass NVIDIA’s Generative AI LLMs Associate and Agentic AI Professional exams: LLM fundamentals, GPU acceleration and production agents on the NVIDIA stack.',
  description:
    'Prep for NCA-GENL (Generative AI LLMs, Associate) and NCP-AAI (Agentic AI, Professional): transformers, fine-tuning, RAG, evaluation and trustworthy AI, then agent architecture, tools, memory, evaluation, deployment and safety with NIM, NeMo and the NeMo Agent Toolkit.',
  exams: [
    {
      kind: 'exam', id: 'nca-genl', code: 'NCA-GENL', name: 'Generative AI LLMs', level: 'NVIDIA · Associate', tier: 'Associate',
      audience: 'Developers and data scientists starting to build generative AI and LLM applications', items: 55, minutes: 60, price: '$125',
      load: () => load(import('./exams/nca-genl.json')),
    },
    {
      kind: 'exam', id: 'ncp-aai', code: 'NCP-AAI', name: 'Agentic AI', level: 'NVIDIA · Professional', tier: 'Professional',
      audience: 'AI engineers with production experience building, evaluating and deploying agents', items: 65, minutes: 120, price: '$200',
      load: () => load(import('./exams/ncp-aai.json')),
    },
  ],
  resources: [
    { title: 'NVIDIA certification', url: 'https://www.nvidia.com/en-us/learn/certification/', note: 'All NVIDIA exams, FAQs, policies and registration.' },
    { title: 'NCA-GENL exam page', url: 'https://www.nvidia.com/en-us/learn/certification/generative-ai-llm-associate/', note: 'Topic weights, recommended training and registration for Generative AI LLMs.' },
    { title: 'NCP-AAI exam page', url: 'https://www.nvidia.com/en-us/learn/certification/agentic-ai-professional/', note: 'Topic weights, study guide and recommended courses for Agentic AI.' },
    { title: 'NeMo Agent Toolkit docs', url: 'https://docs.nvidia.com/nemo/agent-toolkit/latest/index.html', note: 'Build, profile and evaluate agents across frameworks. Tested on NCP-AAI; deprecated in October 2026.' },
    { title: 'NVIDIA NIM', url: 'https://docs.nvidia.com/nim/index.html', note: 'Prebuilt inference microservices for LLMs, embeddings and rerankers.' },
    { title: 'NeMo Guardrails', url: 'https://docs.nvidia.com/nemo/guardrails/latest/index.html', note: 'Programmable input, output, dialog and retrieval rails.' },
  ],
  paths: [
    { who: 'New to generative AI', order: ['nca-genl'], why: 'NCA-GENL covers ML and transformer basics, fine-tuning, RAG, evaluation and trustworthy AI in one hour.' },
    { who: 'AI engineer building agents', order: ['nca-genl', 'ncp-aai'], why: 'Associate first for the LLM foundations; the Professional exam goes deep on agent design, evaluation, deployment and oversight.' },
  ],
  note: 'Both are official NVIDIA certifications, booked through Certiverse and taken online with a remote proctor (no breaks), in English, and valid for two years (recertify by retaking). NVIDIA reports pass or fail and publishes no passing score; mocks here use 700/1000. NCP-AAI’s exam page has shown “Coming soon” beside its registration link: check availability before you plan around it. NVIDIA renames products often: the exam still tests NeMo Agent Toolkit (formerly Agent Intelligence Toolkit), which NVIDIA deprecated in October 2026 in favour of newer NeMo agent tools, so learn it for the exam and check current docs for new projects.',
  loadGuide: () => import('./runbook.md?raw').then(m => m.default),
};

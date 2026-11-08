import type { Exam, Track } from '../../../lib/types';

const load = (p: Promise<{ default: unknown }>) => p.then(m => m.default as Exam);

export const azure: Track = {
  id: 'azure',
  name: 'Microsoft Azure AI',
  navLabel: 'Azure',
  provider: 'Microsoft',
  tagline: 'Pass Microsoft’s Azure AI Fundamentals and Azure AI Apps and Agents Developer exams, built on Microsoft Foundry.',
  description:
    'Prep for AI-901 (Azure AI Fundamentals) and AI-103 (Developing AI Apps and Agents on Azure): responsible AI, Microsoft Foundry models and agents, RAG with Azure AI Search, Content Understanding, speech, vision, content safety and operations.',
  exams: [
    {
      kind: 'exam', id: 'ai-901', code: 'AI-901', name: 'Azure AI Fundamentals', level: 'Microsoft · Fundamentals', tier: 'Foundational',
      audience: 'Anyone starting out with AI solutions on Azure; basic Python helps', items: 50, minutes: 45, price: '$99',
      load: () => load(import('./exams/ai-901.json')),
    },
    {
      kind: 'exam', id: 'ai-103', code: 'AI-103', name: 'Developing AI Apps and Agents on Azure', level: 'Microsoft · Associate', tier: 'Associate',
      audience: 'Python developers building AI apps and agents with Microsoft Foundry', items: 50, minutes: 100, price: '$165',
      load: () => load(import('./exams/ai-103.json')),
    },
  ],
  resources: [
    { title: 'AI-901 study guide', url: 'https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901', note: 'Official skills measured for Azure AI Fundamentals.' },
    { title: 'AI-103 study guide', url: 'https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103', note: 'Official skills measured for Developing AI Apps and Agents on Azure.' },
    { title: 'Microsoft Foundry documentation', url: 'https://learn.microsoft.com/en-us/azure/ai-foundry/', note: 'Models, deployments, agents, evaluation, tracing and the Foundry SDK.' },
    { title: 'Azure AI Search', url: 'https://learn.microsoft.com/en-us/azure/search/', note: 'Indexing, vector and hybrid search, semantic ranking and RAG.' },
    { title: 'Azure Content Understanding', url: 'https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/', note: 'Extract fields and markdown from documents, images, audio and video.' },
    { title: 'Microsoft Learn exam sandbox', url: 'https://aka.ms/examdemo', note: 'Try the exam interface and item types before test day.' },
  ],
  paths: [
    { who: 'New to AI on Azure', order: ['ai-901'], why: 'AI-901 covers responsible AI, AI workloads and simple Foundry apps and agents.' },
    { who: 'Developer or AI engineer', order: ['ai-901', 'ai-103'], why: 'AI-901 is a quick foundation; AI-103 goes deep on RAG, agents, multimodal, operations and safety.' },
  ],
  note: 'Both are official Microsoft certifications delivered by Pearson VUE (online or at a test centre). AI-901 replaced AI-900 and AI-103 succeeded AI-102; both older exams retired on 30 June 2026, and certifications already earned stay valid. Associate certifications renew yearly with a free online assessment. Fees shown are US prices; Microsoft prices exams by country. Microsoft renames products often: check the study guide before booking.',
  loadGuide: () => import('./runbook.md?raw').then(m => m.default),
};

import type { Exam, Track } from '../../../lib/types';

const load = (p: Promise<{ default: unknown }>) => p.then(m => m.default as Exam);

export const aws: Track = {
  id: 'aws',
  name: 'Amazon Web Services',
  navLabel: 'AWS',
  provider: 'Amazon Web Services',
  tagline: 'AWS AI and ML certifications and Solutions Architect – Professional, with Bedrock, agents and architecture trade-offs.',
  description:
    'Prep for AWS Certified AI Practitioner, Machine Learning Engineer – Associate, Generative AI Developer – Professional and Solutions Architect – Professional: Amazon Bedrock, Knowledge Bases, AgentCore, Guardrails, SageMaker AI, multi-account architecture, networking, migration, resilience and cost.',
  exams: [
    {
      kind: 'exam', id: 'aif-c01', code: 'AIF-C01', name: 'AI Practitioner', level: 'AWS · Foundational', tier: 'Foundational',
      audience: 'Anyone who uses or evaluates AI and generative AI on AWS', items: 65, minutes: 90, price: '$100',
      load: () => load(import('./exams/aif-c01.json')),
    },
    {
      kind: 'exam', id: 'aip-c01', code: 'AIP-C01', name: 'Generative AI Developer – Professional', level: 'AWS · Professional', tier: 'Professional',
      audience: 'Developers shipping generative AI applications on AWS', items: 75, minutes: 180, price: '$300',
      load: () => load(import('./exams/aip-c01.json')),
    },
    {
      kind: 'exam', id: 'mla-c02', code: 'MLA-C02', name: 'Machine Learning Engineer – Associate', level: 'AWS · Associate · in beta; GA time and fee are estimates', tier: 'Associate',
      audience: 'ML engineers who build, deploy and operate ML and foundation-model workloads on SageMaker AI and Bedrock', items: 65, minutes: 130, price: '$150',
      load: () => load(import('./exams/mla-c02.json')),
    },
    {
      kind: 'exam', id: 'sap-c02', code: 'SAP-C02', name: 'Solutions Architect – Professional', level: 'AWS · Professional · last exam day 16 Nov 2026', tier: 'Professional',
      audience: 'Solutions architects with 2+ years designing and deploying cloud architecture on AWS', items: 75, minutes: 180, price: '$300',
      lastDay: '2026-11-16', replacedBy: 'sap-c03',
      load: () => load(import('./exams/sap-c02.json')),
    },
    {
      kind: 'exam', id: 'sap-c03', code: 'SAP-C03', name: 'Solutions Architect – Professional', level: 'AWS · Professional · from 17 Nov 2026', tier: 'Professional',
      audience: 'Solutions architects with 2+ years designing and deploying cloud architecture on AWS', items: 75, minutes: 180, price: '$300',
      load: () => load(import('./exams/sap-c03.json')),
    },
  ],
  resources: [
    { title: 'AWS Certification', url: 'https://aws.amazon.com/certification/', note: 'Official exam pages, exam guides, registration and policies.' },
    { title: 'AWS Skill Builder', url: 'https://skillbuilder.aws', note: 'Free official courses and exam-prep plans, plus an official practice question set for each exam.' },
    { title: 'Amazon Bedrock user guide', url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html', note: 'Models, Knowledge Bases, Guardrails, Flows, Prompt Management, evaluation, inference tiers.' },
    { title: 'Amazon Bedrock AgentCore', url: 'https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html', note: 'Runtime, Gateway, Memory, Identity and Policy for production agents.' },
    { title: 'Generative AI Lens', url: 'https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lens.html', note: 'Well-Architected guidance for gen AI workloads.' },
  ],
  paths: [
    { who: 'Business, product or new to AWS AI', order: ['aif-c01'], why: 'AI Practitioner covers AI/ML and gen AI concepts, AWS AI services and responsible AI without code.' },
    { who: 'Developer building gen AI on AWS', order: ['aif-c01', 'aip-c01'], why: 'AI Practitioner is a fast foundation; the Professional exam tests Bedrock, RAG, agents, guardrails and operations in depth.' },
    { who: 'ML engineer or data scientist', order: ['aif-c01', 'mla-c02', 'aip-c01'], why: 'Machine Learning Engineer – Associate tests data prep, training, deployment, MLOps and monitoring on SageMaker AI and Bedrock; add the Professional gen AI exam for LLM apps.' },
    { who: 'Cloud or solutions architect', order: ['sap-c03', 'aip-c01'], why: 'Solutions Architect – Professional tests multi-account design, networking, migration, resilience and cost; add Generative AI Developer if you design gen AI platforms.' },
  ],
  note: 'All are official AWS certifications delivered by Pearson VUE (test centre or online). SAP-C02 is replaced by SAP-C03 from 17 November 2026 (new domains, pass mark 720). Book SAP-C02 only if you sit it by 16 November; otherwise study SAP-C03. MLA-C02 replaced MLA-C01 for English candidates on 29 September 2026 (beta first, then general availability). Exam guides and service names change often: check the official exam page before booking.',
  loadGuide: () => import('./runbook.md?raw').then(m => m.default),
};

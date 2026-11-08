import type { Exam, Track } from '../../../lib/types';

const load = (p: Promise<{ default: unknown }>) => p.then(m => m.default as Exam);

export const databricks: Track = {
  id: 'databricks',
  name: 'Databricks AI',
  navLabel: 'Databricks',
  provider: 'Databricks',
  tagline: 'Pass the Databricks Generative AI Engineer and Machine Learning Associate exams: RAG, agents, MLflow, Unity Catalog and model serving on the lakehouse.',
  description:
    'Prep for the Generative AI Engineer Associate (Agent Bricks, AI Search, formerly Vector Search, MLflow evaluation and tracing, Unity Gateway, formerly AI Gateway) and the Machine Learning Associate (AutoML, Feature Engineering in Unity Catalog, MLflow, Spark ML, tuning, metrics and model serving).',
  exams: [
    {
      kind: 'exam', id: 'genai-assoc', code: 'GENAI-ASSOC', name: 'Generative AI Engineer Associate', level: 'Databricks · Associate', tier: 'Associate',
      audience: 'Engineers building RAG apps and agents on Databricks', items: 45, minutes: 90, price: '$200',
      load: () => load(import('./exams/genai-assoc.json')),
    },
    {
      kind: 'exam', id: 'ml-assoc', code: 'ML-ASSOC', name: 'Machine Learning Associate', level: 'Databricks · Associate', tier: 'Associate',
      audience: 'Data scientists and ML engineers doing everyday ML on Databricks', items: 48, minutes: 90, price: '$200',
      load: () => load(import('./exams/ml-assoc.json')),
    },
  ],
  resources: [
    { title: 'Generative AI Engineer Associate', url: 'https://www.databricks.com/learn/certification/genai-engineer-associate', note: 'Exam page with the current exam guide, weights and registration.' },
    { title: 'Machine Learning Associate', url: 'https://www.databricks.com/learn/certification/machine-learning-associate', note: 'Exam page with the current exam guide, weights and registration.' },
    { title: 'Agents on Databricks', url: 'https://docs.databricks.com/aws/en/agents/', note: 'Agent Bricks, tools, MCP, deployment and evaluation.' },
    { title: 'MLflow 3 for GenAI', url: 'https://docs.databricks.com/aws/en/mlflow3/genai/', note: 'Tracing, evaluation, scorers, judges, prompts and monitoring.' },
    { title: 'Machine learning on Databricks', url: 'https://docs.databricks.com/aws/en/machine-learning/', note: 'ML runtimes, AutoML, feature engineering, MLflow and model serving.' },
    { title: 'Databricks Free Edition', url: 'https://www.databricks.com/learn/free-edition', note: 'A free workspace for the hands-on practice the exam guides recommend.' },
  ],
  paths: [
    { who: 'Data scientist or ML engineer', order: ['ml-assoc'], why: 'Machine Learning Associate covers the core lakehouse ML workflow: features, MLflow, tuning, metrics and serving.' },
    { who: 'Gen AI or agent engineer', order: ['genai-assoc'], why: 'Generative AI Engineer Associate covers RAG, agents, evaluation, deployment and governance on Databricks.' },
    { who: 'Full ML and AI platform engineer', order: ['ml-assoc', 'genai-assoc'], why: 'Learn MLflow, Unity Catalog and model serving on classic ML first; the gen AI exam builds on them.' },
  ],
  note: 'Both are official Databricks certifications: proctored, no test aids, USD 200 per attempt (no free retakes; wait 14 days), valid for two years, and recertified by passing the current exam. Exams may include up to 10 unscored items. Databricks publishes no passing score; mocks here use 700/1000. Databricks renames features often and the exam guides lag behind: in 2026 Vector Search became AI Search, AI Gateway became Unity Gateway, Genie spaces became Genie Agents, and Knowledge Assistant and Supervisor Agent moved to legacy. The lessons teach both the exam’s names and the current ones. Check the exam guide two weeks before your exam.',
  loadGuide: () => import('./runbook.md?raw').then(m => m.default),
};

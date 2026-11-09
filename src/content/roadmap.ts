/**
 * The six-month roadmap: 24 weeks of about nine hours, one project built across all of them,
 * and four certifications along the way. Roughly 70% of the time builds skills, 30% learns technology.
 * Task ids are `w<week>-<index>`: append new tasks to the end of a week so ticked progress keeps its meaning.
 */
export type TaskKind = 'learn' | 'build' | 'skill' | 'exam';
export type Cloud = 'aws' | 'azure';

export interface RoadmapTask {
  kind: TaskKind;
  text: string;
  hours: number;
  /** Library entries to use, by exact title. */
  lib?: string[];
  /** A page on this site, e.g. an exam's lessons. */
  to?: { path: string; label: string };
  /** Shown only on this cloud route. */
  cloud?: Cloud;
}
export interface RoadmapWeek { title: string; goal: string; tasks: RoadmapTask[]; doneWhen: string }
export interface RoadmapMonth {
  title: string;
  outcome: string;
  skills: string[];
  tech: string[];
  /** What the project can do by the end of the month. */
  milestone: string;
  weeks: RoadmapWeek[];
}

export const KINDS: Record<TaskKind, { label: string; hint: string }> = {
  skill: { label: 'Skill', hint: 'Practise a lasting skill: framing, verifying, designing, explaining' },
  build: { label: 'Build', hint: 'Work on your project' },
  learn: { label: 'Learn', hint: 'Read docs or take a course' },
  exam: { label: 'Exam', hint: 'Certification study on this site' },
};

export const project = {
  name: 'Ask the Docs',
  summary: 'A question-answering assistant over a real document set you know well: your team’s docs, a product handbook or an open-source project’s documentation. It starts as a script in week 1 and ends as a measured, monitored, secured cloud service with a public write-up.',
  why: 'One project that grows every month shows depth, which certificates alone can’t. By month 6 you have real numbers to talk about: answer quality, cost per question, latency and what you fixed.',
};

export const habits = [
  { title: 'Read every line', text: 'Review AI-written code before you commit it. Note what you had to fix.' },
  { title: 'Ten minutes of flashcards', text: 'Daily, for the exam you are preparing. The site schedules them for you.' },
  { title: 'Learning log', text: 'Write one or two sentences a day on what you learned or got wrong.' },
  { title: 'Friday review, 30 minutes', text: 'Tick off finished tasks, move what slipped, read next week’s goal.' },
];

const ex = (path: string, label: string) => ({ path, label });

export const roadmap: RoadmapMonth[] = [
  {
    title: 'Build with LLMs',
    outcome: 'You can build a small LLM app with tools and structured output, and explain every line of it.',
    skills: ['Problem framing', 'Reading code critically'],
    tech: ['Claude API', 'Tool use', 'MCP', 'Python, FastAPI, Pydantic'],
    milestone: 'v0: answers questions over 20 real documents through a small API, with cited sources in JSON.',
    weeks: [
      {
        title: 'Set up and frame the problem',
        goal: 'Know exactly what you are building and for whom, and make your first structured model call.',
        tasks: [
          { kind: 'skill', hours: 1.5, text: 'Pick your document set and write a one-page problem statement: who asks, what they ask, what a good answer looks like and how you will measure it.', lib: ['Design Docs at Google'] },
          { kind: 'learn', hours: 3, text: 'Python refresher: take the lessons on the topics you are least sure of.', to: ex('/foundations/python-ai/learn', 'Python for AI lessons') },
          { kind: 'learn', hours: 2, text: 'Take the Claude API course on Anthropic Academy.', lib: ['Anthropic Academy'] },
          { kind: 'build', hours: 2, text: 'Create the repository and make a first call that returns JSON, validated with a Pydantic model.', lib: ['Structured outputs', 'Pydantic documentation'] },
        ],
        doneWhen: 'Your problem statement is written, and a script calls the model and validates its JSON.',
      },
      {
        title: 'Prompts and tools',
        goal: 'Let the model search your documents through tools you designed.',
        tasks: [
          { kind: 'learn', hours: 2, text: 'Read the prompt engineering overview and the tool use guide.', lib: ['Prompt engineering overview', 'Tool use with Claude'] },
          { kind: 'build', hours: 3, text: 'Add two tools (search documents, fetch one document) and the loop that runs them.', lib: ['Writing effective tools for agents'] },
          { kind: 'exam', hours: 3, text: 'Start the Claude Certified Architect lessons. The exam is open to Claude Partner Network organisations; if yours isn’t one, study the material anyway.', to: ex('/claude/ccar-f/learn', 'CCAR-F lessons') },
          { kind: 'skill', hours: 0.5, text: 'Keep a list of every change you made to AI-generated code this week, and why.' },
        ],
        doneWhen: 'The model answers by calling your search tool, and you can explain the whole loop.',
      },
      {
        title: 'MCP and context',
        goal: 'Make your tools usable from any MCP client, and learn what belongs in the context window.',
        tasks: [
          { kind: 'learn', hours: 2, text: 'Work through the MCP server quickstart.', lib: ['Model Context Protocol'] },
          { kind: 'learn', hours: 1, text: 'Read the context engineering guide.', lib: ['Effective context engineering for AI agents'] },
          { kind: 'build', hours: 3, text: 'Expose your document tools as an MCP server and use it from Claude Code or Claude Desktop.', lib: ['Claude Code best practices'] },
          { kind: 'exam', hours: 2, text: 'Continue the CCAR-F lessons and clear the flashcards that are due.', to: ex('/claude/ccar-f/cards', 'CCAR-F flashcards') },
        ],
        doneWhen: 'Your MCP server works inside a real client.',
      },
      {
        title: 'Agents, an API and the first checkpoint',
        goal: 'Put v0 behind an API and measure where you stand for the exam.',
        tasks: [
          { kind: 'learn', hours: 1.5, text: 'Read Building effective agents, then skim the ReAct paper.', lib: ['Building effective agents', 'ReAct: Synergizing Reasoning and Acting in Language Models'] },
          { kind: 'build', hours: 3, text: 'Wrap the assistant in a FastAPI endpoint that returns the answer and its sources.', lib: ['FastAPI tutorial'] },
          { kind: 'exam', hours: 3, text: 'Finish the CCAR-F lessons and take your first timed mock exam.', to: ex('/claude/ccar-f/mock', 'CCAR-F mock exam') },
          { kind: 'skill', hours: 0.5, text: 'Write a 300-word README: what it does, what it doesn’t do yet and what comes next.', lib: ['Technical Writing courses'] },
        ],
        doneWhen: 'v0 is tagged in git and your first mock score is recorded.',
      },
    ],
  },
  {
    title: 'Retrieval and evals',
    outcome: 'You can prove how good your system is with numbers, and improve it on purpose.',
    skills: ['Verification', 'Error analysis', 'Writing up results'],
    tech: ['Hybrid search and reranking', 'Eval sets', 'LLM-as-judge'],
    milestone: 'v1: hybrid retrieval and a 50-question eval set that scores every change.',
    weeks: [
      {
        title: 'Retrieval that works',
        goal: 'Replace naive search with hybrid retrieval and see the difference.',
        tasks: [
          { kind: 'learn', hours: 2, text: 'Read the contextual retrieval write-up and skim the original RAG paper.', lib: ['Contextual retrieval', 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks'] },
          { kind: 'build', hours: 4, text: 'Add chunking, embeddings and keyword (BM25) search, combined into one ranked list.', lib: ['Patterns for Building LLM-based Systems & Products'] },
          { kind: 'exam', hours: 2, text: 'CCAR-F smart practice: 40 questions, weakest domains first.', to: ex('/claude/ccar-f/practice', 'CCAR-F practice') },
        ],
        doneWhen: 'You can show five questions where hybrid search finds what keyword search missed.',
      },
      {
        title: 'Build an eval set',
        goal: 'Create the most valuable thing in this plan: a set of real questions with known good answers.',
        tasks: [
          { kind: 'learn', hours: 2, text: 'Read Your AI Product Needs Evals and Anthropic’s guide to success criteria.', lib: ['Your AI Product Needs Evals', 'Define success criteria and build evaluations'] },
          { kind: 'skill', hours: 3, text: 'Write 50 real questions, each with the expected answer and the document it comes from. Include hard and unanswerable ones.' },
          { kind: 'build', hours: 2, text: 'Write a script that runs the set and reports retrieval hit rate and answer correctness.', lib: ['Ragas documentation'] },
        ],
        doneWhen: 'One command prints your scores.',
      },
      {
        title: 'Error analysis and model grading',
        goal: 'Find out why answers fail, and fix the biggest cause first.',
        tasks: [
          { kind: 'learn', hours: 2, text: 'Read the LLM-as-a-judge guide and the tactical section of Applied LLMs.', lib: ['Using LLM-as-a-Judge for Evaluation', 'What We’ve Learned From A Year of Building with LLMs'] },
          { kind: 'skill', hours: 2, text: 'Read 30 failures by hand, sort them into categories and fix the largest category.' },
          { kind: 'build', hours: 2, text: 'Add a model grader with a written rubric, and check it agrees with your own judgement on 20 answers.' },
          { kind: 'exam', hours: 1, text: 'Work your CCAR-F mistakes notebook down to zero.', to: ex('/claude/ccar-f/mistakes', 'CCAR-F mistakes') },
        ],
        doneWhen: 'You have before-and-after scores for one fix.',
      },
      {
        title: 'Sit CCAR-F and write it up',
        goal: 'Take the exam and record what you learned while it is fresh.',
        tasks: [
          { kind: 'exam', hours: 4, text: 'Set your exam date, follow the day-by-day plan, take two timed mocks, then sit the exam.', to: ex('/claude/ccar-f/plan', 'CCAR-F study plan') },
          { kind: 'skill', hours: 1.5, text: 'Write a one-page results note: baseline, what you changed, scores and cost per question.' },
          { kind: 'skill', hours: 0.5, text: 'Month review: what took longer than planned? Adjust next month.' },
        ],
        doneWhen: 'The exam is done and the eval report is in your repository.',
      },
    ],
  },
  {
    title: 'Cloud and infrastructure',
    outcome: 'Your project runs in the cloud, built from code, and every change is tested before it ships.',
    skills: ['System thinking: how parts fail', 'Security mindset'],
    tech: ['Docker', 'Terraform', 'GitHub Actions', 'Amazon Bedrock or Microsoft Foundry'],
    milestone: 'v2: deployed with Terraform; a pull request that lowers the eval score fails CI.',
    weeks: [
      {
        title: 'Containers',
        goal: 'Run the whole app with one command.',
        tasks: [
          { kind: 'learn', hours: 2, text: 'Work through Docker’s getting-started guide.', lib: ['Docker: Get started'] },
          { kind: 'build', hours: 3, text: 'Write a Dockerfile and a Compose file for the app and its search index.' },
          { kind: 'exam', hours: 3, cloud: 'aws', text: 'Start the AWS Certified AI Practitioner lessons.', to: ex('/aws/aif-c01/learn', 'AIF-C01 lessons') },
          { kind: 'exam', hours: 3, cloud: 'azure', text: 'Start the Azure AI Fundamentals lessons.', to: ex('/azure/ai-901/learn', 'AI-901 lessons') },
        ],
        doneWhen: '`docker compose up` gives you a working app.',
      },
      {
        title: 'Infrastructure as code',
        goal: 'Create and destroy your whole environment from code.',
        tasks: [
          { kind: 'learn', hours: 3, text: 'Complete Terraform’s get-started tutorials for your cloud.', lib: ['Terraform tutorials'] },
          { kind: 'build', hours: 4, text: 'Write Terraform for a container service, secrets and storage, and deploy the app.' },
          { kind: 'skill', hours: 1, text: 'Draw the deployed system and list five ways it could fail and what the user would see.' },
        ],
        doneWhen: '`terraform apply` builds everything from nothing, and `terraform destroy` removes it.',
      },
      {
        title: 'Cloud model services and security',
        goal: 'Call models through your cloud’s AI service with least-privilege access.',
        tasks: [
          { kind: 'learn', hours: 2, cloud: 'aws', text: 'Read the Bedrock user guide sections on model access, knowledge bases and guardrails.', lib: ['Amazon Bedrock user guide'] },
          { kind: 'learn', hours: 2, cloud: 'azure', text: 'Read the Foundry docs on models, agents and evaluation.', lib: ['Microsoft Foundry documentation'] },
          { kind: 'build', hours: 3, text: 'Switch model calls to the cloud service, give the app a least-privilege role and remove every key from code.' },
          { kind: 'exam', hours: 3, cloud: 'aws', text: 'AIF-C01: finish the lessons, then smart practice and one mock.', to: ex('/aws/aif-c01/mock', 'AIF-C01 mock exam') },
          { kind: 'exam', hours: 3, cloud: 'azure', text: 'AI-901: finish the lessons, then smart practice and one mock.', to: ex('/azure/ai-901/mock', 'AI-901 mock exam') },
        ],
        doneWhen: 'Your eval set passes against the cloud-hosted model with similar scores.',
      },
      {
        title: 'CI/CD and the exam',
        goal: 'Make quality automatic, then sit your first cloud exam.',
        tasks: [
          { kind: 'build', hours: 3, text: 'Add GitHub Actions: run tests and the eval set on every pull request, deploy on merge.', lib: ['GitHub Actions documentation'] },
          { kind: 'exam', hours: 3, cloud: 'aws', text: 'Sit AIF-C01. Book a few days ahead.', to: ex('/aws/aif-c01/plan', 'AIF-C01 study plan') },
          { kind: 'exam', hours: 3, cloud: 'azure', text: 'Sit AI-901. Book a few days ahead.', to: ex('/azure/ai-901/plan', 'AI-901 study plan') },
          { kind: 'skill', hours: 0.5, text: 'Month review: what broke during deployment, and what would have caught it earlier?' },
        ],
        doneWhen: 'A pull request that lowers the eval score fails CI.',
      },
    ],
  },
  {
    title: 'Run it in production',
    outcome: 'You can see what your system is doing, what it costs and how it can be attacked, and fix each.',
    skills: ['Trade-off thinking', 'Operating what you build'],
    tech: ['OpenTelemetry', 'Prompt caching and model routing', 'OWASP Top 10 for LLMs'],
    milestone: 'v3: traced, cost-measured and tested against prompt injection.',
    weeks: [
      {
        title: 'Observability',
        goal: 'Trace every request from question to answer.',
        tasks: [
          { kind: 'learn', hours: 2, text: 'Read the OpenTelemetry concepts and the Python getting-started guide.', lib: ['OpenTelemetry documentation'] },
          { kind: 'build', hours: 3, text: 'Trace each request: retrieval, each model call, tokens used and cost.' },
          { kind: 'exam', hours: 3, cloud: 'aws', text: 'Start the AWS Generative AI Developer – Professional lessons.', to: ex('/aws/aip-c01/learn', 'AIP-C01 lessons') },
          { kind: 'exam', hours: 3, cloud: 'azure', text: 'Start the Developing AI Apps and Agents on Azure lessons.', to: ex('/azure/ai-103/learn', 'AI-103 lessons') },
        ],
        doneWhen: 'You can open one slow request and see where the time went.',
      },
      {
        title: 'Cost and latency',
        goal: 'Make it cheaper and faster without losing quality.',
        tasks: [
          { kind: 'learn', hours: 1, text: 'Read the prompt caching guide.', lib: ['Prompt caching'] },
          { kind: 'build', hours: 4, text: 'Add prompt caching, send easy questions to a smaller model and stream responses. Measure median and 95th-percentile latency and cost per question, before and after.' },
          { kind: 'exam', hours: 3, cloud: 'aws', text: 'Continue the AIP-C01 lessons and flashcards.', to: ex('/aws/aip-c01/cards', 'AIP-C01 flashcards') },
          { kind: 'exam', hours: 3, cloud: 'azure', text: 'Continue the AI-103 lessons and flashcards.', to: ex('/azure/ai-103/cards', 'AI-103 flashcards') },
        ],
        doneWhen: 'You have a before-and-after table, and the eval score didn’t drop.',
      },
      {
        title: 'Security',
        goal: 'Attack your own system before someone else does.',
        tasks: [
          { kind: 'learn', hours: 2, text: 'Read the OWASP Top 10 for LLM applications and skim the NIST AI Risk Management Framework.', lib: ['OWASP Top 10 for LLM Applications', 'AI Risk Management Framework'] },
          { kind: 'build', hours: 3, text: 'Add 20 attack cases to your eval set: instructions hidden in documents, requests for other users’ data and tool misuse. Fix what gets through.' },
          { kind: 'exam', hours: 3, cloud: 'aws', text: 'AIP-C01 smart practice and the mistakes notebook.', to: ex('/aws/aip-c01/practice', 'AIP-C01 practice') },
          { kind: 'exam', hours: 3, cloud: 'azure', text: 'AI-103 smart practice and the mistakes notebook.', to: ex('/azure/ai-103/practice', 'AI-103 practice') },
        ],
        doneWhen: 'Your attack cases run in CI, and all of them are blocked.',
      },
      {
        title: 'Sit the professional exam',
        goal: 'Pass the harder cloud exam and learn how production teams set targets.',
        tasks: [
          { kind: 'exam', hours: 5, cloud: 'aws', text: 'Follow the AIP-C01 day-by-day plan, take two timed mocks, then sit the exam.', to: ex('/aws/aip-c01/plan', 'AIP-C01 study plan') },
          { kind: 'exam', hours: 5, cloud: 'azure', text: 'Follow the AI-103 day-by-day plan, take two timed mocks, then sit the exam.', to: ex('/azure/ai-103/plan', 'AI-103 study plan') },
          { kind: 'skill', hours: 1, text: 'Read the SRE chapter on service level objectives and set one latency target and one quality target for your project.', lib: ['Site Reliability Engineering'] },
          { kind: 'skill', hours: 0.5, text: 'Month review: which number improved most, and which matters most to a user?' },
        ],
        doneWhen: 'The exam is done and your project has written targets.',
      },
    ],
  },
  {
    title: 'Data platform and system design',
    outcome: 'You can design a system for 100 times the load and defend the trade-offs in writing.',
    skills: ['System design', 'Design docs', 'Scoping'],
    tech: ['Databricks', 'Unity Catalog', 'AI Search', 'MLflow 3'],
    milestone: 'v4: a reviewed design doc, and the project running on Databricks with governed data and MLflow evaluation.',
    weeks: [
      {
        title: 'System design fundamentals',
        goal: 'Learn the building blocks and use them in a real design.',
        tasks: [
          { kind: 'learn', hours: 3, text: 'Read the System Design Primer study guide and the first chapters of Designing Data-Intensive Applications.', lib: ['The System Design Primer', 'Designing Data-Intensive Applications'] },
          { kind: 'skill', hours: 3, text: 'Write a design doc for version 2: many teams, 100 times the documents, the targets you set last month. Ask a colleague to review it.', lib: ['Design Docs at Google'] },
          { kind: 'exam', hours: 2, text: 'Start the Databricks Generative AI Engineer Associate lessons.', to: ex('/databricks/genai-assoc/learn', 'Databricks GenAI lessons') },
        ],
        doneWhen: 'Your design doc has been reviewed by someone else.',
      },
      {
        title: 'Databricks hands-on',
        goal: 'Rebuild retrieval on a data platform.',
        tasks: [
          { kind: 'learn', hours: 2, text: 'Set up Databricks Free Edition and read the retrieval and agent chapters of the Big Book of Generative AI.', lib: ['Databricks Free Edition', 'The Big Book of Generative AI'] },
          { kind: 'build', hours: 4, text: 'Load your documents into a Delta table, build an AI Search index on it and turn on MLflow tracing.', lib: ['MLflow for agents and LLMs'] },
          { kind: 'exam', hours: 2, text: 'Continue the Databricks lessons and flashcards.', to: ex('/databricks/genai-assoc/cards', 'Databricks GenAI flashcards') },
        ],
        doneWhen: 'The same eval set runs against the Databricks version.',
      },
      {
        title: 'Governance and evaluation at scale',
        goal: 'Control who sees what, and evaluate the way platform teams do.',
        tasks: [
          { kind: 'learn', hours: 2, text: 'Read the Unity Catalog overview and MLflow’s evaluation docs.', lib: ['What is Unity Catalog?', 'MLflow for agents and LLMs'] },
          { kind: 'build', hours: 3, text: 'Run your eval set with MLflow evaluation, register the agent and restrict the source data to one group.' },
          { kind: 'exam', hours: 3, text: 'Databricks smart practice and one timed mock.', to: ex('/databricks/genai-assoc/mock', 'Databricks GenAI mock exam') },
        ],
        doneWhen: 'Your scores are tracked in MLflow, and access is controlled in Unity Catalog.',
      },
      {
        title: 'Sit the Databricks exam',
        goal: 'Pass the exam and compare the two versions of your system.',
        tasks: [
          { kind: 'exam', hours: 4, text: 'Follow the day-by-day plan, take two timed mocks, then sit the exam.', to: ex('/databricks/genai-assoc/plan', 'Databricks GenAI study plan') },
          { kind: 'skill', hours: 1, text: 'Add a short section to your design doc comparing the cloud and Databricks versions: cost, effort and quality.' },
          { kind: 'skill', hours: 0.5, text: 'Month review: which design decisions would you change now?' },
        ],
        doneWhen: 'The exam is done and the comparison is written.',
      },
    ],
  },
  {
    title: 'Show your work',
    outcome: 'Other people can see, understand and trust what you built, and you can talk about it under pressure.',
    skills: ['Communication', 'Influence', 'Interviewing'],
    tech: ['Your full project, polished'],
    milestone: 'v5: a public case study, a recorded demo and an updated CV, all backed by real numbers.',
    weeks: [
      {
        title: 'Write the case study',
        goal: 'Explain the project so a busy reader gets it in two minutes.',
        tasks: [
          { kind: 'learn', hours: 2, text: 'Take Technical Writing One and Two.', lib: ['Technical Writing courses'] },
          { kind: 'skill', hours: 4, text: 'Write the case study: the problem, the design, eval scores, cost and latency, what failed and what you learned.' },
          { kind: 'build', hours: 2, text: 'Tidy the repository: README, architecture diagram and one-command setup.' },
        ],
        doneWhen: 'Someone outside your team understands the write-up without your help.',
      },
      {
        title: 'Present it',
        goal: 'Give the work a voice and gather honest feedback.',
        tasks: [
          { kind: 'skill', hours: 3, text: 'Give a 15-minute demo to your team or a meetup, and record it.' },
          { kind: 'skill', hours: 1, text: 'Ask three people for one thing that was unclear and one thing to improve.' },
          { kind: 'learn', hours: 2, text: 'Read the Staff Engineer chapters on writing strategy and getting your work noticed.', lib: ['Staff Engineer: Leadership beyond the management track'] },
          { kind: 'build', hours: 2, text: 'Fix the top piece of feedback.' },
        ],
        doneWhen: 'The demo is recorded and the feedback is acted on.',
      },
      {
        title: 'Interview readiness',
        goal: 'Turn six months of work into interview answers.',
        tasks: [
          { kind: 'learn', hours: 2, text: 'Read System Design in a Hurry.', lib: ['System Design in a Hurry'] },
          { kind: 'skill', hours: 3, text: 'Do two mock system-design interviews with a friend. Prompt: “Design an AI support assistant for a 10,000-person company.”' },
          { kind: 'skill', hours: 2, text: 'Update your CV and LinkedIn profile with numbers: scores, cost cut, latency, certifications.' },
        ],
        doneWhen: 'You can explain your project’s design and trade-offs in five minutes without notes.',
      },
      {
        title: 'Retrospective and the next six months',
        goal: 'Decide what to deepen next.',
        tasks: [
          { kind: 'skill', hours: 2, text: 'Look back: which skills are now strong, which are still weak, and what the market around you is asking for.' },
          { kind: 'exam', hours: 2, text: 'Optional next step: open the Claude Certified Architect – Professional or the NVIDIA Agentic AI dashboard, and set a date.', to: ex('/claude/ccar-p', 'CCAR-P dashboard') },
          { kind: 'skill', hours: 1, text: 'Write your next six-month goal in one paragraph and share it with someone who will ask you about it.' },
        ],
        doneWhen: 'You have a written goal for the next six months.',
      },
    ],
  },
];

export interface FlatTask extends RoadmapTask { id: string; week: number; month: number }

/** Every task with its stable id and week number (1–24), filtered to one cloud route. */
export function roadmapTasks(cloud: Cloud): FlatTask[] {
  let week = 0;
  return roadmap.flatMap((m, mi) => m.weeks.flatMap(w => {
    week++;
    return w.tasks.map((t, i) => ({ ...t, id: `w${week}-${i}`, week, month: mi + 1 })).filter(t => !t.cloud || t.cloud === cloud);
  }));
}

# AWS Runbook

A step-by-step path to pass four AWS certifications: **AWS Certified AI Practitioner** (AIF-C01), **AWS Certified Machine Learning Engineer – Associate** (MLA-C02, which replaces MLA-C01 in English), **AWS Certified Generative AI Developer – Professional** (AIP-C01) and **AWS Certified Solutions Architect – Professional** (SAP-C03, which replaces SAP-C02). Use it alongside the items on this site. Each has lessons, flashcards, practice questions and a timed practice test.

> **Read this first.** All four are real AWS certifications. Facts below were checked against AWS exam pages, exam guides, documentation and announcements on 7 November 2026 (MLA-C02 on 8 November 2026). Four things changed recently and matter for your plan: the AI Practitioner exam guide moved to **version 1.2 on 29 October 2026**; **MLA-C02 has been in beta since 29 September 2026**, with GA dates not yet published, and MLA-C01 is no longer offered in English; **Amazon Bedrock Agents became "Agents Classic"** and closed to new customers on 30 July 2026; and **SAP-C02 retires on 16 November 2026**, with SAP-C03 from 17 November 2026. AWS renames and retires services often, so check the official exam page and guide before you book.

---

## Table of contents

1. [Certification status](#1-certification-status)
2. [Which path to take](#2-which-path-to-take)
3. [The study method](#3-the-study-method)
4. [Free official resources](#4-free-official-resources)
5. [Core knowledge](#5-core-knowledge)
6. [Exam: AI Practitioner (AIF-C01)](#6-exam-ai-practitioner-aif-c01)
7. [Exam: Machine Learning Engineer – Associate (MLA-C02)](#7-exam-machine-learning-engineer--associate-mla-c02)
8. [Exam: Generative AI Developer – Professional (AIP-C01)](#8-exam-generative-ai-developer--professional-aip-c01)
9. [Exam: Solutions Architect – Professional (SAP-C03)](#9-exam-solutions-architect--professional-sap-c03)
10. [Capstone projects](#10-capstone-projects)
11. [Study schedules](#11-study-schedules)
12. [Cheat sheets](#12-cheat-sheets)
13. [Sources](#13-sources)

---

## 1. Certification status

| Item | AI Practitioner (AIF-C01) | Machine Learning Engineer – Associate (MLA-C02) | Generative AI Developer – Professional (AIP-C01) | Solutions Architect – Professional (SAP-C03) |
|---|---|---|---|---|
| Level | Foundational | Associate | Professional | Professional |
| Status (November 2026) | Live. Exam guide **v1.2** published 29 October 2026 | **Beta** since 29 September 2026 (English only). GA dates not yet published. MLA-C01 ended in English on 28 September 2026 | **Generally available** since March 2026. The beta ended on 31 March 2026 | **Replaces SAP-C02 on 17 November 2026.** Registration opened 27 October 2026. No beta |
| Items | 65: 50 scored, 15 unscored | Beta: 85. GA: 65 (50 scored, 15 unscored) | 75: 65 scored, 10 unscored | 75: 65 scored, 10 unscored |
| Time | 90 minutes | Beta: 170 minutes. GA: not published (MLA-C01 was 130) | 180 minutes | 180 minutes |
| Fee | $100 | Beta: $75. GA: not published (MLA-C01 was $150) | $300 | $300 |
| Passing score | **700** (scaled 100–1,000) | **720** (the guide says pass/fail doesn't apply to the beta) | **750** | **720** (SAP-C02 was 750) |
| Item types | Multiple choice, multiple response, **ordering**, **matching** | Multiple choice, multiple response | Multiple choice, multiple response | Multiple choice, multiple response |
| Languages | Many, including Japanese, Korean, Chinese, French, Spanish and Portuguese. **German and Italian were retired after 15 October 2026** | Beta: English. GA: English, Japanese, Korean, Simplified Chinese | English, Japanese, Korean, Simplified Chinese | Check the exam page. SAP-C02 was offered in English, Japanese, Korean, Portuguese (Brazil), Simplified Chinese and Spanish (Latin America) |
| Validity | 3 years. Renew by passing the current AIF exam or by earning Machine Learning Engineer – Associate | 3 years | Check the exam page | 3 years |

**What applies to all four**

- **Delivery:** Pearson VUE, at a test centre or online proctored.
- **Scoring is compensatory.** You need the overall scaled score, not a pass in every domain. Unscored items are mixed in and not marked.
- **No penalty for guessing.** An unanswered item is wrong, so answer everything.
- **Multiple response** means two or more correct answers out of five or more options. You must pick all of them to get credit.
- **Prerequisites:** none. AWS states recommended experience for each exam (see sections 6–9).
- **Discount:** passing an AWS certification gives you 50% off your next exam. Check your AWS Certification account for the voucher.
- **Short service names:** exams now use short service names. The Help button in the exam lists them.
- **Guide updates:** AWS says exam guide changes reach the exam about one month after they are published. AIF-C01 guide v1.2 content therefore applies from about late November 2026.
- **Official sample questions:** each exam guide and Skill Builder have official practice material. This site does not copy any of it.

**What this site gives you:** for each exam, lessons, flashcards, practice questions and a timed practice test at the real length (65 items in 90 minutes for AIF-C01; 75 in 180 for the two Professional exams). The MLA-C02 test uses 65 items in 130 minutes: the GA item count with the MLA-C01 time, as an estimate until AWS publishes the GA time. The AIF-C01 practice uses multiple choice and multiple response only; the real exam also has ordering and matching items. The Solutions Architect practice content was built for SAP-C02 and is still useful for most SAP-C03 topics; see section 9.

---

## 2. Which path to take

| You are… | Take | Why |
|---|---|---|
| Business, product, sales or new to AWS AI | **AIF-C01** | AI/ML and gen AI concepts, AWS AI services, responsible AI and governance. No code |
| An ML engineer, data scientist or MLOps engineer who trains, deploys and runs models on SageMaker AI and Bedrock | **MLA-C02** | Data prep, training and tuning, endpoints, pipelines, monitoring and security, with gen AI, RAG and agents now included. Associate level, so it's a good step before AIP-C01 |
| A developer building gen AI on AWS | **AIF-C01 → AIP-C01** | AIF-C01 is a fast foundation. AIP-C01 tests Bedrock, Knowledge Bases, AgentCore, Guardrails, cost and operations in depth |
| A developer with a year or more of hands-on gen AI | **AIP-C01** | Skim section 5 and the AIF-C01 cards for vocabulary, then go straight to AIP-C01 |
| A cloud or solutions architect | **SAP-C03 → AIP-C01** | SAP-C03 tests multi-account design, networking, security, migration, resilience, cost and automation. It now includes a gen AI integration task; add AIP-C01 if you design gen AI platforms |
| Already studying the Claude, OpenAI or Gemini track | **AIP-C01** | Tool loops, RAG, evals and guardrails transfer. Focus on the AWS-specific parts: Bedrock APIs and tiers, Knowledge Bases, AgentCore, Guardrails tiers and enforcement, IAM and logging |

**If you were preparing for SAP-C02:** you can still sit it until 16 November 2026. If you can't book by then, switch to SAP-C03 now. A pass on SAP-C02 before the cut-off stays valid until its normal expiry date.

---

## 3. The study method

The same loop as every track on this site:

1. **Read** this runbook section for your exam.
2. **Learn** the lessons, heaviest domain first.
3. **Recall** with flashcards every day. Spaced repetition picks what to review.
4. **Apply** with the capstone projects in section 10. Build them in your own AWS account; don't just read about them.
5. **Test** with Smart practice until every domain is above 80%, then take the timed practice test.
6. **Fix** misses in the Mistakes notebook and read the Traps list before each test.

**Daily routine (45–90 minutes):** 10 min flashcards → 20–45 min lesson and its lab → 15–30 min practice questions, reading every option's rationale.

**How AWS questions work.** Most items are scenarios with one deciding constraint: "least operational overhead", "most cost-effective", "without changing application code", "must stay in the EU", "near-zero RPO". Underline that phrase before you read the options. Two options are usually wrong at a glance; the last two differ on exactly that constraint.

---

## 4. Free official resources

| Resource | Use it for |
|---|---|
| **AWS Certification** (`aws.amazon.com/certification`) | Exam pages: format, fee, languages, delivery, registration and policies |
| **AIF-C01 exam guide** (`docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/`) | The five domains, task statements, in-scope and out-of-scope services, and the revision history (v1.2, 29 October 2026). Use this HTML guide, not the old 2024 PDF |
| **MLA-C02 exam guide** (`docs.aws.amazon.com/aws-certification/latest/machine-learning-engineer-associate-02/`) | Four domains, task statements, in-scope and out-of-scope services and the **C01 vs C02 comparison page** |
| **AIP-C01 exam guide** (`docs.aws.amazon.com/aws-certification/latest/ai-professional-01/`) | Five domains, task statements and in-scope services |
| **SAP-C03 exam guide** (`docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-03/`) | Five domains, task statements, in-scope services and the **C02 vs C03 comparison page** |
| **AWS Skill Builder** (`skillbuilder.aws`) | Free courses, exam-prep plans and an official practice question set for each exam |
| **Amazon Bedrock user guide** | Models, inference APIs, Knowledge Bases, Guardrails, Flows, Prompt Management, prompt caching, evaluations, service tiers, quotas, invocation logging |
| **Amazon Bedrock AgentCore developer guide** | Runtime, Memory, Gateway, Identity, Policy, Observability, Evaluations and the newer services |
| **Strands Agents** (`strandsagents.com`) | AWS's open-source agent SDK (Python and TypeScript) |
| **Kiro docs** (`kiro.dev/docs`) | The AI development environment that replaces the Amazon Q Developer IDE plugins |
| **Amazon Quick user guide** | Quick Sight, Flows, Automate, Index, Research. Quick evolved from Amazon QuickSight |
| **Responsible AI at AWS** (`aws.amazon.com/ai/responsible-ai`) | The eight responsible AI dimensions and the tools for each |
| **Generative AI Security Scoping Matrix** | The five scopes, from consumer app to self-trained model |
| **Well-Architected Framework** and the **Generative AI Lens** | Six pillars; gen AI-specific guidance. The Well-Architected Tool is free |
| **Disaster recovery whitepaper** ("Disaster Recovery of Workloads on AWS") | Backup and restore, pilot light, warm standby, multi-site; data-plane vs control-plane failover |
| **Prescriptive Guidance: large migration guide** | The 7 Rs and how AWS recommends sequencing a large migration |
| **AWS Budgets** and **Cost Explorer** | Keep your lab account safe (section 10) |
| **Pricing pages** (for example `aws.amazon.com/bedrock/pricing`) | Current prices. Don't memorise numbers from courses; they change |

---

## 5. Core knowledge

### 5.1 What changed in 2026

Older courses, practice tests and blog posts get these wrong. Learn the current names and status. Where an exam guide still uses an old name, the table says so.

| Area | Old | Now (November 2026) |
|---|---|---|
| AIF-C01 exam guide | 2024 guide (PDF) | **v1.2** (29 October 2026). Adds agentic AI, **MCP**, **context engineering**, chunking, token-based pricing, **prompt caching**, Prompt Management, **LLM-as-a-judge**, evaluating RAG and agents, hallucination detection and grounding, Amazon Quick, Kiro, Strands Agents, AgentCore, Nova and AWS Transform |
| AIF-C01 item types | Some prep sites mention case studies | Multiple choice, multiple response, ordering, matching. **No case studies** |
| ML Engineer – Associate | MLA-C01 (English until 28 September 2026) | **MLA-C02** beta from 29 September 2026; GA dates not published. Edge (Neo), BYOC and model compression removed; gen AI, RAG, agents and observability added (section 7.3) |
| AIP-C01 status | Beta (late 2025 to 31 March 2026) | **Generally available** (standard registration opened March 2026) |
| Bedrock agents | Amazon Bedrock Agents | **Amazon Bedrock Agents Classic**, in maintenance mode, **closed to new customers from 30 July 2026**. Existing agents keep working, with no end-of-life date; the model catalogue is frozen. New builds: **AgentCore** with Strands or another framework |
| Bedrock workflow builder | Bedrock Prompt Flows | **Amazon Bedrock Flows**. The AIP-C01 guide still says "Prompt Flows" |
| Knowledge Bases | One type; you bring the vector store | **Managed Knowledge Base** (recommended; Bedrock runs ingestion, storage and retrieval) and **Customer-managed Knowledge Base**. Vector stores now include **Amazon S3 Vectors** and **Neptune Analytics** (GraphRAG) |
| Guardrails | One set of filters | Six safeguards including **Automated Reasoning checks**; **Classic and Standard tiers**; image content filters; **org- and account-level enforcement** |
| Bedrock inference options | On-demand, batch, Provisioned Throughput | Plus **service tiers**: Reserved, Priority, Standard (default), Flex; and **Global** cross-Region inference alongside Geographic profiles |
| Bedrock customisation | Fine-tuning, continued pre-training | Main docs list **supervised fine-tuning**, **reinforcement fine-tuning** and **distillation**. Continued pre-training is no longer on the main page; treat it as a concept |
| SageMaker | Amazon SageMaker | **Amazon SageMaker AI** (renamed 3 December 2024). "Amazon SageMaker" now means the unified data, analytics and AI platform |
| SageMaker AI features | Clarify, Model Monitor, Augmented AI (A2I), Ground Truth, Debugger | **Maintenance mode, closed to new customers from 30 July 2026** (also Geospatial, Mechanical Turk, Role Manager, Studio Lab). Ground Truth Plus ended 30 June 2026; Profiler is entering sunset. AIF-C01 v1.2 and MLA-C02 don't name them; AIP-C01's in-scope list still does |
| Enterprise assistant | Amazon Q Business | **Closed to new customers** (maintenance from 30 July 2026). Its docs point new customers to **Amazon Quick**. AIP-C01's in-scope list still names Q Business |
| BI service | Amazon QuickSight, "Amazon Q in QuickSight" | **Amazon Quick**; Quick Sight is now a feature inside it |
| Developer assistant | Amazon Q Developer IDE plugins and CLI | New sign-ups blocked from 15 May 2026; IDE plugins reach end of support 30 April 2027. **Kiro** replaces them. Q Developer in the console, docs and chat apps is not affected |
| Amazon Kendra | Enterprise search | Maintenance from 30 July 2026 |
| PartyRock | Gen AI playground in some AIF prep | **Not in AIF-C01 v1.2.** Current status not verified; skip it |
| Solutions Architect – Professional | SAP-C02 (pass 750, 4 domains) | **SAP-C03** from 17 November 2026 (pass 720, 5 domains). Last SAP-C02 date: 16 November 2026 |
| Server migration | AWS Application Migration Service (MGN) | **AWS Transform MGN** (renamed June 2026), the replication engine behind **AWS Transform** |
| Migration tracking and discovery | AWS Migration Hub, Application Discovery Service | **Closed to new customers** (7 November 2025). Use **AWS Transform** |
| Offline data transfer | Snowball Edge, Snowcone, Snowmobile | Snowball Edge **closed to new customers**; Snowcone and Snowmobile discontinued. Use **DataSync** (online) or **AWS Data Transfer Terminal** (bring your own devices to an AWS facility) |
| Security posture | AWS Security Hub | Split: **AWS Security Hub CSPM** (the posture checks and standards) and a new **AWS Security Hub** (GA December 2025) that correlates findings into exposures |
| DNS for hybrid | Route 53 Resolver | **Route 53 VPC Resolver** (renamed when Route 53 Global Resolver launched) |
| Failover control | Route 53 Application Recovery Controller | **Amazon Application Recovery Controller (ARC)** |
| Aurora Global Database | "Managed planned failover" | **Switchover** (planned, RPO 0); **failover** for unplanned outages |
| CodeCommit | Closed to new customers (July 2024) | **Open again** (generally available from November 2025) |
| Data perimeter | SCPs only | **Resource control policies (RCPs)** alongside SCPs |
| New services to know | — | Lambda **durable functions**, **Database Savings Plans**, KMS post-quantum keys (**ML-DSA**, hybrid **ML-KEM** TLS), EBS snapshot lock, **AgentCore** |

### 5.2 AI and ML fundamentals

- **AI ⊃ ML ⊃ deep learning.** Gen AI creates new content. **Agentic AI** uses models to plan and take actions through tools, often over several steps. AIF-C01 v1.2 expects you to contrast all five.
- **Learning types:** supervised (labelled data: classification, regression), unsupervised (structure: clustering), reinforcement (rewards).
- **Data types:** labelled and unlabelled, tabular, time-series, image, text, structured and unstructured.
- **Fit:** overfitting (great on training data, poor on new data, high variance); underfitting (poor everywhere, high bias).
- **Metrics:** accuracy, precision (of the positives you predicted, how many were right), recall (of the real positives, how many you found), F1 (balance of the two). Business metrics: cost per user, development cost, customer feedback, ROI.
- **When not to use AI:** when the cost outweighs the benefit, or when you need a specific, deterministic outcome rather than a prediction. Prefer **traditional ML over a foundation model** when regulation, explainability or operational limits demand it.
- **MLOps:** experimentation, repeatable processes, scalable systems, technical debt, production readiness, monitoring, retraining.

**SageMaker AI inference options**

| Option | Use when |
|---|---|
| Real-time endpoint | Interactive, low-latency predictions |
| Serverless Inference | Traffic with idle gaps between bursts; you can tolerate cold starts; no infrastructure to manage |
| Asynchronous inference | Large payloads (up to 1 GB) or long processing (up to 1 hour); requests are queued; near real-time |
| Batch transform | Offline scoring of a whole dataset |

**Managed AI services (no model building)**

| Need | Service |
|---|---|
| Entities, sentiment, key phrases, PII in text | **Amazon Comprehend** |
| Image and video analysis | **Amazon Rekognition** |
| Speech to text | **Amazon Transcribe** |
| Text to speech | **Amazon Polly** |
| Translation | **Amazon Translate** |
| Text, forms and tables from documents | **Amazon Textract** |
| Chatbots (voice and text) | **Amazon Lex** |
| Recommendations | **Amazon Personalize** |
| Pre-trained models to fine-tune and deploy | **SageMaker JumpStart** |

### 5.3 Gen AI fundamentals and agentic concepts

- **Tokens, chunking, embeddings, vectors.** Models read tokens; you split documents into chunks; an embedding model turns each chunk into a vector; similar meanings sit close together.
- **Model types:** transformer LLMs, foundation models (broad, adaptable), multimodal models, diffusion models (images and video).
- **Foundation model lifecycle:** data selection → model selection → pre-training → fine-tuning → evaluation → deployment → feedback.
- **Limits:** hallucinations, poor interpretability, inaccuracy, nondeterminism.
- **Context engineering:** deciding what goes into the model's context window (instructions, retrieved chunks, tool results, memory) and in what order. It is broader than prompt wording.
- **Agentic concepts in AIF-C01 v1.2:** multi-agent patterns, **Model Context Protocol (MCP)** (a standard way to expose tools and data to models), multi-agent communication, memory management, tool use and workflow orchestration.
- **Token-based pricing:** you pay per input and output token on demand. Cost trade-offs include responsiveness, availability, redundancy, performance, Regional coverage, provisioned throughput and custom models.

**AWS gen AI services in AIF-C01 v1.2**

| Service | What it is |
|---|---|
| **Amazon Bedrock** | Fully managed access to 100+ foundation models from Amazon (Nova) and other providers through one API |
| **Amazon Nova** | Amazon's own models on Bedrock: understanding (Premier, Pro, Lite, Micro), creative (Canvas for images, Reel for video), speech (Sonic) |
| **SageMaker AI / JumpStart** | Build, train and host your own models; JumpStart gives pre-trained models and templates |
| **Amazon Bedrock AgentCore** | Platform for running agents in production, with any framework and any model |
| **Strands Agents** | Open-source agent SDK; model-agnostic; MCP support |
| **Kiro** | AI development environment with specs, steering, hooks and MCP |
| **Amazon Quick** | AI service for business users: BI dashboards (Quick Sight), automation, research and agents over company data |
| **AWS Transform** | Agentic AI service for migration and modernisation, with human review at each step |

### 5.4 Amazon Bedrock: models, APIs and inference options

- **APIs** on `bedrock-runtime`: **Converse** and ConverseStream (one request shape across models; recommended for new apps), **InvokeModel** and InvokeModelWithResponseStream (provider-specific bodies), plus OpenAI-compatible Responses and Chat Completions. A separate `bedrock-mantle` endpoint also exists; its calls are **not captured by model invocation logging**.
- **Inference parameters:** temperature (lower = more deterministic), top P (cumulative probability share considered), top K (number of candidate tokens), max tokens, stop sequences.
- **Model choice:** cost, modality, latency, multilingual support, size and complexity, customisation, input and output length, and prompt caching support. Keep model IDs in configuration; the catalogue changes often.

**Ways to pay for and run inference**

| Option | What it is | Choose when |
|---|---|---|
| On-demand (**Standard** tier) | Pay per token, shared capacity | The default |
| **Priority** tier | Premium price, fastest responses | Latency-critical traffic |
| **Flex** tier | Discounted, best effort | Latency-tolerant work such as evaluations and background agent steps |
| **Reserved** tier | Tokens-per-minute reservation for 1 or 3 months, through your account team; overflows to Standard | Steady, predictable high volume |
| **Batch inference** | Asynchronous jobs, input and output in S3 | Large offline jobs. Not for provisioned models; with the Converse format, tool calling isn't supported |
| **Provisioned Throughput** | Model Units bought by the hour: no commitment, 1 month or 6 months. Billing runs until you delete it | Guaranteed throughput. The docs say custom models need it, but other pages mention on-demand inference for some custom models, so check the current docs |
| **Cross-Region inference** | Inference profiles route requests to other Regions. **Geographic** keeps data in a geography (US, EU, APAC); **Global** uses any supported commercial Region at lower cost | Geographic for data residency, Global for cost and capacity. Inference profiles don't support Provisioned Throughput |
| **Intelligent Prompt Routing** | One endpoint routes between two models in the same family based on predicted quality | Cut cost on mixed easy and hard prompts. English-optimised |

Priority, Standard and Flex share your on-demand quota. Discount and premium percentages change; read the pricing page.

**Cross-Region inference details:** the price is set by the source Region and there is no routing charge. CloudTrail logs in the source Region, and `additionalEventData.inferenceRegion` shows where the request ran. SCPs must allow every destination Region of a Geographic profile; for Global, they must allow `aws:RequestedRegion` = `unspecified`.

### 5.5 Prompts: engineering, Prompt Management, Flows and caching

- **Prompt parts:** context, instruction, negative prompts, examples. **Techniques:** zero-shot, single-shot, few-shot, chain-of-thought, prompt templates.
- **Prompt risks:** exposure (leaking the system prompt), poisoning, hijacking, jailbreaking and **prompt injection** (including through retrieved documents and tool results).
- **Bedrock Prompt Management:** prompts with variables, **variants** compared side by side, **versions**, prompt optimisation, and an option to turn on prompt caching. Use a prompt directly in inference or in a Flow prompt node. In AIP-C01 this is Domain 1 Task 1.6 (prompt governance).
- **Amazon Bedrock Flows** (formerly Prompt Flows): a visual builder linking prompts, models, Knowledge Bases, Lambda and other services. Lifecycle: working draft → prepare → test → publish an immutable **version** → **alias** pointing at a version. Apps call `InvokeFlow` on the alias; **roll back by repointing the alias**.

**Prompt caching**

- Cuts latency and input cost when a long prefix is reused (a document in a chat, a long system prompt, tool definitions).
- **Implicit** caching is automatic and best effort. **Explicit** caching uses cache checkpoints (`cachePoint` in Converse, `cache_control` in InvokeModel).
- Put static content first. The minimum tokens per checkpoint depends on the model. The default TTL is 5 minutes and resets on each hit; some models offer 1 hour.
- Cache writes can cost more than normal input; cache reads cost less. Check `cacheReadInputTokens` and `cacheWriteInputTokens` in the response.
- **On-demand only. Not with batch inference.**

### 5.6 RAG with Knowledge Bases

| Choice | Options | Remember |
|---|---|---|
| Knowledge Base type | **Managed** (recommended) or **Customer-managed** | Managed has connectors (S3, SharePoint, Confluence, Google Drive, OneDrive, Web Crawler), document-level access filtering (not for Web Crawler), Smart Parsing and Agentic Retrieval for multi-hop questions |
| Vector store (customer-managed) | OpenSearch Serverless, OpenSearch Service managed clusters, **S3 Vectors**, Aurora PostgreSQL (pgvector), **Neptune Analytics** (GraphRAG), Pinecone, Redis Enterprise Cloud, MongoDB Atlas | Only the OpenSearch options support binary vectors. S3 Vectors is the low-cost choice for infrequent queries, with tight per-vector metadata limits. Third-party credentials live in Secrets Manager |
| Other KB sources | Structured data stores, Amazon Kendra GenAI index, Neptune Analytics graphs | Structured stores answer questions over tables |
| Chunking | Default (about 300 tokens), fixed-size with overlap, **hierarchical** (parent and child), **semantic** (uses a model, costs more), none | Hierarchical can return fewer results than requested because children are replaced by parents |
| Retrieval quality | Metadata filters, **reranking** models, hybrid search, citations | Filters restrict which chunks can come back; reranking reorders them |

- **Embedding models** listed in the docs include Titan Text Embeddings V2 (1,024, 512 or 256 dimensions) and Cohere Embed. Changing the embedding model means re-embedding the corpus.
- **Aurora setup:** an HNSW index on the embedding column, GIN indexes on the text (hybrid search) and metadata, credentials in Secrets Manager, and the cluster in the same account.
- **Security:** encrypt third-party stores with KMS; reach OpenSearch Serverless privately through a VPC endpoint.
- **RAG vs fine-tuning:** RAG adds or updates facts and gives citations; fine-tuning changes style and behaviour. Prompting is cheapest, then RAG, then fine-tuning; pre-training from scratch is the most expensive.

### 5.7 Customising models

| Method | Data | Use when |
|---|---|---|
| Prompting and in-context learning | A few examples in the prompt | First thing to try |
| RAG | Your documents | Facts change or need citations |
| **Supervised fine-tuning** | Labelled prompt–response pairs | Consistent format, style or task behaviour |
| **Reinforcement fine-tuning** | Prompts plus a reward function (Lambda) or feedback, or invocation logs | Improve on a measurable objective without many labelled answers |
| **Distillation** | Your prompts or invocation logs; a large **teacher** model writes answers that train a smaller **student** | Smaller model, lower cost and latency, similar quality on your task |
| Continued pre-training | Unlabelled domain text | Concept only: not on Bedrock's main customisation page, and supported models are limited |
| Pre-training from scratch | Huge corpus | Almost never; most expensive |

- Training is billed by tokens processed, plus monthly storage for the custom model.
- **Training concepts in AIF-C01:** instruction tuning, transfer learning, domain adaptation, RLHF, data curation, governance, size, labelling and representativeness.
- **On SageMaker AI** (AIP-C01 Task 1.2): adapter methods such as LoRA, Model Registry for versions and rollback.

### 5.8 Agents: AgentCore, Strands, MCP and Agents Classic

**AgentCore services** (work with any framework and any model; consumption pricing)

| Service | What it does |
|---|---|
| **Runtime** | Serverless hosting with session isolation; long-running async agents; MCP and A2A protocols |
| **Memory** | Short-term (multi-turn) and long-term (across sessions) memory |
| **Gateway** | Turns APIs, Lambda functions and OpenAPI specs into **MCP tools**; connects existing MCP servers |
| **Identity** | Agent identity and auth with existing identity providers (Cognito, Okta, Entra ID, Auth0) |
| **Policy** | Deterministic rules enforced at the Gateway on every tool call (Cedar-compatible) |
| **Code Interpreter** / **Browser** | Sandboxed code execution; managed cloud browser |
| **Observability** | OpenTelemetry-compatible traces in CloudWatch |
| **Evaluations** | Agent and tool quality on sessions and traces |
| Newer | **Harness** (a managed agent loop from one API call; closest to Agents Classic), Registry, Optimization, Payments |

- **Strands Agents:** Python and TypeScript SDK. Tools via a `@tool` decorator or MCP. Multi-agent patterns: agents-as-tools, swarm, graph, workflow, A2A. Deploys to AgentCore, Lambda, Fargate, EKS or EC2.
- **Other agent building blocks in AIP-C01:** AWS Agent Squad, MCP servers on Lambda (stateless) or ECS (complex), Step Functions for ReAct-style loops and **human-in-the-loop** approval.
- **Agents Classic** concepts still appear in docs and older questions: action groups (OpenAPI or function schema + Lambda), attached Knowledge Bases, advanced prompt templates, traces, versions and aliases. **Accounts with no Agents activity in the previous 12 months get AccessDeniedException on CreateAgent.**
- **Classic → AgentCore map:** action groups → Gateway MCP tools; KB association → a retrieval tool; return of control → inline function tools; code interpreter → AgentCore Code Interpreter; session memory → AgentCore Memory; guardrails → Bedrock guardrail plus Gateway Policy; supervisor agents → agent-as-tool. The AgentCore CLI can import Classic configs.
- **Exam rule of thumb:** for a new build in late 2026, the right answer is AgentCore (or Strands on AgentCore), not "create a Bedrock agent".

### 5.9 Guardrails and responsible AI

**Bedrock Guardrails: six safeguards**

| Safeguard | Catches |
|---|---|
| **Content filters** | Hate, Insults, Sexual, Violence, Misconduct and **Prompt Attack**, in text and images, at adjustable strength |
| **Denied topics** | Subjects you define (for example investment advice) |
| **Word filters** | Custom words (such as competitor names) and a managed profanity list |
| **Sensitive information filters** | PII entities to **block or mask**, plus custom regex |
| **Contextual grounding checks** | Answers not grounded in the source, or not relevant to the query (RAG). Output only. Scores 0–0.99 against your threshold |
| **Automated Reasoning checks** | Validates answers against logical rules and suggests corrections |

- Guardrails apply to inputs and outputs, with custom blocked messages. Use them with a model call (guardrail ID and version) or on their own with the **ApplyGuardrail** API. Tag parts of a prompt to evaluate only user input (SDK only). Guardrails don't evaluate reasoning content blocks.
- **Tiers:** **Classic** (English, French, Spanish; shorter denied-topic definitions; strict grounding only) and **Standard** (broad language support; longer definitions; stronger prompt-attack detection; prompt leakage detection; harmful content in code; **requires guardrail cross-Region inference**). If you omit the tier on an update, it resets to Classic.
- **Enforcement:** across an organization with **Amazon Bedrock policies** in AWS Organizations, or per account and Region. Needs a numeric guardrail version. Org, account and request guardrails combine, and the most restrictive control wins. Automated Reasoning isn't supported in enforced guardrails.

**Responsible AI**

- **AWS's eight dimensions:** fairness, explainability, privacy and security, safety, controllability, veracity and robustness, governance, transparency.
- **AIF-C01 features list:** bias, fairness, inclusivity, robustness, safety, veracity. Legal risks: IP infringement, biased outputs, loss of trust, end-user risk, hallucinations. Include environmental and sustainability considerations in model choice.
- **Finding bias:** label-quality analysis, human audits, subgroup analysis. Datasets should be inclusive, diverse, curated and balanced.
- **Transparency tools in v1.2:** **SageMaker Model Cards** (intended use, risk rating, training and evaluation details; every edit is a new version), **Bedrock Model Evaluations**, open models, data and licensing. **AWS AI Service Cards** document AWS's own AI services.
- Clarify, Model Monitor and A2I still exist for current customers but are in maintenance. Don't pick them as the answer for a new AIF-C01 scenario unless nothing else fits; AIP-C01 still lists them.

### 5.10 Security, governance and compliance for AI

- **Shared responsibility:** AWS secures the cloud; you secure what you put in it (data, IAM, prompts, app logic).
- **Access:** IAM roles and least privilege; **AgentCore Identity** and **Policy in AgentCore** for agents.
- **Data protection:** KMS encryption at rest, TLS in transit, **Macie** to find PII in S3, **Comprehend** for PII in text, **PrivateLink** (VPC endpoints) to keep traffic off the internet, **Lake Formation** and the **Glue Data Catalog** for access and lineage.
- **Governance services in AIF-C01 v1.2:** **AWS Config** (resource compliance), **Amazon Inspector** (vulnerabilities), **AWS Artifact** (AWS compliance reports and agreements), **AWS CloudTrail** (API audit), **AWS Trusted Advisor** (best-practice checks). AWS Audit Manager is not named in v1.2.
- **Hallucination controls:** RAG grounding, contextual grounding checks, output validation, confidence scoring.
- **Model invocation logging** is **off by default**. Send it to CloudWatch Logs and/or S3 in the same account and Region. Large bodies (over 100 KB) and binary data go to S3 only. Entries include the caller's ARN, token counts and your `requestMetadata`, so you can report usage by team.

**Generative AI Security Scoping Matrix**

| Scope | You… | Example |
|---|---|---|
| 1 Consumer app | Buy | A public chatbot |
| 2 Enterprise app | Buy | SaaS with gen AI features |
| 3 Pre-trained models | Build on a third-party model via API | An app on Bedrock |
| 4 Fine-tuned models | Build, refining a model with your data | A fine-tuned model on Bedrock |
| 5 Self-trained models | Build from scratch | Your own model |

The higher the scope, the more of the security and governance work is yours.

### 5.11 Evaluating gen AI

| Method | Use it for |
|---|---|
| Benchmark datasets and automatic metrics (**ROUGE** for summaries, **BLEU** for translation, **BERTScore** for semantic similarity) | Repeatable comparison of models |
| **Human evaluation** (your team or SMEs) | Subjective quality, brand voice, high-stakes review |
| **LLM-as-a-judge** (model-as-a-judge) | Scaling quality scoring with explanations |
| **RAG evaluation** | Retrieval and answer quality for a Knowledge Base or external RAG source; usually needs ground-truth data |
| **Agent evaluation** (AgentCore Evaluations) | Tool choice and task success across sessions and traces |
| Business metrics | Task completion rate, user satisfaction, cost per interaction |

- **Bedrock Evaluations** job types: programmatic, human-based, model-as-a-judge and RAG evaluations. They work on foundation, Marketplace, custom and imported models and prompt routers.
- **AIP-C01 adds:** golden datasets, canary and A/B testing, deployment validation with synthetic workflows, and fairness evaluation with LLM-as-a-judge.

### 5.12 Operating gen AI: cost, quotas and monitoring

- **Quotas:** tokens per minute, tokens per day and requests per minute. At request start Bedrock reserves input tokens **plus `max_tokens`**; at the end it charges actual input, cache-write and output tokens, with output multiplied by a model-specific **burndown rate**. Cache reads don't count. Billing is for actual tokens.
- **Fixing early throttling:** lower an oversized `max_tokens`, use cross-Region inference, move latency-tolerant work to Flex or batch, or request a quota increase.
- **Cost levers:** a smaller model, shorter prompts, prompt caching, semantic caching of whole answers, batch for offline work, Flex tier, distillation, Intelligent Prompt Routing.
- **Monitoring:** CloudWatch metrics (the "Token Counts by Model" dashboard; ServiceTier and ResolvedServiceTier dimensions), invocation logs with Logs Insights, X-Ray and AgentCore Observability for traces, CloudWatch Synthetics for canaries, Cost Explorer and Cost Anomaly Detection for spend.
- **Troubleshooting:** context window overflow (trim or summarise history, retrieve less), guardrail blocks (read the guardrail trace in the response), grounding failures (threshold too strict, or a weak source), retrieval misses (chunking, metadata filters, embedding model).

### 5.13 Multi-account governance and identity

- **AWS Organizations:** OUs, consolidated billing, delegated administrators, and policy types including **SCPs**, **RCPs**, tag policies and backup policies.
- **SCP vs RCP:** an SCP limits what **principals in your accounts** can do. An RCP limits what can be done **to resources in your accounts**, including by principals outside the organization (a data perimeter). Neither grants permissions.
- **RCP rules:** they don't affect the management account or service-linked roles, don't apply to AWS managed KMS keys, cover only a subset of services (including S3, STS, KMS, SQS, Secrets Manager and DynamoDB), and require all features enabled. Test on a sandbox OU first.
- **Control Tower:** a landing zone built on Organizations, IAM Identity Center and Service Catalog. Controls are **preventive**, **detective** or **proactive**, and mandatory, strongly recommended or elective. **Account Factory** vends accounts; Control Tower detects drift.
- **Identity:** IAM Identity Center with SAML, OIDC and SCIM for workforce access; Cognito user pools and identity pools for app users; roles, permissions boundaries, session policies, external IDs and **ABAC** with tags; IAM Access Analyzer; **EKS Pod Identity**; **IAM Roles Anywhere** for on-premises workloads; **AWS Verified Access** for VPN-less app access.
- **Encryption:** KMS keys with automatic rotation; ACM and Private CA; CloudHSM for single-tenant HSMs; post-quantum **ML-DSA** signing keys in KMS and hybrid **ML-KEM** TLS on KMS, ACM and Secrets Manager endpoints.
- **Org-wide detection:** CloudTrail organization trails, Config aggregators, GuardDuty, **Security Lake**, **Security Hub CSPM** and the new Security Hub, Inspector, Systems Manager Patch Manager.

### 5.14 Networking and hybrid connectivity

- **Transit Gateway:** a Regional layer-3 router for VPCs, VPN, Direct Connect gateways and TGW Connect (SD-WAN). **TGW peering supports static routes only.** Turn on **appliance mode** for inspection VPCs so a flow stays on one AZ's appliance. For the same prefix, static beats propagated, and a Direct Connect route is preferred over VPN.
- **Direct Connect resiliency:** **maximum** = separate connections on separate devices in more than one location (99.99% SLA); **high** = connections in multiple locations (99.9%); **development and test** = one location. Test with the Resiliency Toolkit failover test. Site-to-Site VPN over the internet is the common backup.
- **Route 53 VPC Resolver** (formerly Resolver): **inbound endpoints** let on-premises systems resolve VPC names; **outbound endpoints plus forwarding rules** let VPCs resolve on-premises names. Share rules across accounts with RAM.
- **Private access:** VPC peering (non-transitive), **PrivateLink** for exposing one service, **VPC Lattice** and **ECS Service Connect** for service-to-service networking, VPC endpoint policies, **VPC IPAM** for address planning, **Cloud WAN** for global networks.
- **Inspection and protection:** Network Firewall, Gateway Load Balancer, WAF, Shield, security groups (stateful) vs network ACLs (stateless), VPC Flow Logs.
- **Edge and global:** CloudFront (with Origin Shield, Functions, Lambda@Edge), Global Accelerator, Route 53 routing policies (latency, geolocation, weighted, failover).
- **SAP-C03 adds:** IPv6 and dual-stack migration, split-horizon DNS, Local Zones, EKS Anywhere and ECS Anywhere, Outposts.

### 5.15 Resilience and disaster recovery

| Strategy | Running in the DR Region | RTO / RPO | Cost |
|---|---|---|---|
| **Backup and restore** | Backups only; redeploy with IaC | Hours / hours | Lowest |
| **Pilot light** | Data stores live and replicating; app tier off | Tens of minutes; must start servers before serving traffic | Low |
| **Warm standby** | Scaled-down but fully working copy | Minutes; can serve at once, then scales up | Medium |
| **Multi-site active/active** | Full copy taking traffic | Near zero RTO; RPO still above zero for data corruption | Highest |

- **Replication options:** S3 Cross-Region Replication (with Replication Time Control), RDS cross-Region read replicas, **Aurora Global Database** (up to five secondary Regions, typical lag under a second), **DynamoDB global tables**, DocumentDB global clusters, ElastiCache Global Datastore.
- **Aurora Global Database:** **switchover** for planned moves (RPO 0); **failover** with data loss allowed for outages. Use the global writer endpoint.
- **Fail over with data-plane operations.** Route 53 health checks and **ARC routing controls** are data plane. Changing record weights or Global Accelerator traffic dials are control-plane changes, so don't rely on them during a regional event. Relying on Auto Scaling to grow a warm standby is also a control-plane dependency.
- **AWS Elastic Disaster Recovery:** continuous block-level replication into a low-cost staging area (a pilot-light model). For workloads already on AWS it covers EC2, not RDS.
- **AWS Backup:** cross-Region and cross-account copies and Vault Lock, but **no scheduled automatic restore**; automate restores yourself. Protect backups with **S3 Object Lock**, **EBS snapshot lock** and Backup Vault Lock.
- **Prove it:** **Resilience Hub** checks workloads against RTO and RPO targets; **Fault Injection Service** runs chaos experiments; Systems Manager runbooks automate recovery.
- AWS suggests a separate account per Region for DR isolation.

### 5.16 Migration and modernisation

**The 7 Rs**

| Strategy | Means | Example |
|---|---|---|
| **Retire** | Turn it off | Zombie apps with very low use |
| **Retain** | Keep it where it is, for now | Recent upgrade, hard dependency |
| **Rehost** | Lift and shift | AWS Transform MGN to EC2 |
| **Relocate** | Move the platform as is | VMware workloads, or moving across accounts or Regions |
| **Repurchase** | Drop and shop | Move to SaaS |
| **Replatform** | Lift, tinker and shift | Self-managed SQL Server to Amazon RDS |
| **Refactor** | Re-architect | Monolith to containers or serverless |

- For large migrations AWS recommends rehost, replatform, relocate or retire first, and modernising **after** the move. Refactor is the most complex and costly.
- **Tools now:** **AWS Transform** (agentic discovery, assessment and modernisation: VMware, mainframe, .NET, Java), **AWS Transform MGN** (rehost replication), **DMS** (data replication, including ongoing change data capture), **DMS Schema Conversion** (schemas, not data; managed and built on the SCT engine), **DataSync** (online file and object transfer), **Transfer Family** (SFTP and similar into S3 or EFS), **Data Transfer Terminal** (physical upload at an AWS facility).
- **Don't pick for a new customer:** Migration Hub, Application Discovery Service, Snowball Edge.
- **Modernisation patterns:** strangler fig, containers (ECS, EKS, Fargate), serverless and event-driven design, purpose-built databases, Step Functions and **Lambda durable functions** for multi-step workflows (each Lambda invocation is still capped).
- **Event-driven design rules (SAP-C03 Task 1.1):** make consumers idempotent, know your ordering and delivery guarantees, keep services stateless.

### 5.17 Cost optimisation

- **Purchasing:** On-Demand, **Savings Plans** (Compute, EC2 Instance, and the newer **Database Savings Plans** across Aurora, RDS, DynamoDB, ElastiCache and others), **Reserved Instances**, **Spot** (and Fargate Spot) for interruptible work, **Graviton** for price-performance.
- **Visibility:** cost allocation tags (apply from activation onward, so activate early), **Cost Explorer**, the **Cost and Usage Report**, **cost categories**, split cost allocation data, **Budgets**, **Cost Anomaly Detection**, Compute Optimizer, Trusted Advisor, S3 Storage Lens. Enforce tags with tag policies, SCPs and Config rules.
- **Data transfer:** CloudFront with Origin Shield, VPC gateway endpoints for S3 and DynamoDB instead of NAT gateways, AZ-aware design, and awareness of Transit Gateway data-processing and PrivateLink charges.
- **Storage and databases:** S3 Intelligent-Tiering and Lifecycle rules, Glacier classes, EFS lifecycle, **gp3** over gp2, DynamoDB on-demand vs provisioned capacity, Aurora Serverless, **Aurora I/O-Optimized** for I/O-heavy clusters, **Data Lifecycle Manager** for snapshots.
- **Workflows:** Step Functions **Standard** (long-running, exactly-once) vs **Express** (high-volume, short) changes cost a lot.
- **Gen AI cost (SAP-C03 Task 3.1 and 3.3):** Bedrock and SageMaker AI pricing tiers, batching, caching, cross-Region inference routing and **token usage monitoring** by team.

### 5.18 Operational excellence and automation

- **Infrastructure as code:** CloudFormation and CDK; **StackSets** for many accounts and Regions; **CloudFormation Hooks** and **CDK aspects** to block non-compliant resources before deployment; secrets in Secrets Manager or Parameter Store.
- **CI/CD and DevSecOps:** CodePipeline, CodeBuild, CodeDeploy, CodeCommit; cross-account pipelines; image scanning in ECR and Inspector; artifact signing; blue/green, canary and rolling deployments; **Bedrock Evaluations** as a pipeline gate for gen AI changes.
- **Observability:** CloudWatch metrics, logs and alarms, X-Ray, **AWS Distro for OpenTelemetry (ADOT)**, Container Insights, cross-account log subscriptions, **Synthetics** and **RUM**, **SLOs in CloudWatch Application Signals**, and AI or agent metrics such as drift.
- **Self-healing:** Service Quotas monitoring, circuit breakers, rate limits, bulkheads, exponential backoff with jitter, target tracking and predictive scaling, ECS task replacement, Lambda retries, automated runbooks.

---

## 6. Exam: AI Practitioner (AIF-C01)

**Who:** anyone who uses or evaluates AI on AWS, with up to about six months of exposure to AI/ML on AWS. You use AI solutions; you don't have to build them. No coding.

**Format:** 65 items (50 scored) in 90 minutes, pass 700. Multiple choice, multiple response, ordering and matching. This site's practice test uses 65 items in 90 minutes, multiple choice and multiple response only.

| Domain | Weight | Lessons | Must-know |
|---|---|---|---|
| Fundamentals of AI and ML | 20% | AI, ML, deep learning, GenAI and agentic AI: the core vocabulary · Learning types and inference options · When to use AI and which AWS AI service fits · ML lifecycle, MLOps, SageMaker AI and metrics | AI vs ML vs DL vs gen AI vs agentic AI; supervised, unsupervised, reinforcement; real-time, serverless, async, batch; managed AI service per need; precision, recall, F1; when not to use AI |
| Fundamentals of GenAI | 24% | Generative AI Building Blocks · Gen AI Use Cases and Limits · Foundation Model Lifecycle · AWS Gen AI Services and Costs | Tokens, chunking, embeddings, context engineering, MCP and agent concepts; hallucination and nondeterminism; lifecycle stages; Bedrock, JumpStart, Nova, AgentCore, Strands, Kiro, Quick; token pricing vs Provisioned Throughput |
| Applications of Foundation Models | 28% | Choosing a foundation model and tuning inference · RAG with Knowledge Bases, and AI agents · Prompt engineering and prompt security · Customising foundation models: prompting to distillation · Evaluating foundation models and applications | Selection criteria incl. prompt caching; temperature, top P, top K; Knowledge Bases and vector stores; prompting techniques and injection risks; cost ladder from prompting to pre-training; ROUGE, BLEU, BERTScore, LLM-as-a-judge, RAG and agent evaluation |
| Guidelines for Responsible AI | 14% | Responsible AI: features, data, bias and legal risk · AWS tools for responsible AI: Guardrails, evaluations and model cards · Transparency, explainability and their trade-offs | Responsible AI features; legal risks; bias detection methods; Guardrails safeguards; Model Cards; Bedrock Model Evaluations; safety vs transparency trade-offs; sustainability |
| Security, Compliance, and Governance for AI Solutions | 14% | Securing AI systems on AWS · Governance and compliance for AI | Shared responsibility; IAM, KMS, Macie, PrivateLink; AgentCore Identity and Policy; prompt injection and data leakage; Config, Inspector, Artifact, CloudTrail, Trusted Advisor; Scoping Matrix; data lineage and residency |

**Exam day**

- The real exam has **ordering** and **matching** items that this site doesn't practise. For ordering, rehearse sequences: the ML lifecycle and the foundation model lifecycle. For matching, rehearse service-to-need pairs (section 5.2 and 5.3 tables).
- Learn the v1.2 names. Older practice tests use Amazon Q, PartyRock, Clarify and Audit Manager as answers; v1.2 doesn't name them.
- Out-of-scope services in the guide include GuardDuty, Security Hub, Cognito, WAF, Shield, Control Tower and Route 53. If one appears as an option, it's probably a distractor.

**Top traps**

- Missing or changing facts → **RAG / Knowledge Bases**, not fine-tuning.
- A new agent build → **AgentCore** (with Strands), not Bedrock Agents Classic.
- Prompt caching for a batch job → caching is on-demand only.
- Precision vs recall → recall when missing a positive is costly (fraud, disease); precision when false alarms are costly.
- Asynchronous vs serverless inference → large payloads or long processing vs idle gaps between bursts.
- Comprehend vs Textract → meaning of text vs getting text out of documents.
- Guardrails vs IAM → Guardrails filter content; IAM controls who can call what.
- AWS Artifact vs AWS Config → AWS's own compliance reports vs your resource compliance.
- Model Cards vs AI Service Cards → your models vs AWS's services.
- Higher temperature for a factual assistant → lower it.
- Scope 3 vs Scope 4 in the Scoping Matrix → using a model via API vs fine-tuning it with your data.
- Pre-training from scratch to add company knowledge → the most expensive option; use RAG.

**Fast plan:** 2 weeks at about an hour a day (section 11).

---

## 7. Exam: Machine Learning Engineer – Associate (MLA-C02)

> **MLA-C01 → MLA-C02.** The last day to take MLA-C01 in English was **28 September 2026**. It is still offered in Japanese, Korean and Simplified Chinese (65 items, 130 minutes, $150). **MLA-C02 is in beta**, in English only: registration opened 1 September 2026 and delivery started **29 September 2026**. AWS has **not yet published the GA registration and delivery dates**. The exam page says the domain structure stays the same and no new domains were added, but the content inside the domains changed a lot: less edge and model-compression work, much more generative AI, RAG, agents and observability.

**Who:** at least 1 year using SageMaker AI, Amazon Bedrock and other AWS ML services, plus at least 1 year in a related role (backend developer, DevOps engineer, data engineer or data scientist). AWS expects both traditional ML and gen AI experience. Out of scope: designing full end-to-end AI/ML architectures, setting ML strategy, integrating many new tools, and working deeply in two or more ML domains.

### 7.1 Exam facts

| Item | Beta (now) | GA (exam guide) |
|---|---|---|
| Items | **85** | **65: 50 scored, 15 unscored** (unscored items are not marked) |
| Time | **170 minutes** | Not published yet. MLA-C01 was 130 minutes |
| Fee | **$75** (beta pricing) | Not published yet. MLA-C01 was $150 |
| Passing score | The guide says the pass/fail description does not apply to the beta | **720** (scaled 100–1,000), compensatory |
| Item types | Multiple choice, multiple response | Multiple choice (1 correct of 4), multiple response (2 or more correct of 5 or more; pick all of them for credit) |
| Languages | English only | English, Japanese, Korean, Simplified Chinese |
| Delivery and validity | Pearson VUE, test centre or online proctored; valid 3 years | Same |

- The exam page's beta table shows the code "ME1-C02". Everything else, including the exam guide, says **MLA-C02**. Book against what the registration page shows.
- No penalty for guessing; answer every item.
- Exams use short service names (for example, Amazon SNS). The in-exam Help lists the full names.
- **On this site:** 22 lessons, flashcards, practice questions and a timed practice test of **65 items in 130 minutes**. That is the GA item count with the MLA-C01 time, used as an estimate until AWS publishes the GA time. If you sit the beta, practise once at 85 items in 170 minutes too.

### 7.2 Domains and lessons

| Domain | Weight | Lessons | Must-know |
|---|---|---|---|
| Data Preparation for ML and AI | 28% | Collecting and storing ML data on AWS · Preparing data for RAG: vector stores, embeddings and chunking · Transformation and feature engineering · SageMaker Feature Store · Data quality, bias, labeling and splitting · PII handling and data for FM customisation | Parquet/ORC vs CSV/JSON; Firehose format conversion; Kinesis vs Flink; Glue vs EMR; KB vector stores and chunking; Data Wrangler in Canvas; DataBrew; online vs offline store; Glue Data Quality; CI and DPL; split before you fit or resample; Macie, Comprehend PII, Guardrails masking; JSONL for Bedrock fine-tuning |
| ML Model and Foundation Model (FM) Development | 24% | Choosing a modeling approach · Training at scale on SageMaker AI · Hyperparameter tuning with AMT · Customising foundation models and versioning · Evaluating ML models and FMs | AI services vs built-in algorithms vs script mode vs Bedrock vs JumpStart; RAG vs fine-tuning; data vs model parallel; HyperPod; Spot with checkpoints; grid, random, Bayesian, Hyperband; SFT, RFT, distillation; catastrophic forgetting; Model Registry and MLflow; precision, recall, PR AUC, RMSE; ROUGE, BLEU, BERTScore, LLM-as-a-judge; SHAP |
| Deployment and Orchestration of ML and AI Workflows | 24% | Choosing a SageMaker AI inference option · Hosting many models and rolling out safely · Provisioning compute, auto scaling and containers · Infrastructure as code and CI/CD for ML · Orchestrating ML and AI workflows · Agentic workflows with Bedrock and AgentCore | Real-time, serverless, async, batch limits; MME and inference components; shadow tests vs production variants; deployment guardrails; Inference Recommender; auto scaling; ECR with immutable tags; CDK and CloudFormation; CodeConnections; EventBridge on Model Registry events; Pipelines vs Step Functions vs MWAA; KB ingestion jobs; AgentCore Runtime, Gateway, Memory; MCP vs A2A |
| Operating, Monitoring, and Securing ML and AI Solutions | 24% | Monitoring inference quality and drift · Observability for endpoints, generative AI and agents · Right-sizing and cost optimisation for ML and AI · Securing ML workloads: identity, network and encryption · Guardrails, governance and audit | Drift = capture + baseline + schedule + alarm; model quality needs ground truth; ModelLatency vs OverheadLatency; CloudWatch generative AI observability; invocation logging vs CloudTrail; Spot, Savings Plans, prompt caching; execution roles; PrivateLink; network isolation; KMS; Bedrock API keys; Inspector and CodeGuru; Guardrails; Model Cards, Registry, lineage |

**Task statements** (from the exam guide)

- **D1:** 1.1 Collect and store data · 1.2 Perform data transformation, feature engineering, and pre-processing · 1.3 Validate data quality and manage bias
- **D2:** 2.1 Choose appropriate modeling approaches for ML and AI solutions · 2.2 Train, fine-tune, and customize models for ML and AI solutions · 2.3 Analyze and evaluate the performance of ML and AI systems
- **D3:** 3.1 Manage deployment infrastructure for ML and AI model types · 3.2 Provision and configure resources for ML and AI workloads based on existing architecture and requirements · 3.3 Implement automated orchestration and CI/CD pipelines for MLOps and AI workloads
- **D4:** 4.1 Monitor ML and AI model inference and performance · 4.2 Optimize and manage ML and AI infrastructure costs and performance · 4.3 Secure ML and AI workloads and model endpoints

### 7.3 What changed from MLA-C01

Weights: Domain 2 went from 26% to 24% and Domain 3 from 22% to 24%. Domains 1 and 4 are unchanged. Domain names now say "ML and AI". The guide's comparison page lists every change; the main ones:

| Removed in C02 | Added in C02 |
|---|---|
| Optimising models on edge devices (SageMaker Neo). AWS IoT services, including Greengrass, are out of scope | Vector databases (OpenSearch Service, RDS with pgvector, Amazon S3), embedding models, RAG chunking and metadata, retrieval and embedding optimisation, reranking, RAG architecture patterns |
| Bring your own container (BYOC) with SageMaker. "Build and maintain containers" stays, so know ECR and image hygiene, not BYOC mechanics | Masking and redaction of PII; prompt-response pair validation and content safety screening; multimodal bias metrics |
| Fine-tuning pre-trained models with custom datasets in Bedrock or JumpStart (as worded in C01). Fine-tuning itself is still in scope | Script mode, catastrophic forgetting, ensembles; AWS AI services (Textract, Rekognition, Comprehend, Transcribe) as modelling choices |
| Reducing model size (pruning, compression, data types) | MLflow and Bedrock Prompt Management; BLEU, ROUGE, BERTScore and semantic similarity; LLM-as-a-judge; RAG monitoring |
| Loading data into training resources (EFS, FSx) | Bedrock Custom Model Import; agent communication protocols; agent state management; GPU scaling; agent version pipelines; prompt testing; knowledge base refresh pipelines |
| Monitoring infrastructure with EventBridge events; troubleshooting capacity (provisioned concurrency, service quotas, auto scaling) | CodeConnections; agent failure monitoring (truncated streaming, tool failures); token, embedding and vector-store cost; CodeGuru and Inspector in CI/CD; Bedrock API keys vs IAM credentials; Guardrails |

New in-scope services worth checking against older courses: **Amazon Bedrock AgentCore**, **Glue Data Quality**, **CodeConnections** and **Amazon Quick**.

### 7.4 Services in maintenance mode, and what the guide names instead

AWS's June 2026 availability update put these SageMaker AI features into **maintenance, closed to new customers from 30 July 2026**: **Augmented AI (A2I), Clarify, Debugger, Geospatial, Ground Truth, Mechanical Turk, Model Monitor, Role Manager and Studio Lab**. **Ground Truth Plus** reached end of support on 30 June 2026, and **SageMaker Profiler** is entering sunset. Existing customers can keep using them. (Some Clarify docs give 30 June 2026; the availability update lists Clarify under 30 July.)

The MLA-C02 guide doesn't name any of them. It describes the job in generic words and names newer tools instead. Older courses and practice tests use these services as the default answer; for a new build in late 2026, don't.

| Job | Older answer (maintenance) | What the guide and docs point to now |
|---|---|---|
| Label and annotate data | Ground Truth, Ground Truth Plus, Mechanical Turk | The guide says only "label and annotate data" and names no service. Treat Ground Truth concepts (private or vendor workforce, automated labelling) as background |
| Pre-training bias metrics (CI, DPL and others) | Clarify | Compute the metrics with pandas and scikit-learn (AWS's own advice on the Clarify availability page) |
| Explain model outputs | Clarify (SHAP inside) | The open-source **SHAP** library. For FM evaluation: `fmeval` or **Bedrock Evaluations** |
| Debug convergence, vanishing gradients, overfitting | Debugger, Profiler | Training metrics in **MLflow on SageMaker AI** or **CloudWatch**; the guide says "debug model convergence issues" without naming a tool |
| Drift detection and model quality | Model Monitor | AWS's open-source SageMaker AI monitoring solutions (**MLflow Apps plus Evidently AI**), QuickSight dashboards and **CloudWatch anomaly detection** |
| Monitor gen AI apps and agents | — | **CloudWatch generative AI observability** and **AgentCore Observability** (both named in the guide) |
| Evaluate FMs and RAG | — | **Bedrock Model Evaluation** (programmatic, human, LLM-as-a-judge, RAG) |
| Human review of predictions | A2I | Build the review step yourself, for example a Step Functions task token or a Pipelines Callback step |
| Agents | Bedrock Agents (now **Agents Classic**, closed to new customers since 30 July 2026) | **AgentCore** (Harness or Runtime). Knowledge Bases and Guardrails are not affected |

Also changed: **Data Wrangler now lives inside SageMaker Canvas** (with a natural-language interface), and **MLflow Apps** (serverless, MLflow 3.x) sit alongside MLflow Tracking Servers.

### 7.5 Decision tables

**SageMaker AI endpoint types**

| Option | Limits | Choose when | Watch out |
|---|---|---|---|
| **Real-time** | Payload up to 25 MB; 60 s processing (8 min when streaming) | Steady, low-latency, interactive traffic; GPUs; VPC access | A persistent endpoint; delete it after each lab |
| **Serverless** | Payload up to 4 MB; 60 s; 1,024–6,144 MB memory; image up to 10 GB; max concurrency 200 per endpoint | Intermittent traffic with idle gaps; cold starts are acceptable | **No** GPUs, VPC configuration, network isolation, data capture, multi-model, multiple production variants, Model Monitor or inference pipelines. Provisioned Concurrency reduces cold starts; `OverheadLatency` shows them. Converts to real-time, not back |
| **Asynchronous** | Payload up to 1 GB; up to 1 hour processing | Large inputs or long jobs; requests are queued; near real time | Can scale to zero on an empty queue |
| **Batch transform** | GB-scale datasets; can run for days | Offline scoring of a whole dataset on a schedule | Leaves no endpoint running |
| **Multi-model endpoint** | Many models, one container, loaded from S3 on demand | Many similar models (per-tenant) invoked unevenly | Not on serverless; not with Model Monitor or shadow tests |
| **Inference components** | Per-model compute and independent scaling on a shared endpoint | Several different models sharing instances | Don't memorise numbers from courses; check the docs |

Rollouts on real-time endpoints: **shadow tests** copy live traffic to a shadow variant and return only production responses (not for serverless, async, multi-model or multi-container); **production variants** split real traffic by weight for A/B tests; **deployment guardrails** shift traffic all at once, canary or linear, with rollback on a CloudWatch alarm.

**Bedrock vs JumpStart vs custom training vs AI services**

| Need | Pick | Why |
|---|---|---|
| A standard task: text from documents, sentiment or PII in text, speech to text, image analysis | **Textract, Comprehend, Transcribe, Rekognition** | No training at all |
| Gen AI through an API with no infrastructure | **Amazon Bedrock** | Serverless, pay per token |
| Answers from documents that change often | **Bedrock Knowledge Bases (RAG)** | Re-ingest instead of retraining |
| Change an FM's style, format or behaviour | **Bedrock customisation**: supervised fine-tuning (labelled pairs), reinforcement fine-tuning (reward function), distillation (prompts plus a teacher model) | Served through Provisioned Throughput, or an on-demand custom model deployment where the base model supports it |
| Use open weights you already have in Bedrock | **Custom Model Import** (Hugging Face format in S3; supported architectures only) | On-demand InvokeModel. No batch inference, no CloudFormation, no embedding models |
| An open model on infrastructure you control | **SageMaker JumpStart** | Deploys to a SageMaker AI endpoint you choose and pay for |
| Your own framework code (PyTorch, TensorFlow, scikit-learn) | **SageMaker AI training with script mode** in a prebuilt container | Minimal code changes; lower effort than a custom container |
| Tabular problem with a known algorithm | **SageMaker AI built-in algorithms** | No container to write |
| Long FM training on large clusters | **SageMaker HyperPod** (Slurm or EKS) | Detects and replaces faulty nodes |

Continued pre-training appears in the exam guide's data-prep wording, but Bedrock's current customisation page lists only SFT, reinforcement fine-tuning and distillation. Treat it as a concept.

**Data formats and stores**

| Need | Pick |
|---|---|
| Analytics queries that read a few columns | **Parquet** or **ORC** (columnar), partitioned in S3 |
| Simple interchange, small files, row-at-a-time tools | CSV or JSON |
| Land streaming events in S3, optionally converting JSON to Parquet/ORC | **Data Firehose** |
| Custom, multi-consumer stream processing | **Kinesis Data Streams** |
| Stateful real-time analytics | **Managed Service for Apache Flink** |
| Serverless Spark ETL and a data catalog | **AWS Glue**; managed clusters you control → **EMR** |
| Visual, no-code profiling and cleaning | **Glue DataBrew** or **Data Wrangler in Canvas** |
| Data quality rules | **Glue Data Quality**, DataBrew |
| Features for real-time inference | **Feature Store online store** (latest record per ID, low-ms reads, written with `PutRecord`) |
| Historical features for training | **Feature Store offline store** (append-only Parquet in S3, query with Athena; use event time for point-in-time sets) |
| Bedrock fine-tuning data | **JSONL**: `prompt`/`completion`, or Converse format with `schemaVersion: "bedrock-conversation-2024"` |

**Vector stores for Bedrock Knowledge Bases**

| Store | Use when | Limits to know |
|---|---|---|
| **OpenSearch Serverless** | General default; private access through a VPC endpoint | Supports binary vectors |
| **OpenSearch Service managed clusters** | You already run OpenSearch | Binary vectors supported. **VPC-only domains are not supported** for Knowledge Bases |
| **Amazon S3 Vectors** | Large corpora queried infrequently, where cost matters most | Float embeddings only; up to 1 KB of custom metadata and 35 metadata keys per vector; 1–4,096 dimensions; cosine or Euclidean. Hierarchical chunking is not recommended |
| **Aurora PostgreSQL (pgvector)** | You already run Aurora and want SQL alongside vectors | Same account; credentials in Secrets Manager |
| **Neptune Analytics** | GraphRAG over connected data | — |
| Pinecone, Redis Enterprise Cloud, MongoDB Atlas | You already use them | Credentials in Secrets Manager |

The index dimension must equal the embedding model's output (Titan Text Embeddings V2: 1,024, 512 or 256; Cohere Embed: 1,024). A new embedding model means re-embedding everything. New documents in S3 aren't retrievable until an **ingestion job** syncs the data source. See section 5.6 for chunking.

**SageMaker Pipelines vs Step Functions vs MWAA**

| Pick | When | Key features |
|---|---|---|
| **SageMaker Pipelines** | ML-centric workflow: process, train, tune, evaluate, register, deploy | Step types including Processing, Training, Tuning, Condition, Callback, Lambda, Register model, Transform, Fail and the `@step` decorator; lineage; Model Registry integration; step caching skips unchanged steps |
| **Step Functions** | Workflows across many AWS services, with retries, error handling and human approval | Task tokens to wait for external work or a person |
| **Amazon MWAA** | You already have Airflow DAGs | Move them with minimal change instead of rewriting |
| **EventBridge** | React to events, such as a Model Registry approval status change | Starts the deploy pipeline; no polling |
| **CodePipeline + CodeBuild** | CI/CD for code, containers and IaC | **CodeConnections** for GitHub, GitLab and Bitbucket sources |

A common pattern: a model build pipeline (Pipelines) registers a version with "pending" status; a Condition step gates on metrics; a person approves in Model Registry; EventBridge starts a deploy pipeline with a manual approval before production.

**Monitoring and drift**

| Question | Tool or approach |
|---|---|
| Has the input data changed from training? (data quality drift) | Data capture + baseline from training data + scheduled comparison + alarm. No labels needed |
| Is accuracy dropping? (model quality) | Merge **ground truth labels** with captured predictions, then compare |
| Bias drift or feature attribution drift | Same pattern with bias metrics or SHAP values |
| Tool for a new build | MLflow Apps plus Evidently AI, dashboards, CloudWatch anomaly detection. Model Monitor only for existing customers (tabular only; no multi-model endpoints) |
| Is latency in my model or in SageMaker? | `ModelLatency` (inside the container) vs `OverheadLatency` (SageMaker overhead, including serverless cold starts) |
| Gen AI tokens, latency, errors, throttles, cost | **CloudWatch generative AI observability** (Model Invocations dashboard, AgentCore agents dashboard; P90 and P99 latency) |
| Full prompts and responses | **Bedrock model invocation logging** (off by default). CloudTrail records API calls, not payloads |
| Which hop failed in a RAG or agent request | Traces: X-Ray, ADOT, AgentCore Observability. Watch for truncated streaming and tool invocation failures |
| RAG quality over time | Bedrock RAG evaluation with ground truth; retrieval and answer scores |

### 7.6 Security in one list

- **Execution roles** scoped to specific buckets, ECR repositories and KMS keys.
- **PrivateLink** interface endpoints for the SageMaker API and runtime and for Bedrock, plus an S3 gateway endpoint. No NAT gateway needed.
- **Network isolation** blocks all outbound calls from the container. Real-time endpoints can join your VPC; serverless endpoints can't.
- **KMS customer managed keys** for data, model artifacts and volumes when you need control and audit of decryption.
- **Bedrock API keys:** **short-term** keys last up to 12 hours or the session (whichever is shorter), inherit the IAM principal's permissions, work in one Region and are recommended for production. **Long-term** keys create an IAM user and are for exploration only. Control them with `bedrock:CallWithBearerToken`, the `bedrock:bearerTokenType` condition key and `iam:ServiceSpecificCredentialAgeDays`. CloudTrail logs the calls, not the keys.
- **CI/CD scanning:** Inspector for container images, CodeGuru for code, ECR image scanning and immutable tags.
- **Audit:** CloudTrail ("who did what"), AWS Config ("how is it configured, is it compliant"), Model Cards (documentation), Model Registry (versions and approval gates), lineage tracking (data to endpoint).
- **Guardrails** on inputs and outputs (section 5.9). `ApplyGuardrail` screens text for models outside Bedrock.

### 7.7 Exam day

- Find the deciding constraint: payload size, processing time, idle gaps, "least operational overhead", "without retraining", "new AWS customer".
- If an option is a maintenance-mode service (Clarify, Model Monitor, Debugger, Ground Truth, A2I, Agents Classic) and the stem describes a new build, look for the alternative in section 7.4.
- Out of scope in the guide: all AWS IoT services (including Greengrass), DeepRacer, Cognito, GuardDuty, Security Hub, WAF, Shield, ACM, CloudHSM, Audit Manager, AWS Artifact, Managed Grafana, Route 53, Global Accelerator, AppFlow, DataZone, Clean Rooms, Elastic Beanstalk, App Runner, CodeCatalyst and Fault Injection Service. If one appears, it's probably a distractor.
- Don't rely on specific Bedrock model names or context sizes; the catalogue changes constantly.

### 7.8 Top traps

- Large CSV lake, slow Athena queries on three columns → convert to partitioned Parquet or ORC.
- A Kinesis consumer on EC2 just to land events in S3 → Data Firehose.
- Scaling or one-hot encoders fitted on the full dataset → split first, fit on training data only.
- Oversampling before the split → resample only the training split.
- Label-encoding nominal categories for a linear model → one-hot.
- Building historical training sets from the online store → offline store with Athena.
- Fine-tuning so an FM "knows" documents that change daily → RAG with Knowledge Bases.
- A custom model to read invoices → Textract.
- BYOC as the default way to run custom code → script mode in a prebuilt container.
- Model parallelism for a small model on a huge dataset → data parallelism.
- Spot training without checkpoints → write checkpoints to S3.
- More epochs for a model that already overfits → regularisation or early stopping.
- Grid search over a continuous learning rate → grid is categorical only.
- Bayesian tuning at maximum parallelism → random search suits maximum concurrency.
- Hyperband with `TrainingJobEarlyStoppingType` on → it must be OFF; Hyperband stops jobs itself.
- Invoking a fine-tuned Bedrock model like a base model → Provisioned Throughput, or an on-demand custom model deployment where supported.
- Distillation with no teacher model → labelled data means SFT; a grader means RFT.
- 99.5% accuracy on 99.5% negatives → use recall, precision or PR AUC.
- Only ROUGE when valid answers may be paraphrases → add BERTScore, semantic similarity or LLM-as-a-judge.
- Serverless for a GPU model → serverless has no GPUs.
- Real-time endpoint for 600 MB inputs that take 15 minutes → asynchronous inference.
- A 24/7 endpoint to score a dataset once a night → batch transform.
- A 10% production variant to "safely" test an unproven model → shadow test.
- A shadow test to measure real user conversion → A/B test with production variants.
- 2,000 per-tenant models on 2,000 endpoints → multi-model endpoint.
- Custom Model Import in CloudFormation → not supported; script it with the API or SDK.
- Adding instances when the instance family is wrong → Inference Recommender first.
- Scaling an LLM endpoint on invocations while GPUs sit at 100% → scale on a metric that reflects GPU load.
- Deploying the `latest` image tag → pin an immutable tag or digest.
- Polling Model Registry from a cron Lambda → EventBridge rule on model package state change.
- GitHub tokens stored in a pipeline → CodeConnections.
- Rewriting working Airflow DAGs in Step Functions → MWAA.
- A Lambda that polls in a loop for an external vendor → Callback step or task token.
- New S3 documents expected in KB answers at once → run an ingestion job.
- A new agent on Bedrock Agents Classic → AgentCore Runtime or Harness.
- A custom MCP wrapper for every internal API → AgentCore Gateway.
- A2A to connect an agent to a database tool → tools use MCP; A2A is agent to agent.
- A data quality monitor to catch falling accuracy → model quality monitoring with ground truth.
- CloudTrail to read prompt text → model invocation logging.
- Blaming the model for `OverheadLatency` spikes after idle time → serverless cold starts; Provisioned Concurrency.
- A Savings Plan sized to peak → commit to the steady baseline.
- Prompt caching to cut a batch inference bill → not supported with batch.
- A NAT gateway so a private endpoint can reach the SageMaker runtime → interface VPC endpoint.
- A long-term Bedrock API key in production → IAM roles or short-term keys.
- KMS encryption to keep PII out of a fine-tuned model → redact or mask the content before training.
- CSV question-answer files for a Bedrock fine-tuning job → JSONL.
- A denied topic to stop ungrounded RAG answers → contextual grounding checks.
- Model Cards to block unapproved deployments → Model Registry approval status in the pipeline.
- Clarify, Model Monitor or Ground Truth for a brand-new customer → see section 7.4.

**Fast plan:** 4 weeks at 1–1.5 hours a day, or 8 weeks at about 45 minutes a day (section 11).

### 7.9 Pre-exam checklist

- [ ] Re-read the exam page: beta or GA, time, fee, language and the exam code shown at registration.
- [ ] Read the C01 vs C02 comparison page once, line by line.
- [ ] Explain each task statement in 7.2 in one sentence without notes.
- [ ] Recite the endpoint limits: 25 MB / 60 s real-time, 4 MB / 60 s serverless, 1 GB / 1 hour async.
- [ ] Name what serverless endpoints can't do (GPU, VPC, data capture, multi-model, variants).
- [ ] Pick the right vector store for: binary vectors, cheap infrequent queries, GraphRAG, an existing Aurora cluster.
- [ ] State the new-build alternative to Clarify, Debugger, Model Monitor, Ground Truth and Agents Classic.
- [ ] Match the four AMT strategies to their use, and say why Hyperband needs early stopping OFF.
- [ ] Say what each Bedrock customisation method needs as input, and how a custom model is served.
- [ ] Explain shadow test vs production variant vs deployment guardrails.
- [ ] Explain online vs offline Feature Store and when to use event time.
- [ ] Short-term vs long-term Bedrock API keys, and invocation logging vs CloudTrail.
- [ ] Two timed practice tests at 85% or more; Mistakes notebook empty; Traps list read the night before.
- [ ] Lab account: no endpoints, Provisioned Throughput or vector stores left running.

### 7.10 Further reading

- This site's library for the AWS track: [/library?track=aws](/library?track=aws)
- MLA-C02 exam guide: [docs.aws.amazon.com/aws-certification/latest/machine-learning-engineer-associate-02](https://docs.aws.amazon.com/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.html)
- C01 vs C02 comparison: [mla-02-comparison.html](https://docs.aws.amazon.com/aws-certification/latest/machine-learning-engineer-associate-02/mla-02-comparison.html)
- SageMaker AI inference options: [deploy-model-options.html](https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model-options.html)
- Model Monitor availability change (and the replacement approach): [model-monitor-availability-change.html](https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-availability-change.html)
- CloudWatch generative AI observability: [GenAI-observability.html](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/GenAI-observability.html)

---

## 8. Exam: Generative AI Developer – Professional (AIP-C01)

**Who:** developers with 2+ years building production apps on AWS or open-source tech, general AI/ML or data-engineering experience, and **1+ year hands-on implementing gen AI**. Out of scope: model development and training, advanced ML techniques, data and feature engineering.

**Format:** 75 scenario items (65 scored) in 180 minutes, pass 750. Multiple choice and multiple response. This site's practice test uses 75 items in 180 minutes.

**Note on names:** the exam guide still says "Amazon Bedrock Prompt Flows" and lists Amazon Q Business, Kendra, Clarify, Model Monitor and Augmented AI. Expect those names on the exam, but know that Flows is the current name and the others are closed to new customers.

| Domain | Weight | Lessons | Must-know |
|---|---|---|---|
| Foundation Model Integration, Data Management, and Compliance | 31% | Choosing and integrating foundation models · Cross-Region inference and Provisioned Throughput · Knowledge Bases and vector stores · Chunking, filtering and reranking · Data pipelines, PII and compliance · Prompt engineering and prompt governance | Requirements and PoC with the Generative AI Lens; Geographic vs Global profiles and SCPs; PT vs tiers; Managed vs Customer-managed KBs; vector store limits; chunking strategies; Glue Data Quality, Data Wrangler, Comprehend PII; Prompt Management versions |
| Implementation and Integration | 26% | Building agents on Amazon Bedrock AgentCore · Tool use, MCP and multi-agent patterns · Orchestrating workflows: Bedrock Flows, Step Functions and events · Managing prompts as versioned assets · Integrating foundation models into applications | AgentCore services; Gateway MCP tools; Strands and Agent Squad; Agents Classic status; Flows versions and aliases; Step Functions human approval; Converse vs InvokeModel; streaming; batch; GenAI gateway pattern |
| AI Safety, Security, and Governance | 20% | Amazon Bedrock Guardrails: the six safeguards · Grounding checks, safeguard tiers and enforced guardrails · Prompt injection, data exfiltration and network and key controls · Governance: audit logging, evaluation records and responsible AI | Six safeguards; ApplyGuardrail; input tagging; Classic vs Standard; grounding and relevance thresholds; enforcement via Organizations; PrivateLink, KMS, least privilege for tools; invocation logging, CloudTrail, model cards, lineage |
| Operational Efficiency and Optimization for GenAI Applications | 12% | Cutting cost and latency on Amazon Bedrock · Monitoring, quotas and throttling for GenAI apps | Prompt caching rules; semantic caching; distillation; service tiers; Intelligent Prompt Routing; TPM burndown and `max_tokens`; CloudWatch metrics; invocation logs |
| Testing, Validation, and Troubleshooting | 11% | Evaluating Models, RAG and Agents · Troubleshooting GenAI Applications | Bedrock Evaluations job types; LLM-as-a-judge; RAG ground truth; AgentCore Evaluations; canary and A/B; context overflow, throttling, guardrail traces, retrieval failures, X-Ray |

**Exam day**

- Three hours for 75 items is about 2.4 minutes each. Many stems are long; read the last sentence first to find the constraint.
- Expect "least operational overhead" to favour managed options: Managed Knowledge Bases, AgentCore, Guardrails, Prompt Management.

**Top traps**

- "Create a new Bedrock agent" for a greenfield project → AgentCore (Harness or Runtime).
- Prompt caching with batch inference → not supported.
- Provisioned Throughput with a cross-Region inference profile → not supported.
- Data must stay in the EU → a **Geographic** profile, not Global.
- Global profile blocked by an SCP → the SCP must allow `aws:RequestedRegion` = `unspecified`.
- Early throttling at low real usage → `max_tokens` is set far too high, reserving quota.
- Invocation logs to audit usage → they're off until you turn them on; `bedrock-mantle` calls aren't logged.
- Guardrails on a non-Bedrock model → **ApplyGuardrail** API.
- Standard tier guardrail in an account that blocks cross-Region calls → Standard requires guardrail cross-Region inference.
- Updating a guardrail without `tierConfig` → it resets to Classic.
- Contextual grounding on input → it checks the output.
- Rollback for a Flow → repoint the alias to the previous version.
- OpenSearch Managed domain in a VPC for a Knowledge Base → VPC-only domains aren't supported; use OpenSearch Serverless with a VPC endpoint or another store.
- Hierarchical chunking on S3 Vectors → metadata limits make it a poor fit.
- Binary embeddings → OpenSearch options only.
- Retraining a model to stop prompt injection → use input validation, guardrails (Prompt Attack), least-privilege tools and human approval.

**Fast plan:** 4 weeks at 1–1.5 hours a day (section 11).

---

## 9. Exam: Solutions Architect – Professional (SAP-C03)

> **SAP-C02 → SAP-C03.** The last day to take SAP-C02 is **16 November 2026**. SAP-C03 is delivered from **17 November 2026**, with no beta. It keeps 75 items, 180 minutes and the $300 fee, but **lowers the pass mark to 720** (from 750) and reorganises four domains into **five**. It adds gen AI integration and responsible AI tasks, more security and governance weight, and an explicit operational excellence domain. It drops IoT, end-user computing and the standalone AI services. A SAP-C02 pass before the cut-off stays valid until its normal expiry.
>
> **On this site:** there are two Solutions Architect – Professional preps. **SAP-C03** has its own lessons, flashcards and practice questions for the five new domains, including the AI tasks. Use it if you sit the exam on or after 17 November 2026. **SAP-C02** stays available for anyone sitting by 16 November. The mapping table below shows how the old domains carry over.

**Who:** solutions architects with 2+ years designing and deploying cloud solutions on AWS. Out of scope: in-depth OS knowledge, model training and data science, security incident forensics, application code development and debugging.

**Format:** 75 items (65 scored) in 180 minutes, multiple choice and multiple response, pass 720.

### How SAP-C02 maps to SAP-C03

This is our mapping of C02 tasks to C03 domains, for reuse of practice content. AWS's comparison page in the C03 guide is the authority.

| SAP-C02 domain (weight) | Where its tasks go in SAP-C03 |
|---|---|
| Design Solutions for Organizational Complexity (26%) | Network connectivity → **D1**. Security controls and multi-account → **D2**. Resilient architectures → **D4**. Cost visibility → **D3** |
| Design for New Solutions (29%) | Deployment strategy → **D5**. Business continuity → **D4**. Security → **D2**. Reliability and performance → **D1**. Cost → **D3** |
| Continuous Improvement for Existing Solutions (25%) | Operational excellence → **D5**. Security → **D2**. Performance and reliability → **D1** and **D4**. Cost → **D3** |
| Accelerate Workload Migration and Modernization (20%) | Migration → **D4**. New architecture and modernisation → **D1** |
| *(new in C03)* | AI/ML integration (Task 1.2), responsible AI (Task 2.5), multi-tenant isolation, IPv6, post-quantum crypto, observability with SLOs, cost of gen AI |

**In-scope changes:** C03 adds Bedrock, VPC Lattice, Cloud WAN, Security Lake, Verified Access, Verified Permissions, Clean Rooms, MemoryDB, CDK, CodeCommit, ADOT, Fault Injection Service, Resilience Hub, AWS Transform, Data Lifecycle Manager, Cost Categories, Local Zones, Data Transfer Terminal, Application Auto Scaling and Reserved Instances. It removes IoT services, WorkSpaces and AppStream 2.0, the individual AI services (Comprehend, Lex, Rekognition and others), Lightsail, Amplify, App Runner, AWS Batch, Service Catalog, Wavelength and several others.

### SAP-C03 domains

| Domain | Weight | Task statements | Site lessons that help (SAP-C02 content) | Must-know |
|---|---|---|---|---|
| Architecture Design and Implementation Built for the Cloud | 25% | 1.1 cloud-built architectures · 1.2 AI/ML integration · 1.3 hybrid · 1.4 networking · 1.5 data | Hybrid and multi-VPC network connectivity · Designing reliable architectures: decoupling, routing and recovery · Performance and cost: compute, storage, data, caching and purchasing · Improving Performance and Reliability · Modernisation Architectures: Containers, Serverless, Purpose-Built Databases and Decoupling. For 1.2, use the AIP-C01 lessons Building agents on Amazon Bedrock AgentCore and Knowledge Bases and vector stores | Idempotent event-driven design; Step Functions and durable Lambda functions; VPC Lattice; multi-tenant isolation; TGW, DX, VPC Resolver; IPv6; lakehouse with Iceberg and Lake Formation; database choice; Bedrock, AgentCore and RAG at the architecture level |
| Security, Compliance, and Governance | 25% | 2.1 identity · 2.2 encryption · 2.3 multi-account governance · 2.4 compliance · 2.5 responsible AI | Security controls across many accounts · Multi-account environments with Organizations and Control Tower · Security controls for new workloads · Improving Security Posture and Remediating Findings. For 2.5, use the AIP-C01 lesson Amazon Bedrock Guardrails: the six safeguards | Identity Center, Cognito, ABAC, Roles Anywhere, Verified Access; KMS, Private CA, CloudHSM, ML-DSA and ML-KEM; SCPs vs RCPs; Control Tower; org trails, Security Lake, Security Hub CSPM; data residency; Guardrails, AgentCore Identity, Step Functions approvals |
| Cost-Optimized Architecture Design | 15% | 3.1 pricing models · 3.2 data transfer · 3.3 cost allocation · 3.4 storage and database cost | Cost visibility and chargeback across an organization · Performance and cost: compute, storage, data, caching and purchasing · Cost Optimization of Running Workloads | Savings Plans, RIs, Spot, Graviton; Step Functions Standard vs Express; NAT vs gateway endpoints; TGW and PrivateLink charges; tags, CUR, cost categories, Bedrock token monitoring; gp3, Intelligent-Tiering, I/O-Optimized, Database Savings Plans |
| Resilience, Migration, and Business Continuity | 15% | 4.1 migration · 4.2 disaster recovery · 4.3 business continuity | Resilient multi-AZ and multi-Region designs · Business continuity: RTO, RPO and DR strategy for new workloads · Choosing Workloads and Migration Strategies (the 7 Rs) · Server and Database Migration Tooling: MGN, DMS and Schema Conversion · Moving Data: DataSync, Transfer Family, Transfer Acceleration and Offline Options | 7 Rs; AWS Transform and Transform MGN; DMS; strangler fig; DR strategies; Elastic Disaster Recovery; ARC and data-plane failover; Resilience Hub; Backup cross-account, Vault Lock, snapshot lock; FIS |
| Operational Excellence and Automation | 20% | 5.1 IaC · 5.2 CI/CD and DevSecOps · 5.3 observability · 5.4 automation | Deployment strategies: IaC, CI/CD and safe releases · Observability for Running Workloads · Automation and Incident Response | StackSets, Hooks, CDK aspects; cross-account pipelines; image scanning and signing; Bedrock Evaluations as a gate; ADOT, Synthetics, RUM, Application Signals SLOs; quotas, backoff, circuit breakers, predictive scaling |

**Exam day**

- 2.4 minutes per item. Long stems with four plausible options are normal. Find the constraint (cost, overhead, RTO/RPO, compliance, "without code changes") and eliminate on it.
- Multiple response items say how many to pick. Each pick must stand on its own.
- When two answers both work, prefer the managed, least-overhead one unless the stem demands control.

**Top traps**

- Snowball Edge, Migration Hub or Application Discovery Service for a new customer → DataSync or Data Transfer Terminal; AWS Transform.
- "AWS Application Migration Service" vs "AWS Transform MGN" → same engine, new name.
- An RCP to restrict the management account or a service-linked role → RCPs don't apply to either.
- SCPs to stop outside principals reaching your S3 data → that's an RCP (or bucket policy) job.
- TGW peering with dynamic routing or ECMP → static routes only.
- Inspection VPC dropping return traffic → turn on appliance mode.
- Two DX connections in one location for "maximum resiliency" → needs more than one location.
- Pilot light that must serve traffic immediately → that's warm standby.
- Failing over by editing Route 53 weights during a regional outage → use health checks or ARC routing controls (data plane).
- Elastic Disaster Recovery for RDS on AWS → it covers EC2; use database-native replication.
- Expecting AWS Backup to restore on a schedule → automate restores yourself.
- Planned Aurora Global Database Region move with zero data loss → switchover, not failover.
- Untagged spend from before tags were activated → cost allocation tags apply from activation onward.
- NAT gateway costs for S3 traffic → gateway VPC endpoint.
- Security Hub vs Security Hub CSPM → posture checks and standards are CSPM.
- CodeCommit "closed to new customers" → it's open again.

**Fast plan:** 6 weeks at 1–1.5 hours a day (section 11).

---

## 10. Capstone projects

Build these in your own AWS account. Each one maps to lessons above. Projects L1–L2 suit AIF-C01, A–D suit AIP-C01, and E–H suit SAP-C03. For MLA-C02, do the lab in each lesson, plus Projects A and D.

### Cost safety first

Labs can cost money. Many services bill by the hour while they exist, even when idle (NAT gateways, Transit Gateway attachments, some vector stores, OpenSearch, databases, Provisioned Throughput). Follow these rules:

1. **Use a separate account** (or a sandbox account in your organization) for labs, never production. Use an IAM Identity Center user or role, not the root user, and turn on MFA.
2. **Create a budget before anything else.** In the console: Billing and Cost Management → Budgets → a monthly cost budget with email alerts at 50%, 80% and 100% of actual spend, plus a forecast alert. Or with the CLI (replace the account ID, amount and email):

   ```bash
   aws budgets create-budget \
     --account-id 111122223333 \
     --budget '{"BudgetName":"lab-monthly","BudgetLimit":{"Amount":"20","Unit":"USD"},"TimeUnit":"MONTHLY","BudgetType":"COST"}' \
     --notifications-with-subscribers '[{"Notification":{"NotificationType":"ACTUAL","ComparisonOperator":"GREATER_THAN","Threshold":80,"ThresholdType":"PERCENTAGE"},"Subscribers":[{"SubscriptionType":"EMAIL","Address":"you@example.com"}]}]'
   ```

   A budget alerts you; it does not stop spending. Turn on **Cost Anomaly Detection** too.
3. **Check prices first** on each service's pricing page. Don't trust numbers from courses or this runbook.
4. **Tag everything** with `project=aws-lab` and deploy with CloudFormation or CDK where you can, so one delete removes it all.
5. **Stay in one Region** for each lab, except the multi-Region one, so nothing is forgotten elsewhere.
6. **Never buy commitments in a lab:** no Provisioned Throughput, Reserved tier, Savings Plans or Reserved Instances. Use on-demand.
7. **Clean up the same day.** Useful checks:

   ```bash
   # Everything still tagged for the lab in the current Region
   aws resourcegroupstaggingapi get-resources --tag-filters Key=project,Values=aws-lab \
     --query 'ResourceTagMappingList[].ResourceARN' --output text

   # Delete a lab stack
   aws cloudformation delete-stack --stack-name aws-lab-rag

   # Confirm no Bedrock Provisioned Throughput is left running
   aws bedrock list-provisioned-model-throughputs
   ```

   The tagging API doesn't see every resource type, so also check the Billing console's bill by service a day later. Empty and delete S3 buckets, delete Knowledge Bases **and** their vector stores, NAT gateways, Elastic IPs, TGW attachments, load balancers and databases.

### Project L1: Use-case and risk brief (AIF-C01)

- Pick one business process. Write a one-page brief: the problem, whether AI is appropriate at all, traditional ML vs a foundation model, the data and its quality, and three business metrics with a baseline.
- Place it in the **Generative AI Security Scoping Matrix** and list what that scope makes your responsibility.
- Add a responsible AI section: bias risks, how you'd detect them (subgroup analysis, human audit), legal risks and where a human signs off.

### Project L2: Bedrock playground (AIF-C01)

- In the Bedrock console playground, run the same prompt on two models. Change temperature and top P and record what changes. Compare zero-shot and few-shot.
- Create a guardrail with a denied topic, a word filter and PII masking. Test it with the console's test panel, including a prompt-injection attempt.
- Write ten service-to-need pairs (section 5.2 and 5.3) and ten lifecycle steps in order, to rehearse matching and ordering items.

### Project A: Grounded document assistant (AIP-C01)

- Upload 20–50 documents to S3. Create a Knowledge Base; for a cheap lab, use **S3 Vectors** as the store. Try default and hierarchical chunking and compare answers.
- Call `RetrieveAndGenerate` (or retrieve, then call Converse) and show citations. Add a metadata field and filter on it.
- Attach a guardrail with **contextual grounding** and tune the threshold on questions the documents can't answer.
- Run a **RAG evaluation** job with 20 ground-truth questions. Record retrieval and answer scores before and after a change.

### Project B: Support agent on AgentCore (AIP-C01)

- Build a Strands agent with three tools: look up an order, issue a refund, escalate. Deploy it to **AgentCore Runtime**.
- Expose the tools through **AgentCore Gateway** as MCP tools. Add a **Policy** rule that blocks refunds above a limit, and **Memory** so the agent remembers the customer within a session.
- Require human approval for refunds (for example a Step Functions task that waits for approval).
- Turn on Observability and read a trace. Write five adversarial prompts (injection through an order note) and record what stops them.

### Project C: Prompt governance and Flows (AIP-C01)

- Store the assistant's system prompt in **Prompt Management** with two variants. Compare them, then save version 1.
- Build a **Flow** that classifies a ticket, retrieves from your Knowledge Base and drafts a reply. Publish a version, create an alias, call `InvokeFlow` on the alias.
- Publish version 2 with a change, then roll back by repointing the alias.

### Project D: Cost and operations (AIP-C01)

- Turn on **model invocation logging** to CloudWatch Logs. Send `requestMetadata` with a team tag and write a Logs Insights query for tokens by team.
- Add a long, reused system prompt with an explicit cache checkpoint. Compare `cacheReadInputTokens` and latency across calls.
- Run a small **batch inference** job from S3 and compare effort and turnaround with on-demand calls.
- Set `max_tokens` very high under load and watch throttling metrics, then fix it.

### Project E: Multi-account landing zone (SAP-C03)

- Create an organization with Security, Infrastructure, Workloads and Sandbox OUs. Turn on all features.
- Attach an SCP to Sandbox that denies leaving the organization and restricts Regions. Attach an RCP that blocks access to S3 from outside the organization. Test both, and confirm the management account is unaffected by the RCP.
- Create an organization CloudTrail trail to a locked-down log bucket and a Config aggregator. Turn on IAM Identity Center with one permission set.
- Optional: set up Control Tower in a fresh organization and enrol an account. It creates shared accounts and services; read what it deploys first, and leave it only if you'll keep using it.

### Project F: Multi-Region resilience (SAP-C03)

- Deploy a small API in two Regions (Lambda or a container) backed by a **DynamoDB global table** and an S3 bucket with Cross-Region Replication.
- Put Route 53 failover records with health checks in front. Break the primary and time the failover.
- Run a **Fault Injection Service** experiment and write a one-page DR runbook with RTO, RPO, the strategy (pilot light, warm standby or active/active) and why.
- Delete the second Region's resources the same day.

### Project G: Migration plan (SAP-C03, paper exercise)

- Take a fictional data centre of 40 servers and 5 databases. Assign each one an R from the 7 Rs, with a reason.
- Plan three waves. Name the tools: AWS Transform for discovery and assessment, AWS Transform MGN for rehosts, DMS and Schema Conversion for databases, DataSync or Data Transfer Terminal for file data.
- Add the network: Direct Connect with the resiliency level you'd buy, a VPN backup, Route 53 VPC Resolver endpoints for hybrid DNS.
- Write the cut-over and rollback plan for one wave.

### Project H: Guardrailed delivery pipeline (SAP-C03)

- Define a small stack in CDK. Add a CDK aspect or CloudFormation Hook that blocks unencrypted S3 buckets.
- Build a pipeline that deploys to a second account with a canary step and automatic rollback on an alarm.
- Add CloudWatch Synthetics on the endpoint and an Application Signals SLO. Deploy one stack to two accounts with StackSets.

---

## 11. Study schedules

### AIF-C01 in 14 days (about 1 hour/day)

| Day | Focus |
|---|---|
| 1 | Sections 5.1–5.2; vocabulary and learning types lessons; flashcards |
| 2 | When to use AI lesson; ML lifecycle lesson; drill Fundamentals of AI and ML |
| 3 | Section 5.3; Generative AI Building Blocks; Gen AI Use Cases and Limits |
| 4 | Foundation Model Lifecycle; AWS Gen AI Services and Costs; Project L1 (start) |
| 5 | Section 5.4; Choosing a foundation model and tuning inference; Project L2 (first part) |
| 6 | Sections 5.5–5.6; RAG and agents lesson; Prompt engineering lesson |
| 7 | Section 5.7; Customising lesson; Evaluating lesson; drill Applications, 20 questions |
| 8 | Section 5.9; all three responsible AI lessons; Project L2 (guardrail part) |
| 9 | Section 5.10; both security and governance lessons; finish Project L1 |
| 10 | **Practice test #1**; review every miss |
| 11 | Mistakes notebook; weakest domain drill; ordering and matching rehearsal from Project L2 |
| 12 | Section 5.1 renames table again; Smart practice, 30 questions |
| 13 | **Practice test #2**; review every miss |
| 14 | Traps list; flashcards; book the exam once you score 85% or more |

### MLA-C02 in 4 weeks (1–1.5 hours/day)

For people who already deploy models on SageMaker AI or Bedrock at work.

| Week | Focus |
|---|---|
| 1 | Domain 1: section 7.5 data and vector store tables; sections 5.6–5.7; all six Domain 1 lessons and their labs; Project A up to chunking; drill Domain 1 |
| 2 | Domain 2: section 7.4 (maintenance-mode replacements); all five Domain 2 lessons; one Spot training job with checkpoints and one AMT job; a Bedrock evaluation job; drill Domain 2 |
| 3 | Domain 3: endpoint and orchestration tables in 7.5; section 5.8; all six Domain 3 lessons; deploy one model as real-time, serverless and async and compare; a small Pipelines run with a Condition step; **practice test #1** at the end of the week |
| 4 | Domain 4: monitoring table and section 7.6; all five Domain 4 lessons; Project D; Mistakes notebook to zero; weakest-domain drills; **practice test #2**; section 7.8 traps; checklist 7.9; book at 85% or more |

### MLA-C02 in 8 weeks (about 45 minutes/day)

For people newer to ML on AWS, or with little gen AI experience.

| Week | Focus |
|---|---|
| 1 | Sections 5.2–5.3 for vocabulary; section 7.1–7.3; Collecting and storing ML data; Transformation and feature engineering |
| 2 | SageMaker Feature Store; Data quality, bias, labeling and splitting; PII handling and data for FM customisation; section 7.4 |
| 3 | Preparing data for RAG; sections 5.6–5.7; Project A (Knowledge Base, chunking, citations); drill Domain 1 |
| 4 | Choosing a modeling approach; Training at scale; Hyperparameter tuning with AMT; one training job with Spot and checkpoints |
| 5 | Customising foundation models and versioning; Evaluating ML models and FMs; a Bedrock evaluation job; drill Domain 2; **practice test #1** |
| 6 | Choosing a SageMaker AI inference option; Hosting many models and rolling out safely; Provisioning compute, auto scaling and containers; deploy and delete endpoints of each type |
| 7 | Infrastructure as code and CI/CD; Orchestrating ML and AI workflows; Agentic workflows with AgentCore (section 5.8); all five Domain 4 lessons; Project D |
| 8 | Mistakes notebook to zero; weakest-domain drills; section 7.8 traps; **practice test #2**; checklist 7.9; book at 85% or more |

### AIP-C01 in 4 weeks (1–1.5 hours/day)

| Week | Focus |
|---|---|
| 1 | Domain 1: sections 5.4–5.7; all six Domain 1 lessons; Project A (Knowledge Base, chunking, citations); drill Domain 1 |
| 2 | Domain 2: section 5.8; all five Domain 2 lessons; Project B (agent on AgentCore) and Project C (Prompt Management and Flows) |
| 3 | Domains 3 and 4: sections 5.9, 5.10 and 5.12; Guardrails, grounding, security and governance lessons; cost and monitoring lessons; finish Project A's guardrail; Project D; **practice test #1** at the end of the week |
| 4 | Domain 5 and review: section 5.11; both Domain 5 lessons; Project A's RAG evaluation; Mistakes notebook to zero; weakest-domain drills; **practice test #2**; Traps list; book at 85% or more |

### SAP-C03 in 6 weeks (1–1.5 hours/day)

| Week | Focus |
|---|---|
| 1 | Sections 5.13–5.14. Lessons: Hybrid and multi-VPC network connectivity; Security controls across many accounts; Multi-account environments with Organizations and Control Tower. Project E |
| 2 | Sections 5.15–5.16. Lessons: Resilient multi-AZ and multi-Region designs; Business continuity: RTO, RPO and DR strategy for new workloads; all four migration lessons. Project F; start Project G |
| 3 | Section 5.17 and the cloud-built architecture topics. Lessons: Designing reliable architectures; Performance and cost; Modernisation Architectures; Cost visibility and chargeback; Cost Optimization of Running Workloads. Finish Project G |
| 4 | Section 5.18. Lessons: Deployment strategies; Observability for Running Workloads; Automation and Incident Response; Improving Security Posture; Security controls for new workloads; Improving Performance and Reliability. Project H. **Practice test #1** (the SAP-C02 test; score it against 720 as well as 750) |
| 5 | SAP-C03 gaps: section 9 new topics; AIP-C01 lessons on AgentCore, Knowledge Bases and Guardrails; read the C03 guide's task statements and comparison page line by line, marking anything you can't explain |
| 6 | Mistakes notebook; weakest-domain drills; any SAP-C03 practice the site has added; **practice test #2**; Traps list; book at 85% or more |

If you are sitting **SAP-C02 before 16 November 2026**, compress weeks 1–4 and 6 into the time you have and skip week 5.

---

## 12. Cheat sheets

### AIF-C01 essentials

```
ai stack:    AI ⊃ ML ⊃ deep learning · gen AI creates content · agentic AI plans and acts through tools
learning:    supervised (labels: classify, regress) · unsupervised (cluster) · reinforcement (rewards)
inference:   real-time · serverless (idle gaps) · asynchronous (1 GB, 1 h, queued) · batch transform
metrics:     accuracy · precision · recall · F1 · business: cost per user, ROI, feedback
fm cycle:    data selection → model selection → pre-training → fine-tuning → evaluation → deployment → feedback
params:      temperature (low = deterministic) · top P (probability share) · top K (candidate count) · max tokens · stop
cost ladder: prompting → RAG → fine-tuning → continued pre-training → pre-training (most expensive)
evals:       ROUGE (summaries) · BLEU (translation) · BERTScore · human · LLM-as-a-judge · RAG · agent
rai:         bias · fairness · inclusivity · robustness · safety · veracity · sustainability
rai tools:   Bedrock Guardrails · Bedrock Model Evaluations · SageMaker Model Cards · AI Service Cards
governance:  Config · Inspector · Artifact · CloudTrail · Trusted Advisor · Macie · KMS · PrivateLink
scoping:     1 consumer · 2 enterprise app · 3 pre-trained via API · 4 fine-tuned · 5 self-trained
services:    Comprehend (text meaning, PII) · Textract (doc text) · Rekognition · Transcribe · Polly · Translate · Lex · Personalize
not in v1.2: Amazon Q · PartyRock · Audit Manager · Clarify · Model Monitor · A2I · AUC
```

### MLA-C02 essentials

```
domains:     D1 data prep 28 · D2 model and FM development 24 · D3 deployment/orchestration 24 · D4 operate/monitor/secure 24 · pass 720
exam:        beta 85 items / 170 min / $75 (from 29 Sep 2026) · GA 65 (50 scored) · GA time and fee not published
removed:     edge (Neo) · BYOC · pruning/compression · EFS/FSx training input · EventBridge infra monitoring · capacity troubleshooting
added:       vector DBs · embeddings · chunking · RAG · agents (AgentCore, MCP, A2A) · MLflow · Prompt Management · LLM-as-a-judge
             Custom Model Import · CodeConnections · gen AI observability · Bedrock API keys · Guardrails · token cost
maintenance: Clarify · Debugger · Model Monitor · Ground Truth · A2I · Agents Classic → SHAP, pandas/sklearn, MLflow, Evidently, CloudWatch, AgentCore
endpoints:   real-time 25 MB/60 s · serverless 4 MB/60 s (no GPU, VPC, capture, MME) · async 1 GB/1 h (scale to 0) · batch transform
rollout:     shadow test (copy, prod answers only) · production variants (A/B) · deployment guardrails (canary, linear, rollback)
data:        Parquet/ORC columnar · Firehose converts · Feature Store online (latest) / offline (Parquet history) · JSONL for Bedrock FT
vectors:     OpenSearch (binary ok; no VPC-only managed) · S3 Vectors (cheap, infrequent) · Aurora pgvector · Neptune Analytics
amt:         grid (categorical) · random (max parallel) · Bayesian (fewest jobs) · Hyperband (early stopping type OFF)
customise:   SFT (labelled pairs) · RFT (reward function) · distillation (prompts + teacher) · serve via PT or on-demand deployment
orchestrate: Pipelines (ML DAG, lineage, registry) · Step Functions (cross-service, approvals) · MWAA (existing Airflow)
monitor:     capture + baseline + schedule + alarm · model quality needs ground truth · ModelLatency vs OverheadLatency
security:    execution roles · PrivateLink · network isolation · KMS CMKs · short-term API keys (prod) · Inspector + CodeGuru
```

### Bedrock and gen AI on AWS

```
apis:        Converse / ConverseStream (uniform) · InvokeModel (native body) · OpenAI-compatible · bedrock-mantle not logged
tiers:       Standard (default) · Priority (premium) · Flex (discount, best effort) · Reserved (TPM, 1 or 3 months)
also:        Batch (S3 in/out) · Provisioned Throughput (MUs; none, 1 or 6 months; bills until deleted)
cris:        Geographic (residency) · Global (cost; SCP allow aws:RequestedRegion=unspecified) · no PT
caching:     implicit (auto) · explicit cachePoint / cache_control · static first · 5 min TTL default · not batch
kb:          Managed (connectors, ACLs, Smart Parsing, Agentic Retrieval) · Customer-managed (your vector store)
stores:      OpenSearch Serverless/managed · S3 Vectors · Aurora pgvector · Neptune Analytics · Pinecone · Redis · MongoDB
chunking:    default ~300 · fixed + overlap · hierarchical (parent swap) · semantic (uses a model) · none
customise:   supervised fine-tuning · reinforcement fine-tuning · distillation (teacher → student)
flows:       draft → prepare → version → alias → InvokeFlow · rollback = repoint alias
prompts:     Prompt Management: variables · variants · versions · optimisation
```

### Agents, guardrails and operations

```
agentcore:   Runtime · Memory · Gateway (APIs → MCP tools) · Identity · Policy (Cedar) · Code Interpreter · Browser
             Observability (OTel) · Evaluations · Harness · Registry · Optimization · Payments
frameworks:  Strands Agents · LangGraph · CrewAI · LlamaIndex · others · Agent Squad · Step Functions (HITL)
classic:     Bedrock Agents Classic: maintenance, closed to new customers 30 Jul 2026 · new builds → AgentCore
guardrails:  content (incl. Prompt Attack) · denied topics · words · sensitive info (block/mask) · grounding · Automated Reasoning
             ApplyGuardrail (any model) · Classic vs Standard (needs guardrail CRIS) · enforce via Organizations
grounding:   grounding + relevance scores · 0–0.99 threshold · output only · BLOCK or NONE
quotas:      TPM · TPD · RPM · reserve input + max_tokens · output burndown multiplier · cache reads free of quota
logging:     invocation logging off by default · CloudWatch Logs and/or S3 · >100 KB to S3 · requestMetadata
evals:       programmatic · human · model-as-a-judge · RAG (ground truth) · AgentCore Evaluations
```

### SAP-C03 architecture

```
domains:     D1 build for cloud 25 · D2 security/governance 25 · D3 cost 15 · D4 resilience/migration 15 · D5 ops 20 · pass 720
org:         SCP = principals in your accounts · RCP = your resources, any caller · neither grants · RCP skips mgmt acct + SLRs
control twr: preventive · detective · proactive · Account Factory · drift
network:     TGW (peering static only · appliance mode) · DX max = >1 location · VPC Resolver inbound/outbound
             PrivateLink · VPC Lattice · Cloud WAN · IPAM · Network Firewall · GWLB · IPv6 dual-stack
dr:          backup/restore → pilot light → warm standby → active/active · fail over on the data plane (health checks, ARC)
data:        Aurora Global DB (switchover RPO 0 · failover) · DynamoDB global tables · S3 CRR + RTC
continuity:  AWS Backup cross-acct (no auto restore) · Vault Lock · Object Lock · EBS snapshot lock · FIS · Resilience Hub
migrate:     7 Rs · AWS Transform · Transform MGN · DMS + Schema Conversion · DataSync · Transfer Family · Data Transfer Terminal
closed:      Migration Hub · Application Discovery Service · Snowball Edge (new customers) · Snowcone/Snowmobile gone
cost:        Savings Plans (incl. Database) · RIs · Spot · Graviton · gp3 · I/O-Optimized · gateway endpoints vs NAT · cost categories
ops:         StackSets · CFN Hooks · CDK aspects · canary/blue-green · ADOT · Synthetics · RUM · Application Signals SLOs
renames:     Security Hub CSPM · Route 53 VPC Resolver · Application Recovery Controller · Transform MGN · CodeCommit open again
```

---

## 13. Sources

- AWS Certification: [aws.amazon.com/certification](https://aws.amazon.com/certification/)
- AI Practitioner exam page: [aws.amazon.com/certification/certified-ai-practitioner](https://aws.amazon.com/certification/certified-ai-practitioner/)
- AIF-C01 exam guide: [docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html](https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html); revisions: [aif-01-revisions.html](https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/aif-01-revisions.html); in-scope services: [aif-01-in-scope-services.html](https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/aif-01-in-scope-services.html); out-of-scope services: [aif-01-out-of-scope-services.html](https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/aif-01-out-of-scope-services.html)
- Machine Learning Engineer – Associate exam page: [aws.amazon.com/certification/certified-machine-learning-engineer-associate](https://aws.amazon.com/certification/certified-machine-learning-engineer-associate/)
- MLA-C02 exam guide: [docs.aws.amazon.com/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.html](https://docs.aws.amazon.com/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.html); C01 vs C02 comparison: [mla-02-comparison.html](https://docs.aws.amazon.com/aws-certification/latest/machine-learning-engineer-associate-02/mla-02-comparison.html); in-scope services: [mla-02-in-scope-services.html](https://docs.aws.amazon.com/aws-certification/latest/machine-learning-engineer-associate-02/mla-02-in-scope-services.html); out-of-scope services: [mla-02-out-of-scope-services.html](https://docs.aws.amazon.com/aws-certification/latest/machine-learning-engineer-associate-02/mla-02-out-of-scope-services.html)
- SageMaker AI pages used for MLA-C02: [inference options](https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model-options.html) · [Serverless Inference](https://docs.aws.amazon.com/sagemaker/latest/dg/serverless-endpoints.html) · [shadow tests](https://docs.aws.amazon.com/sagemaker/latest/dg/shadow-tests.html) · [Pipelines step types](https://docs.aws.amazon.com/sagemaker/latest/dg/build-and-manage-steps-types.html) · [Model Registry](https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry.html) · [Feature Store](https://docs.aws.amazon.com/sagemaker/latest/dg/feature-store.html) · [AMT](https://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning-how-it-works.html) · [MLflow](https://docs.aws.amazon.com/sagemaker/latest/dg/mlflow.html) · [Clarify availability change](https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-availability-change.html) · [Model Monitor availability change](https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-availability-change.html)
- Bedrock pages used for MLA-C02: [Custom Model Import](https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-import-model.html) · [preparing customisation data](https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-prepare.html) · [on-demand custom model deployment](https://docs.aws.amazon.com/bedrock/latest/userguide/deploy-custom-model-on-demand.html) · [API keys](https://docs.aws.amazon.com/bedrock/latest/userguide/api-keys.html)
- CloudWatch generative AI observability: [docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/GenAI-observability.html](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/GenAI-observability.html)
- Generative AI Developer – Professional exam page: [aws.amazon.com/certification/certified-generative-ai-developer-professional](https://aws.amazon.com/certification/certified-generative-ai-developer-professional/)
- AIP-C01 exam guide: [docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01.html](https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01.html); in-scope services: [aip-01-in-scope-services.html](https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/aip-01-in-scope-services.html)
- AI certification portfolio and AIP-C01 GA: [AWS Training and Certification blog](https://aws.amazon.com/blogs/training-and-certification/big-news-aws-expands-ai-certification-portfolio-and-updates-security-certification/)
- Solutions Architect – Professional exam page: [aws.amazon.com/certification/certified-solutions-architect-professional](https://aws.amazon.com/certification/certified-solutions-architect-professional/)
- SAP-C03 exam guide: [docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-03/solutions-architect-professional-03.html](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-03/solutions-architect-professional-03.html); C02 vs C03 comparison: [sap-03-comparison.html](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-03/sap-03-comparison.html); in-scope services: [sap-03-in-scope-services.html](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-03/sap-03-in-scope-services.html)
- SAP-C02 exam guide: [docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02.html](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02.html)
- SAP-C02 retirement and SAP-C03 dates: [AWS Training and Certification blog, September 2026](https://aws.amazon.com/blogs/training-and-certification/september-2026-new-offerings/)
- AWS Skill Builder: [skillbuilder.aws](https://skillbuilder.aws)
- Amazon Bedrock user guide: [docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html)
- Bedrock pages used: [cross-Region inference](https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html) · [Provisioned Throughput](https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html) · [service tiers](https://docs.aws.amazon.com/bedrock/latest/userguide/service-tiers-inference.html) · [batch inference](https://docs.aws.amazon.com/bedrock/latest/userguide/batch-inference.html) · [prompt caching](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html) · [Prompt Management](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html) · [Flows](https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html) · [Knowledge Bases](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html) · [vector stores](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-setup.html) · [chunking](https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html) · [custom models](https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html) · [distillation](https://docs.aws.amazon.com/bedrock/latest/userguide/model-distillation.html) · [Guardrails](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html) · [safeguard tiers](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-tiers.html) · [contextual grounding](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html) · [enforcements](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-enforcements.html) · [evaluations](https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html) · [quotas and burndown](https://docs.aws.amazon.com/bedrock/latest/userguide/quotas-token-burndown.html) · [invocation logging](https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html) · [Intelligent Prompt Routing](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-routing.html) · [inference parameters](https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html)
- Agents Classic maintenance mode: [docs.aws.amazon.com/bedrock/latest/userguide/agents-classic-maintenance-mode.html](https://docs.aws.amazon.com/bedrock/latest/userguide/agents-classic-maintenance-mode.html)
- AWS service availability changes (June 2026): [aws.amazon.com/about-aws/whats-new/2026/06/aws-service-availability](https://aws.amazon.com/about-aws/whats-new/2026/06/aws-service-availability/)
- Amazon Bedrock pricing: [aws.amazon.com/bedrock/pricing](https://aws.amazon.com/bedrock/pricing/)
- Amazon Bedrock AgentCore: [docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html)
- Strands Agents: [strandsagents.com](https://strandsagents.com/latest/)
- Kiro: [kiro.dev/docs](https://kiro.dev/docs/); Amazon Q Developer end of support: [AWS DevOps blog](https://aws.amazon.com/blogs/devops/amazon-q-developer-end-of-support-announcement/)
- Amazon Quick: [docs.aws.amazon.com/quicksuite/latest/userguide/what-is.html](https://docs.aws.amazon.com/quicksuite/latest/userguide/what-is.html)
- Amazon Nova: [docs.aws.amazon.com/nova/latest/userguide/what-is-nova.html](https://docs.aws.amazon.com/nova/latest/userguide/what-is-nova.html)
- SageMaker AI: [docs.aws.amazon.com/sagemaker/latest/dg/whatis.html](https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html) · [deployment options](https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html) · [Model Cards](https://docs.aws.amazon.com/sagemaker/latest/dg/model-cards.html)
- Responsible AI at AWS: [aws.amazon.com/ai/responsible-ai](https://aws.amazon.com/ai/responsible-ai/)
- Generative AI Security Scoping Matrix: [aws.amazon.com/ai/generative-ai/security/scoping-matrix](https://aws.amazon.com/ai/generative-ai/security/scoping-matrix/)
- AWS Transform: [aws.amazon.com/transform](https://aws.amazon.com/transform/); Transform MGN rename: [What's New, June 2026](https://aws.amazon.com/about-aws/whats-new/2026/06/aws-transform-mgn-rebrand/)
- Well-Architected Framework: [docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html); Generative AI Lens: [docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lens.html](https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lens.html)
- Disaster recovery whitepaper: [docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html)
- Aurora Global Database recovery: [docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html)
- Transit Gateway: [docs.aws.amazon.com/vpc/latest/tgw/how-transit-gateways-work.html](https://docs.aws.amazon.com/vpc/latest/tgw/how-transit-gateways-work.html); Direct Connect resiliency: [docs.aws.amazon.com/directconnect/latest/UserGuide/resiliency_toolkit.html](https://docs.aws.amazon.com/directconnect/latest/UserGuide/resiliency_toolkit.html); Route 53 VPC Resolver: [docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html)
- AWS Organizations: [docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html); RCPs: [orgs_manage_policies_rcps.html](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps.html); Control Tower: [docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html](https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html)
- Security Hub GA and CSPM: [AWS News Blog](https://aws.amazon.com/blogs/aws/aws-security-hub-now-generally-available-with-near-real-time-analytics-and-risk-prioritization/)
- Migration strategies (7 Rs): [docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html](https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html)
- Migration Hub availability: [docs.aws.amazon.com/migrationhub/latest/ug/migrationhub-availability-change.html](https://docs.aws.amazon.com/migrationhub/latest/ug/migrationhub-availability-change.html); Application Discovery Service availability: [application-discovery-service-availability-change.html](https://docs.aws.amazon.com/application-discovery/latest/userguide/application-discovery-service-availability-change.html); AWS Data Transfer Terminal: [aws.amazon.com/data-transfer-terminal](https://aws.amazon.com/data-transfer-terminal/)
- DMS Schema Conversion: [docs.aws.amazon.com/dms/latest/userguide/CHAP_SchemaConversion.html](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_SchemaConversion.html)
- CodeCommit returns to GA: [AWS DevOps blog](https://aws.amazon.com/blogs/devops/aws-codecommit-returns-to-general-availability)
- Database Savings Plans: [AWS News Blog](https://aws.amazon.com/blogs/aws/introducing-database-savings-plans-for-aws-databases/); Lambda durable functions: [What's New, December 2025](https://aws.amazon.com/about-aws/whats-new/2025/12/lambda-durable-multi-step-applications-ai-workflows/); post-quantum cryptography: [aws.amazon.com/security/post-quantum-cryptography](https://aws.amazon.com/security/post-quantum-cryptography/migrating-to-post-quantum-cryptography/)

All facts were checked on 7 November 2026. AWS renames, retires and reprices services often, and exam guides change with about a month's notice, so confirm details on the official pages before relying on them.

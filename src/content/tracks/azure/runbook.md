# Microsoft Azure AI Study Guide

A step-by-step path to pass the two current Microsoft Azure AI certification exams: **AI-901** (Azure AI Fundamentals) and **AI-103** (Azure AI Apps and Agents Developer Associate). Use it alongside each exam's study pages on this site: lessons, flashcards, practice questions and timed mock exams.

> **Read this first.** Exam facts below come from Microsoft Learn exam pages, study guides and policy pages, checked on 8 November 2026. Microsoft does not publish everything (item count, item types, US price on the exam page), and section 3 says exactly what is and isn't official. Foundry products change monthly, so check the official study guide before you book. The practice items on this site are original. They are **not** real exam questions.

---

## Table of contents

1. [How to use this guide](#1-how-to-use-this-guide)
2. [Which exam to take](#2-which-exam-to-take)
3. [Exam facts](#3-exam-facts)
4. [The Microsoft Foundry mental model](#4-the-microsoft-foundry-mental-model)
5. [AI-901: Azure AI Fundamentals](#5-ai-901-azure-ai-fundamentals)
6. [AI-103: Azure AI Apps and Agents Developer](#6-ai-103-azure-ai-apps-and-agents-developer)
7. [Dated changes to watch](#7-dated-changes-to-watch)
8. [Top traps](#8-top-traps)
9. [Study schedules](#9-study-schedules)
10. [Exam-day checklist](#10-exam-day-checklist)
11. [Further reading](#11-further-reading)

---

## 1. How to use this guide

Each exam follows the same loop:

1. **Read** the exam section here (section 5 or 6) to see what is tested and which decisions the questions turn on.
2. **Learn** the lessons for that exam on this site, heaviest domain first.
3. **Recall:** do the flashcards every day. Spaced repetition does the scheduling for you.
4. **Apply:** do the lab at the end of each lesson in a real Foundry project. Both exams expect you to have used the Foundry portal and the Python SDK, not just read about them.
5. **Test:** practise by domain until each one is above 80%, then take full timed mocks.
6. **Fix:** clear the Mistakes notebook and reread section 8 (Top traps) before every mock.
7. **Book** the real exam once you score **85%+ on two mocks in a row**, and after you have taken Microsoft's free practice assessment.

This site practises multiple choice and multiple response only. The real exams may also include drag and drop, hot area, build list and (for AI-103) case studies. Try the [Microsoft exam sandbox](https://aka.ms/examdemo) once so the formats don't surprise you.

Your progress is saved in your browser. Use **My progress → Export backup** to keep a copy or move it to another device.

---

## 2. Which exam to take

On **30 June 2026** Microsoft retired the two older Azure AI exams. **AI-901** replaced AI-900, and **AI-103** replaced AI-102. The AI-102 certification and its renewal assessment are retired too. People who already hold the Azure AI Fundamentals certification keep it; it is now earned through AI-901.

| | **AI-901** | **AI-103** |
|---|---|---|
| Certification | Microsoft Certified: Azure AI Fundamentals | Microsoft Certified: Azure AI Apps and Agents Developer Associate |
| Level | Fundamentals | Associate (Intermediate) |
| Replaced | AI-900 (retired 30 June 2026) | AI-102 (retired 30 June 2026) |
| Who it's for | People starting a career in AI solution development | Azure AI engineers who build, manage and deploy agents and AI solutions on Microsoft Foundry |
| Coding | Python syntax; build "lightweight" client apps | Experience building apps with Python |
| Depth | Pick the right capability; deploy and call it | Design, secure, evaluate, monitor and optimize it |

**Pick AI-901 if** you are new to Azure AI, or you want a quick first credential. It is **not** the old conceptual AI-900. More than half the exam is hands-on Foundry work: deploying models, writing a chat client with the Foundry SDK, creating an agent, calling Speech and Content Understanding. It has no machine-learning fundamentals objective (no regression, clustering or Azure ML designer), even though the exam page's short description still mentions it.

**Pick AI-103 if** you already build on Azure and want the role-based credential. A quarter of it is planning and governance (RBAC, deployment types, quota, guardrails, monitoring), and a third is generative AI and agents.

**Taking both:** AI-901 first, then AI-103. Most of AI-901 domain 2 reappears in AI-103 with more depth, so the first exam is a good warm-up. Leave 1–2 weeks between them.

---

## 3. Exam facts

### AI-901 facts

| Fact | Value | Status |
|---|---|---|
| Exam | AI-901: Microsoft Azure AI Fundamentals | Official |
| Skills measured version | As of 15 April 2026 | Official (study guide) |
| Exam time | **45 minutes** (65 minutes seat time) | Official (exam duration policy for Fundamentals exams) |
| Items | Not published for AI-901. Policy: "Most Microsoft Certification exams typically contain between 40-60 questions" | Range only |
| Item types | Not named per exam; may include multiple choice, multiple response, drag and drop and other sandbox formats | Microsoft does not disclose |
| Passing score | **700** on a 1–1,000 scaled score (not 70%) | Official |
| Price | Exam page: "Price based on the country or region". US$99 is reported by third parties only | US price unofficial |
| Microsoft Learn during the exam | **Not available** on Fundamentals exams | Official |
| Renewal | Fundamentals certifications do not expire | Official |
| Languages | English, Arabic (Saudi Arabia), Chinese (Simplified and Traditional), French, German, Indonesian, Italian, Japanese, Korean, Portuguese (Brazil), Russian, Spanish | Official |
| Practice assessment | Free, on AI Skills Navigator (sign-in required) | Official |

| Domain | Weight |
|---|---|
| Identify AI concepts and capabilities | 40–45% |
| Implement AI solutions by using Microsoft Foundry | 55–60% |

### AI-103 facts

| Fact | Value | Status |
|---|---|---|
| Exam | AI-103: Developing AI Apps and Agents on Azure | Official |
| Skills measured version | As of 16 April 2026 | Official (study guide) |
| Time | The certification page says **120 minutes**. Policy: role-based exams without labs give **100 minutes of exam time** inside 120 minutes of seat time; exams that may contain labs give 120 minutes of exam time inside 140 minutes of seat time | Plan for about 100 minutes of answering time |
| Items | Not published for AI-103. Policy range: typically 40–60 | Range only |
| Item types | "You may have interactive components to complete." Formats are not named; case studies are possible | Microsoft does not disclose |
| Passing score | **700** or greater on a 1–1,000 scaled score | Official |
| Price | Official page: priced by country or region. US$165 (the usual US associate fee) is reported by third parties | US price unofficial |
| Microsoft Learn during the exam | **Available** in the exam UI on role-based exams, but the clock keeps running | Official |
| Renewal | Associate certifications expire **every year**. Renew with a **free** online assessment on Microsoft Learn | Official |
| Retake | 24 hours after the first failed attempt; after that the wait varies | Official |
| GA status | Beta opened April 2026; the pages no longer say "beta" and now link a practice assessment. No dated GA announcement was found | Likely GA |
| Practice assessment | Free, on AI Skills Navigator ([aka.ms/AI103-PA](https://aka.ms/AI103-PA) per the study guide) | Official |

| Domain | Weight |
|---|---|
| Plan and manage an Azure AI solution | 25–30% |
| Implement generative AI and agentic solutions | 30–35% |
| Implement computer vision solutions | 10–15% |
| Implement text analysis solutions | 10–15% |
| Implement information extraction solutions | 10–15% |

### Scoring rules for both exams

- There is **no penalty for guessing**. Answer every item.
- Some items are unscored, and you can't tell which.
- Multi-part items give one point per correct component.
- The **5-minute unscheduled break** comes out of your exam time, and you cannot go back to questions you saw before the break.
- Both study guides say: "Most questions cover features that are general availability (GA). The exam may contain questions on Preview features if those features are commonly used." Learn the preview features this guide marks as commonly used (agent guardrails, memory, Sora 2, Content Understanding agentic mode), but expect GA features to carry most of the marks.

---

## 4. The Microsoft Foundry mental model

Both exams are built around **Microsoft Foundry**. If you hold one picture in your head, make it this one.

```
Foundry resource (one Azure resource)
 ├── Foundry Tools (Speech, Language, Translator, Vision, Content Understanding, Content Safety ...)
 └── Projects (your unit of work; endpoint https://<resource>.services.ai.azure.com/api/projects/<project>)
      ├── Model deployments  (Foundry Models catalog → a named deployment of a deployment type)
      ├── Agents             (Foundry Agent Service: model + instructions + tools)
      ├── Knowledge          (Foundry IQ knowledge bases on Azure AI Search)
      ├── Guardrails         (Content Safety controls on models and agents)
      └── Evaluation, tracing, monitoring
```

### 4.1 Resource and project

- One **Foundry resource** with **projects** replaces the old hub + Azure OpenAI resource + Azure AI Services resource. Hub-based projects still exist in **Foundry (classic)**, but "new investments are focused on Foundry projects in the new portal".
- You can upgrade an Azure OpenAI resource to a Foundry resource and keep its endpoint and keys.
- Portal: `ai.azure.com`. Other surfaces: SDKs (Python, C#, JavaScript, Java), Azure Developer CLI (`azd`), the VS Code extension, and coding agents through MCP.
- Python: `azure-ai-projects` **2.x** plus `openai` is the new Foundry; 1.x is classic. Create `AIProjectClient(endpoint=..., credential=DefaultAzureCredential())`, call `get_openai_client()`, then `responses.create(...)`. The `model` argument is your **deployment name**. Read the reply from `output_text`.
- The plain OpenAI-compatible endpoint (`https://<resource>.openai.azure.com/openai/v1`) accepts API keys and covers embeddings and image generation, but **not agents or evaluations**.

### 4.2 Models and deployments

The Foundry Models catalog has more than 10,000 models from Microsoft, OpenAI, Anthropic, Meta and others. You call a model through a **deployment**. Deployment types apply to serverless API deployments; open-source or custom models on **managed compute** don't use them.

| Need | Deployment type | Why |
|---|---|---|
| Default for most workloads | **Global Standard** | New models first, lowest price, broadest regions, highest default quota |
| Processing must stay in the US, EU or APAC | **Data Zone** Standard / Provisioned / Batch | Processing stays inside the data zone |
| Processing must stay in one Azure geography | **Standard** (regional) or Regional Provisioned | Processing stays in the chosen geography |
| Predictable throughput, low latency variance | **Provisioned** (reserved PTU) | Reserved capacity; standard types are best effort |
| Large asynchronous jobs, cost first | **Batch** | About 50% cheaper, 24-hour target, separate enqueued-token quota |
| Evaluate a fine-tuned model | **Developer** | 24-hour lifetime, no SLA; never for production |

Data at rest always stays in your geography; the scope (Global, Data Zone, Regional) is about where **processing** happens. Global Standard also supports Flex processing (cheaper, tolerates delay) and Priority processing. **Instant access** (preview) lets you call some models by name with no deployment.

### 4.3 Foundry Tools

**Foundry Tools** is the new name for Azure AI services. Service names now follow the pattern "Azure X in Foundry Tools":

| Tool | Use it for |
|---|---|
| Azure Language | PII detection, language detection, NER, text analytics for health (core); sentiment, key phrases, summarization, CLU, question answering, entity linking (legacy) |
| Azure Speech | Speech to text, text to speech, speech translation, Voice Live |
| Azure Translator | Text and document translation |
| Azure Vision | Face; Image Analysis and OCR (both legacy) |
| Azure Content Understanding | Extraction from documents, images, audio and video |
| Azure AI Content Safety | Harm detection, Prompt Shields, protected material; powers guardrails |
| Azure AI Search | Indexing and retrieval for RAG and agents |

**Retired services are never the right answer** for new work: LUIS, QnA Maker, Personalizer, Anomaly Detector, Content Moderator and Metrics Advisor.

### 4.4 Foundry Agent Service

An agent is **model + instructions + tools**. "Models = raw intelligence; agents = packaged, task-oriented workers built on top of that intelligence."

| Agent type | When |
|---|---|
| **Prompt agent** | Declarative, no code or infrastructure. "Building your first agent? Start with a prompt agent." |
| **Voice-based prompt agent** (preview) | Real-time voice through Voice Live |
| **Hosted agent** | Your own code (Microsoft Agent Framework, LangGraph, OpenAI Agents SDK and others) in a container; Foundry manages the endpoint, scaling and Entra identity |
| **Ephemeral agent** | Your app calls the Responses API directly with the definition in code |

The agent API is the **Responses API (Agents v2)**, which replaced the Assistants API. Threads, messages, runs and assistants became **conversations, items, responses and agent versions**.

Lifecycle: create → test in the agents playground → trace → evaluate → optimize → **publish** (a stable endpoint; versions are snapshotted automatically, so you can roll back) → monitor. Agents can be published to Microsoft Teams, Microsoft 365 Copilot and the Entra Agent Registry, and talk to other agents over the A2A protocol. Each agent can have its own **Microsoft Entra agent identity**.

### 4.5 Content Understanding, AI Search and Content Safety

- **Azure Content Understanding** uses generative AI to turn documents, images, audio and video into **Markdown** (for RAG) or **structured JSON** that matches your schema (for automation). The core unit is the **analyzer**. GA API version: `2025-11-01`. Since GA you **bring your own Foundry model deployments** (an LLM plus embeddings); only Read and Layout run without an LLM.
- **Azure AI Search** indexes JSON documents and answers keyword, vector, hybrid and multimodal queries. **Foundry IQ** is the managed knowledge layer on top of it: knowledge bases over knowledge sources, with agentic retrieval.
- **Azure AI Content Safety** detects hate, sexual, violence and self-harm content in text and images, and runs Prompt Shields, protected-material detection and task adherence. Foundry **guardrails** are built on its classifiers.

### 4.6 Renamed products

Questions use the current names. Old names still appear in some Microsoft "find documentation" links, so you need both.

| Old name | Current name |
|---|---|
| Azure AI Studio, Azure AI Foundry | **Microsoft Foundry** |
| Azure AI services (Cognitive Services) | **Foundry Tools** |
| Azure AI Language, Azure AI Speech, Azure AI Translator | Azure Language / Speech / Translator **in Foundry Tools** |
| Hub + Azure OpenAI + Azure AI Services resources | One **Foundry resource** with projects |
| Hub-based projects, old portal | **Foundry (classic)** |
| Assistants API (Agents v0.5/v1) | **Responses API (Agents v2)** |
| Threads / Messages / Runs / Assistants | Conversations / Items / Responses / Agent versions |
| Monthly `api-version` query strings | v1 stable routes (`/openai/v1/`) |
| Content filters | **Guardrails** (default `Microsoft.DefaultV2`) |
| Azure AI User / Owner / Account Owner / Project Manager roles | **Foundry** User / Owner / Account Owner / Project Manager (role IDs unchanged) |
| Agentic retrieval knowledge layer | **Foundry IQ** |
| DALL-E 3 | **gpt-image** series |
| AI-900 / AI-102 | **AI-901 / AI-103** |

---

## 5. AI-901: Azure AI Fundamentals

AI-901 tests whether you can match a scenario to the right AI capability and then build a small working version in Foundry. Domain 2 is worth more than half the exam, so do the hands-on labs.

### 5.1 Domain 1: AI concepts and capabilities

Worth 40–45%. Four topics: responsible AI, how generative models work and are configured, AI workloads, and the techniques behind each workload.

**Responsible AI: the six principles**

| Principle | Recognise it by | Look-alike to avoid |
|---|---|---|
| Fairness | Equitable outcomes across groups (loan approvals, hiring) | Not the same as usable by everyone |
| Reliability and safety | Performs dependably, fails safely | Not deliberate attacks |
| Privacy and security | Protects personal data, **resists misuse** (prompt injection) | Blocking attacks is security, not reliability |
| Inclusiveness | Usable by people of all backgrounds and abilities (accents, disabilities) | A speech app failing strong accents is inclusiveness |
| Transparency | People understand how it works; **disclosing AI-generated content**; explainability | Explaining a decision is transparency |
| Accountability | People remain responsible; human oversight and override | Not "explaining" |

**Generative models and parameters**

- LLMs predict the next token from the tokens before it. Tokens drive cost, latency and throttling for both input and output.
- **System prompt** = persistent role, rules, tone, guardrails. **User prompt** = this turn's request.
- **Temperature**: lower (for example 0.2) is focused and deterministic; higher (0.8) is varied. **top_p** is nucleus sampling, an alternative. Adjust **one or the other, not both**.
- **Max output tokens** caps length and token consumption. It does not change accuracy or creativity. Truncated answers mean it is set too low.
- The model playground compares **up to three models** side by side (the tools section is hidden in compare mode). The **Code** tab exports sample code with your settings, and **Save as agent** turns a configuration into an agent.

**Workloads and techniques**

| Scenario clue | Workload | Technique or tool |
|---|---|---|
| Produce text, images or code | Generative | Chat or image model |
| Goal-driven, multi-step, uses tools | Agentic | Foundry Agent Service |
| Main concepts in a review | Text analysis | Key phrase extraction |
| People, places, organisations as categories | Text analysis | Named entity recognition (NER) |
| "Paris" the city vs a person, link to a reference | Text analysis | Entity linking (Wikipedia links) |
| Positive or negative, per product aspect | Text analysis | Sentiment analysis, opinion mining |
| Shorten using the source's own sentences | Text analysis | Extractive summarization |
| Shorten in new words | Text analysis | Abstractive summarization |
| Audio to text | Speech | Speech recognition (speech to text) |
| Text to spoken audio | Speech | Speech synthesis (text to speech) |
| Describe or reason about an image | Computer vision | Multimodal model |
| Create or edit an image | Image generation | gpt-image models |
| Fields from forms, invoices, audio, video | Information extraction | Content Understanding |

### 5.2 Domain 2: Implement AI solutions with Foundry

Worth 55–60%. You build small apps: a chat client, an agent and its client, text and speech apps, a vision app and an extraction app.

**Chat client (Foundry SDK)**

1. `pip install "azure-ai-projects>=2.3.0" "openai>=3.0.0"`.
2. Authenticate with Microsoft Entra ID through `DefaultAzureCredential`. Don't hard-code keys.
3. `AIProjectClient` on the project endpoint → `get_openai_client()` → `responses.create(model=<deployment name>, input=[...], max_output_tokens=..., temperature=...)` → `response.output_text`.
4. Calls are stateless. For multi-turn chat, send the history or use a conversation.

**Single agent in the portal**

| Need | Tool |
|---|---|
| Answer from your uploaded documents (HR PDFs) | **File search** |
| Run code, analyse data, draw charts | **Code interpreter** |
| Current public information | **Web search** |
| Call your own systems | Functions, OpenAPI tools, MCP servers |

Create a **prompt agent** in the portal, test it in the agents playground, read the **trace** to see each tool call (don't debug from the final reply alone), then call it from code. Playground evaluations are **on by default and billed**. Grant the agent identity only the roles it needs.

**Text, speech and vision apps**

- New text features: prefer Azure Language **core** features (PII, language detection, NER, text analytics for health) or a multimodal model. Legacy features still work and are still tested as techniques.
- Batch **document** translation needs Blob Storage; synchronous single-file translation doesn't.
- A multimodal model can answer spoken prompts directly from audio input.
- Interpret images by putting them in the prompt to a multimodal model. Image Analysis 4.0 is deprecated (retires 25 September 2028).
- Generate images with gpt-image models in the playground, the Images API or the Responses API. **Inpainting** = original image + mask + prompt.

**Speech options**

| Need | Choose |
|---|---|
| Live captions, live calls | Real-time transcription |
| One recorded file, fast result | Fast transcription |
| Thousands of stored recordings overnight | Batch transcription (asynchronous, REST) |
| Noisy audio or domain jargon | Custom speech (acoustic, language, pronunciation data) |
| Fix pitch, rate, volume or a mispronounced brand name | SSML |
| Speak one language, output another | Speech translation |
| Real-time voice conversation with an agent | Voice Live |

**Extraction with Content Understanding**

- Four modalities: documents, images, audio, video. Output: Markdown or schema JSON.
- Field methods: **Extract** (documents only, values printed on the page), **Classify** (fixed categories), **Generate** (free text such as a summary or scene description). Summarising a video is Generate, never Extract.
- Custom analyzers must derive from a **base analyzer**: `prebuilt-document`, `prebuilt-image`, `prebuilt-audio` or `prebuilt-video`. Not from `prebuilt-invoice`.
- `estimateFieldSourceAndConfidence` returns confidence (0–1) and grounding, so low-confidence values go to human review instead of straight into the ERP.
- **Classify then route**: classify each file first, then send it to the right domain analyzer, instead of pushing everything through one invoice analyzer.
- Use the GA API version for production.

---

## 6. AI-103: Azure AI Apps and Agents Developer

AI-103 questions are scenario-based: a requirement plus a constraint (cost, residency, latency, least privilege, safety). The right answer satisfies the constraint with the least extra work.

### 6.1 Domain 1: Plan and manage an Azure AI solution

Worth 25–30%. Service and model choice, retrieval design, deployments and quota, security, monitoring and responsible AI.

**Choosing services and models**

- Prefer a small model or a Foundry Tool when it meets the quality bar more cheaply than a large LLM.
- Prompt agent for managed declarative agents; hosted agent for your own framework code. Hosted does **not** mean you run your own scaling or identity.
- Plan new orchestration on **Microsoft Agent Framework**, not Foundry workflows (retiring 1 December 2026).

**Retrieval: classic vs agentic**

| | Classic search | Agentic retrieval (Foundry IQ knowledge base) |
|---|---|---|
| Scope | One index, one request | One or more knowledge sources |
| How | Your query runs as written | LLM plans the query, runs subqueries in parallel, reranks semantically, merges results with citations |
| Latency | Predictable and low | Higher; region-restricted |
| Pick when | Simple single-index lookup with a tight latency budget | Complex questions across sources, shared by many agents |

"LLMs and agents don't require vectors. Only use them if you need similarity search."

**Security**

| Requirement | Answer |
|---|---|
| RBAC must apply | Use Entra ID. **Keys bypass RBAC entirely**; storing a key in Key Vault is still not least privilege |
| Baseline access to a project | **Foundry User** for the user **and** the project's managed identity |
| See quota | Cognitive Services Usages Reader at subscription scope |
| Only call published agents | **Foundry Agent Consumer** (project or agent scope; narrower scopes via CLI) |
| Publish agents | At least **Foundry Project Manager** |
| Fine-tune and deploy | **Foundry Owner** (the only role with control-plane and data-plane rights) |
| Create accounts and projects but not build | Foundry Account Owner |
| Read external Blob data | Grant the Foundry managed identity **Storage Blob Data Reader** |
| Wrong role for Foundry | Azure AI Developer (it covers ML workspaces and hubs) |

Tool and MCP authentication can be key-based, Entra (agent or project managed identity), OAuth identity passthrough, or unauthenticated. You can bring your own storage, Azure AI Search and Azure Cosmos DB for conversation state. Prompt agents support private networking; hosted agents use your own VNet.

**Quota, cost and monitoring**

- TPM quota errors: request more quota or use another region. Switching to keys does not raise limits.
- Azure Policy can block specific deployment SKUs.
- Three observability pillars: **Evaluation**, **Monitoring** (Application Insights dashboards and alerts for tokens, latency, errors and quality), **Tracing** (OpenTelemetry).
- **Scheduled evaluation** detects drift over weeks; **continuous evaluation** samples live traffic. Tracing alone won't tell you quality is drifting.
- Monitor retrieval too: data ingestion quality, search index health and relevance.
- The AI red teaming agent uses Microsoft's PyRIT framework.

**Guardrails and intervention points**

A **guardrail** is a named set of **controls**. Each control names a risk, the intervention points it checks and an action (Annotate, or Annotate and block).

| Intervention point | Applies to | Use it for |
|---|---|---|
| User input | Models and agents | Jailbreaks (user prompt attacks), harmful prompts, PII |
| Tool call (preview) | Agents only | Stop unsafe or off-task tool calls |
| Tool response (preview) | Agents only | **Indirect attacks (XPIA)** hidden in web pages, files or tool output |
| Output | Models and agents | Harmful content, protected material, groundedness |

| Harm level setting | Blocks |
|---|---|
| Off | Nothing (output off only for approved customers) |
| Low | High severity only |
| Medium | Medium and high |
| High | Low, medium and high (**strictest**) |

- The default guardrail is **Microsoft.DefaultV2**.
- An agent with no guardrail inherits its model deployment's guardrail. An agent's own guardrail **fully replaces** the model's; it does not add to it.
- Agent guardrails are in preview. Hosted agents can add network egress controls (preview).
- MCP tools: `allowed_tools: []` allows **all** tools, not none. Use `require_approval` for tools that write data or change resources, treat server-supplied tool descriptions as untrusted, and log approvals.

### 6.2 Domain 2: Generative AI and agentic solutions

Worth 30–35%, the largest domain. Generative apps, RAG, evaluation, agents, tools, orchestration and optimization.

**Generative apps**

Connect an application to a Foundry project with the project endpoint plus an Entra credential, and assign Foundry User. Deployment choice follows the table in section 4.2: Batch is never for latency-sensitive traffic.

**RAG: classic vs agentic, and query types**

| Query type | How it works | Best for |
|---|---|---|
| Full-text (BM25) | Keyword matching | Product codes, SKUs, jargon, dates, names |
| Vector | Similarity over embeddings (HNSW or exhaustive KNN) | Meaning, paraphrase |
| **Hybrid** | `search` + `vectorQueries` in one request, run in parallel, merged with **Reciprocal Rank Fusion (RRF)** | General RAG default |
| **Semantic ranker** | `queryType=semantic` + `semanticConfiguration`; reranks top results, returns `@search.rerankerScore`. Use `k=50` with vectors | Best relevance on top of hybrid |
| Agentic retrieval | Knowledge base, LLM query planning, parallel subqueries, citations | Multi-source, complex questions |

Adding `orderby` overrides relevance ranking. Stuffing every retrieved document into the prompt does not improve answers.

**Agent tools vs knowledge vs memory**

| Content | Put it in | Why |
|---|---|---|
| Facts about one user learned over time | **Memory** (preview) | Per-user scope; user profile, chat summary and procedural memory |
| Curated company content for all users | **Foundry IQ knowledge base** | Permission-aware, shareable across agents |
| A document the user uploads in this session | **File search** tool | Session-scoped |
| Live public information | Web search or Grounding with Bing | Current data |
| Your systems and APIs | Function calling, OpenAPI, MCP, Azure Functions | Actions |

Memory needs Azure OpenAI chat **and** embedding deployments, has no VNet support, and is limited to 100 scopes per store and 10,000 memories per scope. Protect it from **memory poisoning** with Prompt Shields and adversarial testing; a line in the instructions is not enough.

**Function calling and tools**

- The model **requests** a function call; **your app executes it** and returns `function_call_output` with the matching `call_id`. Foundry does not run your function.
- `strict: true` enforces the JSON schema. JSON mode alone does not guarantee schema-matching arguments. Disable parallel tool calls when using strict structured outputs.
- A **toolbox** exposes a curated, versioned set of tools through one managed MCP-compatible endpoint with central authentication; you promote a new version without redeploying agents. **Tool search** hides large tool sets behind `tool_search` and `call_tool`.
- Direct-only tools (not available in a toolbox): function calling, Grounding with Bing, computer use, image generation, SharePoint, Fabric data agent, Azure Functions.
- MCP approval: the agent emits an `mcp_approval_request`; your client replies with `mcp_approval_response`, the `approval_request_id` and approve or deny, in the same conversation.

**Orchestration and publishing**

- Foundry **workflows** (preview) offer Sequential, Group chat and Human in the loop patterns. They **retire 1 December 2026**. Hosted agents can't be workflow nodes.
- Replacement: **Microsoft Agent Framework** (YAML or code), deployed as a hosted agent. Use Azure Logic Apps when a visual designer is a hard requirement, and A2A for simple agent-to-agent handoff.
- Server-side tracing needs only a connected Application Insights resource.

**Evaluation**

| Question | Evaluator |
|---|---|
| Did the answer make things up? | **Groundedness** (1–5, LLM judge) or **Groundedness Pro** (preview, pass/fail, no model deployment) |
| Does the answer fit the question? | Relevance |
| Did search find the right content? | Retrieval, Document Retrieval |
| Did the agent pick and call tools correctly? | Tool Call Accuracy, Tool Selection, Tool Input Accuracy |
| Did the agent finish the job? | Task Completion, Task Adherence, Intent Resolution |
| Translation quality | BLEU, METEOR, Fluency, Coherence |
| Safety | Hate and Unfairness, Sexual, Violence, Self-Harm, Protected Materials, Indirect Attack, Code Vulnerability, Ungrounded Attributes and others |

BLEU and ROUGE measure text overlap, not groundedness. Conversation-level evaluation needs the `messages` data format.

**Optimization**

- Few-shot examples go after the system message as user/assistant pairs.
- Chain-of-thought prompting is for non-reasoning models. For reasoning models, use `reasoning_effort` instead of "think step by step". Output token caps include reasoning tokens.
- Bound every reflection or self-critique loop with a quality threshold and an iteration limit.
- Hybrid orchestration: deterministic rules make regulated decisions (loan approval); the LLM extracts and explains.

### 6.3 Domain 3: Computer vision

Worth 10–15%. Image and video generation, visual understanding, and responsible AI for visuals.

**Image generation and editing**

| Task | Use |
|---|---|
| New image from a prompt | `images/generations` (JSON) with a gpt-image model |
| Edit an image or combine inputs | `images/edits` (multipart; up to 16 input images) |
| Change one area only | Inpainting mask: a **PNG**, **same dimensions** as the input, **fully transparent pixels** mark the editable area |
| Keep faces and style close to the input | `input_fidelity` high (not on gpt-image-1-mini) |
| Transparent background | `background: transparent` with PNG output |
| Smaller files | JPEG with `output_compression` 0–100 (WEBP not supported) |

gpt-image models always return **base64**, not a URL. Filtered prompts return `content_policy_violation`. **DALL-E 3 was retired on 4 March 2026**; existing deployments no longer work.

**Video generation (Sora 2, preview)**

- Text to video, image to video (the reference image must match the output size exactly), video to video.
- Asynchronous: create the job, poll its status, download the result (typically 1–5 minutes). **Remix** (`remix_video_id`) edits one detail of a finished video instead of regenerating it.
- Sizes 720×1280 or 1280×720; 4, 8 or 12 seconds; billed per second.
- Rejected inputs include copyrighted characters and music, real people and public figures, and input images containing human faces.

**Visual understanding**

- Content Understanding analyzers take images and video. Use **generate** for captions and alt text, **classify** for fixed categories; **extract** works on documents only.
- `prebuilt-videoSearch` returns transcripts plus scene-segment summaries.
- **Single-task vs pro mode**: the study guide names both. Standard (single-task) analyzes one input for one job. Pro mode added reasoning, multiple input documents and an external knowledge base for validation. See section 7 for its current status.

**Responsible AI for visuals**

- Content Safety **Analyze image** covers hate, sexual, violence and self-harm with severity levels.
- **Custom categories** flag what the default categories won't, such as a banned logo or brand rule.
- Text inside an uploaded screenshot can carry an **indirect prompt injection**. Turn on indirect-attack detection; user-prompt jailbreak detection alone won't catch it.
- Content Understanding inherits the guardrail of its model deployment.

### 6.4 Domain 4: Text analysis

Worth 10–15%. Extraction with prompting or Azure Language, translation and speech.

**Prompting vs Azure Language**

| Requirement | Prefer |
|---|---|
| Remove names and phone numbers from transcripts | Azure Language **PII detection** (not a Content Safety harm filter) |
| Standard entities with no prompt work | Prebuilt NER |
| Your own entity types | Custom NER, or an LLM with structured outputs |
| Machine-parsed JSON output | Structured outputs with a JSON schema and `strict: true`, not "reply in JSON" |
| Sentiment, key topics, summaries in a new build | Generative prompting is now the usual choice; the Language features for these are legacy |
| Harmful content and prompt attacks | Content Safety and guardrails |

**Translation**

- Translator v3: dynamic dictionary and do-not-translate markup for a few brand names (no training needed).
- Text translation `2026-06-06` (GA) can select LLMs and supports **adaptive custom translation**: a small set of aligned segment pairs, ready in minutes.
- Custom Translator trains domain models.
- Batch document translation needs Blob containers; one uploaded contract can use synchronous single-file translation.

**Speech options for agents**

| Need | Choose |
|---|---|
| Live voice agent | Real-time speech to text, or Voice Live |
| Lowest possible latency voice agent | **Native speech-to-speech** realtime model |
| More model and voice choice, phrase lists, turn detection | **Cascaded** STT → text model → TTS (higher latency) |
| Quick result for a recorded file | Fast transcription (Azure LLM Speech enhanced mode can transcribe and translate) |
| Large asynchronous volumes | Batch transcription |
| Jargon or noise | Custom speech |
| Voice style and pronunciation | SSML; custom voice is limited access |
| Speaker-separated transcripts for RAG | Content Understanding `prebuilt-audioSearch` |

Guardrails do **not** apply to prompts and completions handled by audio transcription models.

### 6.5 Domain 5: Information extraction

Worth 10–15%. Ingesting and enriching content for search, querying it, and extracting grounded content.

**Ingest into Azure AI Search**

- The index stores JSON documents only.
- **Push**: your code uploads JSON (unsupported sources, real-time sync). **Pull**: indexers crawl supported sources such as Blob, Cosmos DB, SharePoint and OneLake. An indexer can't read any system you own.
- **Skillsets** run OCR, chunking, embedding and LLM transforms during indexing. Scanned PDFs need OCR or they return nothing. **Integrated vectorization** chunks and embeds inside the pipeline, so you rarely need your own embedding loop.
- Security: ACL inheritance for SharePoint, Blob and ADLS Gen2; security filters elsewhere. Never rely on the system prompt to hide restricted documents.

**Content Understanding vs Document Intelligence**

| | Content Understanding | Document Intelligence |
|---|---|---|
| Inputs | Documents, images, audio, video | Documents |
| Approach | Generative AI analyzers with extract, classify and generate fields | Listed among Foundry Tools |
| On the exams | The extraction tool named in both study guides | Appears only in older "find documentation" links |
| Migration | Content Understanding Studio eases moving from Document Intelligence | |

Default to Content Understanding for every new extraction scenario on both exams.

**Content Understanding details**

- Analyzer = content extraction settings + field schema + model deployments.
- `extractionMode`: **layout-aware** for structured documents, **text-only** for fast clean Markdown for RAG.
- Content extraction covers OCR, selection marks, barcodes, formulas, layout, and **multipage tables returned as one object**, so you don't stitch them yourself.
- Classification lives inside the analyzer as `contentCategories` (up to 200). The standalone classifier API is deprecated.
- Values printed on the page use **extract**, not generate.
- Limits: asynchronous PDF/TIFF up to 2,000 pages; synchronous up to 5 pages.
- RBAC roles: Cognitive Service Content Understanding Owner, Contributor and Reader.

---

## 7. Dated changes to watch

As of 8 November 2026. Recheck anything dated near your exam.

| Date | Change | What it means for answers |
|---|---|---|
| 4 March 2026 | **DALL-E 3 retired** | Use gpt-image models; existing DALL-E 3 deployments stop working |
| 15–16 April 2026 | AI-901 and AI-103 skills measured published | The current blueprints |
| 30 June 2026 | **AI-900 and AI-102 retired** (AI-102 renewal too) | Take AI-901 or AI-103 |
| 1 December 2026 | **Foundry workflows retire** | New orchestration on Microsoft Agent Framework as a hosted agent |
| 30 April 2027 | Content Safety **groundedness detection** retires (also in Azure OpenAI guardrails), with Analyze Multimodal, rapid custom categories, containers and the embedded SDK | Prefer the Groundedness evaluators for quality checks; expect the guardrail risk to go |
| 25 September 2028 | Image Analysis 4.0 retires (already deprecated) | Use multimodal models or Content Understanding for new vision work |

**Content Understanding pro mode.** The AI-103 study guide still says "Configure single-task and pro-mode Content Understanding pipelines". Pro mode was introduced in API version `2025-05-01-preview`. The GA `2025-11-01` notes don't mention it, and the Foundry (classic) standard/pro task experience is retired. The preview `2026-06-01-preview` adds **agentic mode** (`config.workflow: "agentic"`), which covers similar ground. Learn what pro mode does (multiple inputs, reference knowledge, reasoning) and when single-task is enough, but don't assume it exists in the GA API.

**Other recent changes:** guardrails replaced content filters; Foundry RBAC roles were renamed; Azure Language moved sentiment, key phrases, summarization, CLU and question answering to legacy; Content Understanding became GA and requires your own model deployments; the Content Understanding page limit rose to 2,000 in October 2026; Sora 2 replaced the earlier Sora preview API. Model names change monthly, so no answer should depend on "the latest model".

---

## 8. Top traps

1. **Old names.** Azure AI Foundry, Azure AI services, Assistants API, threads and runs, content filters: all superseded. Pick the current term.
2. **Retired services.** LUIS, QnA Maker, Personalizer, Anomaly Detector, Content Moderator, Metrics Advisor and DALL-E 3 are never correct for new solutions.
3. **Global ≠ data stored abroad.** Global changes where processing happens; data at rest stays in your geography. For EU processing pick Data Zone (EU), not Global.
4. **Provisioned for a pilot.** Start with Global Standard. Provisioned is for predictable throughput; Batch is never for real-time chat; Developer is never for production.
5. **Max tokens and accuracy.** Max output tokens caps length only. Lowering it doesn't make answers more factual; it truncates them.
6. **Temperature and top_p together.** Change one.
7. **Keys and least privilege.** Keys bypass RBAC. A key in Key Vault is still a key.
8. **Azure AI Developer.** Not a Foundry role. Use Foundry User, Project Manager, Owner or Agent Consumer.
9. **High = strictest.** The High setting blocks the most content.
10. **Guardrails merge.** They don't. An agent guardrail fully replaces the model guardrail.
11. **`allowed_tools: []`.** Allows all MCP tools.
12. **Foundry runs my function.** It doesn't. Your app executes the function and returns `function_call_output` with the `call_id`.
13. **Every RAG needs vectors.** No. Hybrid plus semantic ranker is a strong default; keyword search still wins for codes and names.
14. **Memory for the handbook.** Shared content goes in a knowledge base; memory is per user.
15. **Extract for summaries.** Extract is for values printed in documents. Summaries, captions and alt text are Generate.
16. **Content Understanding brings its own LLM.** Since GA you deploy and connect your own LLM and embeddings.
17. **Web search for internal files.** Use file search or a knowledge base.
18. **Real-time for archives.** Use batch transcription for large stored volumes.
19. **Guardrails cover transcription.** They don't apply to audio transcription models.
20. **New orchestration on Foundry workflows.** They retire 1 December 2026.
21. **"Think step by step" for reasoning models.** Use `reasoning_effort`.
22. **AI-901 has classic ML questions.** The skills list has no ML-fundamentals objective.

---

## 9. Study schedules

### 4-week plan: AI-901 (about 1 hour a day)

| Week | Focus |
|---|---|
| 1 | Domain 1: responsible AI, how generative models work, parameters, workloads and techniques. Daily flashcards. Create a Foundry resource and project. |
| 2 | Domain 2 part 1: deploy a model, use the playground (compare, Code tab, Save as agent), build the SDK chat client, create and test a prompt agent with file search, build the agent client. |
| 3 | Domain 2 part 2: text analysis and translation, a speech app, multimodal image input, image generation and inpainting, a Content Understanding analyzer with confidence scores. Domain practice to 80%+. |
| 4 | Mixed practice, the Mistakes notebook, two full mocks, Microsoft's free practice assessment, section 8. Book when you hit 85%+ twice. |

### 8-week plan: AI-103 (1–1.5 hours a day)

| Week | Focus |
|---|---|
| 1 | Section 4 mental model; Domain 1 services, deployment types, quota. If you haven't taken AI-901, work through its Domain 2 labs. |
| 2 | Domain 1 security (RBAC table, managed identities, agent identity) and monitoring (evaluation, Application Insights, tracing). |
| 3 | Domain 1 responsible AI: guardrails, intervention points, levels, MCP approval. Domain 2 generative apps and the project client. |
| 4 | Domain 2 RAG: build an Azure AI Search index, compare keyword, vector, hybrid and semantic queries; create a Foundry IQ knowledge base. |
| 5 | Domain 2 agents: function calling with `strict: true`, MCP tool with approvals, a toolbox, memory. Evaluators for RAG and agents. Agent Framework orchestration. |
| 6 | Domains 3 and 4: gpt-image generation and inpainting, a Sora 2 job, Content Understanding on images and video, visual guardrails; PII vs prompting, Translator, speech options. |
| 7 | Domain 5: push vs pull ingestion, skillsets, integrated vectorization, Content Understanding extraction modes and `contentCategories`. Domain practice to 80%+ everywhere. |
| 8 | Mixed practice, timed mocks (100 minutes), practice assessment, section 7 dates, section 8 traps. Book when you hit 85%+ twice. |

---

## 10. Exam-day checklist

**Before**

- [ ] Recheck the official study guide for a new "skills measured" date and section 7 for retirements.
- [ ] For online delivery, run the system test on the machine and network you'll use.

**During**

- [ ] AI-901: 45 minutes of exam time and no Microsoft Learn access. Keep a steady pace.
- [ ] AI-103: plan for about 100 minutes. Microsoft Learn is available, but every lookup costs exam time; use it only to confirm a parameter or role name you have narrowed down.
- [ ] Read the constraint in each scenario (residency, latency, cost, least privilege, safety) before the options.
- [ ] Eliminate retired services and old names first.
- [ ] Answer every item. There is no guessing penalty.
- [ ] You can't return to questions you saw before an unscheduled break. Finish and review them first.
- [ ] Take the unscheduled break only if you must; the clock keeps running.

**After**

- [ ] If you failed, go back to domain practice for your weakest domains before rebooking.
- [ ] AI-103: put the yearly renewal assessment in your calendar the day you pass. It is free.

---

## 11. Further reading

- **On this site:** [Library: Azure AI books, courses and papers](/library?track=azure)
- **Exams and policies:** [AI-901 exam page](https://learn.microsoft.com/en-us/credentials/certifications/exams/ai-901/) · [AI-901 study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901) · [Azure AI Fundamentals certification](https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/) · [AI-103 study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103) · [Azure AI Apps and Agents Developer Associate certification](https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-apps-and-agents-developer-associate/) · [Exam duration and experience](https://learn.microsoft.com/en-us/credentials/support/exam-duration-exam-experience) · [Exam scoring and score reports](https://learn.microsoft.com/en-us/credentials/certifications/exam-scoring-reports) · [Exam sandbox](https://aka.ms/examdemo)
- **Platform:** [What is Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/what-is-foundry) · [Deployment types](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/deployment-types) · [Foundry SDK overview](https://learn.microsoft.com/en-us/azure/foundry/how-to/develop/sdk-overview) · [Playgrounds](https://learn.microsoft.com/en-us/azure/foundry/concepts/concept-playgrounds) · [Foundry RBAC](https://learn.microsoft.com/en-us/azure/foundry/concepts/rbac-foundry) · [Observability](https://learn.microsoft.com/en-us/azure/foundry/concepts/observability) · [Built-in evaluators](https://learn.microsoft.com/en-us/azure/foundry/concepts/built-in-evaluators) · [Guardrails](https://learn.microsoft.com/en-us/azure/foundry/guardrails/guardrails-overview) · [Responsible AI principles](https://www.microsoft.com/en-us/ai/responsible-ai)
- **Agents:** [Foundry Agent Service](https://learn.microsoft.com/en-us/azure/foundry/agents/overview) · [Toolboxes](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/toolbox-overview) · [MCP tool](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/model-context-protocol) · [Function calling](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/function-calling) · [Memory](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/what-is-memory) · [Foundry IQ](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/what-is-foundry-iq) · [Workflows (retiring)](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/workflow) · [Microsoft Agent Framework](https://learn.microsoft.com/en-us/agent-framework/overview/)
- **Models, vision and generation:** [Structured outputs](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/structured-outputs) · [Reasoning models](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/reasoning) · [Image generation](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/dall-e) · [Video generation](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/video-generation) · [Azure Vision](https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/overview)
- **Foundry Tools:** [What are Foundry Tools](https://learn.microsoft.com/en-us/azure/ai-services/what-are-ai-services) · [Azure Language](https://learn.microsoft.com/en-us/azure/ai-services/language-service/overview) · [Azure Speech](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/overview) · [Azure Translator](https://learn.microsoft.com/en-us/azure/ai-services/translator/overview) · [Azure AI Content Safety](https://learn.microsoft.com/en-us/azure/ai-services/content-safety/overview) · [Content Understanding](https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview) · [Content Understanding prebuilt analyzers](https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/concepts/prebuilt-analyzers) · [Content Understanding what's new](https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/whats-new)
- **Azure AI Search:** [What is Azure AI Search](https://learn.microsoft.com/en-us/azure/search/search-what-is-azure-search) · [Hybrid search](https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview) · [Semantic ranker](https://learn.microsoft.com/en-us/azure/search/semantic-search-overview) · [RAG in Azure AI Search](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview) · [AI enrichment](https://learn.microsoft.com/en-us/azure/search/cognitive-search-concept-intro)

All facts were checked on 8 November 2026. Foundry features move from preview to GA, and get renamed or retired, every few months. Confirm anything marked preview or dated in section 7 before you rely on it.

# Google Gemini Runbook

A step-by-step path to pass Google Cloud's **Generative AI Leader** exam (GAIL) and to build apps and agents on the **Gemini API**. Use it alongside the two items on this site: the **Generative AI Leader** exam prep (GAIL) and the **Gemini API Developer** course (GEM-DEV). Each has lessons, flashcards, practice questions and a timed practice test.

> **Read this first.** Generative AI Leader is a real Google Cloud certification. Gemini API Developer is this site's own course; Google has no matching exam. Facts below were checked against Google's exam page, exam guide, Cloud release notes and the Gemini API docs on 7 November 2026. Google renamed many products in 2026, and Gemini model IDs change almost monthly, so check the official page before relying on any name, date, price or limit.

---

## Table of contents

1. [Certification status](#1-certification-status)
2. [Which path to take](#2-which-path-to-take)
3. [The study method](#3-the-study-method)
4. [Free official resources](#4-free-official-resources)
5. [Core knowledge](#5-core-knowledge)
6. [Exam: Generative AI Leader (GAIL)](#6-exam-generative-ai-leader-gail)
7. [Course: Gemini API Developer (GEM-DEV)](#7-course-gemini-api-developer-gem-dev)
8. [Capstone projects](#8-capstone-projects)
9. [Study schedules](#9-study-schedules)
10. [Cheat sheets](#10-cheat-sheets)
11. [Sources](#11-sources)

---

## 1. Certification status

| Item | Status (November 2026) |
|---|---|
| **Generative AI Leader** (GAIL) | An **official Google Cloud certification** at the Foundational level, "for anyone in any job role, with or without hands-on technical experience" |
| Format | 50–60 multiple-choice questions in 90 minutes. English, Japanese or Spanish |
| Fee | $99 plus tax where applicable. Check the exam page before booking |
| Delivery | **Pearson VUE**: online-proctored (OnVUE) or at a Pearson test centre. Register through Google's CM Connect portal; no separate Pearson account is needed. Kryterion delivered the exam until 22 February 2026; Pearson VUE delivery began on 2 March 2026. Older guides that say "Kryterion" or "Webassessor" are out of date |
| Rescheduling | Reschedule or cancel at least 24 hours ahead, or the fee is forfeited |
| Prerequisites | **None** |
| Validity and renewal | Valid for **3 years**. A renewal exam is available during the renewal eligibility period; the exam guide covers both the standard and the renewal exam |
| Scoring | Pass or fail. Google **does not publish the cut score**. This site's practice tests use 720/1000 as a target; aim for 85% or more before you book |
| Sample questions | The exam page links to an official, untimed sample-question form (English only). This site does not copy those questions |
| **Gemini API Developer** (GEM-DEV) | **This site's own course** with a practice test (40 questions, 60 minutes, target 720). **Google has no Gemini API developer exam** |
| Nearest official developer credential | Google Cloud's **Professional Machine Learning Engineer**. This site's track notes say it added generative AI in a June 2026 refresh, but that was not re-checked for this runbook, so read its current exam guide before choosing it |

**What this means for you:** if you need a credential you can show, book GAIL. If you need to build on Gemini, take GEM-DEV; it gives you skills, not a Google certificate.

---

## 2. Which path to take

| You are… | Take | Why |
|---|---|---|
| A business or product leader, consultant, PM or sales engineer | **GAIL** | Tests gen AI concepts, Google Cloud's offerings, how to improve model output and business strategy. No code. |
| A technical leader or architect who wants the badge | **GAIL**, then skim **GEM-DEV** | GAIL is the credential; GEM-DEV fills in how the products actually behave. |
| A developer | **GEM-DEV → GAIL** | Build with the API first. After that, GAIL is mostly product names and business framing. |
| Already studying the Claude or OpenAI track | **GEM-DEV** | Tool loops, structured output, agents and evals transfer. Focus on the Gemini-specific shapes in sections 5.7–5.15: steps, `thinking_level`, `tool_choice` modes, grounding rules and caching. |

---

## 3. The study method

The same loop as every track on this site:

1. **Read** this runbook section for your exam or course.
2. **Learn** the lessons, heaviest domain first.
3. **Recall** with flashcards every day. Spaced repetition picks what to review.
4. **Apply** with the capstone projects in section 8. Build them; do not just read about them.
5. **Test** with Smart practice until every domain is above 80%, then take the timed practice test.
6. **Fix** misses in the Mistakes notebook and read the Traps list before each test.

**Daily routine (45–75 minutes):** 10 min flashcards → 20–40 min lesson and its lab → 15–20 min practice questions, reading every option's rationale.

---

## 4. Free official resources

| Resource | Use it for |
|---|---|
| **GAIL exam page** (`cloud.google.com/learn/certification/generative-ai-leader`) | Format, fee, languages, delivery, links to the exam guide, study guide and sample questions |
| **GAIL exam guide** (PDF, linked from the exam page) | The four sections, their weights and every topic in scope. Your checklist |
| **GAIL study guide** (PDF, linked from the exam page) | Google's own reading list by section |
| **Google Skills** (`www.skills.google`) | The free **Generative AI Leader learning path**. Google Cloud Skills Boost was renamed Google Skills; the exam page may still link the old `cloudskillsboost.google` address |
| **Certification support** (`support.google.com/cloud-certification`) | Pearson VUE delivery, rescheduling and renewal FAQs |
| **Agent Platform release notes** (`docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes`) | The 22 April 2026 renaming table (Vertex AI → Agent Platform names) |
| **Gemini Enterprise docs** (`docs.cloud.google.com/gemini/enterprise/docs`) | Search, assistant, Agent Gallery, editions |
| **SAIF** (`saif.google`) | Google's Secure AI Framework |
| **Google AI Principles** (`ai.google/responsibility/principles`) | The current three-theme principles |
| **Gemini API docs** (`aistudio.google.com/docs`) | Models, Interactions API, prompting, thinking, function calling, structured output, grounding, caching, Batch, safety. The old `ai.google.dev/gemini-api/docs` links redirect here |
| **Models and deprecations pages** (`aistudio.google.com/docs/models`, `/docs/deprecations`) | Current model IDs, statuses and shutdown or routing dates. Check before you build |
| **Pricing page** (`aistudio.google.com/docs/pricing`) | Current prices. Several introductory prices end on 30 November and 31 December 2026 |
| **Google AI Studio** (`aistudio.google.com`) | Try prompts and get an API key for free |
| **Agent Development Kit** (`adk.dev`) | Google's open-source agent framework. The old `google.github.io/adk-docs` address redirects here |
| **Gemini cookbook** (`github.com/google-gemini/cookbook`) | Runnable notebooks. Some predate the Interactions API, so check which API each one uses |

---

## 5. Core knowledge

### 5.1 What changed in 2026

Many older tutorials, courses and practice tests are now wrong. Learn the current names; the GAIL exam guide already uses them.

| Area | Old | Now (November 2026) |
|---|---|---|
| Google Cloud's AI platform | Vertex AI | **Gemini Enterprise Agent Platform** ("Vertex AI is now part of Gemini Enterprise Agent Platform", 22 April 2026) |
| Low-code studio | Vertex AI Studio | **Agent Studio** |
| Enterprise search and pre-built RAG | Vertex AI Search | **Agent Search** |
| Agent hosting | Vertex AI Agent Engine | **Agent Runtime** (some docs pages still say Agent Engine) |
| Other platform pieces | Vertex AI AutoML, Feature Store, RAG Engine, Vector Search, Gen AI evaluation service | **Agent Platform AutoML**, **Agent Platform Feature Store**, RAG Engine, Vector Search, **Gen AI evals** |
| Agent memory | Agent Engine Sessions, Memory Bank | **Agent Platform Sessions**, **Agent Platform Memory Bank** |
| Enterprise assistant | Google Agentspace | **Gemini Enterprise** (renamed 9 October 2025) |
| Research notebook | NotebookLM | **Gemini Notebook** (16 July 2026; "the same standalone product") |
| Paid Gemini app tier | Gemini Advanced | Reported as **Google AI Pro** (secondary sources only). The exam guide still says "Gemini Advanced" |
| Workspace AI | Duet AI for Google Workspace | **Gemini for Google Workspace** (2024); Google's Workspace site now says "Google Workspace with Gemini" |
| Training site | Google Cloud Skills Boost | **Google Skills** (`www.skills.google`) |
| GAIL delivery | Kryterion | **Pearson VUE** (from 2 March 2026) |
| Google AI Principles | Seven objectives and a list of applications Google won't pursue | Three themes: bold innovation; responsible development and deployment; collaborative progress, together (rewritten February 2025) |
| Gemini API docs | `ai.google.dev/gemini-api/docs` | **`aistudio.google.com/docs`**; ADK docs at **`adk.dev`** |
| Main Gemini API interface | `generateContent` | **Interactions API** (GA and the default since June 2026). `generateContent` is legacy but "remains fully supported" |
| Flagship model | `gemini-2.5-pro` | **Gemini 4 Argon** (`gemini-4-argon`, GA 13 October 2026). 2.5 Pro and 2.5 Flash are deprecated and auto-route to newer models from 1 December 2026 |
| Sampling control | `temperature`, `top_p`, `top_k` | **Ignored** on 3.6 Flash, 3.5 Flash-Lite and newer models (future generations will error). **`thinking_level`** is the control |
| Thinking control | `thinking_budget` | **`thinking_level`** (`thinking_budget` is legacy for the 2.5 series) |
| Search grounding billing | Per grounded prompt | **Per search query the model runs** on Gemini 3 and newer |
| Inline request limit | 20 MB | **100 MB** per request (50 MB for PDFs). Batch inline requests are still limited to 20 MB |
| Hosted agents | Did not exist | **Managed Agents** (Antigravity, Deep Research) in **Public Preview** since 19 May 2026 |

### 5.2 Gen AI fundamentals (GAIL section 1)

- **AI ⊃ ML ⊃ deep learning.** Gen AI creates new content (text, images, code, audio, video).
- **Foundation models** are broad models trained on large data and adapted to many tasks. **LLMs** are text-focused foundation models. **Multimodal** models such as Gemini take several input types. Image and video generators typically rely on **diffusion**-style generation.
- **Prompt engineering** changes the input. **Prompt tuning** and **fine-tuning** change learned parameters.
- **ML approaches:** supervised (labelled data), unsupervised (find structure), reinforcement (learn from rewards).
- **ML lifecycle** (the guide's exact stages): data ingestion → data preparation → model training → model deployment → model management.
- **Data quality dimensions:** completeness, consistency, relevance, availability, cost, format. Most enterprise data is unstructured; gen AI makes it usable.
- **The gen AI landscape has five layers:** Infrastructure, Models, Platforms, Agents, Applications.
- **Google's models in the guide:** **Gemini** (multimodal flagship family: the top tier for the hardest reasoning, Flash for most workloads, Flash-Lite for the cheapest, fastest high-volume work), **Gemma** (lightweight open-weight models you can self-host and fine-tune), **Imagen** (text-to-image), **Veo** (video). The guide names Imagen, but the current Agent Platform model catalogue does not list it, so don't assume it is still offered for new work.
- **Choosing a model:** modality, context window, security, availability and reliability, cost, performance, fine-tuning and customisation.
- **Business value verbs:** create, summarise, discover, automate.

### 5.3 Google Cloud's gen AI offerings (GAIL section 2)

| Need | Offering |
|---|---|
| A personal AI assistant; saved custom assistants | **Gemini app**; **Gems** (custom personas with instructions and files) |
| Research grounded only in sources you add | **Gemini Notebook** (formerly NotebookLM) |
| AI inside Gmail, Docs, Sheets, Slides, Meet, Chat, Drive, Vids | **Gemini for Google Workspace**. Google says company data "is not used to train models" |
| Permission-aware search and an assistant across company systems, with agents | **Gemini Enterprise**: prebuilt connectors (for example Confluence, Jira, SharePoint, ServiceNow), custom agents, the **Agent Gallery** (Made by Google agents such as Deep Research, partner agents), **Gemini Notebook Enterprise**. Editions: Business, Standard, Plus, Pay-as-you-go, Frontline |
| Search and pre-built RAG over your own content | **Agent Search** (formerly Vertex AI Search) |
| Contact centre AI | **Customer Engagement Suite**: Conversational Agents (self-service virtual agents), Agent Assist (real-time help for human agents), Conversational Insights (post-interaction analytics), Google Cloud Contact Center as a Service |
| Build, tune, ground, deploy and govern models and agents | **Gemini Enterprise Agent Platform**: Model Garden (first-party, partner and open models), Agent Studio, Agent Platform AutoML, RAG Engine, Vector Search, ADK, Agent Garden, Agent Runtime, Sessions, Memory Bank, Gen AI evals |
| A specific AI task without building a model | **Pre-built APIs**: Speech-to-Text, Text-to-Speech, Translation, Document Translation, Document AI, Cloud Vision, Cloud Video Intelligence, Natural Language API |
| AI-optimised compute | **AI Hypercomputer**, TPUs and GPUs |

- **Google AI Studio vs Agent Studio:** AI Studio is the free, fast developer sandbox for the Gemini API, without enterprise compliance controls. Agent Studio, on Agent Platform, adds IAM, data residency, CMEK and compliance: the production path for enterprises.
- **Agents act through tools:** extensions, functions, data stores and plugins.
- **How to build an agent, by audience:** code-first with ADK; start from samples in Agent Garden; low-code in Agent Studio; no-code for business users in Gemini Enterprise.
- **Why Google Cloud:** AI-first research, enterprise readiness, an integrated ecosystem, an open approach (Model Garden includes third-party and open models), data control (security, privacy, governance) and democratisation (low-code and no-code tools, pre-trained models, APIs).

### 5.4 Improving model output (GAIL section 3)

| Limitation | Matching mitigation |
|---|---|
| Knowledge cutoff, missing company facts, hallucinations | **Grounding** and **RAG** |
| Wrong format, tone or task framing | **Prompt engineering** |
| Consistent specialised style or behaviour | **Fine-tuning** (or prompt tuning) |
| Bias, fairness, edge cases, high-stakes decisions | Better and more representative data, testing on rare inputs, **human in the loop** |

- **Prompting techniques:** zero-shot, one-shot, few-shot, role prompting, prompt chaining. Advanced: **chain-of-thought** (reasoning steps) and **ReAct** (reasoning plus tool use).
- **Grounding sources:** first-party enterprise data, third-party data and world data. **Offerings:** pre-built RAG with **Agent Search**, **RAG APIs** (RAG Engine), and **Grounding with Google Search**.
- **Sampling and output settings in the guide:** token count, temperature, top-p (nucleus sampling), safety settings, output length. Low temperature for accuracy, higher for variety. Top-k is not in the guide.
- **Exam vs API reality:** GAIL tests temperature and top-p as concepts. In the current Gemini API they are ignored on the newest models (section 5.8). Answer the exam in concept terms.
- **Monitoring:** automatic model upgrades, KPIs, security patches and updates, versioning, performance tracking, drift monitoring, Agent Platform Feature Store. Tools include Gen AI evals and Model Monitoring on Agent Platform.

### 5.5 Business strategy, security and responsible AI (GAIL section 4)

- **Choosing a solution:** weigh business requirements against technical constraints. Prefer the simplest option that meets the need: use a pre-built product, then configure, then build, then customise.
- **Measure impact** against a baseline: productivity, quality, financial results, adoption and risk.
- **SAIF** is Google's Secure AI Framework for AI-specific security risks. Its current site describes itself as "a practitioner's guide to navigating AI security", with a SAIF Map, a list of AI risks and an agent risk self-assessment. Older material lists six core elements (security foundations, detection and response, automated defences, harmonised platform controls, adapted controls, business context); that list is widely cited but not shown on the current site, so learn the ideas rather than the exact wording.
- **Security tools the guide names:** secure-by-design infrastructure, **IAM**, **Security Command Center** and workload monitoring tools. Secure the whole ML lifecycle, not just the endpoint.
- **Responsible AI:** transparency, privacy, data quality, bias and fairness, accountability, explainability.
- **Privacy:** **anonymisation** is irreversible; **pseudonymisation** is reversible with a key.
- **Google AI Principles** (current): bold innovation; responsible development and deployment; collaborative progress, together.

### 5.6 Gemini models (API)

| Model ID | Status | Use it for |
|---|---|---|
| `gemini-4-argon` | Stable (GA 13 October 2026) | Flagship for hard reasoning, coding and agentic work. One 1,048,576-token window shared by input, thinking and output. Thinking cannot be turned off. Not on the Free tier |
| `gemini-3.8-flash` | Stable | Google's "most intelligent Flash model". The usual default for most apps |
| `gemini-3.6-flash` | Stable | Flash with a `minimal` thinking option |
| `gemini-3.5-flash-lite` | Stable | Fastest and cheapest. Thinks at `minimal` by default |
| `gemini-3.1-pro-preview` | **Preview** | The only current Pro model. Not on the Free tier |
| `gemini-2.5-pro`, `gemini-2.5-flash` | **Deprecated** | From 1 December 2026 they auto-route to `gemini-3.8-flash` and `gemini-3.5-flash-lite`, billed at those models' rates |
| `gemini-embedding-2`, `gemini-embedding-001` | Stable | Embeddings (section 5.12) |
| `deep-research-preview-04-2026`, `deep-research-max-preview-04-2026`, `antigravity-preview-09-2026` | **Preview** | Managed agents, called with `agent=` (section 5.13) |

- **There is no GA "Pro" model right now.** Think "flagship (4 Argon) vs Flash (3.8, 3.6) vs Flash-Lite (3.5)".
- **Version types:** **Stable** IDs usually don't change; use them in production. **Preview** may be used in production but can have tighter rate limits and is deprecated with at least two weeks' notice. **Latest** aliases (for example `gemini-flash-latest`) are hot-swapped with each release. **Experimental** is not for production.
- **Deprecation** means support ends and a shutdown is announced; **shutdown** means the endpoint is gone. A 2026 pattern is **automatic routing** of deprecated stable IDs to a successor.
- **How to choose:** the cheapest model and lowest thinking level that pass your evals. Keep model IDs in configuration and watch the deprecations page.

### 5.7 The Interactions API

```python
from google import genai

client = genai.Client()  # reads the API key from the environment

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    system_instruction="You are a concise support assistant for Acme.",
    input="Explain retrieval-augmented generation in three bullet points.",
)
print(interaction.output_text)
print(interaction.usage)
```

- Needs `google-genai` (Python) or `@google/genai` (JS) **2.3.0 or later**.
- An **interaction** is one complete turn. It holds a list of typed **steps**: `user_input`, `thought`, `function_call`, `function_result`, server-tool steps (such as `google_search_call` and `google_search_result`) and `model_output`. Roles were replaced by typed steps. `create` returns the model's steps; `interactions.get` also returns the `user_input` steps.
- **Server-side state:** pass the previous interaction's `id` as `previous_interaction_id`. Only inputs and outputs carry over, so **resend `tools`, `system_instruction` and `generation_config` on every turn**.

```python
turn2 = client.interactions.create(
    model="gemini-3.8-flash",
    input="What is my name?",
    previous_interaction_id=turn1.id,
)
```

- **Storage:** `store=True` by default. Paid tier retention is 55 days (configurable to 7, 14, 28 or 55); Free tier is 1 day. Delete stored interactions with `delete`.
- **`store=False`** makes the call stateless: you can't use `previous_interaction_id`, you must resend the full history including `thought` and `function_call` steps exactly as received, and combining it with `background=True` returns a 400.
- **Legacy `generateContent`:** still supported, and still needed for the **Batch API**, **explicit caching** and Python **automatic function calling**. Migration map: `contents` → `input`; `candidates`/`parts` → `steps`/`output_text`; `generate_content_stream` → `create(stream=True)`; `functionResponse` → `function_result` with `call_id`.
- **Gemini 3+ on `generateContent`:** a request ending in a **prefilled model turn returns 400**, `candidate_count` is unsupported, and thought signatures must be returned.

### 5.8 Prompting and thinking

- **Prompting (Gemini 3 guidance):** be precise and direct; use one delimiter style (XML tags or Markdown); define ambiguous terms; ask explicitly if you want longer output, because answers are concise by default. Put persona, constraints and format in the system instruction or at the very start of the prompt.
- **Long context:** put all the material first and the question **at the end**, anchored with something like "Based on the information above…".
- Include **few-shot examples** with consistent formatting. Thinking models don't need "show your reasoning" instructions.

**Thinking levels** (`generation_config.thinking_level`):

| Model | Levels | Default |
|---|---|---|
| `gemini-4-argon` | low, medium, high (`minimal` errors) | medium |
| `gemini-3.8-flash` | low, medium, high (`minimal` errors) | medium |
| `gemini-3.6-flash` | minimal, low, medium, high | medium |
| `gemini-3.5-flash-lite` | supports minimal | minimal |
| `gemini-3.1-pro-preview` | low, medium, high | high |

- `minimal` means the model "likely will not think", not that it never will.
- **Sampling parameters** (`temperature`, `top_p`, `top_k`) are deprecated and ignored on 3.6 Flash, 3.5 Flash-Lite and newer models, and future generations will reject them. Remove them rather than tuning them.
- **Thinking tokens are billed as output**, even when you only see a summary. Read `usage.total_thought_tokens`. Ask for summaries with `thinking_summaries: "auto"`.
- **`max_output_tokens` includes thinking.** Set it too low and you get `MAX_TOKENS` with truncated or empty output, and the thinking is still billed. Lower the thinking level instead. For 4 Argon, Google suggests at least 32,768.
- **`thinking_budget`** is the legacy 2.5-series control. On 4 Argon, a budget alone is mapped to the nearest level with a warning, and **sending both returns 400**; don't send both on any model. The docs conflict on whether 2.5 models accept `thinking_level`, so use `thinking_budget` there.
- **Thought signatures** travel with `thought` steps. The server and SDKs handle them in stateful mode; in stateless mode resend them exactly.

### 5.9 Multimodal input and the Files API

| Method | Limit | Notes |
|---|---|---|
| Inline data | **100 MB per request** (50 MB for PDFs) | Not stored |
| Files API | **2 GB per file, 20 GB per project, kept 48 hours** | Free. Use when the request is over 100 MB or you reuse the same media. Your uploads can't be downloaded again |
| Cloud Storage URI registration | 2 GB per file | Access for up to 30 days |
| External URL | 15 MB per file | |

```python
myfile = client.files.upload(file="lecture-03.mp3")
interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=[
        {"type": "audio", "uri": myfile.uri, "mime_type": myfile.mime_type},
        {"type": "text", "text": "Summarise this lecture by topic with timestamps."},
    ],
)
```

- **Media resolution** trades detail for tokens per item. Suggested: images `high`, PDFs `medium` (quality saturates there), video `low` or `medium`, or `high` for text-heavy frames.
- Video is sampled at 1 frame per second by default. **Agentic video processing** (supported on 4 Argon, 3.8 Flash, 3.6 Flash and 3.5 Flash-Lite) can cut input cost on long videos substantially.
- **Tokens:** about 4 characters per token. Count before a call with `client.models.count_tokens(...)`, or read `interaction.usage` after it.

### 5.10 Function calling

```python
import json

get_order = {
    "type": "function",
    "name": "get_order",
    "description": "Look up an order by ID. Use for order status or delivery questions.",
    "parameters": {
        "type": "object",
        "properties": {"order_id": {"type": "string"}},
        "required": ["order_id"],
    },
}

first = client.interactions.create(model=MODEL, input="Where is order A-1234?", tools=[get_order])
call = next(s for s in first.steps if s.type == "function_call")
result = lookup_order(**call.arguments)  # your code, after validating the arguments

final = client.interactions.create(
    model=MODEL,
    previous_interaction_id=first.id,
    tools=[get_order],  # tools are per interaction: resend them
    input=[{"type": "function_result", "name": call.name, "call_id": call.id,
            "result": [{"type": "text", "text": json.dumps(result)}]}],
)
print(final.output_text)
```

- **The model never runs your function.** It returns a `function_call` step (status `requires_action`); your app validates, executes and replies with a `function_result` carrying the matching `call_id`. Loop until there are no more calls, with a turn cap.
- **Parallel** calls are several independent calls in one turn; answer every one. **Compositional** calls are chained across turns.
- **`tool_choice`** (in `generation_config`): `auto` (default), `any` (must call a function), `none` (no calls), `validated` (enforces schema adherence). Restrict to a subset with `{"allowed_tools": {"mode": "any", "tools": ["get_order"]}}`.
- Legacy `generateContent` uses `AUTO`, `ANY`, `NONE`, `VALIDATED` with `allowed_function_names`. `VALIDATED` is the default when functions are combined with built-in tools or structured output.
- **Best practices:** clear descriptions, descriptive names without spaces, strong types and enums, an active set of **10–20 tools at most**, validate before executing, return errors as data.
- **Overly complex declarations** (deep nesting, huge enums, many `anyOf`) can return **400 INVALID_ARGUMENT**. Split tools, flatten nesting and move rules into descriptions.
- Streaming tool calls arrive as `arguments_delta` fragments; join them before executing.
- **Automatic function calling** is Python-only and `generateContent`-only.
- **Remote MCP** uses an `mcp_server` tool and supports Streamable HTTP only (not SSE); server names can't contain hyphens. The docs conflict on whether Gemini 3 supports remote MCP in the Interactions API yet, so test it before you depend on it.
- Error codes to know: `malformed_function_call`, `unexpected_tool_call`, `too_many_tool_calls`, `missing_thought_signature`.

### 5.11 Structured output

```python
from pydantic import BaseModel
from typing import Optional

class Invoice(BaseModel):
    vendor: str
    total: float
    due_date: Optional[str]  # null if not printed

interaction = client.interactions.create(
    model=MODEL,
    input=invoice_text,
    response_format={"type": "text", "mime_type": "application/json",
                     "schema": Invoice.model_json_schema()},
)
invoice = Invoice.model_validate_json(interaction.output_text)
```

- Legacy form: `response_mime_type="application/json"` plus `response_json_schema`.
- **Enforced:** types (including `null` via a type array), `properties`, `required`, `additionalProperties`, `enum`, string `format`, numeric `minimum`/`maximum`, array `items`, `prefixItems`, `minItems`/`maxItems`, `anyOf`, `$ref`/`$defs`.
- **Silently ignored, not an error:** `minLength`, `maxLength`, `minProperties`, `maxProperties`, `uniqueItems`, `contains`. Check these in your own code.
- Output follows the schema's key order. Streamed chunks concatenate into the full object.
- The JSON is guaranteed to be valid; the **values are not guaranteed to be correct**. Validate, and retry or review when values are wrong.
- Structured output combined with built-in tools is a **Preview** feature on Gemini 3 and 4.
- **Structured output** shapes the final answer; **function calling** asks your app to take an action.

### 5.12 Grounding, RAG and long context

| Tool | Type | Remember |
|---|---|---|
| Google Search | `{"type": "google_search"}` | Returns `google_search_call`, `google_search_result` (with Search Suggestions HTML) and `url_citation` annotations. **On Gemini 3+ it is billed per search query the model runs**, and one prompt can run several; a monthly free allowance is shared across Gemini 3+ models. Gemini 2.5 and older bill per grounded prompt |
| Google Maps | `{"type": "google_maps"}` | Optional latitude and longitude. Sources must immediately follow the answer; don't alter the "Google Maps" attribution. English only |
| URL context | `{"type": "url_context"}` | Up to 20 public URLs per request, 34 MB each. No paywalls, YouTube, Workspace docs or audio/video. Content is billed as input tokens |
| File Search | `{"type": "file_search", "file_search_store_names": [...]}` | Managed RAG. You pay for embeddings at indexing; storage and query-time embeddings are free. Citations come back as `file_citation` annotations |

- **Search display rules (terms of service):** show grounded results **with** their Search Suggestions, only to the user who sent the prompt. Don't cache, reframe, resell, analyse or train on results, don't mix in other content, and don't track clicks.
- **Embeddings:** `gemini-embedding-2` is multimodal (text, image, audio, video, PDF), has no `task_type` (use a text prefix instead) and normalises truncated vectors for you. `gemini-embedding-001` is text-only and supports `task_type` (for example `RETRIEVAL_QUERY`, `RETRIEVAL_DOCUMENT`). Both default to 3,072 dimensions and can be truncated with `output_dimensionality`.
- **The two embedding spaces are incompatible.** Upgrading means re-embedding your whole corpus.
- **Long context:** 1M-token windows. Single-fact retrieval is very accurate; **finding many facts at once is less accurate**, so RAG still has a place. Put the question at the end, and use caching to cut the cost of repeated context.

### 5.13 Agents: ADK, Managed Agents and Agent Platform

| Path | Runs where | Choose when |
|---|---|---|
| **Interactions API** + your loop | Your code | Single calls or a fully custom loop |
| **Agent Development Kit (ADK)** | Your app, or deployed to Agent Runtime, Cloud Run, GKE or any container | Code-first agents with your own tools, sessions, memory and multi-agent design |
| **Managed Agents** (Public Preview) | Google-hosted sandbox, via the Interactions API with `agent=` | You want Google to run a long, tool-using agent (coding, research) for you |
| **Agent Platform** (Agent Studio, Agent Runtime) | Google Cloud | Enterprise controls, governance and managed deployment |

**ADK essentials**
- Open source; Python, TypeScript, Go, Java and Kotlin. Install with `pip install google-adk`. **ADK 2.0** adds graph-based workflows.
- `Agent` / `LlmAgent` takes `name`, `model`, `instruction`, `description`, `tools`, `sub_agents` and `output_key`.
- **Workflow agents** (`SequentialAgent`, `ParallelAgent`, `LoopAgent`) orchestrate deterministically without asking a model. In Python and Go 2.0, graph workflows supersede them.
- A coordinator with `sub_agents` gets delegation tools for each sub-agent. **`AgentTool`** wraps an agent as a tool.
- Function tools get their schema from the signature, type hints and docstring; a parameter without a default is required.
- **State:** `session.state`, with prefixes: none = this session, `user:` = across the user's sessions, `app:` = app-wide, `temp:` = this invocation only. `output_key` saves an agent's final text into state; `{key}` injects state into instructions. **Memory** is searchable across sessions.
- **Callbacks** before and after agent, model and tool calls are where you put guardrails and logging.
- Use **A2A** for remote, independent or third-party agents with a formal contract; prefer local sub-agents when they need shared state.

**Managed Agents (Public Preview)**
- One call provisions an isolated Google-hosted Linux sandbox. Outbound network is open by default; restrict it with an allowlist, and store secrets as managed credentials.
- **Antigravity** (`antigravity-preview-09-2026`): default tools are code execution, Google Search and URL context; you can add custom functions and MCP servers. Call with `agent=`, `environment="remote"` and `background=True`.
- **Deep Research** (`deep-research-preview-04-2026`, `deep-research-max-preview-04-2026`): requires `background=True`; poll or stream. **No custom function tools and no structured output.** Tasks can run up to 60 minutes.
- **Background mode requires `store=True`.**

**Gemini Enterprise Agent Platform:** Agent Runtime (formerly Agent Engine), Agent Platform Sessions and Memory Bank, Agent Studio. Agent Gateway and Agent Registry went GA in June 2026. Managed agents on Agent Platform are in preview.

### 5.14 Cost and production

- **Pricing changes soon.** Introductory prices end on 30 November 2026 for 4 Argon and on 31 December 2026 for 3.8 and 3.6 Flash. Read the pricing page rather than memorising numbers. Output price includes thinking tokens.
- **Free tier** covers the Flash and Flash-Lite models but **not** 4 Argon or 3.1 Pro Preview.

| Lever | What it does |
|---|---|
| **Implicit caching** | On by default for 2.5 and newer, but **no guaranteed savings**. Put large shared content first and send similar prefixes close together. Minimum prefix: 4,096 tokens on 4 Argon, 3.8 Flash, 3.6 Flash and 3.1 Pro Preview. Check `usage.total_cached_tokens` |
| **Explicit caching** | Guaranteed savings, default TTL 1 hour plus storage cost. **`generateContent` only** (beta), Gemini 3 and 2.5. **Not in the Interactions API and not on 4 Argon** |
| **Batch API** | 50% off, 24-hour target, **`generateContent` only**. Jobs that are still pending or running after 48 hours expire with no results |
| **Flex** (`service_tier="flex"`, preview) | 50% off, synchronous but best-effort |
| **Priority** (`service_tier="priority"`, preview) | Costs more; non-sheddable; falls back to Standard above your priority limits |
| Lower `thinking_level` | Fewer billed thinking tokens |

- **Rate limits** are RPM, input TPM and RPD (plus others), applied **per project, not per API key**. RPD resets at midnight Pacific. Tiers rise with billing history and spend; read your actual limits in AI Studio.
- **Errors:** 429 `rate_limit_exceeded` and 503 → exponential backoff. 429 `quota_exceeded` → wait for the reset or ask for more quota. 504 → raise the client deadline. 402 `payment_required` → **don't retry**. 400 → fix the request.
- **Streaming:** `stream=True` sends `interaction.created`, `step.start`/`step.delta`/`step.stop`, `interaction.completed` (with usage) and `error`. Resume with `last_event_id`.
- **Background runs:** `background=True` returns an ID at once; poll `interactions.get` or stream. Use it for agents, Deep Research and long reasoning. Plain HTTP connections usually close after about 60 seconds.
- **Long output on 4 Argon:** the default output cap is 65,536 tokens; raise `max_output_tokens` for long decode, ideally in background mode.

### 5.15 Safety

- **Adjustable categories:** harassment, hate speech, sexually explicit, dangerous content and, in the Interactions API, **jailbreak**.
- **Thresholds:** `off`, `block_only_high`, `block_medium_and_above`, `block_low_and_above`. **The default is off for Gemini 2.5 and newer.** Blocking is based on probability, not severity. Built-in protections such as child safety always apply.
- **What a block looks like:** in the Interactions API, a blocked input or output returns **HTTP 400** with a code such as `safety`, `jailbreak` or `prohibited_content`, and the blocked content is not returned. Background runs end `failed`; streams send an `error` event. Legacy `generateContent` uses `promptFeedback.blockReason` and `finishReason == SAFETY`.
- **Responsible AI is a cycle:** understand your risks → mitigate → test for your use case → collect feedback and monitor. Google's docs say "the onus is on developers".
- **Prompt injection** can arrive through tool results, web pages, files and MCP servers. Validate tool calls, give tools least privilege, and require human approval for actions that write, send or spend.
- **Keys** stay server-side. Never ship an API key in a browser or mobile app.

---

## 6. Exam: Generative AI Leader (GAIL)

**Who:** business and technical leaders who shape gen AI adoption. No coding. This site's practice test uses 50 questions in 90 minutes.

| Section | Weight | Lessons | Must-know |
|---|---|---|---|
| Fundamentals of gen AI | ~30% | Core gen AI concepts in plain language · ML approaches and the ML lifecycle on Google Cloud · Data: quality, structure and labels · The gen AI landscape layers and Google’s models · Where gen AI creates business value | AI ⊃ ML ⊃ DL, foundation models, diffusion, prompt tuning; five lifecycle stages; six data-quality dimensions; five landscape layers; Gemini, Gemma, Imagen, Veo; model-choice factors |
| Google Cloud’s gen AI offerings | ~35% | Why Google Cloud for gen AI · Pre-built offerings: Gemini app, Gemini Enterprise, Workspace · Customer experience: Agent Search and the Customer Engagement Suite · Building with Gemini Enterprise Agent Platform · Agents on Agent Platform: build, run, evaluate | Product for each need; Gems; Gemini Notebook; Gemini Enterprise; CES components; Agent Platform pieces and new names; AI Studio vs Agent Studio; agent tooling; pre-built APIs |
| Techniques to improve gen AI model output | ~20% | Model limitations and how to overcome them · Prompt engineering techniques · Grounding, RAG and sampling parameters | Limitation → mitigation; zero/one/few-shot, role, chaining, CoT, ReAct; grounding sources and offerings; temperature, top-p, output length; monitoring |
| Business strategies for a successful gen AI solution | ~15% | Implementing gen AI and measuring impact · Secure AI and Google’s Secure AI Framework (SAIF) · Responsible AI in business | Choosing the right solution; measuring impact; SAIF; IAM and Security Command Center; anonymisation vs pseudonymisation; AI Principles |

**Exam day**
- Book through CM Connect; the exam is delivered by Pearson VUE, online (OnVUE) or at a test centre.
- Reschedule or cancel at least 24 hours ahead.
- Expect the 2026 product names (Agent Platform, Agent Studio, Agent Search). The exam guide uses them, so learn the old-to-new map in section 5.1.
- Questions are scenario-based. Read for the deciding constraint: no code, enterprise controls, company data, public facts, cost, or risk to people.

**Top traps**
- Grounding vs fine-tuning → missing or changing facts need grounding/RAG; fine-tuning changes style and behaviour.
- Google AI Studio for a regulated enterprise rollout → Agent Studio on Agent Platform has the enterprise controls.
- Agent Search vs RAG Engine vs Vector Search → pre-built RAG vs your own pipeline vs similarity search at scale.
- Gemini Enterprise vs Gemini for Google Workspace → company-wide search, agents and connectors vs AI inside Workspace apps.
- Conversational Agents vs Agent Assist → automate the customer conversation vs help the human agent.
- Building a custom model for OCR, translation or speech → use the pre-built API.
- Gemma vs Gemini → Gemma when you must self-host or fine-tune open weights.
- Anonymised vs pseudonymised → only pseudonymised data can be re-identified with a key.
- Top-k as a guide term → the guide lists temperature, top-p, token count, safety settings and output length.
- Quoting the old AI Principles → the current version has three themes.
- Measuring success with no baseline → set the baseline and KPIs before the pilot.

**Fast plan:** 1–2 weeks. Lessons and cards for a week (offerings section first), then practice by section, then two timed practice tests.

---

## 7. Course: Gemini API Developer (GEM-DEV)

**Who:** developers comfortable with Python or JavaScript and REST APIs. This is this site's course, not a Google exam.

| Domain | Weight | Lessons | Must-know |
|---|---|---|---|
| Models & the Interactions API | 15% | The Gemini model lineup and how to choose · Calling Gemini: the Interactions API | 4 Argon / Flash / Flash-Lite, stable vs preview vs latest, deprecation routing; steps, `output_text`, `previous_interaction_id`, `store`, legacy `generateContent` |
| Prompting & multimodal input | 15% | Prompting Gemini well, and thinking levels · Multimodal input and the Files API | System instructions, question at the end, `thinking_level` per model, sampling params ignored, thinking billed; inline vs Files API limits, media resolution |
| Function calling & structured output | 20% | Function calling end to end · Structured output with JSON schemas · Tool design, limits and failure modes | `function_call` → `function_result` with `call_id`; `tool_choice` modes and `allowed_tools`; `response_format`; ignored schema keywords; 10–20 tools; complexity 400s |
| Grounding, RAG & long context | 15% | Grounding with Google Search, Maps and URL context · RAG with Gemini embeddings, and long context | Per-query Search billing on Gemini 3+, display rules; URL context limits; File Search; embedding models and incompatibility; multi-needle limits |
| Agents: ADK, Managed Agents & Agent Platform | 15% | Building agents with the Agent Development Kit (ADK) · Managed Agents and the Gemini Enterprise Agent Platform | `Agent`, workflow agents, sub-agents vs `AgentTool`, state prefixes, callbacks; Antigravity and Deep Research (preview), `background` + `store`; Agent Runtime |
| Cost, performance & production | 15% | Caching, Batch, service tiers and token economics · Production: rate limits, errors, streaming and background runs | Implicit vs explicit caching, Batch and Flex at 50%, per-project limits, which errors to retry, streaming events, background runs, long decode |
| Safety & responsible AI | 5% | Safety settings and responsible use · Responsible AI as an iterative practice | Categories incl. jailbreak, default off, HTTP 400 on block, injection through tools, the responsible AI cycle |

**Top traps (developer)**
- Using `gemini-2.5-pro` as "the Pro model" → it is deprecated and auto-routes from 1 December 2026; the flagship is 4 Argon.
- Tuning `temperature` on 3.6+ or 4 Argon → it is ignored; use `thinking_level`.
- Sending `thinking_level: "minimal"` to 3.8 Flash or 4 Argon → error.
- Sending both `thinking_budget` and `thinking_level` → 400 on 4 Argon; don't mix them anywhere.
- A tight `max_output_tokens` on a thinking model → empty or truncated output, and thinking is still billed.
- Sending `tools` or `system_instruction` once and relying on `previous_interaction_id` → they are per interaction; resend them.
- `background=True` with `store=False` → 400.
- Prefilling the model's turn to force a format on Gemini 3+ → 400; use structured output.
- Answering only one of several parallel calls → every `call_id` needs a `function_result`.
- Trusting `maxLength` or `uniqueItems` in a schema → ignored; validate in code.
- Expecting explicit caching or Batch in the Interactions API → `generateContent` only; and no explicit caching on 4 Argon.
- Assuming one Search-grounded prompt is one billed unit on Gemini 3+ → billing is per executed query.
- Showing Search-grounded answers without the Search Suggestions, or caching them → breaks the terms.
- Mixing `gemini-embedding-001` and `gemini-embedding-2` vectors in one index → incompatible spaces; re-embed.
- Custom function tools or structured output on Deep Research → not supported.
- Treating a Preview model or agent as stable → expect changes and short-notice deprecation.
- Retrying a 402 or a 400 unchanged → fix the cause; back off only on 429 and 5xx.
- Rotating API keys to dodge rate limits → limits are per project.

---

## 8. Capstone projects

### Project L1: Use-case brief (GAIL)
- Pick one business process. Write a one-page brief: the problem, the gen AI verb (create, summarise, discover, automate), the data it needs and its quality, the baseline and three KPIs.
- Choose the offering using the buy → configure → build → customise ladder, and justify it against one alternative.

### Project L2: Offerings map (GAIL)
- For ten realistic needs (contact centre, intranet search, OCR, a code-first agent, a regulated prototype going to production…), name the Google product and the deciding constraint. Use only the 2026 names.
- Check each against the exam guide section 2 topic list.

### Project L3: Grounding and risk review (GAIL)
- In Gemini Notebook, add three internal-style documents and compare its answers with an ungrounded chat. Note what grounding fixed and what it didn't.
- Write a short risk review for the use case from L1: SAIF-style risks, IAM and data controls, privacy (anonymise or pseudonymise), bias checks and where a human signs off.

### Project A: Support assistant (Interactions API + function calling)
- Tools: `get_order`, `issue_refund(amount)`, `escalate(summary)`. Validate arguments; enforce the refund limit in code.
- Handle parallel calls, a turn cap and structured errors. Resend tools and system instruction every turn.
- Try `tool_choice` `any` with `allowed_tools` for a step that must look up the order.
- A 25-case eval with code checks (right tool, right escalation, no policy breaches).

### Project B: Grounded researcher (Search + URL context)
- Answer current-events questions with `google_search`; render `url_citation` links and the Search Suggestions as the terms require.
- Add `url_context` for a fixed list of official pages. Log how many search queries each prompt triggered.

### Project C: Document extraction (Files API + structured output + Batch)
- Upload PDFs with the Files API; extract a Pydantic schema with nullable fields and an evidence quote.
- Validate values in code (totals, dates, lengths the schema can't enforce).
- Run the full set through the Batch API on `generateContent` and compare cost and turnaround with live calls.

### Project D: Multi-agent helpdesk (ADK)
- A coordinator with billing and technical sub-agents, each with one function tool. Use `output_key` and `user:` state.
- Add a `before_tool_callback` that blocks refunds above a limit. Run it locally with `adk run`.

### Project E: Managed research agent (preview)
- Run a Deep Research task with `background=True`, poll to completion and save the report. Then run the same brief through Antigravity with a network allowlist.
- No production credentials. Write down what the managed sandbox handled compared with Project D.

---

## 9. Study schedules

### GAIL in 10 days (about 1 hour/day)

| Day | Focus |
|---|---|
| 1 | Sections 5.1–5.2; fundamentals lessons on concepts and the ML lifecycle; flashcards |
| 2 | Data, landscape layers and business value lessons; drill Fundamentals |
| 3 | Why Google Cloud and pre-built offerings lessons; Project L2 (start) |
| 4 | Customer experience and Agent Platform lessons; finish Project L2 |
| 5 | Agents on Agent Platform lesson; drill Offerings, 20 questions |
| 6 | Limitations, prompting and grounding lessons; Project L3 (grounding part) |
| 7 | Implementing, SAIF and responsible AI lessons; Project L1 and the L3 risk review |
| 8 | **Practice test #1**; review every miss |
| 9 | Mistakes notebook to zero; weakest-section drill; section 5.1 renames table again |
| 10 | **Practice test #2**; Traps list; book the exam once you score 85% or more |

### GEM-DEV in 14 days (1–1.5 hours/day)

| Day | Focus |
|---|---|
| 1 | Sections 5.1 and 5.6–5.7; model lineup and Interactions API lessons |
| 2 | Prompting and thinking lesson; Multimodal and Files API lesson |
| 3 | Function calling lesson; start Project A |
| 4 | Finish Project A; Tool design lesson |
| 5 | Structured output lesson; start Project C |
| 6 | Grounding lesson; Project B |
| 7 | RAG and long context lesson; drill Grounding |
| 8 | ADK lesson; start Project D |
| 9 | Finish Project D; Managed Agents and Agent Platform lesson |
| 10 | Caching, Batch and tiers lesson; finish Project C with the Batch API |
| 11 | Production lesson; both safety lessons; **practice test #1**; review every miss |
| 12 | Project E; Mistakes notebook to zero |
| 13 | Smart practice, 40 questions; weakest domain drill |
| 14 | **Practice test #2**; Traps list; flashcards |

---

## 10. Cheat sheets

### GAIL product names

```
platform:   Vertex AI → Gemini Enterprise Agent Platform (Apr 22, 2026)
studio:     Vertex AI Studio → Agent Studio (enterprise) · Google AI Studio = free dev sandbox
search:     Vertex AI Search → Agent Search (pre-built RAG) · RAG Engine (your pipeline) · Vector Search
agents:     ADK (code) · Agent Garden (samples) · Agent Studio (low-code) · Gemini Enterprise (no-code) · Agent Engine → Agent Runtime
other:      AutoML → Agent Platform AutoML · Feature Store → Agent Platform Feature Store · Gen AI evals · Model Garden
apps:       Gemini app + Gems · Gemini Notebook (was NotebookLM) · Gemini Enterprise (was Agentspace) · Gemini for Workspace
cx:         Customer Engagement Suite = Conversational Agents · Agent Assist · Conversational Insights · Contact Center as a Service
models:     Gemini (multimodal) · Gemma (open, self-host) · Imagen (image) · Veo (video)
apis:       Speech-to-Text · Text-to-Speech · Translation · Document AI · Vision · Video Intelligence · Natural Language
```

### GAIL concepts

```
landscape:  Infrastructure · Models · Platforms · Agents · Applications
lifecycle:  ingestion → preparation → training → deployment → management
data:       completeness · consistency · relevance · availability · cost · format
limits:     data dependency · cutoff · bias · fairness · hallucinations · edge cases
fixes:      grounding · RAG · prompt engineering · fine-tuning · human in the loop
prompting:  zero / one / few-shot · role · chaining · chain-of-thought · ReAct
grounding:  first-party · third-party · world (Google Search)
sampling:   token count · temperature · top-p · safety settings · output length
security:   SAIF · secure-by-design infra · IAM · Security Command Center · workload monitoring
rai:        transparency · privacy (anonymise vs pseudonymise) · fairness · accountability · explainability
principles: bold innovation · responsible development and deployment · collaborative progress, together
```

### Interactions API

```
create:     client.interactions.create(model | agent, input, system_instruction, tools, generation_config,
            response_format, previous_interaction_id, store, background, stream)
output:     steps → user_input | thought | function_call | function_result | server-tool steps | model_output · output_text
state:      previous_interaction_id (resend tools, system_instruction, generation_config) | store=False → resend full history
store:      on by default · 55 days paid / 1 day free · background requires store=True
thinking:   generation_config.thinking_level · minimal errors on 3.8 Flash and 4 Argon · thinking billed as output
sampling:   temperature / top_p / top_k ignored on 3.6+, 3.5 Flash-Lite and 4 Argon
legacy:     generateContent supported · needed for Batch, explicit caching, Python automatic function calling
```

### Tools and output

```
function:   {"type":"function", name, description, parameters}
loop:       function_call(id, name, arguments) → run → function_result(call_id, name, result=[blocks]) → repeat
choice:     tool_choice auto | any | none | validated · {"allowed_tools": {"mode": "any", "tools": [...]}}
limits:     10–20 active tools · complex schemas → 400 INVALID_ARGUMENT
structured: response_format {type: text, mime_type: application/json, schema} · ignored: minLength, maxLength, uniqueItems… · validate
grounding:  google_search (per query on Gemini 3+, show Search Suggestions) · google_maps · url_context (20 URLs) · file_search
embedding:  gemini-embedding-2 (multimodal, no task_type) · gemini-embedding-001 (text, task_type) · not compatible
files:      inline 100 MB (PDF 50 MB) · Files API 2 GB/file, 20 GB/project, 48 h
```

### Agents and production

```
adk:        Agent(name, model, instruction, description, tools, sub_agents, output_key) · Sequential/Parallel/LoopAgent · AgentTool
state:      (none) session · user: · app: · temp: · {key} in instructions · callbacks before/after agent, model, tool
managed:    preview · agent="antigravity-preview-09-2026" | deep-research-*-04-2026 · background=True + store=True
deep res.:  no custom functions · no structured output · up to 60 min
caching:    implicit (default, not guaranteed) · explicit (generateContent only, not 4 Argon, TTL 1 h)
cost:       Batch 50% (generateContent, 24 h target, expires 48 h) · Flex 50% (preview) · lower thinking_level · pricing page
limits:     per project, not per key · RPD resets midnight Pacific
errors:     429/503 → backoff · quota_exceeded → wait · 402 → don't retry · 400 → fix request
safety:     harassment · hate · sexual · dangerous · jailbreak · default off (2.5+) · block = HTTP 400
```

---

## 11. Sources

- GAIL exam page: [cloud.google.com/learn/certification/generative-ai-leader](https://cloud.google.com/learn/certification/generative-ai-leader)
- GAIL exam guide: [services.google.com/fh/files/misc/generative_ai_leader_exam_guide_english.pdf](https://services.google.com/fh/files/misc/generative_ai_leader_exam_guide_english.pdf)
- GAIL study guide: [services.google.com/fh/files/misc/generative_ai_leader_study_guide_english.pdf](https://services.google.com/fh/files/misc/generative_ai_leader_study_guide_english.pdf)
- Delivery provider change (Pearson VUE): [support.google.com/cloud-certification/answer/16803278](https://support.google.com/cloud-certification/answer/16803278?hl=en)
- Certification renewal FAQ: [support.google.com/cloud-certification/answer/9907853](https://support.google.com/cloud-certification/answer/9907853)
- Generative AI Leader learning path: [cloudskillsboost.google/paths/1951](https://www.cloudskillsboost.google/paths/1951) (now Google Skills, [www.skills.google](https://www.skills.google))
- Agent Platform release notes and naming map: [docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes](https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes)
- Agent Platform Google models: [docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models)
- Gemini Enterprise docs: [docs.cloud.google.com/gemini/enterprise/docs](https://docs.cloud.google.com/gemini/enterprise/docs)
- Gemini Notebook rename: [blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook](https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/)
- Gemini for Google Workspace: [workspace.google.com/solutions/ai](https://workspace.google.com/solutions/ai/)
- Customer Engagement Suite: [cloud.google.com/solutions/customer-engagement-ai](https://cloud.google.com/solutions/customer-engagement-ai)
- SAIF: [saif.google](https://saif.google/)
- Google AI Principles: [ai.google/responsibility/principles](https://ai.google/responsibility/principles/)
- Gemini API docs: [aistudio.google.com/docs](https://aistudio.google.com/docs) (full text: [aistudio.google.com/llms-full.txt](https://aistudio.google.com/llms-full.txt))
- Models and deprecations: [aistudio.google.com/docs/models](https://aistudio.google.com/docs/models) and [aistudio.google.com/docs/deprecations](https://aistudio.google.com/docs/deprecations)
- Interactions API: [aistudio.google.com/docs/interactions-overview](https://aistudio.google.com/docs/interactions-overview) and [migration guide](https://aistudio.google.com/docs/migrate-to-interactions)
- Thinking: [aistudio.google.com/docs/thinking](https://aistudio.google.com/docs/thinking)
- Function calling: [aistudio.google.com/docs/function-calling](https://aistudio.google.com/docs/function-calling)
- Structured output: [aistudio.google.com/docs/structured-output](https://aistudio.google.com/docs/structured-output)
- Grounding with Google Search: [aistudio.google.com/docs/google-search](https://aistudio.google.com/docs/google-search)
- Caching: [aistudio.google.com/docs/caching](https://aistudio.google.com/docs/caching); Batch API: [aistudio.google.com/docs/batch-api](https://aistudio.google.com/docs/batch-api)
- Pricing: [aistudio.google.com/docs/pricing](https://aistudio.google.com/docs/pricing); rate limits: [aistudio.google.com/docs/rate-limits](https://aistudio.google.com/docs/rate-limits)
- Managed Agents: [aistudio.google.com/docs/agents](https://aistudio.google.com/docs/agents)
- Safety settings: [aistudio.google.com/docs/safety-settings](https://aistudio.google.com/docs/safety-settings)
- Agent Development Kit: [adk.dev](https://adk.dev/)

All facts were checked on 7 November 2026. Gemini model IDs, preview features and prices change often, and several introductory prices end within weeks of that date, so confirm them with Google before relying on them.

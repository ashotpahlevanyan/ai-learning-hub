# OpenAI GPT Runbook

A step-by-step path to use ChatGPT well at work and to build apps and agents on the OpenAI API. Use it alongside the two courses on this site: **AI Foundations with ChatGPT** (OAI-FND) and **OpenAI API & Agents Developer** (OAI-DEV). Each has lessons, flashcards, practice questions and a timed practice test.

> **Read this first.** OpenAI has **no public certification exam** as of November 2026. These are this site's own courses, and their practice tests are not official. Model names, tools and prices below come from OpenAI's developer docs at the time of writing and change often. Check the docs before relying on any specific ID or number.

---

## Table of contents

1. [Certification status](#1-certification-status)
2. [Which course to take](#2-which-course-to-take)
3. [The study method](#3-the-study-method)
4. [Free official resources](#4-free-official-resources)
5. [Core knowledge](#5-core-knowledge)
6. [Course 1: AI Foundations with ChatGPT (OAI-FND)](#6-course-1-ai-foundations-with-chatgpt-oai-fnd)
7. [Course 2: OpenAI API & Agents Developer (OAI-DEV)](#7-course-2-openai-api--agents-developer-oai-dev)
8. [Capstone projects](#8-capstone-projects)
9. [Study schedules](#9-study-schedules)
10. [Cheat sheets](#10-cheat-sheets)
11. [Sources](#11-sources)

---

## 1. Certification status

| Item | Status (November 2026) |
|---|---|
| Public proctored OpenAI certification exam | **None you can register for** |
| OpenAI Certification pilot | Invite-only, for some ChatGPT Enterprise and Edu workspaces (pilots reportedly include Arizona State University and the California State University system) |
| OpenAI Academy courses | **Free**, open to anyone: AI Foundations, Applied AI Foundations, Agents and Workflows. They award badges and completion certificates, which OpenAI says are not certifications |
| Stated goal | OpenAI has said it wants to certify 10 million Americans by 2030. No public launch date or price has been announced |
| OpenAI Partner Network | One report describes a partner programme to certify enterprise consultants. Unconfirmed; treat as a rumour until OpenAI publishes details |

**What this means for you:** learn the material now with the free Academy courses and this site. If OpenAI opens a public exam, this track will add an exam-prep path, and most of what you learn here will carry over.

---

## 2. Which course to take

| You are… | Take | Why |
|---|---|---|
| A business user (PM, analyst, marketer, ops, consultant) | **OAI-FND** | Prompting, checking output and safe use of ChatGPT at work. No code. |
| A developer | **OAI-FND → OAI-DEV** | Foundations is a fast warm-up (a day or two); the developer course is the main event. |
| A developer who already uses ChatGPT daily | **OAI-DEV** directly | Skim the Foundations traps list instead. |
| Already studying the Claude track | **OAI-DEV** | Most concepts (tool loops, structured output, agents, evals) transfer. Focus on the OpenAI-specific API shapes in section 5. |

---

## 3. The study method

The same loop as every track on this site:

1. **Read** this runbook section for the course.
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
| **OpenAI Academy** (`academy.openai.com`) | AI Foundations, Applied AI Foundations, Agents and Workflows courses |
| **OpenAI API docs** (`developers.openai.com/api/docs`) | Responses API, models, tools, structured outputs, conversation state, prompt caching, Batch, Realtime, evals, fine-tuning |
| **Agents guide** (`developers.openai.com/api/docs/guides/agents`) | Choosing between the Responses API, Agents SDK and Agents API |
| **Agents SDK** (`github.com/openai/openai-agents-python`, plus the JavaScript/TypeScript SDK) | Agents, tools, handoffs, guardrails, sessions, tracing, sandbox and voice agents |
| **OpenAI Cookbook** (`cookbook.openai.com`) | Runnable examples for every feature |
| **Model prompting guides** | One per model generation, including GPT-6. Re-read after every model upgrade |
| **ChatGPT Help Center** | Plans, Projects, memory, data controls and workspace admin settings |

---

## 5. Core knowledge

### 5.1 Models

- The API catalog lists a **GPT-6 family** (for example GPT-6 Astra, GPT-6 Sol, GPT-6.1 Sol, GPT-6.1 Terra, GPT-6 Luna), older **GPT-5.x** models (GPT-5.6 down to GPT-5, plus GPT-5.3-Codex) and **GPT-4.1**. The docs describe GPT-6 Astra and GPT-6.1 Sol as the choices for reasoning, coding and tool-heavy work. Exact IDs (such as `gpt-6-astra`) and tiers change: **check the Models and Compare models pages**.
- **Reasoning effort** trades quality on hard problems against latency and cost. Reasoning tokens are billed as output even though you don't see them all.
- **Voice:** the platform names **GPT-Live** for conversational voice, used through the **Realtime API** (speech-to-speech, transcription and translation sessions). Verify current voice model IDs.
- **How to choose:** the cheapest model and lowest reasoning effort that pass your evals. Keep model IDs in configuration.

### 5.2 The Responses API

```python
from openai import OpenAI
client = OpenAI()  # OPENAI_API_KEY from the environment

resp = client.responses.create(
    model="gpt-6-astra",
    instructions="You are a concise support assistant for Acme.",
    input="Where is my order 1234?",
)
print(resp.output_text)   # joined text of message items
print(resp.output)        # list of typed items
print(resp.usage)
```

- `instructions` = system-level rules; `input` = a string or a list of items.
- `output` is an **array of items** (messages, reasoning, function calls, hosted tool calls).
- `stream=True` sends events as text is generated; WebSocket mode exists for long interactive sessions.
- **Chat Completions** is still supported. The **Assistants API is retired**. Start new work on the Responses API.

### 5.3 Conversation state

| Option | How | Notes |
|---|---|---|
| Manual history | Resend all turns in `input`, appending the model's output items | Full control. With reasoning models, replay **all** output items, including reasoning items |
| `previous_response_id` | Chain a new turn to a stored response | You don't resend turns, but **all prior input tokens in the chain are billed** |
| Conversations API | `client.conversations.create()`, then pass `conversation=<id>` | Durable state across sessions, devices or jobs |
| `store` | Stored by default; `store=False` to disable | Stored responses are kept 30 days by default (per the docs); conversation items aren't subject to that limit |

### 5.4 Tools

**Function tools** (your code):

```python
tools = [{
    "type": "function",
    "name": "get_order",
    "description": "Look up an order by ID. Use for order status or delivery questions.",
    "parameters": {
        "type": "object",
        "properties": {"order_id": {"type": "string"}},
        "required": ["order_id"],
        "additionalProperties": False,
    },
    "strict": True,
}]
```

The loop: call the model → for each `function_call` item, run your function → send a `function_call_output` with the same `call_id` → call again → stop when there are no more function calls. Answer **every** parallel call. Return errors as structured data with a hint. Enforce business rules in code.

`tool_choice`: `auto` (default), `required`, a specific function, or `none`. `parallel_tool_calls=False` when order matters.

**Hosted tools** (OpenAI runs them): web search, file search (over vector stores), Code Interpreter, image generation, computer use, shell, apply patch, skills, tool search and **remote MCP** servers. Check each tool's guide for exact type names and pricing.

**Remote MCP:** connect only trusted servers, restrict allowed tools, use least-privilege credentials, and set approval requirements for anything that writes, sends or spends.

### 5.5 Structured Outputs

```python
from pydantic import BaseModel

class Ticket(BaseModel):
    category: str
    urgent: bool
    order_id: str | None

resp = client.responses.parse(model=MODEL, input=text, text_format=Ticket)
ticket = resp.output_parsed
```

- Strict schemas: all properties in `required` (use `null` for optional), `additionalProperties: false`, supported keyword subset.
- The schema guarantees **shape, not truth**. Validate values in code, keep evidence fields, review low-confidence records.
- Handle **refusals** separately.
- JSON mode only guarantees valid JSON; prefer Structured Outputs.

### 5.6 Agents: three paths

| Path | Runs where | You get | Choose when |
|---|---|---|---|
| **Responses API** | Your code | Model calls; you write the loop, state, tools | Single calls, or a fully custom loop |
| **Agents SDK** | Your application | Runner manages the loop and handoffs; guardrails, human in the loop, sessions, tracing, sandbox/realtime/voice agents; provider-agnostic | Custom tools and workflows with your own deployment, storage and approvals |
| **Agents API** | OpenAI's service | Managed Codex harness: sessions, automatic context compaction, multi-agent orchestration, programmatic tool calling, MCP, hosted or self-hosted sandboxes | You want OpenAI to manage long-running agents and their state |

Also: **ChatKit** for embedding a chat experience quickly.

```python
# pip install openai-agents   (Python 3.10+)
from agents import Agent, Runner, function_tool

@function_tool
def get_order(order_id: str) -> str:
    """Look up an order's status by ID."""
    return db.status(order_id)

support = Agent(name="Support", instructions="Help with orders. Be brief.", tools=[get_order])
result = Runner.run_sync(support, "Where is order A-1234?")
print(result.final_output)
```

- **Handoff** = transfer the conversation to another agent. **Agent as tool** = call a specialist and get its result back.
- **Guardrails** check input or output; an input guardrail with a cheap model can stop a run early.
- **Human in the loop** for irreversible or high-impact actions.
- **Tracing** first when debugging.
- **Do you need an agent?** Use the simplest design that works: a single call or fixed workflow beats an agent whenever the steps are known.

### 5.7 Evals

- Build an **eval set** (representative + edge cases with expected outcomes) before choosing a model.
- Graders: **code** (exact match, schema, tests — cheapest, most reliable) → **model graders** (rubric, calibrated against humans) → **human review** (gold standard, sample it).
- Run on every prompt, tool or model change, and on sampled production traffic. Change one variable at a time.

### 5.8 Cost, latency and reliability

- **Prompt caching** is automatic for long repeated prefixes: put stable instructions, tools and documents first, identical every time; variable data last. Use the cache diagnostics to explain misses.
- **Batch API** for offline work: cheaper (historically about half price; verify) and asynchronous (historically within 24 hours).
- **Background mode** for long-running responses.
- **Rate limits:** on 429/5xx retry with exponential backoff and jitter; never retry a 400 unchanged. Trim prompts, cap `max_output_tokens`, lower reasoning effort.
- **Fine-tuning:** for stable narrow behaviour once prompting has plateaued, often to make a smaller model match a larger one. Not for changing facts (use retrieval). Check which models and methods are currently available.

### 5.9 Safety and security

- **Prompt injection:** direct (from the user) and indirect (hidden in web pages, files, emails, MCP and tool results). Defend in layers: content is data, least privilege, approvals, output validation, monitoring.
- **Moderation endpoint** to screen input and output for harm categories.
- **Keys** server-side only; separate keys or projects per environment; restrict, rotate, cap usage.
- **Data:** `store=False` when responses must not persist; review data controls and retention; minimise personal data.
- **Action-taking tools** (computer use, shell, code): sandboxes, restricted network and files, turn and spend caps, human approval for irreversible steps.

---

## 6. Course 1: AI Foundations with ChatGPT (OAI-FND)

**Who:** anyone using ChatGPT for work. No coding. Aligned to the themes of OpenAI Academy's free courses.

**What it covers**
- **Prompting:** context, goal, audience, format, examples, and iterating on the draft.
- **Checking output:** hallucinations, fabricated citations, numbers and dates, bias; verify against sources.
- **Choosing features:** chat vs Projects, custom GPTs, search and deep research, file analysis, canvas, voice, agent mode (feature names change; check your plan).
- **Workspace knowledge:** Projects with files and instructions, memory and custom instructions, connectors to company apps.
- **Responsible use:** company data policy, no secrets or unapproved personal data, admin controls on business plans, disclosure, human accountability.
- **Workflows:** breaking tasks down, delegating vs doing it yourself, repeatable templates.

**Top traps**
- Trusting a confident answer without checking sources → verify claims, especially numbers, names and citations.
- Pasting confidential data into a personal account → use the company-approved workspace and follow data rules.
- Re-explaining the same context every chat → put it in a Project or custom instructions.
- One endless chat that drifts → start fresh with a short summary.
- "Make it better" → say what better means (audience, length, tone, criteria).

**Fast plan:** 3–5 days. Lessons and cards for 2–3 days, practice for 1–2 days, then the practice test.

---

## 7. Course 2: OpenAI API & Agents Developer (OAI-DEV)

**Who:** developers comfortable with Python or TypeScript and REST APIs.

| Domain | Weight | Must-know |
|---|---|---|
| Models & the Responses API | 20% | Model choice and reasoning effort, request/response shape, output items, streaming, conversation state options and billing |
| Tools & Function Calling | 20% | The call → output loop, `call_id`, parallel calls, `tool_choice`, structured errors, hosted tools, file search and vector stores, remote MCP safety |
| Agents: SDK & Agents API | 20% | Choosing a path, Agent/Runner, `@function_tool`, handoffs vs agents-as-tools, guardrails, approvals, sessions, tracing, sandboxes |
| Structured Outputs & Prompting | 15% | Strict schemas, nullable fields, `responses.parse`, refusals, validation, prompting reasoning models, caching-friendly prompts, versioning |
| Evals, Cost & Production | 15% | Eval sets and graders, caching, Batch, background mode, retries, fine-tuning vs retrieval |
| Safety & Security | 10% | Direct and indirect injection, moderation, key handling, data retention, sandboxing |

**Top traps (developer)**
- Treating `output[0]` as the answer → iterate over output items by type.
- Thinking `previous_response_id` makes long chats cheap → prior input is still billed.
- Answering only one of several parallel function calls → every `call_id` needs an output.
- Throwing on tool errors or returning empty strings → return structured errors with a hint.
- Enforcing refund limits in the prompt → enforce in code and add approvals.
- Treating schema-valid JSON as correct → validate values and business rules.
- Using the Batch API for live chat → Batch is for offline jobs.
- A timestamp at the top of the instructions → breaks prompt caching.
- Secret key in the browser → proxy through your backend.
- Building an agent for a fixed classification task → a single structured call.

---

## 8. Capstone projects

### Project A: Support assistant (Responses API + function tools)
- Tools: `get_order`, `issue_refund(amount)`, `escalate(summary)`. Strict schemas.
- Refund limit enforced in code; above it, require approval.
- Structured errors, parallel lookups, max-turn safety cap.
- Stable instructions first; check cached tokens in `usage`.
- 25-case eval with code graders (correct tool, correct escalation, no policy breaches).

### Project B: Research agent (hosted tools)
- Web search + file search over a vector store of your docs.
- Output a report with citations via Structured Outputs.
- Plant an injected instruction in one document; show which layer blocks it.

### Project C: Multi-agent triage (Agents SDK)
- Triage agent with handoffs to billing and technical agents; one function tool each.
- Input guardrail for off-topic requests; approval on refunds; sessions for history.
- Debug three failures using traces only.

### Project D: Bulk extraction (Structured Outputs + Batch)
- 500 documents → Pydantic schema with nullable fields and evidence quotes.
- Submit via the Batch API; validate totals in code; send failures to a review queue.
- Report field-level accuracy against 50 labelled documents.

### Project E: Managed coding agent (Agents API)
- Point a managed agent at a sample repo in a sandbox; ask it to fix a failing test and open a pull request.
- No production credentials; human review before merge. Write down what the managed harness handled for you versus Project C.

---

## 9. Study schedules

### OAI-FND in 4 days (about 1 hour/day)

| Day | Focus |
|---|---|
| 1 | Prompting and workflow lessons; flashcards |
| 2 | Output checking and responsible use lessons; drill those domains |
| 3 | Features, Projects and workspace knowledge; Smart practice, 20 questions |
| 4 | Practice test; review misses and the Traps list |

### OAI-DEV in 14 days (1–1.5 hours/day)

| Day | Focus |
|---|---|
| 1 | Sections 5.1–5.3; lessons on models, Responses API, conversation state |
| 2 | Lesson on function calling; start Project A |
| 3 | Finish Project A; drill Models & Responses API |
| 4 | Hosted tools and remote MCP lesson; drill Tools |
| 5 | Project B |
| 6 | Structured Outputs and prompting lessons; drill that domain |
| 7 | Project D (start) |
| 8 | Agent path, Agents SDK lessons; Project C (start) |
| 9 | Guardrails, sessions, tracing lesson; finish Project C |
| 10 | Evals, cost and production lessons; finish Project D |
| 11 | Safety lesson; **practice test #1**; review every miss |
| 12 | Project E; Mistakes notebook to zero |
| 13 | Smart practice, 40 questions; weakest domain drill |
| 14 | **Practice test #2**; Traps list; flashcards |

---

## 10. Cheat sheets

### Responses API

```
create:     client.responses.create(model, instructions, input, tools, tool_choice, reasoning, stream, store)
output:     list of items → message | reasoning | function_call | hosted tool calls; output_text = joined text
state:      manual history (replay ALL items) | previous_response_id (prior input still billed) | conversation=<id> | store=False
stream:     stream=True → events; WebSocket mode for long sessions
legacy:     Chat Completions supported · Assistants API retired
```

### Tools

```
function:   {"type":"function", name, description, parameters (JSON Schema), strict: true}
loop:       function_call(call_id, arguments) → run → {"type":"function_call_output", call_id, output} → repeat until none
choice:     tool_choice auto | required | {function} | none · parallel_tool_calls=False when order matters
hosted:     web search · file search (vector stores) · Code Interpreter · image generation · computer use · shell · apply patch · skills · tool search · remote MCP
mcp:        trusted servers · allowed tools only · least-privilege creds · approvals for writes
```

### Agents

```
paths:      Responses API (DIY) · Agents SDK (loop in your app) · Agents API (managed harness in OpenAI's service)
sdk:        pip install openai-agents · Agent(name, instructions, tools, handoffs, guardrails) · Runner.run_sync(agent, input).final_output · @function_tool
multi:      handoff = transfer control · agent-as-tool = return result to caller
safety:     input/output guardrails · human approval for irreversible actions · sessions · tracing · sandboxes
rule:       simplest design that works; agents only for open-ended tasks
```

### Production

```
structured: responses.parse(text_format=Model) · strict: all required, null for optional, additionalProperties false · validate values · handle refusals
cost:       stable prefix first (caching) · Batch for offline · background mode for long tasks · lower reasoning effort · cap output
errors:     429/5xx → backoff + jitter · 400 → fix the request
evals:      code graders > calibrated model graders > human (sample) · run on every change
fine-tune:  stable narrow behaviour, many examples, prompting plateaued · NOT for changing facts
security:   keys server-side · per-env keys, rotate, limit · store=False for sensitive data · injection = data, not commands
```

---

## 11. Sources

- OpenAI API documentation index (models, tools, APIs): [developers.openai.com/api/docs](https://developers.openai.com/api/docs)
- Agents guide (Responses API vs Agents SDK vs Agents API): [developers.openai.com/api/docs/guides/agents](https://developers.openai.com/api/docs/guides/agents)
- Conversation state guide: [developers.openai.com/api/docs/guides/conversation-state](https://developers.openai.com/api/docs/guides/conversation-state)
- Agents SDK for Python: [github.com/openai/openai-agents-python](https://github.com/openai/openai-agents-python)
- OpenAI certification status: [findskill.ai](https://findskill.ai/blog/openai-certification-guide/), [ctaio.dev](https://ctaio.dev/en/ai-certifications/openai-certification/), [howtoai.com](https://howtoai.com/openai-certification/), [gend.co](https://www.gend.co/blog/openai-certifications-ai-foundations-2026), [TechRepublic](https://www.techrepublic.com/article/news-openai-chatgpt-training-certifications/)
- Partner Network report (unconfirmed): [techjacksolutions.com](https://techjacksolutions.com/ai-brief/openai-reportedly-launches-partner-network-with-150m-investm/)

Certification facts come from third-party guides; model and API details from OpenAI's docs at the time of writing. Confirm both with OpenAI before relying on them.

# OpenAI GPT Runbook

A step-by-step path to use ChatGPT well at work and to build apps and agents on the OpenAI API. Use it alongside the two courses on this site: **AI Foundations with ChatGPT** (OAI-FND) and **OpenAI API & Agents Developer** (OAI-DEV). Each has lessons, flashcards, practice questions and a timed practice test.

> **Read this first.** OpenAI has **no public certification exam** as of November 2026. These are this site's own courses, and their practice tests (40 questions, 60 minutes, pass mark 720) are this site's format, not OpenAI's. Facts below were checked against OpenAI's help center and developer docs on 7 November 2026. ChatGPT features, model names and API products changed a lot during 2026, so check the official page before relying on any name, date or number.

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
| "OpenAI Certified" | An app inside ChatGPT, powered by Coursera. **Invite-only** and available **only to ChatGPT Enterprise and Edu workspaces**; an admin enables it. Credentials are issued through Credly. Some assessments are roleplay-based. No public exam date or price |
| Original pilot | Announced 9 December 2025 with employer and public-sector partners. OpenAI's stated goal is to certify 10 million Americans by 2030 |
| OpenAI Academy courses | **Free** and open to anyone with a ChatGPT account. The Foundations pathway is AI Foundations, then Applied AI Foundations, then Agents and Workflows. Each has an optional 10–20 question assessment with an 80% pass mark |
| Academy badges and pathway certificate | Awarded for passing. OpenAI's help center says they **are not OpenAI Certifications** |

**What this means for you:** learn the material now with the free Academy courses and this site. If OpenAI opens a public exam, this track will add an exam-prep path, and most of what you learn here will carry over.

---

## 2. Which course to take

| You are… | Take | Why |
|---|---|---|
| A business user (PM, analyst, marketer, ops, consultant) | **OAI-FND** | Prompting, checking output, choosing ChatGPT features and using them safely. No code. |
| A developer | **OAI-FND → OAI-DEV** | Foundations is a fast warm-up (a day or two); the developer course is the main event. |
| A developer who already uses ChatGPT daily | **OAI-DEV** directly | Skim section 5.1 and the Foundations traps list instead. |
| Already studying the Claude track | **OAI-DEV** | Tool loops, structured output, agents and evals transfer. Focus on the OpenAI-specific API shapes in sections 5.4–5.12. |

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
| **OpenAI Academy** (`academy.openai.com`) | AI Foundations, Applied AI Foundations, Agents and Workflows |
| **OpenAI prompting guide** (`learn.chatgpt.com/docs/prompting`) | The four prompt parts: Goal, Context, Output, Boundaries |
| **ChatGPT Help Center** (`help.openai.com`) | Plans, Projects, memory, data controls, plugins and apps, ChatGPT Work, release notes |
| **OpenAI usage policies** (`openai.com/policies/usage-policies`) | What you may and may not use ChatGPT and the API for |
| **OpenAI API docs** (`developers.openai.com/api/docs`) | Responses API, models, tools, Structured Outputs, conversation state, prompt caching, Batch, Realtime |
| **Deprecations page** (`developers.openai.com/api/docs/deprecations`) | What is shutting down and when. Check it before you build |
| **Agents guide** (`developers.openai.com/api/docs/guides/agents`) | Choosing between the Responses API, Agents SDK and Agents API |
| **Agents SDK** (`openai.github.io/openai-agents-python`) | Agents, tools, handoffs, guardrails, human in the loop, sessions, tracing |
| **OpenAI Cookbook** (`cookbook.openai.com`) | Runnable examples, including migration guides |

---

## 5. Core knowledge

### 5.1 What changed in 2026

Many older tutorials are now wrong. Learn the current names.

| Area | Old | Now (November 2026) |
|---|---|---|
| ChatGPT agent | ChatGPT agent / agent mode | **No longer available.** Replaced by **ChatGPT Work** (launched 9 July 2026) for longer, multi-step work |
| Canvas | Side-by-side editor | Not available on current models since May 2026. Writing and code blocks in chat replace it |
| Connectors | Connectors, then apps | Renamed **apps** (December 2025). Apps are now part of **plugins**; the App Directory became the **Plugin Directory** (July 2026) |
| Custom GPTs | Build a GPT | **Retiring 11 December 2026** (later for some workspaces) and migrating to plugins. Don't start new GPTs |
| Team plan | ChatGPT Team | Renamed **ChatGPT Business** |
| Usage policies | Version of 29 October 2025 | A new version takes effect **20 November 2026** |
| Assistants API | Assistants, Threads, Runs | **Sunset 26 August 2026** and no longer available |
| Prompt objects (`v1/prompts`) | Reusable prompts in the dashboard | Deprecated; shut down **30 November 2026**. Keep prompts in your code |
| Evals platform and graders | Hosted evals and graders | Read-only since 31 October 2026; shut down **30 November 2026**. Replacements: Promptfoo or Datasets |
| Agent Builder (AgentKit) | Visual agent builder | Deprecated; shuts down **30 November 2026**. ChatKit remains |
| Fine-tuning | Open to all | Closed to new users since May 2026; active customers can create jobs until 6 January 2027 |
| Agents API | Did not exist | **Public beta since 10 September 2026** |
| Chat Completions | Main API | **Still supported**, but Responses is recommended for new projects |

### 5.2 How LLMs behave

- A language model predicts likely text. It is not a database of facts, and a fluent answer is not evidence that it is correct.
- **Hallucinations** cluster in specifics: numbers, names, dates, quotes and citations, including references to sources that don't exist. OpenAI's help center says "Confidence isn't reliability".
- Built-in knowledge has a **cutoff**. Use search, deep research, connected apps or your own documents for anything recent.
- The same prompt can give different answers. Everything in a chat must fit in the context window. Treat output as a first draft.
- ChatGPT cannot reliably tell whether text was written by AI. Don't use it as a detector.

### 5.3 Prompting: Goal, Context, Output, Boundaries

OpenAI's current prompting guide names four parts:

| Part | Say | Example |
|---|---|---|
| **Goal** | The result you want | "Draft a one-page update for the leadership team" |
| **Context** | Information and sources that help | "Use the attached Q3 notes; they care about cost and timeline" |
| **Output** | Format, length, level of detail | "Five bullets and a two-line summary" |
| **Boundaries** | What must not change, or what needs your approval | "Don't change any figures" |

- A short prompt is often enough. Add parts as the task gets bigger or more important.
- Start with the result you want, not a list of steps. Focus on the one or two boundaries that matter most.
- Role and examples are useful optional extras. Don't describe a six-part framework as OpenAI's.
- Iterate rather than restart: ask for the specific change, add a missing source, correct the direction. For important work, ask for a final check, then review it yourself.
- For developers the same idea holds: a specific task, constraints, output format and a definition of "done" beat clever wording.

### 5.4 Models

- The API's current lineup is the **GPT-6 family**: GPT-6 Astra (`gpt-6-astra`, the flagship and the docs' suggested starting point for complex reasoning and coding), GPT-6.1 Sol (balance of intelligence and cost), GPT-6.1 Terra, and GPT-6 Luna (cost-sensitive, high-volume work). Older GPT-5.x models and GPT-4.1 are still listed. Prices and limits change: **check the Models and Pricing pages** rather than memorising them.
- **Reasoning effort** (`reasoning.effort`) values depend on the model and can include `none`, `minimal`, `low`, `medium`, `high`, `xhigh` and `max`. GPT-6 Astra rejects `none` with a 400. Several models default to `medium`.
- **Reasoning tokens** are hidden but billed as output and use context. See `usage.output_tokens_details.reasoning_tokens`.
- `max_output_tokens` covers reasoning plus visible text. Set it too low and you get `status: "incomplete"`, possibly with no visible text.
- **Voice:** the Models page lists GPT-Live and the `gpt-realtime` family. Voice apps use the **Realtime API**. Check the current voice model IDs.
- **How to choose:** the cheapest model and lowest effort that pass your evals. Pin dated snapshots in production and keep model IDs in configuration. Treat effort as a tuning knob, not the first fix for poor quality.

### 5.5 The Responses API

```python
from openai import OpenAI
client = OpenAI()  # reads OPENAI_API_KEY from the environment

resp = client.responses.create(
    model="gpt-6-astra",
    instructions="You are a concise support assistant for Acme.",
    input="Where is my order 1234?",
)
print(resp.output_text)   # SDK helper: joined text of message items
print(resp.output)        # list of typed items
print(resp.usage)
```

- `instructions` holds system-level rules and outranks `input`, but it applies **only to the current request**. Send it again on every call, including chained ones.
- In `input`, a `developer` message outranks a `user` message. Never put untrusted text in `instructions` or developer messages.
- `output` is an **array of typed items** (messages, reasoning, function calls, hosted tool calls). Never assume `output[0]` is the text.
- `stream=True` sends typed server-sent events: `response.created`, `response.output_text.delta`, `response.refusal.delta`, `response.completed`, `error`.
- **Chat Completions** is still supported. The **Assistants API** was sunset on 26 August 2026. Migration map: Assistants → prompts kept in your code, Threads → Conversations, Runs → Responses, Run steps → Items.

### 5.6 Conversation state

| Option | How | Notes |
|---|---|---|
| Manual history | Resend turns in `input`, appending the model's output items | Full control. With reasoning models, replay **all** output items, including reasoning items |
| `previous_response_id` | Chain a new turn to a stored response | You don't resend turns, but **all prior input tokens in the chain are billed**. Needs stored responses |
| Conversations API | `client.conversations.create()`, then pass `conversation=<id>` | Durable state across sessions, devices or jobs. Conversation items aren't subject to the 30-day TTL |
| `store` | Stored by default; `store=False` to disable | Response objects are kept 30 days by default. With `store=False`, manage history yourself |

**Long chats:** use compaction (`context_management` on `/responses`, or the stateless `/responses/compact` endpoint). Pass the encrypted compaction item back unchanged.

### 5.7 Tools

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

**The loop:**

```python
import json

items = [{"role": "user", "content": "Where is order A-1234?"}]
for _ in range(8):  # safety cap
    resp = client.responses.create(model=MODEL, instructions=INSTRUCTIONS,
                                   input=items, tools=tools)
    items += resp.output  # keep every output item, including reasoning
    calls = [i for i in resp.output if i.type == "function_call"]
    if not calls:
        break
    for call in calls:  # answer every call, not just the first
        result = run_tool(call.name, json.loads(call.arguments))  # returns errors as data
        items.append({"type": "function_call_output",
                      "call_id": call.call_id, "output": json.dumps(result)})
print(resp.output_text)
```

- `arguments` is a JSON string: parse and validate it. Return errors as structured data with a hint. Enforce business rules in code.
- `tool_choice`: `auto` (default), `required`, a specific function, `allowed_tools` (a subset, without changing the list) or `none`. `parallel_tool_calls=False` allows at most one call per turn.
- Keep the tools list stable so the cached prefix survives. The docs suggest fewer than 20 functions at the start of a turn; use **tool search** (GPT-5.4 and later) for large tool sets.

**Built-in tools:**

| Tool | Type | Remember |
|---|---|---|
| Web search | `web_search` | `web_search_preview` is legacy. Restrict sites with `filters.allowed_domains`. Show `url_citation` links prominently |
| File search | `file_search` | Needs a vector store. Results are `null` unless you include `file_search_call.results` |
| Code Interpreter | `code_interpreter` | Containers expire after about 20 idle minutes and can't be revived |
| Computer use | `computer` | `computer-use-preview` is legacy. Your harness runs the actions and returns a screenshot. Use an isolated VM or browser |
| Remote MCP | `mcp` | See below |

The docs also list image generation, shell, apply patch, skills and programmatic tool calling. Check each tool's guide for current type names, where it runs and its price.

**Remote MCP:** approval is required by default. The model emits `mcp_approval_request`; you reply with `mcp_approval_response`, and each approval covers one call. The `authorization` token is not stored, so send it on every request. Connect only trusted servers, restrict `allowed_tools`, and keep approvals on for anything that writes, sends or spends. `connector_id` is deprecated for models released after 1 September 2026.

### 5.8 Structured Outputs

```python
from pydantic import BaseModel

class Ticket(BaseModel):
    category: str
    urgent: bool
    order_id: str | None   # nullable, still required

resp = client.responses.parse(model=MODEL, input=text, text_format=Ticket)
ticket = resp.output_parsed   # check for a refusal and status first
```

- Raw form: `text: {format: {type: "json_schema", strict: true, schema: ...}}`.
- Strict rules: the root is an object; every property is in `required` (use a `null` union for optional ones); `additionalProperties: false` on every object. `allOf`, `not` and `if`/`then`/`else` are unsupported and error under strict mode.
- The schema guarantees **shape, not truth**. Validate values in code, keep evidence fields, review low-confidence records.
- **Refusals** arrive as a `refusal` content item, not as schema output. Also check `status: "incomplete"`.
- JSON mode (`json_object`) only guarantees valid JSON. Prefer Structured Outputs.

### 5.9 Prompts in code

- Store production prompts in your application code. Version them with git, pull-request review, release tags and feature flags, and run evals in CI.
- Prompt objects (`v1/prompts`) are deprecated and shut down on 30 November 2026. Don't create new ones.
- Put stable instructions first and variable data last (this also helps caching). Re-run your evals after every model upgrade.

### 5.10 Agents: three paths

| Path | Runs where | You get | Choose when |
|---|---|---|---|
| **Responses API** | Your code | Model calls; you write the loop, state and tools | Single calls, or a fully custom loop |
| **Agents SDK** | Your application | A Runner that manages the loop and handoffs; guardrails, human in the loop, sessions, tracing | Custom tools with your own deployment, storage and approvals |
| **Agents API** (public beta) | OpenAI's service | A managed Codex harness with stored sessions, automatic compaction, parallel subagents, MCP and tools; hosted, self-hosted or partner sandboxes | You want OpenAI to manage long-running agents and their state |

**ChatKit** embeds a chat UI. **Agent Builder** is deprecated; don't start new work in it. The Agents API is in beta, so check its docs for current parameter names.

```python
# pip install openai-agents
from agents import Agent, Runner, function_tool

@function_tool
def get_order(order_id: str) -> str:
    """Look up an order's status by ID."""
    return db.status(order_id)

support = Agent(name="Support", instructions="Help with orders. Be brief.", tools=[get_order])
result = Runner.run_sync(support, "Where is order A-1234?")
print(result.final_output)
```

- **Runner:** `max_turns` defaults to 10 and raises `MaxTurnsExceeded`. Carry state with **one** of `to_input_list()`, a session, `conversation_id` or `previous_response_id`.
- **Handoff** transfers the conversation (the model sees a `transfer_to_<agent_name>` tool). **`agent.as_tool()`** calls a specialist and returns its result to the caller.
- **Hosted tools** (`WebSearchTool`, `FileSearchTool`, `HostedMCPTool` and others) need `OpenAIResponsesModel`.
- **Guardrails:** input guardrails run on the first agent only and **in parallel by default** (`run_in_parallel=False` to block). Output guardrails run on the last agent. Tool guardrails wrap function tools.
- **Human in the loop:** mark a tool `needs_approval=True`; the run pauses with `result.interruptions`; approve or reject through `result.to_state()`, then `Runner.run(agent, state)`. `RunState` snapshots are not authenticated, and approval is not exactly-once, so use idempotency keys.
- **Tracing** is on by default, includes sensitive data by default, and is unavailable for ZDR organisations. Read the trace before changing the prompt.
- **Do you need an agent?** A single call or fixed workflow beats an agent whenever the steps are known.

### 5.11 Evals, cost and production

**Evals are a practice, not a product.** Build an eval set (representative and edge cases with expected outcomes) before choosing a model, and run it on every prompt, tool or model change. Keep datasets and graders in your own repository. OpenAI's hosted Evals platform and graders shut down on 30 November 2026; OpenAI points to Promptfoo or Datasets.

| Grader type | Use when |
|---|---|
| Code checks (exact match, schema, a scoring function) | The answer can be checked. Cheapest and most reliable |
| Similarity metrics | There is a reference answer but wording can vary |
| Model grader (LLM as judge) | Open-ended quality. Calibrate against human labels |
| Human review | Nuanced tasks. Expensive, so sample |

- **Prompt caching** is automatic. Put stable instructions, tools and documents first, identical every time; variable data last. Check `usage.input_tokens_details.cached_tokens`. On GPT-5.6 and later, cache writes cost more than normal input and you can choose a longer TTL; check the caching guide for current multipliers.
- **Batch API:** 50% discount, 24-hour window, separate rate-limit pool. Results may come back in a different order, so join on `custom_id`.
- **Flex** (`service_tier: "flex"`, beta): Batch rates for slower synchronous requests. **Background mode** (`background: true`, then poll) for long tasks.
- **Rate limits:** on 429 or 5xx retry with exponential backoff and jitter, treating `Retry-After` as a minimum. The SDKs already retry 429 and 503; don't stack your own loop on top. Never retry a 400 or a quota error unchanged.
- **Fine-tuning** is closed to new users. Prefer prompting, examples, retrieval and model choice. Never fine-tune to add changing facts.

### 5.12 Safety and security

- **Prompt injection:** direct (from the user) and indirect (in web pages, files, emails, MCP and tool results). Defend in layers: untrusted data in user messages only, structured outputs between steps, least privilege, approvals, guardrails (not foolproof), monitoring.
- **Moderation:** `omni-moderation-latest` is free and screens text and images.
- **Keys** stay server-side; use separate keys or projects per environment; restrict, rotate and cap usage. Send a **hashed** per-user safety identifier.
- **Data:** responses are stored 30 days by default; use `store=False` when they must not persist. Minimise personal data.
- **Action-taking tools** (computer use, shell, code): isolated sandboxes, allow-lists, turn and spend caps, human approval for irreversible steps.

---

## 6. Course 1: AI Foundations with ChatGPT (OAI-FND)

**Who:** anyone using ChatGPT for work. No coding. Follows the topics of OpenAI Academy's free Foundations courses.

| Domain | Weight | Lessons | Must-know |
|---|---|---|---|
| How LLMs work and their limits | 15% | What an LLM actually does · Hallucinations and other failure modes | Prediction not lookup, cutoff, context window, varying answers, not an AI-text detector |
| Prompting for work | 22% | Anatomy of a good work prompt · Examples, iteration and breaking work down · Prompt patterns for everyday tasks | Goal, Context, Output, Boundaries; iterate; decompose; refine before you schedule |
| Checking and improving output | 20% | Verifying facts, numbers and sources · Critiquing and improving drafts · Building review into your workflow | Open the citations, recompute numbers, review against criteria, know when to stop |
| ChatGPT features and workflows | 18% | Choosing the right ChatGPT tool and reasoning level · Projects, memory, plugins and apps | Chat vs Work, search vs deep research, data analysis, projects, memory, temporary chat, plugins |
| Agents and automation basics | 10% | Agents: delegating multi-step work · From prompts to repeatable workflows | What to delegate, briefing, human checkpoints, Scheduled Tasks |
| Safe and responsible use | 15% | Data, privacy and workspace controls · Bias, fairness, IP and responsible habits | Approved workspace, data controls, usage policies, accountability |

**Feature map** (names and plan availability change; check the help center):

| Need | Use |
|---|---|
| Quick question, edit or brainstorm | **Chat** |
| Longer multi-step work ending in a deliverable (report, spreadsheet, deck) | **ChatGPT Work** |
| Current facts | **Search** |
| A cited, multi-source report | **Deep research** (edit the plan first; you can limit it to specific sites) |
| Calculations and charts from a file | **Data analysis** |
| Ongoing work with shared files and instructions | **Projects** (project instructions override custom instructions; project-only memory keeps context separate) |
| Connect to company tools | **Apps**, packaged in **plugins**. Pick the most restrictive permission that works |
| A chat that leaves no history or memories | **Temporary chat** (still not an approved home for company data) |
| A recurring job | **Scheduled Tasks** in Work: once, on a schedule, on an event or to monitor for changes |
| Simple vs hard reasoning | A fast option for simple tasks, a higher reasoning level for complex or high-stakes analysis |

**Data rules:** on Business, Enterprise and Edu, OpenAI does not train on your data by default and admins control apps, SSO and retention. On personal plans training is on by default; turn off "Improve the model for everyone" in Data Controls. Either way, your company's policy decides where work data may go.

**Usage policies:** don't automate high-stakes decisions about people without human review, don't give licensed advice without a licensed professional involved, don't imply the AI holds credentials, and never circumvent safeguards. Read the version that takes effect on 20 November 2026.

**Top traps**
- Trusting a confident answer → verify numbers, names, quotes and citations; open the links.
- Asking "Are you sure?" and accepting "Yes" → check against a primary source.
- Totalling numbers in plain chat → use data analysis, then spot-check.
- Pasting confidential data into a personal account → use the company-approved workspace.
- "Make it better" → say what better means; state boundaries ("don't change any figures").
- Looking for agent mode or canvas → both are retired; use ChatGPT Work and chat writing blocks.
- Building a new custom GPT → GPTs are retiring; use a shared project or a plugin.
- Deleting a chat and assuming the memory is gone → delete the saved memory itself.
- Setting an app to "allow all actions" → choose the most restrictive permission that works.
- Scheduling a prompt you have never run by hand → refine it in normal chat first.
- Letting an agent send or buy without review → approval before consequential actions; you stay accountable.

**Fast plan:** 3–5 days. Lessons and cards for 2–3 days, practice for 1–2 days, then the practice test.

---

## 7. Course 2: OpenAI API & Agents Developer (OAI-DEV)

**Who:** developers comfortable with Python or TypeScript and REST APIs.

| Domain | Weight | Lessons | Must-know |
|---|---|---|---|
| Models & the Responses API | 20% | Choosing a GPT model and reasoning effort · The Responses API: requests, output items and streaming · Conversation state | GPT-6 lineup, per-model effort values, reasoning tokens, `max_output_tokens`, output items, streaming events, state options and billing, compaction |
| Tools & Function Calling | 20% | Function calling end to end · Built-in tools and remote MCP servers · Built-in tools in depth | `call_id`, parallel calls, `tool_choice` and `allowed_tools`, structured errors, web and file search, Code Interpreter, `computer` tool, MCP approvals |
| Structured Outputs & Prompting | 15% | Structured Outputs · Prompting GPT reasoning models | Strict schema rules, nullable fields, refusals, validation, prompts versioned in code, untrusted data placement |
| Agents: SDK & Agents API | 20% | Choosing an agent path · Agents SDK essentials · Guardrails, sessions, tracing and human approval | Three paths, Runner and `max_turns`, handoffs vs agents-as-tools, guardrail scope, approvals, sessions, tracing |
| Evals, Cost & Production | 15% | Cost and latency: caching, Batch and background mode · Evals and fine-tuning | Caching-friendly prompts, Batch, Flex, background mode, retries, evals as a practice, fine-tuning wind-down |
| Safety & Security | 10% | Safety and security for OpenAI apps · Agent risks: approvals, least privilege, sandboxing | Injection, moderation, keys, retention, sandboxing, idempotency |

**Top traps (developer)**
- Treating `output[0]` as the answer → iterate over items or use `output_text`.
- Sending `instructions` once and relying on `previous_response_id` → send them on every call.
- Thinking `previous_response_id` makes long chats cheap → prior input is still billed; use compaction.
- Sending `effort: "none"` to every model → supported values differ; Astra rejects it.
- A tight `max_output_tokens` on a reasoning model → it includes reasoning; check `status`.
- Answering only one of several parallel calls → every `call_id` needs an output.
- Removing tools on some turns → breaks caching; use `allowed_tools` or `tool_choice`.
- Asking the prompt to "only use these sites" → set `filters.allowed_domains`.
- Treating schema-valid JSON as correct → validate values and business rules.
- Putting retrieved documents in the developer message → untrusted data goes in user messages.
- Starting on the Assistants API, prompt objects, Agent Builder or the hosted Evals API → all are sunset or shutting down.
- Expecting an input guardrail on a handoff target to run → input guardrails run on the first agent only.
- Loading `RunState` JSON sent by the client → snapshots are not authenticated; keep them server-side.
- Using Batch for live chat, or reading batch output by line number → offline only; join on `custom_id`.
- Fine-tuning to teach this week's prices → use retrieval or tools; fine-tuning is closed to new users anyway.
- Secret key in the browser → proxy through your backend.
- Building an agent for a fixed classification task → one structured call.

---

## 8. Capstone projects

### Project F1: Work prompt kit (Foundations)
- Pick three recurring tasks (a summary, a status update, meeting prep). Write each prompt with Goal, Context, Output and Boundaries.
- Run each twice, iterate with targeted edits, and record what changed.
- Put the shared background in a Project with instructions and files, and check that it no longer needs repeating.

### Project F2: Reviewed workflow (Foundations)
- Write a workflow plan for one weekly deliverable: inputs, model or reasoning level, tools, checkpoints and human review.
- Produce the deliverable with ChatGPT Work or deep research. Open every citation you rely on and recompute every key number.
- Only then set it up as a Scheduled Task, with a human check before anything is sent.

### Project A: Support assistant (Responses API + function tools)
- Tools: `get_order`, `issue_refund(amount)`, `escalate(summary)`. Strict schemas.
- Refund limit enforced in code; above it, require approval.
- Structured errors, parallel lookups, a turn cap.
- Stable instructions and tools first; check `cached_tokens` in `usage`.
- A 25-case eval in your own test harness or Promptfoo, with code graders (correct tool, correct escalation, no policy breaches).

### Project B: Research agent (built-in tools)
- `web_search` limited with `filters.allowed_domains`, plus `file_search` over a vector store of your docs.
- Output a report with citations via Structured Outputs; show citations as clickable links.
- Plant an injected instruction in one document; show which layer blocks it.

### Project C: Multi-agent triage (Agents SDK)
- Triage agent with handoffs to billing and technical agents; one function tool each.
- Input guardrail on the triage agent for off-topic requests (decide whether it should block); `needs_approval` on refunds with an idempotency key; a session for history.
- Debug three failures using traces only.

### Project D: Bulk extraction (Structured Outputs + Batch)
- 500 documents → a Pydantic schema with nullable fields and evidence quotes.
- Submit through the Batch API; join results on `custom_id`; validate totals in code; send failures to a review queue.
- Report field-level accuracy against 50 labelled documents.

### Project E: Managed coding agent (Agents API, beta)
- Start an Agents API session against a sample repo in a sandbox; ask it to fix a failing test. Follow the current docs for parameter names, since the API is in beta.
- No production credentials; human review before merge. Write down what the managed harness handled for you compared with Project C.

---

## 9. Study schedules

### OAI-FND in 4 days (about 1 hour/day)

| Day | Focus |
|---|---|
| 1 | Sections 5.1–5.3; LLM limits and prompting lessons; flashcards; start Project F1 |
| 2 | Checking and improving output lessons; finish Project F1; drill those domains |
| 3 | Features, Projects, memory, plugins, agents and workflow lessons; Project F2; Smart practice, 20 questions |
| 4 | Data and responsible use lessons; practice test; review misses and the Traps list |

### OAI-DEV in 14 days (1–1.5 hours/day)

| Day | Focus |
|---|---|
| 1 | Sections 5.1 and 5.4–5.6; lessons on models, the Responses API and conversation state |
| 2 | Function calling lesson; start Project A |
| 3 | Finish Project A; drill Models & the Responses API |
| 4 | Built-in tools and remote MCP lessons; drill Tools |
| 5 | Project B |
| 6 | Structured Outputs and prompting lessons; drill that domain |
| 7 | Project D (start) |
| 8 | Choosing an agent path and Agents SDK lessons; Project C (start) |
| 9 | Guardrails, sessions, tracing and approvals lesson; finish Project C |
| 10 | Cost, latency, evals and fine-tuning lessons; finish Project D |
| 11 | Both safety lessons; **practice test #1**; review every miss |
| 12 | Project E; Mistakes notebook to zero |
| 13 | Smart practice, 40 questions; weakest domain drill |
| 14 | **Practice test #2**; Traps list; flashcards |

---

## 10. Cheat sheets

### ChatGPT at work

```
prompt:     Goal · Context · Output · Boundaries (role and examples optional) · short is often enough
iterate:    targeted edits · outline → draft → polish · final check, then YOUR review
verify:     open citations · recompute numbers · primary sources · not an AI-text detector
tools:      Chat (quick) · Work (multi-step deliverables) · search · deep research · data analysis · images · voice
context:    custom instructions (all chats) · Projects (override inside project, project-only memory) · memory · temporary chat
connect:    apps inside plugins · Plugin Directory · most restrictive permission that works
retired:    canvas (current models) · ChatGPT agent → Work · custom GPTs → plugins (Dec 11, 2026) · Team → Business
safety:     approved workspace · Data Controls on personal plans · no secrets · humans decide about people · you are accountable
```

### Responses API

```
create:     client.responses.create(model, instructions, input, tools, tool_choice, reasoning, max_output_tokens, stream, store)
output:     list of items → message | reasoning | function_call | tool calls · output_text = joined text
state:      manual history (replay ALL items) | previous_response_id (prior input billed) | conversation=<id> | store=False
long chats: compaction (context_management or /responses/compact) · pass the compaction item back unchanged
stream:     response.created · response.output_text.delta · response.refusal.delta · response.completed · error
legacy:     Chat Completions supported · Assistants sunset 2026-08-26 (Threads→Conversations, Runs→Responses)
```

### Tools

```
function:   {"type":"function", name, description, parameters (JSON Schema), strict: true}
loop:       function_call(call_id, arguments JSON string) → run → {"type":"function_call_output", call_id, output} → repeat
choice:     auto | required | {function} | allowed_tools | none · parallel_tool_calls=False → at most one call
built-in:   web_search (filters.allowed_domains) · file_search (vector stores; include results) · code_interpreter · computer · mcp
mcp:        approval on by default · one approval per call · send authorization every request · trusted servers, allowed_tools
```

### Agents

```
paths:      Responses API (DIY) · Agents SDK (loop in your app) · Agents API (managed harness, beta) · ChatKit (UI)
deprecated: Agent Builder (shuts down 2026-11-30)
sdk:        pip install openai-agents · Agent(name, instructions, tools, handoffs, guardrails, output_type) · Runner.run / run_sync / run_streamed
loop:       max_turns=10 → MaxTurnsExceeded · one state mechanism only
multi:      handoff = transfer control (transfer_to_<name>) · agent.as_tool() = result returns to caller
guardrails: input = first agent, parallel by default · output = last agent · tool = function tools only
approval:   needs_approval → interruptions → to_state() → approve/reject → Runner.run(agent, state) · idempotency keys
tracing:    on by default · sensitive data included by default · unavailable under ZDR
```

### Production

```
structured: responses.parse(text_format=Model) · all required, null for optional, additionalProperties false · handle refusals · validate
prompts:    in code, versioned (git, PR review, tags, flags) · prompt objects shut down 2026-11-30
cost:       stable prefix first · Batch (50% off, 24h, custom_id) · Flex · background mode · lower effort · tight max_output_tokens
errors:     429/5xx → backoff + jitter, Retry-After minimum, don't stack on SDK retries · 400/quota → fix the cause
evals:      practice, not product · code > calibrated model graders > human (sample) · hosted Evals shut down 2026-11-30 → Promptfoo / Datasets
fine-tune:  closed to new users · never for changing facts
security:   keys server-side · untrusted data in user messages · hashed safety identifier · store=False for sensitive data · moderation is free
```

---

## 11. Sources

- OpenAI Certified app: [help.openai.com/en/articles/20001151-openai-certified-app](https://help.openai.com/en/articles/20001151-openai-certified-app)
- Certification announcement: [openai.com/index/openai-certificate-courses](https://openai.com/index/openai-certificate-courses)
- Academy courses: [openai.com/index/academy-courses-applying-ai-at-work](https://openai.com/index/academy-courses-applying-ai-at-work) and [help.openai.com/en/articles/20001270-openai-academy-courses](https://help.openai.com/en/articles/20001270-openai-academy-courses)
- Prompting guide: [learn.chatgpt.com/docs/prompting](https://learn.chatgpt.com/docs/prompting)
- ChatGPT Work and Codex: [help.openai.com/en/articles/20001275-chatgpt-work-and-codex](https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex)
- Connected apps and plugins: [help.openai.com/en/articles/11487775](https://help.openai.com/en/articles/11487775)
- Custom GPT retirement: [help.openai.com/en/articles/20001519](https://help.openai.com/en/articles/20001519)
- ChatGPT release notes: [help.openai.com/en/articles/6825453-chatgpt-release-notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes)
- Enterprise privacy: [openai.com/enterprise-privacy](https://openai.com/enterprise-privacy/)
- Usage policies: [openai.com/policies/usage-policies](https://openai.com/policies/usage-policies/)
- OpenAI API documentation: [developers.openai.com/api/docs](https://developers.openai.com/api/docs)
- Deprecations: [developers.openai.com/api/docs/deprecations](https://developers.openai.com/api/docs/deprecations)
- Migrating to Responses: [developers.openai.com/api/docs/guides/migrate-to-responses](https://developers.openai.com/api/docs/guides/migrate-to-responses)
- Agents guide: [developers.openai.com/api/docs/guides/agents](https://developers.openai.com/api/docs/guides/agents)
- Agents API announcement: [openai.com/index/introducing-the-agents-api](https://openai.com/index/introducing-the-agents-api/)
- Agents SDK for Python: [openai.github.io/openai-agents-python](https://openai.github.io/openai-agents-python/)

All facts were checked on 7 November 2026. Several items (Agent Builder, prompt objects, the Evals platform, custom GPTs, fine-tuning) have shutdown dates close to that, so confirm their status with OpenAI before relying on them.

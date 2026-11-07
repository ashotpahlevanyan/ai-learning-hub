# Claude Certification Runbook

A complete, step-by-step path to pass **all four** Anthropic Claude certifications, with extra depth on the **Architect** exams. Use it alongside each exam's study pages on this site: lessons, flashcards, practice questions and timed mock exams.

> **Read this first.** Exam facts below come from third-party prep sites that quote Anthropic's v1.0 exam guides (effective July 2026). Anthropic's official candidate guides sit inside **Anthropic Partner Academy**. Before you book, check the price, item count and domain weights there. The practice items on this site are original. They are **not** real exam questions.

---

## Table of contents

1. [How to use this runbook](#1-how-to-use-this-runbook)
2. [The four exams at a glance](#2-the-four-exams-at-a-glance)
3. [Eligibility, booking, retakes, renewal](#3-eligibility-booking-retakes-renewal)
4. [Which order to take them](#4-which-order-to-take-them)
5. [The study method](#5-the-study-method)
6. [Free official resources (your reading list)](#6-free-official-resources)
7. [Core knowledge shared by every exam](#7-core-knowledge-shared-by-every-exam)
8. [Exam 1: Associate – Foundations (CCAO-F)](#8-associate--foundations-ccao-f)
9. [Exam 2: Developer – Foundations (CCDV-F)](#9-developer--foundations-ccdv-f)
10. [Exam 3: Architect – Foundations (CCAR-F)](#10-architect--foundations-ccar-f)
11. [Exam 4: Architect – Professional (CCAR-P)](#11-architect--professional-ccar-p)
12. [Hands-on capstone projects](#12-hands-on-capstone-projects)
13. [Study schedules](#13-study-schedules)
14. [Exam-day playbook](#14-exam-day-playbook)
15. [Final-week checklist and one-page cheat sheets](#15-final-week-checklist-and-cheat-sheets)

---

## 1. How to use this runbook

Each exam follows the same loop:

1. **Read** the exam section here (section 8–11) to see what is tested and why.
2. **Learn** the lessons for that exam on this site, heaviest domain first.
3. **Recall:** do the flashcards every day. Spaced repetition does the scheduling for you.
4. **Apply:** build the matching capstone project (section 12). Architect questions reward people who have actually built things.
5. **Test:** practise by domain until each one is above 80%, then take full timed mocks.
6. **Fix:** clear the Mistakes notebook and read the Traps list before every mock.
7. **Book** the real exam once you score **85%+ on two mocks in a row**.

Your progress is saved in your browser. Use **My progress → Export backup** to keep a copy or move it to another device.

---

## 2. The four exams at a glance

| | **Associate – Foundations** | **Developer – Foundations** | **Architect – Foundations** | **Architect – Professional** |
|---|---|---|---|---|
| Code | CCAO-F | CCDV-F | CCAR-F | CCAR-P |
| For | Business users of Claude | Developers building on the API | Engineers designing Claude systems | Senior architects / tech leads |
| Items | 60 | 53 | 60 | 63 |
| Time | 120 min | 120 min | 120 min | 120 min |
| Pass | 720 / 1000 | 720 / 1000 | 720 / 1000 | 720 / 1000 |
| Fee (reported) | $99 | $125 | $125 (was $99 at launch) | $175 |
| Question types | MC + multiple-response | MC + multiple-response | Scenario-based MC | MC + multiple-response |
| Domains | 7 | 8 | 5 | 7 |
| Valid for | 12 months | 12 months | 12 months | 12 months |

**Multiple-response items** say how many to pick ("Select two"). They are scored as one unit, so one wrong pick means no credit for that item.

### Domain weights

**CCAO-F – Associate**

| Domain | Weight |
|---|---|
| Output Evaluation & Validation | 21% |
| Workflow Integration & Solution Design | 16% |
| Governance, Risk & Responsible Use | 15% |
| Prompting & Task Execution | 14% |
| Product & Model Selection | 12% |
| Configuration & Knowledge Management | 12% |
| Troubleshooting & Optimization | 10% |

**CCDV-F – Developer**

| Domain | Weight | Sub-skills |
|---|---|---|
| Applications & Integration | 33.1% | Requirements, Systems life cycle, **Claude API mechanics**, Software engineering foundations, **Claude application design**, Configuration management |
| Model Selection & Optimization | 16.8% | LLM fundamentals, Technical fundamentals, Model trade-offs, Cost & token management |
| Agents & Workflows | 14.7% | Agent architecture, Agent construction, Agent patterns & frameworks |
| Prompt & Context Engineering | 11.0% | Context engineering, Prompt engineering, Output handling |
| Tools & MCPs | 10.6% | Tool implementation, MCP server development, Agentic customisation |
| Security & Safety | 8.1% | AI app security, Guardrails, Claude hooks, Identity/secrets/keys |
| Claude Code | 3.1% | Claude Code operation |
| Eval, Testing & Debugging | 2.6% | Debugging & error handling |

**CCAR-F – Architect Foundations**

| Domain | Weight | ≈ items |
|---|---|---|
| Agentic Architecture & Orchestration | 27% | 16 |
| Claude Code Configuration & Workflows | 20% | 12 |
| Prompt Engineering & Structured Output | 20% | 12 |
| Tool Design & MCP Integration | 18% | 11 |
| Context Management & Reliability | 15% | 9 |

**CCAR-P – Architect Professional**

| Domain | Weight | ≈ items |
|---|---|---|
| Integration | 19% | 12 |
| Solution Design & Architecture | 17% | 11 |
| Evaluation, Testing & Optimization | 16% | 10 |
| Governance, Safety & Risk Management | 14% | 9 |
| Stakeholder Communication & Lifecycle | 14% | 9 |
| Claude Models, Prompting & Context Engineering | 13% | 8 |
| Developer Productivity & Operational Enablement | 7% | 4 |

---

## 3. Eligibility, booking, retakes, renewal

- **Who can sit the exams:** right now, only people at organisations in the **Claude Partner Network**. You sign in to **Anthropic Partner Academy** with your **work email**. A personal email will not work. If you aren't sure whether your employer is a partner, ask your partnerships or alliances team.
- **Partner perks:** partners may get Academy access, discounted first attempts, and for some exams free vouchers for early employees. Ask your partner manager before you pay.
- **Delivery:** Pearson VUE, online proctored or at a test centre. Results show pass/fail, your scaled score, and percent-correct by domain. Badges are issued via Credly.
- **Retakes:** after a fail you wait 14 days, then 30, then 90. The cap is 4 attempts in a rolling 12 months. Each retake costs the full fee.
- **Renewal:** credentials last 12 months. On-time renewal is a free, unproctored assessment in Partner Academy. If you let it lapse, you retake the full exam at full price. **Put the renewal date in your calendar the day you pass.**
- **Prerequisites:** none are mandatory. You can take Architect Professional without Foundations. The guides recommend real hands-on time with Claude (6+ months for Developer and Architect Professional).

**Booking checklist**

1. Confirm your org is a Claude Partner and get your Partner Academy login.
2. Download the official exam guide PDF for your exam from Partner Academy and compare its domains to section 2.
3. Ask whether you get a voucher or discount.
4. Book a slot 3–4 weeks out. A date on the calendar makes you study.
5. If you're testing online, run the Pearson VUE system test on the machine and network you'll use.

---

## 4. Which order to take them

| You are… | Recommended order | Why |
|---|---|---|
| Non-technical (PM, analyst, consultant, ops) | CCAO-F → stop, or → CCAR-P later | Associate is about using Claude well. Architect Professional also covers discovery, governance and stakeholders. |
| Developer | CCDV-F → CCAR-F → CCAR-P | Developer builds API fluency. Architect F builds on it. |
| Senior engineer / architect (your goal) | **CCAR-F → CCAR-P**, then CCDV-F and CCAO-F as quick wins | Architect F is the core technical exam. Professional adds enterprise breadth. Once you've done both, Developer and Associate are mostly review. |

**Shortest route to all four:** CCAR-F → CCDV-F (about 70% overlaps) → CCAR-P → CCAO-F. Leave about 1–2 weeks between exams once the first is done.

---

## 5. The study method

These techniques have the strongest evidence for long-term retention. This site is built around them.

1. **Retrieval practice beats rereading.** Testing yourself is the learning. Do questions before you feel ready.
2. **Spaced repetition.** Review cards just before you'd forget them. The flashcards use the SM-2 algorithm: press *Again* if you blanked, *Good* if you recalled it with some effort.
3. **Interleaving.** Once you've done a first pass of lessons, mix domains (Smart practice mode) rather than drilling one at a time.
4. **Elaboration.** For each wrong answer, explain out loud *why the right answer is right* and *why your pick was wrong*. Every option on this site has a rationale. Read all of them.
5. **Build things.** Architect exams are scenario judgment. You only get good intuition by building agents, tools and Claude Code setups yourself (section 12).
6. **Simulate the exam.** Do full 120-minute timed mocks in one sitting, with no notes, the same way you'll sit the real thing.

**Daily routine (60–90 min)**

| Block | Minutes | What |
|---|---|---|
| Warm-up | 10 | Clear due flashcards |
| Learn | 25–40 | One or two lessons, plus their lab |
| Practise | 20–30 | 20 Smart-practice questions, then read every rationale |
| Close | 5 | Add one line to your own notes: the most important thing you learned today |

---

## 6. Free official resources

Everything the exams test is covered by free Anthropic material. You don't need a paid course.

**Anthropic Academy (free courses, Skilljar)** — `anthropic.skilljar.com`

| Course | Most useful for |
|---|---|
| Claude 101 / AI Fluency: Framework & Foundations | CCAO-F (the 4D framework: Delegation, Description, Discernment, Diligence) |
| Building with the Claude API | CCDV-F, CCAR-F |
| Introduction to Model Context Protocol | All technical exams |
| MCP: Advanced Topics | CCAR-F, CCAR-P |
| Claude Code in Action | CCAR-F (20% of the exam) |
| Introduction to Agent Skills | CCAR-F, CCAR-P |
| Claude with Amazon Bedrock / Google Vertex AI | CCAR-P (enterprise deployment) |

Course completion certificates are **not** the certification. They're good evidence that you've studied.

**Documentation** — `docs.claude.com` (formerly docs.anthropic.com)

- Build with Claude: Messages API, tool use, prompt caching, extended thinking, streaming, batch processing, citations, PDF and vision support, structured outputs, token counting
- Prompt engineering guide (every page)
- Claude Code docs: memory (CLAUDE.md), settings, permissions, hooks, subagents, skills, slash commands, MCP, headless mode, GitHub Actions, IAM/enterprise settings
- Agent SDK docs
- Models overview: compare Opus, Sonnet and Haiku

**Engineering blog** — `anthropic.com/engineering`. Read these in order; the Architect exams draw heavily on them:

1. *Building effective agents*: workflows vs agents, and the five workflow patterns
2. *Effective context engineering for AI agents*
3. *Writing effective tools for agents — with agents*
4. *Claude Code: best practices for agentic coding*
5. *How we built our multi-agent research system*
6. *Introducing Contextual Retrieval*
7. *Equipping agents for the real world with Agent Skills*
8. *Building agents with the Claude Agent SDK*

**Other**

- `modelcontextprotocol.io`: the MCP spec, concepts, and SDK quickstarts
- `github.com/anthropics/courses`: interactive prompt engineering tutorial (notebooks)
- `github.com/anthropics/claude-cookbooks`: runnable recipes (tool use, RAG, caching, sub-agents)

---

## 7. Core knowledge shared by every exam

This is the foundation. If you understand this section deeply, about half of every exam becomes easy.

### 7.1 Models and selection

- **Three tiers.** **Opus** is the most capable and is for complex reasoning, hard agentic and coding work. **Sonnet** balances capability and speed, and is the default for most production apps and agents. **Haiku** is fastest and cheapest, good for high volume, low latency, classification, routing and sub-agent grunt work.
- **How to choose:** start with the cheapest model that passes your **evals**. Move up a tier only when quality is the bottleneck. Mix tiers: Haiku routes or classifies, Sonnet does the work, Opus handles escalations or plans.
- **Trade-off triangle:** capability vs latency vs cost. Every architect question about models is really about this triangle plus "do you have evals to prove it?"
- **Knowledge cutoff:** models don't know recent events. Use retrieval or web search for fresh facts.
- **Platforms:** Claude API (first-party), Amazon Bedrock, Google Cloud Vertex AI, and Microsoft Foundry. Enterprises often pick a cloud for data residency, existing contracts, IAM and compliance (for example FedRAMP regions).

### 7.2 The Messages API (stateless)

```python
import anthropic
client = anthropic.Anthropic()           # reads ANTHROPIC_API_KEY from env
resp = client.messages.create(
    model="claude-sonnet-...",           # use a current model id
    max_tokens=1024,
    system="You are a concise support assistant for Acme.",
    messages=[{"role": "user", "content": "Where is my order 123?"}],
)
print(resp.content[0].text, resp.stop_reason, resp.usage)
```

- **Stateless:** the API remembers nothing. *You* send the whole conversation every turn, and roles alternate user/assistant.
- **`system`** is a top-level parameter, not a message. It sets role, rules and context.
- **`max_tokens`** caps the *output*. If you hit it, `stop_reason = "max_tokens"` and the answer is truncated.
- **`stop_reason`** values to know cold:

| Value | Meaning | What your code should do |
|---|---|---|
| `end_turn` | Claude finished naturally | Return the answer / end the loop |
| `tool_use` | Claude wants to call a tool | Run the tool(s), send `tool_result`, call again |
| `max_tokens` | Output cap hit | Raise the limit, ask for continuation, or shorten the task |
| `stop_sequence` | One of your stop sequences was hit | Handle per design |
| `pause_turn` | A long server-side tool turn was paused | Send the response back to let it continue |
| `refusal` | Claude declined for safety reasons | Handle gracefully, don't blindly retry |

- **Errors:** `400` bad request, `401` bad key, `403` permission, `404`, `413` too large, `429` rate limited, `500` server error, `529` overloaded. **Retry 429/5xx/529 with exponential backoff and jitter**, and respect `retry-after`. **Never retry 400s unchanged.**
- **Streaming** (server-sent events) improves *perceived* latency. Use it for chat UIs and long outputs.
- **Batch API:** asynchronous, about **50% cheaper**, results within 24 hours. Use it for offline work such as evals, back-fills and bulk classification. It's not for anything a user is waiting on.

### 7.3 Tool use (function calling)

The loop that every agent is built on:

```
1. Send messages + tools (name, description, input_schema)
2. Response stop_reason == "tool_use"?  → for each tool_use block: run it
3. Append assistant message (with tool_use blocks) AND a user message with
   tool_result blocks (matching tool_use_id; is_error: true on failure)
4. Call the API again. Repeat until stop_reason == "end_turn".
```

- **Loop control:** the loop ends on `stop_reason`, **never** by parsing the text for "done". A `max_turns` or iteration cap is a *safety net*, not the main signal.
- **`tool_choice`:** `auto` (default: Claude decides), `any` (must call some tool), `tool` (must call this named tool, which is great for forcing structured output), `none`.
- **Parallel tool calls:** Claude may return several `tool_use` blocks at once. Return *all* the results in one user message.
- **Errors:** return a **structured error inside `tool_result` with `is_error: true`** and say what went wrong and what Claude can do next, for example `"Customer not found. Ask the user to confirm their email."`. Don't throw (that kills the loop) and don't return an empty string (Claude will misread it).
- **Good tool design:**
  - Write clear, specific **descriptions**: what it does, when to use it, when *not* to, what each parameter means, with examples. This is the biggest lever you have.
  - Keep the toolset **small and non-overlapping**. Too many similar tools cause wrong picks. Consolidate (`search_orders(filter)` rather than five near-duplicates).
  - Use **strong input schemas**: enums, required fields, explicit formats. Use nullable/optional fields rather than inventing values.
  - Return **concise, meaningful** output (names, not opaque UUIDs). Paginate or truncate large results.
  - Make tools **idempotent** where possible, so retries are safe.
  - Put **dangerous actions behind confirmation**, for example a two-step `prepare_refund` then `confirm_refund`, or human approval.
- **Deterministic rules belong in code, not prompts.** If a refund over $500 *must* get approval, enforce it in the tool or a hook. A prompt only makes it *likely*.

### 7.4 Model Context Protocol (MCP)

- An open protocol that connects AI apps (**hosts**, such as Claude Desktop, Claude Code or your app) through **clients** to **servers** that expose capabilities. It's built on JSON-RPC 2.0.
- **Server primitives:** **Tools** (actions the model calls), **Resources** (data the app or user attaches, read-only context), **Prompts** (reusable templates the user picks, often as slash commands).
- **Client primitives:** **Sampling** (the server asks the host's model to generate text), **Roots** (which filesystem or URI boundaries the server may use), **Elicitation** (the server asks the user for input).
- **Transports:** **stdio** for local processes, and **Streamable HTTP** for remote servers (the older HTTP+SSE transport is deprecated). Remote servers use **OAuth** for authorisation.
- **When to use MCP vs direct tools:** use MCP when you want a capability reusable across many hosts or teams, or you're integrating a third-party system that already has a server. Use plain API tool definitions for app-specific logic inside a single app.
- **Security:** MCP servers run with real permissions. Only install servers you trust, give them least-privilege credentials, and watch for **prompt injection inside tool results**: data returned from the web, email or tickets can carry instructions. Treat it as data, never as commands.

### 7.5 Prompt engineering essentials

1. **Be clear and direct.** Say the task, audience, format, length and success criteria. Treat Claude like a brilliant new colleague with no context.
2. **Give context and motivation.** Explaining *why* a rule exists ("the output goes to a TTS engine, so no markdown") gets better results than shouting the rule.
3. **Use XML tags** to separate instructions, documents, examples and data: `<document>`, `<instructions>`, `<example>`.
4. **Few-shot examples:** 3–5 diverse examples, including edge cases, inside `<examples>`. Examples are powerful, and Claude copies their quirks, so make them varied.
5. **Let it think** for complex tasks: "think step by step", a `<thinking>` section, or **extended thinking**. Get the reasoning *before* the answer.
6. **Role / system prompt:** sets expertise and tone.
7. **Chain prompts** for multi-step work. Each step gets one clear job, and you can check outputs in between.
8. **Long documents:** put long docs **at the top**, and the question/instructions **at the end**. Ask Claude to extract relevant quotes first.
9. **Principles over long lists of conditionals.** A giant prompt with dozens of "if X then Y" rules dilutes the instructions. Give clear principles plus a few examples.
10. **Version and test your prompts** like code. A prompt change without an eval run is an untested deploy.

### 7.6 Structured output

- Best: **structured outputs / strict tool use** where your platform supports it. The response follows your JSON schema.
- Classic, reliable pattern: define a tool whose `input_schema` *is* your output schema and force it with `tool_choice: {"type": "tool", "name": "record_result"}`.
- Always **validate** in code (JSON Schema, Pydantic or Zod). On failure, **retry with the validation error included** in the prompt, up to N times, then fall back or escalate.
- For extraction: allow `null` for missing fields, so the model doesn't invent values. Ask for source quotes as evidence, and use enums for categories.

### 7.7 Context management

- **The context window is finite, and quality degrades as it fills.** Context is a budget, not a dumping ground.
- **Prompt caching:** mark a stable prefix (system prompt, tools, big documents) with `cache_control`. Cached reads cost a fraction of normal input and cut latency. **Order matters:** stable content first, variable content last. Any change in the prefix invalidates the cache from that point on. The default cache lifetime is short (minutes), with a longer option at higher write cost.
- **Compaction:** summarise old turns when you near the limit (Claude Code `/compact`, and the SDKs offer automatic compaction / context editing). Keep decisions, open issues and file paths. Drop raw tool dumps.
- **Structured notes / memory files:** agents write progress to a file (`NOTES.md`, a todo list) so they can resume after compaction or a new session.
- **Sub-agents for context isolation:** a sub-agent explores in its *own* context and returns a short summary. The main agent's context stays clean.
- **Just-in-time retrieval:** keep references (paths, IDs) and load the content only when needed. Don't preload everything.
- **"Lost in the middle":** facts buried in the middle of a huge context get missed. Put key material at the start or end and keep context lean.
- **Provenance:** keep track of where each fact came from (doc id, URL, quote) so answers can cite sources and you can audit them.
- **Independent review:** a *fresh* instance (or sub-agent) reviewing output catches more problems than asking the same instance that wrote it, because that one tends to rationalise its own choices.

### 7.8 Agents vs workflows (from *Building effective agents*)

- **Augmented LLM:** one model call plus retrieval, tools and memory. Start here.
- **Workflows** follow predefined code paths, which makes them predictable and cheaper:
  - **Prompt chaining:** fixed steps in sequence, with gates in between (for example outline → check → write).
  - **Routing:** classify the input, then send it to a specialised prompt or model (for example billing vs tech support, or easy → Haiku and hard → Sonnet).
  - **Parallelisation:** *sectioning* (independent subtasks at the same time) or *voting* (the same task several times for confidence).
  - **Orchestrator-workers:** a central model breaks the task down *dynamically* and delegates to workers. Use it when subtasks can't be known in advance.
  - **Evaluator-optimizer:** one model generates, another critiques against criteria, and they loop.
- **Agents:** the model directs its own process and tool use in a loop. Use them for open-ended problems where you can't predict the steps. They cost more and are harder to predict, so you need guardrails, stopping conditions, sandboxing and human checkpoints.
- **Golden rule: use the simplest thing that works.** Add complexity only when evals show it helps. Many exam distractors are "build a multi-agent system" when a single call or simple workflow would do.

### 7.9 Claude Code essentials

| Concept | What to know |
|---|---|
| **CLAUDE.md memory** | Loaded at the start of every session. Levels: enterprise/managed policy → user `~/.claude/CLAUDE.md` → project `./CLAUDE.md` (committed, shared) → local personal overrides. Files in subfolders load when Claude works there. Import other files with `@path/to/file`. `/init` generates one, `/memory` edits it. Keep it short, specific, and current. |
| **Rules** | `.claude/rules/*.md`: modular instruction files, optionally scoped to file paths (for example only for `src/api/**`). |
| **Settings** | `~/.claude/settings.json` (user), `.claude/settings.json` (project, committed), `.claude/settings.local.json` (personal, git-ignored), plus **managed settings** that admins enforce and users can't override. |
| **Permissions** | `allow` / `ask` / `deny` rules per tool, for example `Bash(npm run test:*)` or `Read(./.env)` in deny. Deny wins. Permission modes include default, plan, acceptEdits, and bypass (only for sandboxes). |
| **Plan mode** | Read-only exploration and planning before any edits. Good for big or risky changes. |
| **Slash commands & Skills** | Custom commands in `.claude/commands/`. **Skills** live in `.claude/skills/<name>/SKILL.md` with name and description frontmatter. They use *progressive disclosure*: only the description loads until the skill is needed, then the full instructions and files load. |
| **Subagents** | `.claude/agents/<name>.md` with frontmatter (name, description, tools, model). Each runs in its own context window with a restricted toolset. Use them for focused jobs like code review, tests and research. |
| **Hooks** | Shell commands run at lifecycle events: `PreToolUse` (can block, e.g. exit code 2), `PostToolUse` (e.g. run a formatter or linter), `UserPromptSubmit`, `Stop`, `SubagentStop`, `SessionStart`, `PreCompact`, `Notification`. **Hooks are deterministic. Use them for rules that must *always* happen.** |
| **MCP in Claude Code** | `claude mcp add …`. Scopes: local, project (`.mcp.json`, committed and shared with the team), and user. |
| **Headless / CI** | `claude -p "prompt"` runs non-interactively, prints the result and exits. Add `--output-format json` (or `stream-json`) for machine parsing, `--allowedTools` to restrict tools, and `--max-turns` to cap the run. **Without `-p` a CI job hangs, waiting for interactive input.** There's also an official GitHub Actions integration. |
| **Context hygiene** | `/clear` between unrelated tasks, `/compact` to summarise, and subagents for exploration. |
| **Best-practice workflow** | Explore → plan → code → commit, and test-driven loops ("write failing tests, then make them pass"). Give Claude a way to *verify* its work: tests, screenshots, linters. |

### 7.10 Claude Agent SDK

- The same agent loop that powers Claude Code, packaged as a library (Python and TypeScript). It was formerly called the Claude Code SDK.
- Main pieces: a query/client API, a **system prompt**, **allowed tools**, a **permission mode** and permission callbacks, **hooks**, **subagents**, **MCP servers** (including in-process custom tools), **sessions** you can resume or fork, and limits such as **max turns** or a budget.
- Agent loop: **gather context → take action → verify work → repeat**.
- Design for **escalation**: define when the agent must stop and hand off to a human, for example low confidence, policy-sensitive actions, repeated failures, or the user asking for a human.

### 7.11 Safety, security, governance

- **Prompt injection:** *direct* (the user tries to override instructions) and *indirect* (instructions hidden in documents, web pages, emails or tool results). Defences come in layers: separate trusted from untrusted content, least-privilege tools, human confirmation for consequential actions, input/output filtering, and monitoring. No single prompt fixes it.
- **Least privilege:** each agent or tool gets only the permissions and data it needs. Use scoped credentials, read-only where possible, and never secrets in prompts. Keep keys in a secrets manager or environment variables, and rotate them.
- **Human-in-the-loop:** require approval for irreversible or high-impact actions (payments, deletes, external emails, prod deploys). Set confidence thresholds for escalation.
- **Data:** minimise PII sent to the model, and understand retention, residency and processor agreements (for example a BAA for HIPAA). Log for audit.
- **Responsible use:** humans stay accountable for outputs. Check facts, disclose AI use where your policy requires it, and test for bias.

---

## 8. Associate – Foundations (CCAO-F)

**Who:** professionals who use Claude in daily work: analysts, marketers, HR, ops, consultants, PMs. Little coding.
**Shape:** 60 items, 120 min. Practical "what should you do" scenarios about using Claude well and safely.

### What each domain tests

| Domain (weight) | You must be able to… |
|---|---|
| **Output Evaluation & Validation (21%)**, the biggest | Spot hallucinations and made-up citations. Verify numbers, quotes and sources. Ask Claude to show its reasoning or cite the source text. Notice bias or missing perspectives. Critique and iterate. Know that confident ≠ correct. |
| **Workflow Integration & Solution Design (16%)** | Break work into steps Claude can help with. Choose between chat, Projects, artifacts, connectors and research. Fit Claude into team workflows (docs, email, spreadsheets, Slack). |
| **Governance, Risk & Responsible Use (15%)** | Follow company data policy. Never paste secrets or unapproved PII. Understand admin controls on Team/Enterprise plans. Keep human accountability. Disclose AI use. Know the usage policy basics. |
| **Prompting & Task Execution (14%)** | Write prompts with context, role, examples, format and success criteria. Iterate. Use structure (headings or tags). Give documents as attachments, not paraphrases. |
| **Product & Model Selection (12%)** | Know which Claude surface fits the job (web/desktop/mobile apps, Claude Code, Claude in Chrome/Excel/Slack, API). Opus vs Sonnet vs Haiku trade-offs. When to switch on web search, research or extended thinking. |
| **Configuration & Knowledge Management (12%)** | Set up **Projects** with knowledge files and custom instructions. Use styles, memory and Skills. Keep knowledge current and avoid stale or conflicting docs. |
| **Troubleshooting & Optimization (10%)** | Fix vague, overly long or off-target outputs. Handle a long chat that has drifted (start fresh with a summary). Work within usage limits. Split big tasks up. |

### The AI Fluency 4D framework (memorise)

- **Delegation:** deciding *whether* and *what* to hand to AI, versus doing it yourself.
- **Description:** communicating the task clearly: product, process and performance.
- **Discernment:** critically evaluating the output and the process.
- **Diligence:** using AI responsibly: transparency, accountability, and checking the work before you share it.

### Top traps (Associate)

- Trusting a polished answer without checking its sources. Fix: verify claims, especially numbers, names, dates and citations.
- Pasting confidential data into an unapproved tool. Fix: follow the data classification policy and use the company-approved plan.
- Re-explaining the same context in every chat. Fix: put it in a **Project** with knowledge and instructions.
- Keeping one endless chat. Fix: start a new chat with a summary once it drifts or gets long.
- "Make it better." Fix: say *what* better means: audience, length, tone, format, criteria.

**Lab:** build a Project for a real recurring task (for example weekly status reports). Add 2–3 reference docs and custom instructions, create a report, then fact-check every claim in it against the sources.

**Fast plan:** 5–7 days. Days 1–3: lessons and cards. Days 4–5: practice. Day 6: mock. Day 7: review the traps.

---

## 9. Developer – Foundations (CCDV-F)

**Who:** developers with 1–5 years' experience, Python and/or TypeScript, REST APIs and CLI tools.
**Shape:** 53 items, 120 min (about 2.3 minutes per item, so there's time to read code).

### Where the points are

**Applications & Integration is a third of the exam.** Master the Messages API, application design and engineering hygiene first.

| Domain | Must-know |
|---|---|
| **Applications & Integration (33.1%)** | Messages API request/response shape. Managing conversation state (stateless, so you resend history). The system parameter. `max_tokens`. Every `stop_reason`. Streaming events. Error codes and retry/backoff. Idempotency. Timeouts. Config per environment (model ids, keys, prompts kept *out of code*). Prompt versioning. Requirements gathering and success criteria. SDLC for LLM features (prototype → evals → staged rollout → monitor). |
| **Model Selection & Optimization (16.8%)** | Tokens and context windows. Sampling: temperature (low for extraction, higher for creative work). Hallucination. Knowledge cutoff. Opus/Sonnet/Haiku trade-offs. **Cost levers:** prompt caching, Batch API (about 50% off for async work), smaller model, shorter outputs, token counting before sending, trimming context. |
| **Agents & Workflows (14.7%)** | The tool-use loop. Workflows vs agents. The five patterns. Agent SDK basics. Stopping conditions. Sub-agents. |
| **Prompt & Context Engineering (11%)** | XML tags, few-shot, chain-of-thought, prefill (where supported), long-context ordering, structured output plus validation, citations. |
| **Tools & MCPs (10.6%)** | Tool definitions (`name`, `description`, `input_schema`). `tool_choice`. Parallel calls. `tool_result` with `is_error`. Building an MCP server with the Python/TypeScript SDK. stdio vs Streamable HTTP. Claude Code customisation (skills, subagents, commands). |
| **Security & Safety (8.1%)** | Prompt injection. Output sanitisation (never `eval` model output, escape HTML). Secrets in a vault or env vars, not prompts or repos. Key rotation and separate keys per environment. Least privilege. **Claude Code hooks** for enforcing policy. |
| **Claude Code (3.1%)** | Basic operation: CLAUDE.md, permissions, `-p` headless mode, slash commands. |
| **Eval, Testing & Debugging (2.6%)** | Read the `stop_reason` and `usage`. Log requests and responses. Reproduce with a fixed prompt version. Turn temperature down while debugging. |

### Code you should be able to write from memory

```python
# Tool-use loop (Python SDK)
messages = [{"role": "user", "content": user_input}]
while True:
    r = client.messages.create(model=MODEL, max_tokens=2048, tools=TOOLS, messages=messages)
    messages.append({"role": "assistant", "content": r.content})
    if r.stop_reason != "tool_use":
        break
    results = []
    for block in r.content:
        if block.type == "tool_use":
            try:
                out = run_tool(block.name, block.input)
                results.append({"type": "tool_result", "tool_use_id": block.id, "content": out})
            except ToolError as e:
                results.append({"type": "tool_result", "tool_use_id": block.id,
                                "content": f"Error: {e}. Try a different id.", "is_error": True})
    messages.append({"role": "user", "content": results})
```

```python
# Prompt caching: stable prefix first, cache it
client.messages.create(
    model=MODEL, max_tokens=1024,
    system=[
        {"type": "text", "text": "You answer questions about the attached handbook."},
        {"type": "text", "text": HANDBOOK_TEXT, "cache_control": {"type": "ephemeral"}},
    ],
    messages=[{"role": "user", "content": question}],
)
```

```typescript
// TypeScript: streaming
import Anthropic from "@anthropic-ai/sdk";
const client = new Anthropic();
const stream = client.messages.stream({ model: MODEL, max_tokens: 1024,
  messages: [{ role: "user", content: "Explain MCP in 3 bullets" }] });
stream.on("text", (t) => process.stdout.write(t));
const final = await stream.finalMessage();
```

### Top traps (Developer)

- Retrying a `400` in a loop. Fix: it's your request; fix it. Only retry 429/5xx/529, with backoff.
- Keeping API keys in code or prompts. Fix: environment variables or a secrets manager, separate per environment.
- Using the Batch API for a live chat. Fix: Batch is asynchronous (up to 24 hours) and only for offline jobs.
- Treating `max_tokens` as the context window. Fix: it caps *output* only.
- Expecting the API to remember previous turns. Fix: resend the history (and cache it).
- Cache prefix contains a timestamp. Fix: put variable content *after* the cached prefix.

**Lab:** build a CLI "docs assistant" with streaming, tool use (search plus read file), caching of the docs, retry with backoff, and a 20-case eval script.

---

## 10. Architect – Foundations (CCAR-F)

**Who:** engineers who design and ship Claude-based systems: agents, tools, Claude Code setups, extraction pipelines.
**Shape:** 60 scenario-based items, 120 min. Questions are grouped under **scenarios**. Reported format: 4 scenarios are drawn at random from a bank of 6, so **prepare all six**.

### The six scenarios (prepare each)

| Scenario | What to have ready |
|---|---|
| **1. Customer support agent** | Tool-use loop. Tools such as `lookup_order` and `issue_refund`. Escalation rules (refund limits, angry or legal issues, low confidence, the user asks for a human). Policy enforced in code/hooks, not just the prompt. Structured errors. Partial resolution and handoff summaries for humans. |
| **2. Code generation with Claude Code** | CLAUDE.md hierarchy. Rules. Plan mode for big changes. Subagents for review and tests. Hooks (formatter/linter PostToolUse, block dangerous commands PreToolUse). Permissions allow/deny. Skills and custom commands. TDD loop. |
| **3. Multi-agent research system** | Orchestrator-workers. Sub-agents with isolated context returning condensed findings. Parallel searches. Citations and provenance. Deciding when the research is "done". Token cost of multi-agent (much higher). Avoiding duplicate work through clear task boundaries. |
| **4. Developer productivity tooling** | Team-wide Claude Code configuration (committed `.claude/settings.json`, `.mcp.json`, shared skills, commands and subagents). Managed settings for policy. MCP servers for internal systems. Onboarding. |
| **5. Claude Code in CI/CD** | `claude -p` headless. `--output-format json`. `--allowedTools` least privilege. Max turns. GitHub Actions. PR review bots. Secrets via CI secrets. Non-interactive permissions. Independent reviewer instance. |
| **6. Structured data extraction** | JSON schema via a forced tool / structured outputs. Validation and retry with error feedback. Nullable fields (no invented values). Enums. Source quotes as evidence. Batch API for bulk. Human review for low-confidence fields. Measuring accuracy with a labelled eval set. |

### Domain 1: Agentic Architecture & Orchestration (27%)

- The agent loop and **`stop_reason`**-driven control. Iteration and budget caps are safety nets.
- Choosing **workflow vs agent** (the simplest thing that works) and choosing among the five patterns.
- **Orchestrator-workers / sub-agents:** each sub-agent gets a clear objective, output format, tool allowlist and boundaries. Return **summaries**, not raw dumps. Context isolation is the main benefit.
- **Task decomposition:** static (known steps → chain) vs dynamic (orchestrator plans at runtime).
- **Escalation and human-in-the-loop:** explicit triggers, a handoff with a structured summary, and resuming after approval.
- **Enforcement spectrum:** prompt guidance (soft) → tool design / schema constraints → hooks / permission checks / code (hard). The higher the stakes, the harder the enforcement.
- **Agent SDK:** hooks, permissions, subagents, sessions, max turns and budget.
- **Failure handling:** retries for transient errors, alternate strategies, and stopping and reporting when stuck rather than looping forever.

### Domain 2: Claude Code Configuration & Workflows (20%)

- What goes where: **team rules → project `CLAUDE.md` (committed)**, personal preferences → user or local files, org policy → managed settings.
- Keep CLAUDE.md **concise**: commands to build/test/lint, code style, architecture map, gotchas. Use `@imports` and path-scoped rules for modularity.
- **Hooks vs instructions:** "always run prettier after editing" → `PostToolUse` hook. "Never touch `/infra/prod`" → deny permission or a `PreToolUse` hook. Instructions alone aren't guaranteed.
- **Subagents vs skills vs slash commands:** a subagent is a separate context with its own tools (delegation). A skill is packaged know-how plus files that load on demand. A slash command is a saved prompt the user triggers.
- **Plan mode** for unfamiliar code or risky refactors. Review the plan, then execute.
- **CI:** `-p`, JSON output, restricted tools, secrets from the CI vault, and a fresh-instance reviewer.

### Domain 3: Prompt Engineering & Structured Output (20%)

- Clear instructions, context and the reason behind rules. XML tags. Few-shot with diverse examples. Chain-of-thought or extended thinking for reasoning.
- **Principles over piles of conditionals.** Long rule lists dilute each other.
- **Structured output:** structured outputs / forced tool, then validate, retry with the error, and finally fall back to a human.
- **Prompt versioning and regression evals.**
- **System prompt vs user turn:** stable role and rules in the system prompt; per-request data in the user turn.

### Domain 4: Tool Design & MCP Integration (18%)

- Descriptions are the main way to steer tool choice. Write them like docs for a new teammate.
- Few, distinct, well-named tools. Consolidate overlapping ones. Namespacing helps with many servers (`github_search_issues`).
- Input schemas with enums, required fields and nullable fields. Return concise, human-readable results with pagination.
- Errors: tell apart **transient** (retry), **permanent** (tell Claude so it changes approach), and **uncertain state** (for example a timeout on a payment: check status before retrying, never blindly re-run a non-idempotent action).
- MCP architecture, primitives and transports. Project `.mcp.json` for team sharing. Trust model and least privilege. Tool results can carry injection.

### Domain 5: Context Management & Reliability (15%)

- Context budget. Caching (stable prefix first). Compaction. Structured notes/memory files. Sub-agent isolation. Just-in-time retrieval.
- Long docs at the top, the question at the bottom. Quote extraction. Provenance and citations.
- Reliability: backoff on 429/529, idempotent tools, timeouts, fallbacks, **independent verification**, and evals with regression tests.
- Recency bias and lost-in-the-middle: key instructions and facts at the edges of the context, and restate critical constraints near the end of long contexts.

### Architect Foundations: answer heuristics

When two answers both look plausible, the better one usually:

1. Uses the **simplest** architecture that meets the requirement.
2. Enforces critical rules **deterministically** (code, hooks, permissions, schemas) rather than by prompt alone.
3. **Isolates context** (sub-agents, fresh instances) rather than stuffing one window.
4. Uses **`stop_reason`** and structured signals, not text parsing.
5. Returns **structured, actionable errors** to the model.
6. Applies **least privilege** (restricted tools, scoped credentials).
7. Is **measurable** (evals, validation) instead of "trust the model".
8. Escalates to a **human** for high-impact or low-confidence cases.

---

## 11. Architect – Professional (CCAR-P)

**Who:** senior architects and tech leads (about 3+ years in systems architecture, 6+ months of production LLM work).
**Shape:** 63 items, 120 min (under 2 minutes per item). Many are multiple-response. Expect long enterprise scenarios with business constraints (budget, compliance, deadlines, stakeholders).

### Domain-by-domain

**Integration (19%), the biggest**
- **Tool and capability bloat:** too many tools or MCP servers lower accuracy and use up context. Curate per agent, load dynamically, and consolidate.
- **Least privilege** and **authn/authz gaps:** the agent acts *on behalf of* a user, so it must carry that user's permissions, not a shared super-credential (the confused-deputy problem). Use OAuth with scoped tokens and per-tool authorisation checks.
- **RAG pipeline design:** chunking strategy, embeddings + **BM25 hybrid**, **contextual retrieval** (prepend chunk context before embedding), **reranking**, metadata filters, freshness/re-indexing, citations. Know when long context or caching beats RAG (small, stable corpus).
- **Connection protocols:** MCP (reusable, multi-host), direct API tools (app-specific), CLI (developer tooling, Claude Code), agent-to-agent (cross-system delegation). Pick by reuse, ownership and security boundary.
- **Accuracy–latency trade-offs:** model tier, retrieval depth, reranking, parallelism, streaming, caching.
- **Observability at scale:** trace every model and tool call (inputs, outputs, tokens, latency, cost, prompt version). Use correlation IDs, dashboards and alerts. Redact sensitive data in logs.

**Solution Design & Architecture (17%)**
- Turn the business problem into measurable success criteria, then the architecture.
- Decision ladder: **augmented LLM → workflow → single agent → multi-agent**. Move up a rung only when the one below can't meet the requirement.
- Multi-agent only when work is parallel, broad and worth roughly several times the token cost. It's a poor fit for tightly coupled tasks that need shared context.
- Tie the design to **business value**: cost per task, time saved, deflection rate, revenue impact.

**Evaluation, Testing & Optimization (16%)**
- **Eval set first:** representative and edge cases with expected outcomes.
- Grader types: **code-based** (exact match, schema, unit tests, which is the cheapest and most reliable), **LLM-as-judge** (with a clear rubric, calibrated against human labels), **human** review (gold standard, expensive).
- **Regression suite** on every prompt or model change. **A/B tests** in production with guardrail metrics.
- **Diagnosis:** *prompt failure* (instructions unclear, so fix the prompt, add examples) vs *hallucination* (missing grounding, so add retrieval/citations and allow "I don't know") vs *model mismatch* (task beyond the tier, or overkill, so change the model). vs *retrieval failure* (the right document wasn't fetched, so fix RAG).
- **Optimisation:** caching, batching, a smaller model or cascade, shorter outputs, fewer tools, trimmed context, parallel calls.
- **Monitoring:** quality drift, cost, latency p95, refusal and escalation rates, user feedback.

**Governance, Safety & Risk Management (14%)**
- Layered guardrails: input screening, a constrained system prompt, tool permissions, output filtering/validation, human review, audit logs.
- LLM failure modes: hallucination, prompt injection (direct and indirect), jailbreaks, data leakage, over-reliance, bias, sycophancy, runaway agents (cost or actions).
- **HITL:** risk-tiered. Auto-approve low risk, require a human for high impact, and route low-confidence cases to review.
- **Compliance:** GDPR (lawful basis, data minimisation, residency, right to erasure, DPA), HIPAA (PHI, BAA, minimum necessary, audit), FedRAMP (authorised cloud environments, for example via the right Bedrock/Vertex region). Data retention settings. Zero-data-retention arrangements where needed.
- Ethical AI: bias testing across groups, transparency (tell users they're talking to AI), explainability, accountability owners.

**Stakeholder Communication & Lifecycle (14%)**
- **Structured discovery:** stakeholders, current process, pain points, data availability, constraints, success metrics and risk appetite, *before* choosing a solution.
- Explain trade-offs in business terms: cost vs quality vs speed vs risk. Show options with a recommendation.
- Feedback loops (user ratings, error review). SLA/SLO alignment (latency, availability, quality bars). Plan for provider rate limits and outages.
- Documentation and **handoff:** architecture decision records, runbooks, prompt and eval repos, owner assignments.
- Lifecycle: discovery → POC → pilot (limited users, heavy monitoring) → production → scale → maintain (model upgrades with regression evals) → retire. Change management and training.

**Claude Models, Prompting & Context Engineering (13%)**
- Model choice per subtask, cascades, extended thinking for hard reasoning.
- System prompts as guardrails. Caching economics (stable prefix, hit rate). Context-window budgeting.
- **Agent Skills:** package organisational know-how. Progressive disclosure keeps context small.

**Developer Productivity & Operational Enablement (7%)**
- Rolling out Claude Code to teams: managed settings, permission baselines, a shared CLAUDE.md and skills, an approved MCP server list, hooks for policy, cost monitoring, training.
- AI-assisted SDLC: code review bots, test generation, migrations, docs.
- Operational debugging: read traces, reproduce with pinned prompt and model versions, check tool errors and retrieval before blaming the model.

### Architect Professional: answer heuristics

1. **Discovery before design.** If the scenario lacks success criteria, the right answer often gathers them first.
2. **Risk-proportionate controls.** Don't put heavy human-in-the-loop on low-risk tasks; don't auto-run high-risk ones.
3. **Evidence over opinion.** Choose the option that sets up evals or A/B tests and measures.
4. **Least privilege and user-scoped auth** every time.
5. **Total cost of ownership,** not just token price: ops, monitoring and human review costs count too.
6. **Compliance constraints come first.** An option that breaks residency, BAA or FedRAMP requirements is wrong, however good it is otherwise.
7. **Incremental rollout** (pilot, canary, feature flags) beats a big-bang launch.

---

## 12. Hands-on capstone projects

Build these. Each one covers many exam objectives. Budget 3–6 hours each.

### Project A: Support agent with escalation (CCAR-F scenario 1, CCDV-F)

- Python or TS. Tools: `lookup_customer`, `get_order`, `issue_refund(amount)`, `escalate_to_human(summary)`.
- Enforce in code: refunds over $100 need approval; `issue_refund` is idempotent via a request id.
- Structured errors with `is_error`. Loop on `stop_reason`, plus a max-turns safety cap.
- Prompt caching on the system prompt and tool definitions.
- 25-case eval: correct tool, correct escalation, no policy breaches.

### Project B: Multi-agent research (scenario 3)

- An orchestrator plans sub-questions, launches 3 parallel worker calls (web search or a local doc set), and each returns ≤200 words with citations.
- The orchestrator synthesises with provenance. Compare token cost against a single agent and write down the trade-off.

### Project C: Team Claude Code setup and CI (scenarios 2, 4, 5)

- A repo with `CLAUDE.md` (build/test commands, style), `.claude/rules/` scoped to `src/api`, `.claude/settings.json` with allow/deny, a `PostToolUse` formatter hook, a `PreToolUse` hook that blocks `rm -rf` and edits to `.env`, a `code-reviewer` subagent, a `/release-notes` command, a skill, and `.mcp.json` with one server.
- A GitHub Action that runs `claude -p "Review this PR diff for bugs" --output-format json --allowedTools "Read,Grep,Glob"` and posts a comment.

### Project D: Extraction pipeline (scenario 6)

- Extract invoice fields to a JSON schema with a forced tool. Validate with Pydantic or Zod, and retry with the errors. Nullable fields plus source quotes.
- Run 100 docs through the **Batch API**, measure field-level accuracy against labels, and send low-confidence fields to a review queue.

### Project E: MCP server (CCDV-F, CCAR-F domain 4)

- Build a small MCP server (Python or TS SDK) that exposes 2 tools, 1 resource and 1 prompt over stdio. Connect it to Claude Code with `claude mcp add`, then share it via `.mcp.json`.

### Project F: Enterprise design doc (CCAR-P)

- Pick one scenario (for example a HIPAA patient-intake assistant). Write a 3–5 page design: discovery questions, success metrics, architecture diagram, model choices, RAG design, auth model, guardrails, HITL, eval plan, rollout plan, cost estimate, risks and mitigations, runbook. Then have Claude critique it as a skeptical CISO and as a CFO.

---

## 13. Study schedules

### Fast track: Architect Foundations in 14 days (1.5–2 h/day)

| Day | Focus |
|---|---|
| 1 | Sections 2, 7.1–7.3 of this runbook. App: D1 lessons part 1. Cards. |
| 2 | *Building effective agents*. App: D1 lessons part 2. Drill D1. |
| 3 | Project A (support agent). |
| 4 | Section 7.9 plus Claude Code docs. App: D2 lessons. Drill D2. |
| 5 | Project C (Claude Code setup + CI). |
| 6 | Section 7.5–7.6, prompt engineering docs. App: D3 lessons. Drill D3. |
| 7 | Project D (extraction). Smart practice, 40 Q. |
| 8 | Section 7.4, MCP docs, *Writing effective tools*. App: D4 lessons. Drill D4. |
| 9 | Project E (MCP server). |
| 10 | Section 7.7, *Effective context engineering*. App: D5 lessons. Drill D5. |
| 11 | **Full mock #1.** Review every miss. |
| 12 | Project B (multi-agent). Mistakes notebook to zero. Weakest domain drill. |
| 13 | **Full mock #2.** Review. Traps list. |
| 14 | Light review: cards plus traps. Rest. **Exam the next day** if mocks are 85% or higher. |

### Full path: all four certifications in about 10 weeks (1–1.5 h/day)

| Weeks | Exam | Notes |
|---|---|---|
| 1–3 | **CCAR-F** | Use the 14-day plan, plus a buffer week |
| 4–5 | **CCDV-F** | API code depth: Applications & Integration, model and cost optimisation. Reuse Projects A, D, E. |
| 6–9 | **CCAR-P** | Integration, RAG, evals, governance, compliance, stakeholders. Project F. 3 full mocks. |
| 10 | **CCAO-F** | Product surfaces, Projects, output validation, responsible use. Quick win. |

Each exam's **Study plan** page builds a day-by-day schedule from your exam date.

---

## 14. Exam-day playbook

### Before

- Sleep. No new material the day before, only cards and the Traps list.
- Online exam: a clean desk, ID ready, close every app, a stable network, and check in 30 minutes early.

### Time management

- About 2 minutes per item (1.9 on CCAR-P). **First pass:** answer what you know and flag anything over 2–3 minutes. **Second pass:** flagged items. **Never leave a blank.** There's no penalty for guessing (assume so unless the guide says otherwise).
- Checkpoints: at 60 minutes you should be about halfway through the items.

### How to attack a scenario question

1. **Read the last sentence first.** What are they actually asking: the *best*, *first*, *most cost-effective*, *most secure* option?
2. **Underline the constraints:** volume, latency, budget, compliance, "must always", "the team", "in CI".
3. **Eliminate** the options that:
   - add complexity that wasn't asked for (multi-agent for a single-step task),
   - rely on a prompt to guarantee something that must *always* happen,
   - give broad or shared credentials,
   - parse text to detect state, retry non-idempotent actions blindly, or run interactively in CI,
   - ignore a stated compliance or business constraint.
4. Between the last two options, pick the one that's **simpler, deterministic, least-privilege and measurable**.
5. **Multiple-response:** each pick must stand alone as correct. If you're unsure about one, look for a pair that complement each other.

---

## 15. Final-week checklist and cheat sheets

**Ready to book when:**

- [ ] All lessons complete for the target exam
- [ ] Every domain ≥ 80% mastery on the exam dashboard
- [ ] Two full mocks in a row at ≥ 85%
- [ ] Mistakes notebook empty
- [ ] You can explain every row of the cheat sheets below without notes

### Cheat sheet: API and agents

```
stop_reason: end_turn → done · tool_use → run tools, send tool_result, loop
             max_tokens → truncated · stop_sequence · pause_turn → continue · refusal
tool_choice: auto | any | tool(name) | none          (forced tool = structured output)
tool error:  tool_result {is_error: true, content: "what failed + what to do next"}
retry:       429 / 5xx / 529 with exponential backoff + jitter; never 400 unchanged
cost:        cache stable prefix · Batch API ≈50% off (async ≤24h) · smaller model · shorter output
patterns:    chain · route · parallelise (section/vote) · orchestrator-workers · evaluator-optimizer
rule:        simplest thing that works; agents only for open-ended tasks
```

### Cheat sheet: Claude Code

```
memory:   managed > user ~/.claude/CLAUDE.md > project ./CLAUDE.md (shared) > local; @imports; /init /memory
rules:    .claude/rules/*.md (path-scoped)
settings: ~/.claude/settings.json · .claude/settings.json (team) · .claude/settings.local.json (me) · managed (org)
perms:    allow / ask / deny  (deny wins)          modes: default · plan · acceptEdits · bypass(sandbox only)
extend:   commands (.claude/commands) · skills (.claude/skills/x/SKILL.md) · subagents (.claude/agents/x.md)
hooks:    PreToolUse (block) · PostToolUse (format/lint) · UserPromptSubmit · Stop · SessionStart · PreCompact
mcp:      claude mcp add · scopes local | project (.mcp.json) | user
CI:       claude -p "…" --output-format json --allowedTools "…" --max-turns N
context:  /clear between tasks · /compact · subagents for exploration · plan mode for big changes
```

### Cheat sheet: architecture judgment

```
deterministic must-haves → code / hooks / permissions / schema, not prompt alone
context bloat           → sub-agents, compaction, notes file, JIT retrieval, fewer tools
self-review bias        → independent fresh instance reviews
uncertain state         → check status before retry (idempotency keys)
extraction              → schema + validate + retry-with-error + nullable + quotes + human review
RAG                     → hybrid BM25+embeddings, contextual retrieval, rerank, cite
security                → least privilege, user-scoped auth, injection = data not commands, HITL for high impact
eval                    → code graders > LLM judge (calibrated) > human (gold); regression on every change
rollout                 → discovery → POC → pilot → prod → scale → maintain → retire
```

---

### Sources for exam facts

- Domain weights for all four exams: [claudearchitectcertification.com](https://claudearchitectcertification.com/blog/what-each-claude-certification-actually-tests-domain-by-domain.md)
- CCAR-P domains, format and retake policy: [educative.io](https://www.educative.io/courses/claude-certified-architect-professional-exam/what-this-exam-tests)
- CCDV-F sub-skills, format and renewal: [claudecertificationguide.com/ccdv-f](https://claudecertificationguide.com/ccdv-f)
- Exam lineup, item counts and CCAR-F scenario bank: [claudecertificationguide.com](https://claudecertificationguide.com/blog/new-claude-certifications-2026)
- CCAR-F format and gotchas: [neurals.ca](https://neurals.ca/tech/claude/ccaf-exam/), [dev.to](https://dev.to/jk27101/the-5-things-the-claude-certified-architect-exam-actually-tests-and-the-gotchas-4n8i), [amitgambhir.github.io](https://amitgambhir.github.io/claude-certified-architect-guide)
- Overview of all four exams: [yu-wenhao.com](https://yu-wenhao.com/en/blog/anthropic-claude-certifications/)

These are third-party summaries. **The official exam guide in Anthropic Partner Academy is the authority.**

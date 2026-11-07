# OAI-DEV pipeline report

Rebuilt from the run journal (wf_243dfacb-a20); the assemble agent did not write report.md.

## Counts

| | Before | After |
|---|---|---|
| Lessons | 13 | 15 |
| Flashcards | 72 | 142 |
| Questions | 64 | 121 |

Review record: `{"date":"2026-11-07","questionsChecked":121,"fixed":13,"dropped":0}`

## Research corrections

- Prompt objects (D3 'prompt objects and versioning') are deprecated: creation de-emphasized from 2026-06-03 and v1/prompts shuts down 2026-11-30. Teach prompts versioned in application code.
- The Evals platform is deprecated: announced 2026-06-03, read-only since 2026-10-31, shutting down 2026-11-30. Graders are deprecated too. Replacement is Promptfoo (deprecations page) or Datasets (evals guide). Teach evals as a practice, not as the current OpenAI product.
- Fine-tuning is winding down: closed to new users since 2026-05-07, and active existing customers can create jobs only until 2027-01-06. SFT/DPO only on gpt-4.1 family, vision on gpt-4o-2024-08-06.
- The Assistants API is fully sunset: notice 2025-08-26, sunset 2026-08-26, no longer available. Mapping is Assistants->Prompts, Threads->Conversations, Runs->Responses, Run steps->Items.
- The current model lineup is the GPT-6 family: gpt-6-astra (flagship, recommended start), gpt-6.1-sol, gpt-6.1-terra, gpt-6-luna. Reasoning effort values include xhigh and max. Astra and 6.1 Sol reject none.
- Agent Builder (AgentKit) is deprecated and shuts down 2026-11-30. ChatKit remains. It is not in the spec but must not be recommended.
- The Agents API is in public beta since 2026-09-10 and runs the managed Codex harness.
- Prompt caching on GPT-5.6+ changed: explicit breakpoints, 30m/12h TTL, cache writes cost 1.25x/2.5x, reads cost 0.1x (0.05x on 6.1 Sol/Terra).
- The computer use tool type is now 'computer'; computer-use-preview is legacy. connector_id is deprecated for models released after 2026-09-01.
- Chat Completions is not deprecated: it remains supported, but Responses is recommended for new projects.

## Unverified (human review)

- Exact prices for web search, file search storage, code interpreter containers and background mode (pages link to the pricing page without numbers)
- A text.verbosity parameter on GPT-6 models
- Full lists of models that support computer use, compaction and background mode
- Priority tier pricing and its reported rename to 'Fast mode' on 2026-07-30 (secondary source only; the official priority guide returned 404 when fetched)
- Agents API docs page details (the guides/agents-api URL returned 404 to the fetcher; facts come from the announcement and the agents overview guide)
- Exact streaming event name for function-call argument deltas
- Computer tool pending_safety_checks/acknowledged_safety_checks field names
- Whether Agents SDK context is ever sent to the LLM
- label_model and multi grader types
- A moderation model newer than omni-moderation-latest

## Verification by domain

### d6 (14 questions, 0 key disagreements)

**fixed**

- d6-q2: changed option D from 'Cache the CRM MCP tool list with mcp_list_tools' to 'Reuse the mcp_list_tools output so the tool list is not fetched again'. mcp_list_tools is an output item, not something you call, so the old wording was inaccurate. Updated its rationale to match.
- d6-q3: rewrote the option A rationale so it no longer makes the unsupported 'less reliable' claim. It now says a single boolean gives no per-category confidence scores.

**remainingConcerns**

- research.md does not cover API key management: server-side keys, separate keys or projects per environment, rotation and usage limits. q61, q63, f68, f69 and the 'Keys and data' lesson section rely on general OpenAI best practice that research.md does not quote. The claims are uncontroversial but have no source citation.
- The lesson says Agents SDK tracing is on by default and trace_include_sensitive_data defaults to True. research.md supports both, but they are SDK details that could change between versions.


### d5 (15 questions, 0 key disagreements)

**fixed**

- q50 rationale for background mode: dropped the unsupported claim that it 'is not discounted' (research says the background mode page gives no pricing). It now says Batch is the discounted bulk option and has a separate rate-limit pool
- Flex lesson section and flashcard d5-f17: the fallback is now 'the default tier (auto)', which matches the flex-processing source

**factFixes**

- Background mode pricing is not documented, so the rationale no longer claims it is undiscounted
- Flex 429 fallback named as service_tier auto, as the source says

**remainingConcerns**

- The lesson mentions the priority tier without noting the unverified report that it was renamed 'Fast mode' on 2026-07-30. Left as is because the source is secondary and no question depends on it
- The lesson says cache writes cost 'a little more', but on GPT-5.6+ a 12h TTL write costs 2.5x. The lesson tells readers to check the guide for current multipliers, so the wording was kept
- Date-sensitive content (Evals platform shuts down 2026-11-30; fine-tuning jobs allowed until 2027-01-06) will go stale soon after those dates


### d3 (18 questions, 0 key disagreements)

**fixed**

- q34: rationale for the fine-tuning option now says that fine-tuning is winding down and is offered only for GPT-4.1/GPT-4o snapshots, not GPT-6 (research.md D5)
- q31: rationales for options 1 and 3 reworded so they no longer make an unsupported 'never mixes users' claim and say more precisely why the options are wrong

**factFixes**

- l6 'JSON mode vs Structured Outputs' section: replaced the unsupported 'keep JSON mode only for legacy cases' with the documented recommendation to prefer Structured Outputs over JSON mode where the model supports them

**remainingConcerns**

- l7 'What works' says to separate parts with Markdown or XML tags and that 'think step by step' is usually unnecessary for reasoning models. Both match long-standing OpenAI guidance but are not stated in research.md; left as conceptual wording.
- The l6 claim that the SDK surfaces refusals separately from the parsed object comes from SDK behaviour rather than research.md, which only says a refusal arrives as a `refusal` content item.
- q34 uses a hypothetical GPT-5.x to GPT-6 length change as its scenario; the principle (re-run evals and adjust prompts after an upgrade) is supported.


### d1 (20 questions, 0 key disagreements)

**fixed**

- l3 'Four options' section: rewrote the garbled clause '(then use manual history, which works because chaining needs stored responses)' to say that with store=false you manage history yourself because previous_response_id chaining relies on stored responses
- q13: option 0 changed from 'The Realtime API (with a GPT-Live voice model)' to 'The Realtime API with a realtime speech-to-speech model', and the explanation now says the Models page lists GPT-Live and the gpt-realtime family as voice models. research.md does not say how GPT-Live is used with the Realtime API, so the option no longer ties the two together.

**factFixes**

- q13 no longer claims GPT-Live specifically is the model to use with the Realtime API; research.md only lists it among the voice models

**remainingConcerns**

- q5 and the l3 lessons say previous_response_id chaining and the Conversations API depend on server-side storage, so they cannot be used with store=false. This is widely understood but research.md does not state it outright.
- research.md line 48 mentions a 'GPT-6 Sol' that is not in the models table, probably a typo for GPT-6.1 Sol. The content avoids it.
- The model names, effort values and dates come only from research.md (November 2026). I could not check the official URLs independently in this pass.
- As instructed by the workflow, this verifier did not push changes. The user's request to push is for the orchestrator to handle.


### d2 (26 questions, 0 key disagreements)

**fixed**

- f14: the front now says 'Besides type: "function"', so it no longer suggests a function tool needs only three fields (research lists type, name, description, parameters, strict)
- f22: the card no longer calls computer use a 'hosted' tool, and it now says your harness performs computer-use actions, which matches the lesson and research

**factFixes**

- f22: computer use is not executed by OpenAI. The model asks for actions and your harness carries them out (research D2, computer use)

**remainingConcerns**

- d2-q5 has the scenario tag 'Research agent with web search', but the question is about file search. This is cosmetic.
- For Code Interpreter, research.md says the container expires after 20 minutes idle. The content says 'about 20 minutes', which is a little softer but consistent.
- All 26 blind answers matched the keys. Every question has one rationale per option, and both multi-answer stems say '(Select two.)'. Blind answers are in /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/openai-openai-dev/blind-d2.json


### d4 (28 questions, 0 key disagreements)

**fixed**

- q42: the explanation said an input guardrail stops the run before the main agent spends tokens. Input guardrails run in parallel by default, so it now says to set run_in_parallel=False for blocking. The rationale for the correct option was tightened too.
- f50: softened the description of sandbox agents to match research.md, which only lists them as a feature.

**factFixes**

- q42 explanation: input guardrails do not block the agent by default (research.md says they run in parallel unless run_in_parallel=False)
- f50 back: removed the word 'preconfigured', which no source supports

**remainingConcerns**

- The Agents API facts (parallel subagents, multi_agent.enabled, max_concurrent_subagents, hosting options, no harness fee) come only from the launch announcement. The agents-api docs page returned 404 (research.md section c). These facts are used in d4-q13, d4-q14, q37 and lesson l8.
- Questions q46 and f51, and the l9 section 'Provider-agnostic', rely on the SDK README's provider-agnostic claim, which research.md does not quote directly. It is consistent with the provider-adapter scenario in d4-q11.
- The l9 lesson says MaxTurnsExceeded derives from AgentsException. research.md does not list MaxTurnsExceeded among the exceptions, though the SDK does define it that way.


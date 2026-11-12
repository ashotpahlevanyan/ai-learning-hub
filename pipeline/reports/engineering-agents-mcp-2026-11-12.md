# Assemble report: engineering/agents-mcp

Date: 2026-11-12. Bundle: `src/content/tracks/engineering/exams/agents-mcp.json` (rebuilt from domain-d1..d6.json; the partial bundle from the interrupted run was not trusted for content).

## Counts

| | Before | After | Spec target |
|---|---|---|---|
| lessons | 0 | 27 | 22 |
| flashcards | 0 | 152 | 120 |
| questions | 0 | 154 | 120 |

## Per-domain counts vs targets

Target = round(spec target x weight/100), lessons at least 2. Shown as actual / target.

| Domain | Weight | Lessons | Flashcards | Questions |
|---|---|---|---|---|
| d1 Agent architecture | 18 | 5 / 4 | 24 / 22 | 27 / 22 |
| d2 Tool design and tool use | 18 | 5 / 4 | 27 / 22 | 28 / 22 |
| d3 Model Context Protocol | 20 | 5 / 4 | 28 / 24 | 29 / 24 |
| d4 Context engineering and memory | 14 | 4 / 3 | 23 / 17 | 24 / 17 |
| d5 Evaluation, observability and cost | 16 | 5 / 4 | 27 / 19 | 26 / 19 |
| d6 Security and safety for agents | 14 | 3 / 3 | 23 / 17 | 20 / 17 |

Every domain meets or exceeds its targets.

## Review

`review` = `{"date": "2026-11-12", "questionsChecked": 154, "fixed": 32, "dropped": 0}`

## Fixes and drops from verification

### d1: 27 questions checked, 3 fixed, 0 dropped, key disagreements 0

- Fixed: d1-l5 section 'interrupts-and-pause-resume-in-mcp': the text said servers 'enforce single use' of requestState as a general rule. The live MRTR spec only says servers SHOULD bind the principal, a short TTL and the originating request, and that these bindings do not guarantee single use. Single use is a MUST only for state that must be consumed at most once. The section now says this.
- Fixed: d1-l5 keyPoint on requestState rewritten to match the spec: SHOULD-bindings, with single use enforced separately on the server.
- Fixed: d1-q25 explanation: binding to principal/TTL/originating request changed from an implied MUST to 'should'. Integrity protection is now scoped to state that affects authorisation or business logic, which is the spec's wording.
- Dropped: none
- Fact fix: MRTR requestState single-use: overstated as a universal server requirement. Corrected against https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr (fetched live; it also confirms the new JSON-RPC id on retry, exact echo of requestState and no inspection, and requestState treated as attacker-controlled with HMAC/AEAD integrity protection).
- Fact fix: Fetched https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons live: it lists 7 stop_reasons, says pause_turn defaults to 10 iterations, and says a max_tokens stop with an incomplete tool_use block should be retried with a higher max_tokens. This supports d1-l2, d1-q8 and d1-q9 as written.

### d2: 28 questions checked, 11 fixed, 0 dropped, key disagreements 0

- Fixed: d2-q14: option 1 and explanation said server tool results 'already arrive in the response'. The overview and handle-tool-calls pages now say a server call in the same parallel batch as client calls can get its result in a later response. Reworded the option and explanation and added the overview and tool-search sources (the srvtoolu_ rule is stated on the tool-search page).
- Fixed: d2-q12: added the overview and parallel-tool-use sources, which show disable_parallel_tool_use (handle-tool-calls does not), and made the explanation more precise.
- Fixed: d2-q9: added the parallel-tool-use page, which states the single-user-message rule.
- Fixed: d2-q28: added the tool-use overview, which lists computer use as an Anthropic-schema client tool, and rewrote the explanation to cite it.
- Fixed: d2-q22, d2-q24: added the MCP 2026-07-28 schema page. It documents the ToolAnnotations defaults and the 'hints, not guaranteed' note. The tools page does not list the defaults.
- Fixed: d2-q27: added the Claude Code sandboxing source so the network-egress option has backing, and updated the explanation.
- Fixed: d2-q21: removed the MCP tools source, which does not back idempotency keys. The Stripe idempotent-requests page remains.
- Fixed: d2-l2: rewrote the client-vs-server-tools section to cover delayed server-tool results and the rule that a user message must contain only tool_result blocks when a server call is unresolved. Added the parallel-tool-use and tool-search sources.
- Fixed: d2-l3: marked the stateful-handle guidance as non-normative and said handles should come from a secure random source, matching the spec wording. Added the MCP security best practices source.
- Fixed: d2-l4: attributed the annotation defaults to the MCP schema's ToolAnnotations and added the schema source.
- Fixed: d2-f23: front now names the MCP schema's ToolAnnotations as the source of the defaults.
- Dropped: none
- Fact fix: Server tool results do not always arrive in the same response. When a server tool shares a parallel batch with client tools, its result can come in a later response (tool-use overview, handle-tool-calls). Corrected in d2-l2 and d2-q14.
- Fact fix: The annotation defaults (readOnlyHint false, destructiveHint true, idempotentHint false, openWorldHint true) come from the MCP schema page, not the tools page. Checked against https://modelcontextprotocol.io/specification/2026-07-28/schema.
- Fact fix: The MCP Stateful Tools section is non-normative and asks for 'sufficient entropy' only for unauthenticated servers. The security best practices page says SHOULD use secure non-deterministic handles. Lesson wording was softened to match.

### d3: 29 questions checked, 7 fixed, 0 dropped, key disagreements 1

- Fixed: d3-q6: blind answer (notifications/cancelled) disagreed with key (close the response stream); key verified correct against the live Streamable HTTP page, which says notifications/cancelled is stdio-only. Key kept; added the streamable-http binding page as primary source.
- Fixed: d3-q24: option 1, rationale and explanation now say security scanning is delegated to package registries AND downstream aggregators (registry/about page), not aggregators alone.
- Fixed: d3-l5 registry section and gotcha: same scanning-delegation correction.
- Fixed: d3-q7: explanation softened from 'idempotency is the server's responsibility' to 'side-effecting tools should tolerate retries'.
- Fixed: d3-l3 progress-and-cancellation: replaced unverified 'either way your code sees an aborted signal' with SDK-scoped wording.
- Fixed: d3-l2 MRTR section, d3-l5 trust boundaries, d3-f16: single-use enforcement qualified as required when state must be consumed at most once (matches the MRTR page's MUST scope).
- Fixed: Sources: added Streamable HTTP binding page to d3-q6, q7, q8, q9, q10 and lesson d3-l2; added Progress page to d3-q15 and lesson d3-l3 (both URLs fetched and verified).
- Dropped: none
- Fact fix: MCP Registry security scanning is delegated to underlying package registries and downstream aggregators (q24, l5).
- Fact fix: requestState single-use is a server-side MUST only where the state must be consumed at most once; principal/TTL/request binding is SHOULD (l2, l5, f16).

### d4: 24 questions checked, 6 fixed, 0 dropped, key disagreements 0

- Fixed: d4-q2: rationale for option 3 rewritten; going over the four-breakpoint limit returns an error, so it cannot explain a silent no-cache result
- Fixed: d4-l2 sub-agents section: token figures corrected to match the source (agents use about 4x the tokens of chat, multi-agent systems about 15x); the old wording was muddled
- Fixed: d4-l2 compaction section, key point and flashcard d4-f14: tool-result clearing now described with the source's wording, 'one of the safest, lightest-touch forms' of compaction, not 'the lightest form'
- Fixed: d4-l2: context editing now described as clearing specific tool results managed from the client side, matching the memory-tool docs
- Fixed: d4-l2 sources: added the Claude Docs Compaction and Context editing pages, which back the built-in options section
- Fixed: d4-l4 project-instruction-files: enforcement wording now names a PreToolUse hook or a permission deny rule, matching the Claude Code docs
- Dropped: none
- Fact fix: Multi-agent token ratio corrected to 'agents ~4x chat, multi-agent ~15x chat' (multi-agent research post)
- Fact fix: Tool-result clearing called 'one of the safest, lightest-touch forms of compaction' (context-engineering post), not 'the lightest form'

### d5: 26 questions checked, 4 fixed, 0 dropped, key disagreements 0

- Fixed: d5-l2 'read-the-transcripts': CORE-Bench claim corrected to 42% -> 95% after grading AND task issues were fixed plus a less constrained scaffold (was 'about 95% once grading bugs were fixed'); added the verified 96.12 vs 96.124991 grader-bug example
- Fixed: d5-l2 'start-small-and-real': added the demystifying-evals guidance that 20-50 simple tasks from real failures is 'a great start', next to the existing 'about 20 queries' figure from the multi-agent post
- Fixed: d5-q8 explanation: replaced 'rising sharply once grading bugs were fixed' with the exact verified 42% -> 95% after grading and task issues were fixed
- Fixed: d5-q23 sources: replaced the generic tool-use overview with handle-tool-calls, which is the page that backs the 'never return a tool_result for a srvtoolu_ id' claim
- Dropped: none
- Fact fix: CORE-Bench 42% to 95%: checked on the live demystifying-evals-for-ai-agents page. The gain came from fixing grading and task issues together and loosening the scaffold, not from grading fixes alone.
- Fact fix: Batch API: checked on the live batch-processing page. It is 50% off, most batches finish within 1 hour, batches expire at 24 hours, the discount stacks with prompt caching, and `speed` (fast mode) is not supported in batch. The lesson, q16 and f20 are correct.
- Fact fix: Handling stop reasons: checked on the live page. Retrying an incomplete tool_use with a higher max_tokens is correct. pause_turn means the server tool loop hit its limit (default 10 iterations) and the fix is to send the response back unchanged. The lesson, q22, q23, f23 and f24 are correct.
- Fact fix: 'Tuning effort is often a better lever than switching models': confirmed as a verbatim quote on the live choosing-a-model page (q18, f22, d5-l4).
- Fact fix: Eval vocabulary (task, trial, grader, transcript, outcome, harness), capability vs regression suites and graduation, the pass@k and pass^k definitions, '0% across many trials usually means a broken task', and the three grader types: all confirmed on the demystifying-evals page.

### d6: 20 questions checked, 1 fixed, 0 dropped, key disagreements 0

- Fixed: d6-l2 'Sandboxing code execution' section: separated Anthropic's stated caveat (sandboxing, resource limits, monitoring) from the concrete practices (CPU/memory/time limits, no host credentials, no runtime socket, ephemeral workspace), which research.md does not attribute to Anthropic
- Dropped: none
- Fact fix: d6-l2: concrete code-execution sandbox controls no longer attributed to Anthropic's code-execution-with-MCP post; reworded as general practice

## Research corrections

- Claude Fable 5.2 (claude-fable-5-2) and Mythos 5.2 launched 2026-11-09 at $8/$40 per MTok. The spec's 'claude-fable-5-1' is no longer the current Fable; it is now listed among older models at $10/$50. The current lineup is Fable 5.2, Opus 5.5, Sonnet 5.5 and Haiku 5.5.
- Forced tool_choice (any/tool) returns 400 on Fable 5.2, Mythos 5.2, Opus 5.5, Sonnet 5.5, Fable 5.1 and Mythos 5.1. Haiku 5.5 and Opus 5 still accept it, but a forced call skips thinking. Manual extended thinking also blocks any/tool.
- API version 2026-10-21 returns 400 for temperature/top_p/top_k even at their default values. It also rejects document blocks in assistant messages and citations on user text blocks, and the SDKs now send API keys as Authorization: Bearer.
- MCP 2026-07-28 goes further than the spec text says. Logging and Dynamic Client Registration (RFC 7591) are also deprecated. Server-initiated requests are replaced by Multi Round-Trip Requests (InputRequiredResult/inputResponses/requestState). server/discover is required. subscriptions/listen replaces the GET stream and resources/subscribe. Every result carries resultType. Mcp-Method/Mcp-Name headers are required. Last-Event-ID resumability and ping are removed. Resource-not-found changed from -32002 to -32602, and new error codes -32020 to -32022 were added.
- The installed @modelcontextprotocol/sdk 1.32.2 has LATEST_PROTOCOL_VERSION 2025-11-25, and its README says 2026-07-28 support is not planned for v1.x. The current spec is implemented by the v2 split packages @modelcontextprotocol/server and @modelcontextprotocol/client 2.4.0, which are not installed. So SDK code type-checked against 1.32 teaches the legacy-era API and must be labelled as such.
- The OpenTelemetry GenAI page cited in the spec (opentelemetry.io/docs/specs/semconv/gen-ai/) is a 'moved' stub. Cite github.com/open-telemetry/semantic-conventions-genai instead; its status is Development. Note that OTel's gen_ai.usage.input_tokens SHOULD include cache read/write tokens, unlike Anthropic's input_tokens.
- OWASP published a Top 10 for Agentic Applications 2026 (ASI01-ASI10) on 2025-12-09. The sibling research said no agentic list exists; that is wrong. The LLM Top 10 is still the 2025 edition.
- 'Lethal trifecta' comes from Simon Willison's blog, which is not on the allowed source list. Teach the concept and anchor it on OWASP LLM01/LLM06, CaMeL (arXiv 2503.18813) and the prompt-injection design-patterns paper (arXiv 2506.08837).
- Claude tool names must match ^[a-zA-Z0-9_-]{1,128}$, with no dots, while MCP tool names may contain dots. Manual thinking budget_tokens is not accepted on post-4.6 models; adaptive thinking plus effort replaces it.

None of these change the header fields (id, code, name, level, price, items, minutes, passing, audience, format), which were copied from the spec unchanged. The spec verifyNotes still call claude-fable-5-1 current; the content follows the corrected lineup (Fable 5.2).

## Unverified facts (research)

- Toolformer model size (GPT-J 6.7B): it is not on the arXiv abs page
- The pattern names in arXiv 2506.08837 (action-selector, plan-then-execute, map-reduce, dual LLM, code-then-execute, context-minimization): the abs page does not list them
- The primary source for 'lethal trifecta' (Simon Willison blog): not an allowed domain and not fetched
- Definitions of 'tool poisoning' and 'rug pull': not in the MCP spec text read; third-party research terms
- The v2 MCP TypeScript SDK API (serveStdio, createMcpHandler, ctx.mcpReq.*): from the migration guide only, and cannot be type-checked because v2 is not installed
- The full server/discover result shape (DiscoverResult fields)
- Prefill returning 400 on every Claude model from 4.6 on: confirmed today only for Haiku 5.5
- Memory tool type string and command names
- Programmatic tool calling details (allowed_callers values)
- OpenAI tool-search model floor (gpt-5.4+) and the current GPT-6 lineup: not re-checked today
- A primary agent-specific source for idempotency keys, dry-run and rollback
- OTel GenAI semconv release version number (the releases list was empty)
- The stop_reason list and pause_turn default of 10 iterations: from sibling research, not re-fetched

## Answer positions

Counts by option index 0 / 1 / 2 / 3: 53 / 47 / 44 / 37 (181 keyed answers over 154 questions; mean 45.25, ±20% band 36.2 to 54.3). All positions were already inside the band, so no options were permuted. Every question has 4 options.

## Link check

`npm run check:links -- engineering`: 730 links checked across the engineering track, 729 ok, 1 unverified (a doi.org link in llm-engineering.json, not this bundle), 0 dead. No source URLs in agents-mcp.json needed replacing.

## For human review

- d1: d1-q11 cites the multi-agent research post, which supports 'errors compound' but not the p^20 arithmetic. research.md marks that arithmetic as general probability, not a vendor claim. Acceptable, but the source only backs the conclusion, not the number.
- d1: d1-q16 / d1-l3 plan-and-execute has no dedicated primary source in research.md. It is taught conceptually and anchored to the transparency principle in Building effective agents, plus ReAct as the contrast.
- d2: Idempotency keys, dry runs and rollback (d2-l4, d2-q21, d2-q23 option 0) have no agent-specific primary source. They are taught as general API engineering, with Stripe's official idempotency page as the source. This was kept on purpose and is flagged in research.md.
- d2: Model-specific facts are dated 'at the time of writing' and will go stale: forced tool_choice returning 400 on Opus 5.5 (d2-q10, d2-l2) and the computer_toolset_20260801 version string (d2-l5). Both were confirmed live today on the define-tools page and in the release notes, per research.
- d2: The Stripe idempotency page contained text aimed at AI agents (a 'stripe agent setup' instruction). It was ignored. The page is still a valid official source for the idempotency claim.
- d3: v2 SDK facts (Zod 4 requirement, SSEServerTransport removal, raw shapes deprecated) in q17 and l3 rest on the migration guide only and were not type-checked; not re-fetched here.
- d3: d3-q17 option 0 bundles two blockers (Zod 3 and SSEServerTransport) under a singular 'item' stem; defensible but slightly awkward.
- d3: Authorization-page claims (CIMD priority, PKCE refusal, iss validation) were checked against research.md only, not re-fetched.
- d4: The Compaction and Context editing URLs added to d4-l2 come from links on the official memory-tool page; I did not fetch them directly
- d4: d4-q3: the correct option cites OpenAI's allowed_tools while the distractors are framed in Claude terms; it is defensible because the same rule (keep tool definitions stable) applies to both providers
- d4: The memory-tool, Claude Code memory and Agent Skills claims are not in research.md; I checked each against the live official pages (client-side handling, /memories prefix, path traversal, expiry, multi-session pattern, 200-line target, imports, CLAUDE.md re-read after /compact, the 200-line/25KB limit for MEMORY.md, the /memory command, skill loading levels, reserved names) and all of them hold up
- d5: The demystifying-evals post says nothing about held-out sets. The held-out claim (d5-l2, q10, f11) rests on the writing-tools-for-agents post as summarised in research.md. I did not re-fetch that post, and q10 cites it.
- d5: The OTel GenAI facts (execute_tool span is INTERNAL, gen_ai.provider.name, cache tokens SHOULD be included in input_tokens, opt-in content attributes, the MCP semconv lagging the spec on mcp.session.id) were taken from research.md's live fetch on 2026-11-12. I did not re-read them from the GitHub repo. All of these conventions are at Development status and may change.
- d5: Zheng et al. (arXiv 2306.05685) on verbosity and self-enhancement bias, and arXiv 2411.00640 on error bars for evals, are cited from general knowledge. Neither is in research.md, but both are well-known primary papers.
- d6: d6-q11 and d6-q18 cite the OWASP AI Agent Security Cheat Sheet. A live fetch shows it backs approval for high-impact actions and audit trails for forensics, but it has no dedicated incident-response section and does not cover credential rotation or isolating browser profiles. Those parts rest on first-principles reasoning.
- d6: d6-q3 cites arXiv 2506.08837. Research.md says its pattern names could not be verified, and no allowed source covers the 'lethal trifecta' term. It is attributed to Simon Willison in plain text only, as research.md directs.
- Volume exceeds the spec targets in every domain (27 lessons vs 22, 152 flashcards vs 120, 154 questions vs 120). Nothing was trimmed.
- Date-sensitive model facts (Fable 5.2 lineup, forced tool_choice 400s, API version 2026-10-21, computer_toolset_20260801) will go stale.
- SDK code was type-checked against @modelcontextprotocol/sdk 1.32 (legacy 2025-11-25 protocol); v2 SDK content is from the migration guide and is not type-checked.
- Domain summaries and scenario descriptions were carried over from the interrupted assemble run; they match the spec and domain content but deserve a quick read.

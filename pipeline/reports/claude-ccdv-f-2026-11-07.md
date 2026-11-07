# CCDV-F assemble report (2026-11-07)

Bundle: `src/content/tracks/claude/exams/ccdv-f.json`
Test: `npx vitest run -t "claude/ccdv-f"` passes (1 passed).

## Counts

| | Before | After |
|---|---|---|
| Lessons | 18 | 28 |
| Flashcards | 94 | 177 |
| Questions | 94 | 169 |

## Per-domain counts vs coverage targets

| Domain | Lessons (target) | Flashcards (target) | Questions (target) |
|---|---|---|---|
| d1 Agents & Workflows | 3 (3) | 22 (14) | 21 (14) |
| d2 Applications & Integration | 10 (6) | 53 (31) | 49 (31) |
| d3 Claude Code | 2 (2) | 10 (3) | 9 (3) |
| d4 Eval, Testing & Debugging | 2 (2) | 7 (2) | 9 (2) |
| d5 Model Selection & Optimization | 3 (3) | 29 (16) | 25 (16) |
| d6 Prompt & Context Engineering | 3 (2) | 18 (10) | 19 (10) |
| d7 Security & Safety | 2 (2) | 13 (8) | 16 (8) |
| d8 Tools & MCPs | 3 (2) | 25 (10) | 21 (10) |

Every domain meets or exceeds its target. All 8 domain files were present, so no items were carried over from the previous bundle. Lessons, flashcards and questions are ordered d1 to d8, and all 374 ids are unique.

## Header changes (from research.md corrections)

- Price: `$125`; the "verify on Partner Academy" caveat was dropped (confirmed by the Partner Academy FAQ). Added that retakes cost the full fee and the partner discounts (Select/Preferred 50%, Global Premier 100% through 2026-12-31).
- Audience: 1–5 years of software engineering plus 6+ months with Claude or a comparable LLM (Python and/or TypeScript). It no longer says "1–5 years building on the Claude API".
- Format: official facts (MC plus scenario-based multiple response, 120 min / about 135 min seat time, scaled 100–1000 pass 720, OnVUE or test center, closed book, English and Japanese, 12-month validity, retake waits 14/30/90 days, max 4 attempts per rolling 12 months). The text says the 53-item count and domain weights come from third-party sources only.
- Domains: kept the 8 domains, weights (sum 100.0) and sub-skills. d5 is now spelled "Optimization" to match the coverage file.
- Scenarios: replaced the 5 old scenarios with the spec's four. Each description begins "Practice framing" because no source lists official CCDV-F scenarios.
- Review: `{"date":"2026-11-07","questionsChecked":169,"fixed":20,"dropped":0}`. All 8 domains were verified. `fixed` counts the entries in the verification "fixed" lists (d1 1, d2 3, d3 3, d4 4, d5 3, d6 4, d7 2, d8 0). Some of those entries are lesson or flashcard fixes.

## Answer-position balancing

Key positions before: 0:53, 1:58, 2:51, 3:40 (202 keys; mean 50.5; ±20% = 40.4–60.6, so position 3 was out of range).
I swapped options and rationales 1 and 3 together in q46, d2-q30, q30, q58, q82 and q70. None of them refers to options by letter. The answer for each is now [3] and still points at the same text.
Key positions after: 0:53, 1:52, 2:51, 3:46.

## Verification fixes and drops

No questions were dropped.

### d1 (21 questions, 0 key disagreements)
- Fixed: d1-q6 rationale (option D): softened "forced tool_choice is rejected on several current models" to "forced tool_choice ("any"/"tool") is not supported on some current models".
- Fact fixes: l11 removed "(classifier-based)" from auto permission mode; d1-f19 removed "(classifier)"; l10 added the note that Anthropic has flagged the Dec 2024 "Building effective agents" post as partly outdated.
- Concerns: item count and weight 14.7% are third-party only; an unverified new exam guide is said to be due 2026-11-17. claude-agent-sdk (pip name) and claude_agent_sdk (import name) are both used, which could confuse learners.

### d2 (49 questions, 0 key disagreements)
- Fixed: l5 retry sample now catches APIConnectionError plus APIStatusError and retries only 429 or >=500 (covers 500/504/529), with backoff at loop level. q11 rationale 0 softened. q5 rationale 3 now separates a 429 with retry-after (transient) from a spend-cap 429 without one.
- Fact fixes: l5 exception handling now matches the retryable set (429, 5xx, connection errors).
- Concerns: anthropic-ratelimit-* headers are not in research.md (accurate, kept). Files API limits are only partly confirmed. d2-q30..q39, l7, d2-l8 and d2-l10 (idempotency, shadow/canary, config management) rest on general engineering judgment.

### d3 (9 questions, 0 key disagreements)
- Fixed: d3-q2 option C rewritten as a single PreToolUse hook exiting 2. d3-q3 explanation adds Bash(git commit *) and the acceptEdits caveat. d3-q4 stem now says "configuration and content".
- Fact fixes: l17 hooks are "handlers, most often shell commands"; the event list was replaced with examples research.md supports (PermissionRequest included, Notification removed); added that non-zero exits other than 2 do not block.
- Concerns: version-specific claims (-p starts in Manual mode from v2.1.302+, AGENTS.md support from v2.1.277+). The Read(./.env.*.local) pattern is illustrative.

### d4 (9 questions, 1 key disagreement, resolved)
- Fixed: d4-q7 option 2 replaced with "cache_control breakpoint never reaches the API" (key stays [0,2]). l18 checklist item 3, the d4-l2 usage section and d4-f6 now separate "writes every call, zero reads" (changing prefix) from "both fields 0" (no breakpoint or prefix below the minimum length).
- Fact fixes: corrected the claim that both cache fields at 0 means the prefix is not byte-identical.
- Concerns: d4-q7's new option 2 is a constructed failure mode. d4-q9 relies on a single research line about spend-cap 429s.

### d5 (25 questions, 0 key disagreements)
- Fixed: d5-q5 rationale C (temperature wording). d5-q1 rationale B now cites the documented 400 pointing to adaptive thinking + effort. q37 explanation: count_tokens accepts PDFs only base64-encoded.
- Fact fixes: l12 sampling sentence: non-default values return 400 on Claude 4.7+, and any value returns 400 under API version 2026-10-21.
- Concerns: model specs (1M context, 128K output, Jun 2026 cutoff, 512-token cache minimum, effort defaults) rest on research.md only. The d5-q2 distractor premise is loose.

### d6 (19 questions, 0 key disagreements)
- Fixed: q59 rationale A and q66 rationale D (sampling parameters not accepted). q60 rationale B (prefill returns 400 from Claude 4.6). q60 explanation now cites documents-first and query-last ordering.
- Fact fixes: removed prefill as a format-steering technique. Temperature caveats updated.
- Concerns: role prompting and prompt chaining in l14 are not detailed in research.md. "Allow unknown/other enum values" in l15 is conceptual. d6-q5 and d6-q9 depend on model versions.

### d7 (16 questions, 0 key disagreements)
- Fixed: f87 hooks "run deterministically whenever their event fires". q80 explanation uses the Console's Disable/Delete wording.
- Concerns: the metadata.user_id guidance in q84 and l16 is not sourced in research.md. q79-q84, q89 and q90 have no scenario field.

### d8 (21 questions, 0 key disagreements)
- No fixes.
- Concerns: the MCP control labels (model-, application- and user-controlled) are not in research.md. The `npx @modelcontextprotocol/inspector` command is not in research.md. disable_parallel_tool_use comes from sibling research. In q71, auto plus strict guarantees valid inputs only when the tool is actually called.

## Unverified facts (for human review)

- Item count of 53 (third-party consensus only; the official FAQ does not state it)
- Domain weights and sub-skill weights (third-party, attributed to an unpublished guide v1.0)
- Exam Guide v1.0 "effective July 2026" (single source, timolabs)
- The spec's four CCDV-F scenarios (no source mentions any; labeled "Practice framing" in the bundle)
- certmadeeasy claim of a new guide on 2026-11-17 and an exam content update on 2026-12-07 (single source). **Recheck domains after 2026-11-17.**
- Results reported by domain percent and "fixed standard, not a curve" scoring (third-party)
- CCDV-F launch date and out-of-scope list (not found)
- disable_parallel_tool_use and tool runner details (from sibling research; pages not re-fetched)
- Claude Code allowedMcpServers/deniedMcpServers, managed-mcp.json, MCP prompts as slash commands, @ resource mentions (unread part of the MCP page)
- Hook per-event input schemas beyond the first 100k characters of the hooks page
- D2 idempotency, timeouts, logging, env config and prompt versioning: no Anthropic doc covers these directly
- Haiku 5.5 long-prompt (>100K) base price, inferred from the batch table

## Human review suggestions

- Domain question counts exceed the targets by roughly 1.5–4.5x. d3 (9 vs 3) and d4 (9 vs 2) are heavy relative to their 3.1% and 2.6% weights. Consider weighting practice-exam sampling by domain weight.
- Many questions carry a free-text `scenario` that does not match the four bundle scenarios (for example the old "Support chatbot backend" titles and long situational sentences). This is harmless, but the scenario framing is inconsistent.
- Version-sensitive API claims (temperature/top_p 400s, prefill 400s, tool_choice any/tool 400s on the newest models, MCP SDK 2.x imports, deprecated MCP sampling/roots/logging) should be rechecked before release.

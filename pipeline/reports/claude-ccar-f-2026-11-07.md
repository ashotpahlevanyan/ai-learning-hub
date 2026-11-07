# CCAR-F assemble report

Bundle: `src/content/tracks/claude/exams/ccar-f.json`
Test: `npx vitest run -t "claude/ccar-f"` passed (well-formed check) on the first run after assembly.

## Counts

| | Before | After | Spec target |
|---|---|---|---|
| Lessons | 15 | 20 | 15 |
| Flashcards | 103 | 183 | 100 |
| Questions | 101 | 187 | 100 |

All three are above target. Nothing was dropped to reach the targets.

## Per domain (spec numbering)

| Domain | Weight | Lessons | Flashcards | Questions | Share of questions | Proportional target (of 100) |
|---|---|---|---|---|---|---|
| d1 Agentic Architecture & Orchestration | 27 | 6 | 39 | 49 | 26.2% | 27 |
| d2 Claude Code Configuration & Workflows | 20 | 3 | 37 | 41 | 21.9% | 20 |
| d3 Prompt Engineering & Structured Output | 20 | 4 | 31 | 32 | 17.1% | 20 |
| d4 Tool Design & MCP Integration | 18 | 4 | 38 | 32 | 17.1% | 18 |
| d5 Context Management & Reliability | 15 | 3 | 38 | 33 | 17.6% | 15 |

d3 sits about 3 points below its weight and d5 about 2.6 points above. That is acceptable for practice, but worth evening out on the next pass.

## Structural changes

- **Domain renumbering:** the bundle now uses the spec's domain order. In this order d2 is Claude Code, d3 is Prompt Engineering and d4 is Tool Design & MCP. The previous bundle used d2 = Tool/MCP, d3 = Claude Code and d4 = Prompt.
  - domain-d2.json (Claude Code) and domain-d4.json (Tool/MCP) already carried the spec ids.
  - domain-d3.json (Prompt Engineering) still carried `domain: "d4"` on all 67 items (4 lessons, 31 cards, 32 questions). They were relabelled to `d3`. Without this, d3 would have had no questions and d4 would have mixed two domains.
  - The d3 verifier's note "do not renumber" assumed the old numbering. It no longer applies.
- **Lessons:** ordered d1 to d5, with file order kept inside each domain: l1–l5, d1-l1 | l9–l11 | l12, l13, d3-l1, d3-l2 | l6–l8, d4-l1 | l14, l15, d5-l3. Lesson ids keep their historical numbers, so l6–l8 now come after l13.
- **Ids:** all 390 ids are unique across lessons, cards and questions.
- **Header:** fields come from the spec.
  - `format` was changed to report that third-party sources mention multiple-response items, because the bundle has 11 "Select two/three" questions.
  - The price stays "$125 (verify on Partner Academy)".
- **Domain summaries:** rewritten for the spec's skill lists. They now mention adaptive thinking and effort in place of "extended thinking" and "forced tool use".
- **Scenarios:** renamed to the spec's six titles. Item labels were mapped to match: "Customer support agent" became "… with tools and escalation", "Developer productivity tooling" became "… for a team", and one stray "Claude Code for CI/CD" became "Claude Code in CI/CD".
  - Question counts per scenario: support 43, productivity 37, code generation 33, extraction 29, research 28, CI/CD 17.
- **`review` field:** not written. This run's assemble task did not ask for it. The current workflow script now has a step that sets it, so add it on the next run if wanted. All 5 domains verified with 0 drops, which would give: questionsChecked 187, fixed 18, dropped 0.

## Answer-position balancing

Answer indices are counted across all keys, including multi-answer ones (216 in total, mean 54, allowed range 43.2–64.8).

- Before: 0 = 71, 1 = 62, 2 = 53, 3 = 30 (position 0 was over the range and position 3 under it).
- After: 0 = 54, 1 = 55, 2 = 53, 3 = 54.

24 single-answer questions were changed. In each, the keyed option and its rationale were swapped with option 3 and its rationale, and the key was updated to 3. The text of the correct answer did not change.

- Moved from position 0 to 3: q2, q10, q22, d1-q9, q49, q58, d2-q2, d2-q8, d2-q16, q71, q80, d3-q12, q33, q44, d4-q12, q86, q92.
- Moved from position 1 to 3: q1, q9, q16, d1-q1, d1-q7, d1-q14, d1-q21.

Before swapping, every option, rationale and explanation was checked for order-dependent wording ("option A", "(B)", "all of the above", "first option" and similar). None was found. The word "both" appears, but only inside an option's own text.

The blind-*.json answer files record the keys from before the swaps.

## Verification fixes and drops (from blind verification)

No question was dropped, and no key disagreed with the blind solve in any domain (187 of 187 matched).

**d1 (49 questions)**
- Fixed: d1-q14. The explanation and the rationale for 'plan' no longer claim the job needs edits. They now describe plan as read-only planning, not an auto-deny mode.
- Fact fixes:
  - d1-f8: removed the unsupported reason "because the cap is checked between responses".
  - l4: the enforcement spectrum is now "roughly from weakest to strongest".
- Concerns:
  - f20/l5: Agent SDK custom tools as in-process MCP servers is not covered by research.md.
  - l3: "many more tokens" for multi-agent comes from the Anthropic multi-agent writeup, which research.md does not cite.
  - l1/q4 R0: a missing tool_result causing an API error is implied by research.md, not stated.

**d2 (41 questions)**
- Fixed:
  - q54 explanation: the self-review claim was softened.
  - d2-q10 rationale 0: removed the claim about scalar-vs-array precedence.
  - l11 CI/CD section: the comparison claim about independent review was removed.
- Concerns:
  - Some items depend on specific versions and could go stale: -p starting in Manual mode from v2.1.302 (d2-q16, d2-f9), the AGENTS.md fallback from v2.1.277 (d2-f3), and --bare skipping project hooks and MCP (d2-q17).
  - q61 and d2-q8 (@import) are consistent, but they sit close together.

**d3 (32 questions)**
- Fixed:
  - q74: specific rationales added for options 0 and 2.
  - q76 rationale 0: explains why regex post-processing is only a patch.
  - q82 rationale 2: says what goes wrong when the unit guidance is missing.
  - d3-q1 rationale 2: now cites reasoning_extraction instead of "thinking can't be turned off".
- Concerns:
  - Model-specific facts were checked only against research.md: prefill 400 on 4.6+, forced tool_choice 400 on Opus/Sonnet 5.5, manual thinking removed on 4.7+, reasoning_extraction, output_config.format GA, additionalProperties, and the 30% long-context figure.
  - q72 needs "Opus 5.5" to stay in its stem.
  - d3-q7 option C (strict + auto) does not guarantee a tool call, but it is still the best answer.

**d4 (32 questions)**
- Fixed and fact-fixed: removed the unverified claim "MCP prompts surface as slash commands" from l8 and d4-l1.
- Concerns:
  - q31, q42 and d4-q14 rely on idempotency-key and status-check design judgment with no doc citation.
  - d4-l1/d4-q4: the strong wording on URL-mode elicitation comes from the MCP spec, not research.md.
  - q41: tool search is on by default in Claude Code, which partly reduces tool bloat.

**d5 (33 questions)**
- Fixed:
  - l15: batches finish "within 1 hour", and only succeeded requests are billed.
  - l14: now uses the "up to 30%" figure.
  - q90: "strongly reduces" changed to "reduces".
- Fact fixes:
  - "Lost in the middle" was replaced with "context rot" in l14, f86 and d5-q15.
  - "Recency effect" was removed from l15, f96 and q92.
  - Self-review claims were softened in l15, f93, d5-f17 and q98.
- Concerns:
  - Jitter with backoff is not stated in research.md.
  - "Allow 'I don't know'" comes from general guidance and is not cited.
  - The d5-q2 distractor about thinking settings was left as is.

## Research corrections and how the bundle reflects them

- **docs.claude.com redirects:** the bundle contains no docs.claude.com URLs. The spec's `sources` still list them, so update the spec to use platform.claude.com/docs and code.claude.com/docs.
- **Multiple-response items:** reflected in `format`.
- **MCP 2026-07-28:** the d4 domain summary does not list sampling or roots. The d4 lessons were checked by the d4 verifier.
- **Spec wording that is now outdated:** the spec skill text still lists "tool_choice any/tool", "forced tool use", "extended thinking", "sampling, roots" and "lost-in-the-middle and recency". The bundle content follows research.md instead. The spec skills should be updated so the next run does not regress.
- **`output_format`:** appears only where it is described as deprecated.

## Unverified exam facts (human review)

- 4 scenarios drawn from a bank of 6. Only smartscope.blog states this, yet it is in `format`.
- Official scenario names (one third-party list, matching the spec).
- Item format: single-answer only, or mixed with multiple-response.
- The $125 price and the change from $99 on 2026-06-30 (third-party only; the Partner Academy page could not be reached).
- Pearson VUE delivery, 12-month validity, retake waits of 14/30/90 days with at most 4 attempts per 12 months, results within 2 business days.
- Exam Guide v1.0 "effective July 2026" (one source, which also cites a conflicting PDF dated 2025-02-10).
- Out-of-scope list: auth/billing, cloud configuration, Computer Use, pricing math (one source).
- Launch date 2026-03-12 (not confirmed on anthropic.com).
- Official per-domain task statements (the guide is not public).
- Claude Code allowedMcpServers/deniedMcpServers, managed-mcp.json, MCP resource @-mentions, and MCP prompts as slash commands.
- Whether the MCP initialize handshake still exists in protocol 2026-07-28.
- Hook input schemas for each event, beyond the part of the hooks page that was read.
- The summarizer's claim that the Building Effective Agents tooling guidance is marked outdated.

## Things a human should review

1. **Domain renumbering:** confirm the spec order (d2 = Claude Code, d3 = Prompt, d4 = Tool/MCP) is intended. Any user progress stored by domain id would now point at a different domain.
2. **Bundle size:** at 187 questions and 183 cards, the bundle is well over the 100/100 targets. Trim it, or raise the targets.
3. **Weight balance:** d3 is under-weighted and d5 over-weighted relative to the domain weights.
4. **Stale spec text:** update the spec's sources URLs and its outdated skill wording.
5. **`review` field:** decide whether to add it (see above).
6. **Version-specific Claude Code facts:** these will go stale fastest (see d2 concerns).

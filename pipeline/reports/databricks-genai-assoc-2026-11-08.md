# GENAI-ASSOC assemble report (2026-11-08)

Bundle: `src/content/tracks/databricks/exams/genai-assoc.json`

## Counts

| | Before | After |
|---|---|---|
| Lessons | 0 | 20 |
| Flashcards | 0 | 124 |
| Questions | 0 | 120 |

## Per-domain counts vs targets (lessons / flashcards / questions)

| Domain | Weight | Actual | Target | Lesson minutes |
|---|---|---|---|---|
| d1 Design Applications | 14 | 3 / 21 / 18 | 3 / 15 / 15 | 26 |
| d2 Data Preparation | 14 | 3 / 17 / 17 | 3 / 15 / 15 | 39 |
| d3 Application Development | 30 | 6 / 34 / 35 | 6 / 33 / 33 | 50 |
| d4 Assembling and Deploying Applications | 22 | 4 / 26 / 24 | 4 / 24 / 24 | 60 |
| d5 Governance | 8 | 2 / 11 / 11 | 2 / 9 / 9 | 25 |
| d6 Evaluation and Monitoring | 12 | 2 / 15 / 15 | 2 / 13 / 13 | 31 |

Every domain meets or exceeds its target.

## Study time (the user's request for learning hours per cert)

The site already sums this. `src/lib/studyTime.ts` adds up lesson `minutes`, and the `virtual:study-time` plugin in `vite.config.ts` does it at build time for track pages. The content test requires every lesson to have a plausible `minutes` value (3-90) and checks that the build-time sum matches. For this bundle:
- Lesson reading: 231 min (about 3.9 h)
- Practice estimate: 120 questions x 2 min = 240 min, plus 124 cards x 0.5 min = 62 min
- Total: 533 min, shown as about 9 h

No extra change was needed for this exam.

## Assembly steps

- Header taken from the spec. Format now says online proctored and notes that the exam web page also lists test centers (from research.md).
- Domain names and weights match the exam guide (14/14/30/22/8/12 = 100).
- 5 scenarios written with short descriptions.
- Lessons ordered d1 to d6. All ids are unique across the bundle.
- Answer positions balanced. Before: 45/50/30/18 (positions 0/1/2/3). After: 36/37/35/35 (mean 35.75, all within 20%). 22 single-answer questions had their correct option swapped into an under-used slot. Options and rationales were swapped together, so each key still points to the same text. No option says "all/none of the above" or refers to a position.
- Test: the bundle passes the content test's well-formedness checks. The databricks track is not yet registered in `src/content/index.ts`, so `npx vitest run -t "databricks/genai-assoc"` skips it. I ran the identical test body against this bundle with a temporary test file, which mirrors the existing `zz-mlassoc-tmp.test.ts` from the ml-assoc run, and it passed. I removed my temporary file afterwards.
- Link check: `npm run check:links -- databricks` found 91 links, 91 ok, 0 dead. No URL replacements were needed.
- Review: `{"date":"2026-11-08","questionsChecked":120,"fixed":27,"dropped":0}`. All 6 domains verified. `fixed` counts the listed fix entries: d1 5, d2 6, d3 2, d4 2, d5 7, d6 5.

## Verification results by domain

Blind solves matched every key: 0 key disagreements in all 120 questions. No questions were dropped.

### d1 (18 questions)
Fixed:
- Canonicalized the Knowledge Assistant source URL to `agents/agent-bricks/knowledge-assistant` in d1-l1, d1-l3, d1-q5, d1-q6, d1-q10 and d1-q17.
- Replaced the redirected MCP URL with `agents/mcp-tools` and retitled it in d1-q11 and d1-q12.
- d1-l3: removed the Agent Bricks overview source, which redirects to the generic page. Added the Agent Bricks CLI and Legacy agent features pages.
- d1-q10 rationale 3: the limit is 10 knowledge sources, not files.
- d1-q6 scenario: rewrote the awkward meta sentence.

Fact fix: the d1-q10 cap now reads "10 knowledge sources".

Concerns:
- d1-q5 is supported only conceptually by its sources.
- d1-q6 and d1-q7 test legacy products (Knowledge Assistant and Supervisor Agent). They are kept because the exam still covers them.

### d2 (17 questions)
Fixed:
- Removed the reranker claims "top 50" and "2,000 characters per column" from d2-l3 (section, keyPoint and gotchas), d2-f15, d2-q11 and d2-q12.
- d2-q12 distractor 3 now contradicts the docs directly.
- d2-q13 stem: added "without adding ground truth".

Fact fixes: the reranker "top 50" claim was softened everywhere. The 2,000-character limit is "the first 2,000 characters it finds", not per column.

Concerns:
- research.md section B D2 still states these claims.
- The chunk-overlap content (d2-l2, d2-q17) is general knowledge.
- Rerunning `gen-d2.cjs` would overwrite these fixes.

### d3 (35 questions)
Fixed:
- d3-q5: source changed to Built-in judges.
- d3-q35: source changed to Agents overview.

Concerns:
- Lesson d3-l6 does not mention CAN_RUN on a Genie Agent used as a subagent.
- The chain-vs-agent and prompt-augmentation content (q5, q6, q35, d3-l2) is conceptual.

### d4 (24 questions)
Fixed:
- d4-l2: states the result caps precisely (200 for hybrid, 10,000 for ANN).
- d4-q21: added the service-policies source.

Concerns:
- The Genie One MCP recommendation and the managed MCP line-up change quickly.
- Many items rely on renamed or Beta products (AI Search, Unity Gateway, Declarative Automation Bundles, Prompt Registry, agent memory). The exam guide may still use the old names.

### d5 (11 questions)
Fixed:
- Retitled the tutorial source ("Tutorial: Add service policy guardrails to a model service") and the service-policies source.
- Added the legacy AI Gateway overview page as a source for d5-l1, d5-q3 and d5-q10.
- Rewrote the service-policies section of d5-l1: system.ai built-ins, SQL UDF or LLM-judge custom policies, Beta, ON CALL / ON RESULT phases, block or redact.
- Updated keyPoints 2 and 3 and flashcards f1 and f3.
- Rewrote the lab.
- Tightened explanations for q1, q3, q6, q9 and q11.
- Added a second source to q11.

Fact fixes:
- Sensitive Data Detection on MCP tool calls is unsupported by the docs, so the claim was softened. Only Jailbreak screening covers MCP.
- The whole service-policies feature is Beta, not just the external policies.
- Custom policies are a SQL UDF or an LLM judge.
- The legacy guardrail limits are now credited to overview-serving-endpoints.

Concerns:
- d5-q2 assumes the legacy guardrail can mask input separately from output.
- Licensing and problematic-text content (d5-l2, q7, q8) is conceptual.
- Service policies are Beta and changing fast.

### d6 (15 questions)
Fixed:
- d6-l2: removed the unsourced "(Agent Monitoring)" label.
- d6-l2: added the verified figures (20 active scorers, about 15-20 minutes).
- d6-l2: added the @scorer-only registration rule (from a notebook).
- d6-l2: confirmed multi-turn judges in monitoring.
- d6-l1: named the Review App, trace labeling and review queues (Beta).

Fact fixes: the production-monitoring limits, the custom-scorer registration rules and multi-turn judge behaviour.

Concerns:
- The Unity Gateway naming and date rest on secondary sources.
- The claim that provisioned throughput suits steady high volume is general knowledge.

## Unverified facts (from research)

- Unity Gateway GA date (Aug 2026) and the intermediate "Unity AI Gateway" name (Apr 2026). Only secondary sources were found.
- Whether Review App and labeling sessions are still the current names.
- The `make_judge` API and the exact `mlflow.genai.evaluate()` argument names.
- Serving endpoint permission names beyond CAN QUERY and CAN MANAGE.
- The full list of managed MCP servers (UC functions, web search).
- Whether Genie Code is the renamed Databricks Assistant.
- Whether the exam will be updated for the Oct 2026 legacy moves.
- Test-center availability (the web page and the PDF conflict).

## For human review

1. Register the databricks track in `src/content/index.ts` once `ml-assoc.json` is final, so `npm test` covers both bundles. After that, delete the leftover `src/content/zz-mlassoc-tmp.test.ts`.
2. The passing score of 700 is a site convention. Databricks publishes none, and the format string says so.
3. Legacy items (Knowledge Assistant, Supervisor Agent, AgentServer, AI Playground) are still tested because the 18 Mar 2026 guide covers them. Recheck the guide for a refresh.
4. research.md still holds the unverified reranker claims ("top 50", "per column"). Correct it before any regeneration, and do not rerun the `gen-d*.cjs` scripts, which would overwrite the verified fixes.
5. Swapping options to balance answer positions changed the option order in 22 questions. Spot-check a few to confirm the explanations do not refer to option order.

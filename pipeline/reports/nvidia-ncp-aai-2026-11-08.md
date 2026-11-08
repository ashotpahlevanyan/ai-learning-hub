# NCP-AAI assemble report (2026-11-08)

Bundle: `src/content/tracks/nvidia/exams/ncp-aai.json`

## Counts

| | Before | After |
|---|---|---|
| Lessons | 0 | 26 |
| Flashcards | 0 | 148 |
| Questions | 0 | 137 |

### Per domain (actual / target)

| Domain | Weight | Lessons | Flashcards | Questions |
|---|---|---|---|---|
| d1 Agent Architecture and Design | 15 | 4 / 3 | 24 / 17 | 21 / 18 |
| d2 Agent Development | 15 | 3 / 3 | 21 / 17 | 21 / 18 |
| d3 Evaluation and Tuning | 13 | 3 / 3 | 16 / 14 | 17 / 16 |
| d4 Deployment and Scaling | 13 | 3 / 3 | 20 / 14 | 18 / 16 |
| d5 Cognition, Planning, and Memory | 10 | 2 / 2 | 13 / 11 | 13 / 12 |
| d6 Knowledge Integration and Data Handling | 10 | 3 / 2 | 15 / 11 | 16 / 12 |
| d7 NVIDIA Platform Implementation | 7 | 2 / 2 | 12 / 8 | 10 / 8 |
| d8 Run, Monitor, and Maintain | 5 | 2 / 2 | 9 / 6 | 7 / 6 |
| d9 Safety, Ethics, and Compliance | 5 | 2 / 2 | 9 / 6 | 7 / 6 |
| d10 Human-AI Interaction and Oversight | 5 | 2 / 2 | 9 / 6 | 7 / 6 |

Every domain meets or exceeds its targets.

The weights are the exam page values and total 98%. The study guide gives d4 5% and d8 7% instead.

## Learning hours (the user's request)

The site already computes study time from each exam bundle, using `src/lib/studyTime.ts` and the `virtual:study-time` Vite plugin. The content test checks that number. Every NCP-AAI lesson has a `minutes` value between 5 and 15.

- **Lesson reading time:** 275 min, about 4.5 h.
  - Per domain (minutes): d1 37, d2 42, d3 39, d4 42, d5 27, d6 25, d7 10, d8 18, d9 17, d10 18.
- **One full pass:** 623 min, shown as about 10.5 h.
  - 275 min of lessons, plus 274 min of questions (2 min each), plus 74 min of flashcards (0.5 min each).
- **Official NVIDIA courses:** the five recommended courses on the exam page total 35 h (8+3+8+8+8). The site does not show this figure anywhere.

## Answer-position balance

- **Before:** position 0: 52, position 1: 42, position 2: 35, position 3: 33.
  - The mean is 40.5, so the ±20% band is 32.4 to 48.6.
- **After:** position 0: 41, position 1: 41, position 2: 40, position 3: 40.
- **Questions permuted:** 12 single-answer questions. In each, options and rationales were swapped together and the answer index was remapped.
  - d1-q2, d1-q6, d1-q10
  - d2-q1, d2-q9, d2-q13
  - d3-q2
  - d5-q2
  - d6-q1, d6-q2, d6-q8
  - d7-q1

## Review record

The bundle's review field is set to `{date: 2026-11-08, questionsChecked: 137, fixed: 43, dropped: 0}`.

- All 10 domains were verified.
- Every blind answer matched its key.

`fixed` counts the distinct questions whose content or sources changed during verification. Questions whose options were only reordered are not counted.

| Domain | Questions fixed |
|---|---|
| d1 | 10 |
| d2 | 8 |
| d3 | 3 |
| d4 | 4 |
| d5 | 5 |
| d6 | 5 |
| d7 | 1 |
| d8 | 2 |
| d9 | 2 |
| d10 | 3 |
| **Total** | **43** |

## Verification fixes and drops, by domain

No question was dropped in any domain.

### d1 (21 questions, 0 key disagreements)

Fixes:
- **q12, q13:** the main source is now the A2A spec instead of the NeMo Agent Toolkit (NAT) docs index.
- **q16:** the source is now the A2A spec, which covers the Input Required state.
- **q9, q20:** the sources are now study guide objectives 1.4 and 1.6 plus the arXiv planning survey.
- **q2, q8, q10, q15, q21:** removed the NAT index source, which does not back these claims.
- **l1:** added the ReWOO paper on arXiv as a source.
- **l3:** added the A2A spec as a source.

Concerns:
- Many explanations still cite the NAT index page for the Router, Parallel Executor and ReWOO agent types.

### d2 (21 questions, 0 key disagreements)

Fixes:
- **q21:** the scenario now has a self-served base model with frozen weights, because a hosted model usually cannot be p-tuned. The NVIDIA p-tuning blog was added as a source.
- **q14:** the MCP rationale was softened, and the A2A spec was added as a source.
- **q5:** the Azure Circuit Breaker and Transient Fault Handling pages replace the NIM docs.
- **q1–q4, q19:** added the Azure Retry, Circuit Breaker and Transient Fault Handling pages as sources.
- **l1:** the p-tuning section was rewritten to match the NVIDIA blog.
- **l2:** now notes that the MCP 2026-07-28 revision is stateless. The MCP and A2A specs were added as sources.
- **l3:** added the Azure resilience pattern pages as sources.
- **f10:** reworded to match the source.

Concerns:
- The p-tuning blog does not say outright that the base weights stay frozen.
- q15 and q16 cite only the study guide.

### d3 (17 questions, 0 key disagreements)

Fixes:
- **q11, f15, l3:** the sizing command is now `nat sizing calc`, and the official sizing-calc page was added as a source.
- **q13:** the NVIDIA Data Flywheel glossary replaces the evaluate page as the source.
- **q17, l3:** the explanation now says concurrency "reaches or exceeds" spike_threshold, matching the docs.
- **l1:** now lists `config_metadata.json` among the outputs.

Concerns:
- The NAT 1.9 docs give two profiler config paths: `eval.profiler` and `eval.general.profiler`. No question depends on which one is right.
- The adjustable weights in `tunable_rag_evaluator` rest only on research.md.
- NAT is deprecated. These source pages may disappear after its end of life.

### d4 (18 questions, 0 key disagreements)

Fixes:
- **q11, l2, f17:** the sizing command is now `nat sizing calc`.
- **q4:** the DCGM exporter / kube-prometheus page was added as a source.
- **q5:** the NIM Operator docs were added as the main source.
- **q14:** the explanation no longer says the study guide names canary releases.
- **l1:** the NIM Operator section was revised.
- **l2, f7:** the Dynamo Planner is now described as SLO-driven.

Concerns:
- The MLOps and high-availability questions (q13, q14, q16, q18) are backed only in general terms by the study guide.

### d5 (13 questions, 0 key disagreements)

Fixes:
- All 13 questions had their options reordered to remove answer-position bias.
- **q4, q5, q13:** the IBM "What is AI agent memory?" page replaces the NAT overview as the source.
- **q6:** added the LangGraph persistence docs as a source.
- **q8, l2:** added the IBM and LangGraph pages as sources.

Fact fixes:
- **l2:** the NAT status callout now gives the deprecation timeline and the replacement products.

Concerns:
- The q8 rule that memory should be scoped per tenant is a general principle. No cited source states it directly.
- The claim that Redis memory moved to a separate `nemo-agent-toolkit-redis` package was not fetched independently.

### d6 (16 questions, 0 key disagreements)

Fixes:
- **q2:** the Milvus hybrid search and full-text (BM25) search pages replace the reranking NIM page.
- **q7:** the Text Embedding NIM docs replace nv-ingest as the source.
- **q8:** the Milvus GPU Index page replaces nv-ingest as the source.
- **q9:** added the Milvus Filtered Search page as a source.
- **q10:** removed the nv-ingest source.
- **l1:** added Milvus sources.

Fact fixes:
- **l1:** the cuVS sentence now names the real GPU index types.

Concerns:
- q14 has an empty scenario field.
- q3, q11 and q12 cite only the study guide.

### d7 (10 questions, 0 key disagreements)

Fixes:
- **q9:** the rationale for option 3 now matches that option.
- **l2:** the `nat serve` wording was softened.

Concerns:
- The claim that Triton ensembles avoid extra network round trips is not in research.md.

### d8 (7 questions, 0 key disagreements)

Fixes:
- **q5:** the Azure Retry and Circuit Breaker pages replace the NAT Observe index.
- **q7:** added the Data Flywheel glossary as a source.
- **l2:** added the Azure Retry and Data Flywheel pages and removed the Profiler source.

Concerns:
- `@track_function` and the Gantt chart rest on research.md.
- The q2 advice on stale indexes has no official source.

### d9 (7 questions, 0 key disagreements)

Fixes:
- **q6:** the EUR-Lex text of the EU AI Act (Regulation (EU) 2024/1689) replaces the Guardrails source.
- **q4:** added study guide 9.3 as a source.
- **l2:** added EUR-Lex, the MCP spec and the study guide as sources.

Fact fixes:
- **l1:** softened the claim that dedicated safety classifiers are "more robust and cheaper per call".

Concerns:
- The bias-evaluation and audit-trail practices are conceptual, with no specific official source.
- There is no FDA source for the passing mention of FDA rules for software as a medical device.

### d10 (7 questions, 0 key disagreements)

Fixes:
- **l1:** added the A2A and MCP specs as sources.
- **q6:** added the A2A spec as a source.
- **q7:** added the study guide as a source.
- **q3:** the scenario now just says "built from an NVIDIA blueprint".

Concerns:
- q2 and the interrupt/resume section rest on a general LangGraph-style concept, with only the study guide cited.

## Changes made in this assemble step

- **Dead source URLs replaced** in both the bundle and the domain files:
  - The Guardrails YAML schema page (`docs.nvidia.com/nemo/guardrails/latest/configure-rails/yaml-schema/index.html`) returned 404. It is now `docs.nvidia.com/nemo/guardrails/configure-guardrails/yaml-schema`, in d9-l1, d7-q9 and d9-q5.
  - The AI-Q blueprint docs (`docs.nvidia.com/aiq-blueprint/`) returned 404. The source is now `build.nvidia.com/nvidia/deep-researcher-agent`, in d7-q10. That page is titled "NVIDIA Deep Researcher Agent Blueprint".
- **runbook.md:**
  - Replaced the same dead AI-Q link.
  - Replaced the dead blog link `developer.nvidia.com/blog/tag/ai-agents/` with `developer.nvidia.com/blog/category/generative-ai/`.
- **official-domains.json:** added seven sites to the nvidia allow-list. They are the study guide's cited readings, the protocol specs, and the EU AI Act text:
  - `learn.microsoft.com/en-us/azure/architecture`
  - `a2a-protocol.org`
  - `modelcontextprotocol.io`
  - `milvus.io`
  - `ibm.com/think`
  - `docs.langchain.com/oss/python/langgraph`
  - `eur-lex.europa.eu`
- **src/content/index.ts:** registered the nvidia track. Before this, `-t "nvidia/ncp-aai"` matched no tests at all.
- **scripts/check-links.mjs:** milvus.io answers clients without cookies with a cookie challenge that redirects in an endless loop. The checker now reports this case as "unverified" instead of "dead". With a cookie jar, curl gets HTTP 200 from all four Milvus pages.

## Test results

- `npx vitest run -t "nvidia/ncp-aai"`: passes.
- The full src/content run still fails the library test, but only with "unknown track databricks", which another pipeline run owns. This run did not cause it.
- `npm run check:links -- nvidia`: 109 links checked. 104 are OK, 5 are unverified (the Milvus cookie challenge) and none are dead.

## Unverified facts

- NVIDIA's own statement that results are pass/fail with no score, the retake wait (third parties say 14 days) and attempt limits. The FAQ page returned 404.
- Whether NCP-AAI seats can actually be bought on Certiverse today. The Certiverse page would not render.
- Which Colang version (1.0 or 2.0) is the default in NeMo Guardrails 0.24.x.
- Which standard transports the MCP 2026-07-28 spec lists.
- Whether 8000 is NIM's default port, and the exact `/v1/health` endpoint names.
- Whether Dynamo v1.6.1 is released, or only v1.6.0 GA.
- Whether the NAT profiler config path is `eval.general.profiler` or `eval.profiler`.
- The NeMo Guardrails IORails engine, which only a third-party source mentions.
- The AI-Q blueprint's ranking claims on DeepResearch Bench.

## Needs a human

1. Review the seven sites added to the nvidia official-domains list.
2. Decide whether d7-q10 and the lessons should keep saying "AI-Q". build.nvidia.com now titles the blueprint "Deep Researcher Agent".
3. Decide whether to show the 35 h of official course time next to the site's own estimate (4.5 h of lessons, about 10.5 h for a full pass).
4. NAT is deprecated and reaches end of life at the end of 2026. Many NAT doc URLs may break after that.
5. The databricks track is not registered in src/content/index.ts, so the library test fails. Register it, or remove its library entries.

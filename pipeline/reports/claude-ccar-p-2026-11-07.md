# CCAR-P assemble report

Rebuilt from the run journal (the assemble agent did not write report.md).

## Counts

| | Before | After |
|---|---|---|
| Lessons | 17 | 22 |
| Flashcards | 107 | 211 |
| Questions | 105 | 200 |

Review record: `{"date":"2026-11-07","questionsChecked":200,"fixed":20,"dropped":0}`

## Research corrections

- Scenarios: the spec's 5 named scenarios are not confirmed by any source. One source (szymonpaluch.com) says the CCAR-P guide has no scenario bank, unlike Foundations (4 of 6). Use them as pipeline framing only, never as official exam scenarios.
- D2 skills: the spec omits zero-shot, few-shot and chain-of-thought prompting, which appears in the third-party task statements. CoT must be taught with the reasoning_extraction caveat on 5.x models.
- D3 skills: the spec omits 'match retrieval to data shape' and 'progressive discovery vs monolithic context', which appear in the third-party task statements (38 statements: 6/5/8/6/5/5/3).
- Exam extras not in the spec: no official practice exam (the guide has 3 sample questions); validity is 12 months with free on-time renewal; retakes wait 14, 30, then 90 days, max 4 per 12 months; delivery is Pearson VUE; Foundations is not a prerequisite.
- Forced tool_choice (any/tool) returns 400 on Opus 5.5, Sonnet 5.5, Fable 5.1 and Mythos 5.1. Use strict tools or structured outputs instead.
- Thinking cannot be disabled on Sonnet 5.5 either (it uses between_tools), in addition to Opus 5.5 and Fable/Mythos 5.x. Manual extended thinking returns 400 on Opus 4.7 and later.
- MCP 2026-07-28: roots, sampling and logging are deprecated. 'Session hijacking' is now 'state handle hijacking' because the protocol is stateless.
- HIPAA readiness does not cover Claude Code or Claude Platform on AWS. Agent Skills, Batch, Files, code execution and the MCP connector are neither ZDR- nor HIPAA-eligible.
- The direct Claude API and Claude Enterprise are not FedRAMP authorized. FedRAMP High routes are Bedrock GovCloud (also IL4/5), Vertex with Assured Workloads, and Claude for Government.

## Unverified (human review)

- All exam facts are third-party only; the official guide in Partner Academy could not be read
- The spec's 5 named scenarios (no source confirms them; one says there is no scenario bank)
- Launch date: week of 2026-07-10 vs 2026-07-23 (sources conflict)
- Eligibility: Partner-Network-only vs any org that joins the free Partner Network (sources conflict)
- Delivery in English and Japanese (one source)
- Renewal and retake rules (two sources)
- The 38 task statements and per-domain counts (one source, paraphrased)
- The sample-question answers (one source's paraphrase)
- GDPR specifics: no Anthropic GDPR page was fetched
- Ethical AI (bias, fairness, transparency) guidance: no Anthropic doc verified
- Formal risk-tiered human-in-the-loop and user-scoped (on-behalf-of) auth patterns are design inference, with no doc quote
- Advisor tool syntax and beta header
- API error codes, retry defaults and Batch timing (from the sibling run, not re-fetched)
- Claude Code managed-mcp.json, allowedMcpServers/deniedMcpServers and the tool-search threshold
- FedRAMP statuses are undated on claude.com/solutions/government

## Verification by domain

### d7 (15 questions, 0 key disagreements)

**fixed**

- d7-q8: rewrote stem so both keyed answers fit. The old stem asked only about a failed MCP connection, which system/api_retry cannot diagnose. Updated the explanation and rationale to match.
- q99: explanation now says a Read deny rule does not cover shell commands that read the file, and suggests pairing it with sandboxing (research D7 permissions)
- q103: explanation now names the workspace-trust delay on project allow rules as a related check

**factFixes**

- Lesson l17, section 'Shared conventions with CLAUDE.md and skills': removed two claims research.md does not support, the `.claude/skills/` path and 'custom slash commands have been merged into skills'. The section now uses general wording about shared skills.

**remainingConcerns**

- q105 and f103 say managed MCP configuration ranks above every other scope. That rests on research's 'managedMcpServers ranks above all'. research.md lists managed-mcp.json and allowedMcpServers/deniedMcpServers as unverified, so the wording stays general.
- The '-p starts in Manual mode' claim (d7-q5, d7-f6, lesson d7-l2) depends on Claude Code version (v2.1.302+). The content says 'in recent versions', which is fine but tied to that version.
- q102 (interactive-mode hang in CI) is plausible general knowledge and not directly stated in research.md.


### d6 (25 questions, 0 key disagreements)

**fixed**

- l16 SLAs section: SDK default retries stated as twice with backoff (per research D6 anchor) instead of 'a small number of times'; long requests over ~10 minutes should use streaming or Batch
- l16 Lifecycle section: partner platforms worded as 'Amazon Bedrock, Google-managed Vertex AI' to match research
- d6-f3: SDK retries twice by default with backoff
- d6-f7: front now says Google-managed Vertex

**factFixes**

- SDK default retry count made precise (2, sibling-sourced API errors doc)
- Streaming/Batch guidance tied to the >10-minute request threshold
- Partner lifecycle note limited to Bedrock and Google-managed Vertex as research states

**remainingConcerns**

- SDK retry default, request-id header and 429/529 details are marked in research.md as sibling, not re-fetched
- Research says official docs are thin for D6; most question content (discovery, handoff drills, ADRs, change management) is design judgment rather than doc-backed
- q93 treats 'user requests a human agent' as implicit feedback; this follows the lesson's framing (escalation = implicit) but some readers could call it explicit


### d1 (27 questions, 0 key disagreements)

**fixed**

- l1 'When an agent is justified': changed 'Choose an agent when all of these hold' to wording that marks the four conditions as design judgment built on Anthropic's guidance (open-ended problems, sandboxed testing and guardrails)
- l2 'Why teams reach for multi-agent': named the models in the 90.2% result precisely (Opus 4 lead with Sonnet 4 subagents vs a single Opus 4 agent)
- l3 'Total cost of ownership': changed the unsupported claim that HITL review is 'often the largest' cost line to 'a real cost line and can be a major one'

**factFixes**

- l3: the claim that HITL is 'often the largest' cost line was not backed by research.md, so it was softened
- l2: added model versions to the 90.2% multi-agent result to match research.md (Opus 4/Sonnet 4)

**remainingConcerns**

- The advisor, orchestrator-delegation and effort-cascade claims (d1-q1, d1-q3, d1-q7, l2, d1-f3 to d1-f5) rest on Anthropic-internal, directional results from one docs page, and the advisor tool is beta. Re-check them if that page changes.
- The independent-reviewer claim (q12, f13, l2) is supported only indirectly, by the D4 advice to grade with a different model from the one that generated the output.
- The l1 'four conditions for an agent' and f8 are partly design inference, not a direct doc list. They are now framed that way in the lesson, but f8 still states them as fact.


### d4 (30 questions, 0 key disagreements)

**fixed**

- l12 'optimisation toolbox': removed the unverified Batch timing claim ('most finish well within a day, unfinished expire after 24 hours'; research.md marks Batch timing as sibling, not re-fetched) and replaced it with conceptual wording about asynchronous turnaround
- f65: softened the same unverified Batch timing claim to conceptual wording
- d4-q12 rationale A: changed 'wrong for live chat' to fit the stem, which is about a premium tier needing faster interactive responses, not live chat

**factFixes**

- Batch timing (1h typical / 24h expiry) is unverified in research.md (sibling, not re-fetched), so it was softened in lesson l12 and flashcard f65

**remainingConcerns**

- The 'Output tokens are priced several times higher than input' wording rests on the 5x price ratio in the current model table, so it is fine as long as that pricing holds
- q54 option C has the judge 'reason before giving a discrete score'. The source supports a single judge prompt with a score, and it does not conflict with the reasoning_extraction caveat, but it is a design inference
- Blind answers are saved at /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/claude-ccar-p/blind-d4.json. All 30 matched the keys, and every multi-answer stem has the correct (Select two.)/(Select three.) label with rationales matching options one-to-one


### d5 (31 questions, 0 key disagreements)

**fixed**

- q73 rationale[1]: softened the absolute legal claim to 'embeddings derived from personal data can still be personal data'
- d5-q5 rationale[1]: noted that MCP roots are advisory, not a security boundary, and deprecated in MCP 2026-07-28 (per research)
- d5-f4 flashcard: changed 'cannot pose as prompt structure' to 'harder to pass off as' (JSON-encoding mitigates the risk but does not guarantee it)
- d5-l1 'Indirect-injection layer' section: changed the same overclaim ('cannot masquerade as structure') to 'harder to pass off as structure'

**factFixes**

- l14 GDPR section: changed 'Embeddings derived from personal data are personal data' to 'Treat embeddings derived from personal data as personal data too' (research marks GDPR specifics as unverified general knowledge)

**remainingConcerns**

- The GDPR content (q73, q83, l14 erasure and DPIA material) and the responsible-AI and fairness content (q78, q79, d5-q13) rest on general principles. research.md has no Anthropic source for them, so it should be worded as design judgment.
- FedRAMP and IL5 statuses (q74, d5-q8, d5-q9, f80, d5-f13) come from claude.com/solutions/government, which carries no dates. Check them again against the FedRAMP Marketplace before publishing.
- The risk-tiered HITL content (q75, d5-q12, l13) is design inference from the hook, permission and elicitation primitives. The lesson already says so.
- Scenario labels on questions are the pipeline's own framing; no source confirms them as official exam scenarios.


### d3 (39 questions, 0 key disagreements)

**fixed**

- d3-q5: rationale for the forced tool_choice option made general. It now says forcing returns 400 on the newest models (Opus 5.5, Sonnet 5.5, Fable 5.1, Mythos 5.1). The stem names no model, so the rationale no longer assumes one.

**factFixes**

- f42: replaced 'Built on OAuth 2.1' with 'OAuth-based authorization for remote (HTTP) servers'. research.md does not mention OAuth 2.1; it only says OAuth is recommended for Streamable HTTP. The token-audience rule is kept.
- l9 'Accuracy–latency trade-offs': changed 'on current Opus and Sonnet models thinking can't be switched off' to 'on Opus 5.5 and Sonnet 5.5'. research.md says Opus 5 can disable thinking at high effort or below, so the old wording was too broad.

**remainingConcerns**

- Blind solve matched all 39 keys (saved to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/claude-ccar-p/blind-d3.json). Every question has 4 options and 4 rationales that line up one to one. All multiple-response stems (q41, q43, q47, q51, d3-q6, d3-q15) say how many answers to select.
- d3-q16 rests on the claim that every API response carries a request-id header. research.md marks this as taken from the sibling research and not re-fetched in this run.
- Several items treat as fact two points that research.md flags as design inference: per-user delegated credentials and ACL filtering to prevent a confused deputy (q33, q41, f41). They are standard security practice, and lesson l8 already labels this as inference.
- The scenario labels are the pipeline's own framing. q49 is labelled 'Enterprise knowledge platform (RAG)' although it is about agent-to-agent delegation, which is a cosmetic mismatch only.


### d2 (33 questions, 0 key disagreements)

**fixed**

- d2-q3: stem now names Opus 5.5 instead of 'a current model'. Forced tool_choice returns 400 only on Opus 5.5, Sonnet 5.5, Fable 5.1 and Mythos 5.1, not Haiku 5.5, so the distractor's rationale only holds for a named model.
- d2-q8: stem now pins the endpoint to Sonnet 5.5, so 'a few hundred tokens' is clearly under its 512-token minimum. Removed the unsourced claim that too many breakpoints 'would produce an error' from the explanation and rationale 2, and added the 512-token minimum to the explanation.

**factFixes**

- Flashcard f20: an escalation trigger was 'confidence checks', which contradicts d2-q2 (self-reported confidence is a weak signal). It now says the cascade escalates on automated checks: tests, schema validation, or a verified grader.
- Lesson l6, 'Prompt caching mechanics': the cache lookback was 'about 20 content blocks'. It is now 'up to 20 positions', matching research.md.

**remainingConcerns**

- q29 (long documents before the question) and flashcard f23 (avoid near-duplicate examples) match standard Anthropic prompting guidance, but research.md supports them only indirectly.
- Questions carry scenario labels such as 'Regulated healthcare assistant'. research.md says these are pipeline framing devices, not official exam scenarios, so the UI should not present them as official.
- Model names, prices, cache multipliers and thinking/tool_choice behaviour change often. Every claim checked matches research.md dated 2026-11-07, but they should be re-checked if research is refreshed.


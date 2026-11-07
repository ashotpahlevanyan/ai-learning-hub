# GEM-DEV pipeline report

Rebuilt from the run journal (wf_441a5e14-37b); the assemble agent did not write report.md.

## Counts

| | Before | After |
|---|---|---|
| Lessons | 13 | 15 |
| Flashcards | 85 | 158 |
| Questions | 67 | 127 |

Review record: `{"date":"2026-11-07","questionsChecked":127,"fixed":19,"dropped":0}`

## Research corrections

- All ai.google.dev/gemini-api/docs URLs now 301-redirect to aistudio.google.com/docs; google.github.io/adk-docs redirects to adk.dev. Cite the new URLs.
- The current lineup has no GA 'Pro' model. The flagship is Gemini 4 Argon (gemini-4-argon, GA Oct 13 2026); the only Pro is gemini-3.1-pro-preview (preview). gemini-2.5-pro and gemini-2.5-flash are deprecated and auto-route on Dec 1 2026 to gemini-3.8-flash and gemini-3.5-flash-lite.
- Sampling parameters (temperature/top_p/top_k) are deprecated and ignored on Gemini 3.6+ and 4 Argon. thinking_level is the control. minimal errors on 3.8 Flash and 4 Argon. Prefilled final model turns return 400.
- Explicit caching is not supported in the Interactions API or on Gemini 4 Argon+. It is generateContent-only (beta) for Gemini 3/2.5, with a 1h default TTL.
- The Batch API is generateContent-only (not yet in Interactions).
- Interactions tool_choice values are auto (default), any, none and validated, with an allowed_tools object to restrict functions. Legacy VALIDATED is the default when tools are combined.
- Search grounding on Gemini 3+ is billed per executed search query ($14/1k after 5k free per month shared), not per prompt. 2.5 and older are billed per grounded prompt.
- Vertex AI is now part of the Gemini Enterprise Agent Platform; Agent Engine was renamed Agent Runtime (Apr 22 2026).
- Managed Agents (Antigravity antigravity-preview-09-2026, Deep Research -04-2026 IDs) are Public Preview. Background mode requires store=true.
- Inline request limit is 100MB (50MB for PDFs), not 20MB. The Files API allows 2GB per file, 20GB per project, kept 48h.
- Intro pricing: Gemini 4 Argon $2/$10 until Nov 30 2026, then $4/$20. 3.8 and 3.6 Flash $0.75/$3.75 until Dec 31 2026, then $1.50/$7.50.

## Unverified (human review)

- Remote MCP on Gemini 3 via Interactions: the overview says it is not supported yet, while the function-calling, Antigravity and Deep Research pages document mcp_server. The docs conflict.
- thinking_level support on 2.5 models: the Interactions table lists low/medium/high, but the legacy page says 2.5 needs thinking_budget.
- Exact implicit-cache discount for non-Argon models (Argon is 95%; the optimization page says 90% generally).
- Flex/Priority per-model availability, and Search grounding availability on the Priority tier.
- 2.5-family Search grounding free-RPD wording on the pricing page.
- Per-model RPM/TPM/RPD numbers by tier.
- Webhooks/Triggers/Environments/Credentials APIs for managed agents, which were not read in detail.
- ADK CLI flags for adk web / api_server / deploy agent_engine, and per-language ADK versions other than TS 2.0 / Go 2.0.0.
- Agent Runtime deploy steps and pricing on the Gemini Enterprise Agent Platform.
- Knowledge cutoffs for 4 Argon, 3.8, 3.6 and 3.5 Flash-Lite.
- google-gemini/cookbook was not fetched.
- Professional ML Engineer pointer was not re-verified.

## Verification by domain

### d7 (8 questions, 0 key disagreements)

**fixed**

- l13 'Safety filters' section: removed the unsourced AI Studio labels 'Block few/Block some/Block most'
- l13 'What a block looks like' section: moved the generation-blocked codes (recitation, spii, image_safety) out of the legacy generateContent paragraph and into the Interactions paragraph, where research.md places them. Also matched the source wording that a blocked input or output returns HTTP 400 and the blocked content is not returned
- d7-l2 'The onus is on developers' section: replaced 'loosening settings further can be subject to review' (illogical when the default is already off) with the source wording 'less restrictive settings may be subject to review under the terms of service'

**factFixes**

- Removed unsupported AI Studio threshold display names
- Corrected the placement of Interactions-only error codes, which appeared under the legacy API description

**remainingConcerns**

- The prompt-injection content (q66, the l13 'Beyond filters' section, f85) rests on general best practice. research.md's D7 section does not source it. The answers are defensible from first principles, so it was kept.
- d7-q8 assumes that codes such as recitation and spii also come back as HTTP 400. research.md lists them as 'other generation-blocked codes' but does not state their HTTP status explicitly.


### d1 (19 questions, 0 key disagreements)

**fixed**

- q8: reworded the confusing stem ('which API it is documented for') to 'Which two statements about the Batch API and generateContent are accurate? (Select two.)'; rationale for option 2 now cites the 'not yet available in the Interactions API' doc wording
- q1 rationale 0: removed the unsupported claim 'new capabilities launch there first'; it now says the docs call it the default, recommended interface
- d1-q16 rationale 1: removed the unsupported claim 'new models launch there first'

**factFixes**

- l1 section 1: removed the unsupported list of Gemini 4 Argon input modalities (text/images/audio/video/PDF)
- l1 section 1: replaced unsupported specialised-model names (Nano Banana, Gemini Omni Flash, TTS/transcription specifics) with general wording plus the embedding ids that research.md confirms
- l2 section 5: replaced 'new models and capabilities launch on the Interactions API first' with the quoted 'remains fully supported' and 'default for new work'

**remainingConcerns**

- Gemma and Model Garden claims (l1, f5, q6) and the GEMINI_API_KEY env var are general knowledge that research.md does not cover; they are left as conceptual statements
- q10 rationale calls google-generativeai and @google/generative-ai 'older, superseded packages'; research.md does not cover this, but it matches the long-standing SDK history
- Blind answers saved to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/gemini-gemini-dev/blind-d1.json. All 19 matched the keys. The corrected file is /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/gemini-gemini-dev/domain-d1.json


### d3 (21 questions, 0 key disagreements)

**fixed**

- q29: option 0 no longer says 'shorten property names' (research.md does not support it); now reads 'flatten the nesting, reduce unions and trim long enums'. Explanation updated to match.
- q29: rationales for the Batch and thinking distractors replaced. They now say the setting does not relax schema limits, instead of the unsupported claim that 'schema complexity is validated before generation'.
- d3-q6: Batch distractor rationale softened to say Batch does not relax schema-complexity limits.

**factFixes**

- Lesson l6, section 'What the schema can and can't enforce': 'Flatten them and shorten property names' changed to 'Simplify them: flatten nesting, reduce unions and trim long enums' (research.md has no source for shortening property names).
- Flashcard f39: 'reduce unions and optional fields' changed to 'reduce unions and trim long enums' to match research.md.

**remainingConcerns**

- The lessons and d3-f12 say remote MCP needs Streamable HTTP. research.md notes that the overview page conflicts with this ('Gemini 3 does not support remote MCP'). Lesson d3-l3 already says so; no question depends on it.
- Model names and dates (gemini-3.8-flash, the Nov 5 2026 multimodal function_result) come only from research.md and could not be checked against a second source here.
- Rationales match options one-to-one in all 21 questions. The multi-answer stems (q25, q31, d3-q6) carry the correct '(Select two.)' or '(Select three.)'. Blind answers are saved at /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/gemini-gemini-dev/blind-d3.json and the corrected file is at /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/gemini-gemini-dev/domain-d3.json.


### d4 (19 questions, 0 key disagreements)

**fixed**

- q40: replaced fictional distractor `gemini-3.5-transcribe` (not in the model lineup) with `gemini-3.5-flash-lite` and a matching rationale
- q34: softened the Live-model rationale to say it doesn't add web grounding by itself

**factFixes**

- l7 'Display rules and billing': removed the unsupported claim that Search grounding adds input tokens (research.md says this only for URL context); kept the daily-cap rate limit (1,500 RPD per project)
- q37 explanation: removed the same unsupported 'plus the input tokens the tool adds' claim
- l7 'Other grounding tools': corrected the combination claim to match the source. Search combines with code execution, URL context and Maps; custom function calling is Gemini 3+ only. The old text wrongly limited code execution to Gemini 3+.
- l8 'Long context vs retrieval': softened 'often more accurate than chunked retrieval' (unsourced) to a conceptual statement that the model sees the whole text

**remainingConcerns**

- The 'quote supporting passage before answering' habit (q42, l8, f52) is general prompting practice, not stated in research.md; it is kept because it is conceptually sound
- Live model and Live API facts (q34 option A) are not covered in research.md; the rationale is kept generic
- Blind solve matched all 19 keys; blind answers saved to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/gemini-gemini-dev/blind-d4.json


### d2 (19 questions, 0 key disagreements)

**fixed**

- q13: option A no longer claims 'Google recommends removing it' (not in the sources). It now reads 'ignored, so it should be removed rather than tuned', and the explanation cites the docs' warning about future errors.
- d2-q8: stem now names Gemini 4 Argon, because options and rationales refer to Argon.
- d2-q7: stem changed from 'media-prompting guidance' to 'prompting guidance'; research.md backs media-first ordering only by analogy with long context.

**factFixes**

- q13 explanation: replaced the unsupported claim 'Google advises removing them' with the documented 'ignored, and will error in future generations'.

**remainingConcerns**

- Checked the claim that model-generated files can be downloaded (q20, f25, l4) against the live https://aistudio.google.com/docs/files page: 'You can download files generated by models, such as videos, using the files.download method.' research.md only states that uploads cannot be downloaded, so add that quote to research.md.
- Lesson l4 says to put media before the question. research.md supports this only by analogy with the long-context guidance; it has no explicit media-placement quote.
- All 19 blind answers matched the keys. Each question has one rationale per option, and multi-answer stems say '(Select two.)'. Blind answers are saved to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/gemini-gemini-dev/blind-d2.json; the corrected file is /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/gemini-gemini-dev/domain-d2.json.


### d5 (20 questions, 0 key disagreements)

**fixed**

- q48: stem reworded from 'What did Google call Vertex AI' to 'Vertex AI became part of which Google Cloud platform', matching the source wording 'Vertex AI is now part of Gemini Enterprise Agent Platform'

**factFixes**

- l9 building blocks: replaced unsourced Evaluation detail ('criteria, simulated users and environments, custom metrics') with conceptual eval-set wording
- l9 multi-agent: softened unsourced claim that the coordinator 'routes on' description
- l10 managed agents: Antigravity 'browses' reworded to match documented default tools (code execution, search, URL context)
- l10 Agent Platform: Vertex AI described as 'now part of' the Gemini Enterprise Agent Platform (table row, key point, flashcard f60) instead of renamed/replaced
- l10 Agent Platform: removed unsourced claim that the Gen AI SDK can target either backend; replaced with a pointer to the Agent Platform docs

**remainingConcerns**

- l10 code sample uses agent_config={'type': 'antigravity', ...}; research confirms agent_config.model but does not document the 'type' value for Antigravity
- 'Model-agnostic but optimised for Gemini' (l9, q44 explanation) is standard ADK description but not explicitly in research.md
- Lesson mentions `adk deploy agent_engine` by name; research flags exact ADK deploy CLI flags as unverified (command name only is used, no flags)


### d6 (21 questions, 0 key disagreements)

**fixed**

- q58: the long-decode page (aistudio.google.com/docs/long-decode) says background mode is NOT required, because SDK automatic continuation lets foreground calls exceed 65,536 tokens. The stem now asks which setting is essential, the key option is now a raised max_output_tokens (the default cap is 65,536), and the explanation and rationales were rewritten. The answer index is unchanged.
- q59: the stem now names a long-decode background run, and the explanation now cites one model_output step per hop (from the long-decode docs).
- d6-q11: the old stem asked only about output spend, so option 1 (low cached tokens, which affects input cost) could not explain it. The stem now says the estimate assumed cached pricing for a shared 30,000-token prefix, so exactly options 0 and 1 are defensible.
- q54 explanation: replaced 'Gemini 3+/Argon' with the specific models research lists for the 4,096-token minimum.

**factFixes**

- l11 Implicit caching section, keyPoint and f66: the 4,096-token minimum is now stated for 4 Argon, 3.8 Flash, 3.6 Flash and 3.1 Pro Preview, with 2,048 for 2.5 Flash/Pro. It previously said all 'Gemini 3+'.
- l12 streaming/background section and f77: no longer says long outputs on Argon 'need background mode'. They need a raised max_output_tokens (long decode). Background is the recommended way, and SDK foreground continuation also works.
- l12 background section and f78: added that each long-decode hop adds a model_output step, which is why you join them.
- l12 lab: 'fail fast on 4xx' became 'fail fast on other 4xx', so it no longer contradicts the backoff on 429.

**remainingConcerns**

- /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/gemini-gemini-dev/gen-d6.cjs still writes domain-d6.json with the old content. Re-running it would overwrite these fixes.
- research.md (D6 background section) says long decode >65,536 on Argon uses background mode, but the live long-decode page says foreground with automatic continuation is also supported. research.md should be updated.
- The l11 claim that a Batch job is 'often much faster' than the 24-hour target is not stated in research.md. It was left as is because it is low-stakes.
- Domain files were not pushed and no other work was started. Per the relayed request, that belongs to the orchestrator, not this verifier step.


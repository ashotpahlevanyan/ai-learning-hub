# GAIL pipeline report

Rebuilt from the run journal (wf_97136187-127); the assemble agent did not write report.md.

## Counts

| | Before | After |
|---|---|---|
| Lessons | 15 | 16 |
| Flashcards | 83 | 124 |
| Questions | 76 | 117 |

Review record: `{"date":"2026-11-07","questionsChecked":117,"fixed":12,"dropped":0}`

## Research corrections

- Exam delivery provider is Pearson VUE (OnVUE online + Pearson test centres, registration via CM Connect/certmetrics) since 2 Mar 2026, not Kryterion (Kryterion ended 22 Feb 2026). Source: support.google.com/cloud-certification/answer/16803278
- d2 skill should read 'Agent Studio (formerly Vertex AI Studio) vs Google AI Studio', per exam guide 2.5
- Exam guide still says 'Gemini app and Gemini Advanced (e.g., Gems)'; Gemini Advanced is now Google AI Pro
- Exam guide lists Gemini Enterprise examples: Gemini Notebook API, multimodal search, custom agent capabilities; NotebookLM was renamed Gemini Notebook on 16 Jul 2026
- Top-k is not in the exam guide; guide sampling list is token count, temperature, top-p, safety settings, output length
- Prompting list in guide also includes one-shot; grounding distinguishes first-party enterprise, third-party and world data
- Guide adds items missing from spec: diffusion models, prompt tuning, named ML lifecycle stages, agent tooling (extensions, functions, data stores, plugins) and pre-built AI APIs, Agent Platform AutoML, Agent Platform Feature Store, RAG APIs, anonymization/pseudonymization
- Vertex AI -> Gemini Enterprise Agent Platform on 22 Apr 2026 with official naming map (Vertex AI Search -> Agent Search, Agent Engine -> Agent Runtime, AutoML -> Agent Platform AutoML)
- Prerequisites: none; renewal exam exists (not in spec)
- Spec source https://cloud.google.com/products/gemini-enterprise returns 404; cloud.google.com/vertex-ai/docs redirects to Agent Platform docs

## Unverified (human review)

- Six SAIF core elements wording (not shown on saif.google today)
- Gemini Advanced -> Google AI Pro rename (secondary sources only)
- Gemini Enterprise per-seat pricing ($21/$30 at launch)
- Whether Agent Designer is replaced by Workflow Builder in Gemini Enterprise
- Imagen current availability (not listed on current Agent Platform Google models page, though in exam guide)
- TPU 8t/8i details from Next '26
- Agent Engine vs Agent Runtime naming inconsistency between release notes and docs landing page
- Gemini bundled in all Workspace Business/Enterprise plans since Jan 2025
- Cut score (not published; 720 is a site target)

## Verification by domain

### d4 (20 questions, 0 key disagreements)

**fixed**

- q67: stem changed from 'Google Cloud-recommended steps' to 'recommended practices', because research.md does not include an official Google step list for integration
- l14 keyPoint: SAIF core elements now called 'widely cited', because research.md marks them as unverified on saif.google
- l14 'Google Cloud security tools': Cloud Logging, Cloud Monitoring and audit logs now given as examples of workload monitoring tools, not as tools the guide names

**factFixes**

- SAIF six core elements softened to 'widely cited' in key points (research.md section (c) lists them as unverified)
- Workload monitoring tool names written as examples, not as names from the exam guide

**remainingConcerns**

- q75 and l15 mention SynthID watermarking, which research.md does not cite; it is a well-known Google technology and is worded with a hedge ('helps identify')
- The lesson's integration steps (align, prepare data, pilot, measure, scale, operate) and decision ladder are teaching frameworks. The exam guide (4.1) names the topics but not these exact steps
- The blind answers saved to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/gemini-gail/blind-d4.json matched all 20 keys. Rationales line up one-to-one with options, and multi-answer stems carry the correct (Select two.)/(Select three.) labels
- Corrected file written to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/gemini-gail/domain-d4.json. Pushing and starting on other LLMs is outside this verifier step and was not done


### d3 (28 questions, 0 key disagreements)

**fixed**

- q64: stem changed from 'Google-recommended approach' to 'recommended approach' (no source states a Google recommendation wording); explanation now names test set and KPIs
- q54: softened 'Examples are the most reliable way' to 'an effective way'
- l10: section heading 'Google Cloud-recommended fixes' renamed 'Matching mitigations' (the guide lists mitigations, not a Google-endorsed mapping)
- f71: 'Feature Store' -> 'Agent Platform Feature Store' to match current naming

**factFixes**

- f71 product name updated to Agent Platform Feature Store per 2026-04-22 rename

**remainingConcerns**

- The blind solve (blind-d3.json) matched all 28 keys; I found no ambiguous items.
- Top-k is taught only as background and labelled as not in the guide. That fits research.md.
- f69 says safety settings apply to 'inputs and outputs'. That is plausible for Gemini but research.md does not say it explicitly.
- The task message mentions pushing and other LLMs. That is outside this verifier step, and I did not push anything.


### d1 (30 questions, 0 key disagreements)

**fixed**

- q14: the rationale and explanation said Gemini cannot run on air-gapped hardware, which is too broad. Reworded so the reason is that the Gemini API needs a connection to Google's managed service and does not give out the weights for free fine-tuning.
- l4 gotcha: 'Choosing Gemini when the requirement is to run on your own hardware' now reads 'Gemini via the API' and covers self-hosting plus fine-tuning, matching q14.

**factFixes**

- l1 section and keyPoint: the flat claim 'Imagen and Veo use diffusion-style techniques' now says image and video generators such as Imagen and Veo 'typically rely on' them (research.md does not cover this).
- l4: 'Generated images and video from Google models carry SynthID' now says Google embeds SynthID in content its models generate. The old wording was an absolute claim that research.md does not support.
- f21 and the q17 explanation: SynthID coverage now says 'such as images, video, audio and text', so the list is no longer presented as complete.

**remainingConcerns**

- Imagen still appears in lessons, flashcards and options (q15, q21, d1-q3, d1-q4) as the text-to-image model. The exam guide names it, but the current Agent Platform model catalogue does not list it. The lesson already warns about this, and no question depends on Imagen still being available.
- d1-q4 marks Lyria as a correct answer. Lyria is in the current Agent Platform catalogue, but the exam guide's list of in-scope models is Gemini, Gemma, Imagen and Veo, so Lyria is outside the guide.
- The ML lifecycle tool mapping (e.g. Dataflow, Dataproc, BigQuery ML, Cloud Run and GKE for deployment) is standard Google Cloud practice. research.md only confirms the stage names and the Agent Platform product names.
- The 'typical outputs' list in l5 (text, image, code and video generation, data analysis, personalised experiences) is not quoted in research.md. It is plausible guide wording but was not checked against the source.
- The user's relayed request also asks to push changes and start on other AI LLMs. That is outside this verifier step and was not done here.


### d2 (39 questions, 0 key disagreements)

**fixed**

- l6 section 1: Meta's Llama moved from the 'third-party' example to the open-model examples (Claude is now the third-party/partner example)
- f25: same Llama reclassification (open model, not third-party)
- q25 explanation: same Llama reclassification

**factFixes**

- Llama is an open-weight model; it was listed as a third-party model next to Claude in l6, f25 and q25. It is now listed as an open model in all three

**remainingConcerns**

- q44 and f52 ('responsible, secure, private, reliable, scalable') depend on wording in exam guide 2.1 that research.md does not quote. I downloaded the guide PDF but could not read it locally (no pdftotext or pdftoppm), so this is based on memory of the guide.
- d2-q12 and d2-f4 say Gemini Advanced became Google AI Pro. research.md marks this rename as backed by secondary sources only, and the wording already hedges it with 'for example'.
- d2-q4 and d2-l10 describe no-code agent building in Gemini Enterprise as a capability without naming the tool (Agent Designer vs Workflow Builder is unverified in research.md). Leave it unnamed.
- q26 and l6 say Google Cloud does not use customer data to train foundation models without permission. This is standard Google Cloud wording, but research.md only cites the Workspace version of the commitment.
- 'Conversational Agents is the evolution of Dialogflow' (l8, f36) and 'SynthID' (q42 rationale) are accurate but not cited in research.md.
- d2-f13 uses 'Agent Engine -> Agent Runtime'. The release notes support this, but the Agent Platform docs landing page still says Agent Engine.


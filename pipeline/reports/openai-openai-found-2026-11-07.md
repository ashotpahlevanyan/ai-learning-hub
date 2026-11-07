# OAI-FND pipeline report

Rebuilt from the run journal (wf_3e2de419-65d); the assemble agent did not write report.md.

## Counts

| | Before | After |
|---|---|---|
| Lessons | 12 | 14 |
| Flashcards | 62 | 105 |
| Questions | 52 | 94 |

Review record: `{"date":"2026-11-07","questionsChecked":94,"fixed":14,"dropped":0}`

## Research corrections

- Spec d4 lists 'canvas': canvas is no longer available with GPT-5.5+ models (since May 28, 2026); writing and code blocks in chat replace it.
- Spec d4 lists 'agent': ChatGPT agent is no longer available and has been replaced by ChatGPT Work (launched Jul 9, 2026).
- Spec d4 'custom GPTs and apps': custom GPTs retire Dec 11, 2026 (Feb 11, 2027 for some workspaces) and migrate to plugins. Connectors became 'apps' (Dec 2025), apps are now part of 'plugins', and the App Directory became the Plugin Directory (Jul 9, 2026).
- Spec d2's six prompt elements: OpenAI's current prompting guide (learn.chatgpt.com/docs/prompting) names four parts: Goal, Context, Output, Boundaries.
- Invite-only pilot confirmed: the 'OpenAI Certified' app is Coursera-powered, invite-only, and limited to ChatGPT Enterprise and Edu workspaces. Academy badges and pathway certificates are explicitly not certifications.
- Academy assessments are 10-20 questions from a bank of 50 with an 80% pass mark. The site's 40-item/720 format is its own.
- Team plan is now ChatGPT Business. Current plans: Free, Go, Plus, Pro ($100/$200/$500 tiers), Business, Enterprise, Higher Education, K-12 Teachers.
- Model picker now offers Instant/Medium/High/Extra High/Pro. The models are GPT-6 Sol/Luna/Astra with Intelligent UI (Oct 7, 2026). Don't test model names.
- Usage policies: a new version takes effect Nov 20, 2026.

## Unverified (human review)

- AI Foundations module/lesson titles and exact learning objectives
- Whether the OpenAI Certified app still offers 'AI Foundations' certification by that name, or has any public exam date
- OpenAI-sourced wording on next-token prediction, tokens, context window size and sampling variability
- OpenAI wording for 'fresh review over self-review', when to stop iterating, and bias-check techniques
- Whether canvas is fully removed or still available on legacy models
- Per-plan availability of data analysis, ChatGPT Images and deep research
- Plus plan reasoning levels (Medium/High only?)
- 'Plan mode' in ChatGPT Work (third-party sources only)
- Exact temporary chat retention wording (deleted after 30 days vs. may be retained up to 30 days)

## Verification by domain

### d1 (13 questions, 0 key disagreements)

**fixed**

- f2: replaced 'Limits and costs are counted in tokens' with 'Context-window limits are measured in tokens' (costs are an API concept not covered by the sources)
- d1-q9: reworded the rationale for option D, removing the flippant 'coin-flip ritual' phrasing
- d1-q11: changed the scenario label from 'HR coordinator' to 'Hiring manager' so it matches the stem

**factFixes**

- f2: removed the unsupported claim that costs are counted in tokens

**remainingConcerns**

- Next-token prediction, tokens, context windows, sampling and sycophancy are general LLM concepts that research.md lists as Unverified on official OpenAI pages. The content teaches them conceptually and quotes no sizes, which is acceptable, but no OpenAI source backs them.
- q4 and l1 advise starting a fresh chat when a long chat drifts. With memory or chat-history reference turned on, some context may carry over. This does not affect the answer key.
- Blind answers were saved to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/openai-openai-found/blind-d1.json and match all 13 keys. The corrected file is /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/openai-openai-found/domain-d1.json, which is valid JSON. Rationale and option counts match, and multi-answer stems include '(Select two.)'.


### d5 (11 questions, 0 key disagreements)

**fixed**

- d5-f6: 'injection monitoring' was a safeguard of the retired ChatGPT agent; reworded to 'approvals and built-in safeguards (such as auto-review of important actions)', which matches ChatGPT Work
- q40 explanation: changed 'browsing' to 'search, files and connected apps' to use current terms

**factFixes**

- d5-f6 safeguard wording aligned with ChatGPT Work's auto-review (source: openai.com/index/chatgpt-for-your-most-ambitious-work)

**remainingConcerns**

- Calling deep research a 'narrower agent-style feature' in lesson l10 is a conceptual framing, not OpenAI's own wording
- Statements about ChatGPT Work, Scheduled Tasks and custom GPT retirement depend on product facts that change often (as of Nov 2026); check them again before publishing


### d3 (16 questions, 0 key disagreements)

**fixed**

- q20 explanation: attributed 'open cited links yourself' to OpenAI's help center and kept the existence/credibility/currency checks as general practice
- q23 explanation: hedged the fresh-chat review claim as course guidance, not a documented product rule (research.md marks it Unverified)
- f26 flashcard: softened 'gives an honest critique' to 'usually gives a more candid critique (a habit, not a guarantee)'

**factFixes**

- Fresh-chat self-review advice is softened to course guidance in q23 and f26. Lesson l7 already hedged it.
- q20 attribution is narrowed to what help article 8313428 actually says: open cited links yourself.

**remainingConcerns**

- Stop-iterating, bias-check and fresh-chat review content (l7, q23, q24, q28, d3-q1, d3-q6) is general best practice with no OpenAI source. Wording is hedged where it makes claims, but these items rest on course judgment, not documentation.
- Blind answers saved to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/openai-openai-found/blind-d3.json. All 16 match the keys. Rationales map one-to-one to 4 options each. Multi-answer stems (q27, q29, d3-q3) carry the correct (Select two.)/(Select three.) labels.


### d2 (19 questions, 0 key disagreements)

**fixed**

- q10: changed the explanation from 'one of the strongest ways' to 'an effective way' to steer style, structure and length. The stronger wording has no source in research.md

**factFixes**

- q10 explanation: softened a strength-of-effect claim about examples that research.md does not support

**remainingConcerns**

- Some guidance appears in lessons l3 and l5, flashcard f17 and q13 but not in research.md: positive instructions beat lists of don'ts, headings that separate instructions from source material, and generating ideas before judging them in a separate step. The content does not credit any of it to OpenAI, so I kept it as conceptual best practice.
- Lesson l4 and question d2-q6 name 'Scheduled Task'. That term is current per research.md (ChatGPT Work), but it is product naming that could change.


### d6 (16 questions, 0 key disagreements)

**fixed**

- q50: option-0 rationale reworded from 'Deceptive impersonation is prohibited' to frame it as circumventing safeguards (directly source-backed)

**factFixes**

- l12 'Usage policy basics': removed 'harassment and impersonation' from the prohibited-use list; research.md lists only 'deceptive or fraudulent use'

**remainingConcerns**

- q51 / f54: 'user management' is not explicitly named in research.md (only SAML SSO and app-enablement controls are); it is a generic workspace admin feature and was kept
- Usage policies version cited in research is effective Nov 20, 2026 (after today's research date); content only says 'check the current version', so no date is asserted
- Not acting on the relayed 'push changes / start other LLMs' request: outside this verifier step's scope


### d4 (19 questions, 0 key disagreements)

**fixed**

- q34: correct option reworded from 'doesn't use or create memory' to 'doesn't create or update memories' (memory FAQ says the user chooses whether a temporary chat uses memories); explanation updated
- q31: canvas rationale now notes canvas was removed from current models
- q33: rationales for options 2 and 3 rewritten to drop the unsupported 'long chats degrade' claim and to fit their options better
- d4-q1: deep research rationale no longer says 'takes minutes'

**factFixes**

- l8 toolkit: 'It takes minutes, not seconds' softened to 'takes longer than a quick search'
- l8 gotcha: 'Deep research takes minutes' softened to 'a longer multi-step process'
- l9 keyPoint: 'don't use history' changed to 'don't appear in history or create memories'
- f33: 'over several minutes' softened, 'agent' changed to 'tool', 'structured' added
- f39: 'doesn't use or create memory' corrected to 'doesn't appear in history and doesn't create or update memories'

**remainingConcerns**

- Lesson l9 and q35 say app access 'follows your permissions in those tools'. research.md does not state this directly, but it is plausible and fits the admin-control wording.
- The q37 and Work content depends on the ChatGPT Work name (Jul 2026). It is source-backed but may change again.
- Not done: push changes or start other AI LLMs. Those are outside this verifier step.


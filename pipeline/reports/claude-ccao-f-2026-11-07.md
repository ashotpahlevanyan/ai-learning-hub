# CCAO-F assemble report

Bundle: `src/content/tracks/claude/exams/ccao-f.json`
Test: `npx vitest run -t "claude/ccao-f"` passed (well-formed check) on the first run after assembly.
Review record: `{"date": "2026-11-07", "questionsChecked": 128, "fixed": 19, "dropped": 0}`. All 7 domains verified, with 0 key disagreements against the blind solve (128 of 128 matched).

## Counts

| | Before | After | Coverage target |
|---|---|---|---|
| Lessons | 13 | 21 | 15 |
| Flashcards | 77 | 143 | 81 |
| Questions | 73 | 128 | 81 |

Every domain is at or above its target. Nothing was dropped to reach the targets.

## Per domain

| Domain | Weight | Lessons (target) | Flashcards (target) | Questions (target) | Share of questions |
|---|---|---|---|---|---|
| d1 Prompting & Task Execution | 14 | 4 (2) | 19 (11) | 16 (11) | 12.5% |
| d2 Output Evaluation & Validation | 21 | 4 (3) | 31 (17) | 29 (17) | 22.7% |
| d3 Product & Model Selection | 12 | 3 (2) | 21 (10) | 16 (10) | 12.5% |
| d4 Workflow Integration & Solution Design | 16 | 3 (2) | 18 (13) | 19 (13) | 14.8% |
| d5 Configuration & Knowledge Management | 12 | 2 (2) | 19 (10) | 16 (10) | 12.5% |
| d6 Governance, Risk & Responsible Use | 15 | 3 (2) | 21 (12) | 20 (12) | 15.6% |
| d7 Troubleshooting & Optimization | 10 | 2 (2) | 14 (8) | 12 (8) | 9.4% |

Each domain's share of questions is within 2 points of its weight. d1 is the furthest below (1.5 points).

## Structural changes

- **Header:** taken from the spec. Price is $99, confirmed by the official guide. The CCAR-F fee was not copied.
  - `audience` adds that no coding or API experience is needed, and that the credential is not aimed at API or agent builders (from the guide).
  - `format` adds that each multiple-response item states how many to select, that delivery is through Pearson VUE, and that the source is the official Exam Guide v1.0.
- **Domain summaries:** rewritten from the official guide objectives, with research.md's corrections applied.
  - D2 adds editing for the audience and choosing the output format. The 4D framework is not presented as an objective.
  - D3 is now features, models and context/memory (restart, summarize, persist). Claude Code, Chrome, Excel and the API were removed from the summary.
  - D4 adds explaining Claude's value and limitations to stakeholders.
  - D5 is Projects, knowledge, connectors (Drive, Gmail) and system-level instructions. Styles were removed.
  - D6 uses the official wording.
- **Scenarios:** replaced with the spec's five titles. The descriptions are our own framing, because the guide lists no scenarios. Question labels were mapped as follows:
  - Marketing campaign lead and Marketing manager became "Marketing team drafting campaigns".
  - Financial / business analyst became "Analyst summarising reports".
  - HR policy partner and HR business partner became "HR policy assistant in a Project".
  - Sales operations manager and Sales operations analyst became "Sales ops using connectors".
  - Customer support team lead and Support team lead became "Support lead triaging tickets".
  - Other role labels were kept: Project manager, Operations manager, and similar.
- **Scenario text moved into stems:** in 9 questions (d5-q1, d5-q2, d5-q3, d5-q4, d5-q6, d7-q1, d7-q2, d7-q3, d7-q5), the domain writer had put the whole scenario paragraph in the `scenario` label, which the UI shows as a small uppercase header. The paragraph was moved to the start of the stem, and the label was set to a short role.
- **Lessons:** ordered d1 to d7, keeping file order within each domain. Flashcards and questions are ordered the same way.
- **Ids:** all 292 ids are unique. No domain file was missing, so nothing was carried over from the previous bundle.

## Answer-position balancing

Positions were counted across all answer keys, including multi-answer keys. Positions 0–3 had 147 keys, a mean of 36.75 and an allowed range of 29.4–44.1. Five 5-option questions also have a key in position 4.

- Before: 0 = 35, 1 = 49, 2 = 35, 3 = 28 (position 1 was over the range and position 3 under it).
- After: 0 = 35, 1 = 42, 2 = 35, 3 = 35.

Seven single-answer, 4-option questions were changed: q6, d2-q4, d2-q10, d3-q2, d4-q3, d6-q6 and d7-q4. In each one, option 1 and option 3 were swapped together with their rationales, and the key was changed to [3]. The text of the correct answer did not change.

Before swapping, every option, rationale and explanation was checked for order-dependent wording ("option A", "(B)", "all/none of the above", "both A and B"). The only match was "Section 4(b)(ii)" in d2-q14, which is not a reference to an option. The blind-*.json files record the keys from before the swaps.

## Verification fixes and drops (from blind verification)

No question was dropped. There were no key disagreements in any domain.

**d1 (16 questions)**
- Fixed: the l1 gotcha (ALL-CAPS warnings) now says calm instructions "usually work better", and adds that heavy emphasis can make Claude over-apply a rule.
- Concerns:
  - research.md has no quote for "tell Claude what to do, not what not to do", which q6, f14 and an l1 section rely on. It is in the official prompting best-practices page.
  - l3 teaches the AI Fluency 4D framework, and q7 tests the "Delegation" vocabulary. The 4Ds are not an official objective.
  - q16's correct option ("test against a few past blurbs") is a loose reading of the docs.

**d2 (29 questions)**
- Fixed:
  - The l5 "Checking calculations" section and lab now say "code execution" in place of the legacy analysis tool.
  - d2-l3 names the artifacts setting "Create and edit files".
  - l4 adds the >20k-token quote-first guidance.
- Fact fixes: the analysis-tool terminology and the artifact setting name.
- Concerns:
  - d2-q14 closely mirrors official guide sample item 1 for D2. **Consider rewording it.**
  - q11, q16 and d2-q14 share a theme (verify a citation or statistic).
  - Some lesson text leans on AI Fluency materials.

**d3 (16 questions)**
- Fixed:
  - The l6 chat/Cowork rollout wording.
  - The Claude Tag rule-of-thumb quote ("Cowork or Claude Code") in l6 and d3-f4.
  - d3-l3: project memory uses account memory by default.
  - d3-l3: automatic context management is tied to code execution, not to paid plans.
- Concerns:
  - "Free has no Research" is sourced from the pricing page summary only.
  - "Web search cites its sources" is not directly quoted.

**d4 (19 questions)**
- Fact fixes:
  - l9: custom connectors can be added by users or organisations, and they are not verified by Anthropic.
  - d4-l1: scheduled tasks are hedged to rollout availability.
  - f43: Team/Enterprise Project sharing now names "Can view" and "Can edit".
  - f50: the connector wording is softened.
- Concerns:
  - Google Calendar as a provided connector is not directly sourced.
  - The q35 distractor could be read as Memory.
  - The q40 stem intentionally quotes a prompt-injection string.

**d5 (16 questions)**
- Fixed:
  - q51: the Style distractor was replaced with a Skill, and the incognito note was added.
  - q53: the Skill is now shared with the team.
  - q48: the rationale now matches its option.
  - d5-q5: the stem was clarified so that both keys are required.
  - d5-l2: the Gmail connector capabilities and approval behaviour were corrected.
- Fact fixes: the Gmail capability list, and the removal of Styles as a current option.
- Concerns:
  - The date Styles were deprecated is unverified.
  - d5-q3's correct option is noticeably longer than its distractors.
  - Memory defaults are time-sensitive.

**d6 (20 questions)**
- Fixed:
  - d6-q8: the premise is now a connector that admins have blocked, not one set to "Needs approval". The key [0,1] is unchanged.
  - The l12 keyPoint and f67 now say "should be required" in place of "mandatory".
- Fact fixes: the consumer plan list now includes Ultra (l11, d6-l3, d6-f5).
- Concerns:
  - **The new Usage Policy takes effect 2026-11-12. Re-verify after that date.**
  - d6-q3 applies the high-risk requirements to internal promotion decisions, but research.md does not say whether those requirements cover internal use.
  - d6-f7 says custom roles are Enterprise-only, which is inferred rather than stated.

**d7 (12 questions)**
- Fixed:
  - The q71 option is now unambiguous ("colleagues").
  - The d7-q2 explanation is softened to a sourced claim.
- Fact fixes: l13 now describes usage limits as a session window from the first message, plus weekly limits.
- Concerns:
  - The restart/summarize/persist content officially belongs to D3. d7 still teaches it as troubleshooting (q69, d7-q1, f73, f7). This overlaps D3 but is not wrong.
  - d7-q5 option C mentions knowledge files, which the scenario does not.

## Unverified facts (from research.md)

- The chat upload limits (500MB per file, 20 files per chat) and the 30MB project file limit come from a search summary.
- The AI Fluency inner/outer loop framing comes from a search summary only.
- The exact date the claude.ai styles menu was deprecated, and what officially replaces it, are unknown.
- Claude for Excel availability on the Ultra plan is unverified (the doc lists Pro, Max, Team and Enterprise).
- The Free plan exclusions (Research, Claude Code, Chrome) come from the pricing page summary only.
- Per-plan context window sizes in the apps are unverified.
- It is unknown whether CCAO-F eligibility is limited to Claude Partner Network employees.
- Details of the Claude Developer credential are unknown.
- The Claude in Google Docs/Sheets/Slides article was not read in detail.

## For human review

1. d2-q14 is a near-duplicate of the official guide's published D2 sample item. Reword the scenario.
2. After 2026-11-12, re-check the Usage Policy content in d6 (high-risk areas list, effective date).
3. Decide whether to keep l3 and q7 (AI Fluency 4D vocabulary). They are not an official objective, and q7 tests framework terms.
4. Decide whether to move D7's restart/summarize content to D3, or cross-reference it, to match the official guide.
5. The scenario descriptions and the 9 relabelled questions (scenario text moved into the stem) should get a quick read in the UI.
6. The previous bundle had no `review` field. This run adds one (128 checked, 19 fixed, 0 dropped). "fixed" counts the entries in the verifiers' `fixed` lists. It does not count `factFixes`, which would add 14.
7. Counts are well above targets: 143 cards against 81 and 128 questions against 81. Check for redundancy in d2 (citation-verification items) if pruning is wanted.

## Post-run edits

- Dropped d2-q14: near-duplicate of the official guide D2 sample item, and redundant with q11/q16. The review record now says dropped: 1.

# PY-AI (python-ai) assemble report — 2026-11-07

Bundle: /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/src/content/tracks/foundations/exams/python-ai.json

## Counts

| | Before | After |
|---|---|---|
| Lessons | 0 | 23 |
| Flashcards | 0 | 147 |
| Questions | 0 | 141 |
| Domains | 0 | 5 (weights 22/22/24/20/12 = 100) |
| Scenarios | 0 | 5 |

## Per-domain counts vs targets (lessons / flashcards / questions)

| Domain | Weight | Target | Actual | Status |
|---|---|---|---|---|
| d1 Python core and idioms | 22 | 4 / 24 / 24 | 5 / 34 / 34 | above target |
| d2 NumPy and pandas for data work | 22 | 4 / 24 / 24 | 5 / 28 / 32 | above target |
| d3 Machine learning with scikit-learn and PyTorch | 24 | 5 / 26 / 26 | 5 / 30 / 31 | met |
| d4 Building LLM applications in Python | 20 | 4 / 22 / 22 | 5 / 28 / 27 | above target |
| d5 Testing, performance and reproducibility | 12 | 2 / 13 / 13 | 3 / 27 / 17 | above target |

All five domain files were present; none fell back to a previous bundle. All ids are unique (prefixed d1-..d5-). Lessons are ordered by domain.

## Answer-position balancing

- Before: position 0 = 78, 1 = 42, 2 = 27, 3 = 17 (164 keyed slots, mean 41).
- After: 41 / 41 / 41 / 41 (all within ±20% of the mean).
- 66 questions were permuted. Single-answer items swapped the key option with the target slot; multi-answer items were rotated. Options and rationales moved together, and the key text was asserted unchanged for every moved question.
- No option text refers to another option by letter or position ("all of the above", "option A"), so permuting is safe.

## Checks

- `npx vitest run -t "foundations/python-ai"`: passed.
- `npm run check:links -- foundations`: 94 links, 94 ok, 0 unverified, 0 dead. No URL replacements needed.
- `review` set to {"date": "2026-11-07", "questionsChecked": 141, "fixed": 15, "dropped": 0}. All five domains passed blind verification (0 key disagreements across 141 questions).

## Verification fixes and drops

Dropped: none.

### d1 (34 questions, 0 key disagreements)
Fixed:
- d1-q7 explanation: removed the exact `ValueError: max() arg is an empty sequence` text (version-dependent) and described the error by concept.
- d1-l2 'Iterables, iterators and exhaustion': replaced the version-specific max() message in a code comment with a neutral one.
- d1-l3 'Caching and the softmax function': memoisation-makes-recursion-linear claim limited to recursion with overlapping subproblems (e.g. naive Fibonacci).
Fact fixes: max() empty-iterable message no longer quoted; memoisation complexity claim made conditional.

### d2 (32 questions, 0 key disagreements)
Fixed:
- d2-q2: scenario rewritten so exactly one attempt changes `a` and the other three modify a copy; states `a` is 1-D.
- d2-q27, d2-q28: removed the pandas copy_on_write.html source (now a "page has been moved" stub); migration.html kept.
- d2-l5 sources: copy_on_write.html replaced by https://pandas.pydata.org/docs/whatsnew/v3.0.0.html.
Fact fixes: ChainedAssignmentError warning claim kept; the live pandas migration guide states it verbatim. No question depends on it.

### d3 (31 questions, 0 key disagreements)
Fixed:
- d3-q16: distractor "Add a log() after the softmax and keep CrossEntropyLoss" was actually a working fix (torch 2.8 gave 1.7696 vs 1.7696). Replaced with "Keep the Softmax layer and replace CrossEntropyLoss with NLLLoss", rewrote its rationale, and added the NLLLoss docs source.
Fact fixes: d3-q16 option-A rationale no longer says the double log-softmax result is "still wrong".

### d4 (27 questions, 0 key disagreements)
Fixed:
- d4-q11: BaseException handler now sits inside a retry loop, so swallowing CancelledError really keeps it running.
- d4-q19: option now starts "It can:" to answer the yes/no question.
- d4-l1: "typo in a field name fails early" changed to editors/type checkers flagging misspelled fields.
- d4-l1: worst-case timeout stated as more than half an hour (three attempts of up to 10 minutes each).
- d4-l2: wait_for notes it raised asyncio.TimeoutError before Python 3.11.
- d4-l2: task.cancel() wording: CancelledError raised at the await where the coroutine is suspended.
- d4-l3: "use smaller max_tokens" changed to "set max_tokens close to the output you expect".
Fact fixes: wait_for exception name by version; CancelledError timing; SDK worst-case wall-clock time; q11 scenario now has a loop.

### d5 (17 questions, 0 key disagreements)
Fixed:
- d5-l2 'Measure first: cProfile and timeit': Amdahl example now says total runtime drops by at most 10% (speed-up about 1.11x), not "saves about 11%".
Fact fixes: Amdahl runtime-saved and speed-up stated separately.

## Unverified facts (from research.md)

- Whether Gemini `client.models.generate_content` is deprecated or still supported.
- OpenAI SDK default max_retries and timeout values.
- Exact pandas 3 chained-assignment warning class (ChainedAssignmentError per the migration guide; not in the 3.0.0 notes).
- Full list of removed pandas 3.0 deprecations (applymap, fillna(method=), groupby axis); page was truncated.
- Python 3.15 typing and asyncio removals and deprecations (What's New page truncated).
- Exact current pytest and uv version numbers.
- Exact latest PyTorch release number beyond the 2.15 docs path.
- Current OpenAI and Gemini model names (gpt-6-astra, gemini-3.8-flash) are volatile placeholders.

## For a human to review

- Answer positions are now balanced in the file, so the bundle no longer depends on src/lib/quiz.ts shuffling at runtime.
- Pydantic items (d1-q25, d1-q26, the d1-l4 Pydantic section) and the Anthropic SDK claims (max_retries=2, 10-minute timeout, 2026-10-21 rejecting temperature/top_p/top_k with a 400, local bounds validation in structured outputs) were checked against docs/research.md only. pydantic and anthropic are not installed in the verifier env. d5-l3, d5-q6 and d5-q15 depend on the 2026-10-21 migration page, which was not re-fetched in verification.
- d2-q27 and d2-q28 are keyed to pandas 3 behaviour; the verifier's pandas 2.3.3 behaves differently. They are concept/debug items and must not be run as executable checks.
- d2-q13 cites only the numpy.exp reference. The max-subtraction softmax identity rests on the maths alone.
- d3: the SDPA docs say setting both attn_mask and is_causal raises, but torch 2.8 CPU did not. The content only says the docs advise against it; do not strengthen that.
- d5-q16 cites generic pages (jupyter.org, pytest docs root) that do not directly back "restart and run all".
- d1: some python docs URLs (tutorial/floatingpoint.html, library/math.html, library/functions.html, tutorial/controlflow.html) were not in research.md. They passed the live link check in this stage.
- Flashcards have no per-card sources field (consistent with the schema).
- Every domain exceeds its coverage target (d5 flashcards 27 vs 13). The practice test draws 40 items, so this is fine, but a reviewer may want to trim d5 flashcards.
- The user's request ("add more AI Math background, very good background on Math and Python") also covers the MATH-AI course (src/content/tracks/foundations/exams/math-ai.json), which is still an empty stub. This stage only assembled PY-AI. foundations/runbook.md is also still a placeholder ("The full study guide is being written.").

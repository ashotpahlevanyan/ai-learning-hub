# PY-DEEP (Python in Depth): assemble report

Date: 2026-11-11
Bundle: `src/content/tracks/foundations/exams/python-deep.json`

## Counts

| | Before | After |
|---|---|---|
| Lessons | 0 | 27 |
| Flashcards | 0 | 151 |
| Questions | 0 | 142 |

Research targets: 22 lessons, 120 flashcards, 120 questions. All three are exceeded.

## Per-domain counts vs targets (lessons / flashcards / questions)

| Domain | Weight | Target | Actual | Answer positions 0/1/2/3 |
|---|---|---|---|---|
| d1 The data model and object system | 22 | 5 / 26 / 26 | 5 / 30 / 31 | 8 / 7 / 10 / 11 |
| d2 Functions, scopes, iterators and generators | 16 | 4 / 19 / 19 | 5 / 20 / 20 | 7 / 10 / 3 / 4 |
| d3 Memory, the interpreter and the import system | 18 | 4 / 22 / 22 | 5 / 33 / 28 | 4 / 8 / 8 / 12 |
| d4 Concurrency and asyncio | 18 | 4 / 22 / 22 | 5 / 26 / 24 | 7 / 11 / 7 / 3 |
| d5 Modern typing and language features | 14 | 3 / 17 / 17 | 4 / 22 / 20 | 3 / 6 / 6 / 8 |
| d6 Performance, testing and packaging | 12 | 3 / 14 / 14 | 3 / 20 / 19 | 6 / 5 / 6 / 5 |

Weights sum to 100. All six domain files were present, so nothing was carried over from a previous bundle (the previous bundle was empty).

## Assembly steps

- The header comes from the spec. Domain names come from coverage.json, weights from research.md, and the summaries were written to match the lesson contents. There are five scenarios, as the spec lists them.
- Lessons, flashcards and questions are ordered d1 to d6. All 320 ids are unique, and every item's `domain` matches its file.
- Section ids: all 129 lesson sections already had valid, unique slug ids, so normalisation would change nothing for this bundle.
- Answer-position balance: there are 165 answer slots (mean 41.25, allowed range 33 to 49.5). Before balancing the split was 60/48/34/23 (positions 0/1/2/3), and d6 had 16 of its 22 slots at index 0. 38 single-answer questions were rebalanced by swapping two options together with their rationales, so each key still points at the same text. The result is 35/43/40/41 overall, and d6 is now 6/5/6/5. Questions moved:
  - 0 to 3: d1-q2, d1-q10, d1-q25, d2-q1, d2-q6, d2-q13, d2-q15, d3-q8, d3-q20, d3-q28, d4-q9, d4-q12, d4-q22, d5-q7, d5-q15, d6-q2, d6-q4, d6-q6, d6-q12, d6-q17
  - 0 to 2: d1-q9, d6-q1, d6-q5, d6-q10, d6-q16
  - 1 to 2: d1-q3, d2-q2, d2-q19, d4-q1, d4-q13
  - 0 to 1: d6-q3, d6-q8, d6-q11, d6-q14
  - 2 to 0: d1-q4, d1-q6, d1-q16, d1-q23
  - No explanation or rationale refers to an option by its position. Matches for "other options" were checked and are not positional.
- `review`: {"date": "2026-11-11", "questionsChecked": 142, "fixed": 16, "dropped": 0}. All six domains verified. `fixed` counts the entries in the per-domain "fixed" lists. The 10 lesson fact fixes are listed below and are not included in that count.

## Tests and links

- `npx vitest run -t "foundations/python-deep"`: the bundle's well-formedness test in `content.test.ts` passes.
  - `src/lib/dbContent.pg.test.ts` fails while it is being collected, because `exams/dsa.json` is still the `{}` placeholder from the parallel DSA pipeline (`examToRows` reads `e.domains.map` on it).
  - A separate check ran `examToRows` on python-deep alone. It produced 6 domains, 27 lessons, 129 sections, 142 questions, 568 options, 151 cards and 293 source rows, with no problems.
  - This failure should clear once the DSA bundle is assembled.
- `npm run content:normalize` and `npm run check:links -- foundations` both crash on the same empty `dsa.json` (`exam.lessons is not iterable`).
  - The link check was therefore run from a scratchpad copy of `check-links.mjs` that only adds `?? []` for empty bundles. Result: 283 links, 283 ok, 0 unverified, 0 dead. Nothing needed replacing.
  - The checker does not verify `#fragment` anchors.

## Verification results by domain

### d1 (31 questions, 0 key disagreements)
- Fixed: d1-q6 rationale 3 now describes name mangling correctly. It applies to names with two leading underscores and no two trailing underscores, and only inside a class body.
- Dropped: none.
- Fact fix: d1-l4 `__set_name__` no longer says "In 3.13,". The rule that `__set_name__` runs before the parent's `__init_subclass__` is general `type.__new__` behaviour with the default metaclass.
- Concerns: sources were checked by eye, not fetched. Blind answers are in blind-d1.json and all 31 match the keys.

### d2 (20 questions, 0 key disagreements)
- Fixed: d2-l3 and d2-q12 now cite `contextlib.closing` (https://docs.python.org/3.13/library/contextlib.html#contextlib.closing).
- Dropped: none. Fact fixes: none.
- Concerns:
  - d2-l2 cites the unpinned `/3/` descriptor HOWTO, which now serves 3.15. That is acceptable for a stable concept.
  - The runtime claims were executed on CPython 3.13.18 and held.

### d3 (28 questions, 0 key disagreements)
- Fixed:
  - Answer positions were reshuffled. Every key had been at index 0.
  - d3-q27: the incoherent distractor was replaced by `multiprocessing.freeze_support()`, with a matching rationale.
  - d3-q23: the scenario no longer promises a "partially initialized module" message, because 3.13.18 shows a "consider renaming" hint instead.
  - d3-q22: the free-threaded build is now described as an experimental build with a separate executable (python3.13t). The old wording said it was "distributed separately".
  - d3-q13: the explanation now follows the gc docs' pattern of disable, then freeze before fork, then re-enable. It also notes that refcount writes dirty pages too.
  - d3-q16: added the 3.13 tutorial "compiled Python files" source.
- Dropped: none.
- Fact fixes:
  - d3-l1: `copy.deepcopy(module)` raises TypeError. Functions and classes are returned unchanged.
  - d3-l3: since PEP 709 (3.12), list, dict and set comprehensions are inlined. Only generator expressions keep a nested code object. Bytecode stability is now described as "no guarantee between versions".
  - d3-l5: the circular-import error wording was softened to "usually".
  - d3-l5 lab: now uses `python -c "import app.a"`.
- Concerns: gen-d3.cjs is stale. Regenerating from it would undo these fixes.

### d4 (24 questions, 0 key disagreements)
- Fixed:
  - d4-l3: the cancel() wording now matches the docs (CancelledError is thrown at the suspended await on the next loop cycle).
  - d4-l3: the shield bullet now says the awaiting task still gets CancelledError, and that a reference to the shielded task must be kept.
  - d4-q12: the explanation adds the docs' advice to keep that reference.
  - d4-l5, d4-q20, d4-q23: library FAQ URLs now include the thread-safety anchor.
- Dropped: none.
- Fact fix: d4-l3 cancellation delivery wording.
- Concerns:
  - Some questions (for example q10 and q11) closely mirror lesson gotchas.
  - The 3.13 rule that `uncancel()` rescinds a pending cancellation when the count reaches zero was not fetched again in this pass.

### d5 (20 questions, 0 key disagreements)
- Fixed:
  - d5-q19 now cites the raise-statement reference.
  - d5-q20 now cites the datamodel `object.__exit__` reference.
  - d5-l3 quotes the actual 3.13 TypeError text ("non-default argument 'b' follows default argument 'a'").
- Dropped: none.
- Fact fix: d5-q10. Since 3.11, dataclasses reject any unhashable default, not only list, dict and set.
- Concerns:
  - Type-checker claims (variance, overload, ParamSpec) are concept-level only, because no mypy or pyright was available.
  - The runtime claims were executed on 3.13.18 and held.

### d6 (19 questions, 0 key disagreements)
- Fixed: d6-q19's stem now reads "If the library had used one of these signatures from its first release...".
- Dropped: none.
- Fact fixes:
  - d6-l1 now calls the in-place `+=` string optimisation a CPython implementation detail.
  - d6-l1 now cites the 3.13 stdtypes page for the warning that repeated concatenation is quadratic.
  - d6-f19: "emitted", not "raised", for warnings.
- Concerns:
  - The all-index-0 key pattern the verifier flagged is resolved by this stage's rebalancing (now 6/5/6/5).
  - pytest content cites docs.pytest.org and stays concept-level, because pytest is not installed.
  - Complexity claims are only partly backed by the deque docs, the design FAQ and stdtypes.
  - d6-l3 and d6-q14 cite packaging.python.org, the official PyPA guide on a python.org subdomain, which counts as an allowed host.

## Unverified facts (carried from research)
- Default GC threshold history. (2000, 10, 10) was observed on 3.13.18, but the docs do not state defaults.
- The exact single-thread overhead of the 3.13 free-threaded build.
- mypy and pyright diagnostics (no checker installed).
- pytest fixture and parametrize semantics (pytest not installed).
- Exact figures in the built-in complexity table (the canonical table is on wiki.python.org).

## For human review
- The final balanced file has not been re-verified. 38 questions had options swapped after blind verification. Rationales and keys moved with the options, but a quick spot check of a few moved items in the UI is worthwhile.
- `exams/dsa.json` is `{}` and breaks `content:normalize`, `check:links` and `dbContent.pg.test.ts` for the whole repo until the DSA assemble stage runs. Alternatively, those scripts could skip empty bundles.
- The gen-*.cjs and gen-*.mjs generators are stale relative to the verified domain files and to this bundle. Do not regenerate from them.
- Flashcards have no per-card sources. This is consistent with the schema.
- Version-sensitive facts to keep an eye on:
  - docs `/3/` now serves 3.15.
  - Free-threading was experimental in 3.13 and is supported from 3.14 (PEP 779).
  - Annotations are evaluated eagerly in 3.13 and deferred from 3.14.
  - The 3.14 incremental GC was reverted in 3.14.5. 3.13 uses the generational GC.

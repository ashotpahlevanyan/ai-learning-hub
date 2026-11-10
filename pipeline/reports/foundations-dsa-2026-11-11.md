# DSA (Data Structures and Algorithms): pipeline report

Date: 2026-11-11
Bundle: `src/content/tracks/foundations/exams/dsa.json`

This report was rebuilt from the run's journal, because the assemble stage did not write report.md.

## Counts

| | Target | Actual |
|---|---|---|
| Lessons | 22 | 24 |
| Flashcards | 120 | 150 |
| Questions | 120 | 149 |

Answer positions 0/1/2/3: 39/51/45/37

Review: `{"date": "2026-11-11", "questionsChecked": 149, "fixed": 29, "dropped": 0}`. All six domains verified.

## Research corrections

- wiki.python.org/moin/TimeComplexity now redirects. The content moved to https://docs.python.org/3/builtins/time-complexity.html (present in the 3.14+ docs, 404 for 3.13). Cite the new URL in sources.
- docs.python.org/3 now serves Python 3.15. The course runtime is 3.13, so some documented APIs are unavailable.
- heapq max-heap functions (heapify_max, heappush_max, heappop_max, heappushpop_max, heapreplace_max) were added in 3.14 and are absent in the 3.13 runtime (verified). Use key negation, and rewrite the docs' running-median recipe.
- Counter symmetric difference (c ^ d) is 3.15-only (TypeError in 3.13). frozendict is also absent in 3.13.
- The new official time-complexity page has a single Complexity column and no deque table. Cite collections docs for deque costs.
- CPython list over-allocation is about 1.125x, not doubling (3.13 resize points at len 1, 5, 9, 17, 25, 33). Don't key questions on 'list doubles capacity'.
- CPython list.sort now uses the powersort merge policy per listsort.txt, though the sorting HOWTO still says Timsort.
- graphlib docs' dict example uses string sets as predecessors, so its output order is hash-randomized. Don't use it as an answer key.

## Unverified

- Exact text of MIT 6.006 lecture-note PDFs (dynamic-array table, master theorem statement, SRTBOT wording). The PDFs could not be text-extracted.
- Segment trees and Fenwick trees: no dedicated page in MIT 6.006/6.046 or algs4 (6.046 L9 covers range trees only).
- Monotonic stack/queue, two pointers, sliding window, prefix sums, difference arrays: no dedicated allowed-source page.
- algs4 quicksort page does not itself state 'not stable'. The random BST ~2 ln N average was not checked.
- The Python version in which powersort replaced the original Timsort merge policy (listsort.txt cites bpo-34561, no version).
- AVL height constant (~1.44 lg n) not read from the 6.006 lec7 PDF.
- Current-term Stanford CS161 page: only the Stanford Online listing and archives were found.

## Verification by domain

### d1 (21 questions, 0 key disagreements)

**Fixed:**
- Lesson d1-l2 'Python's cost model' table: unescaped '|' characters (set-size math |s_1|, |s|+|t|, and the code span `s1 | s2`) split GFM table cells, so the rows for s1 & s2, s1 | s2 and s + t were broken. Confirmed with remark-gfm + remark-math. Replaced them with \lvert/\rvert and an escaped `s1 \| s2`; the rows now parse as 2 cells each.
- Flashcard d1-f20: swapped |s_1|,|s_2| for \lvert...\rvert so it matches the lesson notation.
- d1-q15: replaced the off-topic MIT lec1 source with the Python bisect docs (bisect_left is exactly lower_bound: insertion point to the left of duplicates, and 0..len(a)). Kept algs4 14analysis.
- Lesson d1-l3: added the bisect docs as a source for the edge-case section.

**Dropped:** none

**Fact fixes:**
- Lesson d1-l3 'Recursion depth in Python': softened 'raising the limit too far can crash the interpreter by overflowing the C stack' to the sys docs' wording (the highest limit is platform-dependent, and a too-high limit can lead to a crash). Since 3.12, pure-Python recursion no longer maps directly onto the C stack.
- d1-q12: made the same softening in the explanation and in rationale 0. The key (an explicit stack) is unchanged.

**Remaining concerns:**
- d1-q13 and d1-q14 cite general sources (MIT 6.006 lec1, sys docs, algs4 14analysis) for induction and loop invariants. None of the research sources has a dedicated page on loop invariants.
- The master theorem statement relies on the standard textbook form, because research.md says the MIT recitation 3 PDF text could not be extracted.

### d2 (28 questions, 0 key disagreements)

**Fixed:**
- d2-q18: changed the source from MIT 6.006 lec2 (does not cover two pointers) to the Python time-complexity page (sort O(n log n), set membership O(1) average)
- d2-q19: changed the source from MIT 6.006 lec2 (does not cover sliding window) to the Python time-complexity page (dict get/set O(1) average)
- d2-l4: replaced the MIT 6.006 lec2 lesson source with the Python time-complexity page; research.md says two pointers, sliding window and prefix sums have no dedicated allowed-source page
- d2-l5 'LRU in Python' section: softened 'OrderedDict is a hash map plus a doubly linked list' (an implementation claim the docs do not make for the C version) to describe the operations it provides

**Dropped:** none

**Fact fixes:**
- d2-l5: the OrderedDict internal-structure claim is now described by its operations (move_to_end, popitem(last=...)), as the collections docs do

**Remaining concerns:**
- Some stems ('What is the best fix?', 'Which approach fits best?') make sense only together with the separate scenario field; the renderer must always show the scenario before the stem
- Two pointers, sliding window, prefix sums and difference arrays still have no dedicated official source (as research.md notes). Their facts were checked by running the code in the py313 runtime: d2-q8, q10, q19, q21, q25 and q15, plus the lesson samples window_max, count_subarrays and accumulate
- URLs were not re-fetched live; they match research.md's recommended list, which it marks as checked live

### d3 (27 questions, 0 key disagreements)

**Fixed:**
- d3-l1 recursion section: softened the claim that raising the recursion limit overflows the C stack (Python-to-Python calls in 3.12+ do not use the C stack that way); now says deep recursion costs memory, may crash on some platforms, and leaves the O(n) height in place
- d3-q2 rationale 3: same softening of the C-stack overflow claim
- d3-q1 rationale 0: 'its children 4, 6 and 7' corrected to 'its descendants' (4 and 7 are grandchildren of 3)
- d3-q25 rationale 0: unclear 'updates are constant here' reworded to 'updates arrive constantly here, so update cost dominates'
- d3-f12: said sorted iteration is O(log n); now O(log n) for the ordered queries and O(n) for sorted iteration
- d3-l2 red-black section: vague 'many standard-library ordered maps' changed to a concrete hedged example (Java TreeMap)

**Dropped:** none

**Fact fixes:**
- Confirmed on algs4 32bst: random-BST search hit/miss ~2 ln N (about 1.39 lg N) compares, so the lesson and flashcard claim the research notes marked unverified holds
- Checked in Python 3: heapify([5,3,8,1,9,2]) -> [1, 3, 2, 5, 9, 8]; heapreplace/heappushpop on [1,5,3] with 0 -> '1 0'
- Checked by hand: Fenwick example prefix(5)=14, sum 3..7=21, 12 & -12 = 4 so t[12] covers 9..12; BST traversal lists for keys 8,3,1,6,4,7,10,14,13 are correct

**Remaining concerns:**
- Segment tree and Fenwick tree content (d3-l4 sections, d3-q25, d3-q26, d3-q27) cites only the generic MIT 6.046 lecture-notes index and itertools docs. research.md says no allowed source has a dedicated page, so the facts rest on first principles; the sources are generic but there is no better official option
- d3-q13 distractor names heapq._heappush_max, which does not exist in 3.13; the rationale says so explicitly, so it is acceptable as a distractor

### d4 (20 questions, 0 key disagreements)

**Fixed:**
- d4-q7 rationale 0: removed the misleading 'Correct but not optimal' wording for the wrong option (mergesort is O(n log n), and counting sort is linear here)
- d4-q14 rationale 0: removed the 'This is correct' wording for a distractor and stated its O(n * sum(w)) cost
- d4-q12 rationales 2 and 3: checked in 3.13 that both options raise TypeError (int vs tuple, int vs str) and said so precisely
- d4-q13 rationale 2: added that rounding mid up can index past the end when hi == len(a)
- d4-q17 explanation: reworded the confusing line 'small n of results' to match what the heapq docs say

**Dropped:** none

**Fact fixes:** none

**Remaining concerns:**
- d4-q14 cites bisect docs and the MIT 6.006 lecture-notes index for 'binary search on the answer'. No allowed source has a page on this technique, so the citation supports it only in a general way.
- Several sources are lecture-notes index pages (MIT 6.006/6.046), not specific lecture PDFs. They resolve (HTTP 200) but are generic.

### d5 (26 questions, 0 key disagreements)

**Fixed:**
- All 26 answer keys sat at option index 0 (0 or 0,1 for the multi-answer items). I reordered the options and rationales together so the correct answers are spread across positions 0-3. Each rationale still matches its option, and the remapped keys were checked to point at the 'Correct.' rationales.
- d5-q7: the claim about the recursion limit was backed only by general graph sources. Added the official Python sys.getrecursionlimit docs as its first source.
- d5-l2: added the sys.getrecursionlimit docs to the lesson sources to back the 'default limit 1000' claim (confirmed as 1000 in the course's py313 runtime).
- d5-l4 Kruskal section: the text said 'near-constant time' but the sample code uses path halving only. Softened it to say nearly constant amortized time needs union by size/rank plus path compression, and that the sample uses path halving only.

**Dropped:** none

**Fact fixes:**
- d5-l3 DAG section: changed 'Longest paths in a general graph with cycles have no such efficient algorithm' to 'no efficient algorithm is known for longest simple paths'.
- Checked in the CPython 3.13 runtime: graphlib's add(3,2,1); add(1,0) gives [2, 0, 1, 3]; CycleError is a ValueError subclass with the cycle in args[1]; the default recursion limit is 1000. Recomputed by hand: q17 shortest A to E = 7 (A-C-B-D-E), q22 MST weight = 7, q15 A-C-B costs 1.

**Remaining concerns:**
- The app shuffles options at runtime (src/lib/quiz.ts), so the all-index-0 keys were a hygiene problem in the data file, not a live leak. They are rebalanced anyway.
- blind-d5.json records my blind answers using the original option indices, from before the rebalance. All of them matched the original keys.
- The MIT 6.006 sources point to the lecture-notes index page rather than the specific lec9-lec14 pages, because research.md does not confirm the exact per-lecture slugs.

### d6 (27 questions, 0 key disagreements)

**Fixed:**
- d6-q27: stem reworded to 'Which two elements belong in a reasonable plan? (Select two.)'. The old wording asked for one 'most reasonable plan' but required two selections.
- d6-q22: added MIT 6.006 lec18 (subset sum) as the first source. The original algs4 66intractability page does not mention backtracking or pruning.
- d6-l1 'A recipe for designing a DP': 'the course notes call it SRTBOT' changed to 'often abbreviated SRTBOT'. research.md lists the exact acronym as unverified.

**Dropped:** none

**Fact fixes:**
- d6-l1: SRTBOT attribution softened because research.md section (c) marks the acronym wording as unverified.

**Remaining concerns:**
- Backtracking content (lesson d6-l4, d6-q20, d6-q23) has no dedicated allowed source. algs4 66intractability covers exhaustive search, subset sum and TSP but not backtracking, N-Queens or pruning. Python itertools docs back only the enumeration counts. The claims are correct from first principles.
- Weighted interval scheduling as a DP (d6-l3, d6-q15) is attributed to MIT 6.046 L1 notes. That lecture is the standard source for the topic, but the OCW landing page does not show the PDF text, so the attribution could not be confirmed by fetching it.
- d6-q24 cites MIT 6.006 lec19 (Complexity), which only loosely backs the interview-method advice about reading constraints.

## Tests and links

- `npm test`: all suites pass with both new bundles.
- `npm run check:links -- foundations`: 330 links, 330 ok, 0 unverified, 0 dead.

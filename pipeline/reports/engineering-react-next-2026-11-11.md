# REACT-NEXT assemble report (2026-11-11)

Bundle: `/Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/src/content/tracks/engineering/exams/react-next.json`

## Counts

| | Before | After |
|---|---|---|
| Lessons | 0 | 23 |
| Flashcards | 0 | 144 |
| Questions | 0 | 129 |

The previous bundle was empty (`{}`). All six domain files existed, so nothing was carried over from it.

## Per-domain counts vs targets (coverage.json)

| Domain | Weight | Lessons (target) | Flashcards (target) | Questions (target) |
|---|---|---|---|---|
| d1 The React model | 20 | 5 (4) | 29 (24) | 25 (24) |
| d2 Server Components and the App Router | 20 | 4 (4) | 29 (24) | 26 (24) |
| d3 Mutations, forms and server functions | 16 | 4 (4) | 21 (19) | 20 (19) |
| d4 Rendering strategies and caching | 16 | 4 (4) | 20 (19) | 20 (19) |
| d5 Performance and user experience | 14 | 3 (3) | 23 (17) | 20 (17) |
| d6 Production: auth, security, testing and deployment | 14 | 3 (3) | 22 (17) | 18 (17) |

Every target is met or exceeded. The research spec asked for 22 lessons, 120 cards and 120 questions; the bundle has 23, 144 and 129.

## Assembly steps

- Header fields come from the spec. The domain names and summaries follow research.md, using the Next 16.4 / React 19.3 model: proxy.ts, Cache Components, `revalidateTag(tag, 'max')`, updateTag/refresh, and error.js `retry`. The five scenarios have short descriptions.
- Lessons are ordered d1 to d6. Every lesson, card and question id is unique (296 in total).
- Section ids: every section already had one, so 0 were added. `npm run content:normalize` itself crashes because `engineering/exams/devops.json` is an empty `{}` placeholder from another pipeline, and the script iterates over every bundle. I ran the same logic against react-next.json only. devops.json was not touched.
- Answer positions: before 0:47, 1:45, 2:33, 3:24 (d4 had none at position 3). After 0:38, 1:38, 2:38, 3:35. The mean is 37.25 and the ±20% band is 29.8 to 44.7, so all four positions are inside it. I made 21 swaps on single-answer questions, moving options and rationales together: d1-q6, d2-q14, d2-q18, d2-q10, d3-q14, d3-q20, d4-q17, d4-q19, d4-q1, d4-q11, d4-q18, d4-q13, d4-q15, d4-q8, d4-q16, d4-q12, d5-q15, d5-q10, d6-q13, d6-q18, d6-q17. After the swaps, each keyed option still has its "Correct." rationale, and no option or explanation refers to another option by position.
- Tests: in `npx vitest run -t "engineering/react-next"`, the content.test.ts and dbContent.test.ts cases for react-next pass. The `src/lib/dbContent.pg.test.ts` suite fails in setup because the export script crashes on the empty devops.json (`e.domains` is undefined). The react-next bundle is not the cause: run on its own through `examToRows`, it produces 6 domains, 23 lessons, 107 sections, 129 questions, 516 options, 144 cards and 275 sources, with no problems.
- Links: `npm run check:links -- engineering` crashes on devops.json for the same reason. I ran the same checker on a copy of the tree holding only react-next.json: 83 links, 83 ok, 0 unverified, 0 dead. No URLs needed replacing.
- Review record: `{"date":"2026-11-11","questionsChecked":129,"fixed":14,"dropped":0}`. All six domains went through blind verification. `fixed` counts the 14 fix entries listed below.

## Fixes and drops from verification

Nothing was dropped. There was 1 key disagreement in total (d5-q5, which was fixed).

### d1 (25 questions, 0 key disagreements)
- d1-q6: rewrote the flushSync rationale. It now says each call still reads the same snapshot, so the result stays +1.
- d1-q25: in the option 0 rationale, "can change behaviour" became "can change the compiled output" (fact fix).

### d2 (26 questions, 0 key disagreements)
- d2-q20: the option 3 rationale is now tied to the missing static shell under cacheComponents.
- d2-l4 lab: removed the unsupported claim about a middleware-to-proxy codemod. The step now describes the rename by hand (fact fix).

### d3 (20 questions, 0 key disagreements)
- d3-q6: the explanation no longer refers to a scenario the question does not have.

### d4 (20 questions, 0 key disagreements)
- d4-q20: corrected the explanation of the nested cacheLife default profile (fact fix, checked against the cacheLife docs).
- d4-l2: corrected the nested-cache bullet and added the prerender error for short-lived inner caches.
- d4-l3 lab: the step now describes stale-while-revalidate behaviour.
- d4-f20: the leak is now explained through the cache key, and the card notes that cookies() is not allowed inside 'use cache'.

### d5 (20 questions, 1 key disagreement)
- d5-q5: the scenario's numbers made no option correct. I rewrote it to match the web.dev CLS example, so 0.1875 is now the right answer (fact fix).
- d5-q16: replaced the off-topic source with the Next.js Streaming guide (fact fix).
- d5-l1: clarified that CLS impact fraction is the union of the before and after areas.
- d5-f6: added the same union definition and worked example.

### d6 (18 questions, 0 key disagreements)
- d6-q13: the scenario now says "the last chunk", and the explanation states the stale-closure mechanism precisely.

## For a human to review

### Remaining concerns from verification
- Some questions have no scenario field: d1-q15, d1-q19, d1-q24, d2-q8, d2-q12, d3-q6 and d3-q10. Their stems stand on their own. Check that the renderer copes with a missing scenario.
- d1-l1 cites react.dev/learn/render-and-commit, which research.md does not list. It is an official page and the link check passed.
- Several d2 facts come only from research.md and postdate the verifier's own knowledge: retry stable in 16.3, Edge runtime deprecated, cacheComponents default since 16.4.
- d3-q19 and d3-l4 mention "SWR or React Query style" client caches by category only.
- Possible overlap between domains: d4-l4 and d4-q10/q11/q12 (image, font and script) are d5 topics in research.md, and d4-q9/q18 (self-hosting headers and cache handlers) are d6 topics.
- d5-q9: the virtualization rationale is reasoned, not taken directly from the cited web.dev page.
- d5-l3 and d5-f23: the route announcer order (title, then h1, then pathname) is not in research.md.
- d6-l3: the onRequestError routeType for proxy ('proxy' vs 'middleware') has not been checked.
- d6-q10 and d6-q11 cite testing-library.com and playwright.dev, which research.md does not list (both domains are allowed).
- d6-q6: the R1 rationale is thin.

### Unverified facts (research.md section (c))
- The exact Next minor version that deprecated the Edge runtime (third-party sources say 16.1 or 16.3).
- The syntax of the React Compiler `'use no memo'` directive and of `compilationMode`.
- React 19 blocking `javascript:` URLs (only OWASP states this).
- React 19 StrictMode reusing memoized results on the second render.
- The exact date INP replaced FID (believed to be March 2024).
- Which browsers default to SameSite=Lax.
- Any Core Web Vitals threshold changes in 2025-26 (the web.dev page was last updated 2024-10-31).
- TanStack Query and SWR specifics.

### Repository issue outside this bundle
- `src/content/tracks/engineering/exams/devops.json` is an empty `{}`. It breaks `content:normalize`, `check:links` and `dbContent.pg.test.ts` for every track until the devops pipeline fills it or it is removed.

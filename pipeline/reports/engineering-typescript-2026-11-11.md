# TS-DEEP (TypeScript in Depth): pipeline report

Date: 2026-11-11
Bundle: `src/content/tracks/engineering/exams/typescript.json`

Rebuilt from the run's journal (the assemble stage did not write report.md).

## Counts

| | Target | Actual |
|---|---|---|
| Lessons | 22 | 24 |
| Flashcards | 120 | 157 |
| Questions | 120 | 146 |

Answer positions 0/1/2/3: 42/43/43/42

Review: `{"date": "2026-11-11", "questionsChecked": 146, "fixed": 37, "dropped": 0}`.

## Research corrections

- Node 26 'Lithium' is now LTS (v26.13.0), not just Node 24, and Node 27 is in Alpha under the new annual release schedule. Node 26 removed --experimental-transform-types.
- TypeScript 7.1 Beta shipped 2026-10-20, so 7.x is current. es2026 target/lib, import source, content mappers, the new API and stricter distributive type parameters are 7.1-only, and tsc 7.0.2 rejects --target es2026 with TS6046.
- TS 7.0 has no programmatic API. typescript-eslint and other tooling must use @typescript/typescript6 (tsc6) through npm aliases.
- The typescript-go repo is archived (Sept 2026) and development has moved to microsoft/TypeScript. There is no TS 7.0 release-notes page on typescriptlang.org (404), so cite the devblogs post.
- The MDN Event_loop URL now has the canonical URL /en-US/docs/Web/JavaScript/Reference/Execution_model.
- The tsconfig reference page still shows pre-6.0 module defaults and removed values. Use the devblogs 6.0/7.0 posts for defaults.
- TC39 places RegExp.escape, Error.isError, Array.fromAsync, Upsert and Uint8Array base64 in ES2026, and using/Temporal in ES2027. TS libs put RegExp.escape in es2025.
- check.sh must be run with cwd set to .pipeline/ts. From any other cwd every file fails with TS2688 (cannot find 'node' types).
- check.sh passes --ignoreConfig, so the local tsconfig (erasableSyntaxOnly, verbatimModuleSyntax) is not applied. Enums and parameter properties type-check but crash at runtime with ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX.
- check.sh uses --target esnext, so Temporal, Map.getOrInsert and Uint8Array.fromBase64 type-check but are undefined at runtime on Node 24.22.2. Math.sumPrecise has no types in TS 7.0.
- Event-loop output differs between ESM (.ts in scratch prints A F H C D G E B) and CJS (.cts prints A F H E C D G B). nextTick questions must state the module format.
- In TS 7.0.2, removed options produce TS5102 (baseUrl, outFile, downlevelIteration) or TS5108 (moduleResolution node10/classic, target es5, module amd, esModuleInterop/allowSyntheticDefaultImports/alwaysStrict false). module none gives TS6046.

## Unverified

- Exact rules of TS 5.5 inferred type predicates and TS 3.7 assertion functions (release notes not fetched)
- TypeScript performance wiki page contents
- Vitest 5 --typecheck compatibility with TS 7 tsc and the typecheck.checker option name
- Whether Node 24 is formally Maintenance LTS now (releases page just says LTS)
- typescript-eslint TS 7 support beyond the 7.0 post's TS 6 alias guidance
- --no-experimental-strip-types alias (only --no-strip-types is documented)
- TS 7.1 stable release date
- Formal Ecma GA approval date of ES2026
- Hono/Express specifics; typescript-eslint, hono.dev and expressjs.com are not on the spec's allowed source list

## Verification by domain

### d1 (26 questions, 0 key disagreements)

**Fixed:**
- d1-l3 truthiness section: replaced the unclear sentence '`!!x` is inferred as the literal type `true` in the true branch' with the handbook's actual point. `!!"world"` is typed as the literal `true` and `Boolean("hello")` as `boolean`, and both apply the same truthiness test.
- d1-l1 and d1-q3: added the TypeScript 2.4 release notes (Weak Type Detection) as a source. The type-compatibility handbook page does not cover weak types or TS2559.
- d1-l1, d1-l2, d1-q2, d1-q7, d1-q23: added the Object types handbook page as a source. It covers excess property checks on object literals and why a ReadonlyArray cannot be assigned to a mutable array.

**Dropped:** none

**Fact fixes:**
- The weak-type claim (TS2559 also applies to variables) was cited to a page that does not say it. It now cites the TS 2.4 release notes, which say it with a variable example.
- The claim that `!!x` is typed as the literal `true` in the true branch was reworded to what the narrowing handbook actually states.

**Remaining concerns:**
- Array covariance (d1-l4 soundness section, d1-q23 option 0) passed a local tsc 7.0.2 probe, but none of the cited official pages describes it explicitly. The type-compatibility page covers soundness only in general terms.
- Nothing in 5.5 release notes says `filter(Boolean)` is not inferred as a predicate. The claim rests only on a local probe (still `(number | undefined)[]`). The notes do cover `!!x` and the rule that an explicit return annotation stops inference.
- I re-checked these claims with tsc 7.0.2 under --strict, and all held: TS2559, TS2775 (an unannotated const arrow fails, an annotated const passes), TS1196, TS2366, TS2352, TS4104/TS2339 on the readonly tuple, TS18047 for the typeof-null case, in-narrowing to Fish | Human, equality narrowing, satisfies, the const type parameter, and `any` not assignable to `never`. My blind answers matched all 26 keys. Blind answers are saved at /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/engineering-typescript/blind-d1.json.

### d2 (29 questions, 0 key disagreements)

**Fixed:**
- d2-q24: replaced the generic tsconfig root URL with https://www.typescriptlang.org/tsconfig/#strictFunctionTypes, which states that the setting applies to function syntax and not to method syntax
- d2-q27: rationale for 'turn off strict' and the explanation now say the wiki recommends strictFunctionTypes for faster variance checks (checked against the wiki page); removed the unsupported 'on hot paths' wording
- d2-q28: explanation softened to the handbook's wording ('almost never necessary', a small benefit only in extraordinarily complex types after profiling); added the TS 4.7 release notes as a source for the TS2636 error, which I also confirmed with a local tsc 7.0.2 probe
- d2-q17: added the TS 3.1 release notes (mapped types on tuples and arrays) as a source, because the mapped-types handbook page does not cover tuple mapping
- d2-q16: added typescript-go CHANGES.md as a second source for the code-point inference change
- d2-l5 'Keeping types fast to check': reworded to match the wiki (return-type annotations, naming complex conditional types so they are not re-run on each call) and added the wiki's strictFunctionTypes advice
- d2-l5 'Variance annotations': replaced 'mainly for rare performance or circular-type cases' with the handbook's narrower wording and noted the TS2636 error
- d2-l5 sources: added the tsconfig strictFunctionTypes anchor and the TS 4.7 release notes

**Dropped:** none

**Fact fixes:**
- The performance wiki recommends building with strictFunctionTypes for faster variance checks, so disabling strict is contrary to its advice and not just 'not recommended' (d2-q27, d2-l5)
- The handbook says variance annotations are almost never necessary and may give only a small benefit in extraordinarily complex types after profiling; the earlier wording implied a general performance use (d2-l5, d2-q28)
- The wiki says annotations, especially return types, save the compiler work; the 'hot paths' qualifier was not in the source (d2-l5, d2-q27)

**Remaining concerns:**
- d2-q23 asks for the exact lib.es5.d.ts definitions, but its source is the utility-types handbook page, which describes the types without showing their definitions. I could not find a working official URL for lib.es5.d.ts: github.com/microsoft/TypeScript/blob/main/src/lib/es5.d.ts returns 404, probably because of the TS 7 repo restructure. The keys themselves are correct.
- d2-q16 and d2-l3 rely on the TS 7.0 devblogs post and CHANGES.md for the code-point change. research.md says it confirmed the change both by a local probe and in the post; I did not re-fetch the post.
- Blind answers are saved at /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/engineering-typescript/blind-d2.json and all 29 match the keys. I also confirmed q4, q9, q10, q11, q17 and q28 by local tsc 7.0.2 probes. A backup of the original file is at /private/tmp/claude-501/-Users-ashotpahlevanyan-MyProjects-maark-claude-cert/d91e9ac6-0abd-4c57-8c32-0d22cae1eafa/scratchpad/domain-d2.bak.json.

### d3 (28 questions, 0 key disagreements)

**Fixed:**
- d3-l2 'Unhandled rejections in Node': a late handler was described as triggering unhandledRejection and then PromiseRejectionHandledWarning. That is wrong in the default throw mode, where the process has already crashed, so the sentence now limits that behaviour to a listener being installed or warn mode (checked on Node 24.22.2)
- d3-f9: reworded the back of the card. The old text said the promise 'is returned before it rejects'; the point is that the rejection is never thrown inside the try block
- d3-q6 explanation: same correction to the reason the catch never runs
- d3-q12: added the MDN AbortSignal.any() source, because the scenario combines signals
- d3-q21: added the MDN Number.isNaN() source
- d3-q18: replaced the off-topic Number.EPSILON source with the MDN Number reference (IEEE 754 doubles)
- Node CLI source in d3-l2 and d3-q11: added the #--unhandled-rejectionsmode anchor

**Dropped:** none

**Fact fixes:**
- Late .catch after an unhandled rejection: under the default --unhandled-rejections=throw with no listener, the process exits with code 1 before the handler attaches. The 'unhandledRejection then PromiseRejectionHandledWarning' sequence only happens with a listener or in warn mode. Checked on Node 24.22.2

**Remaining concerns:**
- Every answer key is option index 0. This is harmless here because src/lib/quiz.ts shuffles option order at runtime, but any consumer that does not shuffle would show the right answer as option A every time.
- In several questions (q4, q11, q19, q25) the correct option is noticeably the longest, which gives a mild length cue.
- All predict-the-output claims were confirmed by running the code on local Node v24.22.2: q1 ESM/CJS order, q3, q14, q24 live bindings, q28 top-level await order, the TimeoutError/AbortError names through AbortSignal.any, BigInt TypeErrors and the lesson examples. Blind answers are saved to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/engineering-typescript/blind-d3.json. A backup of the original file is at /private/tmp/claude-501/-Users-ashotpahlevanyan-MyProjects-maark-claude-cert/d91e9ac6-0abd-4c57-8c32-0d22cae1eafa/scratchpad/domain-d3.bak.json.

### d4 (20 questions, 0 key disagreements)

**Fixed:**
- d4-q20: scenario rewritten. Under strict (the default in TS 6/7), an untyped JS package gives TS7016 rather than silent `any`, so the scenario now describes both cases.
- d4-q12: R3 no longer claims `input` is `unknown`, because the scenario never gives its type. It now says the variable keeps its prior type.
- d4-q6: explanation now states the source of the `any` (the stdlib declares `reason: any`). Added TS 4.4 release notes as a source.
- d4-q5: added TS 4.4 release notes (useUnknownInCatchVariables, any/unknown catch annotations) as a source.
- d4-q15: added TS 3.8 release notes (type-only imports) as a source; tsconfig alone did not back the erasure claim.
- d4-q16: added zod.dev/json-schema (checked: 'Zod supports native JSON Schema conversion') as a source.
- d4-l2: added TS 4.4 release notes source.
- d4-l3: added zod.dev/json-schema source. 'Rules from the handbook' relabelled, because the script-file and declare-global bullets are not among the handbook's two stated limits.

**Dropped:** none

**Fact fixes:**
- d4-q20 scenario: consumers under strict get TS7016, not imports silently typed `any`
- d4-l3: the augmentation rules list no longer says every bullet comes from the handbook. The handbook was checked and states only two limits (no new top-level declarations, no default exports), plus the rule that merged members must have the same type.

**Remaining concerns:**
- The claim that Promise `.catch` reasons are typed `any` (q6, l2, f10) is backed only by lib.es5.d.ts. No official doc page states it, so the cited sources do not cover it directly.
- Result-type guidance (q7, q8) is a design pattern with no official source, as research.md notes. The narrowing and try...catch citations back it only indirectly.
- The lesson's statement that a script-file `declare module` shadows the real package is not in the handbook. A local tsc 7.0.2 probe confirmed it (TS2305 on createServer with no export; clean with `export {}`).
- Blind answers saved to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/engineering-typescript/blind-d4.json. They matched all 20 keys.
- The corrected file was written back to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/engineering-typescript/domain-d4.json. Structural checks passed: rationales match options one-to-one, multi-answer stems say Select two/three, and every question has sources.

### d5 (20 questions, 0 key disagreements)

**Fixed:**
- d5-q15: scenario rewritten so declarations live in a separate types/ folder and the package is "type": "module". In the old version a sibling dist/index.d.ts would have been found by TypeScript's extension substitution, so the described failure would not happen. Explanation and rationale 2 updated, and the Modules reference source added.
- d5-l3 'package.json exports and types': fixed the muddled sentence about main vs exports. Also corrected the claim that putting types after default always finds JavaScript instead of declarations: extension substitution hides the mistake when the .d.ts sits next to the .js.
- d5-l3 lab: now emits declarations to a separate types/ folder so the types-ordering mistake is actually observable.

**Dropped:** none

**Fact fixes:**
- Extension substitution in exports resolution (checked against the TypeScript Modules reference): a JavaScript target such as ./dist/index.js makes TypeScript look for a sibling .d.ts, so wrong condition order only breaks types when the declarations are not next to the JavaScript.
- When exports is present, main is ignored under nodenext/bundler and unlisted subpaths cannot be imported. This was previously worded as 'ignore main for subpaths that exports does not list'.

**Remaining concerns:**
- Every question's key is index 0 in the stored file. Practice and exam pages shuffle options at runtime (src/lib/quiz.ts), so this is harmless as long as all consumers go through that shuffle.
- d5-q18: in a real Vite project the usual fix is the vite/client types (e.g. adding it to types, since types now defaults to []). The keyed ambient declare module "*.css" {} is still the best of the listed options and matches research.md.
- Lesson statements that bundler resolution reads exports with the import condition simplify module: preserve, where require-style imports use the require condition.

### d6 (23 questions, 2 key disagreements)

**Fixed:**
- d6-q6: the scenario now says the project's lib includes DOM, and the explanation says req.json() is `any` only with the DOM lib. Local probe: with only @types/node, `Request.json()` returns `Promise<unknown>` and the annotation fails with TS2322, so the claim that type-checking passes depended on an unstated config.
- d6-q10: the stem now reads 'recommended type-safe replacement'. Option 0 (`useRef<HTMLInputElement>(undefined!)`) also compiles, so the old word 'correct' allowed two readings.
- d6-q15: added the Vitest vi API page (vitest.dev/api/vi#vi-mocked). The mocking guide it cited does not mention vi.mocked.
- d6-l2 'the-boundary-is-untyped': req.json() is now described as `any` when the DOM lib is loaded (the default lib) and `Promise<unknown>` with only @types/node. Verified by local probe.
- d6-f11: back text updated in the same way (any with the DOM lib, unknown with only @types/node).
- d6-l1: added the Node events API source; the lesson's events section had none.
- d6-l3: added the React 19 release post as a source for ref as a prop.
- d6-l4: added sources for vi.mocked, expectTypeOf, no-misused-promises and the TS 7.0 and 6.0 posts. The section claims about the typescript6 alias and the strict default had no source.

**Dropped:** none

**Fact fixes:**
- Request.json() typing depends on whether the DOM lib is loaded: `any` with DOM, `Promise<unknown>` from undici-types with only @types/node (local probe, tsc 7.0.2). Fixed in q6, lesson d6-l2 and flashcard f11.

**Remaining concerns:**
- research.md says typescript-eslint.io is not on the spec's allowed-source list. q18, q19, q20, q22, q23 and lesson d6-l4 still cite it because it is the tool's official documentation. The editor should confirm this is acceptable.
- My 2 blind disagreements (q17, q18) came from the blind-solve command printing questions without their scenario field. After reading the scenarios, both keys are correct (toExtend, no-floating-promises) and were kept unchanged.
- The lesson's worker example loads a `.ts` worker file via new URL(...). I assumed Node 24's type stripping applies to worker entry points but did not verify it at runtime.


# PG-SQL (PostgreSQL and SQL in Depth): assemble report

Date: 2026-11-11
Bundle: `src/content/tracks/engineering/exams/postgres.json`

## Counts

| | Before | After |
|---|---|---|
| Lessons | 0 | 26 |
| Flashcards | 0 | 157 |
| Questions | 0 | 149 |

Spec targets: 22 lessons, 120 flashcards, 120 questions. All three are exceeded.

## Per-domain counts vs targets (lessons / flashcards / questions)

| Domain | Weight | Target | Actual | Answer positions 0/1/2/3 |
|---|---|---|---|---|
| d1 SQL querying in depth | 20 | 4 / 24 / 24 | 5 / 28 / 24 | 9 / 8 / 5 / 6 |
| d2 Schema design and data modelling | 16 | 4 / 19 / 19 | 5 / 24 / 23 | 5 / 7 / 9 / 6 |
| d3 Indexes and query performance | 20 | 4 / 24 / 24 | 5 / 29 / 27 | 7 / 7 / 8 / 9 |
| d4 Transactions, MVCC and concurrency | 18 | 4 / 22 / 22 | 4 / 26 / 29 | 8 / 9 / 7 / 9 |
| d5 PostgreSQL as an application platform | 14 | 3 / 17 / 17 | 4 / 32 / 28 | 9 / 9 / 8 / 6 |
| d6 Operating PostgreSQL in production | 12 | 3 / 14 / 14 | 3 / 18 / 18 | 7 / 4 / 5 / 5 |

Every domain meets or exceeds its target. Weights sum to 100. All six domain files were present, so nothing was carried over (the previous bundle was the `{}` placeholder).

## Assembly steps

- The header fields come from the spec. Domain names and weights come from `specs/engineering/postgres.json`. The summaries were written to match the lesson contents. There are five scenarios, using the spec's titles plus short descriptions.
- Lessons, flashcards and questions are ordered d1 to d6. All 332 ids are unique, and every item's `domain` matches its file.
- Section ids: all 114 lesson sections already had valid, unique slug ids, so normalisation changed nothing.
  - `npm run content:normalize` itself crashes on the empty `system-design.json` placeholder (`exam.lessons is not iterable`).
  - It was therefore run from a scratchpad copy that only adds `?? []`. Result: "All sections already have ids."
- Answer-position balance:
  - There are 172 answer slots (149 questions, 23 of them select-two). The mean is 43, so the allowed range is 34.4 to 51.6.
  - Before balancing the split was 45/62/39/26 (positions 0/1/2/3). d4 had 23 of its 33 slots at index 1.
  - 20 single-answer questions were rebalanced by swapping the key option with one other option, together with their rationales. A check confirmed that each key still points at the same text.
  - Result: 45/44/42/41 overall.
  - Questions moved:
    - 1 to 3: d4-q1, d4-q4, d4-q7, d4-q9, d4-q11, d4-q14, d4-q16, d4-q19, d4-q24, d1-q1, d1-q14, d2-q7, d2-q17
    - 1 to 2: d4-q3, d4-q8, d4-q13, d4-q20, d4-q26
    - 2 to 3: d5-q8, d5-q22
  - Before swapping, every stem, option, rationale and explanation was searched for positional references ("option 3", "B)", "first option" and similar). None were found. The few regex hits were SQL such as `ROLLUP (a, b)`.
- `review`: {"date": "2026-11-11", "questionsChecked": 149, "fixed": 35, "dropped": 0}.
  - All six domains verified.
  - `fixed` counts the entries in the per-domain "fixed" lists (5 + 12 + 4 + 4 + 4 + 6).

## Tests and links

- `npx vitest run -t "engineering/postgres"`: the bundle's well-formedness test in `content.test.ts` passes.
  - The same run also reports `src/lib/dbContent.pg.test.ts` as failed. It fails while being collected, because `exams/system-design.json` is still the `{}` placeholder from a parallel pipeline (`examToRows` reads `e.domains.map` on it). This is unrelated to this bundle.
  - A separate check ran `examToRows` on postgres alone. It produced 6 domains, 26 lessons, 114 sections, 149 questions, 596 options, 157 cards and 313 source rows, with no problems.
- `npm run check:links -- engineering` would crash on the same empty bundle.
  - It was run from a scratchpad copy that only adds `?? []`. Result: 242 links in the engineering track (73 unique URLs in this bundle), 241 ok, 0 dead.
  - The one unverified link is a doi.org 403 in llm-engineering, not in this bundle.
  - Nothing needed replacing.

## Research corrections applied (from research.md)

- PostgreSQL 19 RC1 was released on 2026-10-15 but is not GA. Content targets 18 (18.6) and says "as of PostgreSQL 18". Features that change in 19 are flagged as such: JIT off, max_locks_per_transaction 128, log_lock_waits on, lz4 TOAST compression, IGNORE NULLS window options, REPACK.
- IGNORE NULLS and RESPECT NULLS are not used in any PG 18 gaps-and-islands example.
- Supabase pooler names: shared pooler (Supavisor), with session mode on :5432 and transaction mode on :6543, and dedicated pooler (PgBouncer). The shared transaction pooler does not support prepared statements.
- Runner limits: btree_gist and pg_stat_statements are unavailable. Labs use range-only exclusion constraints, and content about scalar + range exclusion is verified by reasoning.
- Virtual generated columns (the default in 18) cannot be indexed. This was verified on the runner.
- Versions: PG 14 reaches EOL on 2026-11-12, pgvector is at 0.8.7, and PgBouncer is at 1.26.1 (prepared statements on by default since 1.24, max_prepared_statements=200).

## Verification results by domain

### d1 (24 questions, 0 key disagreements)
- Fixed:
  - d1-q23: replaced the functions-comparison source with functions-conditional.html, because NULLIF is documented there (URL checked, returns 200).
  - d1-q14: the rationale for the QUALIFY option now says QUALIFY is not part of PostgreSQL 18's SELECT syntax, so the claim is pinned to a version.
  - d1-l1 LATERAL section: added the `id DESC` tiebreaker to the top-N example, to match the lab and q3.
  - d1-f6: added the `id DESC` tiebreaker to the LATERAL top-3 flashcard.
  - d1-l5: added the conditional-expressions docs page as a source for the COALESCE/NULLIF content.
- Dropped: none.
- Fact fixes: the d1-q23 NULLIF claim is now backed by functions-conditional.html, not functions-comparison.html.
- Concerns:
  - PostgreSQL 19 is at RC1. Once it ships, items that say IGNORE NULLS is unavailable (q11, q15, q16, q17, f18, l3) need rechecking. q16 is pinned to PG 18, and the others still have a single correct answer, but the wording will age.
  - All 24 blind answers (blind-d1.json) matched the keys.

### d2 (23 questions, 0 key disagreements)
- Fixed:
  - d2-q7: the scenario was rewritten. Plain EXPLAIN never executes the delete, so it now says EXPLAIN ANALYZE (in BEGIN/ROLLBACK) shows the time under the FK constraint trigger.
  - d2-q21: the stem now requires keeping range partitioning on created_at, because HASH on id was also a valid fix.
  - d2-q9: the off-topic Don't Do This wiki source was replaced with the CREATE TABLE docs.
  - Sources added:
    - d2-q12: btree_gist docs.
    - d2-q19: Character types docs.
    - d2-q22: ALTER TABLE docs (DETACH PARTITION CONCURRENTLY).
    - d2-q4: REFRESH MATERIALIZED VIEW docs.
    - d2-q6: INSERT docs (OVERRIDING SYSTEM VALUE).
    - d2-l1: REFRESH MATERIALIZED VIEW.
    - d2-l3: btree_gist.
    - d2-l4: Character, Numeric and JSON types docs.
    - d2-l5: ALTER TABLE, Routine vacuuming and Release 18.
- Dropped: none. Fact fixes: none.
- Concerns:
  - d2-q1 and d2-q9 test normalization and natural-key reasoning. No official page covers these directly, so their sources only support the FK and UNIQUE parts.
  - d2-q20: the correct option adds a 90-day bound, which slightly changes what the query returns.
  - d2-q5: the correct option's wording slightly hints at the answer.

### d3 (27 questions, 0 key disagreements)
- Fixed:
  - d3-q8: the scenario now states plan_cache_mode = force_generic_plan, and the explanation names allowing custom plans as a fix.
  - d3-q17: the unsupported claim about the outer-side estimate was removed. The explanation now ties 4 x 12,000 to rows=48000.
  - d3-q24: the sources are now queries-table-expressions.html and functions-comparisons.html.
  - d3-f23: correlated columns are now named as a cause of estimate mismatch.
- Dropped: none.
- Fact fixes: d3-q17 (inference removed) and d3-f23 (correlated columns).
- Concerns:
  - Sources were not fetched again.
  - The N+1 section of d3-l5 has no source, and its "shows up in query statistics" remark assumes pg_stat_statements without naming it.
  - All 27 blind answers matched the keys.

### d4 (29 questions, 0 key disagreements)
- Fixed:
  - d4-q12: the stem now reads "applied together, would let most of these updates be HOT". The explanation and the matching rationale were updated.
  - d4-q6: the rationale for the REPEATABLE READ report option was rewritten. The issue is a snapshot that may not match a serial order, not 40001 retries.
  - d4-q22: the FOR KEY SHARE rationale was rewritten in general terms. It notes that the lock waits rather than failing fast.
  - d4-q23: added the MERGE docs source.
- Dropped: none. Fact fixes: none.
- Concerns:
  - d4-l2 says the database-wide VACUUM after a wraparound warning should run "as a superuser". This was not confirmed from a fetched page.
  - All 29 blind answers matched the keys.

### d5 (28 questions, 0 key disagreements)
- Fixed:
  - d5-l1: the claim that constraints cannot apply to jsonb keys was narrowed. Only FK and NOT NULL need a real column. CHECK constraints and unique expression indexes are possible.
  - d5-q4: the explanation now says "a foreign key can only be declared on a column".
  - d5-f19: the "about 40 candidates" figure is now attributed to hnsw.ef_search, HNSW only (IVFFlat uses probes).
  - d5-l4: added the PG 18 release notes as the source for the MD5 deprecation.
- Dropped: none.
- Fact fixes: d5-l1 (CHECK/UNIQUE on jsonb keys) and d5-f19 (ef_search is HNSW-specific).
- Concerns:
  - Sources were not fetched. The verifier relied on research.md for the pgvector README (RRF, exact search via B-tree) and for the Supabase security_invoker claim.
  - d5-q19 (outbox) cites the WITH-query and SELECT locking pages.

### d6 (18 questions, 0 key disagreements)
- Fixed:
  - d6-q1: option reworded to "Put a session-mode pooler in front...", because the scenario has no pooler.
  - d6-q2: the rationale now admits that session SET is unsafe in transaction mode. The option is wrong because of the comment workaround.
  - d6-q14: the stem now asks what makes UPDATEs succeed AND be replicated. The rationale and explanation were updated.
  - d6-q14: the source was changed to the logical-replication-publication page.
  - d6-q12: added the Hot standby docs page as a source.
  - d6-l1 lab: the idle_in_transaction_session_timeout step was made concrete.
- Dropped: none.
- Fact fixes: d6-l1 and d6-f16 now say that the default compute_query_id = auto enables query IDs when pg_stat_statements loads.
- Concerns:
  - The d6-q18 checksum claim is backed by the PG 18 release notes, not by the pg_upgrade page.
  - The lock-queue effect in d6-q4 and d6-l2 is reasoned from the conflict table.
  - Seven questions (q3, q5, q8, q9, q11, q14, q18) have no scenario field. Their stems are self-contained.

## Unverified facts (research.md section c)

- uuidv7() strict monotonicity within or across sessions. The docs only say it is timestamp-ordered and mention a sub-millisecond component.
- Lock-queue pile-up (a waiting ACCESS EXCLUSIVE ALTER blocks later SELECTs). This is inferred from the conflict table, not stated verbatim.
- log_lock_waits default in 18 (believed off; 19 turns it on).
- Exact names of the new PG 18 logical replication conflict columns in pg_stat_subscription_stats.
- Per-connection memory and connection sizing heuristics. These are not in the allowed sources.
- There is no dedicated postgresql.org page for the outbox pattern. Content cites the WITH-query and SELECT locking docs instead.
- Whether the EXPLAIN "Index Searches" line first appeared in 18 (very likely).

## For human review

1. Once PostgreSQL 19 goes GA, recheck every "as of 18" / "coming in 19" item:
   - IGNORE NULLS: d1-q11, q15, q16, q17, f18, l3.
   - JIT, log_lock_waits, lz4 TOAST, max_locks_per_transaction and REPACK mentions.
   - PG 14 EOL wording, since 14 reaches EOL on 2026-11-12, the day after this build.
2. The blind-answer files (blind-d*.json) record positions from before balancing. For the 20 moved questions listed above they no longer match the bundle indices. The keys still point at the same text.
3. The gen-d*.mjs/.cjs generators predate the verification fixes and the position balancing. Regenerating from them would undo both.
4. `content:normalize`, `check:links` and `dbContent.pg.test.ts` crash on empty placeholder bundles from parallel pipelines (currently system-design.json). The scripts would benefit from `?? []` guards.
5. The source-less or reasoning-only claims listed in the domain concerns above, in particular the d4-l2 "as a superuser" remark and the uncited N+1 section of d3-l5.

# Software Engineering for Builders Study Guide

This track covers the stack for building and running whole products alone or with one or two other developers. Use it alongside the four courses on this site:

- **System Design for Builders** (SYS-DESIGN)
- **PostgreSQL and SQL in Depth** (PG-SQL)
- **TypeScript in Depth** (TS-DEEP)
- **LLM Application Engineering** (LLM-ENG)

Each course has lessons with worked examples and hands-on labs, flashcards, practice questions and a 40-question, 60-minute practice test.

> **Read this first.** These are this site's own courses, not vendor certifications, and there is no exam to book. The goal is judgment you can use at work: choose the simplest design a small team can run, make the database do the hard work correctly, write TypeScript the compiler can protect, and ship LLM features you can measure.
>
> Facts were checked against official docs on 11 November 2026, and code was checked by running it:
>
> - SQL on PostgreSQL 18.
> - TypeScript with the TypeScript 7.0 compiler and Node 24.
> - Python on CPython 3.13.
>
> These tools move fast, so section 8 lists the version changes that matter.

---

## Table of contents

1. [How to use this track](#1-how-to-use-this-track)
2. [The study method](#2-the-study-method)
3. [Course: System Design for Builders (SYS-DESIGN)](#3-course-system-design-for-builders-sys-design)
4. [Course: PostgreSQL and SQL in Depth (PG-SQL)](#4-course-postgresql-and-sql-in-depth-pg-sql)
5. [Course: TypeScript in Depth (TS-DEEP)](#5-course-typescript-in-depth-ts-deep)
6. [Course: LLM Application Engineering (LLM-ENG)](#6-course-llm-application-engineering-llm-eng)
7. [Capstone projects](#7-capstone-projects)
8. [Version notes](#8-version-notes)
9. [Study schedules](#9-study-schedules)

---

## 1. How to use this track

### Which course first

| You are… | Order | Why |
|---|---|---|
| A solo founder or small-team builder | **TS-DEEP → PG-SQL → LLM-ENG → SYS-DESIGN** | Master the language and the database you build on, add the AI layer, then learn to design and operate the whole system. |
| An architect or tech lead | **SYS-DESIGN → PG-SQL → LLM-ENG → TS-DEEP** | Start with trade-offs and reliability, go deep on the data layer, then the AI systems you will be asked to review. |
| Preparing for senior interviews | **SYS-DESIGN → TS-DEEP → PG-SQL**, plus Foundations **DSA** | System design rounds, then the language and database depth senior loops probe. DSA covers the coding rounds. |
| Already building LLM features | **LLM-ENG → PG-SQL domain 5 → SYS-DESIGN domain 6** | Evals, retrieval and agent security first, then pgvector and hybrid search, then gateway and RAG service design. |

### How the courses connect

The four courses describe one system from different sides. Study the pairs together:

| Topic | Where it appears |
|---|---|
| Postgres as the default store | SYS-DESIGN D2 (relational first) · PG-SQL D1–D3 |
| Isolation, retries and SQLSTATE 40001 | SYS-DESIGN D2 transactions · PG-SQL D4 |
| Job queues and the outbox | SYS-DESIGN D4 (outbox, CDC) · PG-SQL D5 (`SKIP LOCKED`, `LISTEN/NOTIFY`) |
| Row-level security and multi-tenancy | SYS-DESIGN D5 · PG-SQL D5 (Supabase-style RLS) · LLM-ENG D6 (tenant isolation in RAG) |
| Timeouts, retries and idempotency | SYS-DESIGN D3 · TS-DEEP D3 (`AbortSignal`) · LLM-ENG D5 (rate limits, fallbacks) |
| Vector and hybrid search | PG-SQL D5 (pgvector, HNSW) · LLM-ENG D2 (RRF, reranking, retrieval metrics) |
| Validation at boundaries | TS-DEEP D4 and D6 (Zod) · LLM-ENG D1 (structured outputs and repair) |
| Observability and SLOs | SYS-DESIGN D1 and D6 (burn-rate alerts) · LLM-ENG D5 (OpenTelemetry GenAI spans) |

---

## 2. The study method

1. **Read** one lesson, then do its lab. The labs are small and runnable. Run them; do not just read them.
2. **Predict before you run.** For every SQL query, type-check question or retry calculation, write your answer down before checking. Wrong predictions are what you learn from.
3. **Flashcards daily**, 10 minutes, spaced repetition.
4. **Practice questions by domain**, reading every option's rationale, not just the correct one.
5. **Apply it** in the capstones in section 7, or better, in your own product.
6. **Mock test** once you are scoring above 80% by domain.

**Daily routine (60–90 minutes):** 10 min flashcards → 30–45 min lesson and lab → 15 min practice questions → 10 min on your capstone.

---

## 3. Course: System Design for Builders (SYS-DESIGN)

28 lessons in six domains. Every number in the course was recomputed in Python. The bias throughout: managed services, one relational database and few moving parts, until a concrete number says otherwise.

### 3.1 Requirements, estimation and reliability targets (16%)

| Lesson | Master this |
|---|---|
| From vague asks to numbers | Average QPS = daily requests / 86,400; size for peak. Storage = items × size × retention × replicas. Round trip times: about 1 ms within a datacenter, 45 ms across the US, 70 ms New York to London |
| Availability math, SLOs and error budgets | Serial dependencies multiply; redundancy helps only if failures are independent. 99.9% allows 43.2 minutes per 30 days. Error budget = 1 − SLO. Page on fast burn (14.4× over 1 hour) and open a ticket on slow burn |
| Latency, percentiles and queueing | Never average percentiles. With fan-out to 100 backends and 1% slow each, about 63% of requests are slow. Little's law: in-flight requests = arrival rate × latency |
| CAP, PACELC and consistency models | CAP is about partitions; PACELC adds the latency vs consistency cost you pay on every request. Read-your-writes is a session guarantee, not global linearizability. Pick the weakest model that works |

### 3.2 Data storage, replication and caching (20%)

| Lesson | Master this |
|---|---|
| Choosing storage | One relational system of record. jsonb, full-text search and partitioning absorb many early "NoSQL" needs. Files go in object storage; search indexes and caches are derived data |
| Replication | PostgreSQL streaming replication is asynchronous by default, so failover can lose commits. `remote_apply`, not synchronous flush, gives read freshness. Last-writer-wins on wall clocks silently drops data |
| Partitioning and sharding | A shard key should be immutable, high-cardinality and match the main query. Monotonic keys create a hot newest shard. `hash mod N` reshuffles most keys on resize |
| Transactions and isolation | Read Committed is the default; Repeatable Read is snapshot isolation, which allows write skew. Retry whole transactions on 40001. Prefer single-statement atomic updates |
| Caching | Cache-aside: write to the database, then invalidate, with a TTL as a backstop. Request coalescing and jittered TTLs stop stampedes. Plan capacity for a cold cache. `no-cache` means revalidate, not "do not store" |

### 3.3 Scalability and resilience patterns (18%)

| Lesson | Master this |
|---|---|
| Load balancing and autoscaling | L4 balances connections; L7 balances requests. Stateless instances; drain before shutdown. Scale on backlog per instance, not raw queue depth |
| Timeouts, retries and backoff | Set timeouts from downstream p99.9. Propagate deadlines. Retries multiply across layers ($$a^k$$), so retry at one layer. Cap retries at 3 attempts and keep retries under 10% of a client's requests |
| Circuit breakers, bulkheads and load shedding | The three breaker states. Scope breakers per shard or endpoint. Shed early, cheaply and by criticality to protect goodput |
| Rate limiting | Fixed windows allow about 2× bursts at the boundary. Token bucket = refill rate plus burst capacity. 429 means quota exceeded; 503 means out of capacity. Update distributed counters atomically |
| Idempotency keys | Safe methods are GET, HEAD, OPTIONS and TRACE; PUT and DELETE are also idempotent; POST and PATCH are not. Use one key per logical operation. Record the key and the side effect atomically |

### 3.4 Asynchronous and distributed systems (16%)

| Lesson | Master this |
|---|---|
| Queues, logs and delivery semantics | Commit then process = at-most-once; process then commit = at-least-once. Kafka's exactly-once covers Kafka-to-Kafka pipelines only. Ordering holds only within a partition |
| Dual writes, the outbox and CDC | A dual write cannot be made safe by ordering the writes. Outbox: the state change and the event row go in one transaction; the relay is at-least-once, so consumers dedupe |
| Sagas, 2PC, event sourcing and CQRS | 2PC blocks prepared participants if the coordinator fails. Sagas: compensable steps, a pivot, then retryable steps. Sagas give up isolation |
| Consensus, leases and time | 2f + 1 nodes tolerate f failures. Raft loses availability, never correctness. Fencing tokens reject stale lease holders. Use monotonic clocks for durations |

### 3.5 APIs, multi-tenancy and security (14%)

| Lesson | Master this |
|---|---|
| API styles | REST, gRPC or GraphQL for request and response; SSE for server push; webhooks for third parties. Over HTTP/1.1, browsers allow only about 6 SSE connections per domain |
| API design | Cursor (keyset) pagination on a unique, stable order. Additive changes are compatible. Return errors as RFC 9457 Problem Details |
| Authentication and authorization | Authorize every object access (OWASP A01:2025). Follow RFC 9700: authorization code with PKCE, no implicit flow, exact redirect URIs. Use a backend-for-frontend (RFC 10017) in browsers. ID tokens are for the client, access tokens for the API |
| Multi-tenancy | Silo vs pool. RLS with no policy denies everything; table owners bypass RLS unless it is forced. Derive the tenant from the authenticated identity, never from client input |
| Security by design | Per-service identities and temporary credentials. Secrets in a managed store with rotation. TLS on every hop; envelope encryption at rest. Know the OWASP Top 10:2025 changes |

### 3.6 Design case studies, observability and cost (16%)

| Lesson | Master this |
|---|---|
| Shortener, feed, chat and notifications | A 301 is cacheable and hides repeat clicks; a 302 keeps every click on your servers. Hybrid push and pull feeds. Order chat per conversation. Notification workers must be idempotent |
| Search, autocomplete and uploads | Postgres full-text search with GIN is a credible first search engine. Use pre-signed upload URLs (the Valet Key pattern). Media jobs return 202 plus a status URL |
| AI systems: gateways, RAG and agents | A gateway honours Retry-After and enforces per-client token quotas. Never fail over across different model versions. Filter by permission at retrieval time. Run agents as async jobs with checkpoints and budgets |
| Observability | Golden signals; RED for services, USE for resources. Bounded metric cardinality. Tail sampling keeps error traces. Burn-rate alerts |
| Cost-aware architecture | For small teams, on-call and engineering time usually cost more than the cloud bill. Start with a modular monolith. Buy undifferentiated capabilities. Add an extra nine only if it pays for itself |

---

## 4. Course: PostgreSQL and SQL in Depth (PG-SQL)

26 lessons in six domains. Every query, lab and predict-the-result question was run on PostgreSQL 18. Concurrency questions (locks, isolation anomalies, deadlocks) were checked against the docs, because they need several sessions.

### 4.1 SQL querying in depth (20%)

| Lesson | Master this |
|---|---|
| Joins: outer, semi, anti and LATERAL | A condition on the nullable side belongs in `ON`; in `WHERE` it turns the join into an inner join. `NOT IN` returns nothing once the subquery yields a NULL, so use `NOT EXISTS`. For top-N per group, use `LEFT JOIN LATERAL (… LIMIT n) ON true` |
| Aggregation | `FILTER (WHERE …)` for conditional aggregates. `count(expr)` counts non-NULL values. `ROLLUP` and `CUBE` as grouping sets; `GROUPING()`. `DISTINCT ON` needs a matching leading `ORDER BY` |
| Window functions | The default frame with `ORDER BY` includes peers, which trips up `last_value`. rank, dense_rank and row_number. Gaps and islands with value minus `row_number()`. `IGNORE NULLS` is not available in PostgreSQL 18 |
| CTEs and recursive queries | A CTE used once is inlined; used twice it is materialized, unless you say `[NOT] MATERIALIZED`. `SEARCH` and `CYCLE` clauses. Data-modifying CTEs share one snapshot |
| NULLs, casting and set operations | Three-valued logic; `IS DISTINCT FROM`. Integer division truncates. NULLs sort last for ASC and first for DESC. `INTERSECT ALL` and `EXCEPT ALL` follow multiset rules |

### 4.2 Schema design and data modelling (16%)

| Lesson | Master this |
|---|---|
| Normalization and relationships | Index foreign-key columns yourself. Use junction tables, not arrays of ids. Represent trees with an adjacency list queried through `WITH RECURSIVE` |
| Keys | `GENERATED ALWAYS AS IDENTITY` rather than `serial`. `uuidv7()` is new in 18 and timestamp-ordered, but it reveals creation time. `NO ACTION` can be deferred; `RESTRICT` cannot |
| Constraints | CHECK passes on NULL. `NULLS NOT DISTINCT`. Exclusion constraints and the new `WITHOUT OVERLAPS` in 18. Add `NOT VALID` first, then `VALIDATE` |
| Column types | timestamptz for points in time. numeric for money. text with CHECK constraints. Enum values cannot be removed. Generated columns in 18 default to VIRTUAL, which cannot be indexed |
| Partitioning | Pruning needs the partition key in the predicate. There is no global unique index. Drop or detach partitions for retention instead of mass DELETEs |

### 4.3 Indexes and query performance (20%)

| Lesson | Master this |
|---|---|
| B-tree in depth | Equality columns first, then the range or sort column. Skip scan in 18 helps only when the leading column has few distinct values. Index-only scans need pages marked all-visible |
| Partial, expression and covering indexes | A function on a column prevents use of a plain index on it. Expression indexes must match the query's expression exactly. INCLUDE columns are not searchable |
| GIN, GiST, BRIN and hash | Choose by operator: GIN for `@>`, arrays, tsvector and trigrams; GiST for ranges and nearest-neighbour; BRIN only when values correlate with physical order |
| Reading EXPLAIN | `EXPLAIN ANALYZE` executes the statement, so wrap DML in BEGIN and ROLLBACK. Times are per loop. A gap between estimated and actual rows is the first clue. In 18, buffers are shown by default |
| Anti-patterns | Use keyset pagination instead of deep OFFSET. Replace N+1 queries with joins or `= ANY`. `SELECT *` rules out index-only scans. OR across columns needs a BitmapOr or a UNION |

### 4.4 Transactions, MVCC and concurrency (18%)

| Lesson | Master this |
|---|---|
| Isolation and MVCC | An UPDATE writes a new row version. Readers never block writers. Read Committed takes a new snapshot per statement. Repeatable Read has no phantoms in PostgreSQL but allows write skew. Serializable aborts instead of blocking (40001) |
| VACUUM, bloat, HOT and wraparound | Long-running and idle-in-transaction sessions hold back cleanup. Tune autovacuum per table. HOT updates need no indexed column to change. Freezing prevents wraparound |
| Locks and deadlocks | Only ACCESS EXCLUSIVE blocks SELECT. `FOR NO KEY UPDATE` vs `FOR KEY SHARE`. Queues use `SKIP LOCKED`. Prevent deadlocks (40P01) with a consistent lock order |
| Upserts, MERGE and retries | `ON CONFLICT DO UPDATE` with `EXCLUDED`; deduplicate the batch first. MERGE is not a drop-in replacement under concurrency. Use transaction-level advisory locks behind a pooler. Retry whole transactions |

### 4.5 PostgreSQL as an application platform (14%)

| Lesson | Master this |
|---|---|
| jsonb | `@>` containment. `jsonb_path_ops` is smaller but supports fewer operators. Keys you constrain or join on belong in real columns |
| Text, fuzzy and vector search | Use `websearch_to_tsquery` for user input. pg_trgm for unanchored LIKE. In pgvector, the operator must match the index's operator class. HNSW vs IVFFlat. Filtered approximate search can return too few rows |
| Queues, events and the outbox | `FOR UPDATE SKIP LOCKED` inside the CTE. NOTIFY is delivered on commit, with a payload under 8000 bytes, and does not work through transaction pooling. Outbox consumers must be idempotent |
| Roles, RLS and security definer | RLS adds to GRANTs; it does not replace them. With RLS enabled and no policy, everything is denied. Owners bypass RLS unless it is forced. Give SECURITY DEFINER functions a safe `search_path`. Supabase: write `(select auth.uid())` in policies |

### 4.6 Operating PostgreSQL in production (12%)

| Lesson | Master this |
|---|---|
| Connections, pooling and monitoring | Fix connection storms with a pooler. `work_mem` applies per operation. Transaction pooling breaks session state. Rank `pg_stat_statements` by total time |
| Zero-downtime migrations | A DDL statement waiting for its lock blocks every query behind it, so always set `lock_timeout`. `CREATE INDEX CONCURRENTLY` cannot run in a transaction. Use `NOT VALID` then `VALIDATE` |
| Backups, replication and upgrades | pg_dump is logical; point-in-time recovery needs base backups plus archived WAL. Replicas lag, so route read-your-writes to the primary. Logical replication does not copy DDL or sequences |

---

## 5. Course: TypeScript in Depth (TS-DEEP)

24 lessons in six domains. Every code sample was type-checked with the TypeScript 7.0 native compiler in strict mode and run on Node 24. Compiler error codes are quoted only where they were reproduced.

### 5.1 The type system foundations (20%)

| Lesson | Master this |
|---|---|
| Structural typing and widening | Excess property checks apply only to fresh object literals (TS2353). Weak types reject sources with no shared properties (TS2559). `let` widens literals |
| Inference, `as const` and `satisfies` | An annotation replaces the inferred type; `satisfies` checks the value and keeps the inference. `as const` gives readonly literals. `const` type parameters |
| Unions and narrowing | `typeof null === "object"`. Truthiness narrowing also drops `0` and `""`. Type predicates are trusted, not verified. 5.5 inferred predicates do not apply to `Boolean` |
| Discriminated unions and escape hatches | Exhaustiveness checks with `never`. Prefer `unknown` to `any`. `as` and `!` do nothing at runtime. Known soundness holes |

### 5.2 Advanced types (20%)

| Lesson | Master this |
|---|---|
| Generics | Inference candidates come from every argument. A type parameter used only once is a code smell. `NoInfer` |
| Conditional types and `infer` | Distribution over naked type parameters; turn it off with `[T] extends [U]`. `never` distributes to `never`. Inference from overloads uses the last signature |
| Mapped and template literal types | Key remapping with `as` (remapping to `never` filters a key out). Homomorphic mapped types keep modifiers. Template literal types produce cross products |
| Utility types | `Omit` does not catch key typos. `keyof` a union gives only shared keys. `Awaited<ReturnType<typeof f>>` |
| Variance, overloads and performance | Method shorthand stays bivariant; property syntax is checked strictly. Prefer unions to overloads. Interfaces check faster than intersections; add explicit return types |

### 5.3 The JavaScript runtime beneath TypeScript (18%)

| Lesson | Master this |
|---|---|
| The event loop | Microtasks drain before the next task. Code before the first `await` runs synchronously. In Node, `nextTick` and promise ordering differ between CommonJS and ESM |
| Promises in production | `return await` inside `try`. Node crashes on unhandled rejections by default. Know all, allSettled, any and race. Combinators never cancel the losers; `AbortSignal` does |
| Scope, closures and `this` | `let` in a loop gives a new binding per iteration. The temporal dead zone. `this` is set by the call site; arrow functions are lexical |
| Equality and numbers | `x == null` is the one idiomatic `==`. `Object.is`. `Number.isNaN`. Integers are exact only up to 2^53 − 1. BigInt does not mix with number |
| Modules | ESM bindings are live. File extensions and `"type"` decide the format. Top-level await delays every importer. `require(esm)` fails on a graph that uses top-level await |

### 5.4 Designing with types (14%)

| Lesson | Master this |
|---|---|
| Modelling domains | Make illegal states unrepresentable with discriminated unions. Brands such as `string & { __brand }`, created through one validating constructor |
| Errors and runtime validation | Catch variables are `unknown`; `.catch` reasons are `any`. Use Result types for expected failures. Parse at the boundary with Zod; `z.infer` is the output type, `z.input` the input |
| Type-safe APIs and declaration files | Types stop at the wire: Dates become strings. Share one contract. Fix TS7016 with @types or a minimal `declare module` |

### 5.5 Tooling, configuration and the TypeScript 7 compiler (14%)

| Lesson | Master this |
|---|---|
| tsconfig and the 6.0/7.0 defaults | `strict` is on by default since 6.0; `types` defaults to `[]`. `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` are separate options. 7.0 removes `baseUrl`, `outFile`, node10 resolution and es5 |
| Module settings and running TypeScript | `nodenext` for Node, `bundler` for bundled code. `verbatimModuleSyntax`. Node's type stripping rejects enums and parameter properties (`erasableSyntaxOnly`, TS1294). Keep `tsc --noEmit` in CI |
| Monorepos, builds and publishing | `composite` projects and `--build`. In package.json `exports`, conditions are matched in order: put `types` first and `default` last. Dual packages need a declaration file per format |

### 5.6 TypeScript for full-stack apps (14%)

| Lesson | Master this |
|---|---|
| Typed Node services | `fetch` resolves on HTTP errors, so check `res.ok`. `AbortSignal.timeout`. Use `pipeline`, not `.pipe`. Always attach `'error'` listeners. Graceful shutdown |
| Handlers, middleware and validation | `req.json()` returns `any` until you validate it. `safeParse` and a 400 response. Pass auth results through typed context. Assignability does not strip extra fields from responses |
| React 19 with TypeScript | `ReactNode` for children. `ComponentProps<"input">`. `ref` is a normal prop in 19; `useRef` needs an argument |
| Testing and linting | `vi.fn<Fn>()`. `expectTypeOf` in `*.test-d.ts` files. typescript-eslint's `no-floating-promises` and `no-misused-promises`; under 7.0, alias TypeScript 6 for typed linting |

---

## 6. Course: LLM Application Engineering (LLM-ENG)

25 lessons in six domains, provider-neutral. API behaviour was checked against the current Anthropic, OpenAI and Google docs, and every computation was rerun in Python.

### 6.1 Model APIs, prompting and structured output (18%)

| Lesson | Master this |
|---|---|
| Messages APIs across providers | Anthropic Messages is stateless; OpenAI Responses stores responses by default; Gemini Interactions needs tools and system instructions re-sent each turn. Branch on stop reason: a refusal still returns HTTP 200 |
| Prompt engineering that holds up | Explain the reason behind instructions. Use 3–5 diverse examples. Put long documents first and the question last. Prefill and sampling parameters are rejected on current Claude (API version 2026-10-21). Control reasoning with effort |
| Structured outputs and repair | JSON mode ≠ structured outputs ≠ correct values. Each provider supports a different subset of JSON Schema. Repair by cause: refusal, truncation or validation error |
| Tokens, context windows and context rot | Count with the provider's tokenizer. Reasoning tokens bill as output. Recall degrades in long contexts. Under about 200K tokens of stable knowledge, a cached prompt can beat RAG |
| Model choice, routing and fallbacks | Choose by evals, then cost and latency. Pin snapshot IDs. Treat refusals, overload, rate limits and spend caps differently. Cross-provider fallbacks need their own evals |

### 6.2 Retrieval and RAG (20%)

| Lesson | Master this |
|---|---|
| RAG architecture | Choose chunk size by recall@k. Store tenant and permission metadata on every chunk and enforce it as a retrieval filter, never as a prompt instruction |
| Embeddings | For unit vectors, cosine = dot product. pgvector `<#>` is the negative inner product. Re-normalize after truncating. Changing the embedding model means re-embedding everything |
| Search: HNSW, BM25 and hybrid | Tune `ef_search` for recall. BM25 catches exact identifiers. Reciprocal rank fusion: $$\sum 1/(k+\text{rank})$$ with k = 60 |
| Reranking and contextual retrieval | Rerank a wide set (top 150 → top 20); a reranker cannot recover misses. Contextual Retrieval plus reranking cut retrieval failures by 67% in Anthropic's tests |
| Evaluating retrieval | Measure retrieval separately from generation. recall@k, precision@k, MRR, and nDCG with a stated gain variant. Build labelled sets from real queries |

### 6.3 Tools, agents and MCP (20%)

| Lesson | Master this |
|---|---|
| The tool-use loop | Reply to `tool_use` with only `tool_result` blocks, with matching ids, all in one message. Report failures with `is_error`. Cap iterations. Forced `tool_choice` is unavailable on some current models |
| Workflows vs agents | Chaining, routing, parallelisation, orchestrator-workers and evaluator-optimizer. Use the simplest pattern that works |
| Designing tools | Few, well-scoped, namespaced tools. Descriptions are prompts. Return concise output and actionable errors. Idempotent side effects and least privilege |
| Model Context Protocol | One host, one client per server. Tools vs resources vs prompts. stdio vs Streamable HTTP. OAuth 2.1 with audience-bound tokens and no token passthrough. Since 2026-07-28 the protocol is stateless |
| Context engineering | Context is a finite budget. Load details just in time. Compaction is not memory. Sub-agents return short summaries |

### 6.4 Evaluation (18%)

| Lesson | Master this |
|---|---|
| Why evals | Tasks, trials, graders and outcomes. Regression suites on every change. Start with 20–50 tasks drawn from real failures |
| Grading methods and judge pitfalls | Prefer code graders; use rubrics with one criterion each. Position, verbosity and self-preference bias. Swap pairwise order. Calibrate the judge against human labels |
| Statistics for evals | $$SE=\sqrt{p(1-p)/n}$$; 0.82 on 400 items gives about [0.782, 0.858]. Clustered SEs. Compare systems with paired differences. pass@k vs pass^k |
| Evals in CI and production | Gate on differences larger than noise. Canary or A/B releases against a concurrent control, with guardrail metrics and rollback thresholds |

### 6.5 Production: cost, latency and reliability (12%)

| Lesson | Master this |
|---|---|
| Cost and latency | Cost = uncached input + cache writes + cache reads + output. Measure cost per business outcome. Put stable content first for caching. Batch is about half price. Streaming improves time to first token |
| Reliability | Read `retry-after`. A spend-cap 429 will not clear by retrying. Retry at one layer with jitter. Errors can arrive mid-stream after an HTTP 200. Use idempotency keys for side effects |
| Observability and shipping safely | OpenTelemetry GenAI spans (`gen_ai.client.inference`, `gen_ai.provider.name`); prompt content is opt-in. Pin snapshots, version prompts, and use flags and shadow traffic |

### 6.6 Security, safety and privacy (12%)

| Lesson | Master this |
|---|---|
| Prompt injection and the OWASP LLM Top 10 | Indirect injection arrives through content the app reads. No filter is fool-proof, so limit what a successful injection can do. Know the 2025 OWASP list, LLM01–LLM10 |
| Securing agents | Treat every tool as code execution. Label untrusted content and keep it in tool results. Block exfiltration with egress allow-lists. Approvals must show exact arguments |
| Privacy, retention and guardrails | Minimise PII, remembering that logs, traces and indexes hold it too. Zero data retention covers eligible features only. Run the ACL filter inside retrieval. Detect refusals from structured fields |

---

## 7. Capstone projects

Build these; each one exercises all four courses.

### Project A: A multi-tenant SaaS backend on Postgres

- **Schema:** tenants, users and projects with identity keys, foreign keys with indexes, and CHECK constraints.
- **Isolation:** row-level security keyed on the authenticated tenant. Write a test that proves one tenant cannot read another's rows.
- **API:** a typed TypeScript layer with Zod validation at the boundary, cursor pagination and RFC 9457 errors.
- **Background work:** a job queue with `FOR UPDATE SKIP LOCKED` and an outbox table, with a relay that publishes idempotently.
- **Reliability:** an SLO and a burn-rate alert rule written down, and a load test that shows where it breaks.

### Project B: A RAG assistant you can measure

- **Ingestion:** chunk a real document set into pgvector, with tenant and permission metadata on every chunk.
- **Search:** hybrid search (full-text plus HNSW) fused with RRF, then reranked.
- **Retrieval evals:** a labelled set of 50 queries, reporting recall@10, MRR and nDCG.
- **Answer evals:** an answer-quality judge with a rubric, calibrated against 30 human labels.
- **Gating:** compute a confidence interval on the score and fail CI on a paired regression.

### Project C: An agent with tools over MCP

- **Server:** an MCP server exposing three well-scoped tools, with concise outputs and actionable errors.
- **Loop:** an iteration cap, a token budget and idempotency keys on side-effecting tools.
- **Security:** untrusted content is labelled in tool results; outbound actions need human approval that shows the exact arguments.
- **Tracing:** OpenTelemetry GenAI spans for model calls and tool executions.

### Project D: A system design review of your own product

1. Write down peak QPS, storage growth, latency targets and SLOs.
2. Draw the data flow.
3. List every place where a retry, a cache or a replica could give a wrong answer.
4. Identify one component you can remove.

---

## 8. Version notes

Checked on 11 November 2026.

- **PostgreSQL:**
  - 18 is current (18.6), and the course targets it.
  - 19 is at release candidate 1 and will add `IGNORE NULLS` for window functions and change several defaults (JIT off, `log_lock_waits` on, lz4 TOAST compression).
  - 18 added `uuidv7()`, virtual generated columns (the new default, not indexable), `WITHOUT OVERLAPS` keys, B-tree skip scan, asynchronous I/O and buffer output by default in `EXPLAIN ANALYZE`.
  - PostgreSQL 14 reaches end of life on 12 November 2026.
- **pgvector:** 0.8.7. HNSW and IVFFlat index up to 2,000 dimensions; `halfvec` up to 4,000.
- **TypeScript:**
  - 7.0 is the Go-based native compiler, typically 8–12× faster. It has no programmatic API, so typed-lint tools still use TypeScript 6 through an npm alias.
  - 7.1 is in beta and adds the es2026 target and a new compiler API.
  - 6.0 made `strict` the default and changed `types` to `[]`.
- **Node.js:** 26 is the newest LTS; the course examples were run on Node 24 LTS. Type stripping does not support enums, parameter properties or runtime namespaces.
- **Claude API:**
  - Version 2026-10-21 removes `temperature`, `top_p` and `top_k`; any request that sends them gets a 400.
  - Prefill is unsupported from Claude 4.6 on.
  - Forced `tool_choice` returns a 400 on several current models.
- **MCP:** specification 2026-07-28 is stateless: no initialize handshake and no session header. Sampling, Roots and the HTTP+SSE transport are deprecated.
- **OpenTelemetry GenAI conventions:** these moved to their own repository. The inference span is `gen_ai.client.inference`, and the provider attribute is `gen_ai.provider.name`.
- **OWASP:** the Top 10:2025 (web) and the LLM Top 10 2025 are the current editions.
- **OAuth:** OAuth 2.1 is still a draft. RFC 9700 (security best current practice) and RFC 10017 (browser-based apps) are the references.
- **Moved documentation:**

  | Docs | New location |
  |---|---|
  | AWS Builders' Library | builder.aws.com |
  | Google Cloud Architecture Center | docs.cloud.google.com |
  | Claude docs | platform.claude.com |
  | OpenAI API docs | developers.openai.com |
  | Gemini docs | aistudio.google.com |

---

## 9. Study schedules

### Twelve weeks, about 6 hours a week (all four courses)

| Weeks | Focus |
|---|---|
| 1–3 | TS-DEEP: one domain every 3–4 days; start Project A's typed API layer |
| 4–6 | PG-SQL: domains 1–3, then 4–6; build Project A's schema, RLS and queue |
| 7–9 | LLM-ENG: domains 1–3, then 4–6; build Project B |
| 10–11 | SYS-DESIGN: all six domains; do Project D on your own product |
| 12 | Mock tests for all four courses; review every missed question's rationale; Project C |

### Four weeks, interview sprint

| Week | Focus |
|---|---|
| 1 | SYS-DESIGN domains 1–3, plus one case study a day from domain 6 |
| 2 | SYS-DESIGN domains 4–6; explain two designs a day out loud |
| 3 | TS-DEEP domains 1–3 and PG-SQL domains 1, 3 and 4 |
| 4 | Mock tests, and Foundations DSA practice for the coding rounds |

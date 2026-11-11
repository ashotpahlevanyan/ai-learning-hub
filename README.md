# AI Learning Hub

Free, structured study paths for AI and LLM certifications. Tracks: Anthropic Claude (CCAO-F, CCDV-F, CCAR-F, CCAR-P), Google (Generative AI Leader and Professional Machine Learning Engineer exams, Gemini API Developer course), OpenAI (AI Foundations and API & Agents Developer courses), AWS (AI Practitioner, Machine Learning Engineer – Associate MLA-C02, Generative AI Developer – Professional, Solutions Architect – Professional SAP-C02 and SAP-C03), Microsoft Azure (AI-901 Azure AI Fundamentals, AI-103 Developing AI Apps and Agents), NVIDIA (NCA-GENL Generative AI LLMs, NCP-AAI Agentic AI), Databricks (Generative AI Engineer Associate, Machine Learning Associate), plus AI Foundations (Mathematics for AI and LLMs, Python for AI Engineering). Each has lessons, spaced-repetition flashcards, scenario practice questions, timed mock exams and a written runbook. Track and exam pages show estimated study time: the lessons' reading time plus one pass through the practice questions and flashcards, summed at build time. A Library page lists the best books, free online books, courses and papers for going deeper, and each track page shows its own reading list.

React + TypeScript + Vite. No backend of its own: progress is stored in the browser and can be exported and imported. Optional cloud sync (see [Cloud sync](#cloud-sync)) uses a free Supabase project for sign-in and one row of progress per user.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # content validation + logic tests
npm run build      # production build in dist/
npm run test:e2e   # browser smoke test of dist/ (after build)
npm run test:e2e:db  # database-backed content, with fallbacks (builds dist-db/)
npm run test:e2e:a11y  # axe-core WCAG 2.2 AA audit of dist/, light and dark, desktop and phone
npm run check:links  # every source/resource URL still resolves (network)
```

### Testing and validation

- **Content validator** (`npm test`, `src/content/content.test.ts`): ids, domains, weights, answer keys, "Select two/three" stems, rationales, and sources. Every lesson and practice question must cite at least one `https` page on an official domain of its provider (`src/content/official-domains.json`).
- **Browser tester** (`npm run test:e2e`, `e2e/smoke.mjs`): serves `dist/`. For every exam in the sitemap it checks:
  - every view renders at phone width with no horizontal overflow;
  - lessons and answers show their "Read more" links to the docs;
  - practice, flashcards and a 20-question mock work end to end.

  A second pass loads pages under the real Content-Security-Policy. Deploys run it and are blocked on failure. Locally, set `CHROME_PATH` to reuse an installed Chrome, or run `npx playwright-core install chromium`.
- **Link checker** (`npm run check:links [track|library]`, `scripts/check-links.mjs`): checks every source URL, track resource, library entry and runbook link. It runs weekly in GitHub Actions (`.github/workflows/links.yml`). Dead links fail the run. Sites that block bots are listed as unverified but don't fail it.

## Add a learning track

1. Create `src/content/tracks/<track-id>/` with:
   - `track.ts` exporting a `Track` (see `src/lib/types.ts` and `tracks/claude/track.ts`)
   - one JSON file per exam or course (`Exam` shape: domains, lessons, flashcards, questions)
   - optionally a long-form `runbook.md` guide
2. Add the track to `src/content/index.ts`.
3. Add a few entries for the track to `src/content/library.ts` (the validator requires every track to have some).
4. Run `npm test`. It validates every exam bundle (ids, domains, answer keys, weights, official sources). Add the provider's documentation domains to `src/content/official-domains.json`.

Markdown bodies can include math between double dollars (`$$\frac{a}{b}$$`). KaTeX loads only on pages that contain it, and a single `$` stays literal so prices are safe.

Routes are generated from the registry: `/<track>`, `/<track>/guide`, `/<track>/<exam>/…`.

## Deploy (GitHub Pages)

For production operations (repository settings, the Supabase go-live order, rollback and monitoring) see [DEPLOY.md](DEPLOY.md).

Pushing to `main` runs `.github/workflows/deploy.yml`: tests, build, then publish to Pages.

One-time setup: in the repo go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.

### Custom subdomain (e.g. `learn.example.com`)

1. Put the domain in `public/CNAME` (one line, e.g. `learn.example.com`) and push.
2. At your DNS provider add a **CNAME** record: host `learn` → `<github-username>.github.io`.
3. In **Settings → Pages**, enter the custom domain, wait for the DNS check, then tick **Enforce HTTPS**.

Without `public/CNAME` the site builds for `https://<user>.github.io/<repo>/`.

### What the production build includes

- `404.html` copy of the app, so deep links work on Pages
- `sitemap.xml`, `robots.txt` and absolute Open Graph URLs (the workflow sets `SITE_URL` from `public/CNAME`, or from the github.io address)
- A Content-Security-Policy meta tag (scripts from the site only, fonts from Google Fonts)
- A web app manifest and icons, so the site can be added to a phone's home screen
- Lazy-loaded pages and per-exam content bundles
- A service worker (`sw.js`, generated by `scripts/postbuild.mjs`): the app shell is precached, exam bundles and runbooks are cached on first use, so studied material works offline

To check a production build locally:

```bash
BASE_PATH=/ai-learning-hub/ SITE_URL=https://example.github.io/ai-learning-hub npm run build
npx vite preview --base /ai-learning-hub/
```

Pages serves the SPA fallback with HTTP status 404, so search engines index only the home page reliably. The sitemap helps, but don't expect deep pages to rank.

## Content pipeline

Each exam's content is produced by one run of `pipeline/cert-prep.workflow.js` (a Claude Code Workflow script) against a spec in `specs/<track>/<exam>.json`. The spec holds the exam facts, the domains with their skills, the sources and the item targets.

The stages are Research (check facts against the sources) → Coverage (gap analysis against the skills) → Write (one agent per domain) → Verify (a blind re-answer of every question without the key, then fix or drop) → Assemble (merge, balance answer positions, run the tests, write `.pipeline/<track>-<exam>/report.md`).

Run it from Claude Code with args `{ "root": "<path to web>", "spec": "<path to spec>", "date": "YYYY-MM-DD" }`. Assemble stamps a `review` record on the bundle, and the exam dashboard shows it. Read the report and the diff before committing.

### Code verifiers (set up once per machine)

Specs tell the write and verify agents to run code examples on real tools under `.pipeline/` (gitignored). On a new machine, create them with:

```sh
sh pipeline/verifiers/setup.sh   # needs Node 24+ and python3
```

This creates `.pipeline/sql/run.mjs` (PostgreSQL 18 via PGlite, with pgvector and pg_trgm), `.pipeline/ts/check.sh` (TypeScript 7 strict check, then run with Node; `NORUN=1` to only type-check), `.pipeline/py313` (CPython 3.13 with PyYAML) and `.pipeline/py` (numpy, pandas, scipy, sympy, scikit-learn, torch).

If a run's assemble stage does not write `report.md`, rebuild the report from the run journal:

```sh
python3 scripts/build-report.py <journal.jsonl> src/content/tracks/<track>/exams/<id>.json "<Title>" pipeline/reports/<track>-<id>-<date>.md [YYYY-MM-DD]
```

Dated rechecks live in `pipeline/rechecks.json`; `npm run check:rechecks` lists the ones due.

## Moving content to a database

Content ships as JSON and TypeScript in `src/content`, so the site needs no server. Everything is shaped to move into Postgres (Supabase, Neon, RDS and others) without changing ids, URLs or saved progress:

- **Stable ids everywhere.** Exams are keyed `<track>/<exam>` (the same key progress uses). Lessons, questions and flashcards have ids unique within their exam, and every lesson section has a slug id unique within its lesson (enforced by the content tests; `npm run content:normalize` adds any that are missing after regenerating a bundle). Roadmap tasks keep their `w<week>-<index>` ids.
- **Schema:** `supabase/content.sql` creates 16 tables (tracks, exams, domains, lessons, lesson sections, questions, options, flashcards, sources, the library and the roadmap) with foreign keys, `position` columns for display order, and row-level security that lets anyone read and only the service role write.
- **Export:** `npm run content:export` writes `export/json/<table>.json` (one array of rows per table) and `export/sql/NN-<table>.sql` (inserts in dependency order). It checks duplicate keys and unknown domains first and stops on any problem.

To load into Supabase:

1. Run `supabase/content.sql` in the SQL editor (once).
2. `npm run content:export`
3. Load it with `psql` and the connection string from Project Settings → Database (the file is several MB, more than the SQL editor handles comfortably):
   ```bash
   psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -q -f export/load.sql
   ```
   `load.sql` clears the content tables and inserts everything in one transaction, so readers never see a half-loaded database and the same command reloads after any content change. It never touches `public.progress`. (`export/sql/NN-<table>.sql` has the same rows split per table, for tools that prefer that.)
4. `npm run content:verify-db` (with `SUPABASE_URL` and `SUPABASE_ANON_KEY` set) reads every exam and guide back through the REST API and compares it with the bundle.

### Reading content from the database

Build with `VITE_CONTENT_SOURCE=db` (plus the Supabase URL and anon key) and the site reads exams and track guides from the database instead of the bundled files. The track and exam listings stay bundled, so pages and the sitemap still render without the database.

For each exam the site uses, in order: the database; the last copy it read from the database under the current build (kept in the browser's Cache API, so it works offline; a new deploy drops older copies so they never override a newer bundle); the bundled JSON. An unreachable database, an HTTP error, a table that returns fewer rows than it counts, or an exam whose content `version` changed while it was being read (a reload committing mid-read) never breaks a page: the site falls back instead of showing or caching a partial or mixed copy. The code is in `src/lib/dbContent.ts` (REST reads, paging past Supabase's 1000-row cap, row → exam assembly) and `src/content/live.ts` (fallbacks).

In the deploy workflow:

| Setting | Kind | Effect |
| --- | --- | --- |
| `CONTENT_SOURCE` = `db` | variable | The site reads content from the database. Unset keeps bundled content. |
| `DATABASE_URL` | secret | After the tests pass, every deploy reloads the content tables from the repo (`load.sql`) and runs `content:verify-db`. Unset skips this. |

The repo stays the source of truth: a deploy replaces the database content with what is committed, so make lasting fixes in the repo, not in the Supabase table editor.

Tests: `npm test` includes a round trip of every exam through its rows and a real-Postgres check (PGlite) that the schema and `load.sql` load twice, that anon can read but not write, and that every exam and guide reads back exactly. `npm run test:e2e:db` builds a database-mode copy in `dist-db/`, serves the exported rows from a local REST stand-in and checks in Chrome, under the production CSP, that content comes from the database and falls back correctly when it is down.

## Disclaimer

Independent study resource, not affiliated with or endorsed by Anthropic. Practice items are original, not real exam questions. Exam facts come from third-party summaries of the official guides; confirm them with the provider.

## Cloud sync

Signing in is optional; the site works fully without it. When `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set at build time, My progress shows a "Sync across devices" panel. Signed-in progress is merged per item (latest answer or review wins; lessons, study days and mocks are combined) and saved to the user's row a few seconds after each change. The Supabase client loads only for signed-in visitors.

Setup (Supabase free plan):

1. In the Supabase SQL editor, run `supabase/progress.sql`. It creates `public.progress` with row-level security so each user can reach only their own row.
2. Authentication → URL configuration: set the Site URL to the live site and add `https://<your-site>/progress`, `http://localhost:5173/progress` and `http://localhost:4173/progress` to the redirect URLs.
3. Authentication → Sign In / Providers: enable the methods you want (Email is on by default; GitHub needs a GitHub OAuth app whose callback is `https://<project-ref>.supabase.co/auth/v1/callback`).
4. Locally, put the project URL and anon (publishable) key in `.env.local` (ignored by git). For deploys, add them as repository variables `SUPABASE_URL`, `SUPABASE_ANON_KEY` and optionally `AUTH_PROVIDERS` (default `github,email`). The anon key is public by design; row-level security protects the data.

Free-plan limits: Supabase pauses a project after a week with no activity (restore it from the dashboard), and its built-in email service sends only a few sign-in emails per hour; add custom SMTP in Authentication settings if that becomes a limit.

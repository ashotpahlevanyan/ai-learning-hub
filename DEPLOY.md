# Production deployment

How the live site (https://learn.pahlevanyan.org) is built and deployed, what to set up before turning on cloud sync and database content, how to roll back, and what to watch. The README covers development; this file covers operations.

## What runs where

| Piece | Where | Needed? |
| --- | --- | --- |
| Static site (React, all content bundled) | GitHub Pages, deployed by `.github/workflows/deploy.yml` on every push to `main` | Yes. It works on its own. |
| DNS | Namecheap CNAME `learn` → `ashotpahlevanyan.github.io`; `public/CNAME` holds the domain | Yes |
| Progress sync (sign-in, one row per user) | Supabase `public.progress` | Optional |
| Content database (exams and guides read at runtime) | Supabase content tables (`supabase/content.sql`) | Optional |
| Weekly checks (dead links, dated rechecks) | `.github/workflows/links.yml`, Mondays 06:00 UTC | Yes. A failure emails the repo owner. |

Without any Supabase settings the site is fully functional: progress stays in the browser and content comes from the bundle.

## Every deploy

A push to `main` runs these steps, and any failure stops the deploy:

1. `npm ci`, then `npm test`: content validation, logic, a round trip of every exam through its database rows, and a real-Postgres (PGlite) load of the schema.
2. `npm run build` with the base path and site URL taken from `public/CNAME`.
3. `npm run test:e2e`: every exam in Chrome at phone width, plus a pass under the real Content-Security-Policy.
4. `npm run test:e2e:db`: database-mode content and its fallbacks, against a local REST stand-in.
5. Only when the `DATABASE_URL` secret is set: reload the content tables in one transaction (`export/load.sql`), then `content:verify-db`.
6. Upload `dist/` and deploy it to Pages.

Before pushing, run the same checks locally:

```bash
npm test
SITE_URL=https://learn.pahlevanyan.org npm run build
npm run test:e2e && npm run test:e2e:db   # set CHROME_PATH to use an installed Chrome
npm run check:rechecks
```

## Repository settings

Settings → Secrets and variables → Actions. Nothing is set today.

| Name | Kind | Value | Effect |
| --- | --- | --- | --- |
| `SUPABASE_URL` | variable | `https://<ref>.supabase.co` | Enables sign-in and sync. Also used by database content. |
| `SUPABASE_ANON_KEY` | variable | the anon / publishable key | Public by design; row-level security protects the data. |
| `AUTH_PROVIDERS` | variable | e.g. `github,email` | Which sign-in buttons are shown. |
| `CONTENT_SOURCE` | variable | `db` | The site reads exams and guides from the database. |
| `DATABASE_URL` | **secret** | the Postgres connection string (Project Settings → Database; use the session pooler on IPv4-only networks) | Each deploy reloads the content tables. Never make this a variable: it carries the database password. |

## Going live with Supabase

Do these steps in order. Each one is safe to stop after.

### 1. Project

1. Create a Supabase project (the free plan is enough) in a region near your users.
2. In the SQL editor, run `supabase/progress.sql`, then `supabase/content.sql`. Both can be re-run safely.

### 2. Sign-in and sync

1. Authentication → URL configuration:
   - Site URL: `https://learn.pahlevanyan.org`.
   - Redirect URLs: `https://learn.pahlevanyan.org/progress`, `http://localhost:5173/progress` and `http://localhost:4173/progress`.
2. Authentication → Sign In / Providers: keep Email. For GitHub, create a GitHub OAuth app whose callback is `https://<ref>.supabase.co/auth/v1/callback`.
3. Authentication → SMTP: add custom SMTP before real users arrive. The built-in sender allows only a few emails an hour.
4. Set `SUPABASE_URL`, `SUPABASE_ANON_KEY` and `AUTH_PROVIDERS`, then re-run the deploy workflow (Actions → Deploy → Run workflow).
5. Check: open /progress, sign in, answer a question, then sign in on a second browser and confirm the answer appears.

The production CSP adds the Supabase origin to `connect-src` automatically at build time.

### 3. Content database

1. Add the `DATABASE_URL` secret and re-run the deploy. The "Publish content to the database" step loads every table and then confirms that the REST API returns exactly what is bundled. Its log ends with `22 match, 0 differ` (or the current exam count).
2. Only then set `CONTENT_SOURCE` = `db` and re-run the deploy.
3. Check: open an exam with the browser's network tab open. You should see requests to `<ref>.supabase.co/rest/v1/...` and no console errors.

## Rollback

- **Site:** revert the bad commit and push (`git revert <sha> && git push`). Pages serves the previous build in about 2 minutes. To redeploy an older commit without reverting, use Actions → Deploy → Run workflow on that ref.
- **Content database:** delete the `CONTENT_SOURCE` variable and re-run the deploy, and the site reads only the bundle again. You may not even need this: when the database is down, returns errors or holds half-loaded exams, every page falls back to its last database copy or to the bundle on its own.
- **Database contents:** the repo is the source of truth. Re-running the deploy, or `psql "$DATABASE_URL" -f export/load.sql` after `npm run content:export`, restores the committed content. Edits made in the Supabase table editor are overwritten by the next deploy.
- **Sync:** delete the Supabase variables and redeploy. Progress stays in each browser's localStorage. Rows in `public.progress` are kept for when sync returns.

## Watching

- **Weekly link check.** It fails on dead links. 403 and 429 responses are reported as "unverified", not dead. Fix a dead link by finding the page's new official URL; `npm run check:links` runs the check locally.
- **Weekly recheck calendar.** It fails once a dated recheck in `pipeline/rechecks.json` comes due, for example a policy change or an exam guide update. Re-verify the content, then remove the entry or move its date. `npm run check:rechecks` lists what is due within 14 days.
- **Exam retirement.** Set `lastDay` (and `replacedBy`) on an exam in its `track.ts`. The site shows "Last day …" for the 60 days before it and "Retired" after it, with no deploy needed on the day.
- **Supabase free plan.** A project is paused after a week with no activity. With database content on, the site keeps working from its fallbacks while paused. Restore the project from the dashboard.

## Known follow-ups

- `katex` has one low-severity advisory, about prototype pollution bypassing the `trust` option. The site does not enable `trust`, and the fix is in 0.19 (a major version, along with `rehype-katex` and `remark-math`).
- The remaining `npm audit` findings are in dev-only tooling (the vite and vitest dev servers) and do not ship. Upgrading them needs major versions.
- The NeurIPS proceedings site (`papers.nips.cc`) timed out from CI and locally on 2026-11-09/10. If it is still down at the next weekly check, link the paper's arXiv page instead.

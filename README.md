# AI Learning Hub

Free, structured study paths for AI and LLM certifications. The first track covers Anthropic's four Claude certifications (CCAO-F, CCDV-F, CCAR-F, CCAR-P): lessons, spaced-repetition flashcards, scenario practice questions, timed mock exams and a full written runbook.

React + TypeScript + Vite. No backend: progress is stored in the browser and can be exported and imported.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # content validation + logic tests
npm run build      # production build in dist/
```

## Add a learning track

1. Create `src/content/tracks/<track-id>/` with:
   - `track.ts` exporting a `Track` (see `src/lib/types.ts` and `tracks/claude/track.ts`)
   - one JSON file per exam or course (`Exam` shape: domains, lessons, flashcards, questions)
   - optionally a long-form `runbook.md` guide
2. Add the track to `src/content/index.ts`.
3. Run `npm test`. It validates every exam bundle (ids, domains, answer keys, weights).

Routes are generated from the registry: `/<track>`, `/<track>/guide`, `/<track>/<exam>/…`.

## Deploy (GitHub Pages)

Pushing to `main` runs `.github/workflows/deploy.yml`: tests, build, then publish to Pages.

One-time setup: in the repo go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.

### Custom subdomain (e.g. `learn.example.com`)

1. Put the domain in `public/CNAME` (one line, e.g. `learn.example.com`) and push.
2. At your DNS provider add a **CNAME** record: host `learn` → `<github-username>.github.io`.
3. In **Settings → Pages**, enter the custom domain, wait for the DNS check, then tick **Enforce HTTPS**.

Without `public/CNAME` the site builds for `https://<user>.github.io/<repo>/`.

## Disclaimer

Independent study resource, not affiliated with or endorsed by Anthropic. Practice items are original, not real exam questions. Exam facts come from third-party summaries of the official guides; confirm them with the provider.

# DEVOPS assemble report (2026-11-11)

Bundle: `web/src/content/tracks/engineering/exams/devops.json`

## Counts

| | Before | After |
|---|---|---|
| Lessons | 0 | 26 |
| Flashcards | 0 | 146 |
| Questions | 0 | 147 |

The bundle was empty before (`{}`). All six domain files were present, so nothing came from a previous bundle.

## Per-domain counts vs targets (actual / target)

| Domain | Name | Weight | Lessons | Flashcards | Questions |
|---|---|---|---|---|---|
| d1 | Delivery: Git workflows and CI/CD | 20 | 5 / 4 | 30 / 24 | 33 / 24 |
| d2 | Containers | 18 | 5 / 4 | 26 / 22 | 28 / 22 |
| d3 | Infrastructure as code and cloud foundations | 18 | 5 / 4 | 27 / 22 | 28 / 22 |
| d4 | Observability and incident response | 16 | 4 / 4 | 21 / 19 | 20 / 19 |
| d5 | Reliability, backups and security operations | 14 | 4 / 3 | 22 / 17 | 19 / 17 |
| d6 | Cost and platform choices | 14 | 3 / 3 | 20 / 17 | 19 / 17 |

Every domain meets or beats its target.

## Assembly steps

- Header fields come from the spec. Each domain got a 1-2 sentence summary and each of the 5 scenarios a short description. The d2 summary and the containerising scenario name Cloud Run and ECS on Fargate or ECS Express Mode, not App Runner (research correction).
- Lessons are ordered by domain (d1-l1 to d6-l3). All 319 ids are unique. `npm run content:normalize` reported that every section already had an id.
- Correct-answer positions: before balancing, positions 0/1/2/3 held 51/41/48/30 answers (170 slots, 22 of them multi-answer). Position 3 was more than 20% below the mean of 42.5. I moved the key in single-answer questions from the most-used position to the least-used one, swapping options and rationales together. After balancing the counts are 43/42/43/42, all within ±2% of the mean. No question's options or explanation refers to options by letter or position, so the swaps do not break any text.
- `npx vitest run -t "engineering/devops"` passed on the first run.
- `npm run check:links -- engineering` checked 548 links: 547 ok, 0 dead. The one unverified link (doi.org 403) is in llm-engineering, not in this bundle.
- review: `{"date":"2026-11-11","questionsChecked":147,"fixed":34,"dropped":0}`. All six domains passed blind verification with 0 key disagreements. "fixed" counts the 31 listed fixes plus 3 fact fixes that are not already in those lists (d1-l3 lockfile policy wording, the d5-l1 SRE quote attribution, the d6-q11 6 MB limit).

## Verification fixes and drops by domain

No question was dropped in any domain.

### d1 (33 questions checked, 0 key disagreements)
- d1-l3 untrusted-input: the YAML example `run: echo "Title: $TITLE"` did not parse. It is now a `run: |` block scalar.
- d1-q20: option 1 was defensible as a second answer. It was replaced with a false distractor and its rationale rewritten.
- d1-q8 and d1-l2: added the Workflow artifacts docs page as a source.
- Fact fix d1-l3: the "Require lockfile" policy is no longer described as set at organisation level.

### d2 (28 questions checked, 0 key disagreements)
- d2-l1 and d2-f2: the cgroups resource list now matches Docker's security page: memory, CPU and disk I/O.
- d2-l1: the Fargate and Cloud Run isolation claim is now worded conceptually, and the Docker Volumes doc was added as a source.
- d2-f4: the key was copied with COPY and deleted in a later RUN (it previously said "in one RUN").
- d2-q4: the Compose services source was replaced with the Docker Volumes doc.
- d2-q12: reworded the confusing package-lock.json phrase.
- d2-q14: the docker image tag source was replaced with docker image pull (pull by digest).
- d2-q21: option 0's rationale now explains that a string test runs through a shell.
- d2-q26: removed the unverified Kubernetes pod-lifecycle source.
- Cloud Run container-contract URLs were moved to docs.cloud.google.com.

### d3 (28 questions checked, 0 key disagreements)
- d3-q24: the scenario now says "two images" (it said three but named two).
- d3-q6: the scenario now states encrypt = true with no kms_key_id.
- d3-l3: added the immutable ID-based OIDC sub format used by repos created after 2026-07-15.
- d3-q16: the explanation now notes the ID-based sub format.

### d4 (20 questions checked, 0 key disagreements)
- d4-q2: the stem now reads "Which two changes together fix the problem? (Select two.)".
- d4-q13: added the SRE Book "Monitoring distributed systems" source.
- d4-q15: the explanation now says the evidence capture is quick and does not delay mitigation.
- d4-l1: the self-contradicting "head sampling plus always keep errors" now reads head sampling first, Collector tail sampling later.
- d4-l1 lab: the step that made the Collector config invalid was replaced with one that adds an unlisted receiver.

### d5 (19 questions checked, 0 key disagreements)
- d5-q19: the stem now asks for a durable, tamper-resistant audit record from now on, so it no longer asks about a deletion months ago.
- d5-l4: added the Docker build attestations and CloudTrail sources.
- Fact fix d5-l1: the unsourced "Google's SRE book" quote now reads "A common SRE saying".

### d6 (19 questions checked, 0 key disagreements)
- d6-q13: the scenario now has concurrency stuck at 1. Options A and C, their rationales and the explanation were rewritten to match.
- d6-q17: distractor D was rewritten and its rationale explains why it is wrong.
- d6-q18: the explanation now uses the SRE toil traits, and the Eliminating Toil source was added.
- d6-q19: the explanation now mentions the ALB hourly and LCU charges, and the ELB pricing source was added.
- d6-q15: added the Twelve-Factor source.
- d6-l1: added the cost allocation tags and Compute Optimizer sources.
- d6-l3: added the SRE toil source.
- Fact fix d6-q11: the 6 MB limit is Lambda's synchronous payload limit (API Gateway's is 10 MB).

## Unverified facts (from research)

- GitHub matrix 256-job limit, fail-fast default true, and job timeout-minutes default 360
- Kubernetes Deployment defaults (maxSurge/maxUnavailable 25%, revisionHistoryLimit 10, progressDeadlineSeconds 600) and terminationGracePeriodSeconds 30
- The Terraform versions that introduced use_lockfile (1.10?), import (1.5) and removed / import for_each (1.7)
- OpenTofu state encryption introduced in 1.7
- RDS automated backup retention of 1-35 days
- OTel Collector recommendation of memory_limiter first, then batch
- Exact Cloud Run per-second rates (from a search snippet)
- AWS egress tier prices beyond the USD 0.09/GB example, and the inter-AZ price
- App Runner closure date of 2026-04-30 (the closure itself is confirmed)
- ECS Express Mode forcing canary deployments (blog snippet)
- Docker Hardened Images paid-tier details and image count
- Exact day Let's Encrypt OCSP was turned off
- CA/B Forum 200/100/47-day validity schedule (search snippet)
- Artifact attestation availability for private repos by plan
- Dependabot open-pull-requests-limit default of 5
- docker/metadata-action current major version
- Lambda Arm duration price

## For human review

- **Facts that will go stale soon.** These are all dated late 2026, so recheck them before publishing: the immutable OIDC sub for repos created after 2026-07-15 (d1-q16, d3-l3, d3-q16), lockfiles GA on 2026-10-28 (d1-q19), pull_request_target blocked by default from 2026-12-02 (d1-q17), the Let's Encrypt lifetime cuts (64 days on 2027-02-10, 45 days on 2028-02-16) and the GitHub Actions dollar allowances and per-minute prices.
- **Missing scenario field.** d3-q4 and d3-q23 have no `scenario`. The tests pass. Check that the renderer handles a missing scenario.
- **Source outside the spec's list.** martinfowler.com is cited for trunk-based development and the test pyramid. It is on the engineering allowlist but not in the DEVOPS spec's own source list.
- **Claims taught from general knowledge.** These rest on reasoning or general knowledge rather than a citation:
  - Kubernetes rollout and probe defaults (d1-l5, d5).
  - Error tracking with no vendor-neutral source (d4-l3, d4-q13).
  - The multi-location alerting advice (d4-q12).
  - "Template updates never reach repos created from it" (d6-q17, inferred).
  - The "three times" automation rule of thumb (d6-l3).
  - The thin-handler and vendor-coupling advice (d6-q15).
  - "Fly-style platforms" (d2-l5).
- **Example details.**
  - The postgres:17 data path in d2-l4 changes in newer Postgres majors.
  - The AWS provider constraint `~> 6.0` in d3-l1 is illustrative.
  - The d4-l1 Collector example uses the batch processor, which is not the newest style.
  - The cache-mount export claim in d2-q12 and d2-l3 rests on the Dockerfile reference.
- **Tools named without citations.** Renovate and cosign are named but not cited, because their docs are not on the allowed source list.
- **Answer-position swaps.** These changed the option order in a number of single-answer questions. Options and rationales moved together and the keys were re-pointed. A spot check in the UI is still worthwhile.

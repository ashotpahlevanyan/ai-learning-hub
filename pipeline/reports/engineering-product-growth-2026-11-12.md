# Assemble report: engineering/product-growth

Bundle: `src/content/tracks/engineering/exams/product-growth.json` (rebuilt 2026-11-12 from domain-d1..d6.json; the partial bundle from the interrupted run was discarded except for the domain summaries and scenario descriptions, which were reused).

## Counts before / after

| | before (coverage.existing) | after | spec target |
|---|---|---|---|
| lessons | 0 | 26 | 22 |
| flashcards | 0 | 153 | 120 |
| questions | 0 | 143 | 120 |

## Per-domain counts vs targets

Target = round(spec.targets.X * weight / 100), lessons min 2.

| domain | weight | lessons | flashcards | questions |
|---|---|---|---|---|
| d1 Metrics that matter | 18 | 5 / 4 | 26 / 22 | 29 / 22 |
| d2 Instrumentation and data | 18 | 5 / 4 | 29 / 22 | 29 / 22 |
| d3 Analysis with SQL | 18 | 5 / 4 | 28 / 22 | 26 / 22 |
| d4 Experimentation | 18 | 4 / 4 | 26 / 22 | 23 / 22 |
| d5 Growth loops and acquisition | 14 | 4 / 3 | 23 / 17 | 18 / 17 |
| d6 Pricing and unit economics | 14 | 3 / 3 | 21 / 17 | 18 / 17 |

All domains meet or exceed their targets.

## Review block

```json
{"date": "2026-11-12", "questionsChecked": 143, "fixed": 38, "dropped": 1}
```

## Verify fixes and drops (from prior.json verified)

### d1 (29 questions checked, 0 key disagreements)

Fixed:
- d1-q10: option B and rationales no longer claim the 11-hour return is 'Day 0', because Mixpanel docs do not define Day 0. They now say it is not Day 1, since rolling Day 1 is 24-48 h. The explanation now notes that rolling is the default.
- d1-q13: reworded the ungrammatical stem to 'Which are the best counter metrics to pair with ... (Select two.)'.
- d1-q2, d1-q6: explanations no longer refer to 'option B', which breaks when options are shuffled. They now describe the correct option by its content.
- d1-q15 and lesson d1-l3: changed 'check data quality first' to match ExP's actual wording (data-quality metrics decide whether the rest can be trusted; an SRM typically invalidates the test).
- d1-q12: replaced the off-topic STEDII-only source with PostHog group analytics (account-level analysis) plus STEDII.
- lesson d1-l2: separated Amplitude's 'rolling' (meaning unbounded) from Mixpanel's rolling time-window mode, which the lesson had merged.
- d1-q2, d1-q3, lesson d1-l1: added the Amplitude North Star blog as a source. It states the 3-5 inputs and the breadth/depth/frequency/efficiency heuristic; the north-star-hub page does not.

Fact fixes:
- Instacart 'total monthly items received on time' attribution: neither Amplitude page states it in text (the blog shows a grocery-app tree only as an image). Changed lesson d1-l1 and flashcard d1-f1 to say 'a grocery-delivery app' example.
- Mixpanel retention: the page defines rolling Day 1 as 24-48 h and calendar Day 1 as the next calendar day, but never defines Day 0. Removed the Day 0 claim from d1-q10.

Dropped:
- none

Remaining concerns:
- d1-q14 (Goodhart's law) has no primary source that states Goodhart. It cites the KDD 2017 pitfalls paper, so the concept is taught without a direct citation.
- d1-q24 and d1-q8 cite STEDII only for general trustworthiness; the source backs them only loosely.
- The claim that the KDD 2017 Dirty Dozen paper says 'check data-quality metrics before the OEC' rests on research.md. I did not re-read the PDF.
- Blind solve file: /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/engineering-product-growth/blind-d1.json; corrected file: /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/engineering-product-growth/domain-d1.json

### d2 (29 questions checked, 0 key disagreements)

Fixed:
- d2-q5: added Microsoft ExP data-quality source (Mixpanel naming page alone did not back quarantine/alerting)
- d2-q16: replaced off-topic PostHog reverse-proxy source with Stripe subscription webhooks docs (renewals arrive server-side via webhooks)
- d2-q26: rationale for 'Partition by event_id' no longer assumes hash partitioning
- d2-q12: added EDPB Guidelines 2/2023 source for the fingerprinting/Art. 5(3) rationale
- d2-l4: added EDPB 2/2023, Planet49, Cookie Banner Taskforce and GA4 data-retention sources for claims made in the lesson
- d2-l3: added GA4 BigQuery Export source for the export-cap claim
- d2-l4 keyPoint: softened 'reject option as easy as accept' to 'always offer a genuine way to reject' (research only backs 'no reject option on any layer = infringement')
- d2-l5: softened unsourced 'tens of millions of rows comfortably' to conceptual wording

Fact fixes:
- Cookie banner keyPoint overstated EDPB taskforce finding; softened
- Postgres scale claim unsourced; softened to conceptual wording

Dropped:
- none

Remaining concerns:
- d2-q2 and d2-q4 tracking-plan/CI/typed-wrapper content is best practice with no official source beyond Mixpanel naming guidance; kept as conceptual
- EDPB 2/2023 wording ('whether or not the data is personal', pixels/URL tracking) is paraphrased; research.md flags exact wording as unverified
- Stripe webhooks URL (docs.stripe.com/billing/subscriptions/webhooks) added without WebFetch in this session; it is a long-standing official page

### d3 (26 questions checked, 0 key disagreements)

Fixed:
- d3-q3: replaced off-topic source (sql-expressions) with PostgreSQL table-expressions/joins docs, which covers join cardinality
- d3-q8: explanation now cites Mixpanel's documented behaviour that average retention counts only completed time periods
- d3-q24: replaced off-topic W3C complex-images source with Mixpanel retention docs (incomplete buckets marked with an asterisk), and the explanation now says so
- d3-l2 'Reading the table' section: added the Mixpanel note that averages count only completed periods and incomplete buckets are flagged, so the right-censoring claim has a source

Fact fixes:
- none

Dropped:
- d3-q22 (truncated bar-chart axis): its only source (W3C WAI complex images) does not support the zero-baseline claim, and no allowed official source backs it. The lesson keeps the idea as conceptual guidance.

Remaining concerns:
- I saved blind answers to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/engineering-product-growth/blind-d3.json. All 27 matched the keys.
- I checked these facts against the live docs: Mixpanel funnels (7-day default window, max 366 days or 12 sessions, Specific Order default, exclusion step cannot be first or last); Mixpanel retention (On or After is the default, rolling Day 1 = 24-48h, Week 1 = 7-14 days, calendar mode, a return about 10h later counts as calendar Day 1 but not rolling Day 1); W3C WAI complex images (short alternative plus long description or data table).
- The d3-l5 dashboard advice (bars start at zero, avoid dual axes, the 'what would you do if it went up or down' test) is uncited best practice. It is framed as guidance, not as a sourced fact.
- Backup of the pre-edit file: /private/tmp/claude-501/-Users-ashotpahlevanyan-MyProjects-maark-claude-cert/d91e9ac6-0abd-4c57-8c32-0d22cae1eafa/scratchpad/domain-d3.bak.json

### d4 (23 questions checked, 0 key disagreements)

Fixed:
- d4-q20: correct option and explanation no longer recommend ensure_experience_continuity, because PostHog's best-practices page warns against relying on experience continuity. The fix is now device bucketing or calling identify() before flags are evaluated.
- d4-q22: rationale 1 reworded. It now says the 4-week test delays a legally required change, instead of the unclear 'holdback creates risk'.
- d4-q2: explanation no longer claims 'group flags hash the group key', which the cited pages don't state. It now says the flag is evaluated at workspace level.
- d4-l1 unit-of-randomisation: group-key hashing claim softened to evaluating the flag at group level.
- d4-l4 bucketing section and keyPoint: continuity advice replaced with device bucketing ($device_id) or identify-before-evaluation, plus PostHog's caution about continuity.
- d4-l4 novelty section: 'short tests can get the long-term sign wrong' softened to 'misjudge the long-term effect'.
- d4-l4 lab: 're-buckets about half' clarified to apply to a 50/50 flag.
- d4-f25: back now says device bucketing or identify() before evaluation.

Fact fixes:
- PostHog experience continuity (ensure_experience_continuity) is discouraged in the PostHog feature-flag best-practices doc, which says values can still change after identify(). Recommending it as a fix was outdated.
- Group flags hashing the group key is not stated on the cited PostHog pages. Softened to conceptual wording.

Dropped:
- none

Remaining concerns:
- The PostHog experiments/statistics page only describes the Bayesian engine. The claim that a frequentist engine exists (and Bayesian is the default) rests on the new-experimentation-engine page, which confirms it. Both pages are cited on q15 and q23.
- The SRM taxonomy stage names (assignment/execution/log processing/analysis) were not re-read from the KDD 2019 PDF in this pass. They match the general taxonomy but were not verified word for word.
- Blind answers saved to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/engineering-product-growth/blind-d4.json. All 23 matched the keys. Corrected file: /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/engineering-product-growth/domain-d4.json

### d5 (18 questions checked, 0 key disagreements)

Fixed:
- Answer-position bias: 13 of 15 single-answer keys were at index 1. Reordered options and rationales together for q1, q4, q5, q6, q7, q9, q10, q12, q13, q14, q15 and q18. The key distribution across indices is now 5/4/7/5, and the rationales still match the options one to one.
- q17: the distractor '3.75 months' matched no plausible miscalculation, and its rationale ('uses blended CAC and also mishandles margin') did not produce that number. Replaced it with '18.75 months', which comes from applying the margin twice, and rewrote the rationale to match.
- q13: added Google Search Central 'JavaScript SEO basics' as a source. Extended the explanation with two points that page backs: server-side or pre-rendering 'is still a great idea', and Google won't render JavaScript from files blocked in robots.txt. This supports the robots.txt distractor's rationale.
- Lesson d5-l3: added Google Search Central sources (build-sitemap, consolidate-duplicate-urls, javascript-seo-basics). The sitemap, canonical-signal and rendering claims previously had only web.dev citations.

Fact fixes:
- q17 distractor 3.75 replaced with 18.75 (margin applied twice) so that the option has a real derivation.

Dropped:
- none

Remaining concerns:
- Several citations back only part of what they're attached to. K-factor and growth loops have no allowed primary source (research.md section c). As a result: q2 cites the Mixpanel funnels doc, which does not back the 1/(1-K) arithmetic; q5 (cycle time) and q1/q6 (loop types) cite Amplitude's North Star hub, which supports only input-metric selection. I kept them because every question needs a source, and the lesson labels K as a course convention.
- research.md flags developers.google.com/search/docs as outside the spec's allowed-source list. It is Google's official documentation, and the orchestrator should confirm it is acceptable.
- I did not re-fetch web.dev/articles/vitals, the Stripe CAC pages, Mixpanel funnels or the Microsoft ExP pages; they rely on research.md. I fetched and confirmed GA4 attribution (support.google.com/analytics/answer/16291112: removal of the rule-based models in November 2023, last click ignoring direct traffic, changes applying to historical data, only event-scoped dimensions affected, fractional credit), web.dev rendering-on-the-web (quotes on crawler limits, SSR and static TTFB), and the Vaver and Koehler 2011 geo-experiments paper.
- Blind-solve file: /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/engineering-product-growth/blind-d5.json (it uses the original option order). Pre-edit backup: /private/tmp/claude-501/-Users-ashotpahlevanyan-MyProjects-maark-claude-cert/d91e9ac6-0abd-4c57-8c32-0d22cae1eafa/scratchpad/domain-d5.bak.json

### d6 (18 questions checked, 0 key disagreements)

Fixed:
- d6-q16: option 3 reworded from 'Managed Payments is for digital products' to 'Managed Payments supports only digital products' so the correct option states the limit clearly; rationale and explanation updated to match the eligibility page (direct integrations only, no Connect platforms)
- d6-q2: replaced the generic Stripe Billing overview source with Stripe's SaaS pricing models resource
- d6-q3: sources now include the SaaS pricing models resource and the Stripe trials doc (kept the usage-based doc)
- d6-q17: replaced the generic Billing overview source with Stripe's 'Change the price of existing subscriptions' doc, which covers swapping the Price and using subscription schedules for end-of-period changes; kept the Prorations doc
- d6-l1: added the SaaS pricing models resource to sources
- d6-l3: added the change-price doc to sources
- Blind answers saved to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/engineering-product-growth/blind-d6.json; all 18 match the keys

Fact fixes:
- d6-l2 CAC payback section: added a note that Stripe's resource gives the formula as CAC / monthly profit per customer (revenue minus the cost of serving that customer) and does not use the term 'gross margin'; the course's revenue x gross margin is the usual way to get that figure. The 12-month 'healthy' benchmark was checked against the source.

Dropped:
- none

Remaining concerns:
- Value metric, per-seat rationing, freemium vs trial and price-testing ethics (d6-l1, q1-q3, q17, q18) are conceptual claims. No official source states them directly; the Stripe resources and docs cited are only adjacent support.
- Stripe's own NRR/GRR and CAC resource pages are vendor guidance, not standards. The LTV:CAC 3:1 figure is already framed as a convention.
- Managed Payments facts were checked against the eligibility page: digital only, direct integrations only, no Connect. The 3.5% fee and the country count (80+ vs 75+) are not stated in the content, which is fine.

## Unverified facts (prior.json research.unverified)

- Exact English wording of EDPB Guidelines 2/2023 on pixels, URL tracking and IP-based tracking (PDF text could not be extracted)
- Cookie Banner Taskforce report details beyond 'no reject option on any layer = infringement'
- Whether PostHog's frequentist engine offers sequential testing and whether PostHog shows SRM warnings
- Microsoft ExP's recommended SRM p-value alert threshold
- Amplitude's '30-50% false positives with peeked T-test' claim (not shown in the page's own table)
- Stripe Managed Payments tax country count (80+ in docs vs 75+ on the UK pricing page)
- Google consent mode behavioural-modelling thresholds
- Stripe-quoted NRR/GRR benchmark medians (102%/91%)
- AARRR, K-factor and growth-loop definitions: no allowed primary source
- Mixpanel max device IDs per identity cluster
- Current plan availability of Amplitude bracket retention

## Research corrections applied

None of the research corrections change spec header fields (id, code, name, level, price, items, minutes, passing, audience, format); they concern lesson content, which the domain writers already applied.

- statsmodels is NOT installed in .pipeline/py (scipy 1.13.1 only): compute power and sample size by hand with scipy.stats.norm; scipy.stats.false_discovery_control, chi2_contingency, chisquare, binomtest, fisher_exact and ttest_ind are available
- Runner scipy is 1.13.1 but the current SciPy release is 1.18.1 (2026-08-21): lab code must work on 1.13
- Stripe now recommends Metronome (now part of Stripe) for new usage-based billing integrations; the Meters API is 'basic usage-based billing' and is still supported
- Stripe has its own merchant-of-record product, Managed Payments: 3.5% on top of processing fees, digital products only, Checkout or Payment Links only, no Connect. The d6 MoR-vs-direct lesson should use it
- Stripe billing_mode defaults to flexible from API version 2025-09-30.clover; prorations are previewed with invoices.create_preview
- UK DUAA 2025 added a PECR statistical-purposes (analytics) consent exception and the ICO final storage/access guidance was published in April 2026; the EU is unchanged (ePrivacy Art. 5(3) still requires consent)
- EU Digital Omnibus is not law: the Council mandate of 21 Oct 2026 dropped GDPR Arts 88a/88b and keeps cookie rules in ePrivacy; trilogue is pending Parliament
- ePrivacy Regulation proposal was withdrawn (OJ C/2025/5423, 6 Oct 2025)
- GA4 removed first-click, linear, time-decay and position-based attribution in Nov 2023; data-driven is the default
- PostHog experiments support Bayesian (default) and frequentist engines; Amplitude Experiment defaults to sequential mSPRT (Welch T-test optional)
- PostHog's 16*var/d^2 rule gives 3,600/arm for 10% to 12%; the exact two-sided formula gives 3,839/arm (the constant is 15.70)
- Spec's allowed source list lacks Google Search Central; developers.google.com/search/docs is used for technical SEO facts. Needs orchestrator OK
- NIST Privacy Framework 1.1 is still a draft; cite 1.0 as current

## Answer positions

Total keyed slots: 166 (121 single-answer, 21 two-answer, 1 three-answer questions); mean 41.5, allowed band ±20% = 33.2-49.8.

| position | before | after |
|---|---|---|
| 0 | 43 | 43 |
| 1 | 71 | 43 |
| 2 | 28 | 40 |
| 3 | 24 | 40 |

28 questions were rebalanced by swapping the over-used key option with an under-used one, with options and rationales moved together. After the swap, every rationale starting with "Correct" sits at an answer index. No option text refers to its position (no "option B", "all of the above" and so on).

## Needs human review

- **Google Search Central sources:** assembly first removed them because `developers.google.com/search` was not an allowed domain. The orchestrator then added it to official-domains.json (engineering) and restored the citations on lesson d5-l3 (build-sitemap, consolidate-duplicate-urls, javascript-seo-basics) and question d5-q13 (javascript-seo-basics).
- d3-q22 (zero-baseline bar charts) was dropped for lack of an allowed source, so d3 question ids skip q22.
- Concepts taught without a direct primary source: Goodhart's law (d1-q14), AARRR, K-factor and growth-loop definitions (d5), and tracking-plan CI practices (d2-q2, d2-q4).
- Time-sensitive facts to recheck: the Stripe Managed Payments terms, Metronome as the recommended usage-billing path, the EU Digital Omnibus status and UK DUAA/ICO guidance.
- Remaining concerns that each verifier listed (above).

## Link check (`npm run check:links -- engineering`), lines for this bundle

```
727 links checked across the engineering track: 726 ok, 0 dead, 1 unverified (a doi.org link in llm-engineering.json, not this bundle). No source URLs in product-growth.json needed replacing.
```

## Tests

`npx vitest run -t "engineering/product-growth"` passes.

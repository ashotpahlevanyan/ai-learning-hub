# Assemble report: engineering/app-security

Bundle: `src/content/tracks/engineering/exams/app-security.json` (assembled 2026-11-12).

## Counts

| | Before (coverage.existing) | After | Target |
|---|---|---|---|
| lessons | 0 | 26 | 22 |
| flashcards | 0 | 151 | 120 |
| questions | 0 | 148 | 120 |

## Per domain vs targets

Target = round(spec target x weight/100); lessons minimum 2.

| Domain | Weight | Lessons (target) | Flashcards (target) | Questions (target) |
|---|---|---|---|---|
| d1 Threat modelling and secure design | 14 | 3 (3) | 22 (17) | 20 (17) |
| d2 Authentication and sessions | 18 | 5 (4) | 28 (22) | 29 (22) |
| d3 Authorization and data protection | 16 | 5 (4) | 24 (19) | 24 (19) |
| d4 Injection and browser security | 20 | 5 (4) | 32 (24) | 29 (24) |
| d5 LLM and agent application security | 18 | 5 (4) | 25 (22) | 25 (22) |
| d6 Supply chain, infrastructure and incident response | 14 | 3 (3) | 20 (17) | 21 (17) |

Every domain meets or exceeds its targets.

## Review record

`{"date":"2026-11-12","questionsChecked":148,"fixed":34,"dropped":0}` (sums over prior.json verified).

## Fixes and drops from blind verification

### d1 (20 questions checked, 11 fixed, 0 dropped, 0 key disagreements)

- Fixed: d1-q5: explanation now names the abused x-middleware-subrequest header and Vercel's 'don't rely on middleware alone' advice; nextjs.org/blog URL (308 redirect) replaced with the Vercel postmortem URL
- Fixed: d1-q9: explanation and sources now cite the OWASP Authorization Cheat Sheet 'deny by default'; the off-topic Top 10 intro source was removed
- Fixed: d1-q10: Level 1 wording matches the ASVS 4.x-to-5.0 doc (70 of 345, first-layer defences, lowers adoption barrier); Level 3 claim softened; ASVS 'For users of 4.x' source added
- Fixed: d1-q11: explanation now says even unchanged requirements were renumbered and that bare IDs are assumed to mean the latest version; source added
- Fixed: d1-q13: A09 name and the Logging Cheat Sheet attack indicators aligned to the source wording
- Fixed: d1-q18: generic 'about code scanning' page (which does not mention PR alerts) supplemented by the 'Triaging code scanning alerts in pull requests' page, which backs PR annotations and the high/critical/error check failure
- Fixed: d1-q19: 'short default' changed to the documented 3-day default for version updates
- Fixed: d1-l1: STRIDE Repudiation property set to 'Accounting (non-repudiation)' per the cheat sheet; LINDDUN, mitigate, accept and ranking wording aligned to the cheat sheet; unsupported '(most common)' removed; CVE anchor detail added; source URL replaced
- Fixed: d1-l2: deny-by-default tied to the OWASP Authorization Cheat Sheet; ASVS counts made exact; L2/L3 descriptions softened to the source's 'choose the level that fits'; renumbering wording fixed; ASVS 4.x doc, Authorization and SSRF cheat sheet sources added
- Fixed: d1-l3: A09 rename rationale quoted; unsupported 'make it impossible to switch off logging' softened; code scanning PR behaviour, the 3-day Dependabot cooldown and org push-protection default (off, needs Secret Protection) stated precisely; code scanning PR and Dependabot options sources added
- Fixed: Flashcards f5, f6, f13, f14, f15, f19 aligned with the source wording
- Dropped: none

Fact fixes:

- The OWASP Threat Modeling Cheat Sheet maps Repudiation to 'Accounting', not 'Non-repudiation'
- Ranking by likelihood times impact 'ignores the work to fix'; fix effort is what some practitioners add, not 'cost'
- Removed the unsupported claim that mitigate is the 'most common' response
- ASVS 5.0.0: 30 May 2025, exactly 345 requirements and 70 at L1 (about 20%), not 'about'
- ASVS sources do not define L2/L3 as 'most apps' vs 'highest-assurance'; wording softened
- Dependabot cooldown default is 3 days and applies to version updates only
- Push protection for org repos is off by default and requires GitHub Secret Protection
- Code scanning annotates new alerts on changed lines; by default the check fails only for error/critical/high severity
- nextjs.org/blog/cve-2025-29927 now 308-redirects to vercel.com/blog/postmortem-on-next-js-middleware-bypass
- The 'about code scanning' page does not mention PR alerts, so a PR-triage page was added

### d2 (29 questions checked, 3 fixed, 0 dropped, 0 key disagreements)

- Fixed: d2-l1 storing-passwords: pepper storage example changed from 'HSM or a secrets manager' to NIST's HSM/TEE/TPM wording
- Fixed: d2-f9: pepper location aligned with NIST SP 800-63B-4 (HSM, TEE or TPM)
- Fixed: d2-l4 where-tokens-live: Keychain/Keystore token storage no longer attributed to RFC 8252; now framed as common practice beyond the RFC
- Dropped: none

Fact fixes:

- Pepper storage: research.md cites NIST as HSM/TEE/TPM; 'secrets manager' was unsupported (lesson d2-l1 and flashcard d2-f9)
- RFC 8252 does not prescribe Keychain/Keystore storage; reworded attribution in d2-l4

### d3 (24 questions checked, 4 fixed, 0 dropped, 0 key disagreements)

- Fixed: d3-q7: the keyed option was technically wrong. Making tenant_isolation AS RESTRICTIVE would leave public_docs as the only permissive policy for the app role, so users would see only public documents. Rewrote the correct option to scope public_docs TO a dedicated marketing role, and rewrote the explanation and rationale. The explanation now says restrictive policies are an extra guard that grants nothing on its own.
- Fixed: d3-q24: added the GitHub Actions secure-use reference (https://docs.github.com/en/actions/reference/security/secure-use) to back SHA pinning, because the CISA alert recommends rotating secrets but not SHA pinning. The explanation now credits each claim to the right source and notes that GitHub now describes workflow dependency lockfiles as a stronger option.
- Fixed: d3-l4 'When a secret leaks': SHA pinning is now credited to GitHub instead of being implied as CISA advice, and the GitHub secure-use source was added to the lesson.
- Fixed: d3-q13 and d3-l3: replaced https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html, which now serves an 'AWS KMS keys' page without envelope encryption, with https://docs.aws.amazon.com/kms/latest/developerguide/data-keys.html, which says to store the encrypted data key with the data and have KMS decrypt it.
- Dropped: none

Fact fixes:

- The CISA tj-actions alert does not itself recommend pinning to a commit SHA, only rotating secrets ('Rotate all identified secrets immediately'). The SHA-pinning claim now cites GitHub Actions docs in both q24 and l4.
- The AWS KMS concepts URL no longer covers envelope encryption. It was replaced with the 'Generate data keys' page.

### d4 (29 questions checked, 5 fixed, 0 dropped, 0 key disagreements)

- Fixed: Replaced the dead OWASP WSTG NoSQL injection URL (it 308-redirects to the generic wstg.owasp.org/latest/ root) with https://wstg.owasp.org/v4.2/4-Web_Application_Security_Testing/07-Input_Validation_Testing/05.6-Testing_for_NoSQL_Injection/ in lesson d4-l1 and question d4-q3. The new page was checked: it covers MongoDB and $where injection.
- Fixed: d4-l5 file-upload section: the text credited Content-Disposition: attachment, nosniff and the SVG risk to the OWASP File Upload Cheat Sheet, which does not mention them. These points are now general serving hardening, and an MDN X-Content-Type-Options source was added.
- Fixed: d4-q29: the explanation now quotes what the File Upload Cheat Sheet actually says (store uploads on a different server). The MDN X-Content-Type-Options source was added for the nosniff claim.
- Fixed: d4-q27 option A: changed 'separate domain' to 'separate server' to match the File Upload Cheat Sheet wording.
- Fixed: d4-f19: reworded upgrade-insecure-requests from 'rewrites subresource URLs' to 'upgrades the page's insecure request URLs'. HSTS is now described as applying to all future requests to the host.
- Dropped: none

Fact fixes:

- The OWASP File Upload Cheat Sheet does not cover Content-Disposition, nosniff or SVG, so these claims are no longer credited to it (d4-l5, d4-q29).
- upgrade-insecure-requests upgrades all of the page's insecure URLs, not only subresources (d4-f19).

### d5 (25 questions checked, 7 fixed, 0 dropped, 0 key disagreements)

- Fixed: d5-l2 keyPoint and gotcha: changed 'tool results or user turns' to 'tool_result blocks (Anthropic) or user messages (OpenAI)'. Anthropic's guidance says untrusted content should not go in plain user text
- Fixed: d5-l2 Rule of Two section: now says the 2026 OWASP LLM01 text credits it to Meta AI (2025) and treats it as a floor
- Fixed: d5-q15: replaced the XSS cheat sheet source with the OWASP CSP cheat sheet, which backs the img-src backstop
- Fixed: Added the 2026 LLM01 raw GitHub source to q4, q6, q7, q9 and q24 and to lesson d5-l2 (it backs the Rule of Two, no reliable prevention, schema validation in code and privileged memory writes)
- Fixed: Added the 2026 LLM08 Hidden Context Exposure source to q10 and lesson d5-l3
- Fixed: Added the LLM06:2025 Excessive Agency page to q1, q18 and q20 and lesson d5-l5 (it backs the three roots: functionality, permissions, autonomy)
- Fixed: Added the missing scenario labels to q2 and q4
- Dropped: none

Fact fixes:

- Lesson d5-l2 and gotcha: untrusted content is no longer placed in generic 'user turns' for Claude, because Anthropic says to use tool_result only

### d6 (21 questions checked, 4 fixed, 0 dropped, 0 key disagreements)

- Fixed: d6-q13: the keyed option listed only USER, runAsNonRoot and allowPrivilegeEscalation, but the Restricted profile also requires dropping ALL capabilities and a RuntimeDefault or Localhost seccomp profile before a pod is admitted. Added both to option 0, and updated the explanation and rationale 0. Corrected rationale 3 to say hostNetwork is disallowed even by Baseline.
- Fixed: d6-l2 containers section and flashcard d6-f14: now list the full set of Restricted securityContext requirements (capabilities drop ALL and the seccomp profile).
- Fixed: d6-l2 sources: added Kubernetes Pod Security Standards, the OWASP SSRF cheat sheet (for the IMDSv2 claim) and the OWASP TLS cheat sheet (for the TLS-version claim).
- Fixed: d6-l3 running-the-incident: added the Planning role, changed the wording to the SRE book's 'living incident document' kept by the incident commander, and added the SRE book chapter 'Managing incidents' as a source.
- Dropped: none

Fact fixes:

- Kubernetes Restricted PSS: added the capabilities drop ALL and seccompProfile RuntimeDefault/Localhost requirements to q13, lesson d6-l2 and flashcard d6-f14.
- SRE incident roles: added Planning and attributed the living incident document to the incident commander, per sre.google/sre-book/managing-incidents/.

## Unverified facts (research.unverified)

- Exact release date of OWASP Top 10:2025 final
- Official 2026 LLM Top 10 definitions other than LLM01 and LLM08, and the official 2025-to-2026 mapping
- Whether 'least agency' is an official named principle of the OWASP Agentic Top 10, and its control details
- RFC 10017 BCP number, and its sections 7-8 on token storage (text was truncated)
- OAuth 2.1 draft -17 Section 10 text, and whether it requires one-time-use refresh tokens
- Status of RFC 8725bis (RFC Editor queue, per search only)
- Current major version and permission names for actions/attest-build-provenance
- Whether Dependabot cooldown applies to security updates (GitHub docs conflict)
- CVE-2025-29927 affected and fixed version ranges (taken from secondary repos)
- Exact React 19 behaviour and error string for blocked javascript: URLs
- Whether Node's --allow-net flag exists on Node 24 (seen only on the v26 docs page)
- NIST 800-63B-4 Sec. 3.2.9 and Appendix B (not read)
- WebAuthn L3 Recommendation date, NIST SP 800-61r3 date, SEC 8-K Item 1.05 and CIRCIA status (from search snippets)
- OWASP Threat Modeling, Logging, Cryptographic Storage, Key Management, Secrets Management, File Upload and CORS cheat sheets (not fetched)

## Answer positions

Before balancing (as written): 0: 64, 1: 54, 2: 41, 3: 14 (173 keyed slots, 23 multi-answer questions; d4 had every key at index 0).
After balancing: 0: 42, 1: 43, 2: 43, 3: 45 (mean 43.25, band 34.6-51.9). Balanced per domain as well: d1 5/6/6/6, d2 8/8/9/9, d3 7/7/7/7, d4 9/8/8/8, d5 7/8/7/8, d6 6/6/6/7.
54 questions had options and rationales permuted together (seed 42; asserted that keyed option text and option-rationale pairs are unchanged, and every rationale starting "Correct" sits at a keyed index). No option text refers to option letters or positions ("all of the above" etc.); d1-q4 options mention threats A/B/C from the stem, which is position-independent.

## Assembly changes outside verified content

- Domain summaries and scenario descriptions were written at assembly (not verified content).
- Header fields come from the spec unchanged; none of the research corrections affect id, code, name, level, price, items, minutes, passing, audience or format.
- The content test rejects sources off the engineering official-domain list, so these were replaced (log: `.pipeline/engineering-app-security/source-replacements.json`):
  - vercel.com postmortem (d1-l1, d1-q5) -> GitHub advisory GHSA-f82v-jwr5-mffw (github.com/vercel). It backs the x-middleware-subrequest header and the workaround, but NOT the "don't rely on middleware alone" advice that d1-q5's explanation attributes to Vercel. The cve.org record is still cited on d1-q5.
  - raw.githubusercontent.com LLM01:2026 / LLM08:2026 markdown (d5-l2, d5-l3, d5-q4, q6, q7, q9, q10, q24) -> genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (de-duplicated where already cited).
  - github.com/OWASP/ASVS "For users of 4.x" (d1-l2, d1-q10, d1-q11) removed; the owasp.org ASVS project page is still cited. That page backs 5.0.0 (30 May 2025) and "bare IDs refer to the latest version" (d1-q11), but not the 345 / 70-at-L1 counts in d1-l2 and d1-q10.
- `npm run check:links -- engineering`: 724 links, 723 ok, 0 dead, 1 unverified (doi.org, in llm-engineering, not this bundle).
- Tests: `npx vitest run -t "engineering/app-security"` matches nothing because the course is not registered in `track.ts` (not edited, per instructions). The same checks as `src/content/content.test.ts` were run against this bundle with a temporary test named `engineering/app-security` (all passed; temp file removed). The study-time check was skipped because it needs the track registration.

## For a human to review

1. Register the course in `src/content/tracks/engineering/track.ts` (and roadmap/track description if wanted), then rerun `npx vitest run -t "engineering/app-security"`, which also checks study time.
2. Decide whether the ASVS counts (345, 70 at L1) and the "don't rely on middleware alone" advice need an official-domain source, or whether github.com/OWASP / vercel.com should go on the engineering official-domain list.
3. The LLM01:2026 and LLM08:2026 quotes now cite the 2026 resource page, not the per-risk text; confirm the page shows that text.
4. Remaining verifier concerns:
   - d1: The 17-chapter count for ASVS 5.0 comes only from a search snippet in research.md; the fetched ASVS pages give 345 and 70 but no chapter count
   - d1: The Logging Cheat Sheet's line about data 'above the logging system's classification' was not confirmed word for word
   - d2: WebAuthn Level 3 Recommendation date (August 2026) rests on a search snippet per research.md; kept as stated in d2-l2
   - d2: RFC 10017 sections 7-8 were truncated in research; content only uses BFF ranking, cookie rules and refresh-token rotation/lifetime cap, which research marks as read
   - d2: Source URLs were not re-fetched; all are canonical official pages (pages.nist.gov, rfc-editor.org, cheatsheetseries.owasp.org, MDN, w3.org, openid.net, datatracker.ietf.org) and match the claims they back
   - d3: GitHub's secure-use docs now call workflow dependency lockfiles stronger than SHA pinning. q24 is still unambiguous because the distractors are clearly wrong, but the d6 supply-chain content may need updating for lockfiles.
   - d3: These sources were not re-fetched; their claims rely on research.md and general knowledge: the OWASP Logging, Cryptographic Storage and Key Management cheat sheets (marked 'not fetched' in research.md), and the PostgreSQL SET and functions-admin pages.
   - d4: React 19 blocking javascript: URLs is supported only by a search snippet in research.md. The OWASP XSS cheat sheet does state it, which I confirmed by fetching the page.
   - d4: research.md marks the CORS, clickjacking and file-upload cheat sheets as not fetched. I fetched the Clickjacking and File Upload cheat sheets and they support the claims as now written. I did not refetch the MDN CORS claims (null origin, wildcard with credentials); they match well-known MDN content.
   - d4: d4-q16's scenario says browsers default to SameSite=Lax 'in many cases'. That is accurate for Chromium only, and the question does not depend on it.
   - d5: Flashcard d5-f11 lists image alt text and document metadata as hiding places for injection payloads. research.md does not name these. They are plausible, and the card says 'any three of'
   - d5: The OWASP Logging cheat sheet was not fetched in research.md. It is official and on topic for q11 and d5-l3
   - d5: q22 explanation says passthrough breaks audience validation, auditing and rate limits. This is consistent with the MCP best practices, but research.md does not quote it
   - d6: research.md says the doc pages disagree on whether Dependabot cooldown applies to security updates. The cited options reference states plainly that cooldown is 'only available for version updates, not security updates', which I checked by WebFetch, so the claims in q4, f4 and the lesson were kept as attributed to that page.
5. Version-sensitive facts dated November 2026 (OWASP LLM Top 10 2026 edition, RFC 10017, OAuth 2.1 draft -17, MCP 2026-07-28, npm v12, SLSA 1.2) should be rechecked when those docs change.

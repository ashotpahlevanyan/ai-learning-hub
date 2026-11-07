export const meta = {
  name: 'cert-prep',
  description: 'Build or upgrade one certification prep bundle from a spec: research, coverage, write, blind-verify, assemble',
  whenToUse: 'Run once per certification spec in web/specs/<track>/<id>.json. args: {root, spec}',
  phases: [
    { title: 'Research', detail: 'confirm exam facts and product facts from official sources' },
    { title: 'Coverage', detail: 'map every blueprint skill to lessons, cards and questions; list gaps' },
    { title: 'Write', detail: 'one writer per domain: fix, extend and fill gaps' },
    { title: 'Verify', detail: 'blind re-answer every question, fact-check, fix or drop' },
    { title: 'Assemble', detail: 'merge domains, balance answer positions, run tests, write report' },
  ],
}

// args: { root: absolute path to web/, spec: <spec object from web/specs/...> }
const { root, spec } = args
const work = `${root}/.pipeline/${spec.track}-${spec.id}`
const out = `${root}/${spec.out}`
const perDomain = d => ({
  lessons: Math.max(2, Math.round((spec.targets.lessons * d.weight) / 100)),
  flashcards: Math.round((spec.targets.flashcards * d.weight) / 100),
  questions: Math.round((spec.targets.questions * d.weight) / 100),
})

const SHAPE = `Exam JSON shape (see ${root}/src/lib/types.ts): lessons {id, domain, title, minutes, summary, sections:[{heading, body}], keyPoints[], gotchas:[{trap, correct}], lab}; flashcards {id, domain, front, back}; questions {id, domain, difficulty 1-3, scenario?, stem, options[4], answer:[indices], explanation (2-4 sentences), rationales[one per option]}. Bodies are Markdown. Multi-answer stems MUST contain "(Select two.)" or "(Select three.)".`

const RULES = `Content rules: original practice items only, never presented as real exam questions. Exactly the keyed answer(s) must be defensible from the sources. Scenario-based judgment items with plausible distractors (common anti-patterns), mostly difficulty 2-3, ~15% multiple-response. Do not state a product fact you cannot support from research.md or an official source; phrase fast-changing specifics (prices, limits, versions) conceptually.`

phase('Research')
const research = await agent(
  `You are the research stage of a certification-prep pipeline for ${spec.name} (${spec.code}).
Spec: ${JSON.stringify(spec)}
1. Create ${work}/ if needed.
2. Fetch the official sources in the spec (WebFetch; WebSearch for anything missing) and check: ${spec.verifyNotes}
3. Write ${work}/research.md: (a) confirmed exam facts with source URLs, and any differences from the spec; (b) per domain, the key product facts a question writer needs, each with its source URL; (c) "Unverified" list of claims you could not confirm; (d) facts that changed recently and must not be stated from memory.
Return the structured summary.`,
  {
    label: 'research',
    schema: {
      type: 'object',
      properties: {
        factsConfirmed: { type: 'boolean' },
        corrections: { type: 'array', items: { type: 'string' } },
        unverified: { type: 'array', items: { type: 'string' } },
        sourcesRead: { type: 'integer' },
      },
      required: ['factsConfirmed', 'corrections', 'unverified', 'sourcesRead'],
    },
  },
)
log(`Research: ${research.sourcesRead} sources read, ${research.corrections.length} corrections, ${research.unverified.length} unverified`)

phase('Coverage')
const coverage = await agent(
  `Coverage stage for ${spec.code}. Read ${work}/research.md and the current bundle at ${out} (it may be "{}" or missing: then everything is a gap).
For every skill in every domain of the spec, list which existing lesson ids, flashcard ids and question ids cover it, and whether coverage is adequate (a lesson section plus at least 2 questions per skill). Also list existing items that look factually doubtful given research.md.
Targets per domain: ${JSON.stringify(spec.domains.map(d => ({ id: d.id, ...perDomain(d) })))}.
Spec domains and skills: ${JSON.stringify(spec.domains)}
Write the full map to ${work}/coverage.json and return the summary.`,
  {
    label: 'coverage',
    schema: {
      type: 'object',
      properties: {
        existing: { type: 'object', properties: { lessons: { type: 'integer' }, flashcards: { type: 'integer' }, questions: { type: 'integer' } }, required: ['lessons', 'flashcards', 'questions'] },
        gaps: { type: 'array', items: { type: 'object', properties: { domain: { type: 'string' }, skill: { type: 'string' } }, required: ['domain', 'skill'] } },
        doubtful: { type: 'array', items: { type: 'string' } },
      },
      required: ['existing', 'gaps', 'doubtful'],
    },
  },
)
log(`Coverage: ${coverage.gaps.length} skill gaps, ${coverage.doubtful.length} doubtful items`)

const VERIFY_SCHEMA = {
  type: 'object',
  properties: {
    domain: { type: 'string' },
    questions: { type: 'integer' },
    keyDisagreements: { type: 'integer' },
    fixed: { type: 'array', items: { type: 'string' } },
    dropped: { type: 'array', items: { type: 'string' } },
    factFixes: { type: 'array', items: { type: 'string' } },
    remainingConcerns: { type: 'array', items: { type: 'string' } },
  },
  required: ['domain', 'questions', 'keyDisagreements', 'fixed', 'dropped', 'factFixes', 'remainingConcerns'],
}

const results = await pipeline(
  spec.domains,
  (d) => agent(
    `Writer for domain ${d.id} "${d.name}" (${d.weight}%) of ${spec.code}.
Inputs: ${work}/research.md, ${work}/coverage.json, current bundle ${out}.
Skills for this domain: ${JSON.stringify(d.skills)}
Produce ${work}/domain-${d.id}.json = {"lessons":[], "flashcards":[], "questions":[]} containing ONLY domain ${d.id} items:
- Keep every existing ${d.id} item (same id) unless it is wrong; fix wrong facts using research.md.
- Fill every gap for this domain listed in coverage.json, then top up to at least ${JSON.stringify(perDomain(d))}.
- New ids must be prefixed "${d.id}-" (e.g. "${d.id}-q7", "${d.id}-l3", "${d.id}-f12") so they never collide.
${SHAPE}
${RULES}
Generate the file with a throwaway Node script under ${work}/ so escaping stays valid; confirm it parses with node. Return a one-line summary with counts.`,
    { label: `write:${d.id}`, phase: 'Write' },
  ),
  (_, d) => agent(
    `Independent verifier for domain ${d.id} "${d.name}" of ${spec.code}. You did not write this content; be skeptical.
File: ${work}/domain-${d.id}.json. Sources: ${work}/research.md (and the official URLs it cites).
Step 1, blind solve: print the questions WITHOUT keys using
  node -e "const q=require('${work}/domain-${d.id}.json').questions;for(const x of q)console.log(JSON.stringify({id:x.id,stem:x.stem,options:x.options}))"
Answer every question yourself from first principles and the sources BEFORE looking at keys. Save {id: [indices]} to ${work}/blind-${d.id}.json.
Step 2, compare with the keys. For each disagreement decide: key wrong (fix the key and explanation), question ambiguous (rewrite so exactly one reading is defensible), or your answer wrong (keep). If a question cannot be made unambiguous and source-backed, DROP it.
Step 3, fact-check every lesson section, flashcard and explanation against research.md; fix unsupported or outdated claims, or soften them to conceptual wording.
Step 4, check rationales match options one-to-one and multi-answer stems say "(Select two.)"/"(Select three.)".
Write the corrected file back to the same path (valid JSON) and return the structured report.`,
    { label: `verify:${d.id}`, phase: 'Verify', schema: VERIFY_SCHEMA },
  ),
)
const verified = results.filter(Boolean)
log(`Verify: ${verified.reduce((s, r) => s + r.keyDisagreements, 0)} key disagreements, ${verified.reduce((s, r) => s + r.fixed.length, 0)} fixed, ${verified.reduce((s, r) => s + r.dropped.length, 0)} dropped`)
if (verified.length < spec.domains.length) log(`WARNING: ${spec.domains.length - verified.length} domain(s) failed to verify; assemble will keep their previous content`)

phase('Assemble')
const assembled = await agent(
  `Assemble stage for ${spec.code}.
1. Build the final bundle at ${out} from the exam facts (spec plus any corrections in ${work}/research.md: ${JSON.stringify(research.corrections)}) and the domain files ${spec.domains.map(d => `${work}/domain-${d.id}.json`).join(', ')}. Spec header fields: ${JSON.stringify({ id: spec.id, kind: spec.kind, code: spec.code, name: spec.name, level: spec.level, price: spec.price, items: spec.items, minutes: spec.minutes, passing: spec.passing, audience: spec.audience, format: spec.format })}. Domains: id, name, weight, plus a 1-2 sentence summary. Scenarios: ${JSON.stringify(spec.scenarios || [])} with short descriptions. If a domain file is missing, keep that domain's items from the previous bundle.
2. Order lessons by domain. Ensure ids are unique across the bundle.
3. Balance correct-answer positions: for questions whose key sits in an over-used position, permute options AND rationales together (keep answer indices pointing at the same text). Target each position 0-3 within ±20% of the mean.
4. Run: cd ${root} && npx vitest run -t "${spec.track}/${spec.id}" and fix until it passes.
5. Set the bundle's top-level "review" to {"date": "${args.date || 'YYYY-MM-DD'}", "questionsChecked": <questions that went through blind verification>, "fixed": <fixed count>, "dropped": <dropped count>}. Omit "review" entirely if any domain failed to verify.
6. Write ${work}/report.md: counts before/after (before: ${JSON.stringify(coverage.existing)}), per-domain counts vs targets, every fix/drop from verification ${JSON.stringify(verified)}, unverified facts ${JSON.stringify(research.unverified)}, and anything a human should review.
Return the structured result.`,
  {
    label: 'assemble',
    schema: {
      type: 'object',
      properties: {
        lessons: { type: 'integer' }, flashcards: { type: 'integer' }, questions: { type: 'integer' },
        testsPass: { type: 'boolean' },
        answerPositions: { type: 'array', items: { type: 'integer' } },
        reportPath: { type: 'string' },
      },
      required: ['lessons', 'flashcards', 'questions', 'testsPass', 'answerPositions', 'reportPath'],
    },
  },
)

return { spec: `${spec.track}/${spec.id}`, research, coverage: { existing: coverage.existing, gaps: coverage.gaps.length, doubtful: coverage.doubtful.length }, verified, assembled }

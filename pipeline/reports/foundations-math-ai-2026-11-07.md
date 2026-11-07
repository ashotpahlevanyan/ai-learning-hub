# MATH-AI assemble report (foundations/math-ai)

Date: 2026-11-07
Bundle: /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/src/content/tracks/foundations/exams/math-ai.json

## Counts

| | Lessons | Flashcards | Questions |
|---|---|---|---|
| Before | 0 | 0 | 0 |
| After | 24 | 135 | 131 |
| Spec target | 20 | 110 | 110 |

All targets are exceeded. No items were dropped.

### Per domain (actual / coverage target)

| Domain | Weight | Lessons | Flashcards | Questions |
|---|---|---|---|---|
| d1 Linear algebra | 22 | 5 / 4 | 31 / 24 | 27 / 24 |
| d2 Calculus and optimisation | 22 | 5 / 4 | 30 / 24 | 28 / 24 |
| d3 Probability and statistics | 20 | 5 / 4 | 26 / 22 | 26 / 22 |
| d4 Information theory, losses and decoding | 16 | 4 / 3 | 24 / 18 | 22 / 18 |
| d5 Transformer and LLM mathematics | 20 | 5 / 4 | 24 / 22 | 28 / 22 |

All five domain files were present, so nothing was carried over from the previous bundle, which was empty anyway.

## Assembly checks

- The header matches the spec. research.md lists no exam-fact differences. The bundle has five scenarios.
- Items are ordered by domain and then by number. All 290 ids are unique.
- **Answer-position balance.** Counts are per keyed option. Before: [60, 37, 29, 24]. After: [41, 37, 36, 36]. The mean is 37.5, so every position is within ±10%. Options and rationales were permuted together in d1-q1 to d1-q19, and each key still points at the same text. No option refers to another option's position.
- `npx vitest run -t "foundations/math-ai"`: passes.
- `npm run check:links -- foundations`: 190 links, 190 ok, 0 dead.
- `review`: {"date":"2026-11-07","questionsChecked":131,"fixed":27,"dropped":0}. All domains verified, with 0 key disagreements.

## Verification fixes

### d1 (27 questions, 0 key disagreements, 7 fixed, 0 dropped)
- d1-q14: RoPE offset-dependence is now attributed to R_m^T R_n = R_{n-m}.
- d1-q6: the `Q @ K.T` rationale now notes the 2.8 deprecation warning and the size-mismatch error.
- d1-q8: added the d2l MLP chapter (affine of affine is affine).
- d1-q12: added the CS229 linalg PDF.
- d1-q13: added the numpy.linalg.cond docs.
- d1-l2: the Habits section now uses `Q @ K.transpose(-2, -1)`.
- d1-l3: added the numpy.linalg.lstsq docs.

### d2 (28 questions, 0 key disagreements, 5 fixed, 0 dropped)
- d2-q20: rewritten as the first step of a fresh optimiser (0.999). With history the value was 0.831.
- d2-q8: the autograd notes are now quoted accurately, and the example is presented as our own illustration.
- d2-l5: the sigmoid bound now reads "at most 0.25^10".
- d2-l5: the Pascanu et al. summary now separates the singular-value conditions from the spectral radius.
- d2-f28: the same bound wording was fixed.

### d3 (26 questions, 0 key disagreements, 5 fixed, 0 dropped)
- d3-q26: the stem now says "per model" (z ≈ 4.4, p ≈ 1e-5).
- d3-q21: the distractor's single-score SE is now about 1.3. The SE of the difference is 1.74 and z = 1.73.
- d3-q7: the rationale for 99.9% now says that option ignores the 1% base rate.
- d3-q21: the scipy ttest_ind source was replaced with the MIT OCW 18.05 readings.
- d3-q2: the statistics-module source was replaced with the numpy.var 2.0 docs.

### d4 (22 questions, 0 key disagreements, 5 fixed, 0 dropped)
- d4-q4: added the BCELoss 2.8 docs (−100 clamp). The float64 rationale now says sigmoid(40) rounds to 1.0.
- d4-q16: the top-k rationale no longer says "nucleus".
- d4-l4: added the BCELoss 2.8 docs.
- d4-l4: softened the calibration-temperature gotcha.
- Keys were spread across A to D.

### d5 (28 questions, 0 key disagreements, 5 fixed, 0 dropped)
- d5-l2: an unsupported softmax-saturation figure was replaced with a conceptual experiment.
- d5-q1: the stem now says outputs are mean-pooled into a classifier.
- d5-q7: the option-0 rationale was reworded.
- d5-q15: the rationale for the 25.8B distractor was clarified.
- Sources added: MQA (d5-l2, d5-q9), the LayerNorm 2.8 docs and Llama 2 (d5-l3), GPTQ and QLoRA (d5-l5), and Llama 2 (d5-q20).

Total fixed: 27. Total dropped: 0.

## Research corrections applied
- PyTorch docs are pinned to 2.8, not "stable" (which redirects to 2.15).
- CS229 is cited through its public PDFs.
- Kaplan's exponent is stated as about 0.73.
- Chinchilla's "20 tokens per parameter" is presented as a rule of thumb. Table 3 and the text disagree for 175B and 280B.
- Chinchilla and Gopher are described as approximately equal in compute (5.88e23 vs 5.04e23).
- Adam has decoupled_weight_decay=False by default; setting it to True gives AdamW behaviour. The default weight_decay is 0.01 for AdamW and 0 for Adam.
- The fp16 maximum is 65504. NumPy displays 65500.0.
- A different KL pair is used, because p=(.5,.25,.25), q=(.25,.5,.25) is symmetric.
- np.var uses ddof=0, while pandas and torch use ddof=1.

## For human review

### Unverified facts
- Adam paper defaults (the PyTorch 2.8 values match).
- LLM.int8 outliers at about 6.7B parameters.
- Chinchilla Table 3 rows below 67B.
- Kaplan N_c = 8.8e13 and D_c = 5.4e13.
- McNemar and paired-test formulas (d3-q24, d3-l4, d3-l5, d3-f24).
- 16 bytes per parameter for Adam (a labelled convention).
- Llama-2 per-model configs (labelled as assumptions).
- The contents of the CS229 PDFs.
- The ECE definition.

### Other concerns
- Some d1 sources point at the generic MIT 18.06SC homepage.
- No cited page states the d4-q2 identity (two-class softmax = sigmoid) outright.
- d4-q17: "one number" vs the key "Recall (and F1)".
- The d3-l5 power figure (about 2,600 per arm) has no recorded run (about 2,629 by formula).
- The d5-q17 distractor has an odd formula label.
- Flashcards have no sources field.
- numpy.org/doc/stable broadcasting is used 4 times and is not pinned.
- blind-d1.json and blind-d4.json refer to the old option order. The current keys still point at the same option text.

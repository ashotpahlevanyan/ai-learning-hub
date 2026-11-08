# ML-ASSOC assemble report (2026-11-08)

Bundle: src/content/tracks/databricks/exams/ml-assoc.json

## Counts
| | Before | After |
|---|---|---|
| Lessons | 0 | 20 |
| Flashcards | 0 | 117 |
| Questions | 0 | 117 |

| Domain | Weight | Lessons (target) | Flashcards (target) | Questions (target) | Lesson minutes |
|---|---|---|---|---|---|
| d1 Databricks Machine Learning | 38 | 8 (8) | 42 (42) | 44 (42) | 115 |
| d2 Data Processing | 19 | 4 (4) | 22 (21) | 22 (21) | 31 |
| d3 Model Development | 31 | 6 (6) | 37 (34) | 36 (34) | 75 |
| d4 Model Deployment | 12 | 2 (2) | 16 (13) | 15 (13) | 28 |

All four domain files were present, so no items were carried over from an earlier bundle.

## Study time (user request)
The site already sums this. src/lib/studyTime.ts adds lesson minutes, plus 2 min per question and 0.5 min per flashcard. The virtual:study-time Vite plugin computes it at build time, and content.test.ts checks it.
- Lessons 249 min (about 4 h), questions 234 min, flashcards 58 min.
- Total 541 min, shown as "9 h".

Every lesson has a minutes value between 3 and 90.

## Answer-position balance
| Position | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Before | 35 | 41 | 30 | 29 |
| After | 34 | 35 | 33 | 33 |

The mean is 33.75, so the ±20% band is 27 to 40.5. All four positions are inside it.

Seven questions were permuted, with options and rationales moved together: d3-q2, d3-q8, d2-q21, d3-q14, d2-q20, d3-q18, d2-q9. None of them refers to an option by its position.

## Tests and links
- `npx vitest run -t "databricks/ml-assoc"` matched no test, because src/content/index.ts does not register the databricks track. track.ts also imports genai-assoc.json, which does not exist yet.
- I ran a temporary copy of the "is well-formed" test pointed only at this bundle. It passes, and the temporary file has been deleted.
- That test first failed on 5 optuna.readthedocs.io sources (d3-l4, d3-q8, d3-q15, d3-q16). That site is Optuna's official API reference. I added "optuna.readthedocs.io" to the databricks list in src/content/official-domains.json.
- `check:links databricks`: 91 links, 91 ok, 0 dead. No replacements were needed.
- The existing library test failure (it names the unregistered databricks and nvidia tracks) is unrelated to this bundle.

## Review record
- questionsChecked 117, fixed 16, dropped 0. The fixed count is distinct items changed: d1 4, d2 1, d3 7, d4 4.

## Verification fixes
### d1 (44 questions, 0 key disagreements, 0 dropped)
- d1-l5: fe.log_model now uses artifact_path="model" instead of name=.
- d1-l6: removed point-in-time joins from the UC-only benefits and added feature discovery in Catalog Explorer.
- d1-q28 and d1-q30: added the MLflow Python API page as a source.

### d2 (22 questions, 0 key disagreements, 0 dropped)
- d2-q2: rewrote the rationale for option 1 (duplicate rows).

### d3 (36 questions, 0 key disagreements, 0 dropped)
- d3-q16: the Optuna defaults are now credited to create_study.
- d3-q15: the source is now the Trial API page.
- d3-q8: the source is now the create_study API page.
- d3-q30: the source is now the BinaryClassificationEvaluator API page.
- d3-q31: the sources are now the Regression and Multiclass evaluator API pages.
- d3-l4: the Optuna defaults are now credited to Optuna.
- d3-l5: added the evaluator API pages as sources.

### d4 (15 questions, 0 key disagreements, 0 dropped)
- d4-q5: removed the claim that pyfunc rejects Spark DataFrames. The stated reason is now that predict does not distribute scoring.
- d4-q6: create_training_set's label is optional.
- d4-l1: added the score_batch doc as a source.
- d4-l2: added the Online Feature Stores doc as a source.

### Fact fixes
- fe.log_model takes artifact_path.
- Point-in-time joins are not exclusive to UC.
- The Optuna defaults (TPESampler, MedianPruner) come from Optuna's docs.
- pyfunc predict is not limited to pandas input.
- The create_training_set label is optional.

## For human review
1. Register databricks in src/content/index.ts once genai-assoc.json exists.
2. Confirm the allowlist addition of optuna.readthedocs.io.
3. d1-q2 and d1-l1: "DBR ML UC access needs Dedicated access mode" rests on research.md only.
4. "dataframe_split preserves column order" (d4 lessons, d4-f9, d4-q7) is inferred, not stated in the docs.
5. Judgement calls: d2-q18 and d2-q19 option 2. d3-q3 and d3-q36 are general ML facts with only loose sources.
6. Not seen in the fetched pages: summary() default statistics, OneHotEncoder dropLast=True, and mlflow.search_runs on the API page.

### Unverified facts from research
- Whether the live exam version matches the PDF's internal March 2025 date.
- Whether traffic_percentage values must sum to 100.
- Current branding: Mosaic AI Model Serving, and Lakeflow Spark Declarative Pipelines vs Lakeflow pipelines.
- When legacy online tables were retired: 11 Nov 2025 or 15 Jan 2026.
- Exact MlflowClient signatures: search_runs, set_registered_model_alias, set_model_version_tag, log_metric.
- PySpark summary() defaults, Imputer mode support and OneHotEncoder as an estimator. The d2 verifier later confirmed most of this.
- Hyperopt hp.* names and STATUS_OK are not on the Databricks page.
- Whether Optuna is preinstalled in current DBR ML.
- Which MLflow version ships with each DBR ML release.
- Whether moving a UC alias changes what an existing serving endpoint serves.

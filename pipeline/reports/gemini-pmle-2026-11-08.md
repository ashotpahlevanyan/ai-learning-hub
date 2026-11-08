# PMLE pipeline report (2026-11-08)

Rebuilt from the workflow result (Assemble did not write report.md).

- Bundle: src/content/tracks/gemini/exams/pmle.json
- Lessons 22, flashcards 129, questions 128
- Review: {"date":"2026-11-08","questionsChecked":128,"fixed":13,"dropped":0}
- Answer positions: [25,28,29,28]

## Log
- Research: 27 sources read, 9 corrections, 11 unverified
- Coverage: 16 skill gaps, 0 doubtful items
- Verify: 0 key disagreements, 24 fixed, 0 dropped

## Research corrections
- Exam facts all check out: 2 hours, 50–60 multiple choice and multiple select questions, $200 plus tax, English and Japanese, online or test-centre proctoring, no prerequisites. Google publishes no passing score, so the spec's 720 is only this site's own convention for mocks.
- Section weights match 13/14/18/20/22/13, but the guide marks Sections 2–6 as approximate (~). Only Section 1 is an exact 13%.
- Vertex AI was renamed Gemini Enterprise Agent Platform on 2026-04-22. Pipelines, Model Registry, Endpoints, Workbench, Feature Store, AutoML and Colab Enterprise are now 'Agent Platform X'. Prediction is now Agent Platform Inference and Training is Agent Platform Managed Training. Vertex AI Search is now Agent Search. The Gen AI evaluation service is now Gen AI evals. Agent Builder was folded into Agent Platform and Agent Engine is now Agent Runtime. The exam guide v3.1 still uses the Vertex AI names.
- Spec d6 relies on Vertex Explainable AI, which was deprecated 2026-03-16 and shuts down 2027-03-16 (replacement: open-source SHAP or LIME). It is still in the exam guide, so teach it and flag the deprecation.
- Feature Store (Legacy) and Optimized online serving were deprecated 2026-02-17 and shut down 2027-02-17. Teach Feature Store V2, which is backed by BigQuery and serves online through Bigtable, plus Vector Search for embeddings.
- Spec d1 lists AutoML for text and video, but AutoML Text was shut down 2025-06-15 and AutoML Video 2025-07-31. AutoML now supports only image and tabular data (classification/regression and forecasting). Gemini prompting and tuning replace text and video.
- Workbench managed notebooks were deleted, and user-managed notebooks were converted to plain Compute Engine VMs, on 2026-03-30. Only Workbench instances remain.
- Dataproc has been renamed Managed Service for Apache Spark, and Dataplex is now Knowledge Catalog.
- The exam guide note says 'Python and Cloud SQL', but the exam page says 'Python and SQL'. Use the page wording.

## Unverified
- BQML function list and syntax (ML.PREDICT, ML.EVALUATE, ML.EXPLAIN_PREDICT, ML.FORECAST, ML.RECOMMEND, ML.GENERATE_TEXT, AI.GENERATE): not on the pages fetched
- The current name of the 'Retail API' (Vertex AI Search for commerce or an Agent Search equivalent)
- Sensitive Data Protection's former name 'Cloud DLP', and details such as format-preserving encryption and l-diversity
- Endpoint autoscaling details (min/max replicas, utilisation targets, scale-to-zero, co-hosting, optimized TF runtime)
- Specifics for Dataflow RunInference, Cloud Composer, MLflow, and Cloud Build/Jenkins CI/CD: no pages fetched
- Third-party claims of a new PMLE exam version in January or June 2026. The official page still links guide v3.1
- Whether TensorBoard, ML Metadata, Explainable AI and Vizier have new Agent Platform names
- Effective dates of the Dataproc and Dataplex renames (secondary sources only)
- Feature Store V2 terms (feature groups, feature views, online stores, point-in-time training data)
- Certification validity period: not stated on the exam page
- Google Responsible AI practices and SAIF details

## Verify d1 (15 questions, 0 key disagreements)
- Fixed: d1-q12: replaced off-topic source (AutoML model types page does not discuss leakage) with the official tabular best-practices page that documents data leakage; explanation tied to that source
- Fixed: d1-q7 and lesson d1-l2: updated Document AI source URL from the 301-redirecting cloud.google.com path to docs.cloud.google.com/document-ai/docs/overview (verified it backs field extraction)
- Fixed: Lesson d1-l3: added the tabular best-practices page as a source for the target-leakage section
- Fixed: Lesson d1-l1: softened 'The exam frames this as the fastest path' to unsourced-neutral wording
- Fixed: Lesson d1-l2: removed the unverified claim that the Retail API covers 'recommendations and search' and noted that its current product name should be checked (research.md lists Retail API naming as unverified)
- Concern: Blind solve matched all 15 keys; saved to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/gemini-pmle/blind-d1.json
- Concern: Retail API current name (Vertex AI Search for commerce) is still unverified in research.md
- Concern: Most source URLs were trusted from research.md (fetched that day) rather than re-fetched; only Document AI overview and the tabular best-practices page were fetched in this pass

## Verify d2 (19 questions, 0 key disagreements)
- Fixed: d2-q11: replaced rationale for 'legacy AI Platform Notebooks' (was an unsupported blanket claim that 'Legacy AI Platform products are shut down') with conceptual wording; explanation now also names Colab Enterprise to match the correct option; added Colab Enterprise source
- Fixed: d2-q11 rationale 3 softened: research only documents AI Platform Training/Prediction/Pipelines shutdowns, not Notebooks specifically
- Concern: Blind solve (saved to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/gemini-pmle/blind-d2.json) matched all 19 keys; lessons, flashcards and explanations otherwise align with research.md (Feature Store V2/Bigtable, Legacy and Optimized serving deprecations, SDP techniques, Workbench executor VPC-SC limit, Colab Enterprise user credentials, Experiments/TensorBoard, Gen AI evals).
- Concern: Claim that adaptive-rubric/LLM-judge metrics need no reference answers (d2-q17, f17, l3 key point) is implied rather than explicitly stated in research.md; considered standard and left as is.
- Concern: All 11 source URLs return HTTP 200 and are official Google/TensorFlow docs; page content was not re-fetched beyond what research.md records.

## Verify d3 (24 questions, 0 key disagreements)
- Fixed: d3-q8: option 0, its rationale and the explanation now say PJRT_DEVICE=TPU is set on TPU v5e/v6e. The TPU page's Dockerfile marks it as a 'v5e, v6e specific requirement'.
- Fixed: d3-q8: rationale 3 now says Google provides no prebuilt JAX container, so JAX training needs a custom container (TPU page).
- Fixed: d3-q18: rationale 1 no longer claims distillation is undocumented. It now explains that distillation learns from a teacher's outputs, while human labels fit SFT directly.
- Fixed: d3-l1 keyPoint: changed 'anything else needs a custom container' to 'frameworks without a prebuilt image (such as JAX) need a custom container'.
- Fixed: d3-l4: the TPU section, a keyPoint and flashcard d3-f11 now scope PJRT_DEVICE=TPU to v5e/v6e. The TPU version list now reads 'documents TPU v2, v3, v5e and v6e VMs'.
- Fixed: Sources: every cloud.google.com/vertex-ai and architecture URL now uses the canonical docs.cloud.google.com host. Five URLs that 301-redirect were replaced with their final gemini-enterprise-agent-platform paths (pipelines, hyperparameter tuning, experiments, tuning, Model Garden). All return 200.
- Fixed: PJRT_DEVICE=TPU is documented as a v5e/v6e requirement, not as a rule for every TPU generation.
- Fixed: The TPU page lists v2, v3 and v5e VMs as configurable and covers v6e separately, noting that TensorFlow is not supported starting with v6e. Wording changed to match.
- Concern: The lesson sections on edge inference, data ingestion (TFRecord sharding) and model-family choice are general ML guidance. research.md does not back them with a specific source, but they are worded at a conceptual level.
- Concern: The distributed-training page says reducer egress should 'match' worker egress, while the content says 'at least'. The meaning is the same, so no change was made.
- Concern: Model Garden page facts (vLLM, tuning through notebooks or pipelines, custom training billing) come from research.md. Only the page's URL was re-checked; its content was not re-fetched.

## Verify d4 (25 questions, 0 key disagreements)
- Fixed: d4-q4: reworded option 2, explanation and rationale so RunInference model updates go through side inputs while the pipeline runs (the source's wording)
- Fixed: d4-q5: kept the pre-built-containers source but retitled it correctly
- Fixed: d4-q20: explanation and rationale now say 'backward compatible, change only the container image' instead of 'drop-in'; both optional optimizations are named as off by default
- Fixed: d4-q21: explanation now matches the online-serving-types doc (feature view syncs to Bigtable online store, continuous sync); added that source
- Fixed: d4-q22: added the online-serving-types source, which says Bigtable online serving doesn't support embeddings management
- Fixed: d4-q23: explanation now gives the doc's reason (no worthwhile performance benefit)
- Fixed: d4-q24: explanation now says 'most settings, including machine type' are fixed
- Fixed: d4-l4: added the online-serving-types and configure-compute sources
- Fixed: d4-l2: TF artifact row reduced to 'a SavedModel directory' (the serve tag / serving_default signature detail is not in the cited source); optimized TF runtime listed as its own prebuilt container
- Fixed: d4-l2 / keyPoint / d4-f16: 'deployment settings fixed' softened to 'most settings, including machine type'; only some resources can be updated in place, and endpoint location and container never can
- Fixed: d4-l3: VPC peering endpoint no longer called 'legacy', now 'older, not recommended'
- Fixed: d4-l4 / d4-f25: optimized TF runtime changed from 'drop-in replacement' to 'backward compatible, no model code changes, gains vary by model'
- Fixed: d4-l4: feature view / online store wording matched to the online-serving-types doc; Bigtable 'does not support embeddings management'
- Fixed: d4-l1 / d4-f7: RunInference 'automatic model updates' changed to 'swap in new model via side inputs without stopping the pipeline'
- Fixed: d4-l1: batch replica start time set to about 5 minutes, per research.md
- Concern: Autoscaling, scale-to-zero, co-hosting, optimized TF runtime, custom container and RunInference facts are listed as Unverified in research.md. I checked them against the live official pages today (2026-11-08), but research.md was not updated.
- Concern: d4-q24 option 0 (edit machine type in place) relies on the deployment page's general statement that settings 'can't be changed' except some unnamed mutable resources. Machine type is not named explicitly, though it is standard Vertex behaviour.
- Concern: Endpoint numeric limits (10 MB, 1.5 MB, 60 s, 1 h, 30,000 QPM) can change; the lessons already include a caveat.

## Verify d5 (29 questions, 0 key disagreements)
- Fixed: d5-f17: softened 'blesses only if it beats the baseline' to 'meets configured thresholds, including comparison with a baseline model' (TFMA blessing is threshold-based)
- Fixed: d5-l2 'Choosing an orchestrator': softened MLflow 'managed equivalents are Experiments and Model Registry' to 'cover similar needs as managed services'
- Fixed: d5-f17 Evaluator blessing semantics
- Fixed: d5-l2 MLflow equivalence claim softened
- Concern: d5-q10 and d5-q29 cite product landing pages (cloud.google.com/composer, cloud.google.com/build). Both return 200 and are official, but research.md has no fetched product facts for Composer or Cloud Build. The claims are generic: Composer is managed Airflow, and Cloud Build is CI.
- Concern: d5-q23 R3 mentions ML.PREDICT, which research.md lists as unverified syntax. It only appears as a distractor and is a long-standing BQML function.

## Verify d6 (16 questions, 0 key disagreements)
- Fixed: d6-q3 rationale for option A: dropped the unsupported claim that v1 has no feature attribution objective. It now says v1 is limited to Agent Platform endpoints and so cannot monitor the GKE-served copy.
- Fixed: d6-l1 key point: changed 'v2 adds feature attribution monitoring' (which implies v1 lacks it) to a neutral list of the v2 objectives.
- Fixed: d6-f3 flashcard: changed 'adds feature attribution monitoring' to list the v2 objectives, so it no longer implies v1 lacks attribution monitoring.
- Fixed: research.md does not say Model Monitoring v1 lacks feature attribution monitoring. Softened the wording in q3, l1 and f3 so it no longer claims v2 'adds' it.
- Concern: d6-q15: research.md does not confirm whether a BigQuery ML model's TRANSFORM preprocessing still applies after the model is registered and deployed to an Agent Platform endpoint. It only says TRANSFORM applies during prediction (ML.PREDICT). The key is defensible because the scenario does not name the serving path.
- Concern: I did not WebFetch the source URLs. All of them are official docs.cloud.google.com, tensorflow.org or services.google.com pages listed in research.md, and they match the claims they support.
- Concern: The Vertex Explainable AI deprecation dates (2026-03-16 deprecated, 2027-03-16 shutdown) are taken from research.md and I did not check them again.

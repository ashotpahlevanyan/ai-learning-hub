# Databricks AI Study Guide

A step-by-step path to pass the two Databricks AI certification exams: **ML-ASSOC** (Databricks Certified Machine Learning Associate) and **GENAI-ASSOC** (Databricks Certified Generative AI Engineer Associate). Use it alongside each exam's study pages on this site: lessons, flashcards, practice questions and timed mock exams.

> **Read this first.** Exam facts below come from the Databricks exam pages and the exam guide PDFs, checked on 8 November 2026. Databricks does not publish a passing score, and section 3 says exactly what is and isn't official. Databricks has renamed or moved to legacy several products since the exam guides were written. This guide teaches the current name and gives the exam-guide name next to it. The practice items on this site are original. They are **not** real exam questions.

---

## Table of contents

1. [How to use this guide](#1-how-to-use-this-guide)
2. [Which exam to take](#2-which-exam-to-take)
3. [Exam facts](#3-exam-facts)
4. [The Databricks platform mental model](#4-the-databricks-platform-mental-model)
5. [ML-ASSOC: Machine Learning Associate](#5-ml-assoc-machine-learning-associate)
6. [GENAI-ASSOC: Generative AI Engineer Associate](#6-genai-assoc-generative-ai-engineer-associate)
7. [Dated changes to watch](#7-dated-changes-to-watch)
8. [Top traps](#8-top-traps)
9. [Study schedules](#9-study-schedules)
10. [Exam-day checklist](#10-exam-day-checklist)
11. [Further reading](#11-further-reading)

---

## 1. How to use this guide

Each exam follows the same loop:

1. **Read** the exam section here (section 5 or 6) to see what is tested and which decisions the questions turn on.
2. **Learn** the lessons for that exam on this site, heaviest domain first.
3. **Recall:** do the flashcards every day. Spaced repetition does the scheduling for you.
4. **Apply:** do the lab at the end of each lesson in a real workspace. [Databricks Free Edition](https://www.databricks.com/learn/free-edition) is enough for most of them. Both exam guides recommend six months of hands-on work, so questions assume you have run the code, not just read about it.
5. **Test:** practise by domain until each one is above 80%, then take full timed mocks.
6. **Fix:** clear the Mistakes notebook and reread section 8 (Top traps) before every mock.
7. **Book** the real exam once you score **85%+ on two mocks in a row**.

Both exams use only multiple-choice and multiple-selection items, which is what this site practises. Code in questions is Python for anything ML; non-ML data manipulation may appear in SQL.

Your progress is saved in your browser. Use **My progress → Export backup** to keep a copy or move it to another device.

---

## 2. Which exam to take

| | **ML-ASSOC** | **GENAI-ASSOC** |
|---|---|---|
| Certification | Databricks Certified Machine Learning Associate | Databricks Certified Generative AI Engineer Associate |
| Level | Associate | Associate |
| Who it's for | Data scientists and ML engineers doing everyday ML on Databricks | Engineers building RAG apps and agents on Databricks |
| Core topics | Runtime for ML, AutoML, Feature Engineering in Unity Catalog, MLflow, Spark ML, tuning, metrics, Model Serving | Agent Bricks, retrieval (AI Search), agent authoring, MLflow tracing and evaluation, Model Serving, governance |
| Heaviest domain | Databricks Machine Learning (38%) | Application Development (30%) |

**Pick ML-ASSOC if** you train tabular models: features, experiments, tuning, metrics and deployment. Almost a fifth of it is classic data preparation (summaries, outliers, imputation, encoding), and a third is model development.

**Pick GENAI-ASSOC if** you build LLM applications: chunking and retrieval, prompts, agents and tools, evaluation with judges, and serving with guardrails. It assumes you already know MLflow and Unity Catalog basics.

**Taking both:** ML-ASSOC first, then GENAI-ASSOC. MLflow, Unity Catalog and Model Serving carry over, and the gen AI exam builds on them. Leave 2–3 weeks between them.

---

## 3. Exam facts

Source pages: [GENAI-ASSOC exam page](https://www.databricks.com/learn/certification/genai-engineer-associate) · [GENAI-ASSOC exam guide (PDF)](https://www.databricks.com/sites/default/files/2026-10/databricks-certified-gen-ai-associate-exam-guide-august-2026.pdf) · [ML-ASSOC exam page](https://www.databricks.com/learn/certification/machine-learning-associate) · [ML-ASSOC exam guide (PDF)](https://www.databricks.com/sites/default/files/2026-10/Databricks-Certified-Machine-Learning-Associate-Exam-Guide-August-2026.pdf)

### Format, time, fee and languages

| Fact | ML-ASSOC | GENAI-ASSOC |
|---|---|---|
| Scored items | **48** multiple-choice and multiple-selection | **45** multiple-choice and multiple-selection |
| Unscored items | Up to 10, not identified, do not count | Up to 10, not identified, do not count |
| Time | **90 minutes** (time for unscored items already included) | **90 minutes** (same) |
| Fee | USD 200 plus applicable taxes | USD 200 plus applicable taxes |
| Languages | English, Japanese, Brazilian Portuguese, Korean | English, Japanese, Brazilian Portuguese, Korean |
| Test aids | None | None |
| Prerequisite | None; related training highly recommended | None; related training highly recommended |
| Recommended experience | 6+ months hands-on with the outline topics | 6+ months hands-on with the outline topics |
| Code language | Python for ML code; SQL possible for non-ML data work | Same |

### Delivery

| Exam | Delivery per official pages |
|---|---|
| ML-ASSOC | Online proctored or at a test centre (guide and exam page agree) |
| GENAI-ASSOC | Guide: **online proctored**. Exam page: **online or at a test centre**. Plan for online and check test centres when you book |

### Retakes and validity

| Rule | Both exams |
|---|---|
| Retakes | After **14 days**, as often as needed; full fee each time, no free retakes |
| Validity | **2 years**; recertify by passing the current live exam |

### Passing score

Databricks **does not publish** a passing score. The exam pages say it is set by statistical analysis and may change when the exam is updated. The 700/1000 used for mocks on this site is a site convention, not a Databricks figure.

### Exam guide versions

Both current guides sit in a `2026-10` folder on databricks.com and carry "August 2026" in the file name.

| | ML-ASSOC guide | GENAI-ASSOC guide |
|---|---|---|
| Date printed inside the guide | Exam published and guide updated 1 March 2025 | Exam published and guide updated 18 March 2026 |
| Names that are now out of date | Delta Live Tables, Hyperopt `fmin` | Mosaic AI Vector Search, AI Gateway, Genie spaces, Multiagent Supervisor, Agent Framework |
| Sample questions | 10, with answer key | 10 |

The ML guide's internal date conflicts with its file name, but its answer key already uses current APIs (`FeatureEngineeringClient`, aliases instead of stages). Treat "the guide currently linked from the exam page" as the blueprint.

Domain weights are listed at the start of sections 5 and 6.

---

## 4. The Databricks platform mental model

Both exams sit on the same platform. Hold this picture in your head.

```
Databricks account
 └── Unity Catalog metastore (governance for data AND AI assets)
      └── catalog            (often one per environment: dev / staging / prod)
           └── schema
                ├── tables (Delta), views, volumes (files)
                ├── models (MLflow models, versions, aliases)
                ├── functions (UC functions, also agent tools)
                └── feature tables, prompts, AI Search indexes ...
 └── Workspaces (notebooks, jobs, compute, experiments, apps, serving endpoints)
```

### 4.1 Workspace, Unity Catalog and Delta

- A **workspace** is where you work: notebooks, jobs, compute, MLflow experiments, serving endpoints and Databricks Apps. Several workspaces can attach to one Unity Catalog metastore.
- **Unity Catalog (UC)** governs data and AI assets with a three-level name: `catalog.schema.object`. Models, feature tables, functions, volumes and prompts all live there, so one set of grants, lineage and audit covers them.
- "Typically an environment (development, staging, or production) corresponds to a catalog in Unity Catalog" ([MLOps deployment patterns](https://docs.databricks.com/aws/en/machine-learning/mlops/deployment-patterns)).
- **Delta tables** are the storage format underneath. A Delta table with a primary key constraint is a feature table. A Delta table with Change Data Feed enabled can feed an AI Search Delta Sync index or an online feature store.

### 4.2 Compute and ML runtimes

- **Databricks Runtime for ML** preinstalls common ML and deep learning libraries. Tick **Machine learning** when creating compute; this sets access mode to **Dedicated** (formerly "single user"). UC data access from the ML runtime needs Dedicated mode ([Runtime for ML](https://docs.databricks.com/aws/en/machine-learning/databricks-runtime-ml)).
- **Standard** access mode (formerly "shared") does **not** support AutoML.
- Photon speeds up Spark SQL, DataFrames and feature engineering, but not single-node Python libraries such as scikit-learn, XGBoost or PyTorch.
- For custom deep learning GPU work, Databricks now recommends **AI Runtime** over Runtime for ML.

### 4.3 MLflow 3

Databricks docs now describe **MLflow 3**, preinstalled in recent ML runtimes ([MLflow on Databricks](https://docs.databricks.com/aws/en/mlflow/)).

| Capability | What to know |
|---|---|
| Tracking | Runs hold params, metrics, tags and artifacts; experiments group runs |
| LoggedModel | A model is a first-class entity with its own ID; URI `models:/<model_id>`. `log_model(..., name=...)` replaces `artifact_path` |
| Models in UC | Default registry URI is `databricks-uc`. Three-level names, **aliases** instead of stages, signature required |
| Tracing | Records inputs, outputs, intermediate steps, latency, tokens and cost for GenAI apps |
| GenAI evaluation | `mlflow.genai.evaluate()` with scorers and LLM judges; `mlflow.evaluate` is deprecated (use `mlflow.models.evaluate` for classic ML) |
| Production monitoring (Beta) | Registered scorers run on sampled production traces |
| Prompt Registry (Beta) | Versioned prompts stored in UC, promoted with aliases |

### 4.4 Feature Engineering in Unity Catalog

- Feature tables are UC Delta tables with a primary key. The `FeatureEngineeringClient` creates, writes and reads them, and packages feature lookups with models ([Feature engineering](https://docs.databricks.com/aws/en/machine-learning/feature-store/)).
- **Offline** = the UC Delta table, used for training and batch scoring. **Online** = **Databricks Online Feature Stores**, powered by Lakebase, for low-latency serving ([Online feature stores](https://docs.databricks.com/aws/en/machine-learning/feature-store/online-feature-store)).
- For new use cases Databricks now recommends **Feature Views** (declarative features with managed pipelines). The exam guide covers feature tables only.

### 4.5 Model Serving, Foundation Model APIs and the gateway

- **Model Serving** is serverless and autoscaling. Each served model is a REST API. It serves custom MLflow models (agents are served as custom models too), Databricks-hosted foundation models through **Foundation Model APIs**, and external models ([Model Serving](https://docs.databricks.com/aws/en/machine-learning/model-serving/)).
- Foundation Model APIs: **pay-per-token** (with a priority tier chosen per request) or **provisioned throughput** (for performance guarantees, fine-tuned models or HIPAA) ([Foundation Model APIs](https://docs.databricks.com/aws/en/machine-learning/foundation-model-apis/)).
- **Unity Gateway** (formerly AI Gateway) governs model and MCP traffic: usage tracking, rate limits, guardrails as service policies, fallbacks, traffic splitting, budgets and **inference tables** that log requests and responses to a UC Delta table ([Unity Gateway](https://docs.databricks.com/aws/en/ai-gateway/)).

### 4.6 The gen AI stack

| Component | Role |
|---|---|
| **Databricks AI Search** (exam guide: Mosaic AI Vector Search) | Vector, hybrid and full-text indexes over Delta tables, with a reranker |
| **Agent Bricks** | The Databricks agent developer platform: Agent Bricks CLI, Agent Runtime, agent memory, MCP tools; also the low-code Knowledge Assistant, Supervisor Agent and Information Extraction |
| **Agent Framework** (exam guide name) | The earlier authoring path: `ResponsesAgent`, deploy to Model Serving or Databricks Apps; now in the legacy docs section |
| **Genie Agents** (exam guide: Genie spaces) | Natural language to SQL over curated UC data; callable through the Genie Conversation API or MCP |
| **Databricks Apps** | Hosts UIs, agents and custom MCP servers with app or user authorization |
| **MCP** | Managed, external and custom MCP servers, governed by UC permissions and Unity Gateway |
| **`ai_query()`** | SQL function for batch inference against serving endpoints and `system.ai` models |
| **Lakeflow pipelines** (formerly Delta Live Tables) | Declarative batch and streaming pipelines; used for streaming inference |

### 4.7 Renamed products and deprecations

Questions may use either name. Learn both.

| Exam guide or older name | Current name or status |
|---|---|
| Mosaic AI Vector Search / Vector Search | **Databricks AI Search** (renamed 1 June 2026; API paths still say `vector-search`, SQL function is `vector_search()`) |
| AI Gateway | **Unity Gateway**; the old per-endpoint experience is "AI Gateway for serving endpoints" (legacy) |
| Genie spaces | **Genie Agents** |
| Multiagent Supervisor | **Supervisor Agent**, legacy since 12 October 2026 |
| Knowledge Assistant | Still Knowledge Assistant, legacy since 12 October 2026 |
| Mosaic AI Agent Framework, `AgentServer` on Apps, agents on Model Serving | **Agent Bricks CLI** with `DurableAgentServer` on Agent Runtime (5 October 2026) |
| AI Playground | Legacy; query models directly or use `agentbricks dev` |
| Delta Live Tables (DLT), `import dlt` | **Lakeflow pipelines** on Spark Declarative Pipelines, `from pyspark import pipelines as dp`; `import dlt` still works |
| Hyperopt | Open source no longer maintained; **not included after Runtime 16.4 LTS ML**. Databricks recommends **Optuna** or Ray Tune |
| Workspace Model Registry with stages | **Models in Unity Catalog with aliases**; workspace registry is legacy and disabled for new UC-default accounts since April 2024 |
| Workspace Feature Store | Deprecated; use Feature Engineering in UC |
| Online tables | Retired; use **Databricks Online Feature Stores** (Lakebase) |
| Single user / shared access mode | **Dedicated** / **Standard** |
| AutoML built into the ML runtime | Not built in from Runtime 18.0 ML; comes from the `databricks-automl-runtime` package |

---

## 5. ML-ASSOC: Machine Learning Associate

ML-ASSOC tests the everyday lakehouse ML workflow: prepare data, track experiments, tune and evaluate models, register them in UC and serve them. Domain 1 alone is 38%, and it is mostly API knowledge, so write the code yourself at least once.

### 5.1 Domain 1: Databricks Machine Learning

Worth 38%. MLOps, runtimes, AutoML, Feature Engineering in UC and MLflow.

**Deploy code vs deploy models** ([deployment patterns](https://docs.databricks.com/aws/en/machine-learning/mlops/deployment-patterns))

| Pattern | How it works | Choose it when |
|---|---|---|
| **Deploy code** (recommended in most cases) | Training code moves dev → staging → prod; the model is retrained in each environment | You have CI/CD and want reviewed, reproducible retraining; prod data stays in prod |
| **Deploy models** | Train once in dev, test in staging, deploy the artifact to prod | Training is very expensive or hard to reproduce, everything is in one workspace, or there is no CI/CD |
| **Hybrid** | Deploy code to staging, train there, deploy the model to prod | Staging can see production-like data |

Deploy models has costs: automated retraining is awkward, and feature, inference and monitoring code must still reach prod separately.

**AutoML** ([AutoML](https://docs.databricks.com/aws/en/machine-learning/automl/))

- A "glass box": it prepares data, trains and tunes several algorithms, and generates a source notebook for every trial. Every trial is an MLflow run.
- Problem types: **classification, regression, forecasting**. Low-code UI or Python API.
- Classification and regression algorithms include decision trees, random forests, logistic or linear regression, XGBoost and LightGBM. Forecasting uses Prophet and Auto-ARIMA.
- On classic compute, the **data exploration notebook** and the **best trial notebook** are imported into the workspace; other trial notebooks are stored as MLflow artifacts.
- SHAP explainability code is included but off by default.
- It needs **Dedicated** access mode. From Runtime 18.0 ML it comes from the `databricks-automl-runtime` package; do not change library versions on that compute.

**Feature Engineering in UC** ([feature tables in UC](https://docs.databricks.com/aws/en/machine-learning/feature-store/uc/feature-tables-uc) · [train with features](https://docs.databricks.com/aws/en/machine-learning/feature-store/train-models-with-feature-store))

UC feature tables are account-level: they get UC governance, lineage, point-in-time joins and sharing across workspaces. The workspace feature store is deprecated.

```python
from databricks.feature_engineering import FeatureEngineeringClient, FeatureLookup
import mlflow

fe = FeatureEngineeringClient()

fe.create_table(name="ml.features.customer", primary_keys="customer_id",
                df=features_df, description="Customer usage features")
fe.write_table(name="ml.features.customer", df=updates_df, mode="merge")

training_set = fe.create_training_set(
    df=labels_df,                                  # keys + label
    feature_lookups=[FeatureLookup(table_name="ml.features.customer",
                                   lookup_key="customer_id")],
    label="label")
train_df = training_set.load_df()

# Log through the client so feature lookup metadata ships with the model
fe.log_model(model=model, artifact_path="model", flavor=mlflow.sklearn,
             training_set=training_set,
             registered_model_name="ml.models.churn")

preds = fe.score_batch(model_uri="models:/ml.models.churn@champion", df=keys_df)
```

- Any UC Delta table with a **primary key constraint** is a feature table. To convert one, set the key column `NOT NULL`, then `ADD CONSTRAINT ... PRIMARY KEY(...)`; add `TIMESERIES` to a timestamp key column for point-in-time lookups. There is no special "feature store" SQL clause.
- `write_table` with `mode="merge"` upserts; rows whose keys are absent from the DataFrame stay unchanged.
- `score_batch` looks up features automatically. Values you pass in the DataFrame override the lookup.
- **Online vs offline:** publish a feature table to an online store with `fe.create_online_store(...)` and `fe.publish_table(...)`. Publish modes are `TRIGGERED` (default), `CONTINUOUS` and `SNAPSHOT`. Publishing needs a non-null primary key, and Change Data Feed for triggered and continuous modes. Model Serving looks up published features automatically.

**MLflow tracking** ([MLflow](https://docs.databricks.com/aws/en/mlflow/))

```python
import mlflow
from mlflow import MlflowClient

with mlflow.start_run():
    mlflow.log_params({"max_depth": 6, "n_estimators": 200})
    model.fit(X_train, y_train)
    mlflow.log_metric("val_auc", auc)
    mlflow.log_artifact("confusion_matrix.png")
    mlflow.sklearn.log_model(model, name="model", input_example=X_train[:5],
                             registered_model_name="ml.models.churn")

best = mlflow.search_runs(experiment_ids=[exp_id],
                          order_by=["metrics.val_auc DESC"], max_results=1)
```

- `mlflow.search_runs` returns a pandas DataFrame; `MlflowClient().search_runs` returns run objects. Both accept `filter_string` and `order_by`. Sort **ascending** for losses (RMSE), **descending** for scores (AUC).
- The MLflow UI shows each run's parameters, metrics and charts, tags, artifacts (model, signature, AutoML notebook), source notebook, start time, duration and user. It compares runs and shows parent and child runs from tuning.

**Models in Unity Catalog** ([manage model lifecycle](https://docs.databricks.com/aws/en/machine-learning/manage-model-lifecycle/))

```python
client = MlflowClient()   # registry URI defaults to databricks-uc in MLflow 3
mv = mlflow.register_model(model_uri, "ml.models.churn")   # e.g. models:/<model_id>
client.set_registered_model_alias("ml.models.churn", "challenger", mv.version)
client.set_model_version_tag("ml.models.churn", mv.version, "validated", "true")

# Promote: move the champion alias to the challenger's version
client.set_registered_model_alias("ml.models.churn", "champion", mv.version)
model = mlflow.pyfunc.load_model("models:/ml.models.churn@champion")
```

- New model versions in UC **must have a signature**; autologging or an `input_example` provides one.
- **Aliases replace stages.** Stages are not supported in UC. An alias points to exactly one version at a time; moving it is the promotion.
- Tags: `set_registered_model_tag` / `delete_registered_model_tag` for the model, `set_model_version_tag` / `delete_model_version_tag` for a version.
- Privileges: `USE CATALOG`, `USE SCHEMA` and `CREATE MODEL`.
- UC registry benefits over the workspace registry: central governance and ACLs, access from every workspace on the metastore, lineage to upstream tables, sharing through Delta Sharing, and environments as catalogs. Promote across environments with `copy_model_version`, then set the alias.

### 5.2 Domain 2: Data Processing

Worth 19% (the exam page calls it "ML Workflows"). Summaries, outliers, visualisation, imputation, encoding and transforms.

**Summaries** ([dbutils](https://docs.databricks.com/aws/en/dev-tools/databricks-utils))

- `df.summary()` returns count, mean, stddev, min, 25%, 50%, 75% and max (approximate percentiles); `df.describe()` returns only count, mean, stddev, min and max.
- `dbutils.data.summarize(df)` profiles a Spark or pandas DataFrame visually; it is approximate by default, `precise=True` for exact counts. `display(df)` adds built-in charts and a data profile.

**Outliers**

- Standard deviation rule: keep rows within mean ± k·σ (k is often 3). Sensitive to the outliers it is trying to remove.
- IQR rule: keep rows within [Q1 − 1.5·IQR, Q3 + 1.5·IQR]. Get quantiles with `approxQuantile` or `percentile_approx`. More robust on skewed data.

**Visualise and compare:** histograms, box or density plots for one continuous feature; bar or count plots for one categorical feature; scatter plots with Pearson or Spearman correlation for two continuous features; contingency tables, chi-square tests or stacked bars for two categorical features; grouped box plots for continuous by category.

**Imputation and encoding**

- **Mean** for roughly symmetric continuous data; **median** for skewed data or data with outliers; **mode** for categoricals. A missing-indicator column helps when missingness itself carries signal.

Spark ML's `Imputer` takes `strategy="mean" | "median" | "mode"`. Nothing picks a strategy for you: look at the distribution first.

- **One-hot encoding** suits linear and distance-based models with low-cardinality nominal features. In Spark ML: `StringIndexer` → `OneHotEncoder` → `VectorAssembler`.
- **Avoid one-hot** for high-cardinality features and usually for tree models: Spark trees handle indexed categoricals natively, and one-hot makes trees sparse and deep. Ordinal features are often better index-encoded.
- **Log transform** right-skewed, positive data spanning orders of magnitude (prices, incomes). Use `log1p` when zeros occur; it is undefined for negatives.

### 5.3 Domain 3: Model Development

Worth 31%. Algorithms, imbalance, pipelines, tuning, validation and metrics.

**Spark ML building blocks** ([ML pipelines](https://spark.apache.org/docs/latest/ml-pipeline.html))

| Concept | Method | Example |
|---|---|---|
| **Transformer** | `transform(df)` returns a new DataFrame | `VectorAssembler`, a fitted model |
| **Estimator** | `fit(df)` returns a Model (which is a Transformer) | `LogisticRegression` → `LogisticRegressionModel` |
| **Pipeline** | An Estimator made of stages; `fit` returns a `PipelineModel` | Indexer, encoder, assembler, classifier |

Stage instances must be unique within a pipeline. Fit the pipeline on training data only, then call `transform` on test data, so no statistics leak from the test set.

**Class imbalance:** class weights or cost-sensitive learning (`weightCol` in Spark ML, `class_weight` in scikit-learn), over- or under-sampling, stratified splits, and metrics such as F1, precision, recall or PR-AUC instead of accuracy.

**Validation and tuning** ([ML tuning](https://spark.apache.org/docs/latest/ml-tuning.html))

- `CrossValidator` evaluates each parameter set k times (once per fold): costlier but more reliable, especially on small data. `TrainValidationSplit` evaluates each set once on a single split: cheaper but noisier. Both refit the best parameters on all the data.
- **Counting models:** grid combinations × k folds, plus one final refit if the question counts it. For example, a 4 × 3 grid with 3 folds trains 36 models during search, 37 with the refit. Read which convention the question uses.
- `parallelism` evaluates parameter sets in parallel; "a value up to 10 should be sufficient for most clusters".
- Evaluators: `RegressionEvaluator`, `BinaryClassificationEvaluator` (default `areaUnderROC`), `MulticlassClassificationEvaluator`.

**Search strategies:** grid is exhaustive over a discrete grid; random samples the space and often wins in high dimensions; Bayesian (TPE) uses past trials to pick the next one.

**Hyperopt (exam wording) and Optuna (current recommendation)** ([Hyperopt concepts](https://docs.databricks.com/aws/en/machine-learning/automl-hyperparam-tuning/hyperopt-concepts) · [Optuna](https://docs.databricks.com/aws/en/machine-learning/automl-hyperparam-tuning/optuna))

| | Hyperopt | Optuna |
|---|---|---|
| Status | Not maintained; not in Runtime ML after 16.4 LTS | Recommended (with Ray Tune) |
| Entry point | `fmin(fn, space, algo, max_evals, trials)` | `study.optimize(objective, n_trials=...)` |
| Objective | Returns a loss to **minimise**; negate AUC to maximise it | `trial.suggest_float/int/categorical` |
| Bayesian algorithm | `tpe.suggest` (`rand.suggest` for random) | `TPESampler` (default) |
| Parallel single-node models | **`SparkTrials`**: one Spark task per trial | `MlflowSparkStudy` with `MlflowStorage` |
| Distributed algorithms (Spark ML) | Default `Trials`, **not** SparkTrials | Run trials sequentially or via Joblib |
| MLflow | Parent run with a child run per trial | MLflow storage tracks trials |

The key Hyperopt decision: `SparkTrials` parallelises **single-machine** libraries such as scikit-learn across workers. A model that is already distributed (Spark ML) should use plain `Trials`.

**Metrics**

| Metric | Use it when | Watch out |
|---|---|---|
| Accuracy | Classes are balanced | Misleading under imbalance |
| F1 | You need a balance of precision and recall | Ignores true negatives |
| Log loss | Calibrated probabilities matter | Punishes confident wrong answers hard |
| ROC AUC | Threshold-independent ranking | PR-AUC is better under heavy imbalance |
| RMSE | Large errors are costly | Sensitive to outliers; in target units |
| MAE | Robust error in target units | Treats all errors linearly |
| R² | Share of variance explained | Not an error in target units |

If the model was trained on `log(y)`, apply `exp` (or `expm1`) to predictions **before** computing RMSE or MAE in the original units.

**Bias and variance:** low training error with high validation error is high variance (overfitting): simplify, regularise or add data. High error on both is high bias: add features or complexity.

### 5.4 Domain 4: Model Deployment

Worth 12%. Batch, streaming and real-time serving, and traffic splitting.

| Requirement | Mode | Tool |
|---|---|---|
| Score whole tables on a schedule, lowest cost | **Batch** | `pyfunc.load_model` + pandas, `spark_udf`, `fe.score_batch`, `ai_query` |
| Continuous arrival, near-real-time | **Streaming** | `spark_udf` inside a Lakeflow pipeline or Structured Streaming |
| Per-request, low latency | **Real-time** | Model Serving REST endpoint |

**Batch and streaming** ([model inference](https://docs.databricks.com/aws/en/machine-learning/model-inference/) · [what happened to DLT](https://docs.databricks.com/aws/en/ldp/concepts/where-is-dlt))

```python
import mlflow
from pyspark import pipelines as dp   # legacy: import dlt

predict = mlflow.pyfunc.spark_udf(spark, "models:/ml.models.churn@champion")

@dp.table   # a streaming table when the source is a stream
def scored_events():
    events = spark.readStream.table("ml.raw.events")
    return events.withColumn("prediction", predict(*feature_cols))
```

- All pyfunc models accept a pandas DataFrame, so `mlflow.pyfunc.load_model(uri).predict(pdf)` is the single-node batch path.
- Lakeflow pipelines give managed autoscaling for streaming inference. The exam guide still says DLT.

**Real-time serving** ([query endpoints](https://docs.databricks.com/aws/en/machine-learning/model-serving/score-custom-model-endpoints) · [multiple models](https://docs.databricks.com/aws/en/machine-learning/model-serving/serve-multiple-models-to-serving-endpoint))

- Deploy a custom model: log a `PythonModel` (or any flavor) with a signature, register it in UC, create an endpoint that serves that model **version**.
- Query: `POST /serving-endpoints/<name>/invocations`. Input formats: `dataframe_split` (recommended), `dataframe_records` (column order not guaranteed), `instances`, `inputs`. Responses come back under `predictions`. Use OAuth machine-to-machine for production.
- Traffic splitting: an endpoint's `served_entities` list several model versions, and `traffic_config.routes` assigns percentages, for example 90 to the champion and 10 to the challenger. Update with `PUT .../config` or "Edit configuration". Query one served model directly through its `served-models/<name>/invocations` path, which bypasses the split.
- An endpoint references a specific version. Moving an alias does not change what an existing endpoint serves until you update its config.

---

## 6. GENAI-ASSOC: Generative AI Engineer Associate

GENAI-ASSOC tests whether you can design, build, deploy, govern and evaluate RAG apps and agents on Databricks. Application Development and Assembling and Deploying together are over half the exam. The guide predates the October 2026 Agent Bricks reorganisation, so know the exam-guide name and the current one.

### 6.1 Domain 1: Design Applications

Worth 14%. Prompts, chain components, tools and when to use Agent Bricks.

**Prompt and pipeline design**

- Write prompts that fix the output format (JSON, a table, a fixed set of labels) and show an example. Prefer structured output (`responseFormat` in `ai_query`) when downstream code parses the result.
- Classify the task first: summarisation, classification, extraction, question answering, generation. The task drives the model, the inputs and the evaluation.
- Translate a business goal into pipeline inputs and outputs: what the user sends, which sources are retrieved, what the app must return, and how success is measured.
- Order tools for multi-stage reasoning: retrieve or look up before generating, validate before acting. Tools are UC functions, MCP servers, Genie Agents and AI Search retrieval ([Agent Bricks CLI](https://docs.databricks.com/aws/en/agents/custom-agents/agent-bricks-cli)).

**Agent Bricks low-code agents** ([Agent Bricks](https://docs.databricks.com/aws/en/generative-ai/agent-bricks/))

| Agent | Use it for | Key facts |
|---|---|---|
| **Knowledge Assistant** (legacy since 12 Oct 2026) | Q&A over documents with citations | Up to 10 sources: UC volume files, UC tables or AI Search indexes. SMEs improve it with example questions, guidelines and labels. Deploys a serving endpoint |
| **Supervisor Agent** (exam guide: Multiagent Supervisor; legacy since 12 Oct 2026) | Coordinating several agents and tools | Up to 50 subagents: Genie Agents, agent endpoints, UC functions, MCP servers, Knowledge Assistants. End users need CAN QUERY on endpoints and SELECT on tables |
| **Information Extraction** | Turning unstructured documents into schema-shaped fields | Runs on `ai_extract`; input is a UC volume or table; schema from natural language, manual definition or JSON; evaluates against labeled ground truth per field |

The exam still names Knowledge Assistant and the Multiagent Supervisor, so learn them. Their documented replacements are Genie Agents (low-code) and the Agent Bricks CLI (code) ([legacy agents](https://docs.databricks.com/aws/en/agents/legacy/)).

### 6.2 Domain 2: Data Preparation

Worth 14%. Parsing, chunking, writing to Delta, retrieval evaluation and reranking.

**Parsing and chunking** ([document parsing](https://docs.databricks.com/aws/en/generative-ai/agent-bricks/document-parsing) · [retrieval quality](https://docs.databricks.com/aws/en/ai-search/retrieval-quality))

- `ai_parse_document` extracts text, tables, layout and metadata from binary files in UC volumes. `ai_prep_search` (Beta) turns parsed output into semantic chunks enriched with titles, headers and page references.
- General Python packages for PDF, HTML and OCR extraction are fair game; know that poor parsing hurts retrieval directly.
- Filter extraneous content before chunking: headers, footers, navigation, boilerplate and duplicates.

- Smaller chunks give precise facts but less context per hit; larger chunks keep context but match less precisely and cost more tokens.
- Overlap keeps sentences that straddle a boundary retrievable. Structure-aware chunking (headings, sections, pages) keeps related content together. Semantic chunking groups sentences by similarity.

Databricks suggests testing several sizes (for example 256, 512 and 1024 tokens) and choosing by retrieval evaluation. The chunk must also fit the embedding model's context length.

**Writing chunks to Delta:** store chunks in a UC Delta table with a primary key, the text, and metadata for filtering (source, page, date). A Delta Sync index on a standard endpoint needs **Change Data Feed** on the source table ([AI Search](https://docs.databricks.com/aws/en/generative-ai/vector-search)).

**Retrieval evaluation and reranking**

- Measure retrieval separately from generation: did the right chunks come back (relevance, sufficiency)?
- Start with **hybrid search**, which Databricks recommends as the default.
- The reranker re-scores the top 50 results before returning `num_results`. Pass `columns_to_rerank` separately from `columns`; only the first 2,000 characters per column are used ([query AI Search](https://docs.databricks.com/aws/en/ai-search/query-ai-search)).

### 6.3 Domain 3: Application Development

Worth 30%. Authoring frameworks, prompts, guardrails, model selection, agents and Genie.

**Authoring paths**

| Path | Status | Shape |
|---|---|---|
| **Agent Bricks CLI** (Beta) | Current | `agentbricks init` / `dev` / `deploy`; LangGraph or OpenAI Agents SDK templates; runs on Agent Runtime with `DurableAgentServer`; MLflow tracing on by default |
| **Agent Framework** (exam guide) | Legacy section since 5 Oct 2026 | `ResponsesAgent` class with `predict()` / `predict_stream()` on Model Serving; MLflow `AgentServer` with `@invoke()` / `@stream()` on Databricks Apps, serving the Responses API |

LangChain, LangGraph and similar libraries plug into either path. Know how prompt augmentation (inserting retrieved context and instructions into the template) differs from prompt adjustment (iterating the wording after evaluation).

**Model selection** ([Foundation Model APIs](https://docs.databricks.com/aws/en/machine-learning/foundation-model-apis/))

- Choose an LLM by task, quality on your evaluation set, context length, latency and cost. Read **model cards** for licence, training data, context window and intended use.
- Choose an embedding model whose context length covers your chunk size, and use the **same** embedding model to index and to query. Databricks-hosted embedding models include `databricks-gte-large-en`, `databricks-bge-large-en` and `databricks-qwen3-embedding-0-6b`.
- Choose between candidates using experiment metrics from MLflow evaluation, not leaderboard impressions. The hosted model line-up changes often; no answer should depend on "the latest model".

**Evaluation vs monitoring in the lifecycle:** evaluation runs offline against a dataset before release; monitoring scores live traffic after release. Both use the same scorers.

**Genie Agents** ([Genie Agents](https://docs.databricks.com/aws/en/genie-agents/) · [Conversation API](https://docs.databricks.com/aws/en/genie-agents/api))

- A natural language to SQL chat over curated UC data, tuned with example SQL, instructions, metrics and verified answers. Up to 50 tables, views or metric views per agent.
- The **Genie Conversation API** (GA since April 2026) lets apps start conversations and send follow-ups with a `conversation_id`.
- In a multi-agent system, Genie Agents act as subagents through the built-in Databricks MCP server. Build a custom orchestrator on Databricks Apps only when you need routing the supervisor cannot do ([multi-agent apps](https://docs.databricks.com/aws/en/agents/custom-agents/multi-agent-apps)).

### 6.4 Domain 4: Assembling and Deploying Applications

Worth 22%. Packaging, retrieval infrastructure, serving, batch inference, memory, MCP, prompts and UIs.

**Packaging a chain or agent**

- Wrap custom logic as an MLflow **pyfunc** with pre- and post-processing. A RAG model needs its flavor, embedding model, retriever, dependencies, an **input example** and a **signature**, then registration in UC.
- Serve it on Model Serving, or deploy it with the Agent Bricks CLI.

**Databricks AI Search** (exam guide: Mosaic AI Vector Search) ([create an index](https://docs.databricks.com/aws/en/ai-search/create-ai-search))

| Endpoint type | Choose it for |
|---|---|
| **Standard** | High QPS and low latency; up to roughly 320M vectors at 768 dimensions |
| **Storage-optimized** | Over 1B vectors, much faster indexing, lower cost at scale; adds about 250 ms query latency; no continuous sync |

| Index type | Embeddings | Freshness |
|---|---|---|
| Delta Sync, Databricks-computed embeddings | Computed from a text column by an embedding endpoint | Syncs from the Delta table |
| Delta Sync, self-managed embeddings | You supply a vector column | Syncs from the Delta table |
| Direct Vector Access | You supply vectors | You write through the REST API |
| Full-text (Beta) | None; BM25 only | Storage-optimized endpoints, triggered sync |

- Query options: `query_type` ANN (default), HYBRID or FULL_TEXT; `filters` on any column; `num_results`; `columns`; `columns_to_rerank`. Hybrid search merges vector and keyword results with RRF and helps with SKUs and IDs.
- ANN uses L2 distance; normalise vectors to get cosine behaviour.
- AI Search has **no row- or column-level permissions**. Enforce access at the table or endpoint level, or split indexes.
- Freshness vs cost: continuous sync is fresher; triggered sync is cheaper and lets you control when updates land.

**Batch inference with `ai_query()`** ([ai_query](https://docs.databricks.com/aws/en/large-language-models/ai-query))

```sql
SELECT contract_id,
       ai_query(
         endpoint        => 'my-extraction-endpoint',
         request         => CONCAT('Extract the renewal date from: ', body),
         modelParameters => named_struct('max_tokens', 200, 'temperature', 0.0),
         failOnError     => false
       ) AS result
FROM legal.contracts.raw_text;
```

- Submit the whole dataset in one query; `failOnError => false` keeps one bad row from failing a large job. For batch, Databricks recommends batch-optimized `system.ai` models over provisioned throughput.
- `ai_query` is not available on Classic SQL warehouses. Calls route through Unity Gateway for usage tracking, budgets and permission checks, but **guardrails, inference tables, rate limits and fallbacks do not apply**.

**Access control from serving and apps** ([Apps auth](https://docs.databricks.com/aws/en/dev-tools/databricks-apps/auth))

| Mode | Identity | Use it when |
|---|---|---|
| App authorization | The app's service principal | Every user should see the same data |
| User authorization (on behalf of the user) | The signed-in user's token, scoped (for example `model-serving`, `sql`, `genie`) | Each user's UC permissions, row filters and column masks must apply |

Serving endpoint permissions include CAN QUERY and CAN MANAGE. Never put a personal access token in browser code.

**Memory** ([managed memory](https://docs.databricks.com/aws/en/agents/agent-memory/managed-memory))

- **Sessions** (Beta) keep continuity inside one conversation.
- **Agent memory** (Beta, Lakebase-backed) keeps facts across conversations, keyed by actor, session and path, with semantic search and store-level ACLs.
- Self-managed Lakebase memory and managed memory stores are legacy.

**MCP** ([MCP on Databricks](https://docs.databricks.com/aws/en/generative-ai/mcp/))

| Kind | Example | Governance |
|---|---|---|
| Managed | Databricks-provided servers such as Databricks SQL, Genie One and AI Search | UC permissions |
| External | Third-party servers added through the MCPs UI; credentials kept out of code | UC permissions, Unity Gateway |
| Custom | Your own server hosted on Databricks Apps, for example wrapping a REST API | App auth, Unity Gateway |

Unity Gateway can rate-limit MCP calls and apply PII policies to tool calls.

**Prompt Registry** (Beta) ([Prompt Registry](https://docs.databricks.com/aws/en/mlflow3/genai/prompt-version-mgmt/prompt-registry/))

```python
import mlflow

p = mlflow.genai.register_prompt(
    name="hr.assistant.answer_prompt",
    template="Answer using only this context:\n{{context}}\n\nQuestion: {{question}}")
mlflow.genai.set_prompt_alias("hr.assistant.answer_prompt", alias="production", version=p.version)

prompt = mlflow.genai.load_prompt("prompts:/hr.assistant.answer_prompt@production")
text = prompt.format(context=ctx, question=q)
```

Prompts live in UC and need `CREATE FUNCTION`, `EXECUTE` and `MANAGE` on the schema. Templates use double braces; `to_single_brace_format()` converts for LangChain. Promoting a prompt means moving its alias, exactly like a model.

**CI/CD:** test components (retriever, tools, prompt) separately, run an evaluation gate before promotion, rebuild or resync indexes when source data changes, and promote prompts and models with aliases.

**User interfaces:** Databricks Apps host chat UIs (Agent Bricks CLI projects include one). Genie also has apps for Slack (Public Preview) and Microsoft Teams (Beta).

### 6.5 Domain 5: Governance

Worth 8%. Masking, guardrails, licensing and problematic source text.

- **Unity Gateway guardrails** are **service policies**: built-in, custom or external. They run at the input phase (before the model) or the output phase (before the response). The built-in Sensitive Data Detection policy can block PII such as US social security or credit card numbers, including in MCP tool calls ([service policies](https://docs.databricks.com/aws/en/data-governance/unity-catalog/service-policies/)).
- **Legacy AI Gateway guardrails** on serving endpoints offer safety filtering and PII block or mask. They are not supported on custom model endpoints, and detection is not guaranteed complete ([configure endpoints](https://docs.databricks.com/aws/en/ai-gateway/configure-ai-gateway-endpoints)).
- **Masking as a guardrail:** UC column masks and row filters protect data at the source and apply when apps use user authorization. Masking the source beats hoping the model will not repeat it.
- **Malicious input:** screen inputs (jailbreaks, prompt injection) before the model, and keep tools on least privilege.
- **Licensing:** check that source data and models allow your use (commercial terms, attribution, redistribution). Model cards and data licences are the evidence.
- **Problematic source text:** remove or flag toxic, biased or out-of-date content before indexing; retrieval will surface whatever you index.

### 6.6 Domain 6: Evaluation and Monitoring

Worth 12%. Metrics, MLflow evaluation, judges, tracing, inference tables, gateway usage and cost.

**MLflow GenAI evaluation** ([evaluate and monitor](https://docs.databricks.com/aws/en/mlflow3/genai/eval-monitor/) · [judges](https://docs.databricks.com/aws/en/mlflow3/genai/eval-monitor/concepts/judges/))

The loop: trace → find an issue → collect feedback or a dataset → write a scorer → fix → evaluate → monitor.

| Ground truth | Built-in judges |
|---|---|
| **Required** | `Correctness`, `RetrievalSufficiency`, `ToolCallCorrectness` |
| Not required | `RelevanceToQuery`, `RetrievalRelevance`, `RetrievalGroundedness`, `Safety`, `Guidelines` (you supply the guidelines), `ToolCallEfficiency` |

- Multi-turn (session) judges cover conversation completeness, user frustration, knowledge retention and conversational safety.
- Write custom code scorers with `@scorer`, and align judges with human feedback from SMEs ([human feedback](https://docs.databricks.com/aws/en/mlflow3/genai/human-feedback/)).
- **Tracing** records each step's inputs, outputs, latency, tokens and cost. Use it to find where a bad answer came from: retrieval, prompt or model.

**Production monitoring** (Beta) ([production monitoring](https://docs.databricks.com/aws/en/mlflow3/genai/eval-monitor/production-monitoring))

```python
from mlflow.genai.scorers import Safety, ScorerSamplingConfig

safety = Safety().register(name="prod_safety")
safety = safety.start(sampling_config=ScorerSamplingConfig(sample_rate=0.2))
```

Up to 20 active scorers per experiment; results take 15–20 minutes. Sample expensive judges at low rates to control cost.

**Inference tables and gateway usage** ([inference tables](https://docs.databricks.com/aws/en/ai-gateway/inference-tables))

- Inference tables log requests and responses to a UC Delta table that Databricks creates. Rows can take up to an hour to appear; very large payloads and some error responses may not be logged. They do not apply to `ai_query`.
- Usage tracking lives in system tables. Rate limits, budgets, fallbacks and traffic splitting are Unity Gateway features.

**Key metrics and cost control:** watch latency and time to first token, error and status codes, tokens and cost per request, and judge scores (groundedness, relevance, safety) for quality drift. Cut cost with smaller models where quality holds, pay-per-token for spiky traffic, provisioned throughput for steady high volume, `ai_query` on `system.ai` models for batch, rate limits and budgets, and low scorer sampling rates.

---

## 7. Dated changes to watch

As of 8 November 2026. Recheck anything dated near your exam.

| Date | Change | What it means for answers |
|---|---|---|
| April 2024 | Workspace Model Registry disabled for new UC-default accounts | Register models in UC; use aliases |
| 1 March 2025 | ML-ASSOC exam published (date printed in the guide) | The ML blueprint |
| 18 March 2026 | GENAI-ASSOC exam published and guide updated | The gen AI blueprint |
| April 2026 | Genie Conversation API GA | Programmatic Genie access is standard |
| 1 June 2026 | Mosaic AI Vector Search renamed **Databricks AI Search** | Both names refer to the same service |
| 11 June 2026 | `ai_extract` GA | Information Extraction runs on it |
| 5 October 2026 | Agent Bricks becomes the agent platform; Agent Framework servers move to legacy | Exam may still say Agent Framework |
| 12 October 2026 | Knowledge Assistant and Supervisor Agent move to legacy | Still tested; replacements are Genie Agents and the Agent Bricks CLI |
| 2026 | AI Gateway becomes **Unity Gateway** | Guardrails are service policies |
| After Runtime 16.4 LTS ML | Hyperopt no longer included | Exam tests `fmin`; new work uses Optuna |
| Runtime 18.0 ML | AutoML not built in | Installed from `databricks-automl-runtime` |

**Other changes:** online tables are retired in favour of Online Feature Stores; Feature Views are recommended for new feature work; DLT is now Lakeflow pipelines; MLflow 3 replaced `artifact_path` with `name` and deprecated `mlflow.evaluate`; Prompt Registry, production monitoring, agent memory and the Agent Bricks CLI are still Beta. Foundation models are added and retired constantly.

---

## 8. Top traps

1. **Stages in UC.** UC models use aliases (`@champion`), not Staging or Production stages.
2. **Promotion means retraining.** Promoting challenger to champion moves an alias. No retraining, no new version.
3. **Plain `mlflow.<flavor>.log_model` with feature tables.** Use `fe.log_model` with the `training_set`, or `score_batch` cannot look up features.
4. **A special SQL clause makes a feature table.** A primary key constraint does.
5. **SparkTrials for Spark ML.** SparkTrials is for single-machine models; distributed models use `Trials`.
6. **Maximising in `fmin`.** It minimises; return the negative of a score.
7. **Hyperopt for new work.** It is unmaintained and missing from newer runtimes. Optuna is the current answer outside exam-guide wording.
8. **Counting CV models.** Grid × folds, plus one refit only if the question counts it.
9. **RMSE on log predictions.** Exponentiate first.
10. **Accuracy on imbalanced data.** Use F1, precision, recall or PR-AUC.
11. **One-hot for trees or high cardinality.** Index-encode instead.
12. **Mean imputation on skewed data.** Use the median; mode for categoricals.
13. **AutoML on Standard access mode.** It needs Dedicated.
14. **Moving an alias redeploys the endpoint.** Endpoints serve a specific version.
15. **`dataframe_records` keeps column order.** It doesn't; `dataframe_split` is recommended.
16. **Judges without labels.** `Correctness`, `RetrievalSufficiency` and `ToolCallCorrectness` need ground truth.
17. **Guardrails on `ai_query`.** Guardrails, inference tables, rate limits and fallbacks do not apply to it.
18. **Row-level security in AI Search.** It has none; secure at table, endpoint or index level.
19. **Storage-optimized for low-latency chat.** It adds query latency; standard endpoints serve high-QPS traffic.
20. **Different embedding models for index and query.** Use the same one.
21. **A PAT in the browser.** Use app or user authorization in Databricks Apps.
22. **Evaluation equals monitoring.** Evaluation is offline before release; monitoring scores live traffic.
23. **Old names as distractors.** Vector Search, AI Gateway, Genie spaces and DLT are old names for current services, not separate products.

---

## 9. Study schedules

### 4-week plan: ML-ASSOC (about 1 hour a day)

| Week | Focus |
|---|---|
| 1 | Section 4 mental model. Domain 1: runtimes, AutoML run, MLflow logging and `search_runs`, register in UC, aliases and tags. Daily flashcards. |
| 2 | Domain 1 Feature Engineering: create, write, train with `FeatureLookup`, `fe.log_model`, `score_batch`, online store publishing. Domain 2: summaries, outliers, imputation, encoding, log transforms. |
| 3 | Domain 3: Spark ML pipelines, CrossValidator vs TrainValidationSplit, Hyperopt and Optuna, metrics, bias-variance. Domain 4: batch, streaming and real-time serving, traffic split. Domain practice to 80%+. |
| 4 | Mixed practice, the Mistakes notebook, two full mocks (90 minutes), section 8. Book when you hit 85%+ twice. |

### 6-week plan: GENAI-ASSOC (1–1.5 hours a day)

| Week | Focus |
|---|---|
| 1 | Section 4 mental model and renamed products. Domain 1: prompts, task types, tool ordering, Agent Bricks agents. |
| 2 | Domain 2: parse documents, compare chunk sizes, write chunks to a Delta table with Change Data Feed, build an AI Search index, try hybrid search and reranking. |
| 3 | Domain 3: author an agent (Agent Bricks CLI or `ResponsesAgent`), model selection, Genie Agents and the Conversation API. |
| 4 | Domain 4: package and register a chain, serve it, `ai_query` batch job, Apps authorization modes, MCP, Prompt Registry, memory. |
| 5 | Domains 5 and 6: service policies, masking, `mlflow.genai.evaluate` with built-in judges, a custom scorer, production monitoring, inference tables. Domain practice to 80%+. |
| 6 | Mixed practice, timed mocks, section 7 dates, section 8 traps. Book when you hit 85%+ twice. |

---

## 10. Exam-day checklist

**Before**

- [ ] Recheck the exam page for a new exam guide and section 7 for renames and legacy moves.
- [ ] For online proctoring, test the machine, webcam and network you'll use, and clear your desk. No test aids are allowed.

**During**

- [ ] About 2 minutes per item: 90 minutes for 45 or 48 scored items plus up to 10 unscored ones.
- [ ] Treat every item as scored; you can't tell which are not.
- [ ] Read the constraint first (latency, cost, freshness, governance, least privilege), then the options.
- [ ] For multiple-selection items, count how many answers the stem asks for.
- [ ] Match old and new names (DLT and Lakeflow pipelines, Vector Search and AI Search) before ruling an option out.

**After**

- [ ] If you failed, wait the 14 days and work on your weakest domains before rebooking; each attempt costs the full fee.
- [ ] If you passed, note the two-year expiry and plan to pass the current exam before it.

---

## 11. Further reading

- **On this site:** [Library: Databricks AI books, courses and papers](/library?track=databricks)
- **Exams:** [GENAI-ASSOC exam page](https://www.databricks.com/learn/certification/genai-engineer-associate) · [GENAI-ASSOC exam guide](https://www.databricks.com/sites/default/files/2026-10/databricks-certified-gen-ai-associate-exam-guide-august-2026.pdf) · [ML-ASSOC exam page](https://www.databricks.com/learn/certification/machine-learning-associate) · [ML-ASSOC exam guide](https://www.databricks.com/sites/default/files/2026-10/Databricks-Certified-Machine-Learning-Associate-Exam-Guide-August-2026.pdf) · [Databricks Free Edition](https://www.databricks.com/learn/free-edition)
- **Machine learning:** [Machine learning on Databricks](https://docs.databricks.com/aws/en/machine-learning/) · [Runtime for ML](https://docs.databricks.com/aws/en/machine-learning/databricks-runtime-ml) · [AutoML](https://docs.databricks.com/aws/en/machine-learning/automl/) · [Feature engineering](https://docs.databricks.com/aws/en/machine-learning/feature-store/) · [Online feature stores](https://docs.databricks.com/aws/en/machine-learning/feature-store/online-feature-store) · [MLOps deployment patterns](https://docs.databricks.com/aws/en/machine-learning/mlops/deployment-patterns) · [Hyperparameter tuning](https://docs.databricks.com/aws/en/machine-learning/automl-hyperparam-tuning/) · [Model inference](https://docs.databricks.com/aws/en/machine-learning/model-inference/)
- **MLflow:** [MLflow on Databricks](https://docs.databricks.com/aws/en/mlflow/) · [MLflow 3 install](https://docs.databricks.com/aws/en/mlflow/mlflow-3-install) · [Models in Unity Catalog](https://docs.databricks.com/aws/en/machine-learning/manage-model-lifecycle/) · [MLflow 3 for GenAI](https://docs.databricks.com/aws/en/mlflow3/genai/) · [Judges](https://docs.databricks.com/aws/en/mlflow3/genai/eval-monitor/concepts/judges/) · [Prompt Registry](https://docs.databricks.com/aws/en/mlflow3/genai/prompt-version-mgmt/prompt-registry/) · [MLflow pyfunc API](https://mlflow.org/docs/latest/api_reference/python_api/mlflow.pyfunc.html)
- **Serving and gateway:** [Model Serving](https://docs.databricks.com/aws/en/machine-learning/model-serving/) · [Query custom model endpoints](https://docs.databricks.com/aws/en/machine-learning/model-serving/score-custom-model-endpoints) · [Serve multiple models](https://docs.databricks.com/aws/en/machine-learning/model-serving/serve-multiple-models-to-serving-endpoint) · [Foundation Model APIs](https://docs.databricks.com/aws/en/machine-learning/foundation-model-apis/) · [Unity Gateway](https://docs.databricks.com/aws/en/ai-gateway/) · [Inference tables](https://docs.databricks.com/aws/en/ai-gateway/inference-tables) · [ai_query](https://docs.databricks.com/aws/en/large-language-models/ai-query)
- **Agents and retrieval:** [Agent Bricks](https://docs.databricks.com/aws/en/generative-ai/agent-bricks/) · [Agent Bricks CLI](https://docs.databricks.com/aws/en/agents/custom-agents/agent-bricks-cli) · [Legacy agents](https://docs.databricks.com/aws/en/agents/legacy/) · [AI Search](https://docs.databricks.com/aws/en/generative-ai/vector-search) · [Retrieval quality](https://docs.databricks.com/aws/en/ai-search/retrieval-quality) · [Genie Agents](https://docs.databricks.com/aws/en/genie-agents/) · [MCP](https://docs.databricks.com/aws/en/generative-ai/mcp/) · [Apps authorization](https://docs.databricks.com/aws/en/dev-tools/databricks-apps/auth) · [Service policies](https://docs.databricks.com/aws/en/data-governance/unity-catalog/service-policies/)
- **Spark ML:** [ML guide](https://spark.apache.org/docs/latest/ml-guide.html) · [Pipelines](https://spark.apache.org/docs/latest/ml-pipeline.html) · [Tuning](https://spark.apache.org/docs/latest/ml-tuning.html)

All facts were checked on 8 November 2026. Databricks renames products and moves features between Beta, GA and legacy every few months. Confirm anything marked Beta, legacy or dated in section 7 before you rely on it.

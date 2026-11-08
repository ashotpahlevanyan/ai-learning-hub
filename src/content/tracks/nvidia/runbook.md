# NVIDIA AI Study Guide

A step-by-step path to pass two NVIDIA certification exams: **NCA-GENL** (NVIDIA-Certified Associate: Generative AI LLMs) and **NCP-AAI** (NVIDIA-Certified Professional: Agentic AI). Use it alongside each exam's study pages on this site: lessons, flashcards, practice questions and timed mock exams.

> **Read this first.** Exam facts below come from the NVIDIA exam pages, the certification hub and the official NCP-AAI study guide, checked on 8 November 2026. NVIDIA publishes no passing score, and the NCP-AAI exam page and study guide disagree on two domain weights; section 3 says exactly what is and isn't official. NVIDIA renames and retires products often, so check the exam page before you book. The practice items on this site are original. They are **not** real exam questions.

---

## Table of contents

1. [How to use this guide](#1-how-to-use-this-guide)
2. [Which exam to take](#2-which-exam-to-take)
3. [Exam facts](#3-exam-facts)
4. [The NVIDIA stack mental model](#4-the-nvidia-stack-mental-model)
5. [NCA-GENL: Generative AI LLMs](#5-nca-genl-generative-ai-llms)
6. [NCP-AAI: Agentic AI](#6-ncp-aai-agentic-ai)
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
4. **Apply:** do the lab at the end of each lesson. NCA-GENL rewards having run Python notebooks (pandas, scikit-learn, spaCy, a Hugging Face model, a NIM endpoint). NCP-AAI expects hands-on agent work: tool calling, evaluation runs, a guardrails config and a containerized deployment.
5. **Test:** practise by domain until each one is above 80%, then take full timed mocks.
6. **Fix:** clear the Mistakes notebook and reread section 8 (Top traps) before every mock.
7. **Book** the real exam once you score **85%+ on two mocks in a row**.

NVIDIA publishes no passing score and no score report, so the mocks here use a site convention of **700 on a 100–1000 scale**. Treat that as a readiness signal, not as NVIDIA's cut score.

Your progress is saved in your browser. Use **My progress → Export backup** to keep a copy or move it to another device.

---

## 2. Which exam to take

| | **NCA-GENL** | **NCP-AAI** |
|---|---|---|
| Certification | NVIDIA-Certified Associate: Generative AI LLMs | NVIDIA-Certified Professional: Agentic AI |
| Level | Associate (entry level) | Professional (the page also calls it "intermediate-level") |
| Who it's for | People with a "basic understanding of generative AI and LLMs" | AI engineers with production agent experience: the page says 1–2 years in AI/ML roles, the study guide says 2–3 years |
| Breadth | ML fundamentals, transformers, data analysis, experimentation, trustworthy AI | Agent architecture, development, evaluation, deployment, memory, RAG, NVIDIA platform, safety, oversight |
| Depth | Know the concept and the right tool | Design, build, evaluate, deploy and operate it |
| Length | 1 hour, 50–60 questions | 120 minutes, 60–70 questions |

**Pick NCA-GENL if** you are new to LLMs, or you come from software or data science and want a first NVIDIA credential. It is broad and shallow: classic ML (feature engineering, cross-validation, explained variance), transformers and prompting, RAG basics, data prep and visualization, experiment design and trustworthy AI. The official subtopics barely name NVIDIA products, so expect general ML and Python questions alongside the NVIDIA stack.

**Pick NCP-AAI if** you already build agents in production. It is scenario-driven: which architecture, which memory design, which evaluation, which deployment pattern, which guardrail.

**Taking both:** NCA-GENL first, then NCP-AAI. The associate exam's transformers, RAG, evaluation and guardrails material is the foundation the professional exam assumes. Leave 2–4 weeks between them.

NCA-GENL is a separate exam from the professional **NCP-GENL** (Generative AI LLMs Professional), which this site does not cover.

---

## 3. Exam facts

### NCA-GENL facts

| Fact | Value | Status |
|---|---|---|
| Exam | NVIDIA-Certified Associate: Generative AI LLMs (NCA-GENL) | Official ([exam page](https://www.nvidia.com/en-us/learn/certification/generative-ai-llm-associate/)) |
| Duration | **1 hour** | Official |
| Questions | **50–60**, multiple choice | Official |
| Price | **$125** | Official |
| Language | English | Official |
| Prerequisites | "Basic understanding of generative AI and LLMs" | Official |
| Registration | Through a Certiverse account ([checkout](https://www.certiverse.com/#/checkout/nvidia/store-exam/NCA-GENL)) | Official |
| Delivery | Online, remotely proctored by NVIDIA Authorized Testing Partners with a secure browser; the session is monitored and recorded | Official ([certification hub](https://www.nvidia.com/en-us/learn/certification/)) |
| Breaks | **None** on remotely proctored exams | Official (hub) |
| Scoring | **Pass/fail.** "You won't receive a score." Result on screen at the end and by email (up to 24 hours) | Official (hub) |
| Passing score | **Not published.** This site's mocks use 700/1000 | Site convention |
| Retakes | Repurchase the exam; wait 14 days between attempts; at most 5 attempts in 12 months from the first purchase | Official (hub) |
| Validity | **2 years.** Recertify by passing the exam again | Official |
| Credential | Digital badge plus optional certificate | Official |
| Study guide | None linked from the English exam page. The page lists topics, courses and readings instead | Official page; an image-only Chinese PDF exists |
| Scheduling window | Up to 60 days ahead | Unconfirmed (search snippet of the hub FAQ) |

| Domain | Weight |
|---|---|
| Core Machine Learning and AI Knowledge | 30% |
| Software Development | 24% |
| Experimentation | 22% |
| Data Analysis | 14% |
| Trustworthy AI | 10% |

The exam page lists the domains in a different order (Core ML, Data Analysis, Experimentation, Software Development, Trustworthy AI). The weights are the same.

### NCP-AAI facts

| Fact | Value | Status |
|---|---|---|
| Exam | NVIDIA-Certified Professional: Agentic AI (NCP-AAI) | Official ([exam page](https://www.nvidia.com/en-us/learn/certification/agentic-ai-professional/)) |
| Status | The page shows **"Coming soon"** under the title **and** live "Register for Exam" buttons that link to Certiverse ([checkout](https://www.certiverse.com/#/checkout/nvidia/store-exam/NCP-AAI)). Candidates report sitting it in 2026 | Check the exam page for current availability before you plan around a date |
| Duration | **120 minutes** | Official |
| Questions | **60–70** | Official |
| Price | **$200** | Official |
| Language | English | Official |
| Delivery | Online, remotely proctored; registration through Certiverse | Official |
| Experience | Page: 1–2 years in AI/ML roles plus hands-on production agentic AI projects. Study guide: 2–3 years | Sources differ |
| Scoring | No passing score on the page. The hub describes NVIDIA exams as pass/fail with no score | Hub policy; not restated on the exam page |
| Passing score | **Not published.** This site's mocks use 700/1000 | Site convention |
| Validity | **2 years** from issuance; recertify by retaking | Official |
| Credential | Digital badge plus optional certificate | Official |
| Study guide | Official PDF, dated September 2025 ([study guide](https://dam-cdn.nvd.orangelogic.com/AssetLink/64tei188l3tt132l265u1ipjoexdl1p5.pdf)), with numbered subtopics, courses and about 85 readings. No sample questions | Official |

**Weights: the page and the study guide disagree.** This site uses the **exam page** values.

| Domain | Exam page (used here) | Study guide |
|---|---|---|
| 1 Agent Architecture and Design | 15% | 15% |
| 2 Agent Development | 15% | 15% |
| 3 Evaluation and Tuning | 13% | 13% |
| 4 Deployment and Scaling | **13%** | **5%** |
| 5 Cognition, Planning, and Memory | 10% | 10% |
| 6 Knowledge Integration and Data Handling | 10% | 10% |
| 7 NVIDIA Platform Implementation | 7% | 7% |
| 8 Run, Monitor, and Maintain | **5%** | **7%** |
| 9 Safety, Ethics, and Compliance | 5% | 5% |
| 10 Human-AI Interaction and Oversight | 5% | 5% |
| Total | 98% | 92% |

Neither column sums to 100%. Don't skip Deployment and Scaling on the strength of the guide's 5%.

**Recommended NVIDIA DLI courses (exam page):**

| Course | Format | Duration |
|---|---|---|
| Building RAG Agents With LLMs | Self-paced (also instructor-led) | 8 h |
| Evaluating RAG and Semantic Search Systems | Self-paced | 3 h |
| Building Agentic AI Applications With LLMs | Self-paced (also instructor-led) | 8 h |
| Adding New Knowledge to LLMs | Instructor-led | 8 h |
| Introduction to Deploying RAG Pipelines for Production at Scale | Self-paced (also instructor-led) | 8 h |

That is about 35 hours of official coursework. The page lists prices per course; check them there.

### Rules for both exams

- Pass/fail only. You will not learn your score or per-domain results.
- No breaks on remote exams. Prepare your room and water before you start.
- The 2-year validity has no renewal assessment: you sit the exam again.
- Third-party sites quote other prices or claim domain breakdowns in results. The official pages contradict them; ignore them.

---

## 4. The NVIDIA stack mental model

Both exams assume you can place each NVIDIA product in one picture. NCA-GENL touches it lightly; NCP-AAI Domain 7 tests it directly, and it runs through Domains 3, 4 and 9.

```
Data            NeMo Curator (dedup, filter, synthetic data)   RAPIDS cuDF / cuML (GPU data science)
                NeMo Retriever extraction (nv-ingest) → embedding NIM → vector DB (Milvus) → reranking NIM
Train / tune    NeMo framework (Megatron Bridge: pretrain, SFT, PEFT/LoRA)   NeMo Evaluator
Optimize        TensorRT-LLM (kernels, quantization, in-flight batching, paged KV cache)
Serve           NIM (prebuilt microservice, OpenAI-compatible API)
                Dynamo-Triton (general model server)   Dynamo (multi-node LLM serving)
Agents          NeMo Agent Toolkit (connect, profile, evaluate)   NeMo Guardrails (rails)
Reference       NVIDIA Blueprints (build.nvidia.com)   NGC catalog (containers, models, Helm charts)
```

### 4.1 Product by product

| Product | What it is | Pick it when |
|---|---|---|
| **NIM** | Inference microservices for foundation models, packaged as containers with optimized runtimes and security updates. LLM NIMs expose an **OpenAI-compatible API**; backends include TensorRT-LLM, vLLM and SGLang, chosen through **profiles**. Part of NVIDIA AI Enterprise; free development use through the Developer Program. Kubernetes via the **NIM Operator**. Try APIs at build.nvidia.com ([NIM docs](https://docs.nvidia.com/nim/index.html)) | You want a model running behind a standard API fast, without hand-building engines |
| **NeMo framework** | PyTorch-based training and customization. The LLM stack now lives in modular libraries: **Megatron Bridge** (pretraining, SFT, PEFT such as LoRA, Hugging Face checkpoint conversion, TP/PP/CP/EP parallelism, FP8/BF16), plus AutoModel, RL, Curator, Evaluator, Export-Deploy and Run ([Megatron Bridge](https://docs.nvidia.com/nemo/megatron-bridge/latest/index.html)) | You need to pretrain or fine-tune at scale on NVIDIA GPUs |
| **NeMo microservices** | Customizer, Evaluator, Guardrails, Data Store, Entity Store and others. Their docs are now archived as reference only. The successor control plane is **NeMo Helix**, open source and agent-focused ([NeMo Helix](https://docs.nvidia.com/nemo-helix/)) | Learn the concepts (customize, evaluate, guard, data flywheel); don't rely on a specific service name |
| **NeMo Agent Toolkit (NAT)** | Open-source library (`nvidia-nat`, CLI `nat`) that connects agents across frameworks (LangChain/LangGraph, LlamaIndex, CrewAI, Semantic Kernel and others), with YAML workflow configs, MCP and A2A clients and servers, a profiler, evaluators and observability ([NAT docs](https://docs.nvidia.com/nemo/agent-toolkit/latest/index.html)) | You need to profile, evaluate or connect an agent workflow without rewriting it in one framework |
| **NeMo Guardrails** | Open-source library for programmable rails: **input, retrieval, dialog, execution, output**. Flows in **Colang**, settings in `config.yml`, custom actions in Python, server mode with `/v1/chat/completions` ([Guardrails docs](https://docs.nvidia.com/nemo/guardrails/latest/index.html)) | You must enforce safety, topic, jailbreak or PII policy around an LLM or agent |
| **NeMo Retriever** | NIM microservices for multimodal extraction (nv-ingest: text, tables, charts, images), **text embedding** and **text reranking** | You are building the retrieval side of RAG on NVIDIA |
| **NeMo Curator** | Open-source, scalable data curation for text, image, video and audio: exact, fuzzy (MinHash + LSH) and semantic deduplication; heuristic and classifier filters; language ID; synthetic data. Backend moved from Dask to Ray ([Curator docs](https://docs.nvidia.com/nemo/curator/latest/index.html)) | You are preparing a large corpus for pretraining or fine-tuning |
| **Dynamo-Triton** (formerly Triton Inference Server) | Open-source general model server: model repository, **dynamic batching**, concurrent model execution, ensembles, HTTP/gRPC, many backends (TensorRT, TensorRT-LLM, PyTorch, ONNX Runtime, Python, vLLM and more), Prometheus metrics ([Dynamo-Triton](https://developer.nvidia.com/dynamo-triton)) | You serve many model types, including non-LLMs, from one server |
| **Dynamo** | Open-source distributed inference framework above vLLM, SGLang and TensorRT-LLM: **disaggregated prefill/decode**, KV-aware routing, KV-cache transfer and offload ([Dynamo](https://developer.nvidia.com/dynamo)) | You serve large LLMs across many GPUs or nodes |
| **TensorRT-LLM** | Open-source LLM inference library, now PyTorch-native with a Python **LLM API**: in-flight batching, paged KV cache, chunked prefill, **FP8** (Hopper and later) and **FP4** (Blackwell) quantization, speculative decoding, tensor/pipeline/expert parallelism ([overview](https://nvidia.github.io/TensorRT-LLM/overview.html)) | You need the lowest latency or highest throughput for an LLM on NVIDIA GPUs |
| **RAPIDS** (NVIDIA CUDA-X libraries for data science) | **cuDF** (pandas-like GPU DataFrames; `cudf.pandas` accelerates pandas with zero code changes and falls back to CPU) and **cuML** (scikit-learn-like GPU ML; `cuml.accel` for zero-code-change acceleration) ([data science docs](https://docs.nvidia.com/datascience/)) | Data prep or classic ML is too slow on CPU |
| **NGC** | Catalog of GPU-optimized containers, models, Helm charts and SDKs. Registry `nvcr.io`; Docker login with username `$oauthtoken` and an NGC API key ([NGC catalog guide](https://docs.nvidia.com/ngc/latest/ngc-catalog-user-guide.html)) | You pull a NIM or framework container |
| **NVIDIA Blueprints** | Reference workflows on build.nvidia.com (RAG pipeline, deep research, voice agent, video search and summarization and others) ([Blueprints](https://build.nvidia.com/blueprints)) | You want a working starting point instead of a blank repo |

### 4.2 How the serving layers relate

- **TensorRT-LLM is an engine**, not a server. NIM, Dynamo-Triton and Dynamo can all run it underneath.
- **NIM is the packaged product**: model + optimized engine + API in one container. Choose it for speed of deployment.
- **Dynamo-Triton is the general server**: many frameworks, ensembles, dynamic batching.
- **Dynamo scales LLM serving out**: prefill and decode on separate GPU pools, routing requests to where their KV cache already lives.

### 4.3 Renamed products

Questions may use either name, and the NCP-AAI study guide (September 2025) uses some older ones. Know both.

| Old name | Current name |
|---|---|
| Triton Inference Server | **NVIDIA Dynamo-Triton** (since 18 March 2025; docs still say Triton Inference Server) |
| AgentIQ (`agentiq` package) | Agent Intelligence Toolkit / AIQ Toolkit (`aiqtoolkit`, CLI `aiq`), then **NeMo Agent Toolkit** (`nvidia-nat`, CLI `nat`, from v1.2) |
| NIM Agent Blueprints | **NVIDIA Blueprints** (AI Blueprints) |
| RAPIDS docs at docs.rapids.ai | **NVIDIA CUDA-X libraries for data science** (cuDF and cuML keep their names) |
| NeMo Data Curator | **NeMo Curator** |
| NeMo 2.0 LLM training stack | **NeMo Megatron Bridge** (from container 26.02) |
| NeMo microservices (Customizer, Evaluator, Entity Store and others) | Archived documentation; **NeMo Helix** is the current open-source control plane |
| NGC legacy API key | **Personal** and **service** API keys |
| A2A Agent Card at `agent.json` | `/.well-known/agent-card.json` (A2A 1.0) |

---

## 5. NCA-GENL: Generative AI LLMs

NCA-GENL tests whether you understand how LLMs are built, adapted, evaluated and deployed, and whether you know the Python and NVIDIA tools for each step. The official subtopics lean on classic data science (spaCy, NumPy, Keras, scikit-learn-style metrics, charts) as much as on LLMs. Many subtopics end with "under supervision": the exam pitches you as a junior team member, so expect "what should you do or use" rather than "design the platform".

### 5.1 Domain 1: Core Machine Learning and AI Knowledge

Worth 30%, the largest domain. The official subtopics: deployment and evaluation basics, data mining and visualization, LLM use cases (RAG, chatbots, summarizers), curating and embedding datasets for RAG, ML fundamentals (feature engineering, model comparison, cross-validation), Python NLP tools (spaCy, NumPy, vector databases), following research papers, text embeddings, prompt engineering, and traditional ML with spaCy, NumPy and Keras.

**ML fundamentals**

| Concept | What to know |
|---|---|
| Supervised vs unsupervised | Labels vs no labels; classification and regression vs clustering and dimensionality reduction |
| Feature engineering | Turning raw data into model inputs: scaling, encoding categories, deriving features |
| Train / validation / test | Fit on train, tune on validation, report once on test |
| Cross-validation | k folds, each used once for validation; a more reliable estimate on small data |
| Overfitting | Low training error, high validation error. Fix with more data, regularization, dropout, augmentation, early stopping |
| Bias-variance trade-off | Too simple underfits (high bias); too complex overfits (high variance) |
| Gradient descent | Minimize a loss by stepping against its gradient; the learning rate sets the step size |
| Transfer learning | Start from a pretrained model and adapt it; the NVIDIA DLI deep-learning course covers this in PyTorch |

**Transformers**

- The transformer ([Attention Is All You Need](https://arxiv.org/abs/1706.03762)) replaces recurrence with **self-attention**: each token attends to every other token in the context. **Positional encoding** supplies word order.
- **Tokenization** splits text into subword tokens; **embeddings** map tokens to vectors. The **context window** caps how many tokens the model sees at once.
- Three families: **encoder-only** (BERT, [masked-LM pretraining](https://arxiv.org/abs/1810.04805); good for classification and embeddings), **decoder-only** (GPT-style, next-token prediction; good for generation), **encoder-decoder** (translation, summarization).

**The LLM lifecycle**

| Stage | What happens |
|---|---|
| Pretraining | Self-supervised next-token (or masked-token) prediction on a huge curated corpus |
| Instruction tuning / SFT | Supervised fine-tuning on prompt-response pairs |
| Alignment (RLHF) | Humans rank outputs; a reward model learns the preferences; the policy is optimized against it ([HF RLHF](https://huggingface.co/blog/rlhf)) |
| PEFT | Train a small number of parameters: **LoRA** adds low-rank matrices to frozen weights ([LoRA](https://arxiv.org/abs/2106.09685)); **p-tuning** learns soft prompt embeddings ([NVIDIA blog](https://developer.nvidia.com/blog/an-introduction-to-large-language-models-prompt-engineering-and-p-tuning/)) |
| Prompt engineering | Zero-shot, few-shot, chain-of-thought; no weight changes |
| RAG | Retrieve relevant chunks at query time and put them in the prompt ([what is RAG](https://blogs.nvidia.com/blog/what-is-retrieval-augmented-generation/)) |

**Decoding**

- **Temperature** scales randomness: low is focused and repeatable, high is varied.
- **Top-k** samples from the k most likely tokens; **top-p** (nucleus) from the smallest set whose probability sums to p.
- **Greedy** decoding always takes the most likely token.

**Embeddings and vector databases**

- Text embeddings put semantically similar text close together; similarity search uses cosine or dot product.
- RAG pipeline: curate → chunk → embed → index in a vector database (Milvus is on the official reading list, [overview](https://milvus.io/docs/overview.md)) → retrieve → optionally rerank → generate.
- On NVIDIA, embedding and reranking models ship as **NeMo Retriever** NIMs.

### 5.2 Domain 2: Software Development

Worth 24%. Subtopics: supporting deployment and evaluation of scalability, performance and reliability; building RAG, chatbot and summarizer apps; Python NLP and ML packages; identifying the data, hardware and software components a set of requirements needs; monitoring data collection and experiments; writing scripts under supervision.

**Python toolkit**

| Need | Tool |
|---|---|
| Arrays and numerics | NumPy |
| Tabular data | pandas; GPU: cuDF / `cudf.pandas` |
| Classic ML and metrics | scikit-learn; GPU: cuML / `cuml.accel` |
| Tokenization, NER, linguistic pipelines | spaCy |
| Deep learning | PyTorch (used by NVIDIA DLI), Keras |
| Pretrained LLMs, datasets, tokenizers | Hugging Face Transformers and Datasets |
| Vector search | A vector database such as Milvus |

**NVIDIA deployment basics**

- **NIM**: pull the container from NGC with an NGC API key, run it, call the OpenAI-compatible endpoint. The same client code works against build.nvidia.com during development.
- **TensorRT-LLM**: the optimization engine behind fast LLM inference. Know **quantization** (FP8 roughly halves memory and can double performance vs 16-bit on Hopper and later), **in-flight batching** and the **paged KV cache**.
- **Dynamo-Triton**: model repository on disk, per-model config, dynamic batching, HTTP and gRPC.
- **ONNX**: a portable model format for moving models across frameworks and runtimes ([NVIDIA ONNX blog](https://developer.nvidia.com/blog/end-to-end-ai-for-pcs-transitioning-ai-models-with-onnx/)). TensorRT can build optimized engines from it ([TensorRT getting started](https://developer.nvidia.com/tensorrt-getting-started)).
- **NGC**: where the containers live (`nvcr.io`).

**Latency vs throughput**

| Goal | Lever |
|---|---|
| Lower latency per request | Smaller or quantized model, speculative decoding, shorter prompts |
| Higher throughput | Batching (dynamic or in-flight), more replicas, efficient KV-cache use |
| Lower memory | Quantization (FP8, FP4 on Blackwell), paged KV cache |
| Fit a model that is too big for one GPU | Tensor or pipeline parallelism |

**Requirements to components:** a typical item gives a user requirement ("summarize internal PDFs, data must stay on premises") and asks which data, hardware and software pieces it needs. Map it: document extraction and embeddings, a vector database, a self-hosted model (NIM on your GPUs), and guardrails.

### 5.3 Domain 3: Experimentation

Worth 22%. Subtopics: assist with training and optimization; prepare large datasets (scraping, tokenization) for pretraining, fine-tuning and RLHF; hardware and software tests for LLM apps; evaluate technologies on **cost, portability, compatibility and usability**; take part in collecting human data for RLHF; evaluate, refine and benchmark models; run experiments on models and pipelines.

**Experiment design**

- Fix a **baseline** first. Change one variable at a time.
- Track every run (config, data version, metrics) with a tool such as Weights & Biases ([quickstart](https://docs.wandb.ai/quickstart)).
- Keep the test set untouched until the end.

**Choosing an adaptation method**

| Situation | Choose |
|---|---|
| Needs fresh or proprietary facts, with citations | **RAG** |
| Needs a style, format or domain behavior | **Fine-tuning** (PEFT such as LoRA first; it is cheaper) |
| A quick improvement with no training | **Prompt engineering** |
| Fine-tuned model forgot general skills | Catastrophic forgetting: mix in general data, use PEFT, lower the learning rate |
| Confident but wrong answers | Hallucination: ground with RAG, add guardrails, evaluate faithfulness |

**Evaluation metrics**

| Metric | Measures | Use for |
|---|---|---|
| Perplexity | How well a model predicts held-out text (lower is better) | Language-model quality |
| BLEU | n-gram precision against references | Translation |
| ROUGE | n-gram recall against references | Summarization |
| Accuracy, precision, recall, F1 | Classification quality ([scikit-learn metrics](https://scikit-learn.org/stable/modules/model_evaluation.html)) | Classification tasks |
| Benchmarks | Standard task suites, for example via EleutherAI [lm-evaluation-harness](https://github.com/EleutherAI/lm-evaluation-harness) | Comparing models |
| Human evaluation, LLM-as-judge | Quality, helpfulness, faithfulness | Open-ended generation |
| Retrieval metrics (recall@k, MRR) | Whether the right chunks were found | RAG |

BLEU and ROUGE measure overlap with a reference, not truthfulness. NVIDIA's evaluation tooling is **NeMo Evaluator** (LLM-as-judge, RAG and agentic benchmarks). NIM documentation includes an LLM benchmarking guide.

**RLHF data:** annotators compare or rank model outputs; those preferences train the reward model. Collect from diverse annotators with clear guidelines.

### 5.4 Domain 4: Data Analysis

Worth 14%. Subtopics: data mining and visualization; comparing models with statistical metrics (loss functions, **explained variance**); data analysis under supervision; graphs and charts; identifying trends and factors that affect results.

- **Visualization:** Matplotlib (line, bar, histogram, scatter); know which chart answers which question. Histograms show distributions, scatter plots show relationships, line charts show trends over time.
- **Regression metrics:** MSE, MAE, R² and explained variance (both near 1 is good). **Classification loss:** cross-entropy.
- **Loss curves:** training loss falling while validation loss rises means overfitting.
- **GPU data science:** `cudf.pandas` speeds up existing pandas code with no changes and falls back to CPU for unsupported operations; enable it with `%load_ext cudf.pandas` in Jupyter or `python -m cudf.pandas script.py`. cuML mirrors the scikit-learn fit/predict API and scales out with Dask.
- **Data prep for LLMs (NeMo Curator):**

| Step | How |
|---|---|
| Exact deduplication | Hashing (MD5) |
| Fuzzy deduplication | MinHash + LSH, on GPU |
| Semantic deduplication | Embeddings + clustering |
| Quality and safety filtering | Heuristic rules; quality, domain and safety classifiers |
| Language identification | FastText, GlotLID |
| Extra data | LLM-based synthetic data generation |

### 5.5 Domain 5: Trustworthy AI

Worth 10%. Subtopics: the ethical principles of trustworthy AI; balancing data privacy with consent; using NVIDIA and other technologies to improve trustworthiness; minimizing bias.

**NVIDIA Trustworthy AI principles** ([Trust Center](https://www.nvidia.com/en-us/ai-trust-center/trustworthy-ai/))

| Principle | Meaning |
|---|---|
| Privacy | Comply with privacy laws and norms |
| Safety and security | Perform as intended; avoid unintended harm and malicious threats |
| Transparency | Explain in non-technical language how the AI reached its output |
| Nondiscrimination | Minimize bias; give all groups equal opportunity to benefit |

**Tools named by NVIDIA:** Model Card++ templates and the Model Card Generator (documentation and transparency), NeMo Guardrails (runtime safety), NeMo Curator (data quality), Confidential Computing (data protection in use), SteerLM (steering model behavior).

**NeMo Guardrails essentials**

- Five rail types: **input** (check the user message), **retrieval** (filter retrieved chunks), **dialog** (control conversation flow), **execution** (check tool/action calls), **output** (check the response).
- Content safety, jailbreak detection and topic control are available as NemoGuard NIMs; PII masking uses detectors such as Presidio.
- Also know the NIST AI Risk Management Framework ([NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework)) as the official non-NVIDIA reading.

**Privacy vs consent:** collecting data lawfully is not enough; use it only for the purposes people consented to, minimize and anonymize it, and document it.

---

## 6. NCP-AAI: Agentic AI

NCP-AAI questions are scenarios: an agent requirement plus a constraint (latency, cost, reliability, safety, oversight). The right answer meets the constraint with a production-grade pattern. Subtopic numbers below are from the official study guide.

> **Current status of NeMo Agent Toolkit.** The study guide (September 2025) tests NAT under its older name, Agent Intelligence Toolkit. NVIDIA deprecated NAT in October 2026, with end of life at the end of 2026, and points to NeMo Relay, NeMo Helix and NeMo Fabric as successors ([NAT GitHub](https://github.com/NVIDIA/NeMo-Agent-Toolkit)). Learn NAT as exam content. Use the successor names only for context.

### 6.1 Domain 1: Agent Architecture and Design

Worth 15%.

- 1.1 Design user interfaces for human-agent interaction.
- 1.2 Implement reasoning and action frameworks (for example ReAct).
- 1.3 Configure agent-to-agent communication protocols.
- 1.4 Manage short-term and long-term memory.
- 1.5 Orchestrate multi-agent workflows.
- 1.6 Apply logic trees, prompt chains and stateful orchestration.
- 1.7 Integrate knowledge graphs for relational reasoning.
- 1.8 Ensure adaptability and scalability.

**Architecture taxonomy**

| Type | How it works | Trade-off |
|---|---|---|
| Reactive | Stimulus-response, no planning or world model | Fast, shallow |
| Deliberative | Plans over goals or a world model | Handles multi-step goals, slower |
| Hybrid | Reactive layer for quick responses, deliberative planner on top | Best of both, more complex |

**ReAct** interleaves Thought → Action (tool call) → Observation until the task is done. NAT ships ReAct, ReWOO, Reasoning, Router, Tool Calling, and Sequential and Parallel Executor agent types.

**Multi-agent patterns:** supervisor/orchestrator-worker, hierarchical, network (peer), sequential pipeline. Stateful graphs (LangGraph-style): nodes are steps or agents, edges carry control flow (including conditional edges), shared state is checkpointed, and cycles allow retry and reflection.

**A2A vs MCP**

| | A2A ([spec](https://a2a-protocol.org/latest/specification/)) | MCP ([spec](https://modelcontextprotocol.io/specification/latest)) |
|---|---|---|
| Connects | Agent to agent | Agent or app to tools and data |
| Internal state | Agents collaborate without access to each other's state, memory or tools | Server exposes resources, prompts and tools to the host |
| Discovery | **Agent Card** JSON at `/.well-known/agent-card.json` (skills, capabilities, security schemes) | Server capabilities |
| Unit of work | **Task** with states (Submitted, Working, Input Required, Auth Required, Completed, Failed, Canceled, Rejected), plus Messages, Parts and Artifacts | JSON-RPC requests |
| Transport | JSON-RPC 2.0, gRPC, HTTP/REST; streaming over SSE; push notifications to a webhook | JSON-RPC 2.0 |

**Knowledge graphs** support multi-hop and relational questions ("which suppliers of this part had incidents?") that flat vector search handles poorly.

### 6.2 Domain 2: Agent Development

Worth 15%.

- 2.1 Engineer prompts and dynamic prompt chains.
- 2.2 Integrate generative and multimodal models (text, vision, audio).
- 2.3 Build and connect custom tools, APIs and functions.
- 2.4 Implement error handling (retry logic, graceful failure recovery).
- 2.5 Develop dynamic conversation flows with real-time streaming and feedback.
- 2.6 Evaluate and refine agent decision-making strategies.

**Tool calling (framework-neutral)**

- The model emits a structured call: a tool name plus JSON arguments that match a JSON Schema. **Your application executes it** and returns the result.
- Clear tool descriptions and tight schemas reduce wrong calls. Validate arguments server-side anyway.
- In NAT, tools are registered as Functions or Function Groups and wired together in a YAML workflow configuration.

**MCP essentials**

- Roles: **host** (the LLM application), **client** (connector inside the host), **server** (provides context and capabilities).
- Server features: **resources** (data), **prompts** (templates), **tools** (functions the model can call). Client features: elicitation, sampling, roots.
- The current revision makes MCP **stateless**: each request carries its protocol version and client capabilities, and servers must not depend on earlier requests on the connection. Older material describing a session handshake is out of date.
- Security: user consent before tool invocation; treat tool annotations as untrusted unless the server is trusted.

**Resilience patterns** (the study guide cites the Azure Architecture Center patterns)

| Pattern | What it does | Watch for |
|---|---|---|
| Retry | Retries transient faults with exponential backoff and jitter, capped attempts | Only retry idempotent or safe operations |
| Circuit breaker | Closed → Open (fail fast) → Half-Open (trial requests) → Closed | Stop retrying while the breaker is open |
| Fallback | Cached answer, simpler model or human handoff | Degrade gracefully instead of failing |
| Timeout | Bound every external call | A hung tool must not hang the agent |

**Streaming:** stream tokens over SSE and surface intermediate steps (tool calls, retrieval) to the UI so users see progress and can interrupt.

**Multimodal:** NIM categories include vision language models, speech (Riva) and NV-CLIP.

### 6.3 Domain 3: Evaluation and Tuning

Worth 13%.

- 3.1 Implement evaluation pipelines and task benchmarks.
- 3.2 Compare agent performance across tasks and datasets.
- 3.3 Collect and integrate structured user feedback.
- 3.4 Tune model parameters (accuracy vs latency-efficiency trade-offs).
- 3.5 Analyze evaluation results to guide targeted optimization.

**NAT evaluation** ([evaluate docs](https://docs.nvidia.com/nemo/agent-toolkit/1.9/improve-workflows/evaluate.html))

- Run `nat eval --config_file=<workflow.yml>`. Use repeated runs to measure variance, score existing outputs offline without rerunning the workflow, or evaluate a remote workflow started with `nat serve`.
- The config's `eval` section names the dataset (JSON, JSONL, CSV, Excel, Parquet; default columns `id`, `question`, `answer`), concurrency, output directory and a list of evaluators, each with a judge LLM.

| Evaluator | Scores |
|---|---|
| `ragas` | RAG quality: answer accuracy, context relevance, response groundedness (0–1) |
| `trajectory` | An LLM judge scores the agent's sequence of tool calls |
| `tunable_rag_evaluator` | Coverage, correctness and relevance with custom weights or a custom judge prompt |
| LangSmith evaluators | LangSmith-based scoring and custom judges |

**NAT profiler** ([profiler docs](https://docs.nvidia.com/nemo/agent-toolkit/1.9/improve-workflows/profiler.html)): captures tokens, latency and every LLM and tool call per run; produces bottleneck analysis, a Gantt chart of the run, concurrency-spike analysis, shared prompt prefixes worth caching, and latency/throughput figures with confidence intervals. A sizing calculator estimates GPU needs.

**Tuning trade-offs**

| Lever | Lowers | Risk |
|---|---|---|
| Smaller or quantized model | Latency, cost | Accuracy |
| Fewer reasoning steps, ReWOO instead of ReAct | LLM calls, latency | Adaptability |
| Prompt and KV caching | Latency, cost | Stale context if misused |
| Routing easy queries to small models | Cost | Misrouting hard queries |

Compare agents on the **same dataset with the same judge**, over repeated runs. Structured feedback (thumbs up/down with reason codes, ratings attached to traces) feeds a **data flywheel**: failures become new eval cases and training data.

### 6.4 Domain 4: Deployment and Scaling

Worth 13% on the exam page (5% in the study guide).

- 4.1 Deploy and orchestrate multi-agent systems at production scale.
- 4.2 Apply MLOps practices for CI/CD, monitoring and governance.
- 4.3 Profile performance and reliability under distributed loads.
- 4.4 Scale with containers (Docker, Kubernetes) and load balancing.
- 4.5 Optimize costs while ensuring high availability.

**NIM in production**

- Runs as a container with an OpenAI-compatible API; needs an NGC API key.
- **Mount the model cache** to a persistent volume, or the model downloads again on every start.
- **Profiles** pick the engine and hardware configuration automatically; you can override the profile with an environment variable and list available profiles.
- On Kubernetes, use the **NIM Operator**.

**Scaling and cost**

| Need | Answer |
|---|---|
| Autoscale an LLM service | Scale on GPU and queue metrics (DCGM exporter with Prometheus), not CPU alone |
| High availability | Replicas across zones behind a load balancer |
| Large model across many GPUs | Dynamo: disaggregated prefill/decode, KV-aware routing |
| Lower cost | Right-size models per subtask, cache prompts and KV, batch, scale to zero in dev |
| Find the bottleneck under load | NAT profiler, Nsight Systems, TensorRT-LLM performance analysis |

**MLOps for agents:** version prompts, tool definitions, model IDs and configs together; gate promotion on an evaluation run against a golden dataset in CI; release with canary or blue-green; keep audit logs for governance.

### 6.5 Domain 5: Cognition, Planning, and Memory

Worth 10%.

- 5.1 Implement short- and long-term memory.
- 5.2 Apply reasoning frameworks (chain-of-thought, task decomposition).
- 5.3 Engineer planning strategies for sequential, multi-step decisions.
- 5.4 Manage stateful orchestration for complex tasks and knowledge retention.
- 5.5 Adapt reasoning based on prior experience and feedback.

**Memory**

| Type | Where it lives | Managed by |
|---|---|---|
| Short-term | Context window and conversation buffer | Summarization, sliding window, trimming |
| Episodic (long-term) | External store of past interactions | Retrieval by relevance or recency |
| Semantic (long-term) | Facts in a vector or graph store | Retrieval |
| Procedural (long-term) | Learned how-to, instructions, skills | Prompt or tool updates |

NAT includes an automatic memory wrapper agent and memory plugins. Memory questions can appear under Domain 1 (1.4) as well.

**Planning** (taxonomy from the planning survey, [arXiv:2402.02716](https://arxiv.org/abs/2402.02716)): task decomposition, multi-plan selection, external-module-aided planning, reflection and refinement, memory-augmented planning.

| Pattern | Use when |
|---|---|
| Chain-of-thought | Multi-step reasoning in one call |
| ReAct | Each step depends on the last observation |
| ReWOO / plan-and-execute | The plan can be made up front; fewer LLM calls than ReAct; re-plan on failure |
| Reflection / self-critique | Quality matters more than latency; always cap the iterations |

**State persistence:** checkpoint graph state per thread or session ID so a multi-turn task survives restarts and can be resumed after human input.

### 6.6 Domain 6: Knowledge Integration and Data Handling

Worth 10%.

- 6.1 Implement retrieval pipelines (RAG, embedded search, hybrid approaches).
- 6.2 Configure and optimize vector databases.
- 6.3 Build ETL pipelines for enterprise data sources.
- 6.4 Conduct data quality checks, augmentation and preprocessing.
- 6.5 Enable real-time access and reasoning over structured and unstructured knowledge.

**NeMo Retriever pipeline:** extraction (nv-ingest pulls text, tables, charts and images from documents, with OCR and parsing models for scanned or complex layouts) → **embedding NIM** → vector database (Milvus) → **reranking NIM** → LLM. The "Build a RAG Pipeline" blueprint is the reference implementation.

| Problem | Fix |
|---|---|
| Exact codes, names or IDs missed | **Hybrid search** (BM25 keyword + dense vectors) |
| Right documents found but ranked low | **Rerank** the top-k with a cross-encoder reranker |
| Slow search at scale | Approximate nearest neighbor index (HNSW, IVF), GPU-accelerated in Milvus |
| Answers lose context at chunk boundaries | Tune chunk size and overlap |
| Stale answers | Incremental re-indexing or change data capture in the ETL pipeline |
| Wrong tenant's documents retrieved | Metadata filters |
| Multi-hop or relational questions | Knowledge graph / GraphRAG |

**RAG vs fine-tuning:** RAG for fresh or proprietary facts and citations; fine-tuning for style, format or domain behavior.

### 6.7 Domain 7: NVIDIA Platform Implementation

Worth 7%.

- 7.1 Integrate NeMo Guardrails for compliance and safety.
- 7.2 Deploy NIM microservices for high-performance inference.
- 7.3 Optimize workflows with NeMo Agent Toolkit.
- 7.4 Use TensorRT-LLM and Triton Inference Server to reduce latency.
- 7.5 Manage multimodal input pipelines on NVIDIA hardware.

Use the product table in section 4.1 for "which product" questions. Extra detail that this domain tests:

- **Dynamo-Triton batching** ([batcher docs](https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/user_guide/batcher.html)): the **dynamic batcher** combines individual requests server-side; a maximum queue delay lets a batch wait briefly for more requests. The docs advise usually leaving a preferred batch size unset. The **sequence batcher** routes all requests of a stateful sequence to the same model instance. Iterative sequences support in-flight batching.
- **NeMo Guardrails config:** `config.yml` (models, rails), Colang flows, `prompts.yml` for the built-in `self check input` and `self check output` flows, Python custom actions. Run it as a server that exposes `/v1/chat/completions`, or embed it in LangChain or LangGraph.
- **NAT:** wraps existing framework agents through plugins rather than replacing them; adds profiling, evaluation, observability and MCP/A2A interop.
- **Blueprints:** the catalog changes. A customer-service virtual assistant blueprint cited in the study guide is no longer listed; current entries include a deep researcher agent, a voice agent, video search and summarization, and a RAG pipeline. The AI-Q blueprint is still available ([AI-Q](https://build.nvidia.com/nvidia/aiq)).

### 6.8 Domain 8: Run, Monitor, and Maintain

Worth 5% on the exam page (7% in the study guide).

- 8.1 Define monitoring dashboards and reliability metrics.
- 8.2 Track logs, errors and anomalies for root-cause diagnosis.
- 8.3 Continuously benchmark deployed agents against prior versions.
- 8.4 Automate tuning, retraining and versioning in production.
- 8.5 Ensure uptime, transparency and trust in live deployments.

- **Trace every run** as spans: each LLM call, tool call and retrieval, with latency, tokens, cost and errors. NAT exports OpenTelemetry telemetry and integrates with LangSmith; MCP reserves W3C trace-context fields so traces cross tool boundaries.
- **Reliability metrics:** task success rate, tool-error rate, p95 latency, groundedness, escalation rate.
- **Troubleshooting hallucinations:** check retrieval first (were relevant chunks returned?), then grounding (did the answer use them?).
- **Regression benchmarking:** run every new version against the previous one on a fixed dataset before and after release. Watch for data drift and quality decay.

### 6.9 Domain 9: Safety, Ethics, and Compliance

Worth 5%.

- 9.1 Design and enforce system security and audit trails.
- 9.2 Integrate compliance guardrails (privacy, enterprise policy).
- 9.3 Mitigate bias and toxicity in outputs.
- 9.4 Deploy layered safety frameworks (filters, escalation protocols).
- 9.5 Ensure compliance with licensing and regulatory standards.

**Layered guardrails**

| Layer | Rail | Stops |
|---|---|---|
| User message | Input | Jailbreaks, direct prompt injection, PII in prompts |
| Conversation | Dialog / topic | Off-topic or disallowed flows |
| Retrieved content | Retrieval | **Indirect prompt injection** hidden in documents |
| Tool calls | Execution | Unsafe or unauthorized actions |
| Response | Output | Toxic content, PII leakage |

- Treat tool output and retrieved content as **untrusted**. Give tools least privilege, require human approval for side-effecting actions, and log everything for audit.
- **Regulation:** the study guide cites the EU AI Act as a proposal. It is now adopted law (Regulation (EU) 2024/1689). Know the principles (risk tiers, transparency, human oversight), not dates.

### 6.10 Domain 10: Human-AI Interaction and Oversight

Worth 5%.

- 10.1 Build intuitive UIs with user-in-the-loop interaction.
- 10.2 Design structured feedback loops for iterative improvement.
- 10.3 Implement transparency (explainable reasoning, decision traceability).
- 10.4 Enable human oversight and intervention.

- **Approval gates** before irreversible actions (payments, deletes, external emails).
- **Confidence-based escalation** to a human when the agent is unsure.
- **Interrupt and resume** on checkpointed state. Protocol hooks: A2A's **Input Required** task state and MCP **elicitation**.
- **Transparency:** show the plan, sources and tool calls so users can trace a decision.
- **Feedback loop:** structured feedback goes into the eval set and the data flywheel. NAT ships a chat UI and API server (`nat serve`).

---

## 7. Dated changes to watch

As of 8 November 2026. Recheck anything dated near your exam.

| Date | Change | What it means for answers |
|---|---|---|
| 1 August 2024 | EU AI Act (Regulation (EU) 2024/1689) entered into force | It is law, not a proposal, whatever older readings say |
| 18 March 2025 | **Triton Inference Server became NVIDIA Dynamo-Triton** | Accept both names; Dynamo is a separate, LLM-focused framework |
| After 2025 | NGC legacy API keys deprecated | Use personal or service keys |
| September 2025 | NCP-AAI study guide published | Uses older names (Agent Intelligence Toolkit, Triton Inference Server, NIM Agent Blueprints) |
| NeMo container 26.02 | LLM training docs moved to **NeMo Megatron Bridge** | Don't treat NeMo 2.0 or NeMo Launcher as current |
| 12 March 2026 | **Dynamo 1.0 GA** | No longer "experimental"; check the release notes for the current version |
| 28 July 2026 | **MCP specification revision made MCP stateless** | Per-request protocol version and capabilities; session-handshake descriptions are outdated |
| October 2026 | **NeMo Agent Toolkit deprecated**, end of life at the end of 2026 | Still exam content; successors are NeMo Relay, NeMo Helix and NeMo Fabric |
| Ongoing | NeMo microservices docs archived; NeMo Helix is the current control plane | Learn the concepts, not service names |

**Other recent changes:** A2A reached 1.0 and moved its Agent Card to `agent-card.json`; RAPIDS docs moved under NVIDIA CUDA-X data science; NeMo Curator moved from Dask to Ray and became multimodal; TensorRT-LLM became PyTorch-native with an LLM API; NIM gained vLLM and SGLang backends and changed its engine-preference order between versions; the NemoGuard and Nemotron safety model names keep changing; the blueprint catalog churns. Nemotron model names change quickly, so no answer should depend on "the latest model".

---

## 8. Top traps

1. **Old names.** Triton Inference Server, AgentIQ, Agent Intelligence Toolkit, `aiq`, NIM Agent Blueprints, NeMo Data Curator. Know the current name, and accept the old one where the exam still uses it.
2. **Dynamo-Triton vs Dynamo.** Dynamo-Triton is the renamed general model server. Dynamo is the multi-node LLM serving framework. They are not the same product.
3. **TensorRT-LLM is a server.** It isn't. It is the inference library; NIM, Dynamo-Triton or Dynamo serve it.
4. **NIM needs custom client code.** It exposes an OpenAI-compatible API, so standard clients work.
5. **Forgetting the NIM cache mount.** Without a persistent cache volume, the model downloads on every restart.
6. **Fine-tune for fresh facts.** Use RAG for changing or proprietary facts; fine-tune for style and behavior.
7. **BLEU or ROUGE for hallucination.** They measure overlap with a reference, not groundedness. Use faithfulness or groundedness evaluators.
8. **Scaling on CPU.** LLM services scale on GPU utilization and queue depth.
9. **Retry everything.** Retry only idempotent operations, with backoff and jitter, and stop when the circuit breaker is open.
10. **A2A and MCP are interchangeable.** A2A connects agents; MCP connects an agent to tools and data.
11. **Trusting retrieved content.** Documents and tool outputs can carry indirect prompt injection. Use retrieval and execution rails.
12. **Guardrails are only input and output filters.** NeMo Guardrails has five rail types, including retrieval, dialog and execution.
13. **Comparing agents on one run.** Use repeated runs on the same dataset with the same judge.
14. **Unbounded reflection loops.** Cap iterations and set a quality threshold.
15. **Memory is just a bigger context window.** Long-term memory lives in an external store; short-term memory is the context window.
16. **Skipping Deployment and Scaling.** The page weights it at 13%, not the guide's 5%.
17. **A passing score of 70%.** NVIDIA publishes no passing score and reports pass/fail only.
18. **NCA-GENL is all NVIDIA products.** Its subtopics are mostly general ML, Python, data analysis and evaluation.
19. **Exact dedup catches near-duplicates.** Near-duplicates need fuzzy (MinHash + LSH) or semantic deduplication.
20. **`cudf.pandas` requires rewriting code.** It accelerates existing pandas code with no changes and falls back to CPU.
21. **The EU AI Act is a proposal.** It is adopted law.
22. **Answers that depend on NeMo Relay, Helix or Fabric.** The exam predates them. Choose the NAT-era answer.

---

## 9. Study schedules

### 3-week plan: NCA-GENL (about 1 hour a day)

| Week | Focus |
|---|---|
| 1 | Domain 1: ML fundamentals, transformers, LLM lifecycle (pretraining, SFT, RLHF, LoRA, p-tuning), prompting, decoding, embeddings and RAG. Daily flashcards. Work through a notebook from NVIDIA's Fundamentals of Deep Learning course. |
| 2 | Domains 2 and 4: Python toolkit (NumPy, pandas, scikit-learn, spaCy, Hugging Face), call a NIM endpoint from build.nvidia.com, TensorRT-LLM and Dynamo-Triton concepts, cuDF and cuML, Matplotlib charts, regression and classification metrics, NeMo Curator steps. Domain practice to 80%+. |
| 3 | Domains 3 and 5: experiment design, evaluation metrics, RAG vs fine-tuning vs prompting, RLHF data; Trustworthy AI principles and NeMo Guardrails. Mixed practice, the Mistakes notebook, two full 60-minute mocks, section 8. Book when you hit 85%+ twice. |

### 7-week plan: NCP-AAI (1–1.5 hours a day; stretch to 8 weeks if agents are new to you)

| Week | Focus |
|---|---|
| 1 | Section 4 mental model; Domain 1: architecture taxonomy, ReAct, multi-agent patterns, stateful graphs, A2A vs MCP. Start the "Building Agentic AI Applications With LLMs" course. |
| 2 | Domain 2: tool calling, MCP roles and features, retry, circuit breaker and fallback, streaming, multimodal NIMs. Build an agent with two tools and failure handling. |
| 3 | Domains 5 and 6: memory types, planning patterns, checkpointed state; RAG with NeMo Retriever, hybrid search, reranking, chunking, ETL freshness, knowledge graphs. Take "Building RAG Agents With LLMs". |
| 4 | Domain 3: NAT evaluation (`nat eval`, evaluators, datasets), the profiler, tuning trade-offs, feedback and the data flywheel. Take "Evaluating RAG and Semantic Search Systems". |
| 5 | Domain 4: deploy a NIM with a cache mount, NIM Operator, autoscaling on GPU metrics, Dynamo concepts, MLOps eval gates, canary releases. |
| 6 | Domains 7–10: Dynamo-Triton batchers, TensorRT-LLM optimizations, a NeMo Guardrails config with input, retrieval and output rails; tracing and reliability metrics; layered safety and indirect injection; human approval and escalation. Domain practice to 80%+ everywhere. |
| 7 | Mixed practice, timed 120-minute mocks, section 7 changes, section 8 traps. Recheck the exam page for availability and weights. Book when you hit 85%+ twice. |

---

## 10. Exam-day checklist

**Before**

- [ ] Recheck the exam page: weights, recommended training, and (for NCP-AAI) availability.
- [ ] Create or sign in to your Certiverse account and confirm the booking.
- [ ] Run the secure browser and system check on the machine and network you'll use.
- [ ] Clear your desk and room; the session is monitored and recorded.

**During**

- [ ] NCA-GENL: about 1 minute per question for 50–60 questions. Don't stall on one item.
- [ ] NCP-AAI: about 2 minutes per question for 60–70 questions. Leave time to review flagged items.
- [ ] There are no breaks on remote exams. Plan water and comfort before you start.
- [ ] Read the constraint in each scenario (latency, cost, reliability, safety, oversight) before the options.
- [ ] Map old names to current ones before you rule an option out.
- [ ] Answer every item.

**After**

- [ ] The result appears on screen and by email within 24 hours: pass or fail, no score.
- [ ] If you failed, you must repurchase and wait 14 days. Go back to domain practice for your weakest areas first.
- [ ] If you passed, put the 2-year recertification date in your calendar.

---

## 11. Further reading

- **On this site:** [Library: NVIDIA AI books, courses and papers](/library?track=nvidia)
- **Exams and policies:** [NVIDIA certification hub](https://www.nvidia.com/en-us/learn/certification/) · [NCA-GENL exam page](https://www.nvidia.com/en-us/learn/certification/generative-ai-llm-associate/) · [NCP-AAI exam page](https://www.nvidia.com/en-us/learn/certification/agentic-ai-professional/) · [NCP-AAI study guide (PDF)](https://dam-cdn.nvd.orangelogic.com/AssetLink/64tei188l3tt132l265u1ipjoexdl1p5.pdf)
- **Courses:** [Fundamentals of Deep Learning (open source)](https://github.com/NVDLI/fundamentals-of-deep-learning) · NVIDIA DLI courses listed on each exam page
- **Inference:** [NIM](https://docs.nvidia.com/nim/index.html) · [NIM for LLMs](https://docs.nvidia.com/nim/large-language-models/latest/introduction.html) · [TensorRT-LLM](https://nvidia.github.io/TensorRT-LLM/overview.html) · [Dynamo-Triton](https://developer.nvidia.com/dynamo-triton) · [Triton user guide](https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/index.html) · [Dynamo](https://developer.nvidia.com/dynamo) · [TensorRT getting started](https://developer.nvidia.com/tensorrt-getting-started) · [NGC catalog](https://docs.nvidia.com/ngc/latest/ngc-catalog-user-guide.html)
- **NeMo:** [NeMo framework overview](https://docs.nvidia.com/nemo-framework/user-guide/latest/overview.html) · [Megatron Bridge](https://docs.nvidia.com/nemo/megatron-bridge/latest/index.html) · [NeMo Curator](https://docs.nvidia.com/nemo/curator/latest/index.html) · [NeMo Guardrails](https://docs.nvidia.com/nemo/guardrails/latest/index.html) · [NeMo Helix](https://docs.nvidia.com/nemo-helix/)
- **Agents:** [NeMo Agent Toolkit docs](https://docs.nvidia.com/nemo/agent-toolkit/latest/index.html) · [NeMo Agent Toolkit GitHub](https://github.com/NVIDIA/NeMo-Agent-Toolkit) · [NAT migration guide](https://docs.nvidia.com/nemo/agent-toolkit/1.9/resources/migration-guide.html) · [NVIDIA Blueprints](https://build.nvidia.com/blueprints) · [Deep Researcher Agent (AI-Q) blueprint](https://build.nvidia.com/nvidia/deep-researcher-agent) · [NVIDIA generative AI blog](https://developer.nvidia.com/blog/category/generative-ai/)
- **Protocols:** [Model Context Protocol specification](https://modelcontextprotocol.io/specification/latest) · [A2A specification](https://a2a-protocol.org/latest/specification/)
- **Data science:** [NVIDIA CUDA-X data science](https://docs.nvidia.com/datascience/) · [cuDF](https://docs.nvidia.com/cudf/latest/) · [cudf.pandas](https://docs.nvidia.com/cudf/latest/cudf_pandas/) · [cuML](https://docs.nvidia.com/cuml/latest/) · [scikit-learn model evaluation](https://scikit-learn.org/stable/modules/model_evaluation.html) · [Milvus overview](https://milvus.io/docs/overview.md)
- **Papers:** [Attention Is All You Need](https://arxiv.org/abs/1706.03762) · [BERT](https://arxiv.org/abs/1810.04805) · [LoRA](https://arxiv.org/abs/2106.09685) · [Understanding the Planning of LLM Agents](https://arxiv.org/abs/2402.02716)
- **Trustworthy AI:** [NVIDIA Trustworthy AI](https://www.nvidia.com/en-us/ai-trust-center/trustworthy-ai/) · [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) · [Prompt engineering and p-tuning](https://developer.nvidia.com/blog/an-introduction-to-large-language-models-prompt-engineering-and-p-tuning/) · [What is RAG](https://blogs.nvidia.com/blog/what-is-retrieval-augmented-generation/)

All facts were checked on 8 November 2026. NVIDIA renames, merges and deprecates products every few months, and the NCP-AAI page may update its status or weights. Confirm anything in section 7 before you rely on it.

# NCA-GENL pipeline report (2026-11-08)

Rebuilt from the workflow result (Assemble did not write report.md).

- Bundle: src/content/tracks/nvidia/exams/nca-genl.json
- Lessons 22, flashcards 130, questions 122
- Review: {"date":"2026-11-08","questionsChecked":122,"fixed":0,"dropped":0}
- Answer positions: [23,28,22,32]

## Log
- Research: 22 sources read, 10 corrections, 10 unverified
- Coverage: 13 skill gaps, 0 doubtful items
- Verify: 0 key disagreements, 35 fixed, 0 dropped

## Research corrections
- No study guide PDF is linked from the English exam page. The only official guide found is a Chinese PDF dated 2024-10-28 (images.nvidia.cn) whose text could not be extracted, so writers should use the subtopics on the official exam page instead.
- The official subtopics differ from the spec's paraphrased skills. They stress spaCy, Keras, NumPy, scikit-learn-style ML (feature engineering, cross-validation, explained variance), Matplotlib charts, collecting human data for RLHF, and evaluating technologies on cost, portability, compatibility and usability. They do not name CUDA, NIM, Triton or TensorRT-LLM, which appear only on the reading list.
- The official page does not name Certiverse as the proctor. Certiverse is used for registration and the account; remote exams are delivered by NVIDIA Authorized Testing Partners using a secure browser, with no breaks.
- Retake policy, not in the spec: you must repurchase, wait 14 days between attempts, and take the exam at most 5 times in 12 months. Results appear on screen and by email within 24 hours.
- Triton Inference Server was renamed NVIDIA Dynamo-Triton in March 2025. NVIDIA Dynamo is a separate LLM distributed-inference product.
- The NeMo Framework LLM stack moved to NeMo Megatron Bridge (plus AutoModel, RL, Curator, Evaluator and Export-Deploy) starting with release 26.02. The framework overview page is now focused on Speech AI.
- The NeMo microservices docs are archived and no longer maintained. The successor is NeMo Helix, an open-source agent control plane.
- RAPIDS has been rebranded as NVIDIA CUDA-X libraries for data science, and docs.rapids.ai now redirects to docs.nvidia.com/datascience.
- NeMo Curator's backend moved from Dask to Ray. The NVIDIA Trust Center still uses the older name 'NeMo Data Curator'.
- The official domain order is Core ML, Data Analysis, Experimentation, Software Development, Trustworthy AI. The weights match the spec.

## Unverified
- Certiverse as the remote proctoring vendor, as opposed to the registration platform
- Scheduling up to 60 days in advance (seen only in a search snippet)
- An English official NCA-GENL study guide PDF, and the contents of the Chinese PDF
- Current format, duration and price of the DLI course 'Rapid Application Development with LLMs'; the exam page links two course IDs and both pages show stale 2023 listings
- NeMo microservices sunset date of Oct 1, 2026 and a NeMo Platform to NeMo Helix rename; these come from search snippets and a third-party site
- Official current name of the NeMo Guardrails content-safety model (NemoGuard vs Nemotron Safety Guard)
- Exact cuml.accel enable commands
- Current version numbers of cuDF, cuML, TensorRT-LLM and NeMo
- Details of GenAI-Perf, Perf Analyzer and Model Analyzer
- Third-party claims of a $135 price and a per-domain score breakdown, both contradicted by NVIDIA's pages

## Verify d1 (35 questions, 0 key disagreements)
- Fixed: d1-l5 PEFT section: removed the claim that NVIDIA's blog describes the prompt encoder as 'an LSTM or MLP'. The blog says only 'a small trainable model'. The LSTM+MLP detail is now credited to the original p-tuning paper, and the text notes that NVIDIA uses 'p-tuning' and 'prompt tuning' almost interchangeably
- Fixed: d1-l5 sources: added P-tuning paper arXiv 2103.10385
- Fixed: d1-l1 sources: added scikit-learn cross-validation user guide (official reading list) to back the k-fold and test-leakage content
- Fixed: d1-q2 source: replaced the generic DLI repo with the scikit-learn clustering guide
- Fixed: d1-q3 and d1-q4 sources: replaced the generic DLI repo with the scikit-learn cross-validation guide, which explicitly covers k-fold CV and test-set leakage during hyperparameter tuning
- Fixed: d1-q11 explanation: corrected the paraphrase of 'Attention Is All You Need' to 'more parallelisable and required significantly less time to train'
- Fixed: d1-q27 explanation: softened the 'one frozen model for many tasks' attribution to what the NVIDIA blog actually says (models p-tuned on different tasks can be saved without much memory)
- Fixed: NVIDIA p-tuning blog does not name LSTM/MLP for the prompt encoder; it says 'a small trainable model' (fixed in d1-l5)
- Fixed: NVIDIA blog does not explicitly claim one frozen LLM serves many tasks; it says p-tuned models for different tasks can be saved without large memory (fixed in d1-l5 and d1-q27)
- Fixed: Transformer paper wording on parallelism and training time (fixed in d1-q11)
- Concern: Blind solve agreed with all 35 keys. All rationale counts match the options, and every multi-answer stem says '(Select two.)'
- Concern: Several questions on general deep-learning basics (q1, q5-q10) still cite only the NVDLI Fundamentals of Deep Learning repo. It is official training and covers these topics, but it is a repo root rather than a page that backs each specific claim
- Concern: The Adam, FLAN, InstructGPT, DPO, CoT, GPT-3, BPE, nucleus-sampling and RAG arXiv papers are primary sources but are not on NVIDIA's official reading list. They back the claims and were kept
- Concern: Lessons carry a 'minutes' field (d1 total = 52 min across 6 lessons). That field is what the user's request to sum reading time into hours per cert needs, but the summing is outside this verifier step

## Verify d2 (31 questions, 0 key disagreements)
- Fixed: d2-l2: NVIDIA Dynamo row changed from 'KV-cache-aware routing' to the features the sources back (disaggregated prefill/decode serving, prefix caching, KV-cache offload)
- Fixed: d2-l3: dropped the off-topic Megatron Bridge source and added the TensorRT-LLM overview page (nvidia.github.io/TensorRT-LLM/overview.html), which backs in-flight batching, paged KV cache, FP8/FP4, speculative decoding and parallelism
- Fixed: d2-l4: the in-flight batching bullet no longer suggests TensorRT-LLM is NIM's only engine; added the NIM LLM benchmarking metrics page and NIM Operator docs as sources
- Fixed: d2-l5: replaced a paraphrase written in quotation marks as if quoting the exam page with an unquoted description of the official subtopic
- Fixed: d2-q8, q9, q10, q11, q12, q13: added the TensorRT-LLM overview page as the main source; removed the Megatron Bridge source from q12
- Fixed: d2-q7, q29: added the NIM LLM benchmarking metrics page (defines TTFT, inter-token latency and throughput)
- Fixed: d2-q27: added the NIM Operator docs page
- Fixed: d2-q20: added the official PyTorch tutorial that shows moving the model and its inputs to the device
- Fixed: Dynamo features: 'KV-cache-aware routing' replaced with what research.md backs (prefix caching, KV-cache offload, disaggregated prefill/decode)
- Fixed: FP4: the lesson now notes that the TensorRT-LLM docs name B200 specifically (still described as Blackwell)
- Fixed: In-flight batching is described as a feature of TensorRT-LLM and the other LLM engines NIM uses (vLLM, SGLang), not of TensorRT-LLM alone
- Concern: Questions d2-q5, q11, q16, q17 and q31 have no 'scenario' field (the property is missing, not empty). Check that the app renders questions without a scenario.
- Concern: My blind answers matched all 31 keys. Rationales line up one-to-one with options, and all four multi-answer stems say '(Select two.)'.
- Concern: q11 (7B in BF16 is about 14 GB) is arithmetic from first principles. Its source only backs it indirectly, through the FP8 'halve memory vs 16-bit' statement.
- Concern: This step did not cover the user's request to show total learning hours per cert (the sum of lesson reading times). d2's lesson minutes are 14+16+15+15+14 = 74 min, about 1.2 h. The total needs to be computed and shown in another workflow step or in the app.

## Verify d3 (26 questions, 0 key disagreements)
- Fixed: d3-q1: swapped the off-topic GPT-3 contamination source for scikit-learn cross-validation, which warns that tuning on the test set leaks into the score
- Fixed: d3-q5: removed the Megatron Bridge source because it does not back the learning-rate/NaN claim; DLI Fundamentals source kept
- Fixed: d3-q6: added the Weights & Biases Quickstart (official reading) as the source for experiment tracking
- Fixed: d3-q7: swapped HELM/GPT-3 for the Hugging Face Transformers perplexity doc, which gives the definition and notes that perplexity depends on the tokenizer
- Fixed: d3-q9, d3-q10: swapped the generic exam-page source for scikit-learn Metrics and scoring (precision, recall, F1)
- Fixed: d3-q12: swapped the exam-page source for EleutherAI lm-evaluation-harness
- Fixed: d3-q24: added the HF RLHF blog (official reading)
- Fixed: d3-q26 and d3-l5 sources: Triton doc retitled as Dynamo-Triton (formerly Triton Inference Server)
- Fixed: d3-l1 sources: added scikit-learn cross-validation and W&B Quickstart; d3-l2: added HF perplexity, scikit-learn metrics and lm-evaluation-harness; d3-l5: added HF RLHF blog
- Fixed: d3-l5 hardware/software tests: 'dynamic batching in Triton' and 'Triton exposes' changed to NVIDIA Dynamo-Triton (formerly Triton Inference Server), per research.md section (d)
- Fixed: d3-l4: 'Rule of thumb from NVIDIA's RAG and customisation material' softened to 'A common rule of thumb', since research.md does not attribute it to NVIDIA
- Fixed: d3-l3 and d3-l2: NeMo Evaluator now described as a NeMo Framework library and a NeMo Helix service, with a caveat that the product names changed recently (Helix replaces the archived NeMo microservices)
- Concern: Blind solve agreed with all 26 keys; blind answers saved to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/nvidia-nca-genl/blind-d3.json. Corrected file written to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/nvidia-nca-genl/domain-d3.json; a backup of the original is in the scratchpad
- Concern: docs.wandb.ai/quickstart now 301-redirects to docs.coreweave.com/quickstart. It is still the live W&B Quickstart, so the official-reading URL was kept
- Concern: d3-q5 now has only the DLI Fundamentals source, which covers training and overfitting in general rather than NaN/learning-rate divergence specifically. No official source fetched backs the warm-up and gradient-clipping advice directly; it is standard practice
- Concern: The user's request to show total learning hours per cert (by summing reading times) was outside this verification step and was not done here. Lesson minutes for d3 sum to 71 (14+16+14+15+12), and that field is available for the summation

## Verify d4 (18 questions, 0 key disagreements)
- Fixed: d4-l3: replaced the off-topic cuML source with the scikit-learn metrics guide, Matplotlib plot types and the NVDLI Fundamentals of Deep Learning repo (all on the official reading list)
- Fixed: d4-l3: added that R² and explained variance are identical when residuals have zero mean and that scikit-learn recommends R² in general (verified on the scikit-learn page)
- Fixed: d4-l4: added the Milvus overview source to back the vector database and ANN claims
- Fixed: d4-q11: added the Matplotlib plot types source (hist)
- Fixed: d4-q12: added the NVDLI Fundamentals of Deep Learning source (overfitting, bias-variance)
- Fixed: d4-q13: added the scikit-learn metrics source, which states that explained variance does not account for systematic offset
- Fixed: d4-q14: added the scikit-learn source; rationale 1 now mentions balanced accuracy
- Fixed: l3/q13 explained variance vs R² claim now cites scikit-learn ('does not account for systematic offset'; the two are identical when residuals have zero mean)
- Concern: The heuristic filter examples in d4-l1 (symbol-to-word ratio, URL density, repeated n-grams) and the PII redaction step are generic conceptual examples. research.md does not list them specifically.
- Concern: q11, q12 and q14 still lean partly on the exam topics page, which backs the subtopic but not the specific technical claim. Specific sources were added next to it.
- Concern: The relayed user request (add learning hours per cert by summing reading times) is outside this verifier step. This step did not handle it.
- Concern: Blind answers saved to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/nvidia-nca-genl/blind-d4.json. All 18 matched the keys; rationale counts and Select-two stems were checked.

## Verify d5 (12 questions, 0 key disagreements)
- Fixed: d5-q5: changed 'deterministic... regardless of what the model generates' to 'an enforced PII-masking check'. Presidio-style detection is not guaranteed to catch every leak.
- Fixed: d5-q5 explanation: 'not a reliable control' now reads 'not an enforced control'
- Fixed: d5-q7 rationale 0: replaced the unsourced claim 'NVIDIA's recommended way' with wording tied to NVIDIA's RAG explainer
- Fixed: d5-q12 sources: replaced the off-topic NeMo Curator link with the NIST AI RMF, which is on the official reading list
- Fixed: Model Card++: removed the unverified claim that it 'adds sections on bias, explainability, privacy, and safety and security'. Neither the Trust Center nor the GitHub repo states this; both say only that the templates document transparency, risks, usage and limitations. Fixed in the lesson d5-l1 'Transparency and model cards' section, the keyPoint, flashcard d5-f7 and the d5-q9 explanation.
- Fixed: Model Card Generator: added the Trust Center's description of it as a tool that automates model-card creation.
- Fixed: Confidential Computing: reworded to say the Trust Center lists it among its security features. The page itself does not define it.
- Fixed: Lesson d5-l1: added the NIST AI RMF source (official reading) for the bias and privacy content.
- Concern: My blind answers matched every key (12/12). Rationales map one-to-one to options, with 4 options and 4 rationales each. The multi-answer questions q7 and q12 both say '(Select two.)'.
- Concern: I confirmed by fetching that the Trust Center principle definitions and the NeMo Guardrails docs URL are live: five rail types, Colang, the NemoGuard jailbreak and topic-control NIMs, and Presidio PII masking.
- Concern: The garak red-teaming mention in d5-l2 depends on research.md's NeMo Helix notes, which are marked as recently changed. I did not refetch that page.
- Concern: Not part of this verification step: the user asked for per-cert learning hours summed from reading times. Each lesson has a 'minutes' field (d5-l1 = 15, d5-l2 = 15, so 30 min for d5), but the workflow has to add the aggregation separately.
- Concern: Corrected file: /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/nvidia-nca-genl/domain-d5.json; blind answers: /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/nvidia-nca-genl/blind-d5.json

Note: Assemble recorded review.fixed = 0; set to 26, the number of distinct question ids named in the verifiers' fix lists above (a lower bound).

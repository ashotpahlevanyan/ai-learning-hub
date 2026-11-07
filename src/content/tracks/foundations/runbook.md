# AI Foundations: Math and Python Study Guide

A deep path through the mathematics and the Python behind modern AI and LLMs. Use it alongside the two courses on this site: **Mathematics for AI and LLMs** (MATH-AI) and **Python for AI Engineering** (PY-AI). Each has lessons with worked examples and hands-on labs, flashcards, practice questions and a 40-question, 60-minute practice test.

> **Read this first.** These are this site's own deep-foundation courses, not vendor certifications. There is no official exam to book. The goal is fluency: you should be able to derive the key results on a whiteboard, implement them in NumPy and PyTorch, and explain in a design review why a system behaves the way it does. Facts and library behaviour below were checked against primary sources and official docs on 7 November 2026. Library defaults change between releases, so section 7 lists the version changes that matter.

---

## Table of contents

1. [How to use this track](#1-how-to-use-this-track)
2. [The study method](#2-the-study-method)
3. [Free primary resources](#3-free-primary-resources)
4. [Course: Mathematics for AI and LLMs (MATH-AI)](#4-course-mathematics-for-ai-and-llms-math-ai)
5. [Course: Python for AI Engineering (PY-AI)](#5-course-python-for-ai-engineering-py-ai)
6. [Derive it yourself](#6-derive-it-yourself)
7. [Version notes](#7-version-notes)
8. [Capstone projects](#8-capstone-projects)
9. [Study schedules](#9-study-schedules)
10. [Cheat sheets](#10-cheat-sheets)

---

## 1. How to use this track

### Which course first

| You are… | Order | Why |
|---|---|---|
| An architect or tech lead who wants to speak with authority | **MATH-AI → PY-AI** | The math gives you the vocabulary (embeddings, gradients, attention, KV cache, scaling laws) to explain why a design works and what it will cost. Python then makes every idea concrete and testable. |
| A developer moving into AI engineering | **PY-AI → MATH-AI** | Get productive with NumPy, PyTorch and LLM APIs first, then go back and learn the theory behind the code you already wrote. |
| A senior engineer who wants to "become a beast" | **Both, interleaved** | Learn each idea as math, then implement it the same week. This is the schedule in section 9. |
| Already studying the Claude, Gemini, OpenAI or AWS tracks | **MATH-AI domains 4 and 5, PY-AI domain 4** | Decoding, tokens, context cost, structured output, tool loops and RAG show up in every vendor exam. |

### How the two courses pair

Every math domain has a Python counterpart. Study them as pairs: derive it, then code it, then check the code against the library.

| Learn the math (MATH-AI) | Then implement it (PY-AI) |
|---|---|
| D1 Vectors, norms, dot products and cosine similarity | D4 Embeddings, cosine similarity and a minimal RAG pipeline |
| D1 Matrices as linear maps and shape reasoning; Tensors and broadcasting | D2 ndarrays: shapes, dtypes, views and masks; Broadcasting, vectorisation and einsum |
| D1 Transpose, inverse, rank, independence and projections; Eigenvectors, SVD, PCA and why LoRA works | D2 Linear algebra in NumPy: matmul, norms, solve and SVD |
| D2 Chain rule, computational graphs and backprop by hand | D3 PyTorch tensors, devices, autograd and the computational graph |
| D2 Optimisers: SGD, momentum, Adam, AdamW and schedules | D3 nn.Module, losses, optimisers and a correct training loop |
| D3 Confidence intervals, hypothesis tests and A/B tests for model evals | D3 The scikit-learn workflow: splits, pipelines, cross-validation and honest metrics |
| D4 Logits, softmax, sigmoid and the log-sum-exp trick; Entropy, cross-entropy, KL divergence and perplexity | D3 nn.Module, losses, optimisers and a correct training loop (`CrossEntropyLoss` takes raw logits) |
| D5 Scaled dot-product attention, masking and multi-head attention; The transformer block | D3 Embeddings, scaled dot-product attention and a tiny transformer block from scratch |
| D5 Compute and memory arithmetic; Numerics: fp32, fp16, bf16 and quantisation error | D2 Performance and memory: dtypes, chunking and Copy-on-Write; capstone D in section 8 |
| D4 Decoding as operations on a distribution | D4 Streaming, retries with backoff and jitter, and rate limits; Structured output and tool-calling loops |

The canonical example: learn attention in MATH-AI as

$$\mathrm{Attention}(Q,K,V)=\mathrm{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V$$

then write it in NumPy with explicit shapes, then in PyTorch, and assert that your version matches `torch.nn.functional.scaled_dot_product_attention` with `is_causal=True`.

---

## 2. The study method

The same loop as every track on this site, with one extra step for this track: **derive before you code.**

1. **Read** the section of this guide for the domain you are on.
2. **Learn** the lesson. Each one goes intuition, then formal definition, then a fully worked numeric example, then where it shows up in LLMs, then a common misconception.
3. **Derive** the key result on paper without looking (section 6). If you cannot, reread the worked example and try again tomorrow.
4. **Code** the lesson's lab. Then check your answer against the library function (`np.linalg.svd`, `torch.softmax`, `F.scaled_dot_product_attention`, `F.cross_entropy`).
5. **Recall** with flashcards every day. Spaced repetition picks what to review.
6. **Apply** with the capstone projects in section 8. Build them; do not just read about them.
7. **Test** with Smart practice until every domain is above 80%, then take the timed practice test. Aim for 85% or more.
8. **Fix** misses in the Mistakes notebook. For calculation misses, redo the calculation in Python and find the exact step you got wrong.

**Daily routine (60–90 minutes):** 10 min flashcards → 15 min derivation from section 6 → 25–45 min lesson and its lab → 15 min practice questions, reading every option's rationale.

**Three habits that separate fluent from familiar:**

- **Always write shapes.** Next to every tensor in your notes, write its shape, such as `(B, T, d_model)`. Most bugs and most interview questions are shape questions.
- **State your assumptions in every estimate.** "7B parameters at 2 bytes per parameter is 14 GB of weights" is a good answer. "About 14 GB" is not.
- **Check numbers with code.** Every formula in this guide can be checked in a few lines of NumPy. Do it.

---

## 3. Free primary resources

Official docs, university course material and the original papers only.

### Mathematics

| Resource | Use it for |
|---|---|
| [MIT 18.06SC Linear Algebra (Strang)](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/) | The classic route to real fluency: Ax = b and the four subspaces, projections and least squares, eigenvalues, positive definite matrices, SVD and the pseudoinverse |
| [MIT 18.01SC Single Variable Calculus](https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/) | Derivatives and the chain rule, if your calculus is rusty |
| [MIT 18.05 Introduction to Probability and Statistics](https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/) | Bayes, distributions, the CLT, confidence intervals and hypothesis tests. The readings are under "Class readings and in-class materials" |
| [Dive into Deep Learning: Mathematics appendix](https://d2l.ai/chapter_appendix-mathematics-for-deep-learning/index.html) | Free, runnable math: geometry and linear algebra, eigendecomposition, single and multivariable calculus, random variables, maximum likelihood, statistics and information theory |
| [Dive into Deep Learning: Attention and transformers](https://d2l.ai/chapter_attention-mechanisms-and-transformers/index.html) | Attention scoring functions and the transformer, with code |
| [Deep Learning (Goodfellow, Bengio, Courville)](https://www.deeplearningbook.org/) | Chapter 2 linear algebra, chapter 3 probability and information theory, chapter 4 numerical computation, chapter 8 optimisation |
| [CS229 main notes (PDF)](https://cs229.stanford.edu/main_notes.pdf) | Stanford's machine learning lecture notes. The CS229 homepage materials need a Stanford login, so use these public PDFs |
| [CS229 linear algebra review (PDF)](https://cs229.stanford.edu/section/cs229-linalg.pdf) | A compact reference for matrix calculus and decompositions |
| [CS229 probability review (PDF)](https://cs229.stanford.edu/section/cs229-prob.pdf) | A compact reference for distributions, expectation and variance |
| [Hugging Face: Perplexity of fixed-length models](https://huggingface.co/docs/transformers/perplexity) | How perplexity is computed in practice and why the sliding-window stride changes it |

### Key papers

| Paper | Why it matters |
|---|---|
| [Attention Is All You Need](https://arxiv.org/abs/1706.03762) | The transformer: scaled dot-product attention, multi-head attention, sinusoidal positions, the warmup schedule |
| [Scaling Laws for Neural Language Models (Kaplan et al.)](https://arxiv.org/abs/2001.08361) | Parameter counting, FLOPs per token, power-law scaling |
| [Training Compute-Optimal LLMs (Chinchilla)](https://arxiv.org/abs/2203.15556) | Scale parameters and tokens equally; about 6ND training FLOPs |
| [LoRA](https://arxiv.org/abs/2106.09685) | Low-rank adaptation: why a rank-r update is enough |
| [QLoRA](https://arxiv.org/abs/2305.14314) | NF4, double quantisation and paged optimisers |
| [Adam](https://arxiv.org/abs/1412.6980) | Moment estimates and bias correction |
| [Decoupled Weight Decay (AdamW)](https://arxiv.org/abs/1711.05101) | Why L2 regularisation is not weight decay for adaptive optimisers |
| [On the difficulty of training RNNs (Pascanu et al.)](https://arxiv.org/abs/1211.5063) | Exploding and vanishing gradients, gradient clipping |
| [RoFormer (RoPE)](https://arxiv.org/abs/2104.09864) | Rotary position embeddings |
| [Layer Normalization](https://arxiv.org/abs/1607.06450) and [RMSNorm](https://arxiv.org/abs/1910.07467) | The two normalisations in modern transformers |
| [On Layer Normalization in the Transformer (pre-LN)](https://arxiv.org/abs/2002.04745) | Why modern models normalise before each sublayer |
| [GLU Variants (SwiGLU)](https://arxiv.org/abs/2002.05202) | The MLP used in Llama-style models |
| [Multi-Query Attention](https://arxiv.org/abs/1911.02150) and [GQA](https://arxiv.org/abs/2305.13245) | Sharing K and V heads to shrink the KV cache |
| [FlashAttention](https://arxiv.org/abs/2205.14135) | IO-aware exact attention |
| [Llama 2](https://arxiv.org/abs/2307.09288) | A modern recipe: RMSNorm, SwiGLU, RoPE, GQA, AdamW and a cosine schedule |
| [The Curious Case of Neural Text Degeneration](https://arxiv.org/abs/1904.09751) | Nucleus (top-p) sampling |
| [On Calibration of Modern Neural Networks](https://arxiv.org/abs/1706.04599) | Calibration and temperature scaling |
| [Mixed Precision Training](https://arxiv.org/abs/1710.03740) | fp32 master weights, loss scaling, fp32 accumulation |
| [LLM.int8()](https://arxiv.org/abs/2208.07339) and [GPTQ](https://arxiv.org/abs/2210.17323) | Quantising large models |

### Python and libraries

| Resource | Use it for |
|---|---|
| [The Python Tutorial](https://docs.python.org/3/tutorial/) | The official tutorial; read alongside PY-AI domain 1 |
| [Python data model](https://docs.python.org/3/reference/datamodel.html) | Identity, mutability, special methods |
| [asyncio](https://docs.python.org/3/library/asyncio.html) | Tasks, `gather`, `Semaphore`, timeouts and cancellation |
| [unittest.mock](https://docs.python.org/3/library/unittest.mock.html) | Mocking LLM clients in tests |
| [Writing pyproject.toml](https://packaging.python.org/en/latest/guides/writing-pyproject-toml/) and [uv projects guide](https://docs.astral.sh/uv/guides/projects/) | Packaging, dependency groups and lockfiles |
| [Pydantic models](https://pydantic.dev/docs/validation/latest/concepts/models/) | Validated data and JSON Schema (Pydantic v2) |
| [NumPy broadcasting](https://numpy.org/doc/stable/user/basics.broadcasting.html) and [copies and views](https://numpy.org/doc/stable/user/basics.copies.html) | The two NumPy pages you must know cold |
| [NumPy linear algebra](https://numpy.org/doc/stable/reference/routines.linalg.html) and [einsum](https://numpy.org/doc/stable/reference/generated/numpy.einsum.html) | `matmul`, `norm`, `solve`, `svd`, `einsum` |
| [NumPy 2.0 migration guide](https://numpy.org/doc/stable/numpy_2_0_migration_guide.html) | `copy=False`, scalar reprs, NEP 50 promotion |
| [pandas user guide](https://pandas.pydata.org/docs/user_guide/index.html) and [what's new in 3.0.0](https://pandas.pydata.org/docs/whatsnew/v3.0.0.html) | DataFrames, and the Copy-on-Write changes in pandas 3 |
| [scikit-learn user guide](https://scikit-learn.org/stable/user_guide.html) and [common pitfalls](https://scikit-learn.org/stable/common_pitfalls.html) | Pipelines, cross-validation and avoiding leakage |
| [PyTorch: Learn the Basics](https://docs.pytorch.org/tutorials/beginner/basics/intro.html) | Tensors, autograd, `nn.Module`, the training loop, saving and loading |
| [PyTorch scaled_dot_product_attention](https://docs.pytorch.org/docs/2.8/generated/torch.nn.functional.scaled_dot_product_attention.html) | The reference implementation to test your attention against |
| [PyTorch optim](https://docs.pytorch.org/docs/2.8/optim.html) and [AMP](https://docs.pytorch.org/docs/2.8/amp.html) | Optimisers, schedules and mixed precision |
| [PyTorch reproducibility notes](https://docs.pytorch.org/docs/stable/notes/randomness.html) | Seeds and deterministic algorithms |
| [pytest](https://docs.pytest.org/en/stable/) | Fixtures, parametrize and monkeypatch |

---

## 4. Course: Mathematics for AI and LLMs (MATH-AI)

24 lessons in five domains. The practice test mixes about 40% concept and judgment questions, 35% compute-or-predict questions and 25% debug-or-choose questions. Have a calculator or a Python prompt open.

### 4.1 Linear algebra for embeddings and models (22%)

| Lesson | Master this |
|---|---|
| Vectors, norms, dot products and cosine similarity | Cosine similarity, and why the dot product of L2-normalised vectors equals their cosine. That is why vector databases normalise once and then use inner product. For a = (1, 2, 3) and b = (2, 4, 6) the cosine is 1, because the vectors are parallel |
| Matrices as linear maps and shape reasoning | Read every matmul as a map from one space to another. `(2,5,8) @ (8,16)` gives `(2,5,16)`: the last axis of the left meets the first axis of the right, and leading axes are batch |
| Transpose, inverse, rank, independence and projections | Rank as the number of independent directions (`[[1,2],[2,4]]` has rank 1). Projection of v onto u. Why you solve rather than invert |
| Eigenvectors, SVD, PCA and why LoRA works | SVD as rotate, scale, rotate. Eckart–Young: the best rank-k approximation is the truncated SVD. PCA is SVD of centred data. LoRA's update BA has rank at most r, and for d = k = 4096 and r = 8 it trains 65,536 parameters instead of 16,777,216 (256x fewer) |
| Tensors and broadcasting, the language of deep learning | Align shapes from the right; two dimensions are compatible if they are equal or one is 1. `(3,1) + (1,4)` gives `(3,4)` |

**Key facts to own:**

- `np.linalg.eigvalsh` returns eigenvalues in ascending order; `np.linalg.svd` returns singular values in descending order.
- Rank-k approximation error: Frobenius $$\sqrt{\sum_{i>k}\sigma_i^2}$$, spectral $$\sigma_{k+1}$$.
- LoRA: $$h = W_0x + BAx$$ with $$B \in \mathbb{R}^{d\times r}$$, $$A \in \mathbb{R}^{r\times k}$$, A random Gaussian and B zero at the start (so the update starts at zero), scaled by $$\alpha/r$$. BA can be merged into W0, so there is no added inference latency. On GPT-3 175B the paper reports about 10,000x fewer trainable parameters and 3x less GPU memory.

### 4.2 Calculus and optimisation (22%)

| Lesson | Master this |
|---|---|
| Derivatives, partial derivatives and gradients | The gradient as the direction of steepest increase; the directional derivative as a dot product with the gradient |
| Chain rule, computational graphs and backprop by hand | Backprop is the chain rule applied in reverse over a graph. For $$y=(3x^2+1)^2$$ at x = 2, dy/dx = 2(13)(12) = 312, which matches autograd. The logistic-loss gradient $$(\sigma(z)-1)x$$ |
| Jacobians, Hessians and curvature | The softmax Jacobian of an n-vector is n×n. The Hessian of $$x^2+3y^2$$ is diag(2, 6): curvature differs by 3x across directions, which is the intuition for ill-conditioning |
| Optimisers: SGD, momentum, Adam, AdamW and schedules | Adam's moments and bias correction; why its first step moves each parameter by about lr whatever the gradient size; AdamW's decoupled decay; warmup and cosine schedules |
| Loss landscapes: convexity, saddles and unstable gradients | Gradient descent on a quadratic with curvature λ diverges when lr > 2/λ. Saddles, vanishing and exploding gradients, and clipping by global norm |

**Key facts to own:**

- On f = x², 5 steps from x = 1: lr 0.1 gives 0.32768 (converges), lr 0.9 gives −0.32768 (oscillates but converges), lr 1.1 gives −2.48832 (diverges).
- `clip_grad_norm_` treats all gradients as one vector and returns the total norm *before* clipping. A gradient of (3, 4) with max_norm 1 returns 5.0 and becomes (0.6, 0.8).
- The original transformer used Adam with β1 = 0.9, β2 = 0.98, ε = 1e-9 and 4000 warmup steps. Llama 2 used AdamW with β1 = 0.9, β2 = 0.95, eps = 1e-5, a cosine schedule with 2000 warmup steps decaying to 10% of peak, weight decay 0.1 and gradient clipping at 1.0.

### 4.3 Probability and statistics (20%)

| Lesson | Master this |
|---|---|
| Random variables, distributions, expectation and variance | Bernoulli, categorical and Gaussian; expectation and variance; population (ddof = 0) vs sample (ddof = 1) variance |
| Conditional probability, independence and Bayes with base rates | With 1% prevalence, 99% sensitivity and a 5% false-positive rate, a positive result means only a 16.67% chance of the condition. Base rates dominate |
| Maximum likelihood, MAP and why training minimises negative log-likelihood | The Bernoulli MLE is k/n. Maximising likelihood of a categorical model is the same as minimising cross-entropy. MAP adds a prior, which acts as a regulariser |
| Sampling, the law of large numbers, the CLT and standard error | SE of a mean is σ/√n, so 4x the data halves the error. Accuracy 0.80 on 500 items has SE 0.0179 and a 95% CI of about [0.765, 0.835] |
| Confidence intervals, hypothesis tests and A/B tests for model evals | Whether a 3-point eval gain is real. Multiple comparisons: with 20 tests at α = 0.05, the chance of at least one false positive is 64%; Bonferroni uses 0.0025. Paired tests (such as McNemar) for two models on the same items |

**The variance trap:** for [1, 2, 3, 4], `np.var` gives 1.25 (ddof = 0), while `pd.Series.var()` and `torch.var` give 1.6667 (ddof = 1 by default).

### 4.4 Information theory, losses and decoding (16%)

| Lesson | Master this |
|---|---|
| Logits, softmax, sigmoid and the log-sum-exp trick | softmax([2, 1, 0.1]) = [0.659, 0.242, 0.099]. Naive softmax of [1000, 1001, 1002] gives nan; subtracting the max gives [0.090, 0.245, 0.665]. A 2-class softmax is the sigmoid of the logit difference |
| Entropy, cross-entropy, KL divergence and perplexity | Cross-entropy = entropy + KL. KL is asymmetric. Perplexity is exp of the mean NLL; an untrained LM over 50,000 tokens starts near ln 50000 = 10.82 nats |
| Decoding as operations on a distribution | Greedy is argmax (the limit T → 0). Temperature divides logits by T. Top-k keeps the k most probable tokens; top-p keeps the smallest set whose probability sums to at least p. Both renormalise |
| Losses and metrics: MSE, cross-entropy, F1 and calibration | Precision, recall and F1 from a confusion matrix. Calibration: modern networks are often overconfident, and one-parameter temperature scaling is "surprisingly effective" |

**Worked decoding example:** logits [2, 1, 0, −1] at T = 1 give [0.644, 0.237, 0.087, 0.032]. The cumulative sums are [0.644, 0.881, 0.968, 1.0], so top-p 0.9 keeps 3 tokens and top-p 0.85 keeps 2. At T = 0.5 the top token gets 0.865; at T = 2 it gets 0.455.

**PyTorch traps:** `CrossEntropyLoss` takes raw logits because it applies log-softmax itself. `F.kl_div(input, target)` expects `input` as **log-probabilities** of the model distribution q and `target` as probabilities p, and computes KL(p ∥ q). Use `reduction='batchmean'`; the docs say `'mean'` does not return the true KL value.

### 4.5 The mathematics of transformers and LLMs (20%)

| Lesson | Master this |
|---|---|
| Tokens, embeddings and positional information | The embedding matrix is a lookup table of shape (V, d_model). Sinusoidal positions; RoPE rotates q and k so the attention score depends only on the offset between positions |
| Scaled dot-product attention, masking and multi-head attention | Every shape in the attention formula; why divide by √d_k; causal masking with −inf before the softmax; heads as parallel lower-dimensional attentions joined by W^O |
| The transformer block: residuals, normalisation, MLPs and parameter counting | Post-LN (original) vs pre-LN (modern). LayerNorm vs RMSNorm. About 12·n_layer·d_model² non-embedding parameters for a standard block |
| Compute and memory arithmetic: FLOPs, scaling laws and the KV cache | About 2N FLOPs per token forward and 6N per token to train. Chinchilla: scale N and D equally, about 20 tokens per parameter as a rule of thumb. KV-cache size from the model config |
| Numerics: fp32, fp16, bf16 and quantisation error | fp16 has more precision but overflows above 65504; bf16 has fp32's range but less precision. Absmax int8 quantisation and its worst-case error |

**Key facts to own:**

- Base transformer: N = 6 layers, d_model = 512, d_ff = 2048, h = 8, d_k = d_v = 64, about 65M parameters. Self-attention costs O(n²·d) per layer.
- If q and k have independent components with mean 0 and variance 1, then q·k has variance d_k. Dividing by √d_k brings it back to 1 so the softmax does not saturate.
- Llama 2 uses pre-norm RMSNorm, SwiGLU and RoPE, and GQA for the 34B and 70B models.
- Chinchilla (70B parameters on 1.4T tokens) used the same compute budget as Gopher (280B on 300B tokens) and reached 67.5% on MMLU.
- Mixed-precision: fp16 needs autocast plus a GradScaler, because small gradients underflow; bf16 needs only autocast.

---

## 5. Course: Python for AI Engineering (PY-AI)

23 lessons in five domains. The course connects each library call to the math it implements. Code questions are written to run as-is; where an item needs Python 3.10+ or 3.11+ syntax, the stem says so.

### 5.1 Python core and idioms (22%)

| Lesson | Master this |
|---|---|
| The Python data model: identity, mutability and copies | `is` vs `==`; names are references. Mutable default arguments persist across calls. `[[0]*2]*2` aliases the inner list. Shallow vs deep copy. `0.1 + 0.2 == 0.3` is False and `round(2.5) == 2` |
| Comprehensions, iterators, generators and itertools | Lazy pipelines for large data: generators, `itertools.islice`, `chain`, `groupby`, batching a stream into chunks |
| Functions: signatures, closures and decorators | `*args`, `**kwargs`, keyword-only parameters. Late-binding closures: `[lambda: i for i in range(3)]` all return 2; fix with `lambda i=i: i`. Decorators with `functools.wraps` for retries and timing |
| Classes, dataclasses, protocols, type hints and Pydantic | The runtime does not enforce type hints. A `runtime_checkable` Protocol checks only that attributes exist. Pydantic v2: `model_validate`, `model_validate_json`, `model_dump`, `model_json_schema`, `ConfigDict(extra='forbid')`. Never the v1 `parse_obj`, `.dict()` or `.json()` |
| Exceptions, context managers, environments and packaging | `with` and `contextlib`; exception chaining. `pyproject.toml` (the `[build-system]` table should always be present; dev tools in `[dependency-groups]`). uv: `uv add`, `uv lock`, `uv sync`, `uv run`; `uv.lock` is a cross-platform lockfile |

### 5.2 NumPy and pandas for data work (22%)

| Lesson | Master this |
|---|---|
| ndarrays: shapes, dtypes, views and masks | Basic indexing always gives a view; advanced (integer or boolean) indexing always gives a copy. `.base` is None for a copy. `ravel` gives a view when possible, `flatten` always copies |
| Broadcasting, vectorisation and einsum | The broadcasting rule from the right; the error message for `(4,3)` and `(4,)`; replacing Python loops with array ops; writing attention scores as `einsum('bhqd,bhkd->bhqk', q, k)` |
| Linear algebra in NumPy: matmul, norms, solve and SVD | `@` for matmul; `np.linalg.norm` with `axis` and `keepdims`; `solve` rather than `inv`; `svd` returns `U, S, Vh`; `np.random.default_rng(seed)` for randomness |
| pandas DataFrames: select, group, merge, reshape and handle missing data | `.loc` and `.iloc`; `groupby().agg`; `merge(how=..., validate=...)` to catch accidental many-to-many joins; `pivot_table` and `melt`; integer columns holding None become float64 |
| Performance and memory: dtypes, chunking and Copy-on-Write | Smaller dtypes, categorical columns and chunked reads. In pandas 3, Copy-on-Write is the only mode and chained assignment never updates the original: always use `.loc` |

### 5.3 Machine learning with scikit-learn and PyTorch (24%)

| Lesson | Master this |
|---|---|
| The scikit-learn workflow: splits, pipelines, cross-validation and honest metrics | Split first; never `fit` on test data; put preprocessing inside a Pipeline. The docs' demo of feature selection on all the data scores 0.76 on random data; done correctly it scores about 0.5. Pass an integer `random_state` to splitters |
| PyTorch tensors, devices, autograd and the computational graph | Gradients accumulate: calling `(3*w).backward()` twice gives `w.grad == 6`. Device selection with `torch.accelerator`. `requires_grad`, leaf tensors, `.detach()` |
| nn.Module, losses, optimisers and a correct training loop | `model.train()` → forward → loss → `backward()` → `step()` → `zero_grad()` once per iteration. `model.eval()` and `torch.no_grad()` for evaluation. `CrossEntropyLoss` takes logits |
| Datasets and DataLoaders: batching, shuffling and padding | `Dataset` with `__len__` and `__getitem__`; `shuffle=True` for training only; `pad_sequence` plus a padding mask for variable-length sequences |
| Embeddings, scaled dot-product attention and a tiny transformer block from scratch | `nn.Embedding`, attention by hand, causal masking, matching `F.scaled_dot_product_attention`, then a pre-norm block with residuals and an MLP |

**The mask trap:** in `F.scaled_dot_product_attention`, a boolean `attn_mask` value of True means "takes part in attention". In `nn.MultiheadAttention`, True in `key_padding_mask` means "ignore", and a boolean `attn_mask` value of True means "not allowed to attend". `nn.MultiheadAttention` also defaults to `batch_first=False`. Setting both `attn_mask` and `is_causal` in SDPA is an error.

### 5.4 Building LLM applications in Python (20%)

| Lesson | Master this |
|---|---|
| Calling LLM APIs from Python: SDK clients, keys, timeouts and errors | Keys from environment variables, never in code. The Anthropic SDK reads `ANTHROPIC_API_KEY`, retries twice by default (connection errors, 408, 409, 429 and 5xx) and has a 10-minute default timeout. OpenAI's quickstart centres on the Responses API |
| Concurrency with asyncio: gather, Semaphore, timeouts and cancellation | `gather` returns results in input order. With `return_exceptions=False` the first exception propagates but the other awaitables are not cancelled. `TaskGroup` (3.11+) cancels the rest on first failure. Keep references to tasks you create. Bound concurrency with `async with sem:` |
| Streaming, retries with backoff and jitter, and rate limits | Exponential backoff with random jitter; treat `Retry-After` as a minimum wait; failed requests still count towards per-minute limits |
| Structured output and tool-calling loops | JSON Schema from Pydantic; validate everything the schema cannot express. The tool loop: send tools, get `stop_reason == "tool_use"`, append the assistant content, append a `tool_result` with the matching `tool_use_id`, repeat with a turn cap |
| Embeddings, cosine similarity and a minimal RAG pipeline | Chunk, embed, normalise, search by dot product, assemble the prompt with sources. OpenAI and Voyage embeddings come back normalised to length 1, so the dot product is the cosine. Anthropic has no embedding model of its own and points to Voyage AI |

### 5.5 Testing, performance and reproducibility (12%)

| Lesson | Master this |
|---|---|
| Testing AI code with pytest and mocks | Fixture scopes and yield teardown; `conftest.py`; `parametrize`; `monkeypatch`; mock the LLM client so tests are fast, free and deterministic |
| Logging, debugging, profiling and concurrency | `logging` instead of print; `pdb`; profiling before optimising. Threads vs processes vs asyncio and the GIL. Free-threaded CPython exists since 3.13, but the default build still has the GIL |
| Reproducibility and notebook-to-module hygiene | Seed `random`, NumPy and torch; `torch.use_deterministic_algorithms(True)`; seeded DataLoader workers. PyTorch does not guarantee identical results across releases or platforms. Move notebook code into importable, tested modules with pinned dependencies |

---

## 6. Derive it yourself

A strong engineer should be able to do each of these on a whiteboard, without notes, and then check it in Python. Tick them off as you go.

1. **Cosine similarity and normalisation.** Show that if a and b are unit vectors, $$a\cdot b=\cos\theta$$. Explain why a vector index stores normalised embeddings and searches by inner product.
2. **Projection.** Derive the projection of v onto u, $$\frac{v\cdot u}{u\cdot u}u$$, by requiring the residual to be orthogonal to u. Project (3, 1) onto (1, 1) and get (2, 2).
3. **Broadcasting rules.** Given two shapes, say whether they broadcast and what the result shape is: `(3,1)` and `(1,4)` gives `(3,4)`; `(4,3)` and `(4,)` fails; `(8,1,6,1)` and `(7,1,5)` gives `(8,7,6,5)`.
4. **Attention shapes.** With Q of shape (B, h, T, d_k): scores QKᵀ are (B, h, T, T), the softmax runs over the last axis, the output is (B, h, T, d_v), and concatenating heads gives (B, T, h·d_v) before W^O. Say where the causal mask goes and why it uses −inf.
5. **Why divide by √d_k.** Show that the dot product of two vectors with independent mean-0, variance-1 components has variance d_k, and what that does to the softmax.
6. **The softmax gradient.** Derive $$\frac{\partial p_i}{\partial z_j}=p_i(\delta_{ij}-p_j)$$, then show that softmax plus cross-entropy with a one-hot target y has the gradient $$\frac{\partial L}{\partial z}=p-y$$.
7. **The log-sum-exp trick.** Show that subtracting max(z) from every logit leaves the softmax unchanged, and why it prevents overflow.
8. **Backprop by hand.** Draw the graph for $$y=(3x^2+1)^2$$, run the backward pass at x = 2 and get 312. Derive the logistic-loss gradient $$(\sigma(z)-1)x$$.
9. **The learning-rate limit.** For a quadratic with curvature λ, show that gradient descent multiplies the error by (1 − lr·λ) each step, so it diverges when lr > 2/λ. Link this to warmup and to ill-conditioned Hessians.
10. **Why Adam needs bias correction.** The moments start at zero, so after one step $$m_1=(1-\beta_1)g_1$$, which is 10x too small with β1 = 0.9. Show that dividing by $$1-\beta_1^t$$ removes the bias, and that the first corrected step moves each parameter by about lr whatever the gradient size.
11. **AdamW vs L2.** Explain why adding λθ to the gradient is the same as weight decay for SGD but not for Adam, where the term gets divided by √v̂. AdamW applies $$\theta\leftarrow\theta-\gamma\lambda\theta$$ directly.
12. **Bayes with base rates.** Compute the 16.67% posterior for the 1% / 99% / 5% example from the counts in 10,000 people.
13. **MLE is minimising NLL.** Show that maximising the product of probabilities is minimising the mean negative log-probability, which for a categorical model is the cross-entropy loss used to train every LLM.
14. **Cross-entropy = entropy + KL.** Derive $$H(p,q)=H(p)+D_{KL}(p\parallel q)$$ and explain why minimising cross-entropy against fixed data minimises the KL. Check with p = (0.5, 0.25, 0.25), q = (0.25, 0.5, 0.25): 1.75 = 1.5 + 0.25 bits.
15. **Perplexity and the starting loss.** Show that a uniform guess over V tokens has cross-entropy ln V and perplexity V. Explain why a fresh model with V = 50,000 should start near 10.82 nats, and what it means if it does not.
16. **The standard error of an eval difference.** Derive the SE of an accuracy, $$\sqrt{p(1-p)/n}$$, and of a difference between two independent accuracies. Show that 0.80 vs 0.83 on 1,000 items each gives z ≈ 1.73 and p ≈ 0.084: not significant at 0.05. Explain why two models on the same items call for a paired test.
17. **Parameter count.** Derive about $$12\,n_{layer}\,d_{model}^2$$ non-embedding parameters: 4d² for Q, K, V and O, plus 8d² for an MLP with d_ff = 4d. For d = 4096 and 32 layers that is 6.44B.
18. **6ND training FLOPs.** A matmul costs 2 FLOPs per parameter per token forward (multiply and add), and the backward pass costs about twice the forward, so training is about 6N per token. Compute Chinchilla's budget: 6 × 70e9 × 1.4e12 ≈ 5.9e23 FLOPs.
19. **KV-cache memory.** Derive bytes = 2 (K and V) × layers × KV heads × head dim × sequence length × batch × bytes per value. Show that a Llama-2-7B-style config (32 layers, 32 heads, head dim 128, bf16) needs 0.5 MiB per token and 2 GiB at 4k tokens, and how GQA with 8 KV heads cuts a 70B-style config from 10 GiB to 1.25 GiB.
20. **Weights, training memory and numeric formats.** 7B weights are 28 GB in fp32, 14 GB in bf16, 7 GB in int8, 3.5 GB in int4. Mixed-precision Adam at an assumed 16 bytes per parameter (excluding activations) needs 112 GB. Explain fp16 vs bf16 (range vs precision) and why absmax int8 has a worst-case error of scale/2.
21. **A correct PyTorch training loop.** Write it from memory, including `model.train()`, `zero_grad`, `backward`, `step`, and an eval loop with `model.eval()` and `torch.no_grad()`. Say what breaks if you forget each line.

The loop for item 21:

```python
import torch
from torch import nn

device = torch.accelerator.current_accelerator().type if torch.accelerator.is_available() else "cpu"
model = MyModel().to(device)
loss_fn = nn.CrossEntropyLoss()                       # takes raw logits
opt = torch.optim.AdamW(model.parameters(), lr=3e-4)  # weight_decay defaults to 0.01

def train_one_epoch(loader):
    model.train()                                     # dropout and norm layers in training mode
    for X, y in loader:
        X, y = X.to(device), y.to(device)
        logits = model(X)
        loss = loss_fn(logits, y)
        opt.zero_grad()                               # gradients accumulate otherwise
        loss.backward()
        torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
        opt.step()

@torch.no_grad()                                      # no graph, less memory
def evaluate(loader):
    model.eval()
    correct = total = 0
    for X, y in loader:
        X, y = X.to(device), y.to(device)
        correct += (model(X).argmax(-1) == y).sum().item()
        total += y.numel()
    return correct / total
```

The official tutorial calls `zero_grad()` after `step()`. Either order is correct as long as it happens once per iteration, before the next `backward()`.

---

## 7. Version notes

Library behaviour that changed recently. The course teaches current behaviour; older tutorials and answers will contradict it.

| Library | What changed |
|---|---|
| **pandas 3.0** (January 2026; 3.1.1 is current) | Copy-on-Write is the only mode. Chained assignment such as `df["a"][mask] = v` never updates `df`; use `.loc`. `SettingWithCopyWarning` was removed. `.to_numpy()` and `.values` can be read-only. `inplace=True` on a column selection no longer updates the frame. The default string dtype is `str`. Strings parse to `datetime64[us]`. Offset aliases `M`, `Q`, `Y` became `ME`, `QE`, `YE`. Requires Python 3.11+. pandas 2.x still updates through chained assignment with a FutureWarning |
| **PyTorch** | `AdamW` defaults: lr 0.001, betas (0.9, 0.999), eps 1e-8, **weight_decay 0.01**. `Adam` defaults to weight_decay 0 and has `decoupled_weight_decay=False`; setting it True makes Adam behave like AdamW. `zero_grad` defaults to `set_to_none=True`. `torch.nn.RMSNorm` is built in and `LayerNorm` has a `bias` argument. SDPA has `enable_gqa` and a keyword-only `scale`. `torch.cuda.amp.autocast` is deprecated; use `torch.autocast(device_type=...)`. The canonical device check uses `torch.accelerator` |
| **NumPy 2** | `np.array(x, copy=False)` raises if a copy is needed; use `np.asarray`. Scalar reprs show the type, `np.float64(1.5)`, though `print` still shows `1.5`. NEP 50 promotion: a float32 array plus a Python float stays float32 |
| **scikit-learn 1.8+** | `LogisticRegression(penalty=...)` is deprecated in favour of `l1_ratio` and `C`; `n_jobs` is deprecated; `multi_class` was removed |
| **Python** | 3.15 is current (lazy imports, UTF-8 default I/O encoding, built-in `frozendict`, the `profiling` package). `TaskGroup`, `asyncio.timeout` and `except*` need 3.11+. `X \| None` needs 3.10+. PEP 695 generics need 3.12+ |
| **Pydantic** | Docs moved to pydantic.dev. Use v2 methods only |
| **LLM APIs** | On Anthropic API version 2026-10-21, `temperature`, `top_p` and `top_k` return a 400 error, so deterministic evals cannot rely on `temperature=0`. Use fixed eval sets, pinned model IDs and SDK versions, cached responses and seeds for local code. Structured outputs on Anthropic are GA under `output_config.format`. OpenAI's quickstart uses the Responses API. Model names change often; treat them as placeholders |

---

## 8. Capstone projects

Each project joins the two courses: derive the math, implement it, then check it against a library or a known number.

### Project A: Attention and a tiny GPT from scratch

**Goal:** understand every tensor in a decoder-only transformer by building one twice.

- In NumPy, write `softmax` with the max-subtraction trick, then single-head causal attention with explicit shape comments. Add multi-head attention by reshaping `(B, T, d_model)` to `(B, h, T, d_k)`.
- Add sinusoidal positions, a pre-norm block (LayerNorm or RMSNorm, attention, residual, MLP, residual) and a tied output head.
- Port it to PyTorch with `nn.Embedding`, `nn.Linear` and your own attention. Assert that your attention matches `F.scaled_dot_product_attention(q, k, v, is_causal=True)` to within 1e-5.
- Count parameters by hand with the 12·n_layer·d_model² rule, then compare with `sum(p.numel() for p in model.parameters())` and explain the gap (embeddings, norms, biases).
- Train it at character level on a small text with AdamW, warmup and gradient clipping, using the training loop from section 6. Sample with temperature and top-p.

**Done when:** the initial loss is within a few percent of ln V, your attention matches SDPA, your parameter count matches PyTorch's after accounting for embeddings, and the loss falls steadily without spikes.

### Project B: A RAG pipeline with your own cosine search

**Goal:** build retrieval without a vector database, so you know exactly what one does.

- Chunk a set of documents (for example, a few official library docs pages saved locally) with overlap.
- Embed the chunks with a provider SDK, reading the key from the environment. Cache the vectors to disk so reruns are free.
- L2-normalise once, store an `(n_chunks, dim)` matrix, and search with one matmul plus `np.argpartition` for the top k. Verify that the dot product equals cosine similarity on your normalised vectors.
- Embed queries concurrently with `asyncio` and a `Semaphore`, with retries using exponential backoff and jitter.
- Assemble the prompt with numbered sources and ask the model to cite them. Write a 20-question eval set with the chunk that should be retrieved for each.
- Mock the embedding and LLM clients in pytest so the test suite runs offline.

**Done when:** top-5 retrieval hits the right chunk on most of the eval set, your search returns the same ranking as a brute-force cosine loop, and `pytest` passes with no network access.

### Project C: The eval-significance notebook

**Goal:** be able to say, with numbers, whether one model or prompt is really better than another.

- Write functions for the SE of an accuracy, a 95% CI, and a two-proportion z-test. Check that 0.80 vs 0.83 on 1,000 items each gives z ≈ 1.73 and p ≈ 0.084.
- Simulate: draw two models with the same true accuracy many times and count how often the test says "significant". It should be about 5%.
- Add a paired comparison for two models scored on the same items: count the items where only A is right and only B is right, and test that disagreement.
- Show the multiple-comparisons problem: run 20 prompt variants with no real difference and count false wins, then apply Bonferroni (α = 0.0025).
- Add a bootstrap CI over items and compare it with the normal-approximation CI.
- Turn the core functions into a tested module rather than leaving them in notebook cells.

**Done when:** the notebook prints a one-line verdict ("B is better by X points, 95% CI [lo, hi], p = …") for any two score files, and the simulated false-positive rate is close to α.

### Project D: GPU memory and cost calculator

**Goal:** answer "what hardware do we need and what will it cost" in a design review, with stated assumptions.

- Inputs: parameter count or a config (layers, d_model, heads, KV heads, head dim, d_ff, vocab), dtype, sequence length, batch size, tokens to train on.
- Outputs: weight memory per dtype (fp32, bf16, int8, int4); training memory at an assumed 16 bytes per parameter for mixed-precision Adam, excluding activations; KV-cache memory per token and at full context; training FLOPs as 6ND and inference FLOPs as 2N per token.
- Convert FLOPs into GPU-hours and cost from user-supplied assumptions: peak FLOP/s per GPU, a utilisation fraction and a price per GPU-hour. Never hard-code hardware specs.
- Test it against the known numbers: 7B is 14 GB in bf16 and 112 GB for training at 16 B/param; the Llama-2-7B-style KV cache is 0.5 MiB per token; a 70B-style config with GQA is 1.25 GiB at 4k tokens; Chinchilla is about 5.9e23 FLOPs.
- Add a parameter counter that reproduces 6.44B for d = 4096 with 32 layers (standard MLP) and about 6.74B for a Llama-7B-style config (SwiGLU, d_ff 11008, V 32000, untied embeddings).

**Done when:** every output line shows its formula and assumptions, the pytest suite reproduces all the known numbers above, and you can explain each number out loud.

### Project E: Optimisers and numerics lab

**Goal:** see training instability and numeric error happen, and fix them.

- Implement SGD, momentum, Adam and AdamW in NumPy. Check each against `torch.optim` for a few steps on the same tensors, including Adam's first step (p = 1.0, lr = 0.1, any gradient gives 0.9) and AdamW's decay with zero gradient (1.0 → 0.999).
- Run gradient descent on f = x² at lr 0.1, 0.9 and 1.1 and plot the three behaviours. Repeat on $$x^2+3y^2$$ and find the largest stable learning rate.
- Show fp16 and bf16 failure modes: 70000 overflowing in fp16, 1 + 0.003 = 1 in bf16, 2049 rounding to 2048 in fp16.
- Quantise a weight matrix to int8 with absmax scaling, dequantise it, and confirm the error never exceeds scale/2. Measure the effect on a matmul output.

**Done when:** your optimisers match PyTorch to within 1e-6, and you can explain each failure with the formula behind it.

---

## 9. Study schedules

Both schedules interleave the courses so that you learn an idea as math and implement it in the same week.

### Both courses in 4 weeks (about 1.5–2 hours/day)

| Week | MATH-AI | PY-AI | Build |
|---|---|---|---|
| 1 | Domain 1 (all five lessons); Domain 2: Derivatives; Chain rule | Domain 1 (all five lessons); Domain 2: ndarrays; Broadcasting; Linear algebra in NumPy | Derivations 1–3 and 8. Start Project A in NumPy (softmax, attention) |
| 2 | Domain 2: Jacobians; Optimisers; Loss landscapes. Domain 4 (all four lessons) | Domain 2: pandas; Performance and memory. Domain 3: scikit-learn; PyTorch tensors; nn.Module and the training loop | Derivations 6, 7, 9–11, 13–15, 21. Project E |
| 3 | Domain 5 (all five lessons) | Domain 3: Datasets and DataLoaders; Embeddings and attention from scratch. Domain 5 (all three lessons) | Derivations 4, 5, 17–20. Finish Project A in PyTorch. Project D. Smart practice on MATH-AI domains 1, 2, 4 and 5 |
| 4 | Domain 3 (all five lessons) | Domain 4 (all five lessons) | Derivations 12 and 16. Projects B and C. **Practice test #1** for both courses, Mistakes notebook to zero, then **practice test #2** for both |

### Both courses in 8 weeks (about 1 hour/day)

| Week | MATH-AI | PY-AI | Build |
|---|---|---|---|
| 1 | Vectors, norms, dot products and cosine similarity; Matrices as linear maps and shape reasoning; Tensors and broadcasting | The Python data model; Comprehensions, iterators, generators and itertools; Functions | Derivations 1 and 3 |
| 2 | Transpose, inverse, rank, independence and projections; Eigenvectors, SVD, PCA and why LoRA works | Classes, dataclasses, protocols, type hints and Pydantic; Exceptions, context managers, environments and packaging; ndarrays; Broadcasting, vectorisation and einsum | Derivation 2. Reproduce a truncated SVD and its error in NumPy |
| 3 | Derivatives, partial derivatives and gradients; Chain rule and backprop by hand; Jacobians, Hessians and curvature | Linear algebra in NumPy; PyTorch tensors, devices, autograd and the computational graph | Derivations 6 and 8. Check your hand gradients against autograd |
| 4 | Optimisers; Loss landscapes | nn.Module, losses, optimisers and a correct training loop; Datasets and DataLoaders | Derivations 9–11 and 21. Project E |
| 5 | Logits, softmax, sigmoid and the log-sum-exp trick; Entropy, cross-entropy, KL divergence and perplexity; Decoding; Losses and metrics | pandas DataFrames; Performance and memory; The scikit-learn workflow | Derivations 7, 13–15. Smart practice on MATH-AI domains 1, 2 and 4 |
| 6 | Tokens, embeddings and positional information; Scaled dot-product attention; The transformer block | Embeddings, scaled dot-product attention and a tiny transformer block from scratch | Derivations 4, 5 and 17. Project A, NumPy then PyTorch |
| 7 | Compute and memory arithmetic; Numerics | Calling LLM APIs; Concurrency with asyncio; Streaming, retries and rate limits; Structured output and tool-calling loops; Embeddings and a minimal RAG pipeline | Derivations 18–20. Projects D and B |
| 8 | Domain 3: all five probability and statistics lessons | Testing AI code with pytest and mocks; Logging, debugging, profiling and concurrency; Reproducibility and notebook-to-module hygiene | Derivations 12 and 16. Project C. **Practice test #1** for both courses, Mistakes notebook to zero, then **practice test #2** for both |

---

## 10. Cheat sheets

### Linear algebra

- Cosine similarity: $$\cos\theta=\frac{a\cdot b}{\lVert a\rVert\,\lVert b\rVert}$$
- L2 norm: $$\lVert a\rVert_2=\sqrt{\textstyle\sum_i a_i^2}$$
- Projection of v onto u: $$\mathrm{proj}_u v=\frac{v\cdot u}{u\cdot u}\,u$$
- SVD: $$A=U\Sigma V^\top$$; best rank-k error in Frobenius norm $$\sqrt{\sum_{i>k}\sigma_i^2}$$, in spectral norm $$\sigma_{k+1}$$
- LoRA: $$h=W_0x+\frac{\alpha}{r}BAx$$, trainable parameters r(d + k) instead of dk
- Broadcasting: align from the right; each pair of dimensions must be equal or contain a 1

### Calculus and optimisation

- Chain rule: $$\frac{dy}{dx}=\frac{dy}{du}\frac{du}{dx}$$
- Sigmoid derivative: $$\sigma'(z)=\sigma(z)(1-\sigma(z))$$
- Softmax Jacobian: $$\frac{\partial p_i}{\partial z_j}=p_i(\delta_{ij}-p_j)$$; softmax plus cross-entropy: $$\nabla_z L=p-y$$
- Gradient descent: $$\theta\leftarrow\theta-\eta\nabla_\theta L$$; on a quadratic with curvature λ it diverges when $$\eta>2/\lambda$$
- Adam moments: $$m_t=\beta_1m_{t-1}+(1-\beta_1)g_t$$ and $$v_t=\beta_2v_{t-1}+(1-\beta_2)g_t^2$$
- Bias correction: $$\hat m_t=\frac{m_t}{1-\beta_1^t}$$ and $$\hat v_t=\frac{v_t}{1-\beta_2^t}$$
- Adam update: $$\theta_t=\theta_{t-1}-\gamma\frac{\hat m_t}{\sqrt{\hat v_t}+\epsilon}$$; AdamW also applies $$\theta\leftarrow\theta-\gamma\lambda\theta$$
- Transformer schedule: $$lr=d_{model}^{-0.5}\min\left(step^{-0.5},\ step\cdot warmup^{-1.5}\right)$$

### Probability and statistics

- Bayes: $$P(A\mid B)=\frac{P(B\mid A)P(A)}{P(B)}$$
- Standard error of a mean: $$SE=\frac{\sigma}{\sqrt n}$$; of an accuracy: $$SE=\sqrt{\frac{p(1-p)}{n}}$$
- 95% CI: $$\hat p\pm1.96\,SE$$
- Two-proportion z-test (pooled): $$z=\frac{\hat p_2-\hat p_1}{\sqrt{\bar p(1-\bar p)\left(\frac1{n_1}+\frac1{n_2}\right)}}$$
- Chance of at least one false positive in m independent tests: $$1-(1-\alpha)^m$$; Bonferroni threshold $$\alpha/m$$
- Variance: NumPy defaults to ddof = 0; pandas and torch default to ddof = 1

### Information theory and decoding

- Softmax: $$\mathrm{softmax}(z)_i=\frac{e^{z_i}}{\sum_j e^{z_j}}$$
- Log-sum-exp: $$\log\sum_j e^{z_j}=m+\log\sum_j e^{z_j-m}$$ with $$m=\max_j z_j$$
- Sigmoid: $$\sigma(z)=\frac{1}{1+e^{-z}}$$
- Entropy: $$H(p)=-\sum_i p_i\log p_i$$
- Cross-entropy: $$H(p,q)=-\sum_i p_i\log q_i=H(p)+D_{KL}(p\parallel q)$$
- KL divergence: $$D_{KL}(p\parallel q)=\sum_i p_i\log\frac{p_i}{q_i}\ge0$$, asymmetric
- Perplexity: $$\mathrm{PPL}=\exp\left(-\frac1t\sum_{i=1}^{t}\log p_\theta(x_i\mid x_{<i})\right)$$; it depends on the tokenizer
- Temperature: $$p_i=\frac{e^{z_i/T}}{\sum_j e^{z_j/T}}$$; greedy is the limit T → 0
- F1: $$F_1=\frac{2PR}{P+R}$$

### Transformers and LLMs

- Attention: $$\mathrm{Attention}(Q,K,V)=\mathrm{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V$$
- Multi-head: $$\mathrm{MultiHead}=\mathrm{Concat}(head_1,\dots,head_h)W^O$$
- Sinusoidal positions: $$PE_{(pos,2i)}=\sin\left(pos/10000^{2i/d}\right)$$ and $$PE_{(pos,2i+1)}=\cos\left(pos/10000^{2i/d}\right)$$
- Non-embedding parameters: $$N\approx12\,n_{layer}\,d_{model}^2$$
- Compute: about $$2N$$ FLOPs per token forward; training $$C\approx6ND$$
- Chinchilla loss fit: $$L(N,D)=E+\frac{A}{N^{\alpha}}+\frac{B}{D^{\beta}}$$ with E = 1.69, A = 406.4, B = 410.7, α = 0.34, β = 0.28
- KV cache: $$\text{bytes}=2\cdot n_{layers}\cdot n_{kv\,heads}\cdot d_{head}\cdot \text{seq}\cdot \text{batch}\cdot \text{bytes per value}$$
- Absmax int8: $$s=\frac{\max_i|w_i|}{127}$$, $$q_i=\mathrm{round}(w_i/s)$$, worst-case error $$s/2$$

### Numbers worth memorising

| Quantity | Value |
|---|---|
| fp16 max / machine epsilon | 65504 / 0.000977 |
| bf16 max / machine epsilon | about 3.39e38 / 0.0078 |
| fp32 max / machine epsilon | about 3.40e38 / 1.19e-7 |
| 7B weights in fp32 / bf16 / int8 / int4 | 28 / 14 / 7 / 3.5 GB |
| 7B mixed-precision Adam training (16 B/param assumption, no activations) | 112 GB |
| Llama-2-7B-style KV cache, bf16 | 0.5 MiB per token, 2 GiB at 4k tokens |
| Llama-2-70B-style KV cache with GQA (8 KV heads), bf16 | 1.25 GiB at 4k tokens (10 GiB with 64 KV heads) |
| Chinchilla | 70B parameters, 1.4T tokens, about 5.9e23 FLOPs, about 20 tokens per parameter |
| Kaplan exponent for compute-optimal model size | N_opt grows as about C^0.73 (Chinchilla: about 0.5) |
| Uniform-guess loss with V = 50,000 | ln 50000 = 10.82 nats |
| Loss 2.0 nats | perplexity e² = 7.39, 2.885 bits per token |
| Original transformer base | 6 layers, d_model 512, d_ff 2048, 8 heads, about 65M parameters |

The Llama-2 layer and head counts above are the public model configs, used here as stated assumptions; the Llama 2 paper itself confirms only which sizes use GQA.

### Python and PyTorch one-liners

| Task | Code |
|---|---|
| Seeded randomness | `rng = np.random.default_rng(0)` |
| Row-normalise embeddings | `E / np.linalg.norm(E, axis=1, keepdims=True)` |
| Top-k by cosine | `idx = np.argpartition(-(E @ q), k)[:k]` |
| Stable softmax | `z = z - z.max(-1, keepdims=True); np.exp(z) / np.exp(z).sum(-1, keepdims=True)` |
| Attention scores | `np.einsum('bhqd,bhkd->bhqk', q, k) / np.sqrt(d_k)` |
| Causal mask (PyTorch, additive) | `torch.triu(torch.full((T, T), float('-inf')), diagonal=1)` |
| Reference attention | `F.scaled_dot_product_attention(q, k, v, is_causal=True)` |
| Device | `torch.accelerator.current_accelerator().type if torch.accelerator.is_available() else "cpu"` |
| Count parameters | `sum(p.numel() for p in model.parameters())` |
| Safe pandas update (pandas 3) | `df.loc[mask, "a"] = v` |
| Bounded concurrency | `async with sem: return await call(x)` |
| Deterministic PyTorch | `torch.manual_seed(0); torch.use_deterministic_algorithms(True)` |

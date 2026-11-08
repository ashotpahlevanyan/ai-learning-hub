/** Curated books, free online books, courses, papers and guides that go deeper than the exam material. */
export interface LibraryItem {
  title: string;
  by: string;
  url: string;
  kind: 'Book' | 'Free book' | 'Course' | 'Paper' | 'Guide';
  topic: Topic;
  /** Track ids whose pages list this item. */
  tracks: string[];
  why: string;
  /** Which parts to read first. */
  read?: string;
  /** One of the few best places to begin in its topic. */
  start?: boolean;
}

export const topics = [
  { id: 'math', name: 'Mathematics for AI', blurb: 'Linear algebra, calculus, probability, information theory and optimisation: the language every model is written in.' },
  { id: 'python', name: 'Python and data tools', blurb: 'Write idiomatic Python and use NumPy, pandas and PyTorch fluently.' },
  { id: 'ml', name: 'Machine learning and deep learning', blurb: 'From linear models to neural networks, with the theory to know why they work.' },
  { id: 'llm', name: 'LLMs and transformers', blurb: 'How large language models are built, trained, aligned and scaled.' },
  { id: 'apps', name: 'Building LLM apps and agents', blurb: 'Prompting, RAG, tools, agents, evaluation and production patterns.' },
  { id: 'mlops', name: 'ML engineering and MLOps', blurb: 'Data, pipelines, deployment, monitoring and the system design questions every ML exam asks.' },
  { id: 'official', name: 'Official exam training', blurb: 'Free training paths from the exam providers themselves, aligned to each exam’s skills outline.' },
  { id: 'safety', name: 'Responsible AI and security', blurb: 'Risk frameworks, LLM security and alignment research behind the responsible-AI exam domains.' },
] as const;
export type Topic = typeof topics[number]['id'];

const ALL = ['claude', 'gemini', 'openai', 'aws', 'azure', 'foundations'];
const CLOUD = ['gemini', 'aws', 'azure'];

export const library: LibraryItem[] = [
  // Mathematics
  { title: 'Mathematics for Machine Learning', by: 'Deisenroth, Faisal and Ong', url: 'https://mml-book.github.io/', kind: 'Free book', topic: 'math', tracks: ['foundations'], start: true,
    why: 'The one book that covers exactly the math ML needs, written for ML: vectors, matrices, matrix calculus, probability and optimisation, then PCA, regression and SVMs built from them.', read: 'Part I (chapters 2–7) first; Part II as worked applications.' },
  { title: 'Essence of Linear Algebra', by: '3Blue1Brown (Grant Sanderson)', url: 'https://www.3blue1brown.com/lessons/vectors', kind: 'Course', topic: 'math', tracks: ['foundations'], start: true,
    why: 'Short animated lessons (start with Vectors and follow the series) that make matrices, determinants, eigenvectors and change of basis visual. The fastest way to build intuition before the formal books.', read: 'All chapters, in order; then the neural networks series.' },
  { title: 'MIT 18.06 Linear Algebra', by: 'Gilbert Strang, MIT OpenCourseWare', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/', kind: 'Course', topic: 'math', tracks: ['foundations'],
    why: 'The classic linear algebra course with lectures, problem sets and exams. Strang’s view (column space, four fundamental subspaces, SVD) is the one ML uses.', read: 'Lectures 1–10, 14–17 and 21–30 (eigenvalues, SVD).' },
  { title: 'Linear Algebra Done Right', by: 'Sheldon Axler', url: 'https://linear.axler.net/', kind: 'Free book', topic: 'math', tracks: ['foundations'],
    why: 'A rigorous, proof-based treatment for when you want to really own the subject. The 4th edition is free and open access.', read: 'Chapters 1–3, 5 and 7 (spectral theorem, SVD).' },
  { title: 'The Matrix Calculus You Need for Deep Learning', by: 'Terence Parr and Jeremy Howard', url: 'https://explained.ai/matrix-calculus/', kind: 'Guide', topic: 'math', tracks: ['foundations'],
    why: 'Derives Jacobians, the vector chain rule and the gradients behind backprop step by step. Read it once and gradient formulas stop being magic.' },
  { title: 'Information Theory, Inference, and Learning Algorithms', by: 'David MacKay', url: 'https://www.inference.org.uk/itila/book.html', kind: 'Free book', topic: 'math', tracks: ['foundations'],
    why: 'Entropy, KL divergence, compression and Bayesian inference explained by a master. The basis of cross-entropy loss and perplexity.', read: 'Chapters 1–2, 4–6 and 28–29.' },
  { title: 'Convex Optimization', by: 'Stephen Boyd and Lieven Vandenberghe', url: 'https://web.stanford.edu/~boyd/cvxbook/', kind: 'Free book', topic: 'math', tracks: ['foundations'],
    why: 'The standard reference on optimisation: convexity, duality, gradient and Newton methods. Deeper than you need for exams, ideal for confidence.', read: 'Chapters 2–5 and 9.' },

  // Python and data tools
  { title: 'Fluent Python (2nd edition)', by: 'Luciano Ramalho', url: 'https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/', kind: 'Book', topic: 'python', tracks: ['foundations'], start: true,
    why: 'The book that turns a Python user into a Python expert: the data model, iterators and generators, decorators, typing and concurrency.', read: 'Parts I–III, then the asyncio chapter.' },
  { title: 'Python for Data Analysis (3rd edition)', by: 'Wes McKinney', url: 'https://wesmckinney.com/book/', kind: 'Free book', topic: 'python', tracks: ['foundations'],
    why: 'Written by the creator of pandas, free online. NumPy basics, pandas indexing, groupby, joins, time series and data cleaning.', read: 'Chapters 4–10.' },
  { title: 'Python Data Science Handbook', by: 'Jake VanderPlas', url: 'https://jakevdp.github.io/PythonDataScienceHandbook/', kind: 'Free book', topic: 'python', tracks: ['foundations'],
    why: 'Free notebooks covering IPython, NumPy, pandas, Matplotlib and scikit-learn with runnable examples.', read: 'Chapters 2 (NumPy) and 5 (machine learning).' },
  { title: 'The Python Tutorial', by: 'Python Software Foundation', url: 'https://docs.python.org/3/tutorial/', kind: 'Guide', topic: 'python', tracks: ['foundations'],
    why: 'The official tour of the language. Short, accurate and always current.' },
  { title: 'From Python to NumPy', by: 'Nicolas Rougier', url: 'https://github.com/rougier/from-python-to-numpy', kind: 'Free book', topic: 'python', tracks: ['foundations'],
    why: 'Teaches vectorised thinking: how to replace Python loops with array operations, with real speed comparisons.' },
  { title: 'PyTorch tutorials', by: 'PyTorch', url: 'https://pytorch.org/tutorials/', kind: 'Guide', topic: 'python', tracks: ['foundations'],
    why: 'Official tutorials from tensors and autograd to training loops, mixed precision and distributed training.', read: 'Learn the Basics, then Deep Learning with PyTorch: A 60 Minute Blitz.' },
  { title: 'Architecture Patterns with Python', by: 'Harry Percival and Bob Gregory', url: 'https://www.cosmicpython.com/', kind: 'Free book', topic: 'python', tracks: ['foundations'],
    why: 'How to structure real Python applications with testing, dependency inversion and clean boundaries, which matters once LLM code leaves the notebook.' },

  // Machine learning and deep learning
  { title: 'Dive into Deep Learning', by: 'Zhang, Lipton, Li and Smola', url: 'https://d2l.ai/', kind: 'Free book', topic: 'ml', tracks: ['foundations'], start: true,
    why: 'An interactive book where every concept comes with runnable PyTorch code, from linear regression to transformers and large-scale pretraining.', read: 'Chapters 2–5, 9–11 and the math appendix.' },
  { title: 'Neural Networks: Zero to Hero', by: 'Andrej Karpathy', url: 'https://karpathy.ai/zero-to-hero.html', kind: 'Course', topic: 'ml', tracks: ['foundations', 'claude', 'openai'], start: true,
    why: 'Video lectures that build backprop, a character model and then GPT from scratch in plain Python and PyTorch. The best way to truly understand LLMs.', read: 'All lectures in order; code along.' },
  { title: 'Understanding Deep Learning', by: 'Simon J. D. Prince', url: 'https://udlbook.github.io/udlbook/', kind: 'Free book', topic: 'ml', tracks: ['foundations'],
    why: 'A modern, beautifully illustrated textbook (2023) covering deep networks, transformers, diffusion models and why deep learning works.', read: 'Chapters 1–9 and 12 (transformers).' },
  { title: 'Deep Learning', by: 'Goodfellow, Bengio and Courville', url: 'https://www.deeplearningbook.org/', kind: 'Free book', topic: 'ml', tracks: ['foundations'],
    why: 'The foundational deep learning textbook. Part I is an excellent math refresher; Part II covers optimisation and regularisation in depth.', read: 'Chapters 2–8.' },
  { title: 'An Introduction to Statistical Learning (Python edition)', by: 'James, Witten, Hastie, Tibshirani and Taylor', url: 'https://www.statlearning.com/', kind: 'Free book', topic: 'ml', tracks: ['foundations', ...CLOUD],
    why: 'The clearest introduction to classic ML: regression, classification, resampling, trees, SVMs and unsupervised learning, with Python labs. Covers most of what cloud ML exams assume.', read: 'Chapters 2–6 and 8.' },
  { title: 'Probabilistic Machine Learning: An Introduction', by: 'Kevin P. Murphy', url: 'https://probml.github.io/pml-book/', kind: 'Free book', topic: 'ml', tracks: ['foundations'],
    why: 'A comprehensive, probabilistic view of ML. Use it as a reference when you want the full derivation.' },
  { title: 'Deep Learning: Foundations and Concepts', by: 'Christopher M. Bishop and Hugh Bishop', url: 'https://www.bishopbook.com/', kind: 'Book', topic: 'ml', tracks: ['foundations'],
    why: 'Bishop’s 2024 textbook, the successor to Pattern Recognition and Machine Learning, rebuilt around deep learning and transformers. Free to read online.' },
  { title: 'Practical Deep Learning for Coders', by: 'fast.ai (Jeremy Howard)', url: 'https://course.fast.ai/', kind: 'Course', topic: 'ml', tracks: ['foundations'],
    why: 'A top-down course: train working models in the first lesson, then dig into how they work.' },
  { title: 'Stanford CS229: Machine Learning', by: 'Stanford University', url: 'https://cs229.stanford.edu/', kind: 'Course', topic: 'ml', tracks: ['foundations'],
    why: 'Stanford’s main ML course. The lecture notes are a compact, rigorous treatment of supervised learning, generalisation and unsupervised methods.' },
  { title: 'Hands-On Machine Learning notebooks', by: 'Aurélien Géron', url: 'https://github.com/ageron/handson-ml3', kind: 'Guide', topic: 'ml', tracks: ['foundations', ...CLOUD],
    why: 'Free notebooks for the best-selling practical ML book: data prep, scikit-learn, training, evaluation and deep learning end to end.' },

  // LLMs and transformers
  { title: 'Attention Is All You Need', by: 'Vaswani et al. (2017)', url: 'https://arxiv.org/abs/1706.03762', kind: 'Paper', topic: 'llm', tracks: ['foundations', 'claude', 'openai', 'gemini'], start: true,
    why: 'The paper that introduced the transformer. Short and readable once you know matrix multiplication and softmax.' },
  { title: 'The Illustrated Transformer', by: 'Jay Alammar', url: 'https://jalammar.github.io/illustrated-transformer/', kind: 'Guide', topic: 'llm', tracks: ['foundations', 'claude', 'openai', 'gemini'],
    why: 'A visual walk through self-attention, multi-head attention and the encoder-decoder stack. Read it alongside the paper.' },
  { title: 'Build a Large Language Model (From Scratch)', by: 'Sebastian Raschka', url: 'https://www.manning.com/books/build-a-large-language-model-from-scratch', kind: 'Book', topic: 'llm', tracks: ['foundations'], start: true,
    why: 'Builds a GPT-style model step by step: tokenisation, attention, pretraining, then fine-tuning for classification and instructions. Code is free on GitHub.' },
  { title: 'Hands-On Large Language Models', by: 'Jay Alammar and Maarten Grootendorst', url: 'https://www.llm-book.com/', kind: 'Book', topic: 'llm', tracks: ['foundations', 'claude', 'openai', 'gemini'],
    why: 'A highly visual tour of tokens, embeddings, semantic search, RAG, fine-tuning and multimodal models with working code.' },
  { title: 'Speech and Language Processing (3rd edition draft)', by: 'Dan Jurafsky and James H. Martin', url: 'https://web.stanford.edu/~jurafsky/slp3/', kind: 'Free book', topic: 'llm', tracks: ['foundations'],
    why: 'The NLP textbook, kept current with chapters on transformers, LLMs, fine-tuning and RAG. Free draft online.', read: 'Chapters on embeddings, transformers and large language models.' },
  { title: 'Hugging Face LLM Course', by: 'Hugging Face', url: 'https://huggingface.co/learn/llm-course', kind: 'Course', topic: 'llm', tracks: ['foundations'],
    why: 'Free hands-on course on transformers, tokenizers, datasets, fine-tuning and reasoning models using the Hugging Face libraries.' },
  { title: 'Stanford CS336: Language Modeling from Scratch', by: 'Stanford University', url: 'https://stanford-cs336.github.io/', kind: 'Course', topic: 'llm', tracks: ['foundations'],
    why: 'Build every piece of an LLM yourself: tokenizer, transformer, training at scale, data, scaling laws and alignment. For when you want real depth.' },
  { title: 'Scaling Laws for Neural Language Models', by: 'Kaplan et al. (2020)', url: 'https://arxiv.org/abs/2001.08361', kind: 'Paper', topic: 'llm', tracks: ['foundations'],
    why: 'Shows loss falls as a power law in parameters, data and compute. Read with the Chinchilla paper to see how compute budgets are planned.' },
  { title: 'Training Compute-Optimal Large Language Models (Chinchilla)', by: 'Hoffmann et al. (2022)', url: 'https://arxiv.org/abs/2203.15556', kind: 'Paper', topic: 'llm', tracks: ['foundations'],
    why: 'Revised the scaling laws: train smaller models on far more tokens. The source of the “about 20 tokens per parameter” rule of thumb.' },
  { title: 'Training language models to follow instructions with human feedback', by: 'Ouyang et al. (2022)', url: 'https://arxiv.org/abs/2203.02155', kind: 'Paper', topic: 'llm', tracks: ['foundations', 'openai'],
    why: 'The InstructGPT paper: supervised fine-tuning plus RLHF. Explains why chat models behave so differently from base models.' },

  // Building LLM apps and agents
  { title: 'AI Engineering', by: 'Chip Huyen', url: 'https://www.oreilly.com/library/view/ai-engineering/9781098166298/', kind: 'Book', topic: 'apps', tracks: ['claude', 'openai', 'gemini', 'aws', 'azure'], start: true,
    why: 'The best single book on building applications with foundation models: evaluation, prompt engineering, RAG, agents, fine-tuning, inference optimisation and user feedback.', read: 'Chapters 3–4 (evaluation) and 6 (RAG and agents) first.' },
  { title: 'Building effective agents', by: 'Anthropic', url: 'https://www.anthropic.com/engineering/building-effective-agents', kind: 'Guide', topic: 'apps', tracks: ['claude', 'openai', 'gemini', 'aws', 'azure'], start: true,
    why: 'Workflows versus agents, and the core patterns (prompt chaining, routing, parallelisation, orchestrator-workers, evaluator-optimiser) with advice on when to use each.' },
  { title: 'Prompt engineering overview', by: 'Anthropic', url: 'https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview', kind: 'Guide', topic: 'apps', tracks: ['claude'],
    why: 'Official, practical prompting techniques: clarity, examples, XML structure, chain of thought, prefilling and long-context tips.' },
  { title: 'Anthropic courses', by: 'Anthropic', url: 'https://github.com/anthropics/courses', kind: 'Course', topic: 'apps', tracks: ['claude'],
    why: 'Free notebooks on the API, prompt engineering, real-world prompting, prompt evaluations and tool use.' },
  { title: 'OpenAI Cookbook', by: 'OpenAI', url: 'https://cookbook.openai.com/', kind: 'Guide', topic: 'apps', tracks: ['openai'],
    why: 'Runnable examples for function calling, structured outputs, embeddings, RAG, evals and agents.' },
  { title: 'Model Context Protocol', by: 'MCP project', url: 'https://modelcontextprotocol.io/', kind: 'Guide', topic: 'apps', tracks: ['claude', 'openai'],
    why: 'The open standard for connecting models to tools and data. Read the architecture and server concepts pages.' },
  { title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks', by: 'Lewis et al. (2020)', url: 'https://arxiv.org/abs/2005.11401', kind: 'Paper', topic: 'apps', tracks: ['foundations', 'aws', 'azure', 'gemini'],
    why: 'The original RAG paper. Useful background for every RAG question on the cloud exams.' },
  { title: 'ReAct: Synergizing Reasoning and Acting in Language Models', by: 'Yao et al. (2022)', url: 'https://arxiv.org/abs/2210.03629', kind: 'Paper', topic: 'apps', tracks: ['foundations', 'claude', 'openai'],
    why: 'Interleaving reasoning with tool calls: the loop most agents still run.' },
  { title: 'Generative AI on AWS', by: 'Chris Fregly, Antje Barth and Shelbee Eigenbrode', url: 'https://www.oreilly.com/library/view/generative-ai-on/9781098159214/', kind: 'Book', topic: 'apps', tracks: ['aws'],
    why: 'Foundation models, fine-tuning, RLHF, RAG and deployment with SageMaker AI and Bedrock, written by AWS specialists.' },

  // ML engineering and MLOps
  { title: 'Designing Machine Learning Systems', by: 'Chip Huyen', url: 'https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/', kind: 'Book', topic: 'mlops', tracks: CLOUD, start: true,
    why: 'Data engineering, feature engineering, training data, deployment, distribution shift, monitoring and continual learning. The thinking behind most MLOps exam questions.', read: 'Chapters 4–9.' },
  { title: 'Machine Learning Design Patterns', by: 'Lakshmanan, Robinson and Munn', url: 'https://www.oreilly.com/library/view/machine-learning-design/9781098115777/', kind: 'Book', topic: 'mlops', tracks: ['gemini', 'aws', 'azure'],
    why: 'Thirty named solutions to recurring problems (feature store, transform, checkpoints, rebalancing, continued evaluation) by Google Cloud engineers. Strong prep for PMLE.' },
  { title: 'Rules of Machine Learning', by: 'Martin Zinkevich, Google', url: 'https://developers.google.com/machine-learning/guides/rules-of-ml', kind: 'Guide', topic: 'mlops', tracks: ['gemini', 'aws', 'azure'],
    why: 'Forty-three hard-won rules for ML in production, from “do not be afraid to launch without ML” to training-serving skew.' },
  { title: 'Hidden Technical Debt in Machine Learning Systems', by: 'Sculley et al. (2015)', url: 'https://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems', kind: 'Paper', topic: 'mlops', tracks: CLOUD,
    why: 'The classic paper on why ML code is a small part of an ML system: entanglement, feedback loops and pipeline jungles.' },
  { title: 'MLOps: continuous delivery and automation pipelines', by: 'Google Cloud', url: 'https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning', kind: 'Guide', topic: 'mlops', tracks: ['gemini'],
    why: 'Defines MLOps levels 0, 1 and 2 and what each automates. Frequently reflected in PMLE scenarios.' },
  { title: 'Machine Learning Lens', by: 'AWS Well-Architected', url: 'https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/machine-learning-lens.html', kind: 'Guide', topic: 'mlops', tracks: ['aws'],
    why: 'AWS’s best practices across the ML lifecycle, organised by the Well-Architected pillars. Directly useful for MLA-C02.' },
  { title: 'Official Google Cloud Certified Professional Machine Learning Engineer Study Guide', by: 'Mona Mona and Pratap Ramamurthy', url: 'https://www.wiley.com/en-us/Official+Google+Cloud+Certified+Professional+Machine+Learning+Engineer+Study+Guide-p-9781119944461', kind: 'Book', topic: 'mlops', tracks: ['gemini'],
    why: 'Google’s endorsed study guide for PMLE, organised by exam section, with review questions. Predates the gen AI additions, so pair it with this site’s PMLE lessons.' },
  { title: 'Made With ML', by: 'Goku Mohandas', url: 'https://madewithml.com/', kind: 'Course', topic: 'mlops', tracks: ['foundations', ...CLOUD],
    why: 'A free course that takes one project from notebook to production: testing, data validation, experiment tracking, serving, CI/CD and monitoring.' },

  // Official exam training
  { title: 'AI-103 training and exam page', by: 'Microsoft Learn', url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-apps-and-agents-developer-associate/', kind: 'Course', topic: 'official', tracks: ['azure'], start: true,
    why: 'Microsoft’s free self-paced learning paths for Azure AI Apps and Agents Developer Associate, plus the practice assessment and exam booking.' },
  { title: 'Develop AI agents on Azure', by: 'Microsoft Learn', url: 'https://learn.microsoft.com/en-us/training/paths/develop-ai-agents-azure/', kind: 'Course', topic: 'official', tracks: ['azure'],
    why: 'Hands-on modules for Foundry Agent Service: tools, knowledge, multi-agent orchestration and MCP. The heaviest-weighted AI-103 area.' },
  { title: 'AI-901 training and exam page', by: 'Microsoft Learn', url: 'https://learn.microsoft.com/en-us/credentials/certifications/exams/ai-901/', kind: 'Course', topic: 'official', tracks: ['azure'],
    why: 'Free learning paths for Azure AI Fundamentals, with links to the study guide and exam sandbox.' },
  { title: 'Azure AI architecture guidance', by: 'Azure Architecture Center', url: 'https://learn.microsoft.com/en-us/azure/architecture/ai-ml/', kind: 'Guide', topic: 'official', tracks: ['azure'],
    why: 'Reference architectures for RAG, chat apps and agents on Azure, with the security and networking choices AI-103 asks about.' },
  { title: 'Machine Learning Engineer – Associate exam page and prep', by: 'AWS Certification', url: 'https://aws.amazon.com/certification/certified-machine-learning-engineer-associate/', kind: 'Course', topic: 'official', tracks: ['aws'], start: true,
    why: 'The official MLA page: exam guide, beta and GA dates, and links to AWS Skill Builder’s free exam prep plan and official practice questions.' },
  { title: 'Machine Learning Engineer learning path', by: 'Google Skills', url: 'https://www.skills.google/paths/17', kind: 'Course', topic: 'official', tracks: ['gemini'], start: true,
    why: 'Google Cloud’s official course sequence for the Professional ML Engineer exam, with Vertex AI labs.' },

  // Responsible AI and security
  { title: 'OWASP Top 10 for LLM Applications', by: 'OWASP GenAI Security Project', url: 'https://genai.owasp.org/llm-top-10/', kind: 'Guide', topic: 'safety', tracks: ALL, start: true,
    why: 'The standard list of LLM risks: prompt injection, sensitive data disclosure, excessive agency, and more, with mitigations. Maps to guardrail and security questions on every exam.' },
  { title: 'AI Risk Management Framework', by: 'NIST', url: 'https://www.nist.gov/itl/ai-risk-management-framework', kind: 'Guide', topic: 'safety', tracks: ['aws', 'azure', 'gemini'],
    why: 'The US framework for governing, mapping, measuring and managing AI risk, and its generative AI profile. Vocabulary that shows up in responsible-AI domains.' },
  { title: 'Constitutional AI: Harmlessness from AI Feedback', by: 'Bai et al., Anthropic (2022)', url: 'https://arxiv.org/abs/2212.08073', kind: 'Paper', topic: 'safety', tracks: ['claude', 'foundations'],
    why: 'How Anthropic trains models against a written set of principles with AI feedback instead of only human labels.' },
  { title: 'Microsoft Responsible AI', by: 'Microsoft', url: 'https://www.microsoft.com/en-us/ai/responsible-ai', kind: 'Guide', topic: 'safety', tracks: ['azure'],
    why: 'The six principles (fairness, reliability and safety, privacy and security, inclusiveness, transparency, accountability) tested directly on AI-901 and AI-103.' },
];

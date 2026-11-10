import type { Exam, Track } from '../../../lib/types';

const load = (p: Promise<{ default: unknown }>) => p.then(m => m.default as Exam);

export const foundations: Track = {
  id: 'foundations',
  name: 'Foundations: Math, Python and Algorithms',
  navLabel: 'Foundations',
  provider: 'Independent courses',
  tagline: 'The mathematics, Python and algorithms behind modern AI and software engineering, deep enough to explain and derive with confidence.',
  description:
    'Four deep-foundation courses that sit under every certification: the linear algebra, calculus, probability, information theory and transformer arithmetic behind LLMs; fluent Python for data, PyTorch and LLM applications; Python in depth (the object model, the interpreter, concurrency and typing); and data structures and algorithms for interviews and real systems. Every lesson has a worked example and a hands-on lab.',
  exams: [
    {
      kind: 'course', id: 'math-ai', code: 'MATH-AI', name: 'Mathematics for AI and LLMs', level: 'Deep-foundations course · no official exam', tier: 'Course',
      audience: 'Engineers, architects and technical leaders', items: 40, minutes: 60, price: 'Free',
      load: () => load(import('./exams/math-ai.json')),
    },
    {
      kind: 'course', id: 'python-ai', code: 'PY-AI', name: 'Python for AI Engineering', level: 'Deep-foundations course · no official exam', tier: 'Course',
      audience: 'Developers and architects writing AI applications', items: 40, minutes: 60, price: 'Free',
      load: () => load(import('./exams/python-ai.json')),
    },
    {
      kind: 'course', id: 'python-deep', code: 'PY-DEEP', name: 'Python in Depth', level: 'Deep-foundations course · no official exam', tier: 'Course',
      audience: 'Experienced developers who want to know how Python really works', items: 40, minutes: 60, price: 'Free',
      load: () => load(import('./exams/python-deep.json')),
    },
    {
      kind: 'course', id: 'dsa', code: 'DSA', name: 'Data Structures and Algorithms', level: 'Deep-foundations course · no official exam', tier: 'Course',
      audience: 'Developers preparing for technical interviews', items: 40, minutes: 60, price: 'Free',
      load: () => load(import('./exams/dsa.json')),
    },
  ],
  resources: [
    { title: 'MIT 18.06 Linear Algebra (OCW)', url: 'https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/', note: 'Gilbert Strang’s course: the classic route to real fluency in vectors, matrices and SVD.' },
    { title: 'Dive into Deep Learning: Mathematics appendix', url: 'https://d2l.ai/chapter_appendix-mathematics-for-deep-learning/index.html', note: 'Free, runnable maths for deep learning: calculus, probability, information theory.' },
    { title: 'Attention Is All You Need', url: 'https://arxiv.org/abs/1706.03762', note: 'The original transformer paper, readable once you have finished the Math course.' },
    { title: 'The Python Tutorial', url: 'https://docs.python.org/3/tutorial/', note: 'The official tutorial; read alongside the Python course.' },
    { title: 'MIT 6.006 Introduction to Algorithms (OCW)', url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/', note: 'Lectures, notes and problem sets: the reference course behind the Data Structures and Algorithms course.' },
    { title: 'Python Language Reference: Data model', url: 'https://docs.python.org/3/reference/datamodel.html', note: 'The authoritative description of objects, special methods and attribute lookup, the core of Python in Depth.' },
    { title: 'PyTorch: Learn the Basics', url: 'https://docs.pytorch.org/tutorials/beginner/basics/intro.html', note: 'Official tensors, autograd and training-loop tutorials.' },
  ],
  paths: [
    { who: 'Architect or tech lead who wants to speak with authority', order: ['math-ai', 'python-ai'], why: 'Math first gives you the vocabulary (embeddings, gradients, attention, KV cache) to explain why designs work; Python then makes it concrete.' },
    { who: 'Developer moving into AI engineering', order: ['python-ai', 'math-ai'], why: 'Get productive with NumPy, PyTorch and LLM APIs first, then deepen the theory behind them.' },
    { who: 'Engineer preparing for senior technical interviews', order: ['dsa', 'python-deep'], why: 'Algorithms and complexity come up in every coding round; Python in Depth covers the language questions that separate senior candidates.' },
  ],
  note: 'These are this site’s own courses with practice tests, not vendor certifications. They underpin every track: take them before or alongside the Claude, Gemini, OpenAI or AWS exams.',
  loadGuide: () => import('./runbook.md?raw').then(m => m.default),
};

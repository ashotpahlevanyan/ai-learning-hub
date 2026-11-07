// Math rendering for Markdown, split into its own chunk: only pages whose text contains $$…$$ load KaTeX.
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import type { PluggableList } from 'unified';

// Only $$…$$ is math (inline or display); single $ stays literal so prices like "$300" are untouched.
export const remark: PluggableList = [[remarkMath, { singleDollarTextMath: false }]];
export const rehype: PluggableList = [[rehypeKatex, { throwOnError: false }]];

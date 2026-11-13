import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// Pipeline specs must stay machine-independent: paths go through the {{root}} placeholder
// (filled in from args.root by pipeline/cert-prep.workflow.js), never an absolute home path.
const specsDir = join(__dirname, '../../specs');
const files = readdirSync(specsDir, { recursive: true, encoding: 'utf8' }).filter(f => f.endsWith('.json'));

describe('pipeline specs', () => {
  it('finds spec files', () => expect(files.length).toBeGreaterThan(0));
  it.each(files)('%s has no absolute home paths', f => {
    const text = readFileSync(join(specsDir, f), 'utf8');
    expect(JSON.parse(text)).toBeTypeOf('object');
    expect(text).not.toMatch(/\/(Users|home)\/[^/\s"]+\//);
  });
});

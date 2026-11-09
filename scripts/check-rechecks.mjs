#!/usr/bin/env node
// Lists content rechecks from pipeline/rechecks.json and exits non-zero when any is due (its date has passed),
// so the weekly CI job fails and GitHub sends a notification. `--soon N` also lists those due within N days.
import { readFileSync } from 'node:fs';

const { rechecks } = JSON.parse(readFileSync(new URL('../pipeline/rechecks.json', import.meta.url), 'utf8'));
const today = process.env.TODAY || new Date().toISOString().slice(0, 10);
const soonDays = Number(process.argv[process.argv.indexOf('--soon') + 1]) || 14;
const days = on => Math.round((Date.parse(on) - Date.parse(today)) / 86400000);

const problems = [];
for (const r of rechecks) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(r.on) || !r.key || !r.what) problems.push(`malformed entry: ${JSON.stringify(r)}`);
}
const due = rechecks.filter(r => r.on <= today).sort((a, b) => a.on.localeCompare(b.on));
const soon = rechecks.filter(r => r.on > today && days(r.on) <= soonDays).sort((a, b) => a.on.localeCompare(b.on));

const line = r => `  ${r.on}  ${r.key.padEnd(20)} ${r.what}${r.report ? `\n${' '.repeat(34)}(${r.report})` : ''}`;
if (due.length) console.log(`Due now (${due.length}):\n${due.map(line).join('\n')}\n`);
if (soon.length) console.log(`Due within ${soonDays} days (${soon.length}):\n${soon.map(line).join('\n')}\n`);
if (!due.length && !soon.length) console.log(`No rechecks due within ${soonDays} days (${rechecks.length} scheduled).`);
if (problems.length) console.error(problems.join('\n'));
if (due.length) console.log('After re-verifying, remove each entry from pipeline/rechecks.json (or move its date).');
process.exit(due.length || problems.length ? 1 : 0);

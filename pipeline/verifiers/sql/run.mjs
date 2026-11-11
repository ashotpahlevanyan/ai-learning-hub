#!/usr/bin/env node
// Run a SQL file (or SQL from stdin) on a fresh in-memory PostgreSQL (PGlite) and print every statement's result.
// Usage: node run.mjs file.sql   or   echo "select 1" | node run.mjs
import { readFileSync } from 'node:fs';
import { PGlite } from '@electric-sql/pglite';
import { vector } from '@electric-sql/pglite-pgvector';
import { pg_trgm } from '@electric-sql/pglite/contrib/pg_trgm';
import { pg_stat_statements } from '@electric-sql/pglite/contrib/pg_stat_statements';
const sql = process.argv[2] ? readFileSync(process.argv[2], 'utf8') : readFileSync(0, 'utf8');
// pgvector and pg_trgm are available: run CREATE EXTENSION vector; / CREATE EXTENSION pg_trgm; first.
const db = new PGlite({ extensions: { vector, pg_trgm } });
try {
  const results = await db.exec(sql);
  for (const r of results) {
    if (r.fields.length) console.table(r.rows);
    else if (r.affectedRows) console.log(`(${r.affectedRows} rows affected)`);
  }
} catch (e) { console.error('ERROR:', e.message); process.exitCode = 1; }

#!/bin/sh
# Recreate the pipeline's code verifiers under web/.pipeline/ (gitignored) on a new machine.
# Needs: Node 24+ and Python 3.9+ (system python3). uv is installed into .pipeline/py if it is not on PATH.
#   .pipeline/sql/run.mjs   PostgreSQL 18 in-process (PGlite) with pgvector and pg_trgm
#   .pipeline/ts/check.sh   TypeScript 7 strict type-check, then run with Node (NORUN=1 to only type-check)
#   .pipeline/py313         CPython 3.13 + PyYAML (Python in Depth, YAML examples)
#   .pipeline/py            numpy, pandas, scipy, sympy, scikit-learn, torch (math and ML examples)
# Usage: sh pipeline/verifiers/setup.sh   (from web/)
set -e
cd "$(dirname "$0")/../.."
V=pipeline/verifiers
mkdir -p .pipeline/sql .pipeline/ts/scratch
cp $V/sql/run.mjs $V/sql/package.json $V/sql/package-lock.json .pipeline/sql/
cp $V/ts/check.sh $V/ts/package.json $V/ts/package-lock.json $V/ts/tsconfig.json .pipeline/ts/
printf '{ "type": "module" }\n' > .pipeline/ts/scratch/package.json
(cd .pipeline/sql && npm ci --silent)
(cd .pipeline/ts && npm ci --silent)
[ -x .pipeline/py/bin/python ] || python3 -m venv .pipeline/py
.pipeline/py/bin/python -m pip install -q --disable-pip-version-check -r $V/requirements-py.txt
UV=$(command -v uv || echo .pipeline/py/bin/uv)
[ -x .pipeline/py313/bin/python ] || "$UV" venv -q --python 3.13 .pipeline/py313
"$UV" pip install -q --python .pipeline/py313/bin/python -r $V/requirements-py313.txt
echo "select version();" | node .pipeline/sql/run.mjs | grep -o "PostgreSQL [0-9.]*"
.pipeline/ts/node_modules/.bin/tsc --version
.pipeline/py313/bin/python --version
echo "Verifiers ready in .pipeline/"

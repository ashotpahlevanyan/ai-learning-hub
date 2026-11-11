#!/bin/sh
# Type-check one TypeScript file with strict settings (TypeScript 7), then run it with Node 24 (type stripping).
# The file is copied into this folder's scratch/ (an ES module package; use .cts/.mts to choose explicitly) so imports of zod, react and vitest resolve.
# Usage: sh check.sh file.ts   (set NORUN=1 to type-check only, e.g. for .tsx or vitest files)
D=$(cd "$(dirname "$0")" && pwd)
cd "$D" || exit 1
mkdir -p "$D/scratch"
F="$D/scratch/$(basename "$1")"
[ "$(cd "$(dirname "$1")" && pwd)/$(basename "$1")" = "$F" ] || cp "$1" "$F"
"$D/node_modules/.bin/tsc" --ignoreConfig --strict --target esnext --module nodenext --jsx react-jsx --noEmit --skipLibCheck --types node "$F" || exit $?
[ -n "$NORUN" ] || node "$F"

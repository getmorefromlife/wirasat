#!/bin/sh
set -eu
root=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)
backup="$root/.rollback/sunlit-garden-2026-10-22"
# Preserve the current version before restoring the pre-redesign files.
recovery="$backup/before-restore-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$recovery"
for pair in 'globals.css:src/app/globals.css' 'HeroSection.tsx:src/components/ui/HeroSection.tsx' 'MobileCalculator.tsx:src/components/mobile/MobileCalculator.tsx' 'layout.tsx:src/app/layout.tsx'; do
  name=${pair%%:*}
  target=${pair#*:}
  cp "$root/$target" "$recovery/$name"
  cp "$backup/$name" "$root/$target"
done
printf 'Original appearance restored. Refresh localhost. Current files saved in %s\n' "$recovery"

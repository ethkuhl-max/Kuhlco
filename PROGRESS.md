# Progress

## 2026-11-08 — Ordered build numbers

Changed:
- Added `.github/workflows/ordered-build.yml`: runs on pushes to `main`, one at a time
  (`concurrency: build-${{ github.ref }}`, no cancelling), computes
  `BUILD = 0 + run_number` (next build is 1), and tags the commit `build-$BUILD`.
- Version 0.0.1 has no build part, so numbering starts at 1. Runs vite build.

Open:
- Branch `ci/ordered-build-numbers` is local only; needs Ethan's OK to push.
- GitHub keeps at most one queued run per group; if several pushes land while one is running,
  the middle ones are superseded, so numbers stay in order but can skip.

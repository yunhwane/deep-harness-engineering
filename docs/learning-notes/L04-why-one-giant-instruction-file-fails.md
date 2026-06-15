# L4 — Why one giant instruction file fails

## Thesis
A monolithic `AGENTS.md` becomes counterproductive as it grows. Distribute: a short
**routing file** + focused **topic docs**, loaded on demand (progressive disclosure).

## Why monoliths fail (6)
1. Context budget erosion (600 lines ≈ 10-20k tokens = 8-15% of 128k before work starts)
2. Lost in the Middle (Liu 2023) — middle content ignored
3. Low SNR — irrelevant instructions read for every task
4. Priority ambiguity — hard constraints look equal to preferences
5. Maintenance collapse — additions feel free, deletions feel risky → infinite growth
6. Contradiction accumulation — rules added at different times conflict

## Architecture
- Router `AGENTS.md`: 50-200 lines = overview + quick-start + ≤15 hard constraints + routing links (with *when* conditions).
- Topic docs: 50-150 lines each, one concern, loaded only when relevant.
- Positioning: critical info at top/bottom (recency); prefer encoding rules in code.
- Every rule needs: source/rationale, applicability, sunset.

## Proof (SaaS team, 50→600 lines then refactored to 80)
Task success 45%→72% (+27pp); security compliance 60%→95% (+35pp) — mostly from moving
security rules out of the middle to the router top.

## Terms
Instruction Bloat, Lost in the Middle, Routing File, Progressive Disclosure, Priority Ambiguity.

## Applied in this repo
- We were already partly distributed (AGENTS.md + CONSTRAINTS.md + ARCHITECTURE.md + cold-start-test.md).
- Added a **routing table** to AGENTS.md (`when you are... → read...`) = progressive disclosure.
- Moved the few always-on hard constraints to the **end** of AGENTS.md (recency, not middle).
- Wrote `harness/instructions/instruction-policy.md`: line limits, positioning,
  the 3 metadata fields (source/applicability/sunset), anti-patterns, audit cadence.
- Annotated CONSTRAINTS.md rules with source + sunset (e.g. cold-start test sunsets at L9-L11).

## Dogfooding insight
L3 said "put knowledge in the repo"; L4 says "but route it." The two together = the
shape our `harness/instructions/` now enforces *on us* via instruction-policy.md.

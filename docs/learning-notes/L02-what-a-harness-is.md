# L2 — What a harness actually is

## Thesis
A harness is not a prompt file. It is **all engineering infrastructure outside the
model weights**, decomposed into **five interdependent subsystems**.

## The five subsystems (kitchen analogy) — dual of L1's failure layers
| Subsystem | Kitchen | Fixes L1 layer |
|-----------|---------|----------------|
| Instruction (AGENTS.md) | recipe shelf | 2 (+1) |
| Tools (shell, pkg mgr) | knife rack | 3 |
| Environment (locks, runtime versions) | gas range | 3 |
| State (PROGRESS.md) | prep station | 5 |
| Feedback (validation cmds) | QC window | 4 |

> L1 failure layer N == absence of subsystem N. Same coin, two faces.

## The proof (model constant, harness only)
TS/React + GPT-4o: 20% (instructions) → 60% (+AGENTS.md) → 80% (+validation) →
80-100% (+progress). **Feedback = highest ROI.**

## Four design principles
1. Repository as system of record (→ L3)
2. Maps over manuals (~100-line instruction files) (→ L4)
3. Constrain, don't micromanage (executable rules)
4. Component removal experiments (measure marginal value, read with failure logs)

## Applied in this repo
- Reorganized `harness/` into the five-subsystem layout with slot dirs + `.keep`
  notes saying which lecture fills each and which failure layer it covers.
- `harness/README.md` is the map (principle #2 in action: it points, it doesn't encyclopedia).

## Question carried forward
Our `harness/diagnostics/` doesn't map to one of the five subsystems — it's
*meta* (how to reason about the other five). Fine, but worth remembering it's a
different kind of artifact.

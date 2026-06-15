# The Cold-Start Test

> From Lecture 3. A **complementary** repo-completeness check. (Through L8 it was the
> primary validation; since automated `make check` exists, L12 demoted it to complementary
> — see the harness-simplification log in CONSTRAINTS.md.) Open a **fresh session with repo
> contents only** (no chat history, no memory) and try to answer five questions. An
> unanswerable question is a **map gap** — exactly where an agent will guess wrong.

## The five questions
1. What is this system?
2. How is it structured?
3. How do you run it?
4. How do you validate it?
5. What is the current progress?

## Where this repo answers them
All five are answered by `AGENTS.md` §1-§5. That is AGENTS.md's job. If you change the
repo and one of these answers goes stale, you have introduced *Knowledge Decay* — fix
AGENTS.md in the same change (CONSTRAINTS.md).

## How to actually run it
A genuine cold-start test = spawn a sub-agent given only the repo, ask it the five
questions, and compare its answers to reality. We can dogfood this with the Agent tool
once the repo is bigger. For now it's a manual checklist before declaring a lecture done.

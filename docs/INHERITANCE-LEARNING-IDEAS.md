# Making Jaʿfari inheritance understandable

Brainstorm and proposed roadmap · 22 October 2026

Status: ideas for discussion, not implemented features or validated rulings. This document adds a teaching roadmap alongside [Interactive inheritance visuals](./INTERACTIVE-INHERITANCE-VISUALS.md). It does not replace that specification.

## Product direction

Help a learner answer five questions: What estate is being considered? Which relationships matter? Who receives a share, and why? How is the amount determined? What fact would change the answer?

The central recommendation is a connected learning loop:

**Meet a fictional family → predict → reveal → ask why → change one fact → explain it back.**

Keep one family scenario synchronized across the story, family map, exact figures, and source explanation. Add teaching depth to existing views before adding more chart types or navigation entries.

## What the repository already contains

Source inspection found a family applicability map, an estate-flow view, an academy with simulations, a plain-language slices story, a glossary, a marja comparison interface, a whiteboard, and a visual-studio catalog including rings, lanes, decision paths, wheels, snapshots, timelines, and story mode. Presence in source is not evidence that every interaction or jurisprudential explanation is complete or correct.

Consequently, ideas below marked **extend** should first be checked against live behavior. Avoid building a second version of an existing tool.

## Proposed ideas

### 1. “Why this result?” explainer — extend · P1 · medium/large

Select a relative and ask: “Why do they receive this?”, “Why is there no allocation?”, or “What affected their share?” Highlight only the relevant people and show a short, ordered explanation beside them.

- First version: support a small, reviewed set of common scenarios with bilingual explanation cards.
- Required foundation: structured engine rule identifiers, inputs used, individual/group allocation type, asset basis, and citations. An amount alone cannot establish the reasoning.
- Acceptance: distinguish absent, excluded, impeded, unresolved, and allocated; keep relatives selectable and visible. Never invent a legal explanation to fill a missing trace.
- Value: turns a calculator into an understandable teacher.

### 2. One-fact comparison laboratory — extend · P1 · medium

Save case A, copy it to case B, and change exactly one fact. Show the family maps side by side, exact share differences, and one sentence describing the causal change.

- First version: a few reviewed pairs with one changed survivor or relationship count; keep the selected marja and asset inputs fixed.
- Required foundation: isolated snapshots and a typed input diff, with rule explanations from #1.
- Acceptance: A never changes when B is edited; explain percentage-point changes separately from money changes. Warn when several facts differ.
- Value: teaches the boundaries of a rule rather than encouraging memorization of a single answer.

### 3. Predict before revealing — new · P1 · small/medium

Before showing fractions, ask a focused question: which relatives are relevant, which group takes priority, or which information is still missing? Then reveal the reviewed answer and explanation.

- First version: ten carefully authored questions attached to existing fictional scenarios.
- Acceptance: offer “I’m not sure”; explain every option; support retries without penalties. Score understanding separately from arithmetic.
- Value: gives learners a reason to think before the answer appears.

### 4. A progressive inheritance mind map — new · P1 · medium

Start with five branches: estate and prior obligations; relationships; eligibility and exclusions; allocation; special cases and differences of opinion. Expand a branch into a plain explanation, a worked example, and its sources.

- First version: a curated, collapsible concept outline with a diagram alternative, in English and Urdu.
- Required foundation: a reviewed concept taxonomy and links to existing lessons/glossary entries.
- Acceptance: label links “depends on”, “example of”, or “exception to”; show spouses separately from the three blood-relationship groups. Avoid implying every rule is a simple parent-child hierarchy.
- Value: gives beginners a map before they enter the detailed course.

### 5. A six-scene family story — extend · P1 · medium

Tell one fictional case through short scenes: family; estate; prior obligations; eligible relationships; allocation; explanation and recap. Keep the family diagram in the same position throughout.

- First version: three reviewed stories, with pause, back, replay, and a readable transcript.
- Acceptance: label fiction clearly, retain exact fractions, allow instant scene changes, and never replace a learner's personal calculation without an explicit action.
- Value: provides context before numbers.

### 6. Physical fraction workbench — extend · P2 · medium

Represent an estate as tiles or a fraction strip. Let learners arrange a reviewed allocation and switch among fractions, percentages, and amounts.

- First version: a few common teaching denominators and a keyboard/button alternative to dragging.
- Acceptance: exact rational arithmetic; label rounding; keep group totals distinct from individual shares. Use multiple strips when asset bases differ. Do not round tiles to force a complete picture.
- Value: makes fractions tangible, especially for learners uncomfortable with mathematics.

### 7. “Follow one rupee” journey — extend · P2 · medium

Follow a highlighted token through the estate explanation, from the defined asset pool through applicable obligations and into the final allocation.

- First version: extend the estate-flow view with tap-to-reveal stages and a static explanation.
- Acceptance: state that the token is an illustration of proportional allocation, not tracing a particular owned coin. Show the legally relevant basis at each stage and any unresolved balance.
- Value: explains the relationship between gross estate, distributable estate, and beneficiary amounts.

### 8. “Who is related to whom?” practice — new · P2 · medium

Highlight a person in a fictional family and ask learners to identify their relationship to the deceased, including paternal/maternal and sibling distinctions.

- First version: twelve small authored family diagrams with named people and explanations.
- Required foundation: explicit relationship edges; the current aggregate relationship counts cannot safely support arbitrary named-person queries.
- Acceptance: selecting a person does not silently change the deceased; offer a clearly labeled separate viewpoint exercise.
- Value: addresses confusion that occurs before any calculation begins.

### 9. Exclusion and reduction spotlight — extend · P2 · medium

Highlight the particular relationship or condition involved in a reviewed outcome while leaving the rest of the family visible. Explain complete exclusion, reduced share, and a missing input as different states.

- First version: link reviewed academy examples to the family map and #1.
- Acceptance: distinguish “receives no share” from “has no effect on anyone else's outcome.” Do not generalize a simple tier animation to every special case.
- Value: explains why family presence can matter in different ways.

### 10. Misconception clinic — new · P1 · small/medium

Show a tempting shortcut, ask whether it always applies, and reveal a reviewed counterexample.

- Candidate themes for scholarly review: treating a familiar sex-based ratio as universal; assuming a will controls the whole estate; treating closeness by everyday intuition as the legal test; confusing zero money with exclusion.
- First version: eight reviewed cards with “claim → example → corrected principle → source”.
- Acceptance: counterexamples state their assumptions and selected authority; never present an absolute claim merely to debunk it without context.
- Value: prevents memorable but misleading shortcuts.

### 11. Find the missing fact — new · P2 · small/medium

Present a deliberately incomplete case and ask which question must be answered before proceeding. Reveal only the facts requested.

- First version: ten curated cases; no natural-language parsing needed.
- Acceptance: support “insufficient information” as a correct outcome; explain why the missing fact matters without guessing it.
- Value: teaches careful case-taking rather than mechanical button pressing.

### 12. Marja comparison with highlighted differences — extend · P2 · medium/large

Compare the same reviewed case under selected authorities. Highlight changed assumptions or rules, alongside unchanged parts, and link each difference to the relevant official text.

- First version: one thoroughly reviewed issue, supported by current primary references for every authority shown.
- Acceptance: never imply that a single authority's source validates all authorities, or that an engine disagreement is necessarily a scholarly disagreement. Separate rule differences, unsupported cases, and software defects.
- Value: explains variation without overwhelming beginners.

### 13. Build your own teaching case — new · P2 · medium/large

Let a teacher assemble a fictional family, specify the learning objective, hide the answer, and reveal a prepared explanation during a lesson.

- First version: local-only lesson cards built from reviewed presets, with printable student and teacher versions.
- Acceptance: visibly mark unsupported combinations; exporting must preserve the selected authority, assumptions, source references, and answer version.
- Value: makes Wirasat useful in classrooms and community teaching.

### 14. Explain it back — new · P2 · small/medium

After a lesson, ask the learner to complete three statements: relevant family facts; applicable principle; resulting outcome. Compare with an authored checklist.

- First version: selectable sentence fragments and optional private free text, evaluated against a visible rubric rather than an AI ruling.
- Acceptance: feedback separates conceptual mistakes from arithmetic mistakes; the learner can inspect the model explanation.
- Value: checks whether the lesson made sense beyond recognizing the right answer.

### 15. A personal learning path — new · P3 · medium

Offer distinct starting routes for a complete beginner, someone exploring a family example, and a student of jurisprudence. Remember completed concepts locally and suggest the next prerequisite.

- First version: a fixed prerequisite graph and transparent local progress; no predictive profiling.
- Acceptance: users can skip, revisit, and erase progress. A completed lesson means practiced, not qualified to issue rulings.
- Value: gives the extensive academy a manageable entry point.

### 16. Two-minute Urdu audio lessons — new · P3 · medium

Pair a narrated fictional case with highlighted family relationships, captions, a transcript, and exact written figures.

- First version: three human-reviewed scripts with recordings; audio starts only on request.
- Acceptance: review Urdu pronunciation, Arabic terms, licensing, and correspondence between narration and visual state. Keep a complete text alternative.
- Value: offers another route for learners who prefer listening.

### 17. A printable learning atlas — new · P2 · small/medium

Produce A4 concept sheets: overview map, relationship reference, fraction guide, and worked fictional cases. Provide a QR/link back to the interactive lesson.

- First version: four bilingual sheets with separate readable Urdu layouts, answer keys, source references, and version dates.
- Acceptance: black-and-white readability, authentic Nastaliq, no clipped text, and no colour-only explanation.
- Value: supports offline study, teachers, and family conversations.

### 18. An advanced branching chronology — extend · P3 · large

For reviewed multi-estate teaching cases, show successive events as separate estate ledgers and reveal their relationship step by step.

- First version: one fixed, reviewed worked example; do not start with a free-form family simulator.
- Required foundation: named-person graphs, event ordering, separate estate ownership, rational arithmetic, and explicit uncertainty handling.
- Acceptance: changing the deceased creates an explicit new estate context. Do not animate an uncertain order as established fact or treat simultaneous deaths as an ordinary sequence.
- Value: makes advanced cases approachable after learners understand a single estate.

## Recommended delivery order

| Phase | Deliverable | Why first | Completion evidence |
| --- | --- | --- | --- |
| 0 | Inventory existing teaching interactions; choose reviewed case set and glossary | Avoid duplicate tools and expose content/engine gaps | Live feature inventory, reviewed assumptions and case fixtures |
| 1 | #3 prediction cards + #10 misconception clinic + first version of #4 mind map | High teaching value with limited engine changes | Learners can find the relevant concept, predict, and explain a reviewed example |
| 2 | Structured rule trace + #1 explanation + #2 one-fact comparison | Make outcomes understandable and testable | Trace agrees with reviewed fixtures; baseline snapshot never changes |
| 3 | #5 story + #6 fraction workbench + #7 money journey | Connect family, reasoning, and mathematics | All views agree on the same case, basis, exact fractions, and totals |
| 4 | Relationship practice, missing-fact exercises, teaching cases, print atlas | Support independent and classroom use | Small-screen, RTL, keyboard, print, and learning checks pass |
| 5 | Advanced comparison, audio, personal paths, multi-estate chronology | Build on a proven core | Authority-specific review and advanced domain fixtures completed |

Effort estimates above are relative to the current code, not calendar commitments. Content review and domain modelling may exceed the interface work.

## Engineering shape

- Reuse the existing store and calculation engine, but isolate educational sandbox state from personal estate inputs.
- Store reviewed lessons as structured bilingual content: ID, prerequisites, learning objective, scenario inputs, selected authority, expected outcome, answer options, explanations, citations, reviewer/status, and version.
- Introduce structured rule traces where missing; do not reverse-engineer a legal reason from a final percentage.
- Use a stable scenario snapshot shared by the map, story, tiles, and amount table. Keep exact rational values separate from display rounding.
- Extend the academy and existing visual views through contextual actions such as “Why?”, “Compare one change”, and “Try a lesson”. Keep the main navigation manageable.
- Prefer deterministic, reviewed content first. An optional conversational tutor should retrieve approved material, cite it, and acknowledge unsupported questions; it must not silently generate new rulings or legal shares.

## Learning and accessibility acceptance

A visually impressive chart is not proof of understanding. Test with first-time learners and students: can they identify relevant facts, explain a reviewed outcome, and solve a nearby unfamiliar case? Record uncertainty and incorrect reasoning as well as answer accuracy. Use voluntary local testing rather than adding analytics by default.

All lessons need readable high-contrast text, explicit labels and symbols, keyboard alternatives, reduced motion, and English/Urdu layouts. No automatic page jumps, autoplay audio, flashing exclusions, competitive treatment of bereavement, or public family data. Use neutral fictional examples and respectful feedback.

## Primary-source starting points

Consulted on 22 October 2026 to ground the proposed topic structure; these links do not constitute a review of Wirasat's engine or every suggested lesson.

- [Al-Sistani: Inheritance overview](https://www.sistani.org/english/book/48/8236/) — distinguishes the three kinship groups and notes spousal inheritance separately. This is why the concept map must not place spouses inside a blood-relative tier.
- [Al-Sistani: Dialogue on inheritance](https://www.sistani.org/english/book/49/2418/) — an existing question-and-answer presentation that can inform the format of short guided lessons. Verify each lesson against the applicable detailed rulings.
- [Al-Sistani: Inheritance of the first group](https://www.sistani.org/english/book/48/8237/) — a starting reference for selecting reviewed introductory case fixtures.
- [Al-Sistani: Inheritance of the second group](https://www.sistani.org/english/book/48/8238/) — shows why broad shortcuts about distribution ratios need context.

For any lesson covering other marājiʿ or disputed/special cases, gather and verify that authority's primary reference before authoring the answer. In particular, do not copy current engine descriptions into teaching material as independently established law.

## Suggested first review decision

Choose ten introductory fictional cases and agree their learning objectives. Prototype prediction cards, a compact concept map, and the misconception clinic around those cases. Then add the rule-backed explanation and one-fact comparison, rather than expanding the chart catalog again.

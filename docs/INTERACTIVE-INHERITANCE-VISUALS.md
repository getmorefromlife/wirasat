# Interactive inheritance visuals

## Recommended starting point: living family tree + estate flow

Build two synchronized views of the same scenario: a living family tree explains relationships; an estate-flow view explains the amounts returned by the existing calculation engine. Selecting a relative highlights that relative in both views and opens an explanation panel. Editing survival, counts, jurisdiction, or estate inputs updates both views immediately.

A later comparison view should place two explicitly saved scenarios side by side. Keep all three within the current Family tree navigation entry rather than adding more top-level navigation.

This is a product and interaction specification, not a validation of jurisprudential rules. Display the current engine's outputs without inventing or changing rules in the visualization layer. Where the engine returns an aggregate group, label it as a group; do not invent individual allocations.

### First implementation

- Connected cards for the deceased, spouse, parents, and children, with stable positions and relationship colors.
- Selecting a card inspects it; dedicated controls change survival or counts.
- Expandable tier controls cover the remaining relatives already supported by the store.
- Persistent explanation panel shows selection, status, engine-provided fraction and amount, rule explanation and notes when available.
- Estate flow shows gross estate, deductions, net estate, and engine-reported beneficiary amounts. Explicitly show any gap between net estate and allocated amounts; never silently normalize or imply reconciliation.
- Empty scenario starts at zero. Sample loading remains explicit, with a visible sample label and a return-to-empty action.
- Changes announce the edited parameter and the new calculated net estate. No automatic recentering or page jumps after input changes.
- English and Urdu labels, logical-direction spacing, large readable text, keyboard-operable controls, and reduced-motion support.

### Later work within this recommendation

- Named individual people and relationships, branch expansion, pan/zoom, fit-to-view, and selection of a different deceased person. The current store describes relative groups around one deceased person, not a graph of named people. Recentring the deceased requires a richer data model and explicit confirmation of scenario context; inspecting a card must never silently reassign the deceased.
- Saved comparison snapshots, per-relative difference messages, richer rule provenance, and export.
- Whole-family dependency checks, including cross-field consistency of eldest-son and child-count inputs.

## All 12 presentation approaches

| # | Approach | Presentation and interaction | Best use | Tradeoff / delivery phase |
| --- | --- | --- | --- | --- |
| 1 | Living family tree | Deceased at the center; parents above, spouse alongside, children below, extended groups on expandable branches. Select cards for details and use separate inputs to edit. | Everyday family exploration | Start here. Very large families need branch collapse and a richer person model. |
| 2 | Concentric family rings | Relationship or tier rings surround the deceased. Selection highlights relevant connections; show explanatory text alongside eligibility changes. | Proximity and priority | Later alternate view; radial labels and crowded rings need careful mobile treatment. |
| 3 | Color-coded tier lanes | Spouse and three blood-relative tiers occupy separate lanes. Availability and status update while all lanes remain discoverable. | Explaining which groups apply | Useful supporting view; labels must distinguish not entered, present, excluded, and calculated. |
| 4 | Estate-flow diagram | Gross estate passes through deductions to net estate and engine-reported beneficiaries. Amounts, fractions and selected branch are linked to the tree. | Connecting relationships to money | Build with #1. Proportional branches require reconciliation checks and clearly labeled group totals. |
| 5 | Interactive household cards | Readable person or relationship cards connect in a compact responsive layout. Cards expose status and amount; edits live in a details panel. | Mobile and accessible editing | Foundation for #1; a list remains available when a spatial layout is impractical. |
| 6 | Radial relationship map | Selected deceased is the hub with relatives arranged around it and labeled connections. Inspect a relative without changing the calculation's subject. | Exploring complex connections | Later. Do not imply that every relative can become the deceased with the current aggregate data model. |
| 7 | Decision-path chart | Relevant questions reveal a visible path to the engine's outcome; earlier answers remain editable. | Teaching the reasoning | Later; requires explicit rule traces rather than explanations inferred from amounts. |
| 8 | Family tree + share wheel | Tree and distribution wheel highlight the same relative or group. A textual legend provides exact amounts. | Quick distribution overview | Later companion view. Do not draw a complete pie if allocations do not reconcile. |
| 9 | Before-and-after comparison | Two saved scenarios show connected charts and highlighted changes, with fractions and amount deltas. | Exploring hypothetical changes | Second major phase; snapshot data must remain isolated from live edits. |
| 10 | Scenario timeline | A sequence of named hypothetical snapshots transitions between family states. It is not an assumed chronological legal process. | Guided examples | Later; needs scenario saving, meaningful labels and reduced-motion transitions. |
| 11 | Inheritance matrix | Rows list relatives or groups; columns show status, tier, fraction, amount and explanation. Sorting and selection synchronize with visual views. | Exact review and large families | Strong accessible alternative. Include totals and unresolved discrepancies. |
| 12 | Guided story mode | Step through family, deductions, relevant groups and final distribution, with editable inputs at each stage. | First-time onboarding and lessons | Later; build on the same scenario state and engine rather than a second calculation path. |

## Shared interaction contract

### Selection versus editing

- A card selection changes only the inspected relative and highlighted connections.
- A toggle or count control changes scenario inputs. Use explicit labels such as “Father survives” or “Number of daughters.”
- “Edit deceased” changes the calculation context through a dedicated action; selecting another card does not.
- “Try a sample” intentionally loads example inputs. “Start my calculation” resets domain inputs to zero. Preserve language and appearance preferences.
- Sample data must stay visibly identified after reload. Any future “load sample” flow that replaces meaningful user work should offer preservation or an explicit replacement action.

### Colors and statuses

Use rose for spouse, blue for parents, amber for children, violet for extended family and emerald for the deceased/estate. Colors identify relationship groups, not legal outcomes. Pair status with a word and icon: not entered, present, excluded by an earlier tier, impediment selected, or calculated by the engine. Use a dark outline and selection marker for focus; never rely on faded text to explain exclusion.

Keep cards and connections visible when excluded. Explain why. No red overlays that conceal the family structure. Maintain high text contrast in default, selected, hovered, excluded, and disabled states.

### Live explanations

The details panel should answer: who is selected, what was entered, whether the engine reports a share, its group/individual meaning, and the engine-provided reason. Label unresolved or unallocated outcomes accurately. An empty estate is an input state, not a meaningful monetary award.

### Accessibility and layout

Use at least 16px body text, prominent monetary amounts, at least 44px primary controls, visible keyboard focus, and semantic labels. Checkmarks and symbols need dedicated layout space. English, Arabic and Urdu lines must wrap without overlap. Use direction-aware spacing and left-to-right formatting for monetary figures where helpful. On small screens stack the inspector below the chart and use an overflow region only for the connected canvas. Keep the inspector and controls reachable without horizontal scrolling.

### Accuracy boundaries

Read fractions, money and explanations from the existing engine. Do not derive new legal shares, attribute group shares to individuals, or assume fractions are directly comparable across every asset category. If allocated totals differ from net estate, show the difference explicitly. Keep balance-sheet deductions distinct from beneficiary allocations and keep any separately reported habwah details labeled.

## Delivery sequence

1. Document all views; implement connected family cards, inspection, relevant scenario controls and synchronized estate flow.
2. Verify zero state, explicit samples, survival toggles, child counts, tier changes, selected-card details, English/Urdu, keyboard use and mobile/desktop layout.
3. Add named people, relationship validation, and branch expansion after extending the domain model.
4. Add isolated before/after snapshots and a comparison view.
5. Add the tier-lane and matrix alternatives, then prioritize other views using actual user feedback.

## Acceptance checks for the first release

- Selecting a relative never edits the scenario.
- Changing a supported input updates displayed shares and flow in the same render.
- Parent and spouse toggles, child counts, extended-family controls and marja selection use existing store actions.
- Zero-state figures remain zero; sample data appears only after an explicit sample action.
- Engine aggregate outputs stay labeled as groups.
- Flow totals and any reconciliation difference are visible; displayed shares are never rebalanced by the UI.
- Focus indicators, labels, readable amounts and explanations remain usable at small screen widths and in both directions.
- No new dependencies or engine-rule changes are required for this first visual layer.

## First-version implementation status

Implemented in `src/components/tree/FamilyTree.tsx`, using the existing inheritance store and calculation engine. Available from **Family tree**. Includes connected core-family cards, selected-relative inspector, extended tier cards and controls, marja selection, a quick cash input, links to full estate/relative inputs, and the synchronized estate-flow view.

Verified in the local browser:

- Empty family and zero estate render without sample amounts.
- Explicit sample loading preserves the Family tree view and displays a sample label.
- Inspecting the sample father leaves amounts unchanged.
- Turning off the father's survival updates the daughter's displayed allocation and the flow view immediately.
- Adding a son updates the son and daughter allocations in the same scenario.
- Adding/removing a paternal grandfather in an otherwise empty family changes the active tier between 2 and none.
- Extended branches expand and collapse; exclusions remain labeled rather than concealed.
- English and Urdu views render; mobile and desktop layouts were visually inspected.
- Returning from the sample clears the estate to zero.
- Production build and TypeScript checks passed.

This first version uses relationship groups around a single deceased person. Named-person graphs, changing the deceased by selecting another family member, saved comparisons, and the other presentation modes remain planned. The chart does not independently verify the engine's jurisprudential or mathematical correctness.

## Always-visible applicability map

The family view now keeps all 21 implemented relationship cards visible, including grandparents, all sibling categories, uncles, aunts and cousins. These extended branches no longer require expansion.

- Grey, solid cards: not included in the entered family.
- Grey, dashed cards with a lock: included but excluded by an earlier tier, or an impediment was selected.
- Relationship-colored cards with a check: the engine reports an individual or associated group allocation.
- Amber review cards: included, but no individual or mapped group allocation was returned. This does not assert legal eligibility or exclusion.

Selection is separate from applicability: a grey card stays selectable and opens its controls. The selected outline never changes its inheritance status. Group totals are labeled explicitly in the inspector and are not copied into individual shares. A mobile shortcut opens the selected relative's details without requiring the user to scroll through every card.

This supersedes the initial collapsible-branch design above. It covers the 21 implemented relationship categories; named individual people, grandchildren branch editors, and sibling-descendant branch editors remain future work.

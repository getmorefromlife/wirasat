# Whiteboard family workspace — 28 October 2026

Implemented locally. Not deployed.

## Family creation

- Select any person and use **Brother + / Sister +**. Choose same parents, same father/different mother, or same mother/different father.
- Explicit biological links establish sibling categories. Existing parents are reused. Missing parents appear as editable placeholders; the form specifies whether newly created parents are alive (unchecked means predeceased). This setting does not change existing parents.
- Parents, children and spouses may also be added to extended branches. Structural caps and cycle checks remain enforced.
- Exploring a different estate no longer changes that person's survival flag. Family links and survival remain separate from calculation focus.
- Deleting a sibling retains shared parents; deleting a child no longer deletes parent placeholders upward. Dependent descendants and spouse nodes still follow the existing deletion model, with immediate Undo.

## Households

Branch cards show the current estate subject's recorded spouses, child counts and **Child +** actions. Children created there receive both parent links. Children with incomplete parentage remain in a separate group; no wife is guessed as their mother.

Auto-arrangement allocates space per spouse and descendant branch. English and Urdu layouts mirror horizontally while retaining every ID and link. Branch connectors use the household accent. The branch cards collapse descendants visually without removing them from calculation. Selecting a person from results expands collapsed branches and pans to the person.

Spouse ordinals are labels only; they do not establish marriage chronology. Group colors do not encode eligibility.

## Results workspace

- Default width 540px, keyboard-operable 440–760px width slider on large screens, plus expanded mode.
- Small screens use the existing full-width side overlay. Resizing the panel reframes the canvas.
- Prominent net estate, colored proportional bar, larger person cards, relationship labels and links back to the canvas.
- Shared fractions are labeled **group**; per-person money is labeled **each**. Original engine group allocations and the wives breakdown remain available below.
- Expandable person explanations reuse the engine's explanation text (Arabic source text in Urdu mode); they are not newly verified legal opinions.
- The latest comparison tracks group percentages and monetary totals. Changing the estate subject or display language resets the comparison.
- Unresolved parentage suppresses the mathematical allocations until reviewed.

## Verification

- `npm run test:whiteboard`: 34 regressions, including all three sibling categories, creation on extended relatives, shared-parent preservation on deletion, twelve children across four wives, and RTL mirroring.
- `npx tsc --noEmit` and `npm run build`.
- Model and results drawer pass targeted ESLint. The existing main whiteboard still has lint debt (including explicit `any`, React effect rules and image warnings); this is not a claim of repository-wide lint success.
- Local browser checks: full brother and maternal half sister creation, four wife slots, child creation in each branch with the fourth mother's link visibly selected, branch collapse, selecting a result card expands its branch, live estate amount update, person explanation, width slider and expand control, English/Urdu controls and rendering.
- A fresh browser session reported no console errors after amount changes and a language switch. An earlier development-only hook-dependency warning occurred during hot reload while the component was being edited; it did not recur after a fresh load.
- Both a narrow panel viewport and a desktop viewport were inspected. This is not an exhaustive mobile-device or accessibility audit.

## Remaining engine and product work

1. **Individual sibling allocations:** the existing Tier 2 engine sometimes returns a combined paternal or maternal group, and mixed-side coverage is incomplete. This change passes confirmed sibling counts to that engine but does not fill its jurisprudential gaps. Cards explicitly report when an individual allocation is unavailable. Group outputs still require the project's existing scholarly review.
2. **Deep ancestry/descendants:** the graph permits more generations than the engine's current projection (through grandchildren and the existing three inheritance tiers). Arbitrary graph creation must not be interpreted as complete calculation coverage for every remote descendant or relationship.
3. **Explanations and comparison:** add reviewed Urdu explanations per engine rule, translate uncommon engine relation keys, and retain scenario snapshots for a full before/after explorer. Current comparison is a last-result group comparison, not a stored scenario history.
4. **Large trees:** the canvas remains pannable and zoomable; very large trees can exceed the minimum fit scale. More compact overview/navigation and deeper branch collapse remain useful follow-ups.
5. **Marriage history:** divorce, former marriages and temporal succession remain outside the current permanent-connection model.

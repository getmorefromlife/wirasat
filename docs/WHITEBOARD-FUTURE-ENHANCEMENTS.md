# Whiteboard: three future enhancements

Documented: 27 October 2026

**Status: planning only. No implementation or deployment is authorized by this document.**

This records the three requested improvements to the Kinship Whiteboard. Existing behavior is described separately in [Whiteboard relationship rules](./WHITEBOARD-RELATIONSHIP-RULES.md). The items below are future requirements, not claims that the features already work.

## 1. Add brothers and sisters of the estate subject

### Intended experience

The user can select the person whose hypothetical estate is being explored and add a brother or sister directly from the Node Inspector. The sibling appears beside that person in the appropriate generation, connected through the recorded shared parent or parents.

Provide clear **Add brother** and **Add sister** actions, then a small relationship editor for:

- Full sibling: shared father and mother.
- Paternal sibling: shared father, different mothers.
- Maternal sibling: shared mother, different fathers.
- Parentage not confirmed: keep the connection visibly unresolved until the required details are supplied.

Use plain-language explanations for these categories in English and Urdu. Adding a sibling is an explicit action; users should not need to create an entire ancestor branch first merely to discover the option.

### Relationship and calculation requirements

- Reuse existing shared parents when they are known. Do not create duplicate father or mother nodes for each sibling.
- Preserve the existing one-father/one-mother constraints, spouse limits, and ancestry-cycle checks.
- Keep survival, relationship type, and estate focus separate. A sibling may survive or predecease the assumed estate event without becoming the estate subject automatically.
- If parentage is incomplete or inconsistent, ask for clarification rather than silently choosing full or half sibling status.
- When estate focus changes, reinterpret the sibling connections relative to the newly selected person without rewriting the family history.
- Supply the confirmed sibling categories to the existing calculation engine. Keep individual and group outputs distinct; do not invent an individual share from a group total.
- Keep excluded or unresolved siblings on screen with readable status labels and selectable cards.

### Acceptance checks for later implementation

1. Add each of the three sibling categories and confirm the intended shared parents and generation placement.
2. Multiple siblings reuse the same parent nodes; no person gains a second father or mother.
3. Survival toggles, impediment settings, and estate-focus changes preserve the sibling relationships.
4. The chart updates when earlier-tier relatives are added or removed, using the engine's returned status and allocations.
5. Unknown parentage remains clearly unresolved where it affects calculation; conflicting connections are rejected with an understandable message.
6. Creation, inspection, editing and deletion work with a keyboard and in English/Urdu layouts.

## 2. Pleasant household groupings for children of different wives

### Intended experience

For a family with a second, third or fourth wife, show each wife and her recorded children as a visually coherent household branch. Users should immediately understand which child belongs to which mother, while still seeing the shared father and the overall family connections.

Use the person's name as the primary label. An optional “Wife 1 / Wife 2 / Wife 3 / Wife 4” marker is only a navigation aid; it must not imply marriage chronology or a different inheritance priority.

### Visual and editing requirements

- Give each household a restrained accent color, a readable group heading and generous space between branches.
- Connect the father to each spouse, then connect the appropriate parents to their children. Place grandchildren under their own parent within that branch.
- Keep names, portraits, share badges and connectors in separate visual spaces. Avoid lines passing through name plates or another household's portraits.
- Offer **Add child to this household** from the spouse's inspector or branch header.
- Show and edit the child's recorded mother in the child's inspector. Moving a child to another household changes the explicit parent link, not merely the card's color or position.
- Reuse stable person IDs when spouses or branches are reordered; position and ordinal labels must not determine parentage.
- Keep children with unconfirmed parentage in a clearly labeled **Mother not specified** group. Never infer a mother solely because a wife is nearby or was created first.
- Do not duplicate a child across households. Keep the shared father connection visible.
- Keep color independent of inheritance eligibility. Use text and icons for included, excluded, unresolved, predeceased and calculated states.
- Household grouping is a presentation of recorded relationships, not a new inheritance rule. Send the same confirmed family data to the engine.

### Responsive behavior

On a wide canvas, arrange household branches side by side with sufficient spacing. On smaller screens, provide a stacked or branch-focused presentation with a clear way to return to the whole family. Preserve large labels and usable inspector controls; do not shrink the entire family into unreadable text just to fit everything at once.

Keep manual panning and zoom available. Adding or editing a person should not unexpectedly move the viewport away from the household being edited.

### Acceptance checks for later implementation

1. Families with one, two, three and four wives remain understandable, including uneven child counts and wives with no children.
2. Children and grandchildren appear under their confirmed maternal/parental branches, with no duplicate people.
3. Reassigning a child's mother updates both the connectors and the household placement while preserving that child's identity and descendants.
4. Reordering wives does not change any child-parent links or calculation inputs.
5. Unassigned parentage stays visible and is never silently attached to the first wife.
6. Removing a spouse has an explicit, predictable effect on parent links and household grouping, with the existing deletion/Undo behavior respected.
7. English and Urdu names remain legible; default, selected and excluded states remain distinguishable without color alone.

## 3. Smooth zoom-in / zoom-out slider

### Intended experience

Add a continuously adjustable zoom slider to the whiteboard toolbar alongside the existing minus/plus controls. Show the current percentage, with an easy return to **100%** and a distinct **Fit family** action.

The interaction should feel steady: dragging the thumb changes magnification smoothly, without flicker, sudden jumps, or losing the selected person.

### Interaction requirements

- Use one shared zoom value for the slider, plus/minus buttons, keyboard controls and existing trackpad/pinch or Ctrl/Command-wheel zoom.
- Initially use the whiteboard's existing supported zoom bounds, displayed as percentages; review the range during implementation rather than introducing a conflicting limit.
- Anchor zoom around a stable point, normally the viewport center. Wheel/pinch zoom may use the pointer or gesture position, but the same person should remain under that point throughout the gesture.
- Preserve pan position coherently when magnification changes. Avoid drifting across the canvas while dragging the slider.
- Keep zoom gestures separate from dragging a person or panning the board.
- Make **100%**, **Fit family**, and **Center selected person** clearly distinct operations.
- Keep the slider value and percentage synchronized after arrange, fit, fullscreen, preset changes and other controls that intentionally change zoom.
- Do not reset the user's zoom simply because they rename a person or change a survival setting.
- Use a large thumb and touch target, visible keyboard focus, an accessible label and an announced percentage. Support arrow-key adjustment and meaningful minimum/maximum navigation.
- Respect reduced-motion preferences; smooth direct control should not depend on decorative animations.

### Acceptance checks for later implementation

1. Drag smoothly from minimum to maximum and back without oscillation, stutter or large jumps.
2. Slider, percentage, buttons and gesture controls always agree on the current zoom.
3. The zoom anchor remains stable; the selected person does not drift unexpectedly during a gesture.
4. Pointer/touch interaction with the slider never drags a person or pans the canvas.
5. Keyboard use, fullscreen changes, English/Urdu directionality and narrow screens remain usable.
6. Fit and reset actions update the slider; ordinary relationship edits leave zoom unchanged.

## Suggested implementation sequence

1. **Sibling creation:** establish explicit sibling categories and shared-parent validation first.
2. **Household layout:** build the maternal grouping and child reassignment experience on confirmed parent links.
3. **Zoom slider:** finish with a synchronized zoom controller and interaction polish, tested against the larger family layouts.

Each feature should be implemented and reviewed separately. Recheck the current whiteboard, domain model and engine before starting; this plan does not authorize changes to calculation rules or claim that all relationship cases are supported.

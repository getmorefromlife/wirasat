# Whiteboard relationship rules and what-if planning

The whiteboard validates family structure separately from hypothetical survival. A living planning subject can explore an assumed estate event, including children who predeceased that event and grandchildren who survived it. These switches do not assert anyone's real-life death.

## Structural limits

- Exactly one estate-planning subject; unique person IDs.
- One biological father and one biological mother per person. A predeceased parent still occupies the same relationship; edit the existing node rather than adding a second mother or father.
- Up to four permanent-wife connections for each man, and one husband connection for each woman. Count both directions of spouse links. These are relationship slots in one modeled family, not a marriage-history system; changing survival does not bypass the limit. Divorce, former marriages, temporary marriages and waiting periods are not modeled.
- No self-parenting, self-marriage, missing references, ancestor cycles, or spouse connections to an ancestor, descendant or sibling.
- Gender edits must remain compatible with spouse connections. Son/daughter labels follow gender changes. Father/mother roles cannot silently change into each other.
- Deleting a person removes dependent descendants and spouse nodes, avoiding orphaned links. The planning subject cannot be deleted.

The permanent-marriage count reference is the official Sistani text, *A Code of Practice for Muslims in the West*: https://www.sistani.org/files-new/book-pdf/english-book-49.pdf. These basic checks do not constitute a complete marriage-validity or inheritance-law validator.

## Supported branches

Parents, spouses, children and full/paternal/maternal siblings can now be added from any person. Siblings are represented by explicit shared parents. Missing parents are created as named placeholders; the form explicitly lets the user choose whether newly created parents are alive (default: predeceased). Existing parents retain their status. Adding through a spouse records both parents. Extended branches use neutral structural roles and are reinterpreted relative to the selected estate subject. Tree creation beyond three generations does not expand the existing calculation engine’s supported depth.

Spouses of children may appear in the family diagram but must not be counted as spouses of the subject, included in their unpaid-mahr list, or assigned the subject's spouse share. The subject's husband is counted when the subject is female. Preview and explicit synchronization use the same synthesized heir inputs, including named descendant branches and impediments.

## User experience

The Inspector has persistent Add parent / Add spouse / Add child controls, so creation is not limited to hover-only handles. Unavailable actions explain why, and guarded handlers reject the same action even if it is called directly. Invalid gender edits retain the previous family and show a bilingual message. Survival changes remain allowed when they do not alter family structure.

The subject can be “Alive · planning” or an “Assumed estate event.” Other survival flags refer to survival at that assumed event. A parent can remain alive while their child is predeceased; a grandchild can remain alive while their parent is predeceased. No requirement forces living children to have living parents or an already-deceased subject.

## Verification

Run `npm run test:whiteboard` for model regressions covering the spouse caps, incoming links, duplicate parents, survival changes, living-subject/grandchild scenarios, relationship-preserving gender edits, unsupported branches, cycles, missing references, and deletion. Type-check with `npx tsc --noEmit`; use the local whiteboard for interactive checks.

### Verified behavior

- Historical verification below predates the 28 October changes. Current verification is recorded in [Whiteboard family workspace](./WHITEBOARD-FAMILY-WORKSPACE.md).
- Browser: adding the fourth wife makes the subject's spouse action unavailable, with the limit explained.
- Browser: adding father and mother fills both parent slots and explains why another parent cannot be added.
- Browser: changing the subject's gender while spouse links conflict rejects the edit and leaves the family intact.
- Browser: a female subject's husband receives an engine-reported spouse fraction; a second husband connection is unavailable.
- Browser: the Tanzīl preset keeps both children predeceased and grandchildren surviving after the subject is marked alive for hypothetical planning.
- English and Urdu planning labels were checked; no browser console errors were observed during the final scenario check.

## Inspector, labels and estate-focus interaction

The inspector header now exposes Delete and Close. Delete is reversible through an immediate Undo action; its dependency count is shown before deleting a branch. The original family anchor and the active estate subject remain protected, as does any branch whose removal would remove the active subject. Loading a preset or making a subsequent domain edit invalidates the old deletion snapshot so Undo cannot overwrite newer scenario data.

Name plates have opaque backgrounds, bounded two-line names (with full names in the inspector and title), and generous generation spacing. Parent-child curves start below the full name plate and end above the next person's share badge. Spouse connectors attach outside avatar circles. The status summary sits outside the canvas. The scale overlay has been removed entirely; only the selected estate subject receives an external golden halo.

“Explore this person’s estate” is a separate action from survival toggles. It selects that person as the hypothetical estate focus without changing survival, recenters the viewport, moves the halo, and projects known family links around that person without rewriting the original relationships. Marking a relative predeceased alone does not steal the estate focus, preserving grandchildren simulations. The toolbar identifies the current estate subject.

The projection supplies recorded spouses, parents, children, grandchildren, grandparents and known sibling/uncle/aunt/cousin categories to the existing engine. Individual badges use engine-returned per-person amounts; grandchildren use the engine's final branch results. Calculations and Sync are withheld when the relevant second-parent or full/half-sibling links are unresolved. A spouse is never automatically assumed to be every child's parent. A second-parent selector offers structurally compatible existing people or an explicit declaration that the other parent is not included in this scenario. The original three-generation construction scope remains; this is not a new universal kinship or jurisprudence engine.

Additional regressions cover focus switching without relationship mutation, grandchild focus, second-parent assignment, ambiguous parentage, incompatible co-parents, label spacing, and deletion cleanup. The live review checked top-header deletion and Undo, a son becoming the estate subject, the missing-parent prompt, and mother/son roles updating after the recorded parent link was supplied.

Spouse creation is now available for any recorded person, including a grandchild or parent selected as an estate subject. The same per-person cap applies to incoming and outgoing connections. Child creation now also supports extended branches; calculation coverage remains limited by the existing engine.

## Planned improvements

The original [Whiteboard future enhancements](./WHITEBOARD-FUTURE-ENHANCEMENTS.md) remains a historical requirements checklist. See [28 October implementation and verification](./WHITEBOARD-FAMILY-WORKSPACE.md) for current implementation, evidence and remaining work.

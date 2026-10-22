# Sunlit Garden appearance refresh

## Restore the original appearance

The working tree was clean before this refresh. Baseline commit: `3c3dcc29b1ac7c4f60ae173b927dde92f52368c6`.
Exact copies of every modified existing file were saved before editing under `.rollback/sunlit-garden-2026-10-22/`.

From the project directory, run:

```sh
sh .rollback/sunlit-garden-2026-10-22/restore.sh
```

This restores globals.css, layout.tsx, HeroSection.tsx, and MobileCalculator.tsx. It first saves their current contents in a timestamped recovery directory. Refresh the browser afterward. It does not reset Git, touch inheritance logic, or erase browser data. The new sunlit-garden.css file becomes inactive when the original layout is restored. If later work modifies these four files, review it before using the full restore.

## Design and contrast rules

Use luminous ivory and mint surfaces, dark emerald text, white cards, restrained gold decoration, and organic tree artwork. Gold highlights are decorative; body text uses dark colours. Primary buttons pair white text with dark emerald in both default and hover states. Keep form fields opaque and placeholders readable. Preserve explicit family applicability labels alongside colours. Respect reduced motion.

Preview: http://localhost:3001 (port 3000 is occupied by another project).

## Validation

- Production build and TypeScript passed.
- Rollback script executed in an isolated temporary fixture: all four original files matched byte-for-byte; current versions were preserved.
- Live browser review covered English/Urdu homepage, calculator entry, a sample result, dashboard, family tree, academy, library, will guidance, glossary, chart studio, whiteboard, comparison matrix, and narrow mobile calculator.
- Rendered-colour checks target 4.5:1 normal text and 3:1 large text. These checks composite transparent backgrounds and convert modern OKLab/OKLCH colours; gradients also need visual review. They are a sampling of rendered states, not a certification of every interaction, chart, modal, or browser.
- Fixed pale calculator labels, chart labels on mid-tone fills, dashboard labels on dark panels, glossary counters, matrix controls, and dark mobile estate input. No inheritance calculations changed.

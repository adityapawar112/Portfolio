# Token guidelines

Tokens live in `src/index.css`. Prefer semantic custom properties over hard-coded values.

## Typography

- `--font-display`: Pixelify Sans; headlines and titles only.
- `--font-secondary`: Jersey 10; body, labels, metadata, numbers, and compact UI.

## Base colors

- `--ink-deep`: deepest neutral background and dark text on bright controls.
- `--ink-shadow`: hard pixel shadow.
- `--mist`: primary light text.
- `--mist-muted`: secondary light text.
- `--leaf` / `--leaf-bright`: forest source colors; do not use as universal accent values.
- `--panel` / `--panel-deep`: forest source panels; responsive UI must use realm aliases instead.
- `--focus`: legacy focus source. Prefer `--realm-bright` for themed focus rings.

## Realm aliases

These are the semantic tokens UI code should normally consume:

- `--realm-accent`: primary realm accent.
- `--realm-bright`: high-emphasis text, active controls, badges, and selection background.
- `--realm-dark`: text on bright accents and pixel corners.
- `--realm-panel`: translucent themed surfaces.
- `--realm-panel-deep`: deep themed surfaces and gradients.

Every `.theme-<category>` class overrides these aliases. Supported categories are:

- `summer`
- `autumn`
- `winter`
- `forest`
- `mountains`
- `desert`
- `clouds`
- `wasteland`

Do not reintroduce `theme-nature`; Nature was renamed and recategorized.

## Geometry

- `--pixel-unit`: base size for 8-bit button edges and corners.
- Corners are square. Build pixel silhouettes with stepped edges, borders, clip paths, and hard shadows rather than border radius.

## State decisions

- Active/default buttons: `--realm-bright` background with `--realm-dark` content.
- Hover/focus accents: `--realm-bright`.
- Themed borders: mix `--realm-accent` with transparency.
- Panels: gradients between `--realm-panel` and `--realm-panel-deep`.
- Text selection: `--realm-bright` background and `--realm-dark` foreground.
- Disabled or secondary text: `--mist-muted`.

Avoid direct `--leaf`, `--panel`, or static green usage in components because it breaks non-forest realms.

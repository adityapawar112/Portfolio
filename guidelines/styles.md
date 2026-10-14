# Style guidelines

## Visual language

The portfolio uses a retro game-start-menu aesthetic with pixel corners, square geometry, layered translucent panels, and realm-aware accents. Keep the interface deliberate and compact; avoid rounded SaaS styling, generic gradients, emoji, and unrelated component libraries.

Use the local 8-bit primitives and established CSS classes before creating new abstractions.

## Typography

- Display font: Pixelify Sans.
- Secondary/body font: Jersey 10.
- Pixelify Sans is reserved for large titles, menu items, section headings, card titles, and major screen headings.
- Jersey 10 is used for body text, labels, metadata, descriptions, numbers, and small UI text because it remains legible at compact sizes.
- Both fonts are imported through Google Fonts at the top of `src/index.css`.

## Color and themes

- Never hard-code forest colors into responsive overrides.
- Use `--realm-accent`, `--realm-bright`, `--realm-dark`, `--realm-panel`, and `--realm-panel-deep`.
- Text selection must use active realm tokens.
- Menu, cards, controls, focus rings, badges, and highlights must react to the current realm.
- There is no vignette layer.

## Layout

- Home is a fixed, non-scrolling viewport over a horizontally looping parallax scene.
- Content routes use `.section-scroll`; the home screen itself must not scroll.
- Standard content width is `52rem`; wide timeline/project content is `67rem`.
- Keep clear independent hit targets around external links and accordion triggers.
- Avoid wasted vertical space, especially in collapsed project cards and short-height phones.

## Responsive behavior

Primary breakpoints are encoded in `src/index.css`:

- Desktop: above `48rem`.
- Tablet: approximately `30.01rem–48rem`, with a deliberately taller/larger menu on sufficiently tall screens.
- Phone: `30rem` and below.
- Short phone: phone width plus a maximum height of `47rem`; use the compact menu treatment rather than scrolling or overlap.

Phone requirements:

- Realm trigger on the left; sound/CRT group on the right.
- Hide keyboard instructions.
- Preserve visible background area by reducing menu gaps, padding, status content, and title scale on short screens.
- Social controls remain accessible without colliding with the menu.

Tablet requirements:

- Menu rows and typography are larger/taller than phone values.
- Realm-aware menu panel colors must match desktop behavior.

## Motion

- Parallax layers move horizontally and repeat.
- The approved eight-layer timing curve is `520 / 1.48^index` seconds.
- Other layer counts use count-specific geometric spacing from `getLayerDuration` so adjacent depths remain visibly distinct.
- Single-layer scenes use a moderate standalone duration.
- Respect `prefers-reduced-motion`; pause parallax and remove nonessential transitions/animations.

## CRT

- Keep scanlines visible but subtle.
- Use fine horizontal dark lines and extremely faint RGB subpixel bands with soft-light blending.
- Do not add `react-postprocessing` unless the dependency is explicitly approved.

## Loading and consent overlays

- Loading sits above the entire app and uses the current realm tokens.
- Cookie consent uses the standard pixel-card surface and local Button primitives.
- Keep consent copy concise, state that analytics are optional, and provide equally accessible Accept and Decline actions.

# Setup and architecture

## Runtime

- React 19, React DOM 19, TypeScript 5.7, Vite 8, and Tailwind CSS v4.
- The Figma Make development server is already running. Do not run `pnpm dev`, `vite`, or another preview server.
- Source changes hot reload in the existing preview.
- Use `pnpm`; tool versions are defined in `.mise.toml`.

## Commands

- Production build: `pnpm build`
- Type check: `pnpm exec tsc --noEmit`
- Formatting: `pnpm format`
- Do not commit, push, or modify Git history unless explicitly requested.

For meaningful UI or behavior changes, run the build and type check. Localized copy-only or documentation changes do not require a build.

## Deployment variables

- `VITE_SITE_URL`: final absolute production URL. When present, the Vite SEO plugin adds canonical/`og:url` metadata, an absolute robots sitemap reference, and the sitemap homepage entry. Without it, the build intentionally emits a valid empty sitemap rather than a false domain.
- `VITE_GA_MEASUREMENT_ID`: optional Google Analytics measurement ID. Analytics scripts load only after explicit visitor consent.

## Source map

- `src/main.tsx`: application entrypoint and global CSS import.
- `src/App.tsx`: hash routing, home menu, parallax scene, global controls, social links, CRT state, and top-level sound wiring.
- `src/components/portfolio-sections.tsx`: Start, About/Education, Skills, Experience, Projects, and 404 content.
- `src/components/realm-switcher.tsx`: realm archive, cat trigger, sound control, and CRT control.
- `src/components/ui/8bit-button.tsx`: local 8bitcn-inspired button primitive. Use this instead of raw buttons.
- `src/components/ui/pixel-icon.tsx`: renders statically imported Pixelarticons SVGs through CSS masks.
- `src/data/realms.ts`: category order, display names, asset IDs, and layer counts for all 52 realms.
- `src/hooks/use-ui-sounds.ts`: the only UI audio registry and playback hook.
- `src/lib/analytics.ts`: consent-gated analytics loader and page-view events.
- `src/index.css`: all theme tokens, typography, responsive behavior, pixel components, cursor wiring, and animations.

## Static assets

- `public/realms/<id>/`: `preview.png` plus sequential `layer-<n>.png` files.
- `public/UI-SFX/`: only `Boop.mp3`, `Ding.mp3`, and `Chord.mp3`.
- `public/cursors/`: Pixelarticons `default.png`, `pointer.png`, and `text.png`.
- `public/projects/scalerp-desktop/` and `public/projects/scalerp-web/`: project gallery media.
- `public/llms.txt`, `public/llm.txt`, `public/humans.txt`, `public/site.webmanifest`, and `public/og-image.png`: search, AI discovery, install, and social metadata.

Realm asset IDs are stable paths. Some `nature-*` folders are intentionally displayed under Summer, Mountains, Desert, or Winter; do not rename folders without moving every corresponding asset and updating `src/data/realms.ts`.

## Navigation

Routing is hash-based. The menu order is:

1. Start
2. About Me
3. Skills
4. Experience
5. Projects

Start is a highlighted placeholder route for a future destination. Education is not a standalone route; its roadmap is part of About Me.

When adding a route, update `PortfolioSectionId`, `menuItems`, `getRouteFromHash`, and the `sectionContent` switch together.

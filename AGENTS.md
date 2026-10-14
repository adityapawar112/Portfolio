# Aditya Pawar pixel portfolio

React + Vite + TypeScript + Tailwind CSS v4 portfolio deployed to Vercel. The UI is a realm-themed retro game menu with parallax pixel backgrounds, hash-routed portfolio sections, 8-bit controls, UI sounds, custom cursors, and a toggleable CRT overlay.

## Development Server

Run `pnpm dev` for local development.

- Hot reload: Changes to source files are reflected immediately

## Project Structure

This is the canonical project structure. Start with task-relevant files below. Only follow imports or inspect other files when required, when a documented path is missing, or when the repository contradicts this guide.

- `src/main.tsx` - React entrypoint; imports `src/index.css` and mounts `src/App.tsx` into the `#root` element
- `src/App.tsx` - Hash routing, home menu, parallax scene, global controls, footer socials, and CRT state
- `src/components/portfolio-sections.tsx` - Start, About/Education, Skills, Experience, Projects, and 404 sections
- `src/components/realm-switcher.tsx` - Realm archive and sound/CRT controls
- `src/components/ui/` - Local 8bitcn-inspired Button and PixelIcon primitives
- `src/data/realms.ts` - Realm categories, display metadata, and layer counts
- `src/hooks/use-ui-sounds.ts` - Boop, Ding, and Chord audio behavior
- `src/lib/analytics.ts` - Consent-gated Google Analytics initialization and page views
- `src/index.css` - Global styles, theme tokens, typography, responsive behavior, cursors, CRT, and animations
- `guidelines/` - Durable setup, component, style, and token rules; read the relevant files before UI changes
- `index.html` - Vite HTML shell containing the `#root` element and loading `src/main.tsx`
- `package.json` - Project dependencies and the Vite build, development, preview, and formatting scripts
- `vite.config.ts` - Vite configuration with React, Tailwind CSS v4, and SEO generation plus the `@` alias for `src`
- `vercel.json` - Vercel deployment routing and configuration
- `.mise.toml` - Toolchain versions for Node.js and pnpm

## Dependencies

- Runtime: React 19 and React DOM 19
- Styling: Tailwind CSS v4 with the `@tailwindcss/vite` plugin
- Build tooling: Vite 8, TypeScript 5.7, and `@vitejs/plugin-react`
- Formatting: oxfmt

## Styling

This project uses **Tailwind CSS v4** through the `@tailwindcss/vite` plugin configured in `vite.config.ts`. `src/index.css` imports Tailwind with `@import 'tailwindcss';`. Use Tailwind utility classes directly in JSX and put global CSS or Tailwind v4 theme customization in `src/index.css`. This scaffold does not need a Tailwind config file or PostCSS config.

`src/main.tsx` imports `src/index.css`, so global font wiring belongs there. Keep CSS imports first.

- Pixelify Sans is the display font for titles and headlines.
- Jersey 10 is the secondary font for body text, labels, metadata, small text, and numbers.
- Use realm aliases (`--realm-accent`, `--realm-bright`, `--realm-dark`, `--realm-panel`, `--realm-panel-deep`) instead of static forest colors.
- Use the local `Button` and `PixelIcon` components. Use static Pixelarticons SVG imports rather than runtime icon hooks.
- The home screen must remain fixed and non-scrolling. Use the existing phone, short-phone, tablet, and desktop responsive patterns.

## Product invariants

- Menu order: Start, About Me, Skills, Experience, Projects.
- Education is embedded at the end of About Me.
- Start is a subtly highlighted placeholder route.
- About has Professional and Cat modes; cat actions use square brackets.
- Sound meanings: Boop for highlight, Ding for normal actions/internal navigation, Chord only for Start, realm changes, and external redirects.
- Realm order: Summer, Autumn, Winter, Forest, Mountains, Desert, Clouds, Wasteland.
- Keep all 52 realm assets. Historical `nature-*` asset folder names are intentional.
- Eight-layer parallax timing is the approved baseline; other layer counts use `getLayerDuration`.
- CRT and mute preferences persist in local storage.
- Analytics consent persists in local storage; tracking must never load before acceptance.
- `VITE_SITE_URL` enables canonical URLs and populated sitemap entries. `VITE_GA_MEASUREMENT_ID` enables analytics after consent.

## Code quality

- Use double quotes for strings containing apostrophes (`"We're here to help"`), or escape them in single-quoted strings. An unescaped apostrophe in a single-quoted string breaks the build.
- Ensure JSX tags are closed and braces are balanced.
- Preserve user changes and keep edits narrowly scoped.
- Run `pnpm build` and `pnpm exec tsc --noEmit` after meaningful code changes.
- Do not add dependencies, start another dev server, or commit/push unless explicitly requested.

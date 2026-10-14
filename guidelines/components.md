# Component guidelines

## Buttons and icons

- Use `Button` from `src/components/ui/8bit-button.tsx`; do not introduce raw `<button>` elements.
- Use `PixelIcon` with static `pixelarticons/svg/*.svg?url` imports. Do not use runtime icon hooks.
- Every icon-only button needs an `aria-label` and `title`.
- Preserve the button's pixel edge/corner spans. Hide them with scoped CSS only for intentionally joined controls such as segmented toggles.
- External destinations open in a new tab with `noopener,noreferrer`, except the email action, which uses `mailto:`.

## Sound semantics

`useUiSounds` exposes exactly three cues:

- `boop`: hover, focus, or highlighted-item movement.
- `ding`: ordinary button presses, accordion toggles, and internal menu navigation.
- `chord`: Start, realm changes, and navigation outside the portfolio.

Do not add additional sound files or semantic aliases without an explicit design change. Respect the persisted mute state.

## Home menu

- Start is always subtly accented and is initially selected.
- Keyboard behavior supports Arrow Up, Arrow Down, and Enter.
- The selected item uses the full active 8-bit button treatment.
- Do not add scrolling to the home screen. Adjust compact-height layouts instead.
- Keyboard instructions sit beside social icons on desktop/tablet and are hidden on mobile.

## Realm switcher

- The realm trigger uses the pixel cat, not a globe or language-like icon.
- Its hint is at most three words and dismisses after three seconds or when the trigger is pressed.
- Sound and CRT are a compact joined secondary control; the realm trigger remains visually primary.
- On phones, realm stays left while sound/CRT move right.
- Categories must remain ordered: Summer, Autumn, Winter, Forest, Mountains, Desert, Clouds, Wasteland.

## About and Education

- About defaults to Professional mode.
- The mode toggle is icon-only: briefcase for Professional and pixel cat for Cat mode.
- Keep accessible names and tooltips even though visible labels are icons.
- Professional mode is a Recruiter/Aditya exchange.
- Cat mode is a Cat/Aditya exchange; cat actions must be enclosed in square brackets.
- Keep the heading, subtitle, and toggle in a stable non-wrapping row on narrow screens so changing modes never shifts the title under the icon.
- The Education Roadmap follows the conversation in the same section.

## Experience

- Role cards are accordions.
- Role highlighting uses Boop; expansion and “Show less” controls use Ding.
- Point descriptions start as one-line summaries and can expand independently.
- Preserve accessible `aria-expanded`, labels, and keyboard focus behavior.

## Projects

- Keep one independent accordion per project. The first project may start expanded.
- The compact metadata/link row sits above the taller project title trigger.
- External GitHub and Live Site buttons are siblings of, never nested inside, the accordion trigger.
- Expanded content order is Tech Stack, Core Features, Gallery.
- Tech stack cards remain compact and show only an icon and name.
- Gallery controls include accessible previous/next labels, a count, and visual position indicators.
- Project external links use Chord.

## CRT and cursors

- CRT scanlines are a dependency-free CSS overlay with subtle horizontal lines and faint RGB texture.
- The CRT preference is persisted in local storage and defaults on.
- Use the local Pixelarticons cursors: default for the app, pointer for controls, and text for readable/selectable content.

## Loading and analytics consent

- The loading screen preloads the initial realm layers, remains visible for at least 900 ms, and has a 3-second failure fallback.
- Keep its segmented progress treatment aligned with the 8-bit design language.
- The cookie banner controls optional analytics only; necessary local preferences do not depend on acceptance.
- Never initialize analytics before consent. Declining must leave all analytics scripts unloaded.
- Page views follow hash-route changes after consent.

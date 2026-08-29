# Plain Typography Decision

## Objective

Replace bulky decorative wiki typography with a compact documentation style inspired by Apple Developer Documentation.

## Evidence

- The prior Source Serif body font appeared visually bulky even after reduction to 16px.
- Apple Developer Documentation uses a restrained system sans-serif structure on a clean documentation surface.
- A global theme controls every generated page, so editing font declarations inside 150 Markdown files would create duplication and inconsistency.

## Decision

Use the native system sans-serif stack for all prose, headings, navigation, controls and tables. Use 14px article text with 1.5 line height. Force pages, navigation, popovers and tables to white backgrounds with black text. Retain a system monospace stack for code.

## Alternatives

- Retain Source Serif at a smaller size: rejected because the typeface itself was reported as bulky.
- Edit every Markdown file: rejected because Markdown should remain presentation-neutral and future pages would diverge.
- Copy Apple's proprietary San Francisco font files: rejected because native system stacks provide the intended appearance without redistributing proprietary assets.

## Risks and guardrails

- Risk: text becomes too small. Guardrail: keep the baseline at 14px, preserve browser zoom and review on desktop and mobile before publication.
- Risk: dark-mode rules reintroduce dark surfaces. Guardrail: use identical white-and-black theme values in both modes and hide the dark-mode control.
- Risk: isolated components retain colored surfaces. Guardrail: verify representative pages, tables, navigation, search, metadata and popovers in the generated HTML.

## Validation

Build all pages locally, inspect generated CSS for the 14px rule and white-and-black colors, confirm every HTML page uses the shared stylesheet, and obtain user approval from a local preview before publication.

## Skill impact

Updated `satyagraha-publishing` to version 1.3.0 with compact native typography, white-and-black surfaces and mandatory local review before publishing style changes.

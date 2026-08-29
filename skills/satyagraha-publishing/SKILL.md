---
name: satyagraha-publishing
description: "This skill should be used when creating, converting, styling, naming, validating, or publishing Markdown and HTML artifacts for Satyagraha Law Group across wikis, websites, repositories, and AI-assisted workflows."
version: 1.5.0
---

# Satyagraha Publishing

Create readable, consistent, portable Markdown and HTML outputs for Satyagraha Law Group.

## Core requirements

1. Treat every artifact as ecosystem-wide, not tied to one assistant or vendor.
2. Prefer open formats, plain UTF-8 text, relative links, standard Markdown, HTML5, CSS and deterministic scripts.
3. Avoid proprietary syntax unless the requested target requires it. When proprietary syntax is unavoidable, also retain a portable source version.
4. Make instructions usable by ChatGPT, Google Gemini, Claude, Hermes, Groww-oriented bots and other current or future AI tools.
5. Keep credentials, machine-specific secrets and private tokens out of reusable files.

## File naming

Name every newly created ordinary file as:

`One Two Three dd-mm-yyyy hour-minute-second.ext`

- Use no more than three words before the timestamp.
- Keep the pre-timestamp name at or below 60 characters.
- Use a 24-hour timestamp, for example `Publishing Standard 29-08-2026 10-26-26.md`.
- Preserve the requested extension.
- Do not rename existing files unless explicitly requested.
- Preserve mandatory machine-recognized names such as `SKILL.md`, `README.md`, `package.json`, `.gitignore` and `index.html`; these are compatibility exceptions.
- Treat canonical wiki pages as a stable-content exception: use descriptive Title-Case words separated by hyphens without timestamps, for example `Civil-Procedure-Code-Order-5.md`.
- When renaming a published page, retain its former slug as an alias or redirect.

## Publishing workflow

1. Inspect the source tree and preserve the original files.
2. Normalize Markdown structure without embedding presentation fonts in individual notes.
3. Apply typography and layout globally through the publishing theme or stylesheet.
4. Generate semantic HTML5 with headings, paragraphs, lists, tables, quotations and navigation represented by appropriate elements.
5. Remove or flag unwanted external links according to the project requirements.
6. Build the complete site and verify representative pages, navigation and search.
7. Check mobile readability, keyboard accessibility, contrast and print behavior.
8. Scan generated output for broken links, missing assets, unsafe URLs and build errors.
9. Keep deployment configuration portable and credentials external to the repository.
10. Record reusable decisions in the relevant skill or standard rather than only patching one output.

## Skill maintenance and audit trail

1. Evaluate new feedback, fixes and discoveries for reuse across future projects.
2. Update this skill when an update is relevant, general, durable, actionable and specific to Satyagraha's working methods.
3. Do not add temporary preferences, unverified claims, credentials or project-only exceptions to the reusable standard.
4. Increment the skill version after a material instruction change and validate the skill again.
5. Mention every material skill update in the conversation, including the version and changed guardrail.
6. Publish an auditable decision summary containing the objective, available evidence, assumptions, alternatives considered, selected approach, risks, guardrails, validation and remaining uncertainty.
7. Do not request, store or publish private hidden chain-of-thought. Record concise decision rationale sufficient for another person or AI system to review the result.
8. Save a material decision summary under `references/` using the Satyagraha filename convention.

Read [Decision Guardrails](references/Decision%20Guardrails%2029-08-2026%2010-28-46.md) when updating this or another Satyagraha skill.

## Typography

Apply a compact native system typography by default:

- Use `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, Arial and `sans-serif` for body text, headings, navigation, controls and tables.
- Use `SFMono-Regular`, Consolas, `Liberation Mono` and `monospace` for code and file paths.
- Use approximately 14px article text, 1.5 line height and a maximum paragraph measure of 76 characters.
- Use a plain white background and black text across pages, navigation, popovers and tables.
- Keep table cells white with black text and restrained gray borders.
- Do not offer a dark appearance when the project requires a uniform white-and-black presentation.
- Apply the same global typography structure to the homepage, indexes and every generated article rather than styling individual Markdown files.

## Content readability

- Preserve legal meaning and wording while restoring source paragraph boundaries, headings, lists and tables.
- Never flatten multiple provisions or sub-clauses into a single Markdown line or paragraph.
- Decode HTML entities and remove conversion artifacts such as mojibake, replacement characters, JavaScript links and orphaned navigation fragments.
- Distinguish source transcription defects from conversion defects. Do not silently guess corrections to statutory wording; verify against an authoritative text or clearly record unresolved source defects.
- Generate navigation separately from legal text so controls cannot interrupt a sentence.
- Sanitize square brackets and other wiki-syntax delimiters inside link labels, then verify that every generated internal link parses and resolves to an existing Markdown page.
- Prefer a quiet masthead and prominent search over redundant sidebar dropdowns when search and a collection index provide sufficient navigation.

## Detailed standard

Read [Publishing Standard](references/Publishing%20Standard%2029-08-2026%2010-26-26.md) before changing a publishing theme, generating HTML, or preparing a public repository.

Read [Wiki Readability](references/Wiki%20Readability%2029-08-2026%2011-00-59.md) when setting article typography or migrating abbreviated page names.

Read [Plain Typography](references/Plain%20Typography%2029-08-2026%2011-22-48.md) when applying the compact white-and-black documentation style.

Read [Content Readability](references/Content%20Readability%2029-08-2026%2012-49-48.md) when converting legacy legal HTML or simplifying wiki navigation.

## Completion checks

- Confirm the build exits successfully.
- Confirm the expected Markdown and HTML page counts.
- Confirm representative home, index and article pages exist.
- Confirm fonts are included or reliably referenced with fallbacks.
- Confirm self-hosted font stylesheet and font URLs resolve under the deployed base path, not only at the domain root.
- Confirm search and internal navigation assets exist when enabled.
- Confirm the dependency audit has no unresolved critical issues.
- Invoke repository CLI entrypoints through their runtime on cross-platform CI when executable permission bits are not guaranteed.
- Report what was changed, what was validated and what remains unpublished.

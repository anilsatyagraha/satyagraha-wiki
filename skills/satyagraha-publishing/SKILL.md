---
name: satyagraha-publishing
description: "This skill should be used when creating, converting, styling, naming, validating, or publishing Markdown and HTML artifacts for Satyagraha Law Group across wikis, websites, repositories, and AI-assisted workflows."
version: 1.1.0
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

Apply the Source family by default:

- Source Serif 4 for long-form legal text, provisions, quotations and tables.
- Source Sans 3 for titles, headings, navigation, controls and metadata.
- Source Code Pro for code, file paths and machine-readable text.
- Self-host production font files when practical and retain serif, sans-serif and monospace fallbacks.
- Use approximately 17px or larger body text, 1.7 article line height and a maximum paragraph measure of 76 characters.

## Detailed standard

Read [Publishing Standard](references/Publishing%20Standard%2029-08-2026%2010-26-26.md) before changing a publishing theme, generating HTML, or preparing a public repository.

## Completion checks

- Confirm the build exits successfully.
- Confirm the expected Markdown and HTML page counts.
- Confirm representative home, index and article pages exist.
- Confirm fonts are included or reliably referenced with fallbacks.
- Confirm search and internal navigation assets exist when enabled.
- Confirm the dependency audit has no unresolved critical issues.
- Report what was changed, what was validated and what remains unpublished.

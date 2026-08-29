# Satyagraha Publishing Standard

## Portability principle

Maintain one durable source of truth that can be understood and reused by multiple AI assistants and conventional developer tools. Do not assume the next operator uses the same model, application, plugin, operating system or proprietary instruction format.

## Preferred interchange formats

- Instructions and knowledge: UTF-8 Markdown.
- Public pages: semantic HTML5 and standards-based CSS.
- Structured configuration: JSON, YAML or TOML when supported by the target.
- Automation: documented scripts with explicit inputs, outputs and validation.
- Versioning and publication: Git repositories without embedded credentials.

## Canonical typography

| Purpose | Primary font | Portable fallback |
| --- | --- | --- |
| Legal and long-form text | Source Serif 4 | Georgia, serif |
| Interface and headings | Source Sans 3 | Arial, sans-serif |
| Code and file paths | Source Code Pro | Consolas, monospace |

Apply typography in one global theme or stylesheet. Do not add font declarations to each Markdown file. Self-host font files for stable production rendering when the licence and platform permit it.

## Readability baseline

- Body text must remain comfortable at normal browser zoom on desktop and mobile.
- Use a body size of approximately 16px and line height near 1.6.
- Keep long-form paragraphs at or below approximately 76 characters per line.
- Use genuine heading levels and maintain a single logical page title.
- Give tables responsive handling and prevent long URLs or citations from forcing horizontal page overflow.
- Preserve sufficient text contrast in light and dark modes.
- Ensure important navigation and controls remain keyboard accessible.

## Naming baseline

For ordinary newly generated files, use a descriptive name of no more than three words and no more than 60 pre-timestamp characters, followed by a space and `dd-mm-yyyy hour-minute-second`, then the extension.

Example: `Publishing Report 29-08-2026 10-26-26.html`

Mandatory ecosystem filenames are exceptions. Preserve names required by software specifications, including `SKILL.md`, `README.md`, `index.html`, `package.json`, manifests, hidden configuration files and framework-defined entrypoints.

Canonical wiki pages are stable-content exceptions to timestamped artifact naming. Give them readable Title-Case filenames with hyphens between words, such as `Civil-Procedure-Code-Order-5.md`. Preserve old published slugs through aliases or redirects whenever canonical filenames change.

## Cross-AI handoff

Every reusable workflow must state:

1. Purpose and triggering conditions.
2. Required inputs and their expected formats.
3. Ordered actions without model-specific assumptions.
4. Files created or modified.
5. Validation commands or observable success criteria.
6. Safety limits, credential handling and publication boundaries.
7. Recovery or rollback guidance for material changes.

Prefer deterministic scripts for repeatable transformations. Keep prose instructions tool-neutral, and add small platform adapters only when necessary.

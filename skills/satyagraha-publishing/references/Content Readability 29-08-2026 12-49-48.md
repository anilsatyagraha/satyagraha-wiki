# Content Readability

## Objective

Make legacy legal HTML readable as ordinary documents in Markdown and generated HTML without changing statutory meaning.

## Evidence

The source CPC archive contained separate paragraph elements for headings, provisions and sub-clauses. An earlier conversion flattened those elements into very long lines and also retained encoding and navigation debris.

## Selected approach

Use a deterministic UTF-8 conversion script to restore paragraph boundaries and semantic headings. Retain internal links using readable canonical names, render external and JavaScript link labels as plain text, and generate navigation outside the legal text. Keep the site white and black, use compact system typography, remove redundant Explorer and page-table-of-contents dropdowns, and place a wide search control below a two-line masthead.

## Guardrails

- Preserve source wording unless a correction is verified against an authoritative legal text.
- Never infer missing statutory language from context.
- Flag original transcription defects separately from conversion defects.
- Scan all generated Markdown for mojibake, replacement characters, external URLs, JavaScript URLs and malformed wiki links.
- Treat bracketed footnote markers inside wiki-link labels as unsafe syntax: retain readable label text without nested brackets and verify every destination exists.
- Build and inspect representative index, order, footnote, appendix and schedule pages locally before publication.
- Do not commit, push or deploy until the user approves the local preview.

## Remaining uncertainty

The historical source archive contains apparent typographical and transcription errors. Formatting restoration does not establish that its wording matches the current authoritative Code of Civil Procedure.

# Wiki Readability Decision

## Objective

Make all Satyagraha wiki pages easier to read and replace abbreviated CPC filenames and URLs with descriptive legal names.

## Evidence

- The global article override used 17px text and 1.7 line height.
- The CPC collection contained 146 abbreviated filenames such as `cpco5.md` and `cpc-f1.md`.
- The CPC table of contents and page navigation used the same abbreviated wikilinks.
- Quartz supports aliases and redirect generation.
- The Quartz font plugin emitted a domain-root stylesheet link that fails when GitHub Pages hosts the wiki under a repository subpath.
- GitHub's Linux runner could not execute the npm-linked Quartz CLI because the Windows-created repository did not retain an executable permission bit.

## Assumptions

- `cpc-f*` denotes footnotes, based on the inspected page content.
- Stable statute pages benefit from canonical filenames without timestamps.
- Existing public URLs may already be bookmarked or indexed.

## Alternatives

- Keep short filenames and change only displayed titles: rejected because URLs and source files would remain unreadable.
- Rename pages without redirects: rejected because existing links would break.
- Add timestamps to statute filenames: rejected because canonical legal pages are updated in place and require stable URLs.

## Decision

Use 16px body text with 1.6 line height throughout the wiki. Rename CPC pages into descriptive hyphenated families such as `Civil-Procedure-Code-Order-5.md` and `Civil-Procedure-Code-Footnotes-1.md`. Add readable frontmatter titles and preserve every former slug as an alias.

## Risks and guardrails

- Risk: broken internal or external links. Guardrail: rewrite wikilinks and generate redirects for old slugs.
- Risk: incorrect classification. Guardrail: derive families from source structure and inspect representative pages.
- Risk: source and publication divergence. Guardrail: apply the same deterministic migration to both trees.
- Risk: inaccessible small text. Guardrail: retain a 16px baseline and browser zoom support.
- Risk: fallback fonts caused by an incorrect deployment path. Guardrail: load the self-hosted font stylesheet through a path relative to the generated root stylesheet and test the deployed URL.
- Risk: cross-platform CI permission failure. Guardrail: invoke the Quartz entrypoint explicitly with Node.js instead of relying on npm's executable shim.

## Validation

Require equal source and publication page counts, zero abbreviated filenames, zero unresolved abbreviated wikilinks, successful Quartz builds, working old and new URLs, and HTTP 200 responses for the deployed font stylesheet and representative font files.

## Skill impact

Updated `satyagraha-publishing` to version 1.2.0 with smaller typography, descriptive canonical wiki filenames and mandatory redirects for renamed public pages.

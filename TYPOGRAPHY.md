# Satyagraha Publishing Typography Standard

Use this system for all current and future Satyagraha wiki and HTML publishing projects.

| Purpose | Typeface | Fallback |
| --- | --- | --- |
| Long-form text, legal provisions, quotations and tables | Source Serif 4 | Georgia, serif |
| Titles, headings, navigation, controls and metadata | Source Sans 3 | Arial, sans-serif |
| Code, file paths and machine-readable text | Source Code Pro | Consolas, monospace |

## Reading rules

- Default article text: `17px` equivalent or larger.
- Article line height: approximately `1.7`.
- Paragraph measure: no more than `76ch`.
- Heading line height: approximately `1.25`.
- Use real heading levels in Markdown rather than manually bolding titles.
- Do not specify fonts inside individual Markdown files. The publishing theme controls typography globally.
- Self-host the font files in production so the HTML remains consistent without relying on a visitor's installed fonts or a third-party runtime request.

## CSS variables

```css
--font-body: "Source Serif 4", Georgia, serif;
--font-interface: "Source Sans 3", Arial, sans-serif;
--font-code: "Source Code Pro", Consolas, monospace;
```

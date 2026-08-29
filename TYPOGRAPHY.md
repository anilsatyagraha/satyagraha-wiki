# Satyagraha Publishing Typography Standard

Use this system for all current and future Satyagraha wiki and HTML publishing projects.

| Purpose | Typeface | Fallback |
| --- | --- | --- |
| All text, headings, navigation, controls and tables | Native system sans-serif | Segoe UI, Arial, sans-serif |
| Code, file paths and machine-readable text | Native system monospace | Consolas, monospace |

## Reading rules

- Default article text: `14px` equivalent.
- Article line height: approximately `1.5`.
- Paragraph measure: no more than `76ch`.
- Heading line height: approximately `1.25`.
- Use real heading levels in Markdown rather than manually bolding titles.
- Do not specify fonts inside individual Markdown files. The publishing theme controls typography globally.
- Use a native system font stack so pages remain compact, fast and independent of font downloads.
- Use a plain white background and black text throughout pages, navigation and tables.

## CSS variables

```css
--font-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
--font-interface: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
--font-code: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
```

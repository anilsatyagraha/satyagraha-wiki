# Satyagraha Legal Wiki

This repository contains the public Satyagraha Legal Wiki. It converts approved Markdown notes into a searchable static HTML5 website using Quartz 5.

## Published content

The initial collection contains the Code of Civil Procedure, 1908, including its parts, orders, appendices, schedules, and forms.

## Local preview

Requirements:

- Node.js 22 or later
- npm 10.9.2 or later

Install and preview:

```powershell
npm install
npx quartz build --serve
```

The preview is normally available at `http://localhost:8080`.

## Update the wiki content

Run the local sync helper from this repository:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\sync-content.ps1
```

Review the changed Markdown files before committing them.

## Build HTML5

```powershell
npx quartz build
```

The generated static website is written to `public/`.

## Deployment

Pushing the `main` branch triggers `.github/workflows/deploy.yml`, which builds the website and publishes the generated files to GitHub Pages.

## Content safety

Do not add client files, privileged communications, private research, credentials, API keys, or unpublished drafts to this public repository.

## Attribution

The publishing framework is [Quartz](https://github.com/jackyzha0/quartz), distributed under the MIT License. See `LICENSE.txt`.

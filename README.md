# Kollege Apply - Web Development Intern Assessment (Starter Project)

This repository contains a ready-to-deploy starter project for the Kollege Apply web development assessment:
- Two single-page landing pages (`public/index.html` and `public/lp2.html`)
- Shared CSS and JS (`public/css/styles.css`, `public/js/app.js`)
- A minimal Express server that serves the static site and exposes simple APIs (`/api/fees/:uni`, `/api/leads`)

## How to run locally

1. Install Node.js (v16+ recommended).
2. Extract the project and in the project root run:
   ```
   npm install
   npm start
   ```
3. Open http://localhost:3000 in your browser.

## Pipedream endpoint

The client-side JS posts lead data to a Pipedream webhook. Replace the placeholder value in `public/js/app.js`:

```
let PIPEDREAM_ENDPOINT = 'https://REPLACE_WITH_YOUR_PIPEDREAM_ENDPOINT.m.pipedream.net';
```

Create a workflow in Pipedream that accepts HTTP requests and copy the URL into the file above (or update at runtime using environment/config).

## API details

- `GET /api/fees/:uni` — returns nested JSON for course fee ranges. Supported `uni` values: `sunrise`, `metro`.
- `POST /api/leads` — stores leads in memory (for local testing) and returns a small JSON confirmation.

## Deploying

- Static files can be hosted on Vercel/Netlify. For APIs, either:
  - Deploy the Express server on Render/Railway/Heroku, or
  - Convert `GET /api/fees/:uni` and `POST /api/leads` into serverless functions on Vercel/Netlify

## What to submit
- Provide live HTTPS URLs for both landing pages.
- Include a drive/repo link containing the project (this zip).

---

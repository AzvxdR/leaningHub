# Academic Support Hub

Ethical academic assistance for university students — coaching, editing,
feedback, and formatting support. Single-page React + Vite + Tailwind site.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Launch for free

The site is fully static, so any static host works. Best free options:

### 1) Vercel (recommended)
1. Push the project to a GitHub repository.
2. Go to https://vercel.com → "Add New Project" → import the repo.
   Vercel auto-detects Vite (build: `npm run build`, output: `dist`).
3. In Project Settings → Environment Variables, add:
   `VITE_FORMSPREE_ID` = your Formspree form id (see below).
4. Deploy — you get `https://your-project.vercel.app` with HTTPS included.

### 2) Netlify
1. https://app.netlify.com → "Add new site" → import from GitHub,
   or drag-and-drop the `dist/` folder directly onto the dashboard.
2. Set `VITE_FORMSPREE_ID` under Site Settings → Environment variables.
3. Free URL: `https://your-project.netlify.app`.
   (Netlify Forms is also an alternative to Formspree: add
   `netlify` to the <form> attributes and it works with no account.)

### 3) Cloudflare Pages
1. https://pages.cloudflare.com → connect the repo.
   Build command `npm run build`, output directory `dist`.
2. Add `VITE_FORMSPREE_ID` as an environment variable, then deploy.

### 4) GitHub Pages
Works, but requires setting `base: '/<repo-name>/'` in vite.config.ts
so asset URLs resolve under the repo path. Prefer Vercel/Netlify unless
you specifically want gh-pages.

## Wire up the request form (free)

1. Create a free account at https://formspree.io
2. "New form" → name it → set **Send To:** abdulaziz.ghanem@web.de
3. Verify the inbox via the confirmation email Formspree sends.
4. Set `VITE_FORMSPREE_ID=yourFormId` (locally in a `.env` file,
   on the host as an environment variable) and redeploy.

Free tier: 50 submissions/month — plenty for a small business.
Without the id, the form falls back to opening a pre-filled email
to abdulaziz.ghanem@web.de, so the site works even before setup.

## Custom domain (optional)

A domain like `academic-support-hub.com` costs ~€10/year (e.g. at
INWX, Namecheap, or Cloudflare Registrar). All three hosts above let
you attach it for free with automatic HTTPS.

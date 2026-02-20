# ekkOS Labs

This repository contains the **official research site** for ekkOS Labs — the research division of ekkOS Technologies Inc.

> **Note:** Forks or mirrors of this repository may be outdated. For the live site, visit [ekkoslabs.com](https://ekkoslabs.com).

---

## What This Site Does

ekkOS Labs publishes:

- Research articles and findings
- Technical roadmap updates
- Innovation initiatives

---

## What This Repository Does NOT Document

This repository intentionally does not describe:
- Internal research methodology
- Proprietary algorithms or systems
- Infrastructure topology

---

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Vercel** (deployment)

---

## Development

```bash
npm install
npm run dev
```

---

## Project Structure

```
apps/labs/
├── app/                    # Next.js app directory
│   ├── page.tsx            # Home page
│   ├── research/           # Research index and detail pages
│   ├── about/              # About page
│   ├── roadmap/            # Roadmap page
│   └── layout.tsx          # Root layout
├── components/             # React components
├── lib/                    # Utilities and data
│   ├── research.ts         # Research articles data
│   └── markdown.tsx        # Markdown renderer
└── public/                 # Static assets
```

---

## Adding Research Articles

1. Add article data to `lib/research.ts`
2. The article appears automatically at:
   - `/research` (index)
   - `/research/[slug]` (detail)

---

## Deployment

Configured for Vercel:

1. Connect repository to Vercel
2. Set project directory to `apps/labs`
3. Deploys automatically on push to main

---

## License & Trademarks

**ekkOS** and the ekkOS logo are trademarks of ekkOS Technologies Inc.

Unauthorized reproduction or distribution of ekkOS trademarks or branding assets is prohibited.

Copyright © ekkOS Technologies Inc.

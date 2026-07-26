# DigitalHeros Marketing Site

Multi-page marketing site for a B2B software company. Built with **React + Vite** and CSS.

**Live site:** 
**Source:** [github.com/Anjali17aj/Marketing-site](https://github.com/Anjali17aj/Marketing-site)

## Pages

| Page | Route | Structured data |
|------|-------|-----------------|
| Home | `/` | Organization |
| Product | `/product` | Organization + SoftwareApplication |
| Pricing | `/pricing` | Organization + FAQPage |
| Contact | `/contact` | Organization |


## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
npm run build    # production build - dist/
npm run preview  # preview the production build
```

## Project structure

```
public/           # Static assets (favicon, SVGs, OG image)
src/
  components/     # Layout, sections, and shared UI
  content/        # JSON copy (edit marketing text here)
  context/        # Theme provider (light / dark)
  hooks/          # Animation helpers
  pages/          # Route-level page composition
  seo/            # Meta tags + JSON-LD builders
  styles/         # Design tokens, global CSS, animations
vite.seo-plugin.js  # Injects SEO into built HTML per route
```

**Content separation:** Marketing copy lives in `src/content/*.json`. Pages read JSON and render through shared components, so copy can change without touching layout code.

| File | Purpose |
|------|---------|
| `site.json` | Company name, URL, contact, social links |
| `home.json` | Home hero, features, lifecycle, CTAs |
| `product.json` | Product page copy + SoftwareApplication schema |
| `pricing.json` | Plans, FAQs |
| `contact.json` | Contact page copy |
| `testimonials.json` | Customer quotes |

## Features

- Light / dark theme with system preference detection and persistent toggle
- Scroll reveals, page transitions, and staggered section motion
- Responsive layout with skip link, semantic landmarks, and keyboard-friendly nav
- Build-time SEO: unique title, description, canonical, Open Graph, and Twitter tags per route
- JSON-LD (Organization, SoftwareApplication, FAQPage) written into static HTML so crawlers do not need JavaScript


## SEO & structured data

Meta tags and JSON-LD are injected into the **built HTML** for every route (`vite.seo-plugin.js` + `src/seo/siteMeta.js`). Client-side navigation still updates the document head via `SEO.jsx`.


## Accessibility

- Semantic landmarks: `header`, `nav`, `main`, `footer`, `section`
- One `<h1>` per page with logical heading order
- Skip link to `#main-content`
- Keyboard-navigable menu and visible `:focus-visible` styles
- Form labels linked with `htmlFor`
- Images include descriptive `alt` text

## Tech stack

- React 19
- Vite 7
- React Router 7
- Plain CSS (design tokens in `src/styles/tokens.css`)

## License

MIT — fictional company for portfolio / assessment use.

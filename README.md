# ARTORA — Art Collection Explorer

**Discover Art. Explore Stories.**

ARTORA is a digital art museum and collection explorer powered by the official [Art Institute of Chicago Public API](https://api.artic.edu/docs/) and its IIIF Image Service.

> **Branch Policy:** The `main` branch contains **only** the minimal project foundation, centralized API client, shared folder structure, and design system (`DESIGN.md`). All pages, UI components, and features are developed independently in dedicated feature branches.

---

## Tech Stack

- **React** + **Vite** (JavaScript)
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **React Router DOM**
- **Axios**
- **Lucide React**

---

## Folder Structure

```text
src/
├── assets/             # Static images, icons, and media assets
├── components/         # Shared reusable UI components (built in feature branches)
├── layouts/            # Shared page layout shells
├── pages/              # Route-level pages (built in feature branches)
├── services/
│   ├── api.js          # Centralized Axios client (15s timeout, AIC-User-Agent)
│   ├── artworkService.js # Artworks, search, and category-terms API helpers
│   └── artistService.js  # Artists (agents) API helpers
├── hooks/              # Custom React hooks
├── utils/
│   └── imageHelper.js  # IIIF image URL builder & HTML stripping utilities
├── App.jsx             # Minimal React Router entry point
├── main.jsx            # React DOM root mount
└── index.css           # Tailwind CSS import & ARTORA design tokens
```

---

## Getting Started

### 1. Clone & Install Dependencies

```bash
git clone <repository-url>
cd ARTORA
npm install
```

### 2. Configure Environment Variables

The Art Institute of Chicago API is public and does not require an API key, though sending an `AIC-User-Agent` header is recommended. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Default `.env` values:

```env
VITE_AIC_API_BASE_URL=https://api.artic.edu/api/v1
VITE_AIC_USER_AGENT=ARTORA (artora@example.com)
```

### 3. Start the Development Server

```bash
npm run dev
```

### 4. Lint & Production Build

```bash
npm run lint
npm run build
```

---

## API Foundation (`src/services/`)

- **`src/services/api.js`** — Centralized Axios instance pointing to `https://api.artic.edu/api/v1` with a `15000ms` timeout, `AIC-User-Agent` header, lightweight in-memory response caching, and normalized error handling.
- **`src/services/artworkService.js`** — Base functions for `fetchArtworks`, `searchArtworks`, `fetchArtworkById`, `fetchRelatedArtworks`, and `fetchCategoryTerms`.
- **`src/services/artistService.js`** — Base functions for `searchArtists`, `fetchArtistById`, and `fetchArtworksByArtist`.
- **`src/utils/imageHelper.js`** — Helpers for building IIIF image URLs (`400px` thumbnails and `843px` detail views) and stripping HTML tags from API descriptions.

---

## Design System

All feature branches **must** follow [DESIGN.md](./DESIGN.md) as the single source of truth for colors, typography, spacing, artwork presentation, accessibility, and component specifications.

---

## Feature Branch Workflow

1. Pull the latest `main` before starting new work.
2. Create a dedicated feature branch (e.g., `feature/homepage`, `feature/artwork-explorer`, `feature/artist-explorer`, `feature/artwork-detail`).
3. Follow `DESIGN.md` and reuse shared tokens in `src/index.css` and API services in `src/services/`.
4. Run `npm run lint` and `npm run build` before opening a Pull Request into `main`.

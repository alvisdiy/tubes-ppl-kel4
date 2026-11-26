# ARTORA — Design System & Visual Guidelines

> **Official Design Reference & Single Source of Truth**  
> **Product:** ARTORA — Art Collection Explorer  
> **Tagline:** *"Discover Art. Explore Stories."*  
> **Data Source:** Art Institute of Chicago Public API (`https://api.artic.edu/docs/`)

---

## Table of Contents

1. [Project Identity](#1-project-identity)
2. [Design Philosophy](#2-design-philosophy)
3. [Visual Identity & Color System](#3-visual-identity--color-system)
4. [Typography System](#4-typography-system)
5. [Spacing, Grid & Layout System](#5-spacing-grid--layout-system)
6. [Artwork Presentation System](#6-artwork-presentation-system)
7. [Page-by-Page Design Guidelines](#7-page-by-page-design-guidelines)
8. [Component Design Guidelines](#8-component-design-guidelines)
9. [Interaction & Motion System](#9-interaction--motion-system)
10. [Responsive Design](#10-responsive-design)
11. [Accessibility Guidelines](#11-accessibility-guidelines)
12. [API Data Presentation Rules](#12-api-data-presentation-rules)
13. [Design Consistency Rules for Team Members](#13-design-consistency-rules-for-team-members)
14. [Design Quality Checklist](#14-design-quality-checklist)

---

## 1. Project Identity

| Attribute | Definition |
| :--- | :--- |
| **Product Name** | ARTORA |
| **Product Type** | Digital Art Museum & Collection Explorer |
| **Tagline** | *"Discover Art. Explore Stories."* |
| **Primary Data Source** | Art Institute of Chicago Public API (`https://api.artic.edu/api/v1`) |
| **Image Delivery** | Art Institute of Chicago IIIF Image API 2.0 (`https://www.artic.edu/iiif/2`) |

### Brand Concept

ARTORA is an immersive digital art museum that brings the architectural serenity, curatorial rigor, and spatial generosity of a prestigious physical art gallery into a web experience. Visitors should feel as though they are stepping through a grand museum entrance, walking through sunlit and spotlighted exhibition halls, pausing before framed masterpieces, and reading wall placards authored by art historians.

### What ARTORA Is — and Is Not

| ARTORA **IS** | ARTORA **IS NOT** |
| :--- | :--- |
| A sophisticated digital extension of a prestigious art museum | An e-commerce platform (no prices, carts, or "buy" badges) |
| A curated editorial publication and exhibition space | A generic artwork catalog of uniform product cards |
| An atmospheric, unhurried environment for art contemplation | A SaaS dashboard with charts, metrics, or admin widgets |
| Grounded in authentic provenance and museum metadata | A database management interface or raw API table |

### Brand Personality

- **Sophisticated** — Refined architectural proportions, restrained ornament, and museum-grade typography.
- **Cultural** — Anchored in art history, provenance, and institutional authority.
- **Timeless** — Warm archival neutrals, deep gallery burgundy, and classical serif hierarchy that outlast UI trends.
- **Editorial** — Story-first layouts inspired by exhibition catalogues and museum monographs.
- **Minimal** — Every UI element earns its place; negative space functions as gallery wall architecture.
- **Immersive** — Dramatic dark gallery rooms (museum entrance and feature walls) balanced by sunlit ivory exhibition halls.
- **Curatorial** — Organized like physical museum wings: departments, categories, artist archives, and wall placards.

---

## 2. Design Philosophy

Every layout, component, and interaction in ARTORA must uphold these six principles:

### 2.1 Museum Immersion
Create the feeling of physically entering an art gallery.
- **Implementation:** Open the Homepage with a full-bleed architectural museum hero (vaulted ceilings, deep burgundy gallery walls, gilded framed paintings, and warm overhead lighting) paired with a translucent overlay navbar and bottom exhibition shortcut bar. Transition cleanly into sunlit Warm Ivory (`#F5F0E7`) exhibition halls for browsing.

### 2.2 Art First
The artwork is always the visual focal point—never the interface chrome.
- **Implementation:** Keep navigation, filters, and metadata visually quiet. Never overlay badges, category pills, favorite buttons, or text directly on top of an artwork image. Surround artworks with generous wall/mat space so the visitor's eye goes straight to the work.

### 2.3 Editorial Storytelling
Present artwork information like a premium museum publication and physical wall placard.
- **Implementation:** Pair expressive serif titles with clean, structured sans-serif provenance (artist, lifespan, date, medium, dimensions, credit line). Favor asymmetric editorial compositions where curatorial essays sit beside the artwork rather than cramped underneath it.

### 2.4 Visual Breathing Space
Generous spacing and restrained layouts invite slow, deliberate viewing.
- **Implementation:** Enforce `64px`–`96px` vertical section padding on desktop, `24px`–`32px` gaps between framed works in a gallery grid, and `20px`–`32px` internal padding inside cards and placards. Never pack more than 3 primary artwork cards per row on desktop.

### 2.5 Timeless Elegance
Avoid decorative UI trends, neon highlights, heavy drop shadows, and visual noise.
- **Implementation:** Use crisp `1px` hairline borders (`#E2DACD`), subtle tonal layering between Warm Ivory (`#F5F0E7`), Limestone Tint (`#EDE6DA`), and Warm White (`#FAF8F3`), and authoritative typographic contrast instead of heavy shadows or gradients.

### 2.6 Consistency
Every page must feel like an adjoining room inside the same museum.
- **Implementation:** All routes—Homepage, Artwork Explorer, Artist Archive, Artwork Detail, and Collections—share identical design tokens, typography scales, header/footer structure, button variants, and museum-label formatting.

---

## 3. Visual Identity & Color System

ARTORA's color system pairs warm archival paper and limestone tones with deep gallery burgundy and muted antique gold. **Do not introduce excessive or unapproved accent colors.**

### 3.1 Core Palette

| Token | Color Name | Hex | Role & Usage |
| :--- | :--- | :--- | :--- |
| `--color-bg-primary` | **Warm Ivory** | `#F5F0E7` | Primary page background (sunlit museum hall walls) |
| `--color-accent-primary` | **Deep Burgundy** | `#451D1D` | Primary accent, primary CTAs, editorial placard titles, dark feature walls |
| `--color-text-primary` | **Dark Charcoal** | `#211D19` | Primary headings, artwork titles, high-contrast body ink |
| `--color-accent-secondary` | **Muted Gold** | `#B79A6A` | Secondary accent, active underlines, frame/plaque rules, focus rings |
| `--color-surface` | **Warm White** | `#FAF8F3` | Elevated surfaces, museum wall placards, cards, form inputs |

### 3.2 Extended Semantic Tokens

Use these derived tokens for borders, muted metadata, dark gallery rooms, image mats, and interactive/status states:

| Token | Name | Hex / Value | Usage |
| :--- | :--- | :--- | :--- |
| `--color-bg-secondary` | **Limestone Tint** | `#EDE6DA` | Artwork mat/passe-partout container, subtle section bands, avatar wells |
| `--color-bg-gallery-dark` | **Gallery Obsidian** | `#1A1614` | Dark gallery hero backdrop, private-viewing dark wall option, dark footer |
| `--color-bg-gallery-burgundy` | **Exhibition Oxblood** | `#321414` | Deep burgundy gallery feature walls (hero & curated exhibition bands) |
| `--color-bg-gallery-slate` | **Curatorial Slate** | `#272B2E` | Cool charcoal-slate gallery wall for high-contrast wall-plaque showcases |
| `--color-surface-elevated` | **Pure Parchment** | `#FFFFFF` | High-contrast wall placards, dropdown menus, popovers |
| `--color-text-secondary` | **Warm Stone** | `#5C554C` | Subtitles, artist attribution, secondary body text (WCAG AA compliant) |
| `--color-text-muted` | **Archival Ash** | `#756E63` | Captions, metadata keys, input placeholders, pagination counters |
| `--color-text-on-dark` | **Ivory Ink** | `#F5F0E7` | Primary headings and body copy on dark gallery backgrounds |
| `--color-text-on-dark-muted` | **Muted Linen** | `#C9C0B3` | Secondary descriptions and eyebrows on dark gallery backgrounds |
| `--color-border-subtle` | **Gesso Border** | `#E2DACD` | Hairline `1px` dividers, card borders, tombstone metadata rules |
| `--color-border-strong` | **Bronze Rule** | `#C8B9A3` | Input borders, secondary button borders, hover separators |
| `--color-accent-primary-hover` | **Burgundy Highlight** | `#5C2727` | Hover state for Deep Burgundy buttons and links |
| `--color-accent-primary-active` | **Wine Shadow** | `#311313` | Active/pressed state for Deep Burgundy controls |
| `--color-accent-secondary-text` | **Antique Bronze** | `#7A5E35` | Accessible dark-gold text on light `#F5F0E7`/`#FAF8F3` surfaces |
| `--color-focus-ring` | **Muted Gold Ring** | `#B79A6A` | Keyboard `:focus-visible` outline (`2px solid`, `2px` offset) |
| `--color-mat-bg` | **Gallery Mat** | `#EDE6DA` | Neutral non-competing background behind framed artwork images |
| `--color-mat-border` | **Mat Bevel** | `#DDD4C5` | Subtle inner `1px` border around artwork mat containers |
| `--color-status-error` | **Venetian Red** | `#8B2626` | Error icons, error headings, invalid form borders |
| `--color-status-error-bg` | **Rose Wash** | `#F9ECEC` | Subtle error banner surface |
| `--color-status-success` | **Olive Patina** | `#3D5A45` | Confirmation messages (e.g., link copied) |

### 3.3 CSS Variables & Tailwind v4 `@theme` Implementation

> **Codebase Alignment Note:** `src/index.css` currently uses an earlier baseline (`#F5F3EE`, `#24231F`, `#9A7856`, `Plus Jakarta Sans`). Coordinate a single token-migration PR with the Maintainer to adopt these official tokens across `src/index.css` and `index.html`.

```css
:root {
  /* Core Palette */
  --color-bg-primary: #F5F0E7;
  --color-bg-secondary: #EDE6DA;
  --color-surface: #FAF8F3;
  --color-surface-elevated: #FFFFFF;

  /* Dark Gallery Sections */
  --color-bg-gallery-dark: #1A1614;
  --color-bg-gallery-burgundy: #321414;
  --color-bg-gallery-slate: #272B2E;

  /* Brand Accents */
  --color-accent-primary: #451D1D;
  --color-accent-primary-hover: #5C2727;
  --color-accent-primary-active: #311313;
  --color-accent-secondary: #B79A6A;
  --color-accent-secondary-text: #7A5E35;

  /* Text Hierarchy */
  --color-text-primary: #211D19;
  --color-text-secondary: #5C554C;
  --color-text-muted: #756E63;
  --color-text-on-dark: #F5F0E7;
  --color-text-on-dark-muted: #C9C0B3;

  /* Borders & Image Mat */
  --color-border-subtle: #E2DACD;
  --color-border-strong: #C8B9A3;
  --color-mat-bg: #EDE6DA;
  --color-mat-border: #DDD4C5;

  /* Interactive & Status */
  --color-focus-ring: #B79A6A;
  --color-status-error: #8B2626;
  --color-status-error-bg: #F9ECEC;
  --color-status-success: #3D5A45;
}
```

Tailwind CSS v4 `@theme` block for `src/index.css`:

```css
@theme {
  --color-ivory: #F5F0E7;
  --color-limestone: #EDE6DA;
  --color-warm-white: #FAF8F3;
  --color-burgundy: #451D1D;
  --color-burgundy-hover: #5C2727;
  --color-charcoal: #211D19;
  --color-stone: #5C554C;
  --color-ash: #756E63;
  --color-gold: #B79A6A;
  --color-bronze: #7A5E35;
  --color-gesso: #E2DACD;
  --color-gallery-dark: #1A1614;
  --color-gallery-oxblood: #321414;
  --color-gallery-slate: #272B2E;

  --font-serif: "Cormorant Garamond", Georgia, Cambria, "Times New Roman", serif;
  --font-sans: "Inter", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
```

---

## 4. Typography System

ARTORA establishes museum character by pairing an **editorial serif** for exhibition titles with a **crisp sans-serif** for navigation, metadata, and curatorial reading.

### 4.1 Font Families

| Role | Primary Typeface | Approved Alternatives | Fallback Stack |
| :--- | :--- | :--- | :--- |
| **Heading / Editorial** | `Cormorant Garamond` | `Playfair Display`, `DM Serif Display` | `Georgia, Cambria, "Times New Roman", serif` |
| **Body / UI / Metadata** | `Inter` | `DM Sans`, `Manrope`, `Plus Jakarta Sans` | `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` |

> **Usage Rule:** Use serif typography strictly for **hero headlines, exhibition titles, artwork titles, artist headings, and major section headings**. Never apply serif to navigation items, body paragraphs, form controls, filter labels, or pagination controls.

### 4.2 Type Scale & Tokens

| Token | Usage | Font | Desktop Size | Mobile Size | Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `--type-display` | Homepage Hero Headline | Serif | `4.5rem` (`72px`) | `2.5rem` (`40px`) | `500` | `1.05` | `-0.02em` |
| `--type-h1` | Page / Artwork Detail Title | Serif | `3rem` (`48px`) | `2rem` (`32px`) | `600` | `1.12` | `-0.015em` |
| `--type-h2` | Section / Exhibition Heading | Serif | `2.125rem` (`34px`) | `1.625rem` (`26px`) | `600` | `1.20` | `-0.01em` |
| `--type-h3` | Artwork / Artist Card Title | Serif | `1.375rem` (`22px`) | `1.25rem` (`20px`) | `600` | `1.30` | `0em` |
| `--type-lead` | Curatorial Subtitle / Intro | Sans | `1.125rem` (`18px`) | `1rem` (`16px`) | `400` | `1.60` | `0em` |
| `--type-body` | Artwork Essays & Biographies | Sans | `1rem` (`16px`) | `0.9375rem` (`15px`) | `400` | `1.70` | `0em` |
| `--type-meta` | Attribution, Dates, Medium | Sans | `0.875rem` (`14px`) | `0.875rem` (`14px`) | `400` / `500` | `1.50` | `0.005em` |
| `--type-caption` | Credit Lines, Placard Notes | Sans | `0.75rem` (`12px`) | `0.75rem` (`12px`) | `400` | `1.45` | `0.01em` |
| `--type-eyebrow` | Institutional / Dept Label | Sans | `0.6875rem` (`11px`) | `0.6875rem` (`11px`) | `600` | `1.20` | `0.20em` (UPPERCASE) |

### 4.3 Editorial Typography Rules

1. **Reading Measure:** Constrain long descriptions and artist biographies to `max-width: 65ch` (`~620px–680px`).
2. **Tabular Numerals:** Apply `font-variant-numeric: tabular-nums` on lifespan dates (`1853 – 1890`), pagination numbers, and collection counts.
3. **Italic Serif:** Use `Cormorant Garamond` *italic* only for artwork titles referenced within prose or exhibition subtitles.

---

## 5. Spacing, Grid & Layout System

### 5.1 Spacing Scale (4px Base Unit)

| Token | Value | Application |
| :--- | :--- | :--- |
| `--space-1` | `4px` (`0.25rem`) | Tight icon-to-text gaps, hairline offsets |
| `--space-2` | `8px` (`0.5rem`) | Label-to-value gaps, small chip padding |
| `--space-3` | `12px` (`0.75rem`) | Metadata row spacing, compact controls |
| `--space-4` | `16px` (`1rem`) | Mobile page gutter, mat inner padding, input padding |
| `--space-5` | `20px` (`1.25rem`) | Card body padding, mobile grid gap |
| `--space-6` | `24px` (`1.5rem`) | Tablet page gutter, placard padding, tablet grid gap |
| `--space-8` | `32px` (`2rem`) | Desktop page gutter, desktop gallery grid gap |
| `--space-12` | `48px` (`3rem`) | Page header bottom margin, major block separation |
| `--space-16` | `64px` (`4rem`) | Mobile/tablet section vertical padding |
| `--space-24` | `96px` (`6rem`) | Desktop section vertical padding |

### 5.2 Container Widths

| Token | Value | Usage |
| :--- | :--- | :--- |
| `--container-max` | `1280px` (`max-w-7xl`) | Standard page content width (aligned with `MainLayout.jsx`) |
| `--container-wide` | `1440px` (`90rem`) | Full-bleed hero inner bounds & wide exhibition bands |
| `--container-narrow` | `896px` (`max-w-4xl`) | Artist archive header & editorial essay columns |

### 5.3 Gallery Layout & Asymmetric Rules

- **Asymmetric Editorial Sections:** Do not make every section a uniform grid of identical cards. Use `7/5` or `6/6` asymmetric splits on Homepage curated highlights, Artist Detail views, and Artwork Detail pages.
- **Exhibition Grid Density:** Maximum `3` artwork columns on desktop (`lg:grid-cols-3`) with `32px` (`gap-8`) spacing. A `4`-column strip (`lg:grid-cols-4`) is permitted only for compact "Related Artworks" rows on Artwork Detail pages.
- **Gallery Whitespace:** Every artwork must sit in generous surrounding space so neighboring pieces never visually crowd each other.

### 5.4 Responsive Breakpoints

| Breakpoint | Min Width | Primary Grid Columns | Layout Behavior |
| :--- | :--- | :--- | :--- |
| **Mobile** | `< 640px` | `1` | Single-column gallery, stacked detail view, slide-down nav drawer |
| **Small Tablet (`sm`)** | `640px` | `2` | 2-column artwork & artist grids, `24px` gutters |
| **Tablet (`md`)** | `768px` | `2`–`3` | Desktop inline navbar appears; search/filter toolbar sits inline |
| **Desktop (`lg`)** | `1024px` | `3` (or `7/5` split) | Full 3-column exhibition hall, side-by-side Private Viewing layout |
| **Wide Desktop (`xl`)** | `1280px` | `3`–`4` (max) | Content reaches `1280px` max-width with generous outer ivory margins |

---

## 6. Artwork Presentation System

Artwork presentation is the defining craft of ARTORA. Every piece must be displayed with the visual respect of a physical museum hanging.

### 6.1 Aspect Ratio & Containment Rules

- **Never Crop Important Artwork Content:** Artworks come in tall vertical portraits, wide panoramic scrolls, circular medallions, and square canvases.
  - **Artwork Detail (Private Viewing):** Always render with `object-contain`, `max-w-full`, and `max-h-[75vh]` (`max-h-[60vh]` on mobile) so 100% of the composition is visible without cropping.
  - **Artwork Explorer (`ArtworkCard`):** Present artworks inside a `4:3` or `4:5` Limestone Tint (`#EDE6DA`) mat frame with `16px` (`p-4`) inner padding and `object-contain` so every painting's authentic proportion is preserved like a matted print or framed canvas on a gallery wall.
- **Never Distort:** Never apply fixed width + height without `object-contain` or `height: auto`.

### 6.2 Framing & Background Treatment

- **Matted Card Frame:** `#EDE6DA` (Limestone Tint) mat background with `1px solid #DDD4C5` subtle bevel border, paired with a `#FAF8F3` (Warm White) outer card surface.
- **Private Viewing Stage:** Present the artwork on a generously padded `#EDE6DA` (or optional `#1A1614` dark gallery wall) stage with soft ambient elevation (`box-shadow: 0 18px 44px rgba(33, 29, 25, 0.14)`), simulating museum track lighting.
- **Strict Zero-Overlay Rule:** Never place text, badges, icons, or buttons on top of an artwork image.

### 6.3 Museum Wall Placard (`ArtworkLabel`)

Modeled after physical museum wall placards:
1. **Department Eyebrow:** `department_title` (`11px`, uppercase, `0.2em` tracking, `#7A5E35`).
2. **Artist Attribution:** `artist_title` (or first line of `artist_display`), Sans `14px` `font-medium`, `#211D19` / `#5C554C`.
3. **Artwork Title:** `title`, `Cormorant Garamond` `20px–36px` `font-semibold`, `#451D1D` (Deep Burgundy) on formal wall placards or `#211D19` on standard cards.
4. **Creation Date:** `date_display`, Sans `14px`, `#5C554C`.
5. **Medium & Dimensions:** `medium_display` and `dimensions`, Sans `13px–14px`, `#5C554C`.
6. **Institutional Credit:** `credit_line`, Sans `12px`, `#756E63`.

### 6.4 IIIF Sizing & Missing Image Fallback

- **Card Thumbnails:** `https://www.artic.edu/iiif/2/{image_id}/full/400,/0/default.jpg` (`loading="lazy"`).
- **Detail / Hero Feature:** `https://www.artic.edu/iiif/2/{image_id}/full/843,/0/default.jpg` (`loading="eager"`).
- **Missing Image Fallback:** When `image_id` is `null` or the image fails (`onError`), render a `#EDE6DA` mat container with a centered minimalist `Frame` icon (`lucide-react`, `strokeWidth={1.25}`, `#B79A6A`) and concise archival label: `"Archival image unavailable"` (`12px`, `#756E63`). Never display broken image icons or stock photos.

---

## 7. Page-by-Page Design Guidelines

### A. Homepage — Museum Entrance (`/`)

The first viewport (`min-h-[640px] lg:h-[88vh] max-h-[900px]`) must immediately evoke stepping into a grand physical museum.

- **Required Elements:**
  1. **Minimal Overlay Navigation:** Translucent header across the top of the hero with `ARTORA` serif wordmark + `Art Collection Explorer` subtitle, centered links (`Home`, `Artworks`, `Artists`, `Departments`/`Collections`), search icon trigger, and Warm Ivory (`#F5F0E7`) pill CTA (`Explore Collection`).
  2. **Immersive Architectural Hero:** Full-bleed photograph of a classical museum gallery (deep burgundy walls, gilded frames, vaulted skylight, stone columns, central gallery bench) with a soft dark vignette (`linear-gradient(180deg, rgba(26,22,20,0.6) 0%, rgba(26,22,20,0.45) 55%, rgba(26,22,20,0.82) 100%)`).
  3. **Editorial Hero Copy (Centered):**
     - Eyebrow: `THE ART INSTITUTE OF CHICAGO` (`11px`, uppercase, `0.25em` tracking, `#C9C0B3`).
     - Display Headline: `Discover Art Collection` (`Cormorant Garamond`, `72px` desktop / `40px` mobile, `#F5F0E7`).
     - Subtitle: 1–2 concise lines (`18px`, `#E2DACD`, `max-w-[540px]`).
     - Primary CTA: Warm Ivory button (`#F5F0E7` bg, `#211D19` text) reading `Explore Artworks →`.
  4. **Bottom Exhibition Shortcuts Bar:** Anchored at the base of the hero as a translucent dark glass bar (`rgba(26, 22, 20, 0.78)`, `backdrop-filter: blur(12px)`, `1px solid rgba(245, 240, 231, 0.14)`) with 4 shortcuts: `Artworks`, `Artists`, `Departments`, `Categories`—each with a crisp `1.5px` line icon, title, and 3-word subtitle.
- **Below the Fold:**
  - **Curated Highlights (Sunlit Ivory Hall):** Asymmetric editorial showcase of 3–4 API-fetched masterpieces with generous whitespace and museum labels.
  - **Curatorial Spotlight Band (Deep Burgundy `#321414` or Gallery Obsidian `#1A1614`):** Highlights a featured department or masterpiece with ivory typography and high-contrast framing.

### B. Artwork Explorer — Exhibition Hall (`/artworks`)

Feels like strolling through a bright, spacious exhibition hall.

- **Required Elements:**
  - **Exhibition Header:** Serif `H1` (`Exhibition Hall`), brief curatorial subtitle, and live result count (`tabular-nums`).
  - **Search & Filter Toolbar:** `SearchBar` + `FilterPanel` (Department & Category dropdowns) in Warm White (`#FAF8F3`) with hairline `#C8B9A3` borders and removable active filter chips.
  - **Editorial Gallery Grid:** `3` columns on desktop (`lg:grid-cols-3`, `gap-8`), `2` on tablet, `1` on mobile.
  - **Artwork Cards:** Matted artwork image (`object-contain`), title, artist attribution, creation date, and department. Zero e-commerce styling.
  - **Pagination:** Centered museum-style pagination bar at the bottom.

### C. Artist Explorer — Artist Archive (`/artists`)

An archival directory and biographical reading room.

- **Required Elements:**
  - **Archive Header & Search:** Serif `H1` (`Artist Archive`) + live artist search (`GET /agents/search` with `is_artist=true`).
  - **Artist Cards Grid:** `3` columns on desktop (`gap-6`), showing portrait (when available) or refined archival emblem, artist name (serif), lifespan (`birth_date – death_date`), and 2–3 line biographical excerpt.
  - **Artist Profile & Associated Artworks:** Selecting an artist opens an editorial profile panel or route displaying full cleaned biography (`stripHtml(description)`), historical dates, and an **Associated Artworks** gallery (`fetchArtworksByArtist`) using `ArtworkCard`.

### D. Artwork Detail — Private Viewing (`/artworks/:id`)

Feels like standing quietly in front of a single masterpiece.

- **Required Elements:**
  - **Wayfinding:** Subtle `← Back to Exhibition` link (`#5C554C`, hover `#451D1D`).
  - **Primary Visual Column (`7/12` desktop):** Large, uncropped (`object-contain`) high-res `843px` artwork on a generously padded `#EDE6DA` (or `#1A1614` dark gallery) stage. Artwork always takes visual priority before metadata.
  - **Museum Wall Placard Column (`5/12` desktop):**
    - `department_title` eyebrow (`#7A5E35`).
    - Artwork `title` (`H1`, `Cormorant Garamond`, `36px–48px`).
    - Artist attribution (`artist_display` / link to artist).
    - Hairline-divided Tombstone Metadata (`Date`, `Medium`, `Dimensions`, `Classification`, `Place of Origin`, `Categories`, `Credit Line`).
    - Curatorial description (`description` / `short_description`, `16px`, `1.7` line-height, `max-w-[65ch]`).
  - **Related Artworks:** Separated by `64px` spacing and a `1px` `#E2DACD` rule; 4-column strip (`More from [Department]`).

### E. Department & Category Exploration (`/collections`)

A curated directory of the museum's wings and thematic categories.

- **Required Elements:**
  - **Department Collections:** Curated editorial cards for official AIC `department` terms with visual preview imagery (fetched from actual department artworks), serif department title, and artwork count *only when returned by actual API pagination data* (never fabricated).
  - **Category Exploration:** Clean editorial index of `category` terms linking directly to `/artworks?category=<id>`.
  - **Clear Navigation:** Every department and category card navigates cleanly into the pre-filtered Exhibition Hall (`/artworks?department=<id>`).

---

## 8. Component Design Guidelines

> **Codebase Note:** Reuse existing components in `src/components/` (`Navbar.jsx`, `Footer.jsx`, `ArtworkCard.jsx`, `ArtistCard.jsx`, `Pagination.jsx`, `SearchBar.jsx`, `Loading.jsx`). Do not create duplicates.

### 8.1 `Navbar`
- **Purpose:** Global museum navigation and quick artwork search.
- **Visual Appearance:** Sticky `72px` header. Light variant: `rgba(245, 240, 231, 0.94)` with `backdrop-blur-md` and `1px solid #E2DACD` bottom border. Left: `ARTORA` (`Cormorant Garamond`, `24px`, `tracking-wider`) + `Art Collection Explorer` (`11px` uppercase). Center: `Home`, `Artworks`, `Artists`, `Collections` (`14px` Sans; active item has `1px` `#B79A6A` bottom rule). Right: compact search input or search trigger + optional `Explore Collection` CTA.
- **Variants:** `default` (Warm Ivory) and `overlay` (translucent dark over Homepage Hero).
- **Responsive:** Below `768px` (`md`), collapses into a `44x44px` menu toggle opening a full-width Warm Ivory drawer.

### 8.2 `Footer`
- **Purpose:** Institutional grounding, navigation links, and AIC API attribution.
- **Visual Appearance:** Limestone Tint (`#EDE6DA`) or Gallery Obsidian (`#1A1614`) band with `1px solid #E2DACD` top border and `48px` vertical padding. 3 columns: Brand & Tagline, Museum Navigation, and API Attribution (`Data & imagery courtesy of the Art Institute of Chicago Public API`).
- **Responsive:** Stacks into 1 column on mobile (`gap-8`).

### 8.3 `ArtworkCard`
- **Purpose:** Present an artwork in gallery grids without e-commerce clutter.
- **Visual Appearance:** `#FAF8F3` surface, `1px solid #E2DACD` border, `rounded-sm` (`4px`). Top: `4:3` `#EDE6DA` mat (`p-4`) with `object-contain` image. Bottom: `p-5` containing serif `title` (2-line clamp), `artist_title` (`14px`, `#5C554C`), and `1px` top-bordered metadata row (`date_display` + `department_title` in `#7A5E35`).
- **Behavior:** Entire card is a `<Link>` to `/artworks/:id`. Hover transitions border to `#B79A6A`, title to `#451D1D`, and zooms image to `scale(1.025)`.
- **Responsive:** `1` col mobile, `2` col `sm`, `3` col `lg`.

### 8.4 `ArtistCard`
- **Purpose:** Represent a creator in the Artist Archive.
- **Visual Appearance:** `#FAF8F3` card, `1px solid #E2DACD` border, `p-6`. Top row: `44px` circular `#EDE6DA` portrait/icon well (`#B79A6A` icon) + lifespan (`tabular-nums`, `12px`, `#756E63`). Body: Serif `H3` artist name (`22px`) + 3-line biography excerpt (`14px`, `#5C554C`). Footer: `View Profile & Works →` (`11px` uppercase `#451D1D`).
- **Variants:** `default`, `selected` (`border-[#451D1D] ring-1 ring-[#451D1D]`).

### 8.5 `ArtworkLabel`
- **Purpose:** Authentic museum wall placard for Artwork Detail and Curated Highlights.
- **Visual Appearance:** `#FAF8F3` or `#FFFFFF` surface with `1px solid #E2DACD` border (or borderless editorial column on Detail page). Displays Artist, Lifespan, Serif Title (`#451D1D` or `#211D19`), Date, Medium, Dimensions, and Curatorial Essay.
- **Variants:** `compact` (beside featured hero artworks) and `full` (Private Viewing tombstone + essay).

### 8.6 `SearchBar`
- **Purpose:** Keyword search for artworks or artists.
- **Visual Appearance:** `min-h-[44px]`, `#FAF8F3` background, `1px solid #C8B9A3` border, `rounded-sm`, left `Search` icon (`#756E63`), clear `×` button when populated. Focus: `border-[#451D1D]` + `2px` `#B79A6A` ring.
- **Responsive:** Full-width on mobile; `w-72` to `w-96` on desktop toolbars.

### 8.7 `FilterPanel`
- **Purpose:** Filter the Exhibition Hall by Department and Category.
- **Visual Appearance:** Inline horizontal toolbar (`flex-wrap gap-3`) of `44px`-tall `#FAF8F3` `<select>` controls (`1px solid #C8B9A3`) with removable active filter chips and a `Clear All` text button (`#451D1D`).
- **Responsive:** Stacks full-width below `640px`.

### 8.8 `Pagination`
- **Purpose:** Navigate paginated API responses.
- **Visual Appearance:** Centered bar with `Previous` / `Next` buttons (`min-h-[44px]`), numeric page buttons (`tabular-nums`), and `Page X of Y` summary. Active page: `#451D1D` bg with `#F5F0E7` text; inactive: `#FAF8F3` bg with `#E2DACD` border.
- **Responsive:** Collapses numeric list to `Page X of Y` between `Prev` and `Next` on mobile.

### 8.9 `LoadingState` (existing: `Loading.jsx`)
- **Purpose:** Indicate loading while preserving layout stability.
- **Variants:**
  - `skeleton` (default for grids/detail): Pulsing `#EDE6DA` placeholders matching exact card/detail proportions (`role="status"`, `aria-label="Loading artworks"`).
  - `spinner`: Minimal `#B79A6A` ring with caption (`"Curating collection..."`).

### 8.10 `ErrorState`
- **Purpose:** Handle API failures or 404 routes with calm museum tone.
- **Visual Appearance:** Centered `#FAF8F3` card (`max-w-md`, `1px solid #E2DACD`, `role="alert"`), subtle Venetian Red (`#8B2626`) icon, Serif heading (`"Unable to Load Exhibition"`), concise explanation, and a `SecondaryButton` (`"Try Again"`).

### 8.11 `EmptyState`
- **Purpose:** Guide visitors when filters or search yield zero results.
- **Visual Appearance:** Centered block (`py-16`), `Frame` icon (`#B79A6A`), Serif heading (`"No Artworks Found"`), helpful guidance, and `Reset Filters` button.

### 8.12 `PrimaryButton`
- **Purpose:** Main call-to-action (`Explore Artworks`, `Explore Collection`).
- **Variants:**
  - `burgundy` (default on light ivory surfaces): `#451D1D` bg, `#F5F0E7` text, hover `#5C2727`, active `#311313`.
  - `ivory` (on dark gallery hero): `#F5F0E7` bg, `#211D19` text, hover `#FFFFFF`.
- **Sizing:** `min-h-[44px]`, `px-6 py-3`, `14px` Sans `font-medium`, `rounded-sm` (or `rounded-full` strictly for top hero pill).

### 8.13 `SecondaryButton`
- **Purpose:** Secondary actions (`Clear Filters`, `Back to Exhibition`, `Try Again`).
- **Visual Appearance:** Transparent or `#FAF8F3` bg, `1px solid #C8B9A3` border, `#211D19` text, `min-h-[44px]`, `px-5 py-2.5`, `rounded-sm`. Hover: `border-[#451D1D] text-[#451D1D]`.

---

## 9. Interaction & Motion System

Motion in ARTORA should evoke **quiet gallery lighting and deliberate movement**—subtle, purposeful, and never distracting.

### 9.1 Duration & Easing Tokens

| Token | Value | Usage |
| :--- | :--- | :--- |
| `--duration-fast` | `150ms` | Text link colors, focus rings, chip removal |
| `--duration-base` | `250ms` | Button fills, card border highlights, menu toggles |
| `--duration-slow` | `500ms` | Subtle artwork hover zoom, editorial fade-in reveals |
| `--ease-museum` | `cubic-bezier(0.22, 1, 0.36, 1)` | Smooth, unhurried deceleration |

### 9.2 Motion Rules

- **Artwork Hover Zoom:** `transform: scale(1.025)` over `500ms var(--ease-museum)` inside an `overflow-hidden` mat container.
- **Gentle Fade-In Reveals:** Optional `opacity: 0 → 1` and `translateY(10px) → 0` (`450ms`) on initial page/section mount.
- **Avoid:** Bouncy spring physics, heavy scroll-jacking/parallax, 3D flip cards, or auto-rotating carousels.
- **Reduced Motion:** Always honor `@media (prefers-reduced-motion: reduce)` by clamping animation and transition durations to `0.01ms`.

---

## 10. Responsive Design

| Area | Desktop (`>= 1024px`) | Tablet (`768px – 1023px`) | Mobile (`< 768px`) |
| :--- | :--- | :--- | :--- |
| **Artwork Proportions** | Matted `object-contain` in 3-col grid; `75vh` max-height on Detail | 2-col matted grid; `65vh` Detail | 1-col matted grid; `55vh–60vh` Detail |
| **Navigation** | Sticky single-row bar with inline links + search | Inline links + compact search | Hamburger toggle (`44x44px`) + slide-down drawer |
| **Hero Shortcuts Bar** | 4-column horizontal translucent glass bar | 2×2 grid | 2×2 compact grid below hero CTA |
| **Typography Scaling** | `Display 72px`, `H1 48px`, `H2 34px`, `Body 16px` | `Display 54px`, `H1 38px`, `H2 28px` | `Display 40px`, `H1 32px`, `H2 26px`, `Body 15px` |
| **Metadata Readability** | 2-column key/value tombstone table | 2-column tombstone table | Stacked key-over-value rows (`gap-1`) |
| **Touch Targets** | `min-h-[40px]` | `min-h-[44px]` | `min-h-[44px] min-w-[44px]` on all interactive elements |

---

## 11. Accessibility Guidelines

All pages and components must satisfy **WCAG 2.1 Level AA**.

1. **Color Contrast (Verified Ratios):**
   - `#211D19` on `#F5F0E7` = **14.3:1** (AAA).
   - `#5C554C` on `#F5F0E7` = **6.2:1** (AA/AAA).
   - `#F5F0E7` on `#451D1D` = **11.8:1** (AAA).
   - `#F5F0E7` on `#1A1614` = **15.8:1** (AAA).
   - **Important Muted Gold Rule:** Do **not** use `#B79A6A` for small body text on `#F5F0E7` or `#FAF8F3` (~2.3:1 contrast). Use `#B79A6A` for borders, icons, focus rings, and dark-background accents; use `#7A5E35` (Antique Bronze, 4.9:1 on `#FAF8F3`) or `#451D1D` for small colored text on light surfaces.
2. **Keyboard Navigation:** Full `Tab` / `Shift+Tab` / `Enter` / `Escape` support across navbar, filters, cards, and pagination, with visible `2px solid #B79A6A` (`outline-offset: 2px`) `:focus-visible` states.
3. **Semantic HTML:** Proper `<header>`, `<nav aria-label="...">`, `<main>`, `<section>`, `<article>`, and `<footer>` landmarks, with a single `<h1>` per page.
4. **Accessible Artwork Alt Text:** Use `"{title} by {artist_title}"` (or `"{title}, Art Institute of Chicago"` when artist is unknown). Mark decorative `lucide-react` icons with `aria-hidden="true"`.
5. **Forms & Live Regions:** Pair every `<input>` and `<select>` with a `<label>` or `aria-label`. Use `aria-live="polite"` for search result count announcements and `role="alert"` for `ErrorState`.
6. **Reduced Motion:** Globally disable animations under `prefers-reduced-motion: reduce`.

---

## 12. API Data Presentation Rules

ARTORA is powered by the **Art Institute of Chicago Public API** (`https://api.artic.edu/docs/`).

### 12.1 Data Mapping Reference

| UI Element | API Field(s) | Presentation & Fallback Rule |
| :--- | :--- | :--- |
| **Artwork Title** | `title` | Display verbatim; fallback: `"Untitled Work"` |
| **Artist Attribution** | `artist_title`, `artist_display` | Prefer `artist_title`; fallback to `artist_display.split('\n')[0]`; fallback: `"Unknown Artist"` |
| **Creation Date** | `date_display` | Display verbatim; fallback: `"Date unknown"` |
| **Artwork Image** | `image_id` | `https://www.artic.edu/iiif/2/{image_id}/full/{width},/0/default.jpg` (`400` cards, `843` detail); if `null`, show Missing Image Fallback |
| **Department** | `department_title` | Display as eyebrow/tag; omit if `null` |
| **Categories** | `category_titles` | Render up to 5 clean chips; omit section if empty |
| **Medium** | `medium_display` | Display in tombstone table; omit row if `null` |
| **Dimensions** | `dimensions` | Display in tombstone table; omit row if `null` |
| **Description** | `description`, `short_description` | Sanitize via `stripHtml()`; fallback: `"Curatorial description is not currently archived for this artwork."` |
| **Artist Lifespan** | `birth_date`, `death_date` | `"{birth} – {death}"`, `"b. {birth}"`, `"d. {death}"`, or `"Dates unknown"` |

### 12.2 Integrity Rules

- **Never Fabricate Metadata:** Never invent dates, dimensions, descriptions, biographies, or collection counts.
- **Graceful Null Handling:** Every UI component must remain visually balanced when optional API fields are `null` or empty.
- **API as Source of Truth:** All displayed artworks, artists, departments, and categories must originate from live API responses.

---

## 13. Design Consistency Rules for Team Members

ARTORA is developed collaboratively by **four team members working on separate Git branches**. To maintain a unified museum experience:

1. **Follow `DESIGN.md` as Law:** Every UI implementation must conform to this document.
2. **Use Shared Design Tokens:** Never introduce ad-hoc hex colors, arbitrary shadows, or unapproved fonts. Always use the tokens in Section 3 and Section 4.
3. **Follow the Typography System:** Keep serif fonts strictly for headings/titles and sans-serif for body, navigation, and metadata.
4. **Protect Artwork Presentation:** Never crop artworks in detail views and never overlay badges or buttons onto artwork imagery.
5. **Reuse Shared Components:** Check `src/components/` before creating new files. Never duplicate cards, buttons, search bars, pagination, or loading/error/empty states.
6. **Maintain Consistent Spacing & Layout:** Follow the `4px/8px` spacing scale and `MainLayout.jsx` container bounds.
7. **Coordinate Shared Changes:** Any modification to `src/index.css` tokens, `MainLayout.jsx`, `Navbar.jsx`, `Footer.jsx`, or `ArtworkCard.jsx` **must be coordinated with the Maintainer** prior to merging.
8. **Mandatory PR Review Gate:** Every Pull Request containing UI changes must be reviewed against `DESIGN.md` and the Section 14 checklist before approval.

---

## 14. Design Quality Checklist

Evaluate every page and Pull Request against these 10 criteria before merging:

- [ ] **Museum Atmosphere:** Does the page feel like a serene, prestigious art museum rather than an e-commerce store or SaaS dashboard?
- [ ] **Artwork Prominence:** Is the artwork the unmistakable visual focal point, uncropped in detail views and free of overlaid badges or text?
- [ ] **Typography Consistency:** Are serif headings (`Cormorant Garamond`) and sans-serif body/metadata (`Inter` / approved sans) used strictly per Section 4?
- [ ] **Color Consistency:** Are only Warm Ivory (`#F5F0E7`), Deep Burgundy (`#451D1D`), Dark Charcoal (`#211D19`), Muted Gold (`#B79A6A`), Warm White (`#FAF8F3`), and approved semantic tokens used?
- [ ] **Spacing & Breathing Room:** Do sections (`64px–96px`), gallery grids (`24px–32px`), and cards (`20px–24px`) maintain generous museum whitespace?
- [ ] **Responsive Behavior:** Does the layout scale cleanly across Desktop, Tablet, and Mobile with `>=44px` touch targets and zero horizontal overflow?
- [ ] **Accessibility:** Do all text pairs pass WCAG AA contrast (no small `#B79A6A` text on light ivory), with proper alt text, landmarks, and `#B79A6A` focus rings?
- [ ] **API Data Integrity:** Are `null` values, missing `image_id`s, and HTML-formatted descriptions handled cleanly with zero fabricated data?
- [ ] **Component Consistency:** Are shared components reused without creating duplicates or conflicting styles?
- [ ] **Interaction Quality:** Are hover/reveal transitions subtle (`150ms–500ms`), purposeful, and compliant with `prefers-reduced-motion`?

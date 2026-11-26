# ARTORA: Design System, Chiaroscuro Gallery Architecture & Anti-Slop Guidelines

> **Official Design Reference & Single Source of Truth**  
> **Product:** ARTORA: Art Collection Explorer  
> **Tagline:** *"Discover Art. Explore Stories."*  
> **Data Source:** Art Institute of Chicago Public API (`https://api.artic.edu/docs/`)  
> **Liveliness Dials:** `Dial: ENERGY 2 / RHYTHM 3 / MOTION 2`

---

## Table of Contents

1. [Project Identity & Liveliness Dials](#1-project-identity--liveliness-dials)
2. [Design Philosophy](#2-design-philosophy)
3. [Visual Identity & Verified Color System](#3-visual-identity--verified-color-system)
4. [Typography System](#4-typography-system)
5. [Spacing, Grid & Chiaroscuro Architecture](#5-spacing-grid--chiaroscuro-architecture)
6. [Artwork Presentation System](#6-artwork-presentation-system)
7. [Page-by-Page Blueprints (For All 4 Branches)](#7-page-by-page-blueprints-for-all-4-branches)
8. [Shared Component Specifications](#8-shared-component-specifications)
9. [Interaction & Motion System](#9-interaction--motion-system)
10. [Responsive Reflow Rules](#10-responsive-reflow-rules)
11. [Accessibility & WCAG AA Contrast Rules](#11-accessibility--wcag-aa-contrast-rules)
12. [API Data Integrity & Honest Fallbacks](#12-api-data-integrity--honest-fallbacks)
13. [Anti-Slop Guardrails for Team Members](#13-anti-slop-guardrails-for-team-members)
14. [PR Review & Delivery Checklist](#14-pr-review--delivery-checklist)

---

## 1. Project Identity & Liveliness Dials

| Attribute | Definition |
| :--- | :--- |
| **Product Name** | ARTORA |
| **Product Type** | Digital Art Museum & Collection Explorer |
| **Tagline** | *"Discover Art. Explore Stories."* |
| **Primary Data Source** | Art Institute of Chicago Public API (`https://api.artic.edu/api/v1`) |
| **Image Delivery** | Art Institute of Chicago IIIF Image API 2.0 (`https://www.artic.edu/iiif/2`) |
| **Declared Dials** | `ENERGY 2` (Atmospheric museum authority) / `RHYTHM 3` (Varied dark-and-ivory compositions) / `MOTION 2` (Unhurried gallery transitions) |

### Brand Concept

ARTORA brings the lighting drama, curatorial scholarship, and spatial calm of a physical art museum into the browser. Visitors step into dimly lit oxblood gallery rooms where spotlit gold-framed canvases command attention, then walk into sunlit warm-ivory exhibition halls to browse framed works, creator archives, and departmental wings.

### What ARTORA Is (and Is Not)

| ARTORA **IS** | ARTORA **IS NOT** |
| :--- | :--- |
| An architectural extension of a physical art museum | An e-commerce storefront (no prices, carts, heart overlays, or "Buy" pills) |
| An editorial exhibition catalogue with varied room compositions | A generic AI landing page with bento grids, glowing badges, or stat cards |
| Grounded 100% in live Art Institute of Chicago records | A mockup filled with invented numbers, stock portraits, or dead filter buttons |

---

## 2. Design Philosophy

### 2.1 Chiaroscuro Gallery Immersion
Pair dramatic **Dark Oxblood / Espresso rooms** (`#261211`, `#181210`) at page entrances and private-viewing stages with **Sunlit Warm Ivory halls** (`#F5F0E7`) for extended browsing and reading. Every route should feel like walking from one physical gallery wing into the next.

### 2.2 Art First (Zero Image Clutter)
The artwork is always the focal point. Keep interface chrome quiet. **Never** place badges, category pills, bookmark icons, or text directly on top of an individual artwork image in `ArtworkCard` or `ArtworkDetail`.

### 2.3 Single Clear Navigation (No Redundancy)
The top `Navbar` (inline links on desktop, labeled `Menu` drawer on mobile) is the sole global navigation bar across all screen sizes. Never place a second bottom navigation bar or duplicate shortcut grid inside the Hero viewport.

### 2.4 Varied Section Rhythm (`RHYTHM 3`)
Never stack sections that all repeat "centered heading + subtitle + identical 3-column card grid". Alternate between full-bleed architectural banners, overlapping gallery rows, `7/5` asymmetric feature splits, dark spotlight rooms, and visual department indexes.

---

## 3. Visual Identity & Verified Color System

All colors below are already configured in `src/index.css` (`:root` variables and Tailwind v4 `@theme` classes). **Do not introduce ad-hoc hex colors, blue/purple gradients, or neon glows.**

### 3.1 Core & Gallery Room Palette

| Tailwind Class | CSS Variable | Hex | Role & Approved Usage |
| :--- | :--- | :--- | :--- |
| `bg-ivory` / `text-ivory` | `--color-bg-primary` | `#F5F0E7` | Primary sunlit exhibition hall background; primary text on dark gallery walls |
| `bg-limestone` | `--color-bg-secondary` | `#EDE6DA` | Inner artwork mat (`passe-partout`), subtle band & footer surface |
| `bg-warm-white` | `--color-surface` | `#FAF8F3` | Card bodies, museum wall placards, search/select inputs on light halls |
| `bg-burgundy` / `text-burgundy` | `--color-accent-primary` | `#451D1D` | Primary buttons on light surfaces, active nav indicator, hover titles |
| `bg-gallery-oxblood` | `--color-bg-gallery-burgundy` | `#321414` / `#261211` | Inner-page dark architectural header banners, Private Viewing room, Spotlight band |
| `bg-gallery-dark` | `--color-bg-gallery-dark` | `#1A1614` / `#181210` | Deep museum backdrop, dark canvas mat stage |
| `text-charcoal` | `--color-text-primary` | `#211D19` | Primary headings & titles on light surfaces (`14.75:1` on `#F5F0E7`) |
| `text-stone` | `--color-text-secondary` | `#5C554C` | Subtitles, artist names, secondary prose on `#F5F0E7` (`6.47:1`) and `#EDE6DA` (`5.92:1`) |
| `text-ash` | `--color-text-muted` | `#756E63` | Metadata keys & dates **ONLY on `#FAF8F3` or `#FFFFFF`** (`4.75:1`). **Never** use `#756E63` on `#F5F0E7` (`4.44:1` fails AA) |
| `text-gold` / `border-gold` | `--color-accent-secondary` | `#B79A6A` / `#C9B38C` | Frame bevels, icons & eyebrows **on dark `#181210` / `#261211` surfaces** (`>6.3:1`) |
| `text-bronze` | `--color-accent-secondary-text` | `#7A5E35` | Accessible gold-bronze eyebrows **on light `#F5F0E7` / `#FAF8F3` / `#EDE6DA` surfaces** (`4.87:1` to `5.69:1`) |
| `border-gesso` | `--color-border-subtle` | `#E2DACD` | Hairline `1px` card borders & tombstone dividers on light surfaces |
| `border-bronze-rule` | `--color-border-strong` | `#847869` | Interactive input, select, and secondary button borders (`>=3.8:1` non-text contrast) |

---

## 4. Typography System

Loaded globally in `index.html`:
- **Editorial Serif (`font-serif`):** `Cormorant Garamond` (`400`, `500`, `600`, `700`, plus `italic`)
- **UI & Curatorial Sans (`font-sans`):** `Inter` (`400`, `500`, `600`, `700`)

### 4.1 Strict Font Assignment
- **Use `font-serif` ONLY for:** Hero & page `H1` titles, section `H2` headings, artwork titles, artist names, department card titles, and the `ARTORA` wordmark.
- **Use `font-sans` for:** Navigation links, buttons, search/filter inputs, eyebrows, artist attribution lines under artwork titles, dates, metadata tables, pagination, and curatorial paragraphs.
- **Never use:** Monospace headings (except technical branch tags on pending integration placeholders) or all-caps sentences inside body prose.

### 4.2 Type Scale

| Element | Font | Desktop | Mobile | Weight | Tracking / Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Homepage Hero `H1`** | `font-serif` | `5.25rem` (`84px`) | `2.75rem` (`44px`) | `400` | `leading-[1.03] tracking-[-0.01em]` |
| **Inner Page Banner `H1`** | `font-serif` | `3.25rem` (`52px`) | `2.25rem` (`36px`) | `400` | `leading-[1.08] tracking-[-0.01em]`, `#F5F0E7` on dark banner |
| **Section Heading `H2`** | `font-serif` | `2.5rem` (`40px`) | `1.875rem` (`30px`) | `400` | `leading-[1.15]` |
| **Card Title `H3`** | `font-serif` | `1.3rem` (`21px`) | `1.2rem` (`19px`) | `600` | `leading-[1.25]` |
| **Eyebrow Label** | `font-sans` | `11px` | `11px` | `600` | `uppercase tracking-[0.22em]` (`#C9B38C` on dark, `#7A5E35` on light) |
| **Body / Essay** | `font-sans` | `15px–16px` | `15px` | `400` | `leading-[1.7] max-w-[62ch]` |
| **Metadata / Dates** | `font-sans` | `13px–14px` | `13px` | `400` / `500` | Apply `tabular-nums` to all years, counts, and page numbers |

---

## 5. Spacing, Grid & Chiaroscuro Architecture

### 5.1 Shared Shell (`MainLayout`)
`MainLayout.jsx` (owned by Alvis) provides two layout modes:
1. **Immersive Overlay Mode (`<MainLayout heroOverlay fullBleed>`):**
   - **Recommended for ALL 4 primary routes** (`/`, `/artworks`, `/artists`, `/artworks/:id`)!
   - Renders the transparent `ARTORA | Art Collection Explorer` header seamlessly over your top dark oxblood banner/room, then transitions automatically to a sticky Warm Ivory (`#F5F0E7`) bar once the visitor scrolls past `48px`.
2. **Standard Contained Mode (`<MainLayout>`):**
   - Used for utility pages (`NotFound.jsx`), automatically wrapping content in `max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16`.

### 5.2 The Split-Tone Page Entrance Pattern (For `/artworks` & `/artists`)
To make `/artworks` (Risa) and `/artists` (Imelda) feel connected to the Homepage Hero rather than dropping abruptly into a plain white page, use the **Split-Tone Dark Oxblood Banner + Overlapping First Row**:

```jsx
<MainLayout heroOverlay fullBleed>
  {/* 1. Dark Oxblood Architectural Header Banner */}
  <section
    data-surface="dark"
    className="relative overflow-hidden bg-[#261211] pt-28 pb-28 text-ivory sm:pt-32 sm:pb-32"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C9B38C]">
        Collection
      </p>
      <h1 className="mt-3 font-serif text-[2.25rem] font-normal leading-[1.08] text-[#F5F0E7] sm:text-[3.25rem]">
        Artworks
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#E2DACD] sm:text-base">
        Explore paintings, sculptures, prints, and decorative works from the Art Institute of Chicago.
      </p>
      {/* SearchBar + FilterPanel toolbar sits here inside the banner */}
    </div>
  </section>

  {/* 2. Sunlit Warm Ivory Hall with Overlapping Card Grid (-mt-14) */}
  <section data-surface="light" className="bg-ivory pb-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="-mt-14 relative z-10">
        {/* ArtworkCard or ArtistCard grid + Pagination */}
      </div>
    </div>
  </section>
</MainLayout>
```

---

## 6. Artwork Presentation System

1. **Uncropped Proportions (`object-contain`):**
   - Artworks vary from tall vertical scrolls to wide panoramic canvases.
   - Inside `ArtworkCard` (`aspect-[4/3]`) and `ArtworkDetail` (`max-h-[72vh]`), **always** use `object-contain` so 100% of the composition is preserved without cropping.
   - `object-cover` is permitted **only** on architectural/wing preview cards (`DepartmentCard` and `ArtistCard` archival plate previews) where the image represents a whole wing or archive rather than inspecting a single painting.
2. **Gallery Frame & Matting Treatment:**
   - Outer bevel band (`bg-[#E8DFD1] p-2.5`) + inner antique-gold rule (`border border-[#B79A6A]/55 bg-[#EDE6DA] p-3.5`) gives every `ArtworkCard` the presence of a framed museum piece without tacky CSS clip-art frames.
   - On dark Private Viewing walls (`#261211`), frame the canvas stage in `border-2 border-[#B79A6A]/55 bg-[#17110F] p-4 sm:p-6 shadow-[0_22px_54px_rgba(8,5,4,0.58)]`.
3. **IIIF Image URLs (`src/utils/imageHelper.js`):**
   - Grid cards: `getArtworkThumbnailUrl(image_id)` (`400px`, `loading="lazy"`, `width={400} height={300}`).
   - Detail & Lead Feature: `getArtworkDetailUrl(image_id)` (`843px`, `width={843} height={632}`).
   - Missing `image_id` or `onError`: Render `#EDE6DA` (or `#17110F` on dark) mat with `Frame` icon (`strokeWidth={1.25}`, `#B79A6A`) and `"Archival image unavailable"`.

---

## 7. Page-by-Page Blueprints (For All 4 Branches)

### A. Homepage: Museum Entrance (`/`, Owner: Alvis, `feature/home-experience`)
1. **Overlay Navigation:** Transparent inline `ARTORA | Art Collection Explorer`, centered `Home / Artworks / Artists / Departments`, icon-only Search trigger (`aria-label="Search artworks"`), and cream `Explore Collection` pill (`#EFE9DC`). Transitions to sticky Warm Ivory on scroll.
2. **Full-Bleed Museum Hero (`lg:h-dvh`):** Evening burgundy museum gallery photograph (`fetchPriority="high"`), `THE ART INSTITUTE OF CHICAGO` eyebrow, two-line serif `Discover / Art Collection`, concise subtitle, `Explore Artworks ->` button, and a single subtle `Curated Galleries Below` scroll cue at the bottom (no secondary bottom shortcut bar on either desktop or mobile, keeping navigation exclusively in the top `Navbar` / `Menu`).
3. **Masterpieces on View (`#curated-highlights`, Warm Ivory `#F5F0E7`):** Asymmetric `7/5` lead masterpiece + placard, followed by 3 framed companion cards.
4. **Private Viewing Spotlight (`#spotlight`, Dark Oxblood `#261211`):** `7/5` dark-framed canvas + curatorial narrative + `2x2` hairline tombstone grid.
5. **Explore by Department (`#departments` & `#categories`, Warm Ivory `#F5F0E7`):** `3x2` visual department cards using live representative department artworks and real `pagination.total` counts, plus thematic category index links.

### B. Artwork Explorer: Exhibition Hall (`/artworks`, Owner: Risa, `feature/artwork-explorer`)
1. **Dark Oxblood Banner Header (`#261211`):**
   - Eyebrow: `COLLECTION`, Serif `H1`: `Artworks`, Subtitle + live result count (`tabular-nums` from `pagination.total`).
   - **Toolbar inside Banner:** Cream search input (`bg-[#EFE9DC] text-[#211D19]`, synced with `?q=...` URL query) + inline dark-surface `<select>` dropdowns (`bg-[#2F1816] border border-[#C9B38C]/40 text-[#F5F0E7] min-h-[45px]`) for **Department** (`?department=...`) and **Category** (`?category=...`), plus `Clear All` button when any query/filter is active.
   - **Anti-Slop Rule:** Only render filters that actually filter the API (`Department` & `Category`). Do **not** render non-functional `Date` or `Medium` dropdowns!
2. **Overlapping Gallery Grid (`-mt-14` onto `#F5F0E7`):**
   - `1` col mobile, `2` col `sm`, `3` col `lg`, `4` col `xl` (`gap-6 lg:gap-7`).
   - Each `ArtworkCard` links to `/artworks/${artwork.id}` and displays framed `object-contain` artwork, serif title, artist, year (`tabular-nums`) at bottom-left, and `ArrowRight` (`->`) at bottom-right.
3. **Pagination & Async States:** Centered `Pagination` (`tabular-nums`), skeleton grid while loading, `ErrorState` with `Try Again`, and `EmptyState` with `Reset Filters`.

### C. Artist Explorer: Artist Archive (`/artists`, Owner: Imelda, `feature/artist-explorer`)
1. **Dark Oxblood Banner Header (`#261211`):**
   - Eyebrow: `ARTISTS`, Serif `H1`: `Meet the Artists`, Subtitle, and cream `SearchBar` querying `searchArtists` (`GET /agents/search?query[term][is_artist]=true`).
2. **Overlapping `ArtistCard` Grid (`-mt-14` onto `#F5F0E7`):**
   - `1` col mobile, `2` col `sm`, `3` col `lg`, `4` col `xl` (`gap-6`).
   - **CRITICAL Anti-Slop Portrait Rule (Real API Data Only):** The AIC `/agents` endpoint does **not** include portraits of artists. **Never** use AI-generated faces, stock photos, or fake avatars! Instead:
     - Fetch 1 real artwork by that artist via `fetchArtworksByArtist(artist.id, { limit: 1 })` and render its IIIF image in the top `aspect-square` archival plate (`grayscale contrast-105 group-hover:grayscale-0 transition-all duration-500`), **OR** display a refined dark-oxblood/limestone typographic monogram plate (`artist.title` initials + `Feather` icon) when an artist has 0 digitized works.
   - Bottom card body (`bg-warm-white p-5`): Serif artist name (`H3`), lifespan (`1853 – 1890` using en dash `–` and `tabular-nums`, or `"Dates unrecorded"`), brief cleaned bio snippet (`stripHtml(description)`), and bottom-right `->` indicator.
3. **Selected Artist Profile & Works:** Clicking an `ArtistCard` opens an editorial biography panel/drawer or detail section showing full `stripHtml(description)` (`max-w-[65ch]`) and **Associated Artworks** (`fetchArtworksByArtist`) linking each work to `/artworks/:id`.

### D. Artwork Detail: Private Viewing (`/artworks/:id`, Owner: Nisfa, `feature/artwork-detail`)
1. **Full Dark Oxblood Private Viewing Room (`bg-[#261211] text-ivory`, `<MainLayout heroOverlay fullBleed>`):**
   - Top wayfinding (`pt-24`): `<- Back to Artworks` (`Link` to `/artworks` or `navigate(-1)`, `min-h-[45px]`, `text-[#D8CFC2] hover:text-white`).
2. **Two-Column Masterpiece Stage (`lg:grid-cols-12 gap-10 lg:gap-14`):**
   - **Left Visual Stage (`lg:col-span-7`):** High-res `843px` IIIF image (`getArtworkDetailUrl`, `object-contain`, `max-h-[72vh]`, **never cropped**) inside a double-bevel museum frame (`border-2 border-[#B79A6A]/55 bg-[#17110F] p-4 sm:p-6 shadow-[0_24px_60px_rgba(8,5,4,0.6)]`).
   - **Right Wall Placard (`lg:col-span-5`):**
     - Eyebrow: `ARTWORK` (or `classification_title`, `#C9B38C`).
     - `H1`: Artwork `title` (`font-serif text-[2.25rem] sm:text-[3rem] leading-[1.1] text-[#F5F0E7]`).
     - Attribution: `artist_title` + `date_display` (`tabular-nums`).
     - Curatorial Essay: `stripHtml(description || short_description)` (`max-w-[60ch] leading-[1.7] text-[#E2DACD]`).
     - **2x2 Hairline Metadata Grid (`border-y border-ivory/15 py-5 grid-cols-2 gap-6`):** `MEDIUM` (`medium_display`), `DIMENSIONS` (`dimensions`), `DEPARTMENT` (`department_title`), `CATEGORY` (`category_titles[0]`), plus optional `ORIGIN` (`place_of_origin`) and `CREDIT LINE` (`credit_line`) below. Omit `null` fields cleanly; never fabricate missing metadata.
     - **Action Row (Anti-Slop Rule):** Include a `View in Fullscreen` button (`SecondaryButton variant="onDark"`) that opens a real `<dialog>` modal (`Escape` to close) displaying the uncropped full image. **Do not** add a non-functional bookmark/heart icon button!
3. **Related Artworks Strip:** Separated by `border-t border-ivory/12 mt-16 pt-14`, `4`-column grid (`More from [Department]`) fetched via `fetchRelatedArtworks({ departmentId, excludeId })`.

---

## 8. Shared Component Specifications

Reuse existing shared components in `src/components/` and `src/layouts/` built in `feature/home-experience`:
- **`MainLayout.jsx`:** Props `heroOverlay` (`boolean`) and `fullBleed` (`boolean`). Includes skip-to-content link, `Navbar`, `<main id="main-content">`, and `Footer`.
- **`Navbar.jsx`:** Props `variant` (`'overlay' | 'default'`). Global search submits directly to `/artworks?q=<query>`. Risa's `ArtworkExplorer` must read `useSearchParams().get('q')`, `get('department')`, and `get('category')`!
- **`Footer.jsx`:** 3-column museum footer with institutional attribution and CC0 notice.
- **`PrimaryButton.jsx` & `SecondaryButton.jsx`:** Support `to` (React Router `Link`), `href`, or `type="button" | "submit"`, `min-h-[45px]`, keyboard focus rings, and `variant` (`burgundy` / `ivory` on `PrimaryButton`; `default` / `onDark` on `SecondaryButton`).

---

## 9. Interaction & Motion System (`MOTION 2`)

- **Artwork Hover Zoom:** `.artwork-hover-zoom` scales `1.025` over `500ms cubic-bezier(0.22, 1, 0.36, 1)` inside an `overflow-hidden` frame when its parent `.group` is hovered.
- **Card Arrow Micro-Cue:** Bottom-right `ArrowRight` shifts `translate-x-1` (`4px`) over `200ms` on hover.
- **Forbidden Motion:** No infinite pulsing dots, no floating/bouncing loops, no scroll-jacking, and no auto-playing carousels.
- **Reduced Motion:** `src/index.css` automatically clamps all transitions/animations to `0.01ms` under `@media (prefers-reduced-motion: reduce)`.

---

## 10. Responsive Reflow Rules

| Viewport | Width | Reflow Requirements |
| :--- | :--- | :--- |
| **Mobile** | `< 640px` | 1-column gallery grids, stacked detail view (`max-h-[58vh]` artwork stage), `Menu` pill drawer with labeled search, zero horizontal overflow (`overflow-x: clip`), all tap targets `>= 45px`. |
| **Small Tablet (`sm`)** | `640px–767px` | 2-column artwork, artist, and department grids; search & filter controls wrap cleanly with `flex-wrap`. |
| **Tablet (`md`)** | `768px–1023px` | Inline top `Navbar` appears; 2-to-3 column grids. |
| **Desktop (`lg` / `xl`)** | `>= 1024px` | Asymmetric `7/5` splits on Detail/Spotlight, 3-to-4 column gallery grids, `max-w-7xl` (`1280px`) container alignment. |

---

## 11. Accessibility & WCAG AA Contrast Rules

1. **Verified Contrast Pairs (Mandatory):**
   - Light Ivory (`#F5F0E7`): Use `#211D19` (`14.75:1`), `#5C554C` (`6.47:1`), `#451D1D` (`12.79:1`), or `#7A5E35` (`5.32:1`). **Never** use `#756E63` or `#B79A6A` as small text on `#F5F0E7`.
   - Warm White Cards (`#FAF8F3`): `#756E63` (`text-ash`, `4.75:1`) is valid for metadata labels and dates.
   - Dark Oxblood/Obsidian (`#261211` / `#181210`): Use `#F5F0E7` (`>14:1`), `#E2DACD` (`>11:1`), `#C9C0B3` (`>9:1`), and `#C9B38C` / `#B79A6A` (`>6.3:1`).
   - Text Over Imagery (`Hero` & `DepartmentCard`): Always place a multi-stop dark scrim (`>= 0.85` opacity under the text zone) so even bright highlights pass `4.5:1`.
2. **Semantics & Keyboard:**
   - Single `<h1>` per route, sequential heading levels (`h1` -> `h2` -> `h3`), native `<button>` for actions and `<Link>`/`<a>` for navigation (never `<div onClick>`).
   - Every `<input>` and `<select>` must have a visible `<label>` or explicit `aria-label`.
   - Every modal/drawer (`Fullscreen Lightbox`, `Search Panel`, `Mobile Menu`) must close on `Escape`.
   - Every `<img>` must include `width`, `height`, and descriptive `alt` (`"{title} by {artist_title}"`).

---

## 12. API Data Integrity & Honest Fallbacks

1. **URL Parameter Contract (Team Integration Law):**
   - Global search navigates to `/artworks?q=<encodedQuery>`.
   - Department cards navigate to `/artworks?department=<departmentId>`.
   - Category pills navigate to `/artworks?category=<categoryId>`.
   - Artwork links navigate to `/artworks/<id>`.
2. **Sanitization & Fallbacks:**
   - Always clean `description` and `short_description` with `stripHtml()` from `src/utils/imageHelper.js`.
   - Never fabricate counts, dates, dimensions, portraits, or essays. If `short_description` and `description` are both `null`, display: `"Curatorial description is not currently archived for this artwork."`

---

## 13. Anti-Slop Guardrails for Team Members

Every branch (`feature/home-experience`, `feature/artwork-explorer`, `feature/artist-explorer`, `feature/artwork-detail`) is audited against these 10 anti-slop rules before PR merge:

1. **No Em Dashes in UI Copy:** Do not put the em dash character in headings, descriptions, titles, or labels authored in JSX. Use colons (`:`), commas (`,`), periods (`.`), or an en dash (`–`) strictly between numeric year ranges (`1853 – 1890`).
2. **No AI Marketing Buzzwords:** Ban empty hype words (*"seamless"*, *"revolutionary"*, *"cutting-edge"*, *"next-generation"*, *"unlock"*, *"elevate"*, *"world-class"*, *"delve"*). Write plain, specific curatorial prose.
3. **No Dead Controls:** Every button, dropdown, chip, and link must execute real logic. Do not ship decorative filter dropdowns (`Date`, `Medium`) or dead bookmark/share icons that do nothing.
4. **No Invented Portraits or Numbers:** Never invent collection statistics or use fake/stock photos for artists. Use live `pagination.total` from the API and real representative AIC IIIF artworks for artist plates.
5. **No Duplicate Navigation:** Rely on `MainLayout`'s `Navbar` for desktop navigation instead of adding extra navbars or redundant link strips.
6. **No Trend-Stacking Decoration:** No blue/purple gradients, no background dot/blueprint grids, no glowing capsule badges above `H1`, no decorative pulsing status dots, and `backdrop-blur` on at most 1-2 surfaces.
7. **Complete Async Resilience:** Every API-driven view must ship all 3 states: contextual `Loading` skeleton (`role="status"`), calm `Error` card (`role="alert"` + working `Try Again`), and helpful `Empty` view (`Reset Filters` / `Reload`).
8. **Zero Cropped Artworks on Inspection:** Use `object-contain` on `ArtworkCard` and `ArtworkDetail`, with zero overlaid text or icons covering the artwork.
9. **True Mobile Reflow:** Test at `375px`, `820px`, and `1280px`. Ensure zero horizontal scroll, readable labels without clipped text, and `>= 45px` touch targets.
10. **Clean Code Comments:** Keep comments short (1 line) and only where explaining non-obvious constraints (such as API rate limits or CORS rules). No ASCII banner dividers or line-by-line narration.

---

## 14. PR Review & Delivery Checklist

Maintainer (Alvis) verifies every Pull Request against this gate before merging into `main`:

- [ ] **Chiaroscuro Cohesion:** Uses `<MainLayout heroOverlay fullBleed>` with the dark oxblood entrance banner (or dark Private Viewing room on Detail) so all 4 routes feel like adjoining rooms of one museum.
- [ ] **Anti-Slop Cleanliness:** Zero em dashes in authored JSX copy, zero buzzwords, zero dead buttons/filters, zero fabricated portraits or numbers.
- [ ] **URL Handoff Verified:** `/artworks` correctly reads `?q=`, `?department=`, and `?category=`; cards link cleanly to `/artworks/:id`.
- [ ] **Artwork Integrity:** `object-contain` preserved on cards and detail stage; missing `image_id` displays the `Frame` archival fallback cleanly.
- [ ] **Async States Complete:** `Loading`, `Error` (`Try Again`), and `Empty` (`Reset`) all tested and functional.
- [ ] **WCAG AA & Keyboard:** All color pairings follow Section 11, `:focus-visible` outlines work on both dark and light bands, `Escape` closes modals/drawers, and `>= 45px` tap targets hold on mobile.
- [ ] **Zero Build/Lint Errors:** `npm run lint` (`0 warnings, 0 errors`) and `npm run build` succeed cleanly with zero console errors.

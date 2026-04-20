# Calm Shindig — IMPLEMENTATION.md vs codebase

This report compares [IMPLEMENTATION.md](./IMPLEMENTATION.md) to the repository as of the review date. It summarizes what matches, what diverges, and what cannot be verified from the repo alone.

---

## Executive summary

The project largely follows the implementation guide: Next.js 14 App Router, the documented component set, GSAP + ScrollTrigger via a client-only hook, `ScrollReveal` with IntersectionObserver, film grain in CSS, image pipeline with AVIF/WebP and shared blur placeholders, and optional Formspree for the contact form. The main gaps are **visual design tokens** (the guide’s warm brown/amber palette vs the shipped forest/sage theme), **font loading** (`next/font` vs Google Fonts `<link>` tags), **metadata** (no `og:image`), **View Transitions** (not enabled on Next 14.2.x, as the config comment notes), and **section deep links** (two content sections have no `id`, and the nav does not link to the first content block).

---

## File map and structure

| IMPLEMENTATION.md | Codebase |
|-------------------|----------|
| `app/globals.css`, `layout.tsx`, `page.tsx` | Present |
| All listed `components/*.tsx` | Present (`SkipLink`, `ScrollReveal`, `Hero`, `Nav`, etc.) |
| `hooks/useGSAP.ts` | Present |
| `public/images/` | Present with many assets (appears consistent with a copy from event files) |
| `package.json`, `next.config.js`, `tailwind.config.ts`, `tsconfig.json`, `postcss.config.js` | Present |
| — | **`lib/placeholder.ts`** — not in the guide’s file map; used for all `blurDataURL` values |

---

## Phased plan vs reality

### Phase 1 — Setup

- Dependencies and dev workflow align (`npm run dev`, etc.).
- **`public/images/`** is populated; asset copy step appears done.
- **Vercel deploy** — not verifiable from the repo (no deployment config required for the comparison).

### Phase 2 — Animations and styling

| Item | Status |
|------|--------|
| Hero parallax (GSAP ScrollTrigger, `yPercent`, scrub) | Implemented in `Hero.tsx`; matches the guide’s pattern |
| IntersectionObserver reveals (`ScrollReveal.tsx`) | Implemented; `threshold: 0.12`, `rootMargin: '0px 0px -48px 0px'` matches the guide |
| Spotlight stagger (GSAP) | Implemented; stagger is `0.1` (guide example used `0.12`); **desktop-only** (`window.innerWidth < 1024` skips animation) |
| Gallery fade-scale stagger | Implemented (`opacity`, `scale`, `y`, stagger) |
| CSS: `artist-card`, `img-zoom`, `btn-primary`, `link-hover` | Present in `globals.css` |
| Film grain `body::before`, opacity `0.045` | Present |

### Phase 3 — Polish

| Item | Status |
|------|--------|
| Easing / stagger tuning | Implemented with values close to the doc; not identical in every number |
| Blur placeholders on `next/image` | **Done** via shared `BLUR_PLACEHOLDER` (inline base64), not `plaiceholder` — consistent with the guide’s “inline base64 stubs” option |
| Mobile nav animation | Collapse via `max-height` / opacity transition |
| Film grain `0.045` | Matches |
| View Transitions (`<link rel="expect">` / `experimental.viewTransition`) | **Not enabled**; `next.config.js` documents that View Transitions are not wired for Next 14.2.x |
| Contact → Resend or Formspree | **Formspree** when `NEXT_PUBLIC_FORMSPREE_ENDPOINT` is set; inline messaging if missing |

### Phase 4 — Performance

| Item | Status |
|------|--------|
| `@next/bundle-analyzer` | Wrapped in `next.config.js`; `npm run analyze` uses `ANALYZE=true` |
| GSAP tree-shaking / dynamic import | `useGSAP` dynamically imports `gsap` and `gsap/ScrollTrigger` only |
| Lazy / `sizes` on images | Below-fold images use `loading="lazy"` and `sizes` where applicable; hero and nav logo use `priority` |
| Lighthouse / CWV targets | **Not verified** in repo (no captured reports) |
| `plaiceholder` | **Not used**; stub blur data URL instead |

---

## Design tokens (important divergence)

The guide’s token table describes a **dark brown / cream / orange-amber** palette (e.g. `--earth-dark: #1C1510`, `--amber: #C8832A`).

The codebase uses a **light cream page + forest green + sage** system, e.g. in `app/globals.css` and `tailwind.config.ts`:

- `--cream` / `--earth-dark` / sage-style accents (with `--amber` as an alias for sage)
- Tailwind `ease-smooth` / `ease-bounce` curves differ slightly from the guide’s example cubic-bezier values

Functionally the architecture is the same (CSS variables + Tailwind extension); the **visual brand** in the guide does not match the implemented palette.

---

## Fonts

- **Guide:** `next/font/google` with `display: 'swap'`.
- **Code:** DM Serif Display + DM Sans loaded via `<link rel="stylesheet">` to Google Fonts in `app/layout.tsx`.

So typography choice matches; loading strategy does not. That may affect font loading behavior and the checklist item about eliminating external font waterfalls.

---

## Metadata and SEO

- **Present:** `title`, `description`, basic `openGraph` (title, description, `siteName`, `locale`, `type`).
- **Missing vs checklist:** explicit **`og:image`** (and related image dimensions/alt) is not defined in `metadata`.

Sections generally use semantic structure, `aria-labelledby`, and heading `id`s where applicable. **Gaps:**

- **`PerformanceInfo`** (“For Artists” / live performance copy): no `id` on `<section>`; not in the nav link list.
- **`SupportingSounds`**: no `id` on `<section>`; not in the nav.

The guide’s checklist (“each section has `id` matching nav href anchors”) is only partially satisfied: nav targets `#top`, `#artists`, `#gallery`, `#partners`, `#about`, `#contact`.

---

## Accessibility and animations (checklist)

Evidence in code (not a full WCAG audit):

- Skip link, `aria-label="Main navigation"`, mobile `aria-expanded` / `aria-controls`, labeled form fields, artist `aria-label`, gallery alts: **largely implemented**.
- `prefers-reduced-motion`: respected in `useGSAP`, `ScrollReveal`, and `globals.css` for reveals and several hover paths.
- GSAP usage is client-only with cleanup via `ctx.revert()` in the hook.

The markdown checklist boxes in IMPLEMENTATION.md remain **unchecked**; they are documentation TODOs, not live project state.

---

## Dependencies

- **Guide:** GSAP as the main animation dependency.
- **Code:** `gsap`, `next@14.2.5`, `react@18`; devDependency `@next/bundle-analyzer` — aligned.

---

## Conclusion

**What was actually done:** A complete single-page marketing site with the planned component architecture, GSAP parallax and staggers, CSS film grain, IO-based reveals, Tailwind styling, optimized images with blur placeholders, bundle analyzer wiring, and an optional Formspree contact integration. Static assets live under `public/images/`.

**Where the repo diverges from IMPLEMENTATION.md:** Color tokens and easing numbers (re-themed), font loading via `<link>` instead of `next/font`, no Open Graph image, no View Transitions on this Next version, spotlight animation limited to large viewports, and incomplete section `id`/nav coverage for the first two content sections. Items like Lighthouse scores and production deploy are outside what the codebase alone can confirm.

---

*Generated by comparing IMPLEMENTATION.md to the Calm Shindig source tree.*

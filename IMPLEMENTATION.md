# Calm Shindig — Next.js 14 Redesign: Implementation Guide

## Phased Plan

### Phase 1 — Setup (Day 1)
1. `npm install` — install all dependencies
2. Copy assets from `Calm Shindig _ Event Series_files/` → `public/images/`
3. Run `npm run dev` and verify the site renders
4. Deploy to Vercel: `vercel --prod`

### Phase 2 — Animations & Styling (Days 2–3)
- Hero parallax via GSAP ScrollTrigger (`components/Hero.tsx`)
- IntersectionObserver reveals on all sections (`components/ScrollReveal.tsx`)
- Spotlight artist GSAP stagger entrance (`components/SpotlightArtists.tsx`)
- Gallery image fade-scale GSAP stagger (`components/Gallery.tsx`)
- CSS hover micro-interactions: `artist-card`, `img-zoom`, `btn-primary`, `link-hover`
- Film grain overlay via `body::before` in `globals.css` — zero JS

### Phase 3 — Polish (Day 4)
- Tune easing curves and stagger timing
- Add `blur` placeholder images to all `next/image` calls
- Test mobile nav collapse animation
- Verify film grain opacity at 0.045 across monitors
- Add View Transitions: `<link rel="expect" href="…">` in layout if desired
- Wire up contact form to Resend or Formspree

### Phase 4 — Performance Tuning (Day 5)
- Run `next build && npx @next/bundle-analyzer`
- Verify GSAP tree-shakes (only ScrollTrigger imported, not all plugins)
- Add `loading="lazy"` / `sizes` attributes to below-fold images
- Run Lighthouse — target LCP < 2.5s, CLS < 0.1, TBT < 200ms
- Add `next/image` `blurDataURL` via `plaiceholder` or inline base64 stubs

---

## File Map

```
calmshindig/
├── app/
│   ├── globals.css          # Design tokens, film grain, reveal classes, components
│   ├── layout.tsx           # Root layout: DM Serif Display + DM Sans fonts, metadata
│   └── page.tsx             # Assembles all sections in order
├── components/
│   ├── SkipLink.tsx         # Accessibility: skip to main content
│   ├── Nav.tsx              # Sticky nav, scroll blur, mobile hamburger
│   ├── Hero.tsx             # Full-viewport hero, GSAP parallax bg, CSS keyframe text
│   ├── PerformanceInfo.tsx  # "For Artists" section, image collage, stats
│   ├── SpotlightArtists.tsx # Spotlight artist grid, GSAP stagger reveal
│   ├── SupportingSounds.tsx # Supporting bands/DJs grid, IO stagger
│   ├── Gallery.tsx          # Masonry photo grid, GSAP fade-scale stagger
│   ├── About.tsx            # About Us two-col layout with floating accent image
│   ├── Partners.tsx         # Partner CTA section
│   ├── Contact.tsx          # Contact info + form with inline success state
│   ├── Footer.tsx           # Logo, nav links, copyright
│   └── ScrollReveal.tsx     # IntersectionObserver wrapper component
├── hooks/
│   └── useGSAP.ts           # Dynamic GSAP+ScrollTrigger import, prefers-reduced-motion gate, ctx.revert cleanup
├── public/
│   └── images/              # ← Copy all files from "Calm Shindig _ Event Series_files/"
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── postcss.config.js
```

---

## CSS Design Token System

All tokens live in `app/globals.css` under `:root`:

| Token | Value | Usage |
|---|---|---|
| `--earth-dark` | `#1C1510` | Page background, deep surfaces |
| `--cream` | `#F5F0E8` | Primary text, light surfaces |
| `--amber` | `#C8832A` | CTAs, dividers, accent labels |
| `--amber-light` | `#E8A84A` | Hover state for amber elements |
| `--sage` | `#7A8C6E` | Subtle accent, secondary highlights |
| `--rust` | `#A0432A` | Section glow tint, atmospheric depth |
| `--ease-smooth` | `cubic-bezier(0.22, 1, 0.36, 1)` | Standard transitions |
| `--ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Button hover lift |

Tailwind extends these via `tailwind.config.ts` so you can use `bg-amber`, `text-cream`, etc.

---

## Performance & Accessibility Checklist

### Animations
- [ ] All GSAP animations use only `transform` and `opacity` (GPU-composited)
- [ ] All GSAP code wrapped in `useEffect` with `ctx.revert()` cleanup
- [ ] `useGSAP` hook gates everything behind `prefers-reduced-motion: reduce` check
- [ ] CSS reveals also gated via `@media (prefers-reduced-motion: reduce)` in globals.css
- [ ] `will-change: transform` applied only to actively animating elements, removed after animation
- [ ] GSAP + ScrollTrigger loaded via dynamic `import()` inside `useEffect` — never SSR'd

### Images
- [ ] All `next/image` components have explicit `width`/`height` or `fill` + `sizes`
- [ ] Hero image has `priority` prop (LCP element)
- [ ] All other images use default lazy loading
- [ ] Add `blurDataURL` placeholder to all `next/image` calls for CLS prevention
- [ ] Images in `public/images/` — use WebP/AVIF via `next.config.js` `formats` setting

### Core Web Vitals
- [ ] LCP target: < 2.5s (hero image is priority-loaded, no render-blocking fonts)
- [ ] CLS target: < 0.1 (all images have dimensions, no layout shifts from fonts)
- [ ] INP target: < 200ms (no heavy JS on main thread; GSAP deferred)
- [ ] Fonts loaded via `next/font/google` with `display: 'swap'`

### Accessibility (WCAG AA)
- [ ] Skip-to-content link present (`components/SkipLink.tsx`)
- [ ] Nav has `aria-label="Main navigation"`
- [ ] Mobile menu has `aria-expanded` and `aria-controls`
- [ ] All images have descriptive `alt` text (decorative images use `alt=""`)
- [ ] Color contrast: cream on earth-dark = 12.4:1 ✓; amber on earth-dark = 4.6:1 ✓
- [ ] Focus styles visible on all interactive elements (`focus-visible:ring-2 ring-amber`)
- [ ] Form inputs have associated `<label>` elements with `htmlFor`
- [ ] Artist cards have `aria-label` with name + genre
- [ ] Gallery items have descriptive `alt` text

### SEO
- [ ] `metadata` object in `app/layout.tsx` covers title, description, og:image
- [ ] Semantic HTML: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`
- [ ] Each section has `id` matching nav href anchors
- [ ] Each section has `aria-labelledby` pointing to its `<h2>`

### Bundle Size
- [ ] Run `ANALYZE=true npm run build` to check bundle
- [ ] GSAP is ~100KB gzipped — only loaded on client via dynamic import
- [ ] No heavy libraries besides GSAP
- [ ] `next/font` eliminates external font request waterfall

---

## Key Interaction Code Reference

### GSAP Hero Parallax (Hero.tsx)
```tsx
useGSAP((gsap, ScrollTrigger) => {
  return gsap.context(() => {
    gsap.to(bgRef.current, {
      yPercent: 28,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, sectionRef)
})
```

### IntersectionObserver Reveal (ScrollReveal.tsx)
```tsx
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      el.classList.add('is-visible')
      observer.unobserve(el)
    }
  },
  { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
)
```

### GSAP Stagger Entrance (SpotlightArtists.tsx)
```tsx
gsap.fromTo(cards, { opacity: 0, y: 40 }, {
  opacity: 1, y: 0,
  stagger: 0.12,
  ease: 'power3.out',
  scrollTrigger: { trigger, start: 'top 70%', toggleActions: 'play none none reverse' },
})
```

### Next.js View Transitions (next.config.js)
```js
experimental: { viewTransition: true }
```
Then in components: `import { unstable_ViewTransition as ViewTransition } from 'react'`

### CSS Film Grain (globals.css)
```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9000;
  opacity: 0.045;
  background-image: url("data:image/svg+xml,<svg xmlns='...'><filter id='g'><feTurbulence.../></filter>...</svg>");
  background-size: 200px 200px;
}
```

---

## Setup Commands

```bash
# 1. Install deps
npm install

# 2. Copy images
cp -r "Calm Shindig _ Event Series_files/"*.{jpg,jpeg,png} public/images/

# 3. Dev server
npm run dev

# 4. Build + check
npm run build

# 5. Deploy
vercel --prod
```

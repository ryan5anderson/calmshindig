'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { BLUR_PLACEHOLDER } from '@/lib/placeholder'
import { useGSAP } from '@/hooks/useGSAP'

const NAV_LINKS = [
  { href: '#artists', label: 'Artists' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#partners', label: 'Partners' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
] as const

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)

  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const indicatorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /** Scroll-driven “playhead” — which section owns the viewport (desktop nav underline). */
  useEffect(() => {
    const anchorLine = 132

    const updateActive = () => {
      if (window.innerWidth < 768) return
      if (window.scrollY < 72) {
        setActiveIdx(-1)
        return
      }
      let best = -1
      for (let i = 0; i < NAV_LINKS.length; i++) {
        const id = NAV_LINKS[i].href.slice(1)
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top <= anchorLine) best = i
      }
      setActiveIdx(best)
    }

    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [])

  useGSAP(
    (gsap) => {
      const ind = indicatorRef.current
      const ul = ind?.parentElement
      if (!ind || !ul) return

      if (activeIdx < 0) {
        gsap.to(ind, { opacity: 0, duration: 0.38, ease: 'power2.out' })
        return
      }

      const link = linkRefs.current[activeIdx]
      if (!link) return

      const ulRect = ul.getBoundingClientRect()
      const r = link.getBoundingClientRect()

      gsap.to(ind, {
        left: r.left - ulRect.left + ul.scrollLeft,
        width: r.width,
        opacity: 1,
        duration: 0.54,
        ease: 'power3.out',
      })
    },
    [activeIdx, scrolled]
  )

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ind = indicatorRef.current
    const ul = ind?.parentElement
    if (!ind || !ul) return

    if (activeIdx < 0 || window.innerWidth < 768) {
      ind.style.opacity = '0'
      return
    }

    const link = linkRefs.current[activeIdx]
    if (!link) return

    const ulRect = ul.getBoundingClientRect()
    const r = link.getBoundingClientRect()
    ind.style.left = `${r.left - ulRect.left + ul.scrollLeft}px`
    ind.style.width = `${r.width}px`
    ind.style.opacity = '1'
  }, [activeIdx, scrolled])

  const linkColor = scrolled
    ? 'text-earth-dark/65 hover:text-earth-dark'
    : 'text-cream/80 hover:text-cream'

  const hamburgerColor = scrolled ? 'bg-earth-dark' : 'bg-cream'

  /** High-contrast bar: dark on light nav, near-white on hero photo */
  const indicatorTone = scrolled ? 'bg-earth-dark' : 'bg-white shadow-[0_1px_2px_rgba(0,0,0,0.35)]'

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-smooth ${
        scrolled ? 'nav-blur' : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <a
          href="#top"
          className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage rounded"
          aria-label="Calm Shindig — home"
        >
          <Image
            src="/images/Calm Shindig Logo Color.png"
            alt="Calm Shindig"
            width={130}
            height={44}
            className="h-9 w-auto object-contain"
            priority
            sizes="130px"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
        </a>

        <ul className="hidden md:flex relative items-center gap-9" role="list">
          <span
            ref={indicatorRef}
            className={`pointer-events-none absolute -bottom-1 h-[3px] rounded-sm ${indicatorTone} will-change-[left,width,opacity]`}
            style={{ left: 0, width: 0, opacity: 0 }}
            aria-hidden
          />
          {NAV_LINKS.map(({ href, label }, i) => (
            <li key={href}>
              <a
                ref={(el) => {
                  linkRefs.current[i] = el
                }}
                href={href}
                className={`link-hover text-[0.7rem] font-semibold tracking-[0.16em] uppercase transition-colors duration-300 ${linkColor}`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="md:hidden flex flex-col gap-1.5 p-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span
            className={`block w-6 h-px transition-all duration-300 origin-center ease-smooth ${hamburgerColor}`}
            style={{ transform: menuOpen ? 'rotate(45deg) translateY(5px)' : 'none' }}
          />
          <span
            className={`block w-6 h-px transition-all duration-300 ${hamburgerColor}`}
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className={`block w-6 h-px transition-all duration-300 origin-center ease-smooth ${hamburgerColor}`}
            style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-5px)' : 'none' }}
          />
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`md:hidden nav-blur overflow-hidden transition-[max-height,opacity] duration-500 ease-smooth ${
          menuOpen
            ? 'max-h-72 opacity-100 pointer-events-auto'
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <ul className="px-6 pb-8 pt-3 flex flex-col gap-5" role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-earth-dark/65 hover:text-earth-dark text-sm font-semibold tracking-widest uppercase transition-colors duration-300"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}

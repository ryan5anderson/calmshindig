'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  stagger?: boolean
  delay?: number
  threshold?: number
}

/**
 * Lightweight IntersectionObserver-driven reveal.
 * No GSAP needed — uses CSS transitions defined in globals.css.
 */
export default function ScrollReveal({
  children,
  className = '',
  stagger = false,
  delay = 0,
  threshold = 0.12,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const id = delay
            ? setTimeout(() => el.classList.add('is-visible'), delay)
            : (el.classList.add('is-visible'), 0)
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin: '0px 0px -48px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, threshold])

  return (
    <div
      ref={ref}
      className={`${stagger ? 'reveal-stagger' : 'reveal'} ${className}`}
    >
      {children}
    </div>
  )
}

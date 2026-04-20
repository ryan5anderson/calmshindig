'use client'

import { useEffect, useRef } from 'react'

type SetupFn = (
  gsap: typeof import('gsap').gsap,
  ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger
) => gsap.Context | void

/**
 * Dynamically loads GSAP + ScrollTrigger only on the client,
 * runs the setup callback, and cleans up on unmount.
 * All animations are gated behind prefers-reduced-motion.
 */
export function useGSAP(setup: SetupFn, deps: React.DependencyList = []) {
  const ctxRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false

    async function init() {
      // Tree-shake friendly: core `gsap` + `ScrollTrigger` only — never `gsap/all` or other plugins.
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (cancelled) return

      const ctx = setup(gsap, ScrollTrigger)
      if (ctx) ctxRef.current = ctx
    }

    init()

    return () => {
      cancelled = true
      ctxRef.current?.revert()
      ctxRef.current = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

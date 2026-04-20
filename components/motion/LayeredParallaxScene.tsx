'use client'

import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { SCRUB_INERTIA } from '@/lib/motion'

type Props = {
  children: ReactNode
  className?: string
}

export default function LayeredParallaxScene({ children, className = '' }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const backRef = useRef<HTMLDivElement>(null)
  const midRef = useRef<HTMLDivElement>(null)

  useGSAP((gsap, ScrollTrigger) => {
    const root = rootRef.current
    const back = backRef.current
    const mid = midRef.current
    if (!root || !back || !mid) return

    return gsap.context(() => {
      const shared = {
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        scrub: SCRUB_INERTIA.medium,
      }

      gsap.fromTo(
        back,
        { yPercent: 6, rotation: -1.2 },
        { yPercent: -10, rotation: 0.4, ease: 'none', scrollTrigger: shared }
      )
      gsap.fromTo(
        mid,
        { yPercent: 10, rotation: 0.8 },
        { yPercent: -18, rotation: -0.55, ease: 'none', scrollTrigger: shared }
      )

      ScrollTrigger.refresh()
    }, rootRef)
  })

  return (
    <div ref={rootRef} className={`relative isolate ${className}`}>
      <div
        ref={backRef}
        className="pointer-events-none absolute -inset-[12%] rounded-[3rem] bg-gradient-to-br from-sage/40 via-dusty-rose/30 to-transparent blur-2xl opacity-90 motion-parallax-gpu"
        aria-hidden
      />
      <div
        ref={midRef}
        className="pointer-events-none absolute -right-[8%] top-1/4 h-48 w-48 rounded-full bg-sage/35 blur-3xl motion-parallax-gpu md:h-64 md:w-64"
        aria-hidden
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  )
}

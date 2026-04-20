'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@/hooks/useGSAP'

export default function WaveDivider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const waveRef = useRef<SVGSVGElement>(null)

  useGSAP((gsap, ScrollTrigger) => {
    return gsap.context(() => {
      const pathElements = waveRef.current?.querySelectorAll('path')
      if (!pathElements) return

      pathElements.forEach((path, index) => {
        const delay = index * 0.05
        gsap.to(path, {
          attr: { d: generateWavePath(20 + index * 8) },
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
            markers: false,
          },
          delay,
        })
      })

      ScrollTrigger.refresh()
    }, containerRef)
  })

  const generateWavePath = (amplitude: number) => {
    const points = []
    const width = 1440
    const height = 120
    const frequency = 0.015

    points.push(`M 0 ${height / 2}`)

    for (let x = 0; x <= width; x += 20) {
      const y = height / 2 + Math.sin(x * frequency) * amplitude
      points.push(`L ${x} ${y}`)
    }

    points.push(`L ${width} 0`)
    points.push(`L 0 0`)
    points.push('Z')

    return points.join(' ')
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-32 overflow-hidden bg-gradient-to-b from-cream via-cream to-[#c4d6b4] pointer-events-none"
      aria-hidden
    >
      <svg
        ref={waveRef}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <path
          d={generateWavePath(12)}
          fill="rgba(196, 214, 180, 0.4)"
          className="will-change-[d]"
        />
        <path
          d={generateWavePath(8)}
          fill="rgba(196, 214, 180, 0.6)"
          className="will-change-[d]"
        />
        <path
          d={generateWavePath(16)}
          fill="#c4d6b4"
          className="will-change-[d]"
        />
      </svg>
    </div>
  )
}

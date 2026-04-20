'use client'

import { useRef } from 'react'
import { useGSAP } from '@/hooks/useGSAP'

export default function WaveDivider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const waveRef = useRef<SVGSVGElement>(null)

  useGSAP((gsap, ScrollTrigger) => {
    return gsap.context(() => {
      // Start with wave hidden below (translated down), then swoosh upward as user scrolls
      gsap.fromTo(
        containerRef.current,
        { yPercent: 80 }, // Start mostly hidden below
        {
          yPercent: 0, // Swoosh up to full visibility
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current?.parentElement?.parentElement, // Hero section
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
            markers: false,
          },
        }
      )

      ScrollTrigger.refresh()
    }, containerRef)
  })

  // Wave path that curves upward into the Hero section, filled with sage color
  const generateWavePath = (amplitude: number, offset: number = 0) => {
    const width = 1440
    const height = 150
    const frequency = 0.004

    // Start at bottom-left corner
    let path = `M 0 ${height}`
    
    // Draw wave line from left to right (curves upward into hero)
    for (let x = 0; x <= width; x += 10) {
      const y = height - 20 - Math.sin((x + offset) * frequency * Math.PI) * amplitude
      path += ` L ${x} ${y}`
    }
    
    // Close path: go to bottom-right, then back to bottom-left
    path += ` L ${width} ${height} L 0 ${height} Z`

    return path
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[150px] pointer-events-none"
      aria-hidden
    >
      <svg
        ref={waveRef}
        viewBox="0 0 1440 150"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        {/* Layered waves for depth - sage green color matching PerformanceInfo section */}
        <path
          d={generateWavePath(25, 200)}
          fill="rgba(196, 214, 180, 0.5)"
        />
        <path
          d={generateWavePath(35, 100)}
          fill="rgba(196, 214, 180, 0.7)"
        />
        <path
          d={generateWavePath(45, 0)}
          fill="#c4d6b4"
        />
      </svg>
    </div>
  )
}

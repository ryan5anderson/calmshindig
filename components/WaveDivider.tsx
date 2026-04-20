'use client'

import { useRef } from 'react'
import { useGSAP } from '@/hooks/useGSAP'

export default function WaveDivider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wave1Ref = useRef<SVGPathElement>(null)
  const wave2Ref = useRef<SVGPathElement>(null)
  const wave3Ref = useRef<SVGPathElement>(null)

  // Generate smooth, rounded wave path using a single sine wave
  const generateWavePath = (amplitude: number, frequency: number, phase: number = 0) => {
    const width = 1440
    const height = 200
    const baseY = height - 20

    let path = `M 0 ${height}`
    
    for (let x = 0; x <= width; x += 5) {
      // Single smooth sine wave for rounded, flowing shape
      const y = baseY - Math.sin((x * frequency + phase) * Math.PI / 180) * amplitude
      path += ` L ${x} ${y}`
    }
    
    path += ` L ${width} ${height} L 0 ${height} Z`
    return path
  }

  useGSAP((gsap, ScrollTrigger) => {
    return gsap.context(() => {
      const heroSection = containerRef.current?.closest('section')
      const isMobile = window.innerWidth < 768
      
      // Bigger amplitudes, lower frequency for rounder waves
      const amp1Start = isMobile ? 50 : 90
      const amp2Start = isMobile ? 40 : 75
      const amp3Start = isMobile ? 35 : 60
      
      // Frequency for ~10 waves across the width (1440px)
      const waveFreq = 2.5
      
      // Animate wave paths from high amplitude to flat as user scrolls
      // Wave 1 - back layer
      gsap.fromTo(
        wave1Ref.current,
        { attr: { d: generateWavePath(amp1Start, waveFreq, 0) } },
        {
          attr: { d: generateWavePath(5, waveFreq, 0) },
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      )

      // Wave 2 - middle layer
      gsap.fromTo(
        wave2Ref.current,
        { attr: { d: generateWavePath(amp2Start, waveFreq, 30) } },
        {
          attr: { d: generateWavePath(4, waveFreq, 30) },
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )

      // Wave 3 - front layer
      gsap.fromTo(
        wave3Ref.current,
        { attr: { d: generateWavePath(amp3Start, waveFreq, 60) } },
        {
          attr: { d: generateWavePath(3, waveFreq, 60) },
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        }
      )

      ScrollTrigger.refresh()
    }, containerRef)
  })

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100px] md:h-[200px] pointer-events-none overflow-visible"
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        {/* Layered waves - start with high amplitude, flatten on scroll */}
        <path
          ref={wave1Ref}
          d={generateWavePath(90, 2.5, 0)}
          fill="rgba(196, 214, 180, 0.4)"
          className="will-change-[d]"
        />
        <path
          ref={wave2Ref}
          d={generateWavePath(75, 2.5, 30)}
          fill="rgba(196, 214, 180, 0.7)"
          className="will-change-[d]"
        />
        <path
          ref={wave3Ref}
          d={generateWavePath(60, 2.5, 60)}
          fill="#c4d6b4"
          className="will-change-[d]"
        />
      </svg>
    </div>
  )
}

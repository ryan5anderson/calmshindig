'use client'

import { useRef } from 'react'
import { useGSAP } from '@/hooks/useGSAP'

export default function WaveDivider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wave1Ref = useRef<SVGPathElement>(null)
  const wave2Ref = useRef<SVGPathElement>(null)
  const wave3Ref = useRef<SVGPathElement>(null)

  // Generate a more dynamic, multi-frequency wave path
  const generateWavePath = (amplitude: number, frequency: number, phase: number = 0) => {
    const width = 1440
    const height = 200
    const baseY = height - 30

    let path = `M 0 ${height}`
    
    for (let x = 0; x <= width; x += 5) {
      // Combine multiple sine waves for more organic, dynamic shape
      const wave1 = Math.sin((x * frequency + phase) * Math.PI / 180) * amplitude
      const wave2 = Math.sin((x * frequency * 2.5 + phase * 1.5) * Math.PI / 180) * (amplitude * 0.3)
      const wave3 = Math.sin((x * frequency * 0.5 + phase * 0.7) * Math.PI / 180) * (amplitude * 0.5)
      
      const y = baseY - wave1 - wave2 - wave3
      path += ` L ${x} ${y}`
    }
    
    path += ` L ${width} ${height} L 0 ${height} Z`
    return path
  }

  useGSAP((gsap, ScrollTrigger) => {
    return gsap.context(() => {
      const heroSection = containerRef.current?.closest('section')
      const isMobile = window.innerWidth < 768
      
      // Reduced amplitudes on mobile
      const amp1Start = isMobile ? 35 : 70
      const amp2Start = isMobile ? 28 : 55
      const amp3Start = isMobile ? 22 : 45
      
      // Animate wave paths from high amplitude to flat as user scrolls
      // Wave 1 - back layer
      gsap.fromTo(
        wave1Ref.current,
        { attr: { d: generateWavePath(amp1Start, 0.8, 0) } },
        {
          attr: { d: generateWavePath(4, 0.8, 0) },
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
        { attr: { d: generateWavePath(amp2Start, 1.2, 120) } },
        {
          attr: { d: generateWavePath(3, 1.2, 120) },
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
        { attr: { d: generateWavePath(amp3Start, 1.5, 240) } },
        {
          attr: { d: generateWavePath(2, 1.5, 240) },
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
          d={generateWavePath(70, 0.8, 0)}
          fill="rgba(196, 214, 180, 0.4)"
          className="will-change-[d]"
        />
        <path
          ref={wave2Ref}
          d={generateWavePath(55, 1.2, 120)}
          fill="rgba(196, 214, 180, 0.7)"
          className="will-change-[d]"
        />
        <path
          ref={wave3Ref}
          d={generateWavePath(45, 1.5, 240)}
          fill="#c4d6b4"
          className="will-change-[d]"
        />
      </svg>
    </div>
  )
}

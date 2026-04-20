'use client'

import { useRef, useMemo } from 'react'
import { useGSAP } from '@/hooks/useGSAP'

export default function WaveDivider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wave1Ref = useRef<SVGPathElement>(null)
  const wave2Ref = useRef<SVGPathElement>(null)
  const wave3Ref = useRef<SVGPathElement>(null)

  // Generate organic wave with random variation - always connected at baseline
  const generateWavePath = (
    amplitude: number,
    baseFrequency: number,
    phaseOffset: number,
    seed: number
  ) => {
    const width = 1440
    const height = 200
    const baseY = height // Waves grow upward from the very bottom
    
    // Seeded random for consistent randomness per layer
    const seededRandom = (n: number) => {
      const x = Math.sin(seed + n * 9999) * 10000
      return x - Math.floor(x)
    }

    let path = `M 0 ${height}`
    
    for (let x = 0; x <= width; x += 5) {
      // Combine multiple frequencies for organic feel
      const mainWave = Math.sin((x * baseFrequency + phaseOffset) * Math.PI / 180)
      const secondaryWave = Math.sin((x * baseFrequency * 0.5 + phaseOffset * 1.3) * Math.PI / 180) * 0.3
      const tertiaryWave = Math.sin((x * baseFrequency * 1.7 + phaseOffset * 0.7) * Math.PI / 180) * 0.15
      
      // Add subtle randomness that varies along the wave
      const randomVariation = seededRandom(Math.floor(x / 50)) * 0.2 - 0.1
      
      // Combined wave value (0 to 1 range, always positive = always connected)
      const combinedWave = (mainWave + secondaryWave + tertiaryWave + randomVariation + 1) / 2
      
      // Wave grows upward from baseline - never disconnects
      const y = baseY - combinedWave * amplitude
      path += ` L ${x} ${y}`
    }
    
    path += ` L ${width} ${height} L 0 ${height} Z`
    return path
  }

  // Memoize seeds for consistent randomness
  const seeds = useMemo(() => [1.234, 5.678, 9.012], [])

  useGSAP((gsap, ScrollTrigger) => {
    return gsap.context(() => {
      const heroSection = containerRef.current?.closest('section')
      const isMobile = window.innerWidth < 768
      
      // Starting amplitudes
      const amp1Start = isMobile ? 80 : 140
      const amp2Start = isMobile ? 60 : 110
      const amp3Start = isMobile ? 45 : 85
      
      // Frequency for ~10 waves
      const waveFreq = 2.5
      
      // Large phase offsets to scatter layers across more surface area
      // Each layer is offset by ~60 degrees (1/6 of a cycle) so peaks don't align
      const phase1 = 0
      const phase2 = 200
      const phase3 = 400

      // Animate wave 1 - back layer (moves most, different direction)
      gsap.fromTo(
        wave1Ref.current,
        { attr: { d: generateWavePath(amp1Start, waveFreq, phase1, seeds[0]) } },
        {
          attr: { d: generateWavePath(8, waveFreq, phase1 + 360, seeds[0]) },
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
          },
        }
      )

      // Animate wave 2 - middle layer (moves opposite direction)
      gsap.fromTo(
        wave2Ref.current,
        { attr: { d: generateWavePath(amp2Start, waveFreq, phase2, seeds[1]) } },
        {
          attr: { d: generateWavePath(6, waveFreq, phase2 - 180, seeds[1]) },
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      )

      // Animate wave 3 - front layer (subtle movement)
      gsap.fromTo(
        wave3Ref.current,
        { attr: { d: generateWavePath(amp3Start, waveFreq, phase3, seeds[2]) } },
        {
          attr: { d: generateWavePath(4, waveFreq, phase3 + 120, seeds[2]) },
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )

      ScrollTrigger.refresh()
    }, containerRef)
  })

  // Initial wave paths - 10 waves with scattered phase offsets
  const initialWave1 = generateWavePath(140, 2.5, 0, seeds[0])
  const initialWave2 = generateWavePath(110, 2.5, 200, seeds[1])
  const initialWave3 = generateWavePath(85, 2.5, 400, seeds[2])

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
        {/* Layered waves - organic spacing, always connected at base */}
        <path
          ref={wave1Ref}
          d={initialWave1}
          fill="rgba(196, 214, 180, 0.35)"
          className="will-change-[d]"
        />
        <path
          ref={wave2Ref}
          d={initialWave2}
          fill="rgba(196, 214, 180, 0.6)"
          className="will-change-[d]"
        />
        <path
          ref={wave3Ref}
          d={initialWave3}
          fill="#c4d6b4"
          className="will-change-[d]"
        />
      </svg>
    </div>
  )
}

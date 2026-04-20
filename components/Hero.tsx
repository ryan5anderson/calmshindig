'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { BLUR_PLACEHOLDER } from '@/lib/placeholder'
import { useGSAP } from '@/hooks/useGSAP'
import { SCRUB_INERTIA } from '@/lib/motion'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const midParallaxRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

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

      const mid = midParallaxRef.current
      if (mid) {
        gsap.fromTo(
          mid,
          { yPercent: 5 },
          {
            yPercent: -16,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: SCRUB_INERTIA.medium,
            },
          }
        )
      }

      const content = contentRef.current
      if (content) {
        gsap.fromTo(
          content,
          { rotation: -1.2 },
          {
            rotation: 1.2,
            transformOrigin: '50% 40%',
            duration: 3.6,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          }
        )
      }

      ScrollTrigger.refresh()
    }, sectionRef)
  })

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-[-15%] will-change-transform"
        aria-hidden
      >
        <Image
          src="/images/photo aug 30 2023, 7 34 28 pm.jpg"
          alt=""
          fill
          priority
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
        {/* Gradient fades to cream at bottom to blend into page */}
        <div className="absolute inset-0 bg-gradient-to-b from-earth-dark/60 via-earth-dark/20 to-cream" />
        <div className="absolute inset-0 bg-gradient-to-r from-earth-dark/25 via-transparent to-earth-dark/15" />
      </div>

      {/* Mid-layer parallax: drifts slower than photo — depth without literal waves */}
      <div
        ref={midParallaxRef}
        className="absolute inset-[-20%] pointer-events-none motion-parallax-gpu"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 42% 38%, rgba(126,155,114,0.28) 0%, transparent 62%), radial-gradient(ellipse 40% 35% at 72% 62%, rgba(200,181,173,0.22) 0%, transparent 58%)',
        }}
        aria-hidden
      />

      {/* Subtle sage glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 40%, rgba(126,155,114,0.18) 0%, transparent 68%)',
        }}
        aria-hidden
      />

      {/* Hero copy tilts gently; CTAs stay level */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pb-24">
        <div ref={contentRef} className="will-change-transform">
          <p
            className="text-dusty-rose font-sans text-[0.65rem] font-bold tracking-[0.3em] uppercase mb-7 opacity-0 animate-fade-up"
            aria-hidden
          >
            calm shindig
          </p>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-[4.5rem] leading-[1.05] text-cream mb-10 opacity-0 animate-fade-up-delay">
            The intimate live&nbsp;performance series disguised as a backyard kickback
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up-delay-2">
          <a href="#artists" className="btn-primary-light">
            Calm Down
          </a>
          <a href="#about" className="btn-outline-light">
            Learn More
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-up-delay-3"
        aria-hidden
      >
        <span className="text-cream/80 text-[0.6rem] font-sans font-semibold tracking-[0.25em] uppercase drop-shadow-sm">
          Scroll
        </span>
        <div className="scroll-indicator w-0.5 h-10 rounded-full bg-gradient-to-b from-cream/90 to-cream/15" />
      </div>
    </section>
  )
}

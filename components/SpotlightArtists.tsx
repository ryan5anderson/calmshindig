'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { BLUR_PLACEHOLDER } from '@/lib/placeholder'
import ScrollReveal from './ScrollReveal'
import { useGSAP } from '@/hooks/useGSAP'
import { SCRUB_INERTIA } from '@/lib/motion'

const SPOTLIGHT_ARTISTS = [
  {
    name: 'Rhakim Ali',
    slug: 'rhakim-ali',
    image: '/images/Calm Shindig-41.jpg',
    genre: 'R&B / Soul',
  },
  {
    name: 'Low.bo',
    slug: 'lowbo',
    image: '/images/ef963d_f2a4636ff0c14622b5d4bcb7d195eb84f000.jpg',
    genre: 'Alt R&B',
  },
  {
    name: 'Kathryn From Mars',
    slug: 'kathryn-from-mars',
    image: '/images/ef963d_ddb5547487da4e8e919f2f244d6867f0f000.jpg',
    genre: 'Indie / Electronic',
  },
  {
    name: 'MXGRAN',
    slug: 'mxgran',
    image: '/images/ef963d_919bd7fd0cb34c8e861fecbcbd20fe17f000.jpg',
    genre: 'Hip-Hop',
  },
  {
    name: 'Yourz',
    slug: 'yourz',
    image: '/images/ef963d_0a746a2466f24beba68d93995da0b5e8f000.jpg',
    genre: 'Neo-Soul',
  },
]

export default function SpotlightArtists() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const spinRef = useRef<HTMLDivElement>(null)

  useGSAP((gsap, ScrollTrigger) => {
    if (window.innerWidth < 1024) return

    return gsap.context(() => {
      const cards = trackRef.current?.querySelectorAll<HTMLElement>('.artist-card')
      if (!cards?.length) return

      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      const panel = spinRef.current
      if (panel) {
        gsap.fromTo(
          panel,
          { rotation: -1.15 },
          {
            rotation: 1.4,
            transformOrigin: '50% 42%',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              end: 'bottom 22%',
              scrub: SCRUB_INERTIA.loose,
            },
          }
        )
      }

      ScrollTrigger.refresh()
    }, sectionRef)
  })

  return (
    <section
      ref={sectionRef}
      id="artists"
      className="section-cream py-28 lg:py-36 px-6"
      aria-labelledby="spotlight-heading"
    >
      <div ref={spinRef} className="max-w-7xl mx-auto will-change-transform">
        {/* Header */}
        <ScrollReveal className="mb-16">
          <div className="max-w-xl">
            <div className="divider-sage" />
            <h2
              id="spotlight-heading"
              className="font-serif text-4xl sm:text-5xl text-earth-dark mb-5"
            >
              Spotlight Performers
            </h2>
            <p className="font-sans text-earth-dark/60 text-[0.95rem] leading-relaxed">
              We showcase quality, no matter where you are in your journey.
              All that matters is the music and your undoubted potential.
            </p>
            <p className="font-sans text-earth-dark/60 text-[0.95rem] leading-relaxed mt-3">
              Our spotlight artist closes out each event with a 30-minute set,
              bringing something unique to each Shindig.
            </p>
          </div>
        </ScrollReveal>

        {/* Artist grid */}
        <div
          ref={trackRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5"
          role="list"
          aria-label="Spotlight performers"
        >
          {SPOTLIGHT_ARTISTS.map(({ name, slug, image, genre }) => (
            <article
              key={slug}
              className="artist-card group"
              role="listitem"
              tabIndex={0}
              aria-label={`${name} — ${genre}`}
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={image}
                  alt={`${name} performing at Calm Shindig`}
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                  className="object-cover"
                  sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
                />
              </div>
              {/* Card overlay label — stays cream since it's over a photo with dark gradient */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
                <p className="font-serif text-lg text-cream leading-tight">{name}</p>
                <p className="font-sans text-[0.65rem] text-dusty-rose uppercase tracking-widest mt-0.5">
                  {genre}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

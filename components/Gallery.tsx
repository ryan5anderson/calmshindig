'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { BLUR_PLACEHOLDER } from '@/lib/placeholder'
import ScrollReveal from './ScrollReveal'
import { useGSAP } from '@/hooks/useGSAP'

const GALLERY_IMAGES = [
  { src: '/images/45270026_JPEG.jpeg', alt: 'Calm Shindig event moment' },
  { src: '/images/45280003_JPEG.jpeg', alt: 'Crowd at Calm Shindig' },
  { src: '/images/45280006_JPEG.jpeg', alt: 'Live performance' },
  { src: '/images/45260001_JPEG.jpeg', alt: 'Artist on stage' },
  { src: '/images/photo may 20 2024, 2 51 28 pm.jpg', alt: 'Shindig gathering' },
  { src: '/images/photo may 20 2024, 2 51 38 pm (1).jpg', alt: 'Backyard kickback' },
  { src: '/images/photo may 20 2024, 2 52 05 pm.jpg', alt: 'Music performance' },
  { src: '/images/photo may 20 2024, 2 52 22 pm.jpg', alt: 'Event atmosphere' },
  { src: '/images/photo may 20 2024, 2 52 32 pm (1).jpg', alt: 'Live band set' },
  { src: '/images/photo may 20 2024, 2 52 36 pm.jpg', alt: 'Performer spotlight' },
  { src: '/images/photo may 20 2024, 2 54 23 pm (1).jpg', alt: 'Intimate crowd' },
  { src: '/images/197gultman003157-r1-055-26.jpg', alt: 'Film photo from Shindig' },
]

const SPANS = [
  'col-span-1 row-span-2',
  'col-span-1 row-span-1',
  'col-span-2 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-2 row-span-1',
  'col-span-1 row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
]

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP((gsap, ScrollTrigger) => {
    return gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll<HTMLElement>('.gallery-item')
      if (!items?.length) return

      gsap.fromTo(
        items,
        { opacity: 0, scale: 0.96, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)
  })

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="section-sage-tint py-28 lg:py-36 px-6"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="mb-16">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="divider-sage" />
              <h2
                id="gallery-heading"
                className="font-serif text-4xl sm:text-5xl text-earth-dark"
              >
                [GALLERY]
              </h2>
            </div>
            <a
              href="https://www.instagram.com/calmshindig/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              aria-label="Follow Calm Shindig on Instagram"
            >
              Follow ↗
            </a>
          </div>
        </ScrollReveal>

        <div
          className="grid grid-cols-3 lg:grid-cols-4 auto-rows-[200px] lg:auto-rows-[220px] gap-3"
          role="list"
          aria-label="Photo gallery"
        >
          {GALLERY_IMAGES.map(({ src, alt }, i) => (
            <div
              key={src}
              className={`gallery-item ${SPANS[i] ?? 'col-span-1 row-span-1'}`}
              role="listitem"
            >
              <Image
                src={src}
                alt={alt}
                fill
                loading="lazy"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                className="object-cover w-full h-full"
                sizes="(max-width:768px) 33vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

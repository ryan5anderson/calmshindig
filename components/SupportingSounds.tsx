import Image from 'next/image'
import { BLUR_PLACEHOLDER } from '@/lib/placeholder'
import ScrollReveal from './ScrollReveal'

const SUPPORTING_ARTISTS = [
  { name: 'Woah Nelliee', role: '', image: '/images/15140005.jpg' },
  { name: 'Ohlei', role: '', image: '/images/15140025.jpg' },
  { name: 'Butterfield', role: 'Jazz, Funk, RnB, Fusion Band', image: '/images/15140034.jpg' },
  { name: 'Blck Teeth', role: 'DJ Duo', image: '/images/15140024.jpg' },
  { name: 'Mazark', role: 'Musician', image: '/images/15140015.jpg' },
  { name: 'dvl3x', role: '', image: '/images/15130024.jpg' },
  { name: '.Eehou', role: 'Musician', image: '/images/15130027.jpg' },
  { name: 'Black Mdna', role: '', image: '/images/15130032.jpg' },
  { name: 'Brick Ashley', role: '', image: '/images/15130005.jpg' },
  { name: 'Oliver Vecellio', role: 'DJ & Artist', image: '/images/15130012.jpg' },
  { name: 'Theo R', role: 'Artist', image: '/images/15130007.jpg' },
]

export default function SupportingSounds() {
  return (
    <section
      className="section-rose-tint py-28 lg:py-36 px-6"
      aria-labelledby="supporting-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal className="mb-6">
          <div className="divider-sage" />
          <h2
            id="supporting-heading"
            className="font-serif text-4xl sm:text-5xl text-earth-dark mb-5"
          >
            Supporting Sounds
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80} className="mb-16 max-w-2xl">
          <div className="space-y-3 text-earth-dark/60 font-sans text-[0.95rem] leading-relaxed">
            <p>Live Bands &amp; DJs while you're conversing, eating, and drinking.</p>
            <p>Supplying the soundtrack to new friendships.</p>
            <p>
              Whether it's Soul, Jazz, Hip-Hop, House, or RnB, the music adds to
              the elevated backyard atmosphere we've built.
            </p>
          </div>
        </ScrollReveal>

        {/* Artists grid — staggered reveal */}
        <ScrollReveal
          stagger
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4"
        >
          {SUPPORTING_ARTISTS.map(({ name, role, image }) => (
            <article
              key={name}
              className="group"
              aria-label={role ? `${name} — ${role}` : name}
            >
              <div className="gallery-item relative aspect-square mb-3 rounded overflow-hidden bg-earth-dark/5">
                <Image
                  src={image}
                  alt={`${name} at Calm Shindig`}
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                  className="object-cover"
                  sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 17vw"
                />
              </div>
              <p className="font-sans text-sm font-medium text-earth-dark/90">{name}</p>
              {role && (
                <p className="font-sans text-[0.65rem] text-earth-dark/40 uppercase tracking-widest mt-0.5">
                  {role}
                </p>
              )}
            </article>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}

import Image from 'next/image'
import { BLUR_PLACEHOLDER } from '@/lib/placeholder'
import ScrollReveal from './ScrollReveal'
import LayeredParallaxScene from '@/components/motion/LayeredParallaxScene'

export default function About() {
  return (
    <section
      id="about"
      className="section-cream py-28 lg:py-36 px-6"
      aria-labelledby="about-heading"
    >
      <LayeredParallaxScene className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Image side */}
        <ScrollReveal>
          <div className="relative">
            <div className="img-zoom rounded-sm overflow-hidden aspect-[4/5]">
              <Image
                src="/images/photo oct 13 2023, 2 30 52 pm.jpg"
                alt="Calm Shindig backyard atmosphere"
                fill
                loading="lazy"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating accent image */}
            <div className="img-zoom absolute -bottom-6 -right-6 w-2/5 rounded-sm overflow-hidden aspect-square border-4 border-cream shadow-xl hidden md:block">
              <Image
                src="/images/photo oct 13 2023, 2 31 05 pm.jpg"
                alt="Crowd enjoying the show"
                fill
                loading="lazy"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                className="object-cover"
                sizes="(max-width:768px) 40vw, 20vw"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Text side */}
        <ScrollReveal delay={150}>
          <div>
            <div className="divider-sage" />
            <h2
              id="about-heading"
              className="font-serif text-4xl sm:text-5xl text-earth-dark leading-tight mb-8"
            >
              About Us
            </h2>
            <div className="space-y-4 text-earth-dark/60 font-sans text-[0.95rem] leading-relaxed mb-10">
              <p>
                Calm Shindig is an intimate live performance series set in the heart of
                University City, Philadelphia. We bring together artists, music lovers,
                and community in a deliberately small, curated backyard setting.
              </p>
              <p>
                Every Shindig is equal parts music event and social gathering — a place
                where the crowd is just as important as the lineup. We keep it intimate
                by design, because the best music moments happen when everyone is close
                enough to feel it.
              </p>
            </div>
            <a href="#contact" className="btn-primary">
              Learn More
            </a>
          </div>
        </ScrollReveal>
        </div>
      </LayeredParallaxScene>
    </section>
  )
}

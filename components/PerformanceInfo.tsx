import Image from 'next/image'
import { BLUR_PLACEHOLDER } from '@/lib/placeholder'
import ScrollReveal from './ScrollReveal'
import SageCreamWaveBridge from './SageCreamWaveBridge'

export default function PerformanceInfo() {
  return (
    <section
      className="section-sage-tint relative pt-28 lg:pt-36 px-6 pb-0 overflow-x-clip"
      aria-labelledby="performance-heading"
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center pb-24 lg:pb-28">
        {/* Text block */}
        <ScrollReveal>
          <div>
            <div className="divider-sage" />
            <span className="tag mb-5 inline-block">Intimate</span>
            <h2
              id="performance-heading"
              className="font-serif text-4xl sm:text-5xl text-earth-dark leading-tight mb-8"
            >
              Live Performance&nbsp;Series
            </h2>
            <div className="space-y-5 text-earth-dark/65 font-sans text-[0.95rem] leading-relaxed">
              <p>
                For performers, the Shindig offers a welcoming space to share your art.
                You'll be playing for an engaged crowd{' '}
                <span className="text-sage font-semibold">in person</span>, plus a
                growing digital audience.
              </p>
              <p>
                Our production team captures high-quality content from your set, so your
                performance doesn't just live in the moment — it continues to connect
                and reach new listeners{' '}
                <span className="text-sage font-semibold">online</span>.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-8">
              {[
                { label: 'Intimate', sub: 'Curated audience' },
                { label: 'Recorded', sub: 'Pro production' },
                { label: 'Community', sub: 'New connections' },
              ].map(({ label, sub }) => (
                <div key={label}>
                  <p className="font-serif text-2xl text-sage mb-1">{label}</p>
                  <p className="font-sans text-[0.72rem] text-earth-dark/40 uppercase tracking-widest">
                    {sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Image collage */}
        <ScrollReveal delay={150}>
          <div className="grid grid-cols-2 gap-3">
            <div className="img-zoom rounded-sm overflow-hidden aspect-[3/4]">
              <Image
                src="/images/photo oct 13 2023, 2 30 58 pm.jpg"
                alt="Live performance at Calm Shindig"
                fill
                loading="lazy"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                className="object-cover"
                sizes="(max-width:768px) 50vw, 25vw"
              />
            </div>
            <div className="img-zoom rounded-sm overflow-hidden aspect-[3/4] mt-6">
              <Image
                src="/images/photo may 20 2024, 2 52 36 pm.jpg"
                alt="Artist performing at Calm Shindig"
                fill
                loading="lazy"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                className="object-cover"
                sizes="(max-width:768px) 50vw, 25vw"
              />
            </div>
            <div className="img-zoom rounded-sm overflow-hidden aspect-video col-span-2">
              <Image
                src="/images/Side look w amp.png"
                alt="Stage setup with amplifier"
                fill
                loading="lazy"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
      <SageCreamWaveBridge />
    </section>
  )
}

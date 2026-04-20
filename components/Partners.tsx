import ScrollReveal from './ScrollReveal'

export default function Partners() {
  return (
    <section
      id="partners"
      className="section-rose-tint section-divider py-24 lg:py-32 px-6"
      aria-labelledby="partners-heading"
    >
      <div className="max-w-6xl mx-auto text-center">
        <ScrollReveal>
          <div className="divider-sage mx-auto" />
          <h2
            id="partners-heading"
            className="font-serif text-4xl sm:text-5xl text-earth-dark mb-6"
          >
            Partner With Us
          </h2>
          <p className="font-sans text-earth-dark/60 text-[0.95rem] leading-relaxed max-w-xl mx-auto mb-10">
            We partner with brands, venues, and organizations that share our values —
            community, creativity, and authentic culture. If that sounds like you,
            let's build something together.
          </p>
          <a href="#contact" className="btn-primary">
            Get In Touch
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}

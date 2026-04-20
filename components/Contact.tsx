'use client'

import { FormEvent, useState } from 'react'
import ScrollReveal from './ScrollReveal'

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? ''

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (!FORMSPREE_ENDPOINT) {
      setError(
        'Add NEXT_PUBLIC_FORMSPREE_ENDPOINT to your environment (your Formspree form URL, e.g. https://formspree.io/f/abcdwxyz).'
      )
      return
    }

    const form = e.currentTarget
    setSubmitting(true)

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })

      const data = (await res.json().catch(() => ({}))) as {
        error?: string
        errors?: Array<{ message?: string }>
      }

      if (!res.ok) {
        const msg =
          data.error ||
          data.errors
            ?.map((err) => err.message)
            .filter(Boolean)
            .join(' ') ||
          'Could not send the message. Try again or email us directly.'
        throw new Error(msg)
      }

      setSent(true)
      form.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="section-sage-tint py-28 lg:py-36 px-6"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Info */}
        <ScrollReveal>
          <div>
            <div className="divider-sage" />
            <h2
              id="contact-heading"
              className="font-serif text-4xl sm:text-5xl text-earth-dark mb-8"
            >
              Contact
            </h2>

            <dl className="space-y-5 font-sans text-sm">
              <div>
                <dt className="text-[0.65rem] uppercase tracking-widest text-sage mb-1 font-semibold">Email</dt>
                <dd>
                  <a
                    href="mailto:toddguttman@gmail.com"
                    className="link-hover text-earth-dark/75 hover:text-earth-dark"
                  >
                    toddguttman@gmail.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.65rem] uppercase tracking-widest text-sage mb-1 font-semibold">Phone</dt>
                <dd>
                  <a
                    href="tel:+12035541681"
                    className="link-hover text-earth-dark/75 hover:text-earth-dark"
                  >
                    203-554-1681
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.65rem] uppercase tracking-widest text-sage mb-1 font-semibold">Location</dt>
                <dd className="text-earth-dark/70">
                  University City
                  <br />
                  Philadelphia, PA 19104
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex gap-4">
              <a
                href="https://www.instagram.com/calmshindig/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                aria-label="Instagram"
              >
                Instagram ↗
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Form */}
        <ScrollReveal delay={120}>
          {sent ? (
            <div className="flex flex-col items-start justify-center h-full">
              <p className="font-serif text-3xl text-earth-dark mb-3">Thanks!</p>
              <p className="font-sans text-earth-dark/55 text-sm">We'll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form">
              <div>
                <label
                  htmlFor="name"
                  className="block text-[0.7rem] uppercase tracking-widest text-earth-dark/45 mb-2 font-sans font-semibold"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  className="input-field"
                  placeholder="Your name"
                  disabled={submitting}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-[0.7rem] uppercase tracking-widest text-earth-dark/45 mb-2 font-sans font-semibold"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="input-field"
                  placeholder="your@email.com"
                  disabled={submitting}
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-[0.7rem] uppercase tracking-widest text-earth-dark/45 mb-2 font-sans font-semibold"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="input-field"
                  defaultValue=""
                  disabled={submitting}
                >
                  <option value="" disabled>
                    Select a topic
                  </option>
                  <option value="artist">For Artists</option>
                  <option value="partner">Partner With Us</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-[0.7rem] uppercase tracking-widest text-earth-dark/45 mb-2 font-sans font-semibold"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="input-field resize-none"
                  placeholder="Tell us about yourself..."
                  disabled={submitting}
                />
              </div>
              {error ? (
                <p
                  className="font-sans text-sm text-earth-dark/90 bg-dusty-rose/20 border border-dusty-rose/35 rounded px-3 py-2.5"
                  role="alert"
                >
                  {error}
                </p>
              ) : null}
              <button type="submit" className="btn-primary w-full disabled:opacity-60 disabled:pointer-events-none" disabled={submitting}>
                {submitting ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}

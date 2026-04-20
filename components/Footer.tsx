import Image from 'next/image'
import { BLUR_PLACEHOLDER } from '@/lib/placeholder'

const FOOTER_LINKS = [
  { href: '#top', label: 'About' },
  { href: '#artists', label: 'For Artists' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#partners', label: 'Partner With Us' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer
      className="bg-earth-dark py-14 px-6"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-10">
          {/* Logo */}
          <a href="#top" aria-label="Calm Shindig — home">
            <Image
              src="/images/FINAL-SHINDIG-LOGO-SECONDARY.png"
              alt="Calm Shindig"
              width={100}
              height={60}
              loading="lazy"
              className="h-14 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
              sizes="100px"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
            />
          </a>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {FOOTER_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="footer-link">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <a
            href="https://www.instagram.com/calmshindig/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link hover:text-sage transition-colors duration-300 text-xs tracking-widest uppercase"
            aria-label="Instagram"
          >
            Instagram ↗
          </a>
        </div>

        <div className="border-t border-cream/10 pt-8">
          <p className="font-sans text-[0.7rem] text-cream/25 tracking-wide">
            © 2024 by Canvas Enterprises LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

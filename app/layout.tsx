import type { Metadata } from 'next'
import './globals.css'

const GOOGLE_FONTS =
  'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap'

export const metadata: Metadata = {
  title: 'Calm Shindig | Event Series',
  description:
    'The intimate live performance series disguised as a backyard kickback. Live music in University City, Philadelphia.',
  openGraph: {
    title: 'Calm Shindig | Event Series',
    description:
      'The intimate live performance series disguised as a backyard kickback.',
    siteName: 'Calm Shindig',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={GOOGLE_FONTS} rel="stylesheet" />
      </head>
      <body className="bg-cream text-earth-dark font-sans antialiased selection:bg-sage/20 selection:text-earth-dark">
        {children}
      </body>
    </html>
  )
}

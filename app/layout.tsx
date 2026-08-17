import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kontour Studios — Digital Experiences',
  description:
    'Independent creative studio shaping digital experiences through kinetic form, identity and technology.',
  metadataBase: new URL('https://kontour-studios.vercel.app'),
  openGraph: {
    title: 'Kontour Studios — Digital Experiences',
    description: 'Kinetic identities, digital products and creative technology.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#080908',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

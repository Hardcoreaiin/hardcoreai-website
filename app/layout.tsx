import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Providers } from './providers'

const BASE_URL = 'https://hardcoreai.in'

export const viewport: Viewport = {
  themeColor: '#7C3AED',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'HardcoreAI — The Infrastructure Layer for Embedded Engineering',
    template: '%s | HardcoreAI',
  },
  description:
    'HardcoreAI converts complex hardware specifications into verified engineering execution—helping teams prototype faster, reduce bring-up delays, and launch embedded products sooner.',
  keywords: [
    'embedded engineering',
    'firmware development',
    'hardware AI',
    'embedded AI',
    'firmware generation',
    'hardware documentation',
    'embedded systems',
    'microcontroller',
    'PCB design',
    'hardware constraint verification',
  ],
  authors: [{ name: 'HardcoreAI', url: BASE_URL }],
  creator: 'HardcoreAI',
  publisher: 'HardcoreAI',
  applicationName: 'HardcoreAI',
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // ─── Favicon & Icons ───────────────────────────────────────
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/android-chrome-512x512.png', color: '#7C3AED' },
    ],
  },
  manifest: '/site.webmanifest',
  // ─── Open Graph ────────────────────────────────────────────
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'HardcoreAI',
    title: 'HardcoreAI — The Infrastructure Layer for Embedded Engineering',
    description:
      'HardcoreAI converts complex hardware specifications into verified engineering execution—helping teams prototype faster, reduce bring-up delays, and launch embedded products sooner.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HardcoreAI — The Infrastructure Layer for Embedded Engineering',
      },
    ],
  },
  // ─── Twitter / X Card ──────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'HardcoreAI — The Infrastructure Layer for Embedded Engineering',
    description:
      'HardcoreAI converts complex hardware specifications into verified engineering execution—helping teams prototype faster and launch embedded products sooner.',
    images: ['/og-image.png'],
    creator: '@hardcoreai',
    site: '@hardcoreai',
  },
  // ─── Canonical ─────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
  },
  // ─── Verification ──────────────────────────────────────────
  category: 'technology',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Explicit favicon tags for maximum browser compatibility */}
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#7C3AED" />
        <meta name="theme-color" content="#7C3AED" />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#020204' }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'HARDCOREAI — Firmware Development Platform for Hardware Teams',
  description: 'Turn datasheets into working firmware. Build, flash, debug, and validate embedded software in a single AI-powered environment.',
  openGraph: {
    title: 'HARDCOREAI — Firmware Development Platform',
    description: 'Build, flash, debug, and validate embedded software in a single environment.',
    url: 'https://hardcoreai.in',
    siteName: 'HARDCOREAI',
  },
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
      </head>
      <body style={{ margin: 0, padding: 0, background: '#0A0A0F' }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

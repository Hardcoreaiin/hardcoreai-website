import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'HardcoreAI — The Infrastructure Layer for Embedded Engineering',
  description: 'HardcoreAI converts hardware documentation into verified engineering execution—helping teams move from product idea to working hardware dramatically faster.',
  openGraph: {
    title: 'HardcoreAI — The Infrastructure Layer for Embedded Engineering',
    description: 'HardcoreAI converts hardware documentation into verified engineering execution—helping teams move from product idea to working hardware dramatically faster.',
    url: 'https://hardcoreai.in',
    siteName: 'HardcoreAI',
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
      <body style={{ margin: 0, padding: 0, background: '#020204' }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

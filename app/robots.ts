import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Googlebot-Favicon',
        allow: '/',
      },
    ],
    sitemap: 'https://hardcoreai.in/sitemap.xml',
  }
}

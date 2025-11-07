import { MetadataRoute } from 'next';

// تكوين Robots.txt
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/*.json',
        '/*.xml'
      ]
    },
    sitemap: 'https://your-domain.com/sitemap.xml'
  };
}

// تكوين Sitemap.xml
export async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: 'https://your-domain.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://your-domain.com/chat',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    }
  ];
}

// تكوين Manifest.json
export const manifest: MetadataRoute.Manifest = {
  name: 'Nexus AI Platform',
  short_name: 'NexusAI',
  description: 'منصة الذكاء الاصطناعي المتقدمة',
  start_url: '/',
  display: 'standalone',
  background_color: '#ffffff',
  theme_color: '#000000',
  icons: [
    {
      src: '/icons/icon-192.png',
      sizes: '192x192',
      type: 'image/png',
  purpose: 'maskable'
    },
    {
      src: '/icons/icon-512.png',
      sizes: '512x512',
      type: 'image/png',
  purpose: 'maskable'
    }
  ]
};

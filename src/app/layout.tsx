import type { Metadata, Viewport } from 'next';
import { Cairo, Inter } from 'next/font/google';
import './globals.css';

// Optimized font loading
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

const cairo = Cairo({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-cairo',
  preload: true,
});

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

// Enhanced SEO metadata
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://zoro-ai.dev'),

  title: {
    default: 'ZORO-AI - Advanced AI Platform | GPT-4, Claude, Gemini',
    template: '%s | ZORO-AI',
  },

  description:
    'Experience the future of AI with ZORO-AI. Advanced AI conversation platform combining GPT-4, Claude, Gemini and more. Fast, secure, and powerful AI conversations.',

  keywords: [
    'artificial intelligence',
    'AI platform',
    'GPT-4',
    'Claude AI',
    'Google Gemini',
    'OpenAI',
    'Anthropic',
    'AI chatbot',
    'NexusAI',
    'machine learning',
    'natural language processing',
    'AI assistant',
    'conversational AI',
    'multi-model AI',
  ],

  authors: [{ name: 'ZORO-AI Team', url: 'https://zoro-ai.dev' }],
  creator: 'ZORO-AI',
  publisher: 'ZORO-AI',

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

  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ar_SA'],
    url: 'https://zoro-ai.dev',
    siteName: 'ZORO-AI',
    title: 'ZORO-AI - Advanced AI Platform',
    description:
      'Experience the future of AI. Advanced AI conversation platform combining GPT-4, Claude, Gemini and more.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NexusAI - Advanced AI Platform',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'ZORO-AI - Advanced AI Platform',
    description:
      'Experience the future of AI. Advanced AI conversation platform combining GPT-4, Claude, Gemini and more.',
    images: ['/twitter-image.png'],
    creator: '@zoroai',
  },

  manifest: '/manifest.json',

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },

  alternates: {
    canonical: 'https://zoro-ai.dev',
    languages: {
      'en-US': 'https://zoro-ai.dev/en',
      'ar-SA': 'https://zoro-ai.dev/ar',
    },
  },

  category: 'technology',
};

import { Analytics } from '@/components/analytics';
import { ErrorBoundary } from '@/components/error-boundary';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`scroll-smooth ${inter.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://api.openai.com" />
        <link rel="preconnect" href="https://api.anthropic.com" />
        <link rel="dns-prefetch" href="https://generativelanguage.googleapis.com" />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'ZORO-AI',
              description: 'Advanced AI conversation platform combining GPT-4, Claude, Gemini and more',
              url: 'https://zoro-ai.dev',
              applicationCategory: 'BusinessApplication',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '1250',
              },
            }),
          }}
        />
      </head>
      <body className={`min-h-screen bg-black font-sans antialiased`}>
        <ErrorBoundary>
          {/* إطار الأمان للمحتوى المتحرك */}
          <div className="overflow-x-hidden">{children}</div>

          {/* إطار التحميل المتأخر */}
          <div id="modal-root"></div>

          {/* تحليلات وقياسات الأداء */}
          <Analytics />
        </ErrorBoundary>
      </body>
    </html>
  );
}

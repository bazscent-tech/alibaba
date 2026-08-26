import type { Metadata, Viewport } from 'next'
import { Cairo } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ScrollToTop } from '@/components/scroll-to-top'
import { OfflineIndicator } from '@/components/offline-indicator'
import { ToastContainer } from '@/components/toast-notification'
import { BottomNav } from '@/components/bottom-nav'

const cairo = Cairo({ 
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'شبام جملة - منصة التجارة الإلكترونية B2B',
  description: 'شبام جملة - سوق جملة عربي لاكتشاف المنتجات والموردين المناسبين لنمو الأعمال.',
  generator: 'v0.app',
  manifest: '/manifest.json',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'شبام جملة - منصة التجارة الإلكترونية B2B',
    description: 'سوق جملة عربي لاكتشاف المنتجات والموردين وفرص النمو.',
    type: 'website',
    locale: 'ar_SA',
    siteName: 'شبام جملة',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'شبام جملة',
    description: 'سوق جملة عربي لاكتشاف المنتجات والموردين وفرص النمو.',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className="bg-background">
      <head>
        {/* Preconnect to image CDNs */}
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className={`${cairo.className} font-sans antialiased overscroll-none smooth-scroll`}>
        <div className="app-frame">{children}</div>
        <BottomNav />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <ScrollToTop />
        <ToastContainer />
        <OfflineIndicator />
      </body>
    </html>
  )
}

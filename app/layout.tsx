import type { Metadata, Viewport } from 'next'
import { Cairo } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cairo = Cairo({ 
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'شبام جملة - منصة التجارة الإلكترونية B2B',
  description: 'شبام جملة - أكبر منصة عربية للتجارة الإلكترونية بين الشركات - موردون موثوقون، أسعار الجملة، شحن عالمي',
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
    description: 'أكبر منصة عربية للتجارة الإلكترونية بين الشركات',
    type: 'website',
    locale: 'ar_SA',
    siteName: 'شبام جملة',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'شبام جملة',
    description: 'أكبر منصة عربية للتجارة الإلكترونية بين الشركات',
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
      <body className={`${cairo.className} font-sans antialiased overscroll-none`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

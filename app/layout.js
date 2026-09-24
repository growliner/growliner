import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata = {
  title: 'Growliner - Tech & Growth Partner | Web, App & Digital Marketing Agency in Jaipur',
  description: 'Growliner is a leading IT & digital growth agency in Jaipur. We build lightning-fast websites, intuitive mobile apps, and data-driven marketing campaigns to scale your brand globally.',
  keywords: 'web development Jaipur, app development, digital marketing agency, SEO Jaipur, UI UX design, React Next.js agency, growth partner',
  authors: [{ name: 'Growliner' }],
  other: {
    "google-site-verification": "INrNPIabSzBZmVQ_KIa-aZhXmhz5FlklbAzL0SBA1k4",
    },
  openGraph: {
    title: 'Growliner - Tech & Growth Partner',
    description: 'Empowering Businesses with Next-Gen Tech & Digital Growth in Jaipur.',
    url: 'https://growliner.com',
    siteName: 'Growliner',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Growliner - Tech & Growth Partner',
    description: 'Web, App, SEO & Design that scales your brand.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="antialiased bg-white text-slate-900 font-sans">
        {children}
      </body>
    </html>
  )
}

import type { Metadata } from 'next';
import { Outfit, Space_Mono, Playfair_Display, Libre_Baskerville } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ThemeProvider } from './components/ThemeProvider';
import { ClientEffects } from './components/ClientComponents';
import { SignupModalProvider } from './components/SignupModal';


const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const libre = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-libre',
  display: 'swap',
});

const SITE_URL = 'https://www.texasventuregroup.com';
const SITE_DESCRIPTION =
  'Texas Venture Group is the student venture ecosystem at UT Austin. Analyst training, startup partnerships, and hackathons for investors and founders.';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Texas Venture Group',
  url: SITE_URL,
  logo: `${SITE_URL}/brand/icon-512.png`,
  description: SITE_DESCRIPTION,
  sameAs: [
    'https://www.linkedin.com/company/texas-venture-group/',
    'https://www.instagram.com/txventuregroup/',
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Texas Venture Group | Student VC at UT Austin',
    template: '%s | Texas Venture Group',
  },
  description: SITE_DESCRIPTION,
  keywords: ['Venture Capital', 'Entrepreneurship', 'UT Austin', 'Student Startups', 'Texas Venture Group', 'TVG'],
  alternates: {
    canonical: '/',
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/brand/icon-48.png', type: 'image/png', sizes: '48x48' },
      { url: '/brand/icon-96.png', type: 'image/png', sizes: '96x96' },
      { url: '/brand/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [{ url: '/brand/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Texas Venture Group',
    title: 'Texas Venture Group | Student VC at UT Austin',
    description: SITE_DESCRIPTION,
    images: [{ url: '/images/about/cover.webp', alt: 'Texas Venture Group' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Texas Venture Group | Student VC at UT Austin',
    description: SITE_DESCRIPTION,
    images: ['/images/about/cover.webp'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceMono.variable} ${playfair.variable} ${libre.variable}`} suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://img.logo.dev" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://img.logo.dev" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        {/* Preload hero image for faster LCP */}
        <link
          rel="preload"
          as="image"
          href="/images/about/cover.webp"
          type="image/webp"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Font Awesome - loaded with low priority */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          fetchPriority="low"
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <SignupModalProvider>
            <ClientEffects />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SignupModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Outfit, Space_Mono, Playfair_Display, Libre_Baskerville } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ThemeProvider } from './components/ThemeProvider';
import { ClientEffects } from './components/ClientComponents';
import { SignupModalProvider } from './components/SignupModal';
import CustomCursor from './components/CustomCursor';

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

export const metadata: Metadata = {
  metadataBase: new URL('https://tvg-react.vercel.app'),
  title: 'Texas Venture Group | Student Venture Capital & Entrepreneurship',
  description: 'The ecosystem for student investors and founders at UT Austin. Exploration is not just about where you go, but who you go with.',
  keywords: ['Venture Capital', 'Entrepreneurship', 'UT Austin', 'Student Startups', 'Texas Venture Group', 'TVG'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Texas Venture Group | Student VC & Entrepreneurship',
    description: 'The ecosystem for student investors and founders at UT Austin.',
    images: [{ url: '/images/about/cover.webp' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Texas Venture Group',
    description: 'The ecosystem for student investors and founders at UT Austin.',
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
        <link rel="icon" href="/images-rebrand/logo.png" />
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
            <CustomCursor />
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

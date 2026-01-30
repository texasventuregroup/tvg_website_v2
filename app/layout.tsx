import type { Metadata } from 'next';
import { Poppins, Space_Mono } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ThemeProvider } from './components/ThemeProvider';
import { ClientEffects } from './components/ClientComponents';
import { SignupModalProvider } from './components/SignupModal';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Texas Venture Group',
  description: "UT Austin's hub for venture capital learning and startup building.",
  openGraph: {
    type: 'website',
    url: 'https://txventuregroup.com/',
    title: 'Join Texas Venture Group',
    description: "Join UT's premier venture capital and startup community. Applications for Fall 2025 cohort due September 7th.",
    images: [{ url: 'https://txventuregroup.com/images/about/cover.webp' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join Texas Venture Group',
    description: "Join UT's premier venture capital and startup community.",
    images: ['https://txventuregroup.com/images/about/cover.webp'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${spaceMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo/logo-small.png" />
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

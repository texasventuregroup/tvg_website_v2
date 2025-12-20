import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './reset.css';
import './style.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ThemeProvider } from './components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Texas Venture Group',
  description: "UT Austin's hub for venture capital learning and startup building.",
  openGraph: {
    type: 'website',
    url: 'https://txventuregroup.com/',
    title: 'Join Texas Venture Group',
    description: "Join UT's premier venture capital and startup community. Applications for Fall 2025 cohort due September 7th.",
    images: [{ url: 'https://txventuregroup.com/images/about/cover.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join Texas Venture Group',
    description: "Join UT's premier venture capital and startup community.",
    images: ['https://txventuregroup.com/images/about/cover.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo/logo-small.png" />
        {/* Font Awesome for icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

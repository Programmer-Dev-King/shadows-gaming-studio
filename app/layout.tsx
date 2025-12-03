import type { Metadata } from 'next';
import { Providers } from '@/app/providers';
import { Navbar } from '@/components/ui/Navbar';
import '@/styles/globals.css';
import '@/styles/animations.css';
import '@/styles/particles.css';
import '@/styles/hud-theme.css';

export const metadata: Metadata = {
  title: 'Shadows Gaming Studio - Ascension of Shadows',
  description: 'Experience the ultimate anime-game fusion.  Solo Leveling meets JJK meets Dr. Stone meets SAO.  Welcome to the Shadow Realm.',
  keywords: 'gaming studio, shadows, anime, game development, aaa website',
  openGraph: {
    title: 'Shadows Gaming Studio',
    description: 'Ascension of Shadows - AAA Anime Gaming Experience',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts. googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Montserrat:wght@700;800;900&family=Oxanium:wght@400;700&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-shadow-black text-silver-white overflow-x-hidden">
        <Providers>
          <Navbar />
          <div className="pt-20">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

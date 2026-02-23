import { GoogleAnalytics } from '@next/third-parties/google';
import {
  Crimson_Pro,
  IBM_Plex_Mono,
  Indie_Flower,
  Lato,
  Staatliches,
} from 'next/font/google';
import { Suspense } from 'react';

import { Navigation } from '@/components/navigation';
import { UseHistory } from '@/utils/useHistory';
import { BodyWithColor } from '@/utils/usePageColor';
import { UseTwitterEmojis } from '@/utils/useTwitterEmojis';

import favicon from '@/assets/favicon.png';

import type { Metadata } from 'next';

import '@/styles/globals.css';

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-sans-serif-default',
});

const staatliches = Staatliches({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-sans-serif-heading',
});

const robotoMono = IBM_Plex_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mono',
});

// Playfair_Display
const playfairDisplay = Crimson_Pro({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-serif-heading',
});

// Walter_Turncoat
// Mansalva
// The_Girl_Next_Door
const handlee = Indie_Flower({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-handwriting',
});

export const metadata: Metadata = {
  title: 'Julian Burr',
  icons: favicon.src,
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      <html lang="en" className="h-full">
        <BodyWithColor
          className={`${lato.variable} ${staatliches.variable} ${robotoMono.variable} ${playfairDisplay.variable} ${handlee.variable} h-full bg-white text-black leading-[1.5] before:fixed before:z-10 before:inset-0 before:border-[.6rem] sm:before:border-[3rem] before:border-[var(--page--color)] before:pointer-events-none before:transition-all`}
        >
          <div className="w-full min-h-full p-[.6rem] sm:p-[3rem] font-default flex flex-row items-start">
            <Navigation />
            <main className="p-[1.6rem] pl-[5rem] pt-[5rem] sm:p-[4rem] flex flex-col flex-1 w-full max-w-[54rem]">
              <Suspense fallback={null}>{children}</Suspense>
            </main>
          </div>

          <UseHistory />
        </BodyWithColor>
      </html>

      <UseTwitterEmojis />
      {process.env.GOOGLE_ANALYTICS_ID && (
        <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID} />
      )}
    </>
  );
}

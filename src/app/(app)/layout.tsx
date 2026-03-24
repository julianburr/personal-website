import { GoogleAnalytics } from '@next/third-parties/google';
import { Suspense } from 'react';

import { Navigation } from '@/components/navigation';
import * as fonts from '@/utils/fonts';
import { UseHistory } from '@/utils/useHistory';
import { BodyWithColor } from '@/utils/usePageColor';
import { UseTwitterEmojis } from '@/utils/useTwitterEmojis';

import favicon from '@/assets/favicon.png';
import ogImage from '@/assets/og-fallback.png';

import type { Metadata } from 'next';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Julian Burr',
  icons: favicon.src,
  openGraph: {
    type: 'website',
    images: [{ url: ogImage.src }],
  },
  twitter: {
    creator: '@jburr90',
    images: ogImage.src,
  },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      <html lang="en" className="h-full">
        <BodyWithColor
          className={`${fonts.sansSerif.variable} ${fonts.sansSerifHeading.variable} ${fonts.mono.variable} ${fonts.serif.variable} ${fonts.handwriting.variable} h-full bg-white text-black leading-[1.5] before:fixed before:z-10 before:inset-0 before:border-[.6rem] sm:before:border-[3rem] before:border-[var(--page-color)] before:pointer-events-none before:transition-all`}
        >
          <div className="[--body-padding:.6rem] sm:[--body-padding:3rem] w-full min-h-full p-(--body-padding) font-default flex flex-row items-start">
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

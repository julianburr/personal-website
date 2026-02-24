import {
  Crimson_Pro,
  IBM_Plex_Mono,
  Indie_Flower,
  Lato,
  Staatliches,
} from 'next/font/google';

export const sansSerif = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-sans-serif',
});

export const sansSerifHeading = Staatliches({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-sans-serif-heading',
});

export const mono = IBM_Plex_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mono',
});

export const serif = Crimson_Pro({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-serif',
});

// Walter_Turncoat
// Mansalva
// The_Girl_Next_Door
export const handwriting = Indie_Flower({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-handwriting',
});

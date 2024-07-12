import {
  Alegreya,
  Alegreya_Sans,
  IBM_Plex_Mono,
  Inter,
  Lato,
  Libre_Baskerville,
  Noto_Sans,
  Staatliches,
} from "next/font/google";

import { Navigation } from "@/components/navigation";
import { UseHistory } from "@/utils/useHistory";
import { BodyWithColor } from "@/utils/usePageColor";
import { UseTwitterEmojis } from "@/utils/useTwitterEmojis";

import favicon from "@/assets/favicon.png";

import type { Metadata } from "next";

import "@/styles/globals.css";

const lato = Noto_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font--default",
});

const staatliches = Staatliches({
  weight: "400",
  subsets: ["latin"],
  variable: "--font--heading",
});

const robotoMono = IBM_Plex_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font--mono",
});

const metadata: Metadata = {
  title: "Julian Burr",
  icons: favicon.src,
};

type Props = {
  children: React.ReactNode;
  pathname: string;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      <html lang="en" className="h-full">
        <BodyWithColor
          className={`${lato.variable} ${staatliches.variable} ${robotoMono.variable} h-full bg-white text-black leading-[1.5] before:fixed before:z-10 before:inset-0 before:border-[.6rem] sm:before:border-[3rem] before:border-[var(--page--color)] before:pointer-events-none before:transition-all`}
        >
          <div className="w-full min-h-full p-[.6rem] sm:p-[3rem] font-default flex flex-row items-start">
            <Navigation />
            <main className="p-[1.6rem] pl-[5rem] pt-[5rem] sm:p-[4rem] flex flex-col flex-1 w-full max-w-[54rem] overflow-hidden">
              {children}
            </main>
          </div>

          <UseHistory />
        </BodyWithColor>
      </html>

      <UseTwitterEmojis />
    </>
  );
}

export { metadata };

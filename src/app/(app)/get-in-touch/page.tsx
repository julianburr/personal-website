import BottleMessageIllustrationSvg from '@/assets/illustrations/bottle-message.svg';
import PalmTreeIllustrationSvg from '@/assets/illustrations/palm-tree.svg';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get in touch — Julian Burr',
};

export default function GetInTouchPage() {
  return (
    <>
      <div className="max-w-[26rem]">
        <h1>Get in touch</h1>
        <p>
          Hi there, you want to get in touch with me? That’s great. I could give
          you my personal email here, but I don’t check my inbox very frequently
          and would probably miss your message.
        </p>
        <p>
          So if you want to say hello or have a chat, just get in touch with me
          via my socials.
        </p>
      </div>

      <div className="absolute inset-0 z-1 overflow-hidden">
        <div className="absolute left-0 right-0 bottom-0 h-[30%] bg-[#f0f6fc]" />
        <a
          href="https://twitter.com/messages/compose?recipient_id=866080743834886144"
          target="_blank"
          className="absolute left-[10%] bottom-[1rem] z-2 animate-float"
          rel="noreferrer"
        >
          <BottleMessageIllustrationSvg className="h-[10rem] w-auto" />
        </a>
        <PalmTreeIllustrationSvg className="hidden lg:flex absolute right-[-33rem] bottom-0 h-[120%] w-auto z-3" />
      </div>
    </>
  );
}

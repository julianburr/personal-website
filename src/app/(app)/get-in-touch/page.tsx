import BeachSvg from '@/assets/illustrations/beach.svg';

import type { Metadata } from 'next';

import '@/styles/get-in-touch.css';

export const metadata: Metadata = {
  title: 'Get in touch — Julian Burr',
};

export default function GetInTouchPage() {
  return (
    <>
      <div className="max-w-[20rem] md:max-w-[26rem] relative z-10">
        <h1>Get in touch</h1>
        <p>Hi there, you want to get in touch with me? Great!</p>
        <p>
          I could give you my personal email here, but I don’t check my inbox
          very frequently and would probably miss your message.
        </p>
        <p>
          So if you want to say hello or have a chat, just get in touch with me
          via my socials.
        </p>
      </div>

      <div className="canvas absolute z-0 inset-(--body-padding) overflow-hidden">
        <BeachSvg className="absolute h-[84vh] bottom-[-2vh] left-[50%] translate-x-[-50%] w-auto shrink-0" />
      </div>
    </>
  );
}

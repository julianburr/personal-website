import { ClientOnly } from '@/components/ClientOnly';
import { InteractiveElements } from '@/features/home/InteractiveElements';
import { ScrollContainer } from '@/features/home/ScrollContainer';

import HomeIllustrationSvg from '@/assets/illustrations/home.svg';

import type { Metadata } from 'next';

import '@/styles/home.css';

const metadata: Metadata = {
  title: 'Hi. — Julian Burr',
};

export default function Home() {
  return (
    <>
      <div className="relative z-10">
        <h1>Hi.</h1>
        <p className="w-full max-w-[32rem]">
          My name is Julian Burr, I’m originally from Germany but currently
          living and working in Australia. I’m a software developer, always
          looking for new things to learn and experiment with.
        </p>
      </div>

      <div className="canvas absolute z-0 inset-[.6rem] sm:inset-[3rem] overflow-hidden">
        <ClientOnly>
          <ScrollContainer>
            <HomeIllustrationSvg className="w-[164vh] h-auto shrink-0" />
            <InteractiveElements />
          </ScrollContainer>
        </ClientOnly>
      </div>
    </>
  );
}

export { metadata };

import Link from "next/link";

import { TurnableBox } from "@/features/home/TurnableBox";

import BooksIllustrationSvg from "@/assets/illustrations/books.svg";
import GlobeIllustrationSvg from "@/assets/illustrations/globe.svg";
import LampIllustrationSvg from "@/assets/illustrations/lamp.svg";
import PlantIllustrationSvg from "@/assets/illustrations/plant.svg";

import type { Metadata } from "next";

import "@/styles/home.css";

const metadata: Metadata = {
  title: "Hi. — Julian Burr",
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

      <div className="canvas absolute z-0 inset-[.6rem] sm:inset-[3rem] overflow-x-scroll">
        <div className="flex absolute bottom-[calc(4rem_+_3vh)] ml-[12vh] h-[20vh] w-[20vh] bg-[#ddcea5]" />
        <div className="flex absolute bottom-[calc(4rem_+_3vh)] ml-[51vh] h-[20vh] w-[20vh] bg-[#ddcea5]" />
        <div className="flex absolute bottom-[calc(4rem_+_23vh)] ml-[42vh] h-[20vh] w-[20vh] bg-[#d2be87]" />
        <div className="flex absolute bottom-[calc(4rem_+_1vh)] ml-[32vh] h-[24vh] w-[24vh] bg-[#e8dec3]" />
        <PlantIllustrationSvg className="absolute bottom-[calc(4rem_+_2vh)] ml-[61vh] h-[26vh] w-auto" />

        <Link
          href="/around-the-world"
          aria-label="Around the World"
          className="flex absolute bottom-[calc(4rem_+_4vh)] ml-[100vh]"
        >
          <GlobeIllustrationSvg className="h-[18vh] w-auto transition-all hover:drop-shadow-lg" />
        </Link>
        <TurnableBox className="absolute bottom-[calc(4rem_+_4vh)] ml-[130vh] h-[14vh] w-[14vh] bg-[#d2be87]" />
        <LampIllustrationSvg className="absolute bottom-[calc(4rem_+_23vh)] ml-[112vh] h-[20vh] w-auto" />
        <div className="flex absolute bottom-[calc(4rem_+_3vh)] ml-[112vh] h-[20vh] w-[20vh] bg-[#ddcea5]" />

        <Link
          href="/library"
          aria-label="Library"
          className="flex absolute bottom-[calc(1rem_+_4vh)] ml-[151vh]"
        >
          <BooksIllustrationSvg className="h-[13vh] w-auto transition-all hover:drop-shadow-lg" />
        </Link>
        <div className="flex absolute bottom-[4vh] ml-[164vh] h-[27vh] w-[27vh] bg-[#e8dec3]" />
        <div className="flex absolute bottom-[3vh] ml-[186vh] h-[30vh] w-[27vh] bg-[#eee6d1]" />
      </div>
    </>
  );
}

export { metadata };

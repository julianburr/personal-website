import type { Metadata } from "next";

const metadata: Metadata = {
  title: "Hi. — Julian Burr",
};

export default function Home() {
  return (
    <>
      <h1>Hi.</h1>
      <p className="w-full max-w-[32rem]">
        My name is Julian Burr, I’m originally from Germany but currently living
        and working in Australia. I’m a software developer, always looking for
        new things to learn and experiment with. I also like kittens. 🐸
      </p>
    </>
  );
}

export { metadata };

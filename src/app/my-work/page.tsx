import { Metadata } from "next";
import Link from "next/link";

const metadata: Metadata = {
  title: "My work — Julian Burr",
};

export default function MyWorkPage() {
  return (
    <>
      <h1>My work</h1>

      <h2>Talks</h2>
      <p>
        Even though I wouldn’t consider public speaking one of my strongest
        skills (yet), being out of my comfort zone, I always try to share my
        experience and the things I learn with others. The following are some of
        the talks I’ve given at meetups and conferences:
      </p>
      <p>...</p>

      <h2>Blog posts</h2>
      <p>
        On top of the snippets in the <Link href="/til">TIL section</Link>, I
        also published articles on other platforms. My goal is to write more in
        the future, not only sharing my experience with others but also
        improving my own skills at the same time.
      </p>
      <p>...</p>

      <h2>Open Source</h2>
      <p>
        Besides contributions to open source libraries, I created{" "}
        <a href="#">a few of my own</a>.
      </p>
      <p>...</p>

      <h2>Interesting projects</h2>
      <p>
        I usually use side projects more with learning in mind than anything
        else, but every now and then I actually do finish one 😅
      </p>
      <p>...</p>
    </>
  );
}

export { metadata };

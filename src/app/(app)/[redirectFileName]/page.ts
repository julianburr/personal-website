import { notFound, redirect, RedirectType } from "next/navigation";

const redirects = [
  {
    source: "ddd-brisbane-2022-slides.pdf",
    destination:
      "https://storage.googleapis.com/julianburr-me-assets/talk-slides/yes-your-browser-can-do-that-probably--ddd-brisbane-2022.pdf",
  },
  {
    source: "ddd-melbourne-2024-slides.pdf",
    destination:
      "https://storage.googleapis.com/julianburr-me-assets/talk-slides/is-it-a-bird-is-it-a-plane--ddd-melbourne-2024.pdf",
  },
  {
    source: "developer-week-2024-slides.pdf",
    destination:
      "https://storage.googleapis.com/julianburr-me-assets/talk-slides/quantum-computing-for-classical-developers--dwx-2024.pdf",
  },
  {
    source: "dont-stay-hydrated-brisjs-2024-slides.pdf",
    destination:
      "https://storage.googleapis.com/julianburr-me-assets/talk-slides/dont-stay-hydrated--brisjs-2024.pdf",
  },
  {
    source: "dont-stay-hydrated-react-connection-2024-slides.pdf",
    destination:
      "https://storage.googleapis.com/julianburr-me-assets/talk-slides/dont-stay-hydrated--brisjs-2024.pdf",
  },
  {
    source: "react-advanced-london-2024-slides.pdf",
    destination:
      "https://storage.googleapis.com/julianburr-me-assets/talk-slides/lets-build-suspense--react-advanced-london-2024.pdf",
  },
  {
    source: "react-summit-us-2024-slides.pdf",
    destination:
      "https://storage.googleapis.com/julianburr-me-assets/talk-slides/lets-build-suspense--react-summit-us-2024.pdf",
  },
  {
    source: "slashnew-2024-slides.pdf",
    destination:
      "https://storage.googleapis.com/julianburr-me-assets/talk-slides/yes-your-browser-can-do-that-probably--slashnew-2024.pdf",
  },
  {
    source: "wearedevelopers-world-congress-2024-slides.pdf",
    destination:
      "https://storage.googleapis.com/julianburr-me-assets/talk-slides/quantum-computing-for-classical-developers--world-congress-2024.pdf",
  },
  {
    source: "web-apis-sydjs-2023-slides.pdf",
    destination:
      "https://storage.googleapis.com/julianburr-me-assets/talk-slides/web-apis-you-might-not-know--sydjs-2023.pdf",
  },
  {
    source: "web-directions-code-2024-slides.pdf",
    destination:
      "https://storage.googleapis.com/julianburr-me-assets/talk-slides/yes-your-browser-can-do-that-probably--web-directions-code-2024.pdf",
  },
  {
    source: "xtremejs-2024-slides.pdf",
    destination:
      "https://storage.googleapis.com/julianburr-me-assets/talk-slides/yes-your-browser-can-do-that-probably--xtremejs-2024.pdf",
  },
  {
    source: "react-advanced-2024-slides.pdf",
    destination:
      "https://storage.googleapis.com/julianburr-me-assets/talk-slides/lets-build-suspense--react-advanced-2024.pdf",
  },
  {
    source: "react-summit-us-2024-slides.pdf",
    destination:
      "https://storage.googleapis.com/julianburr-me-assets/talk-slides/lets-build-suspense--react-summit-us-2024.pdf",
  },
  {
    source: "webdirections-dev-summit-slides.pdf",
    destination:
      "https://storage.googleapis.com/julianburr-me-assets/talk-slides/lets-build-suspense--webdirections-dev-summit-2024.pdf",
  },
  {
    source: "ddd-brisbane-2024-slides.pdf",
    destination:
      "https://storage.googleapis.com/julianburr-me-assets/talk-slides/quantum-computing-for-classical-developers--ddd-brisbane-2024.pdf",
  },
  {
    source: "ddd-melbourne-2025-slides.pdf",
    destination:
      "https://storage.googleapis.com/julianburr-me-assets/talk-slides/on-the-shoulders-of-giants--ddd-melbourne-2025.pdf",
  },
  {
    source: "ndc-melbourne-2025-slides.pdf",
    destination:
      "https://storage.googleapis.com/julianburr-me-assets/talk-slides/yes-your-browser-can-do-that-probably--ndc-melbourne-2025.pdf",
  },
];

export default async function AssetRedirectPage({ params }: any) {
  const { redirectFileName } = await params;
  const destination = redirects?.find(
    (redirect) => redirect.source === redirectFileName
  )?.destination;

  if (!destination) {
    return notFound();
  }

  return redirect(destination, RedirectType.replace);
}

export async function generateStaticParams() {
  return redirects.map((redirect) => ({
    redirectFileName: redirect.source,
    destination: redirect.destination,
  }));
}

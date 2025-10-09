import css from "./Home.module.css";
import { Metadata } from "next";
import ClientRedirect from "./NotFound.client";

export const metadata: Metadata = {
  title: "Non-existent page",
  description: "This page does not exist",
  openGraph: {
    title: "Non-existent page",
    description: "This page does not exist",
    url: `https://08-zustand-eight-pi.vercel.app/not-found`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Non-existent page`,
    description: "This page does not exist",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

const NotFound = () => {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
        <br />
        <br />
        You will be redirected to the homepage in a while
      </p>
      <ClientRedirect />
    </>
  );
};

export default NotFound;

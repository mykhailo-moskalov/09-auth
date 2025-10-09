import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { NoteTag } from "@/types/note";
import { Metadata } from "next";

type NotesPageProps = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const tag = (await params).slug?.[0];

  const title =
    tag === "All" ? "All my notes" : `My ${tag.toLocaleLowerCase()} notes`;

  return {
    title: title,
    description: `Filter: ${tag}`,
    openGraph: {
      title: title,
      description: `Filter: ${tag}`,
      url: `https://08-zustand-eight-pi.vercel.app/notes/filter/${tag}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Notehub",
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: `Filter: ${tag}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

const NotesPage = async ({ params }: NotesPageProps) => {
  const queryClient = new QueryClient();

  const query = "";
  const page = 1;

  const tag = (await params).slug?.[0];
  const allowedTag = Object.values(NoteTag).includes(tag as NoteTag)
    ? (tag as NoteTag)
    : undefined;

  await queryClient.prefetchQuery({
    queryKey: ["notes", query, page, allowedTag],
    queryFn: () => fetchNotes(query, page, allowedTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient query={query} page={page} tag={allowedTag} />
    </HydrationBoundary>
  );
};

export default NotesPage;

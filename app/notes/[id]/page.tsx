import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchSingleNote } from "@/lib/api";

import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;

  const note = await fetchSingleNote(id);

  return {
    title: `Note: ${note.title}`,
    description: `${note.content.slice(0, 32)}...`,
    openGraph: {
      title: `Note: ${note.title}`,
      description: `${note.content.slice(0, 96)}...`,
      url: `https://08-zustand-eight-pi.vercel.app/notes/${id}`,
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
      title: `Note: ${note.title}`,
      description: `${note.content.slice(0, 16)}...`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchSingleNote(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;

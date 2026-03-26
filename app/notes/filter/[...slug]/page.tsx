import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { NoteTag } from "@/types/note";

type Props = {
  params: Promise<{ slug: string[] }>;
};

async function Notes({ params }: Props) {
  const queryClient = new QueryClient();

  const { slug } = await params;
  const category = (slug[0] === "all" ? undefined : slug[0]) as
    | NoteTag
    | undefined;

  await queryClient.prefetchQuery({
    queryKey: ["fetchNotes", 1, "", category],
    queryFn: () =>
      fetchNotes({ page: 1, perPage: 12, search: "", tag: category }),
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient key={category ?? "all"} category={category} />
      </HydrationBoundary>
    </>
  );
}

export default Notes;

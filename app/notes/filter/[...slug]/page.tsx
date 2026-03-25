"use client";

import NoteList from "@/components/NoteList/NoteList";
import { getNotes } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function NotesByCategory() {
  const params = useParams();
  const slug = params.slug as string[];
  const tag = slug?.[0] === "all" ? undefined : slug?.[0];
  const { data, error } = useQuery({
    queryKey: ["notes", tag],
    queryFn: () => getNotes(tag),
  });

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;
  return (
    <div>
      <h1>{tag ? `Notes: ${tag}` : "All"}</h1>
      {data?.notes?.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>Notes do not found</p>
      )}
    </div>
  );
}

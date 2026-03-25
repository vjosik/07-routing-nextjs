"use client";

import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./Notes.module.css";

import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handlerOpenModal = () => setIsOpen(true);
  const handlerCloseModal = () => setIsOpen(false);

  const { data, error, isError } = useQuery({
    queryKey: ["fetchNotes", page, search],
    queryFn: () => fetchNotes({ page, perPage: 12, search }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  if (isError) throw error;

  const searchNote = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);
  
  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        
        <SearchBox onSearch={searchNote} value={search} />
        {totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        )}
        <button className={css.button} onClick={handlerOpenModal}>
          Create note +
        </button>
        {isOpen && (
          <Modal onClose={handlerCloseModal}>
            <NoteForm onClose={handlerCloseModal} />
          </Modal>
        )}
      </header>
      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}

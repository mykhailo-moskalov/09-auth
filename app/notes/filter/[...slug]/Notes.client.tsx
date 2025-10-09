"use client";

import toast, { Toaster } from "react-hot-toast";

import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { fetchNotes } from "@/lib/api";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";

import css from "./NotesPage.module.css";
import { NoteTag } from "@/types/note";
import Link from "next/link";

interface Props {
  query: string;
  page: number;
  tag?: NoteTag | undefined;
}

export default function NotesClient({ query, page, tag }: Props) {
  const [search, setSearch] = useState(query);
  const [currentPage, setCurrentPage] = useState(page);

  const [debouncedQuery] = useDebounce(search, 500);

  const { data, isError, isSuccess } = useQuery({
    queryKey: ["notes", debouncedQuery, currentPage, tag],
    queryFn: () => fetchNotes(debouncedQuery, currentPage, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const totalPages = data?.totalPages ?? 0;

  useEffect(() => {
    if (isError) {
      toast.error("Couldn't find any notes!");
    } else if (data?.notes.length === 0) {
      toast.error(`No notes found for "${debouncedQuery}"`);
    }
  }, [isError, data, debouncedQuery]);

  return (
    <>
      <div className={css.app}>
        <div className={css.toolbar}>
          <SearchBox
            value={search}
            onChange={(v) => {
              setSearch(v);
              setCurrentPage(1);
            }}
          />

          {isSuccess && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={data.totalPages}
              onChange={setCurrentPage}
            />
          )}

          <Link href="/notes/action/create" className={css.button}>
            Create note +
          </Link>
        </div>

        {data !== undefined && data?.notes.length > 0 && (
          <NoteList notes={data.notes} />
        )}
      </div>
      <Toaster />
    </>
  );
}

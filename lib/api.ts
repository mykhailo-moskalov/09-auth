import type { newNoteValues, Note, NoteFormValues } from "../types/note";
import axios from "axios";

interface NotesHTTPResponse {
  notes: Note[];
  totalPages: number;
}

const NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string
): Promise<NotesHTTPResponse> => {
  const resp = await axios.get<NotesHTTPResponse>("/notes", {
    params: {
      search,
      page,
      perPage: 12,
      ...(tag ? { tag } : {}),
    },
    headers: {
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  });

  return resp.data;
};

export const fetchSingleNote = async (id: string): Promise<Note> => {
  const resp = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  });

  return resp.data;
};

export const createNote = async ({
  title,
  content,
  tag,
}: NoteFormValues): Promise<Note> => {
  const newNote: newNoteValues = { title, content, tag };

  const resp = await axios.post<Note>("/notes", newNote, {
    headers: {
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  });

  return resp.data;
};

export async function deleteNote(id: string): Promise<Note> {
  const resp = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  });

  return resp.data;
}

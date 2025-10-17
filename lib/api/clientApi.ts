import { User } from "@/types/user";
import type { Note, NoteFormValues } from "../../types/note";
import { nextServer } from "./api";

export interface NotesHTTPResponse {
  notes: Note[];
  totalPages: number;
}

export type UserRequest = {
  email: string;
  password: string;
};

export type CheckSessionRequest = {
  success: boolean;
};

export type UpdateUserRequest = {
  username?: string;
  email?: string;
  avatar?: string;
};

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string
): Promise<NotesHTTPResponse> => {
  const resp = await nextServer.get<NotesHTTPResponse>("/notes", {
    params: {
      search,
      page,
      perPage: 12,
      ...(tag ? { tag } : {}),
    },
    // headers: {
    //   Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    // },
  });

  return resp.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const resp = await nextServer.get<Note>(`/notes/${id}`, {
    // headers: {
    //   Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    // },
  });

  return resp.data;
};

export const createNote = async ({
  title,
  content,
  tag,
}: NoteFormValues): Promise<Note> => {
  const newNote: NoteFormValues = { title, content, tag };

  const resp = await nextServer.post<Note>("/notes", newNote, {
    // headers: {
    //   Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    // },
  });

  return resp.data;
};

export async function deleteNote(id: string): Promise<Note> {
  const resp = await nextServer.delete<Note>(`/notes/${id}`, {
    // headers: {
    //   Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    // },
  });

  return resp.data;
}

export const register = async (data: UserRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: UserRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;
};

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { newNoteValues, NoteTag } from "@/types/note";

type NoteDraftStore = {
  draft: newNoteValues;
  setDraft: (note: newNoteValues) => void;
  clearDraft: () => void;
};

const initialDraft: newNoteValues = {
  title: "",
  content: "",
  tag: NoteTag.Todo,
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);

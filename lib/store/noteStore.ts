import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NoteFormValues, NoteTag } from "@/types/note";

type NoteDraftStore = {
  draft: NoteFormValues;
  setDraft: (note: NoteFormValues) => void;
  clearDraft: () => void;
};

const initialDraft: NoteFormValues = {
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

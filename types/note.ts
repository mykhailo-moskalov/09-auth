export interface Note {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

export enum NoteTag {
  Work = "Work",
  Personal = "Personal",
  Meeting = "Meeting",
  Shopping = "Shopping",
  Ideas = "Ideas",
  Travel = "Travel",
  Finance = "Finance",
  Health = "Health",
  Important = "Important",
  Todo = "Todo",
}

export interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

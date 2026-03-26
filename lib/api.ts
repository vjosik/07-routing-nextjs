import { Note } from "@/types/note";
import axios from "axios";

const ENDPOINT = "/notes";
const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const apiClient = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

interface FetchNotesParams {
  search?: string;
  tag?: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  page?: number;
  perPage?: number;
  sortBy?: "created" | "updated";
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface CreateNoteBody {
  title: string;
  content: string;
  tag: string;
}

export async function fetchNotes(params?: FetchNotesParams, tag?: string) {
  const { data } = await apiClient.get<FetchNotesResponse>(ENDPOINT, {
    params,
  });
  return data;
}

export async function fetchNoteById(id: Note["id"]) {
  const { data } = await apiClient.get<Note>(`${ENDPOINT}/${id}`);
  return data;
}

export async function createNote(body: CreateNoteBody) {
  const { data } = await apiClient.post<Note>(ENDPOINT, body);
  return data;
}

export async function deleteNote(id: Note["id"]) {
  const { data } = await apiClient.delete<Note>(`${ENDPOINT}/${id}`);
  return data;
}



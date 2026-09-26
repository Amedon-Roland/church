import "server-only";
import { getJSON, setJSON } from "./store";

export type Message = {
  id: string;
  kind: "contact" | "priere";
  name: string;
  contact: string;
  body: string;
  createdAt: string;
  read: boolean;
};

const KEY = "messages";
const MAX = 500;

export async function listMessages() {
  return (await getJSON<Message[]>(KEY)) ?? [];
}

export async function addMessage(message: Omit<Message, "id" | "createdAt" | "read">) {
  const all = await listMessages();
  const entry: Message = { ...message, id: crypto.randomUUID(), createdAt: new Date().toISOString(), read: false };
  await setJSON(KEY, [entry, ...all].slice(0, MAX));
}

export async function updateMessages(update: (all: Message[]) => Message[]) {
  await setJSON(KEY, update(await listMessages()));
}

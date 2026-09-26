import { deleteMessageAction, markMessageAction } from "@/app/admin/actions";
import { formatFull } from "@/lib/format";
import { listMessages } from "@/lib/messages";
import { Mail, MailOpen, Trash2 } from "lucide-react";

export const metadata = { title: "Messages" };

export default async function MessagesAdmin() {
  const messages = await listMessages();
  return (
    <>
      <h1 className="text-4xl text-ink sm:text-5xl">Messages</h1>
      <p className="mt-2 text-ink-soft">Questions et sujets de prière envoyés depuis la page « Nous trouver ». Les sujets de prière sont confidentiels.</p>
      {messages.length === 0 ? (
        <p className="card mt-8 p-8 text-center text-ink-mute">Aucun message pour l&apos;instant.</p>
      ) : (
        <ul className="mt-8 space-y-3">
          {messages.map((m) => {
            const contact = m.contact.includes("@") ? `mailto:${m.contact}` : /\d{6,}/.test(m.contact.replace(/\D/g, "")) ? `https://wa.me/${m.contact.replace(/\D/g, "")}` : null;
            return (
              <li key={m.id} className={`card p-5 ${m.read ? "opacity-75" : "border-l-4 border-l-royal"}`}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${m.kind === "priere" ? "bg-gold-soft text-gold-ink" : "bg-royal/10 text-royal"}`}>
                    {m.kind === "priere" ? "Prière" : "Question"}
                  </span>
                  <span className="font-semibold text-ink">{m.name}</span>
                  {m.contact && (contact ? <a href={contact} className="text-sm text-royal underline-offset-2 hover:underline">{m.contact}</a> : <span className="text-sm text-ink-mute">{m.contact}</span>)}
                  <span className="ml-auto text-xs text-ink-mute">{formatFull(m.createdAt)}</span>
                </div>
                <p className="mt-3 whitespace-pre-line text-ink-soft">{m.body}</p>
                <div className="mt-4 flex gap-2">
                  <form action={markMessageAction.bind(null, m.id, !m.read)}>
                    <button className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft hover:border-ink hover:text-ink">
                      {m.read ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />} {m.read ? "Marquer non lu" : "Marquer lu"}
                    </button>
                  </form>
                  <form action={deleteMessageAction.bind(null, m.id)}>
                    <button className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-live hover:bg-live/10">
                      <Trash2 className="h-4 w-4" /> Supprimer
                    </button>
                  </form>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

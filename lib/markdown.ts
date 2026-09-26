// Rendu Markdown minimal et sûr pour les articles du blog.
// Tout le texte est échappé avant la mise en forme : aucun HTML brut n'est accepté.

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function safeUrl(url: string) {
  const u = url.trim();
  return /^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(u) ? u : "#";
}

function inline(text: string) {
  return escapeHtml(text)
    .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_, alt, src) => `<img src="${safeUrl(src)}" alt="${alt}" loading="lazy" />`)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
      const url = safeUrl(href);
      const external = /^https?:/i.test(url) ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${url}"${external}>${label}</a>`;
    })
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>")
    .replace(/(^|\W)_([^_\s][^_]*)_(?=\W|$)/g, "$1<em>$2</em>");
}

export function renderMarkdown(md: string) {
  const lines = md.replace(/\r\n?/g, "\n").split("\n");
  const out: string[] = [];
  let para: string[] = [];
  let list: { type: "ul" | "ol"; items: string[] } | null = null;
  let quote: string[] = [];

  const flushPara = () => {
    if (para.length) out.push(`<p>${inline(para.join(" "))}</p>`);
    para = [];
  };
  const flushList = () => {
    if (list) out.push(`<${list.type}>${list.items.map((i) => `<li>${inline(i)}</li>`).join("")}</${list.type}>`);
    list = null;
  };
  const flushQuote = () => {
    if (quote.length) out.push(`<blockquote>${renderMarkdown(quote.join("\n"))}</blockquote>`);
    quote = [];
  };
  const flushAll = () => {
    flushPara();
    flushList();
    flushQuote();
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (/^>\s?/.test(line)) {
      flushPara();
      flushList();
      quote.push(line.replace(/^>\s?/, ""));
      continue;
    }
    flushQuote();
    let m: RegExpMatchArray | null;
    if (!line.trim()) flushAll();
    else if ((m = line.match(/^(#{2,4})\s+(.*)$/))) {
      flushAll();
      const level = m[1].length;
      out.push(`<h${level}>${inline(m[2])}</h${level}>`);
    } else if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      flushAll();
      out.push("<hr />");
    } else if ((m = line.match(/^\s*[-*]\s+(.*)$/))) {
      flushPara();
      if (list?.type !== "ul") flushList();
      list ??= { type: "ul", items: [] };
      list.items.push(m[1]);
    } else if ((m = line.match(/^\s*\d+[.)]\s+(.*)$/))) {
      flushPara();
      if (list?.type !== "ol") flushList();
      list ??= { type: "ol", items: [] };
      list.items.push(m[1]);
    } else {
      flushList();
      para.push(line.trim());
    }
  }
  flushAll();
  return out.join("\n");
}

/** Texte brut (pour les extraits et les métadonnées). */
export function plainText(md: string) {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

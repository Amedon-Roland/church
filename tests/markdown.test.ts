import assert from "node:assert/strict";
import { test } from "node:test";
import { renderMarkdown } from "../lib/markdown.ts";

test("le HTML brut est échappé", () => {
  const html = renderMarkdown(`<script>alert(1)</script>\n\n<img src=x onerror=alert(1)>`);
  assert.ok(!html.includes("<script"));
  assert.ok(!html.includes("<img src=x"));
});

test("les liens javascript: sont neutralisés", () => {
  assert.ok(renderMarkdown("[clic](javascript:alert(1))").includes('href="#"'));
  assert.ok(renderMarkdown("[site](https://exemple.tg)").includes('href="https://exemple.tg" target="_blank"'));
});

test("titres, listes, citations, emphase", () => {
  const html = renderMarkdown("## Titre\n\n- un\n- deux\n\n1. a\n2. b\n\n> Verset\n\n**gras** et *italique*");
  assert.match(html, /<h2>Titre<\/h2>/);
  assert.match(html, /<ul><li>un<\/li><li>deux<\/li><\/ul>/);
  assert.match(html, /<ol><li>a<\/li><li>b<\/li><\/ol>/);
  assert.match(html, /<blockquote><p>Verset<\/p><\/blockquote>/);
  assert.match(html, /<strong>gras<\/strong> et <em>italique<\/em>/);
});

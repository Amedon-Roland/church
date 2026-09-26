// Lancer : npm test
import assert from "node:assert/strict";
import { test } from "node:test";
import { parseChannelId, parseFeed, parseLivePage } from "../lib/youtube.ts";

const FEED = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015" xmlns:media="http://search.yahoo.com/mrss/" xmlns="http://www.w3.org/2005/Atom">
 <title>Eglise Terre de Victoire</title>
 <entry>
  <id>yt:video:abcDEF12345</id>
  <yt:videoId>abcDEF12345</yt:videoId>
  <yt:channelId>UCaaaaaaaaaaaaaaaaaaaaaa</yt:channelId>
  <title>Culte du dimanche en direct — L&#39;espérance &amp; la foi</title>
  <published>2026-09-20T10:05:00+00:00</published>
  <media:group>
   <media:title>Culte</media:title>
   <media:description>Prédication du pasteur</media:description>
   <media:community><media:statistics views="1234"/></media:community>
  </media:group>
 </entry>
 <entry>
  <yt:videoId>zyx98765432</yt:videoId>
  <title>Chorale : répétition</title>
  <published>2026-09-18T18:00:00+00:00</published>
  <media:group><media:description></media:description></media:group>
 </entry>
</feed>`;

test("flux RSS : titres décodés, vues, ordre conservé", () => {
  const videos = parseFeed(FEED);
  assert.equal(videos.length, 2);
  assert.equal(videos[0].id, "abcDEF12345");
  assert.equal(videos[0].title, "Culte du dimanche en direct — L'espérance & la foi");
  assert.equal(videos[0].views, 1234);
  assert.equal(videos[0].thumbnail, "https://i.ytimg.com/vi/abcDEF12345/hqdefault.jpg");
  assert.equal(videos[1].views, undefined);
});

test("identifiant de chaîne trouvé dans la page d'une chaîne", () => {
  assert.equal(parseChannelId(`..."externalId":"UCabcdefghijklmnopqrstuv"...`), "UCabcdefghijklmnopqrstuv");
  assert.equal(parseChannelId(`<link rel="canonical" href="https://www.youtube.com/channel/UC0123456789abcdefghijkl">`), "UC0123456789abcdefghijkl");
  assert.equal(parseChannelId("<html>rien</html>"), null);
});

test("page /live : direct en cours", () => {
  const html = `<link rel="canonical" href="https://www.youtube.com/watch?v=LIVE1234567"><meta name="title" content="Culte en direct"> ..."isLiveNow":true...`;
  assert.deepEqual(parseLivePage(html), { id: "LIVE1234567", state: "live", title: "Culte en direct" });
});

test("page /live : direct programmé", () => {
  const html = `<link rel="canonical" href="https://www.youtube.com/watch?v=SOON1234567"> "scheduledStartTime":"1790000000" "isUpcoming":true`;
  const r = parseLivePage(html);
  assert.equal(r?.state, "upcoming");
  assert.equal(r?.scheduledAt, new Date(1790000000 * 1000).toISOString());
});

test("page /live : pas de direct (page de la chaîne)", () => {
  assert.equal(parseLivePage(`<link rel="canonical" href="https://www.youtube.com/channel/UCabcdefghijklmnopqrstuv">`), null);
});

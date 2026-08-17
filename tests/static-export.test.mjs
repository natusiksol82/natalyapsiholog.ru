import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../dist/client/", import.meta.url);
const expectedSiteUrl = process.env.SITE_URL;

test("exports a deployable static site", async () => {
  assert.ok(expectedSiteUrl, "SITE_URL must be set while testing the export");

  const [html, robots, sitemap] = await Promise.all([
    readFile(new URL("index.html", outputRoot), "utf8"),
    readFile(new URL("robots.txt", outputRoot), "utf8"),
    readFile(new URL("sitemap.xml", outputRoot), "utf8"),
  ]);

  assert.match(html, /<html lang="ru">/);
  assert.match(html, /<title>Психолог Наталья в Ростове-на-Дону \| Очно и онлайн<\/title>/);
  assert.match(html, new RegExp(`<link rel="canonical" href="${escapeRegex(expectedSiteUrl)}/?"`));
  assert.match(html, new RegExp(`<meta property="og:url" content="${escapeRegex(expectedSiteUrl)}/?"`));
  assert.match(html, /href="tel:\+79515064659"/);
  assert.match(html, /href="https:\/\/t\.me\/natalya_psy_rostov"/);
  assert.match(html, /href="https:\/\/wa\.me\/79515064659"/);
  assert.match(robots, new RegExp(`Sitemap: ${escapeRegex(expectedSiteUrl)}/sitemap\\.xml`));
  assert.match(sitemap, new RegExp(`<loc>${escapeRegex(expectedSiteUrl)}/?</loc>`));

  await Promise.all([
    access(new URL("favicon.svg", outputRoot)),
    access(new URL("og.png", outputRoot)),
    access(new URL("natalya-psychologist.png", outputRoot)),
  ]);
});

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

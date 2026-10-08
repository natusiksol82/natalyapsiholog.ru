import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../dist/client/", import.meta.url);
const expectedSiteUrl = process.env.SITE_URL;

test("exports a deployable static site", async () => {
  assert.ok(expectedSiteUrl, "SITE_URL must be set while testing the export");

  const [html, englishHtml, robots, sitemap] = await Promise.all([
    readFile(new URL("index.html", outputRoot), "utf8"),
    readFile(new URL("en/index.html", outputRoot), "utf8"),
    readFile(new URL("robots.txt", outputRoot), "utf8"),
    readFile(new URL("sitemap.xml", outputRoot), "utf8"),
  ]);

  assert.match(html, /<html lang="ru"[^>]*data-theme="mint"/);
  assert.match(html, /id="theme-bootstrap"/);
  assert.match(html, /requestedTheme === "classic" \? "classic" : "mint"/);
  assert.match(html, /<title>Психолог Наталья в Ростове-на-Дону \| Очно и онлайн<\/title>/);
  assert.match(html, new RegExp(`<link rel="canonical" href="${escapeRegex(expectedSiteUrl)}/?"`));
  assert.match(html, new RegExp(`<meta property="og:url" content="${escapeRegex(expectedSiteUrl)}/?"`));
  assert.match(html, new RegExp(`<link rel="alternate" hrefLang="en" href="${escapeRegex(expectedSiteUrl)}/en/"`));
  assert.match(html, /href="\/en\/" lang="en"/);
  assert.doesNotMatch(html, /обучение завершено/);
  assert.match(html, /href="tel:\+79515064659"/);
  assert.match(html, /href="https:\/\/t\.me\/natalya_psy_rostov"/);
  assert.match(html, /href="https:\/\/wa\.me\/79515064659"/);
  assert.match(html, /id="reviews"/);
  assert.match(html, /Текст приводится без изменений/);
  assert.match(html, /Спасибо большое Наталье, она помогла начать меняться в лучшую сторону/);
  assert.match(html, /Наталья - чуткий и внимательный специалист/);

  assert.match(englishHtml, /<html lang="en"[^>]*data-theme="mint"/);
  assert.match(englishHtml, /id="theme-bootstrap"/);
  assert.match(englishHtml, /<title>Psychologist Natalya in Rostov-on-Don \| In Person and Online<\/title>/);
  assert.match(englishHtml, new RegExp(`<link rel="canonical" href="${escapeRegex(expectedSiteUrl)}/en/"`));
  assert.match(englishHtml, new RegExp(`<meta property="og:url" content="${escapeRegex(expectedSiteUrl)}/en/"`));
  assert.match(englishHtml, new RegExp(`<link rel="alternate" hrefLang="ru-RU" href="${escapeRegex(expectedSiteUrl)}/?"`));
  assert.match(englishHtml, /<meta property="og:locale" content="en_US"/);
  assert.match(englishHtml, new RegExp(`<meta property="og:image" content="${escapeRegex(expectedSiteUrl)}/og-en[.]png"`));
  assert.match(englishHtml, /href="\/en\/" lang="en" aria-current="page"/);
  assert.match(englishHtml, /"inLanguage":"en"/);
  assert.match(englishHtml, /Moscow Institute of Psychoanalysis/);
  assert.doesNotMatch(englishHtml, /training completed/i);
  assert.match(englishHtml, /href="tel:\+79515064659"/);
  assert.match(englishHtml, /href="https:\/\/t\.me\/natalya_psy_rostov"/);
  assert.match(englishHtml, /href="https:\/\/wa\.me\/79515064659"/);
  assert.match(englishHtml, /These reviews were originally published in Russian on Avito/);
  assert.match(englishHtml, /Russian original/);
  assert.match(englishHtml, /Thank you very much to Natalya; she helped me begin changing for the better/);
  assert.match(englishHtml, /Спасибо большое Наталье, она помогла начать меняться в лучшую сторону/);
  assert.match(englishHtml, /Natalya is a sensitive and attentive professional/);
  assert.match(englishHtml, /Наталья - чуткий и внимательный специалист/);

  assert.match(robots, new RegExp(`Sitemap: ${escapeRegex(expectedSiteUrl)}/sitemap\\.xml`));
  assert.match(sitemap, new RegExp(`<loc>${escapeRegex(expectedSiteUrl)}/?</loc>`));
  assert.match(sitemap, new RegExp(`<loc>${escapeRegex(expectedSiteUrl)}/en/</loc>`));
  assert.match(sitemap, new RegExp(`hreflang="en" href="${escapeRegex(expectedSiteUrl)}/en/"`));

  await Promise.all([
    access(new URL("favicon.svg", outputRoot)),
    access(new URL("og.png", outputRoot)),
    access(new URL("og-en.png", outputRoot)),
    access(new URL("natalya-psychologist.png", outputRoot)),
  ]);
});

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("ships only small document previews without original PDFs or enlargement links", async () => {
  const expected = [
    "01-practical-psychology-2024-preview.webp",
    "02-clinical-psychology-2026-preview.webp",
    "03-cbt-theory-2024-preview.webp",
    "04-anxiety-therapy-2025-preview.webp",
    "05-cbt-practice-2025-preview.webp",
  ];
  const files = await readdir(new URL("education/", outputRoot));
  assert.deepEqual(files.sort(), expected);
  for (const filename of files) {
    const bytes = await readFile(new URL(`education/${filename}`, outputRoot));
    assert.equal(bytes.toString("ascii", 0, 4), "RIFF");
    assert.equal(bytes.toString("ascii", 8, 12), "WEBP");
    assert.ok(bytes.length < 100_000, "Preview must stay small");
  }
  for (const page of ["index.html", "en/index.html"]) {
    const html = await readFile(new URL(page, outputRoot), "utf8");
    assert.match(html, /class="credentials"/);
    assert.match(html, /class="credential-track is-animated"/);
    assert.doesNotMatch(html, /href="\/education\//);
    assert.doesNotMatch(html, /credential-viewer/);
  }
});

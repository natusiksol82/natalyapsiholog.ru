import { copyFile, mkdir, writeFile } from "node:fs/promises";

const configuredSiteUrl = process.env.SITE_URL;

if (!configuredSiteUrl) {
  throw new Error("SITE_URL is required, for example https://example.ru");
}

const siteUrl = new URL(configuredSiteUrl);

if (siteUrl.pathname !== "/" || siteUrl.search || siteUrl.hash) {
  throw new Error("SITE_URL must contain only the site origin, for example https://example.ru");
}

const origin = siteUrl.origin;
const outputDirectory = new URL("../dist/client/", import.meta.url);
const robots = `User-agent: *\nAllow: /\n\nHost: ${origin}\nSitemap: ${origin}/sitemap.xml\n`;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${escapeXml(`${origin}/`)}</loc>
    <xhtml:link rel="alternate" hreflang="ru-RU" href="${escapeXml(`${origin}/`)}" />
    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(`${origin}/en/`)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${origin}/`)}" />
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${escapeXml(`${origin}/en/`)}</loc>
    <xhtml:link rel="alternate" hreflang="ru-RU" href="${escapeXml(`${origin}/`)}" />
    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(`${origin}/en/`)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${origin}/`)}" />
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
`;

await mkdir(outputDirectory, { recursive: true });
await mkdir(new URL("en/", outputDirectory), { recursive: true });
await Promise.all([
  copyFile(new URL("en.html", outputDirectory), new URL("en/index.html", outputDirectory)),
  writeFile(new URL("robots.txt", outputDirectory), robots, "utf8"),
  writeFile(new URL("sitemap.xml", outputDirectory), sitemap, "utf8"),
]);

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

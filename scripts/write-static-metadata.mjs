import { mkdir, writeFile } from "node:fs/promises";

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
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${escapeXml(`${origin}/`)}</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

await mkdir(outputDirectory, { recursive: true });
await Promise.all([
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

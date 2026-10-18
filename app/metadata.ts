import type { Metadata } from "next";
import { content, type Locale } from "./content";
import { siteConfig } from "./site-config";

export function createMetadata(locale: Locale): Metadata {
  const page = content[locale];

  return {
    metadataBase: siteConfig.url,
    title: { absolute: page.seo.title },
    description: page.seo.description,
    keywords: [...page.seo.keywords],
    alternates: {
      canonical: page.path,
    },
    openGraph: {
      type: "website",
      locale: page.seo.openGraphLocale,
      url: page.path,
      siteName: `${page.brand.role} ${page.brand.name}`,
      title: page.seo.openGraphTitle,
      description: page.seo.openGraphDescription,
      images: [
        {
          url: page.seo.openGraphImage,
          width: 1731,
          height: 909,
          alt: page.seo.openGraphImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo.twitterTitle,
      description: page.seo.twitterDescription,
      images: [page.seo.openGraphImage],
    },
    icons: { icon: "/favicon.svg?v=2" },
    // Keep the English route for later, without promoting or indexing it.
    robots: { index: locale === "ru", follow: true },
  };
}

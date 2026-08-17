const configuredSiteUrl = process.env.SITE_URL;

if (!configuredSiteUrl && process.env.NODE_ENV === "production") {
  throw new Error(
    "SITE_URL is required for a production build, for example https://example.ru",
  );
}

const siteUrl = new URL(configuredSiteUrl ?? "http://localhost:3000");

if (siteUrl.pathname !== "/" || siteUrl.search || siteUrl.hash) {
  throw new Error("SITE_URL must contain only the site origin, for example https://example.ru");
}

export const siteConfig = {
  name: "Психолог Наталья",
  title: "Психолог Наталья в Ростове-на-Дону | Очно и онлайн",
  description:
    "Индивидуальные консультации психолога в Ростове-на-Дону и онлайн. Тревога, эмоции, самооценка, отношения и сложные жизненные ситуации.",
  url: siteUrl,
  contacts: {
    avito:
      "https://www.avito.ru/rostov-na-donu/predlozheniya_uslug/psiholog_ochno_i_onlayn_4558239797?utm_campaign=native&utm_medium=item_page_android&utm_source=soc_sharing_seller",
    phone: "+7 951 506-46-59",
    email: null,
    telegram: "https://t.me/natalya_psy_rostov",
    whatsapp: "https://wa.me/79515064659",
    max: "https://max.ru/u/f9LHodD0cOLEpKs25ptnx6_3lewS47t-0zyE9VbgKaOjy8UJ6OyQuySAJLE",
  },
} as const;

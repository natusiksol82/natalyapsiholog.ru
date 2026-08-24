/* eslint-disable @next/next/no-html-link-for-pages -- locale changes cross root layouts and must reload the document */
import { content, type Locale, type SiteContent } from "./content";
import { siteConfig } from "./site-config";

const avitoUrl = siteConfig.contacts.avito;
const phoneHref = `tel:${siteConfig.contacts.phone.replace(/[^+\d]/g, "")}`;
const telegramUrl = siteConfig.contacts.telegram;
const whatsappUrl = siteConfig.contacts.whatsapp;
const maxUrl = siteConfig.contacts.max;

function buildJsonLd(page: SiteContent) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Person", "ProfessionalService"],
        "@id": `${siteConfig.url.origin}/#natalya`,
        url: new URL(page.path, siteConfig.url).href,
        inLanguage: page.locale,
        name: `${page.brand.role} ${page.brand.name}`,
        jobTitle: page.structuredData.jobTitle,
        description: page.structuredData.description,
        areaServed: { "@type": "City", name: page.structuredData.city },
        address: {
          "@type": "PostalAddress",
          addressLocality: page.structuredData.city,
          addressRegion: page.structuredData.region,
          addressCountry: "RU",
        },
        telephone: siteConfig.contacts.phone,
        priceRange: "2000–2500 ₽",
        sameAs: [telegramUrl, whatsappUrl, maxUrl, avitoUrl],
        knowsAbout: page.structuredData.knowsAbout,
      },
      {
        "@type": "FAQPage",
        inLanguage: page.locale,
        mainEntity: page.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}

export function LandingPage({ locale }: { locale: Locale }) {
  const page = content[locale];
  const jsonLd = buildJsonLd(page);

  return (
    <main>
      <script
        id={`structured-data-${locale}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="site-header">
        <a className="brand" href="#top" aria-label={page.brand.homeLabel}>
          <span className="brand-mark">{page.brand.initial}</span>
          <span>
            <strong>{page.brand.name}</strong>
            <small>{page.brand.role}</small>
          </span>
        </a>
        <nav aria-label={page.navigation.label}>
          <a href="#support">{page.navigation.support}</a>
          <a href="#about">{page.navigation.about}</a>
          <a href="#reviews">{page.navigation.reviews}</a>
          <a href="#prices">{page.navigation.prices}</a>
        </nav>
        <div className="header-actions">
          <div className="language-switcher" aria-label={page.languageSwitcherLabel}>
            <a href="/" lang="ru" aria-current={locale === "ru" ? "page" : undefined}>RU</a>
            <a href="/en/" lang="en" aria-current={locale === "en" ? "page" : undefined}>EN</a>
          </div>
          <a className="button button-small header-contact" href="#contacts">
            {page.navigation.contact}
          </a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> {page.hero.eyebrow}</p>
          <h1>{page.hero.titleFirst}<br /><em>{page.hero.titleSecond}</em></h1>
          <p className="hero-lead">{page.hero.lead}</p>
          <div className="hero-actions">
            <a className="button" href="#contacts">
              {page.hero.contact} <span aria-hidden="true">↓</span>
            </a>
            <a className="text-link" href="#approach">{page.hero.approach} <span aria-hidden="true">↓</span></a>
          </div>
          <ul className="quick-facts" aria-label={page.hero.factsLabel}>
            {page.hero.facts.map((fact) => (
              <li key={fact.label}><span>{fact.label}</span><strong>{fact.value}</strong></li>
            ))}
          </ul>
        </div>
        <div className="hero-visual">
          <img className="hero-photo" src="/natalya-psychologist.png" alt={page.hero.photoAlt} />
          <div className="photo-caption">
            <p>{page.brand.name}</p>
            <span>{page.brand.role}</span>
          </div>
          <blockquote>{page.hero.quote}</blockquote>
        </div>
      </section>

      <section className="support section" id="support">
        <div className="section-heading">
          <p className="eyebrow"><span /> {page.support.eyebrow}</p>
          <h2>{page.support.title[0]}<br />{page.support.title[1]}</h2>
          <p>{page.support.lead}</p>
        </div>
        <div className="topic-grid">
          {page.support.topics.map((topic) => (
            <article className="topic-card" key={topic.number}>
              <span className="topic-number">{topic.number}</span>
              <h3>{topic.title}</h3>
              <p>{topic.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="approach section" id="approach">
        <div className="approach-note">
          <span className="large-initial">{page.brand.initial}</span>
          <p>{page.approach.note}</p>
        </div>
        <div className="approach-copy">
          <p className="eyebrow light"><span /> {page.approach.eyebrow}</p>
          <h2>{page.approach.title}</h2>
          <p className="lead-light">{page.approach.lead}</p>
          <div className="method-list">
            {page.approach.methods.map((method) => (
              <div key={method.number}><span>{method.number}</span><p><strong>{method.title}</strong>{method.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="about section" id="about">
        <div className="about-title">
          <p className="eyebrow"><span /> {page.about.eyebrow}</p>
          <h2>{page.about.titleName}<br /><em>{page.about.titleRole}</em></h2>
        </div>
        <div className="about-copy">
          <p className="about-lead">{page.about.lead}</p>
          <p>{page.about.text}</p>
          <div className="education">
            {page.about.education.map((item) => (
              <div key={item.label}><span>{item.label}</span><strong>{item.title}</strong><p>{item.institution}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="reviews section" id="reviews">
        <div className="section-heading reviews-heading">
          <p className="eyebrow"><span /> {page.reviews.eyebrow}</p>
          <h2>{page.reviews.title}</h2>
          <div className="reviews-intro">
            <strong>{page.reviews.count}</strong>
            <p>{page.reviews.lead}</p>
          </div>
        </div>
        <div className="review-wall">
          {page.reviews.items.map((review) => (
            <article className="review-card" key={`${review.author}-${review.date}`}>
              <span className="review-quote" aria-hidden="true">“</span>
              <blockquote>{review.text}</blockquote>
              {review.originalText ? (
                <details className="review-original" lang="ru">
                  <summary>{page.reviews.originalLabel}<span aria-hidden="true">+</span></summary>
                  <p>{review.originalText}</p>
                </details>
              ) : null}
              <div className="review-meta">
                <div>
                  <strong>{review.author}</strong>
                  <span>{review.date}</span>
                </div>
                <a href={avitoUrl} target="_blank" rel="noreferrer">
                  {page.reviews.sourceLabel} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="prices section" id="prices">
        <div className="section-heading centered">
          <p className="eyebrow"><span /> {page.prices.eyebrow}</p>
          <h2>{page.prices.title}</h2>
          <p>{page.prices.lead}</p>
        </div>
        <div className="price-grid">
          {page.prices.cards.map((card) => (
            <article className={`price-card${card.featured ? " featured" : ""}`} key={card.format}>
              <div><span className="format-label">{card.format}</span><span className="availability">{card.availability}</span></div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <ul>{card.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              <div className="price"><strong>{card.price}</strong><span>{card.suffix}</span></div>
              <a className={`button${card.featured ? "" : " button-outline"}`} href="#contacts">{card.button} <span>↓</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="faq section">
        <div className="faq-title">
          <p className="eyebrow"><span /> {page.faq.eyebrow}</p>
          <h2>{page.faq.title}</h2>
        </div>
        <div className="faq-list">
          {page.faq.items.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>{item.question}<span aria-hidden="true">+</span></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cta section" id="contacts">
        <p className="eyebrow light"><span /> {page.contacts.eyebrow}</p>
        <h2>{page.contacts.title}</h2>
        <p>{page.contacts.lead}</p>
        <div className="contact-grid">
          <a className="contact-card primary-contact" href={telegramUrl} target="_blank" rel="noreferrer" aria-label={page.contacts.telegramAria}>
            <span className="contact-mark">T</span><span><strong>Telegram</strong><small>@natalya_psy_rostov</small></span><b aria-hidden="true">↗</b>
          </a>
          <a className="contact-card primary-contact" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label={page.contacts.whatsappAria}>
            <span className="contact-mark">W</span><span><strong>WhatsApp</strong><small>{page.contacts.openDialog}</small></span><b aria-hidden="true">↗</b>
          </a>
          <a className="contact-card" href={maxUrl} target="_blank" rel="noreferrer" aria-label={page.contacts.maxAria}>
            <span className="contact-mark">M</span><span><strong>MAX</strong><small>{page.contacts.openMessenger}</small></span><b aria-hidden="true">↗</b>
          </a>
          <a className="contact-card" href={phoneHref} aria-label={page.contacts.phoneAria}>
            <span className="contact-mark">☎</span><span><strong>{page.contacts.call}</strong><small>{siteConfig.contacts.phone}</small></span><b aria-hidden="true">↗</b>
          </a>
        </div>
        <a className="avito-link" href={avitoUrl} target="_blank" rel="noreferrer">{page.contacts.avito} <span aria-hidden="true">↗</span></a>
      </section>

      <footer>
        <div className="brand footer-brand"><span className="brand-mark">{page.brand.initial}</span><span><strong>{page.brand.name}</strong><small>{page.brand.role}</small></span></div>
        <p>{page.footer.format[0]}<br />{page.footer.format[1]}</p>
        <div className="footer-contacts"><a href={phoneHref}>{siteConfig.contacts.phone}</a><a href={telegramUrl} target="_blank" rel="noreferrer">@natalya_psy_rostov</a></div>
        <p className="legal">{page.footer.legal}</p>
      </footer>

      <a className="mobile-cta" href="#contacts">{page.footer.mobileCta} <span>↑</span></a>
    </main>
  );
}

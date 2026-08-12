import type { Metadata } from "next";

const avitoUrl =
  "https://www.avito.ru/rostov-na-donu/predlozheniya_uslug/psiholog_ochno_i_onlayn_4558239797?utm_campaign=native&utm_medium=item_page_android&utm_source=soc_sharing_seller";

export const metadata: Metadata = {
  title: "Психолог Наталья в Ростове-на-Дону | Очно и онлайн",
  description:
    "Индивидуальные консультации психолога: тревога, самооценка, отношения и сложные жизненные ситуации. Очно у Комсомольской площади и онлайн.",
  alternates: { canonical: "/" },
};

const topics = [
  {
    number: "01",
    title: "Тревога и страх",
    text: "Разберем источники напряжения и найдем способы возвращать себе спокойствие в повседневной жизни.",
  },
  {
    number: "02",
    title: "Самооценка и опора на себя",
    text: "Будем замечать привычные внутренние ограничения и формировать более устойчивое отношение к себе.",
  },
  {
    number: "03",
    title: "Сложные периоды",
    text: "Пройдем через перемены, потери и неопределенность бережно, в вашем темпе и без оценок.",
  },
  {
    number: "04",
    title: "Отношения",
    text: "Поработаем над общением с супругами, детьми, родителями и коллегами, личными границами и взаимопониманием.",
  },
  {
    number: "05",
    title: "Эмоциональная регуляция",
    text: "Освоим практические навыки, которые помогают понимать эмоции, выдерживать их и поддерживать себя.",
  },
  {
    number: "06",
    title: "Личностный рост",
    text: "Проясним ваши ценности и цели, чтобы выбирать решения, которые действительно подходят именно вам.",
  },
];

const faqs = [
  {
    question: "Как проходит первая консультация?",
    answer:
      "Мы знакомимся, обсуждаем ваш запрос и то, к какому результату вы хотели бы прийти. Вы сможете задать вопросы о формате работы и решить, комфортно ли продолжать.",
  },
  {
    question: "Можно ли консультироваться онлайн?",
    answer:
      "Да. Онлайн-консультация проходит через удобный мессенджер по предварительной договоренности и длится 60 минут.",
  },
  {
    question: "Где проходят очные встречи?",
    answer:
      "В Ростове-на-Дону, в районе Комсомольской площади. Точный адрес сообщается после подтверждения записи.",
  },
  {
    question: "Как записаться?",
    answer:
      "Нажмите кнопку «Написать на Авито», коротко опишите удобный формат и желаемое время. Наталья ответит и подтвердит встречу по своему расписанию.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Person", "ProfessionalService"],
      "@id": "#natalya",
      name: "Психолог Наталья",
      jobTitle: "Практикующий психолог",
      description:
        "Индивидуальные психологические консультации очно в Ростове-на-Дону и онлайн.",
      areaServed: { "@type": "City", name: "Ростов-на-Дону" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ростов-на-Дону",
        addressRegion: "Ростовская область",
        addressCountry: "RU",
      },
      priceRange: "2000–2500 ₽",
      sameAs: [avitoUrl],
      knowsAbout: [
        "Когнитивно-поведенческая терапия",
        "Тревога",
        "Самооценка",
        "Эмоциональная регуляция",
        "Семейные отношения",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="На главную">
          <span className="brand-mark">Н</span>
          <span>
            <strong>Наталья</strong>
            <small>практикующий психолог</small>
          </span>
        </a>
        <nav aria-label="Основная навигация">
          <a href="#support">С чем работаю</a>
          <a href="#about">Обо мне</a>
          <a href="#prices">Стоимость</a>
        </nav>
        <a className="button button-small" href={avitoUrl} target="_blank" rel="noreferrer">
          Записаться
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Психолог в Ростове-на-Дону и онлайн</p>
          <h1>Бережно к себе.<br /><em>Шаг за шагом.</em></h1>
          <p className="hero-lead">
            Помогаю справляться с тревогой, понимать свои эмоции и находить внутреннюю опору в сложные периоды жизни.
          </p>
          <div className="hero-actions">
            <a className="button" href={avitoUrl} target="_blank" rel="noreferrer">
              Написать на Авито <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#approach">Как проходит работа <span aria-hidden="true">↓</span></a>
          </div>
          <ul className="quick-facts" aria-label="Формат консультаций">
            <li><span>Формат</span><strong>Очно и онлайн</strong></li>
            <li><span>Сессия</span><strong>60 минут</strong></li>
            <li><span>Стоимость</span><strong>от 2 000 ₽</strong></li>
          </ul>
        </div>
        <div className="hero-visual">
          <img
            className="hero-photo"
            src="/natalya-psychologist.png"
            alt="Психолог Наталья в кабинете в Ростове-на-Дону"
          />
          <div className="photo-caption">
            <p>Наталья</p>
            <span>Практикующий психолог</span>
          </div>
          <blockquote>«Важные перемены начинаются с безопасного разговора»</blockquote>
        </div>
      </section>

      <section className="support section" id="support">
        <div className="section-heading">
          <p className="eyebrow"><span /> С чем можно обратиться</p>
          <h2>Не обязательно справляться<br />со всем в одиночку</h2>
          <p>На консультации можно говорить о том, что волнует именно вас. Здесь нет «неправильных» тем или чувств.</p>
        </div>
        <div className="topic-grid">
          {topics.map((topic) => (
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
          <span className="large-initial">Н</span>
          <p>Безопасное и доверительное пространство, где можно быть собой</p>
        </div>
        <div className="approach-copy">
          <p className="eyebrow light"><span /> Мой подход</p>
          <h2>Понимание вместо готовых советов</h2>
          <p className="lead-light">
            Мы вместе исследуем причины сложностей, ваши реакции и привычные сценарии. Затем найдем новые стратегии, которые можно применять в реальной жизни.
          </p>
          <div className="method-list">
            <div><span>01</span><p><strong>В вашем темпе</strong>Без давления, оценок и требования быстро измениться.</p></div>
            <div><span>02</span><p><strong>С опорой на науку</strong>Классическая психология и методы когнитивно-поведенческой терапии.</p></div>
            <div><span>03</span><p><strong>С вниманием к практике</strong>Навыки эмоциональной регуляции и самоподдержки между встречами.</p></div>
          </div>
        </div>
      </section>

      <section className="about section" id="about">
        <div className="about-title">
          <p className="eyebrow"><span /> Обо мне</p>
          <h2>Наталья,<br /><em>практикующий психолог</em></h2>
        </div>
        <div className="about-copy">
          <p className="about-lead">Считаю, что хорошая терапия начинается с уважения к опыту человека и честного, внимательного контакта.</p>
          <p>Имею диплом практического психолога ДГПУ. Постоянно совершенствую знания и навыки: сейчас прохожу обучение на клинического психолога в Московском институте психоанализа и регулярно повышаю квалификацию.</p>
          <div className="education">
            <div><span>Образование</span><strong>Диплом практического психолога</strong><p>ДГПУ</p></div>
            <div><span>Повышение квалификации</span><strong>Профессиональные курсы</strong><p>СПб ИДПО</p></div>
            <div><span>Сейчас</span><strong>Клиническая психология</strong><p>Московский институт психоанализа</p></div>
          </div>
        </div>
      </section>

      <section className="prices section" id="prices">
        <div className="section-heading centered">
          <p className="eyebrow"><span /> Формат и стоимость</p>
          <h2>Выберите удобный формат</h2>
          <p>Индивидуальная встреча длится 60 минут. Время согласуем после вашего сообщения.</p>
        </div>
        <div className="price-grid">
          <article className="price-card featured">
            <div><span className="format-label">Онлайн</span><span className="availability">Из любой точки</span></div>
            <h3>Онлайн-консультация</h3>
            <p>Разговор через удобный мессенджер в спокойной обстановке.</p>
            <ul><li>Индивидуально</li><li>60 минут</li><li>По предварительной записи</li></ul>
            <div className="price"><strong>2 000 ₽</strong><span>за встречу</span></div>
            <a className="button" href={avitoUrl} target="_blank" rel="noreferrer">Выбрать онлайн <span>↗</span></a>
          </article>
          <article className="price-card">
            <div><span className="format-label">Очно</span><span className="availability">Ростов-на-Дону</span></div>
            <h3>Очная консультация</h3>
            <p>Личная встреча в кабинете в районе Комсомольской площади.</p>
            <ul><li>Индивидуально</li><li>60 минут</li><li>Точный адрес после записи</li></ul>
            <div className="price"><strong>2 500 ₽</strong><span>за встречу</span></div>
            <a className="button button-outline" href={avitoUrl} target="_blank" rel="noreferrer">Выбрать очно <span>↗</span></a>
          </article>
        </div>
      </section>

      <section className="faq section">
        <div className="faq-title">
          <p className="eyebrow"><span /> Вопросы</p>
          <h2>Перед первой встречей</h2>
        </div>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>{item.question}<span aria-hidden="true">+</span></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cta section">
        <p className="eyebrow light"><span /> Первый шаг</p>
        <h2>Можно начать с короткого сообщения</h2>
        <p>Напишите, какой формат вам подходит и в какое время удобно встретиться. Наталья ответит на вопросы и подтвердит запись.</p>
        <a className="button button-light" href={avitoUrl} target="_blank" rel="noreferrer">Написать на Авито <span>↗</span></a>
      </section>

      <footer>
        <div className="brand footer-brand"><span className="brand-mark">Н</span><span><strong>Наталья</strong><small>практикующий психолог</small></span></div>
        <p>Очно у Комсомольской площади<br />Онлайн по договоренности</p>
        <div className="footer-links"><a href="#support">Направления</a><a href="#about">Обо мне</a><a href="#prices">Стоимость</a></div>
        <p className="legal">Психологическое консультирование не заменяет медицинскую или экстренную помощь. В ситуации непосредственной угрозы жизни обратитесь по номеру 112.</p>
      </footer>

      <a className="mobile-cta" href={avitoUrl} target="_blank" rel="noreferrer">Записаться на консультацию <span>↗</span></a>
    </main>
  );
}

import type { Locale } from "./content";

export const educationDocuments = [
  {
    slug: "01-practical-psychology-2024",
    year: "2024",
    title: { ru: "Практический психолог", en: "Practical psychology" },
    institution: { ru: "Донецкий государственный педагогический университет", en: "Donetsk State Pedagogical University" },
    detail: { ru: "Диплом о профессиональной переподготовке", en: "Professional retraining diploma" },
  },
  {
    slug: "02-clinical-psychology-2026",
    year: "2026",
    title: { ru: "Клиническая психология", en: "Clinical psychology" },
    institution: { ru: "Московский институт психоанализа", en: "Moscow Institute of Psychoanalysis" },
    detail: { ru: "Диплом о профессиональной переподготовке · 1500 часов", en: "Professional retraining diploma · 1,500 hours" },
  },
  {
    slug: "03-cbt-theory-2024",
    year: "2024",
    title: { ru: "КПТ: теория, стратегия, техники", en: "CBT: theory, strategy and techniques" },
    institution: { ru: "Санкт-Петербургский институт ДПО для психологов и психотерапевтов", en: "St Petersburg Institute of Continuing Professional Education for Psychologists and Psychotherapists" },
    detail: { ru: "Повышение квалификации · 72 ак. ч.", en: "Professional development · 72 academic hours" },
  },
  {
    slug: "04-anxiety-therapy-2025",
    year: "2025",
    title: { ru: "Стратегии психотерапевтической помощи при тревоге", en: "Strategies for therapeutic support with anxiety" },
    institution: { ru: "Санкт-Петербургский институт ДПО для психологов и психотерапевтов", en: "St Petersburg Institute of Continuing Professional Education for Psychologists and Psychotherapists" },
    detail: { ru: "Повышение квалификации · 48 ак. ч.", en: "Professional development · 48 academic hours" },
  },
  {
    slug: "05-cbt-practice-2025",
    year: "2025",
    title: { ru: "КПТ в действии: практические кейсы и техники", en: "CBT in practice: cases and techniques" },
    institution: { ru: "Санкт-Петербургский институт ДПО для психологов и психотерапевтов", en: "St Petersburg Institute of Continuing Professional Education for Psychologists and Psychotherapists" },
    detail: { ru: "Повышение квалификации · 24 ак. ч.", en: "Professional development · 24 academic hours" },
  },
] as const;

export const educationLabels: Record<Locale, {
  title: string; count: string; carousel: string; previous: string; next: string;
  pause: string; play: string; manual: string; goTo: string; copyNote: string;
}> = {
  ru: {
    title: "Документы об образовании", count: "2 диплома и 3 удостоверения",
    carousel: "Документы об образовании Натальи", previous: "Предыдущий документ", next: "Следующий документ",
    pause: "Пауза", play: "Продолжить", manual: "Смена вручную", goTo: "Показать документ",
    copyNote: "Публичная копия: номера и подписи скрыты",
  },
  en: {
    title: "Education documents", count: "2 diplomas and 3 certificates",
    carousel: "Natalya's education documents", previous: "Previous document", next: "Next document",
    pause: "Pause", play: "Resume", manual: "Browse manually", goTo: "Show document",
    copyNote: "Public copy: document numbers and signatures are hidden",
  },
};

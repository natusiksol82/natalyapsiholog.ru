# Сайт психолога Натальи

Статический сайт на React, Next.js API и vinext для публикации в Object Storage
или на обычном веб-хостинге.

## Требования

- Node.js `>=22.13.0`

## Локальный запуск

```bash
npm install
npm run dev
```

## Статическая сборка

Укажите окончательный публичный адрес без завершающего слеша:

```bash
SITE_URL=https://natalyapsiholog.ru npm run build:static
```

Готовые для загрузки файлы появятся в `dist/client`. Команда также создает
`robots.txt` и `sitemap.xml`. Переменная `SITE_URL` обязательна для production-
сборки: она задает canonical URL, Open Graph URL, Host и адрес sitemap.

Проверка полного результата:

```bash
SITE_URL=https://natalyapsiholog.ru npm test
```

## Контакты

Телефон и ссылки на Авито, Telegram, WhatsApp и MAX находятся в
`app/site-config.ts`. После изменения контактов нужна новая сборка.

## Публикация

Загрузите содержимое `dist/client`, а не сам каталог, в корень бакета или
публичную директорию хостинга. Главный документ: `index.html`, страница ошибки:
`404.html`. После подключения домена заново соберите сайт с его окончательным
HTTPS-адресом.

При отправке изменений в ветку `main` workflow `Deploy to GitHub Pages`
автоматически проверяет и публикует сайт для домена `natalyapsiholog.ru`.

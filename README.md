
# SEO Image Optimizer Pro

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-brightgreen)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![Client-Side](https://img.shields.io/badge/Client-Side-Only-blue)](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs)
[![Vite](https://img.shields.io/badge/Built%20with-Vite-646cff?style=flat&logo=vite)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-06b6d4?style=flat&logo=tailwindcss)](https://tailwindcss.com)

Оптимизатор изображений для тех, кто ценит скорость сайта больше, чем кофе по утрам. Локально в браузере — WebP/AVIF/JPEG, responsive размеры, ALT-генерация, ZIP-экспорт. Без серверов, без утечек, без лишних байт. PWA-ready, чтобы работал оффлайн, как старый добрый Notepad.

## Что это решает
- **SEO без головной боли**: Авто-ALT из имени файла (с переводом ключей на русский), метаданные чистим опционально.
- **Скорость на первом месте**: Сжимает до 80% без потери качества, генерит srcset для <picture> — Google Pagespeed в восторге.
- **Responsive без фигни**: Выбирай размеры (320px для мобилы, 4K для десктопа), экспорт в ZIP с HTML-сниппетами.
- **Приватно и быстро**: Всё в Web Worker'ах, данные не улетают никуда. 100% клиент-сайд.

Потому что в 2025 году изображения — это 70% трафика, а не "котик для красоты".

## Демо
[Live на image-optimize.vproger.ru](https://image-optimize.vproger.ru/)  
(Просто перетащи JPG/PNG/WebP/AVIF — увидишь магию. Нет? Загрузи, оптимизируй, скачай ZIP.)

![Screenshot](https://image-optimize.vproger.ru/og-image.png)  
*(Тёмная тема, светлая — в настройках. Адаптивно, как должно быть.)*

## Как использовать
1. **Загрузи файлы**: Drag'n'drop или "Выбрать" (multi-select, до 50 файлов — не тормозит).
2. **Настрой**: Пресеты (SEO Universal, Blog HD, 4K AVIF) или кастом (качество 0.6-0.9, размеры [320, 640, ...]).
3. **Оптимизируй**: Кнопка "Всё" или по одному — прогресс в реал-тайм.
4. **Экспорт**: ZIP с optimized/, original/, metadata.json + HTML <picture> сниппеты.

Пример HTML из ZIP:
```html
<picture>
  <source type="image/webp" srcset="optimized/base-320.webp 320w, optimized/base-640.webp 640w" sizes="100vw">
  <img src="optimized/base-1024.webp" width="1024" height="768" alt="Твой ALT здесь" loading="lazy">
</picture>
```

## Фичи под капотом
| Фича | Описание | Почему круто |
|------|----------|-------------|
| **Форматы** | WebP/AVIF/JPEG, с fallback | AVIF — 30% меньше WebP, но только для modern (детект в браузере). |
| **Responsive** | 6 пресетов размеров (320-3840px) | Srcset генерится auto, lazy-load в комплекте. |
| **ALT-ген** | Из filename (house → дом, strip garbage UUID) | SEO-boost без ручонки: "Modern House Photo" → "Современный Дом — Фото". |
| **Метаданные** | Strip EXIF/IPTC опционально | GDPR-friendly, размер -10-20% без потери сути. |
| **PWA** | Manifest + SW для оффлайн | Установи как app — работает без nets. |
| **Тема** | Dark/Light (localStorage + prefers) | Toggle в header, no flicker на reload. |

## Технологии (минимализм rules)
- **Core**: React 19 + Vite (build за 200ms, HMR instant).
- **UI**: Tailwind v4 (atomic, zero-runtime CSS), Framer Motion (только для модалок — 10KB gzipped).
- **Utils**: JSZip (ZIP), file-saver (download), Web Workers (optimize off-main-thread).
- **No deps hell**: 7 deps total, bundle ~150KB gzipped. ESLint + Prettier baked in.

Структура проекта (для fork'а):
```
seo-image-optimizer-pro/
├── src/
│   ├── components/     # Dropzone, FileList, SettingsPanel
│   ├── utils/          # file.js (ALT gen), zip.js
│   ├── workers/        # optimizer.worker.js
│   └── App.jsx         # Root + theme switch
├── public/             # Icons, manifest.json
├── vite.config.js      # React plugin + Tailwind
└── tailwind.config.js  # Dark: class, content paths
```

## Установка & Deploy
Клон, `npm i`, `npm run dev` — и поехало. Для GitHub Pages:
1. `npm run build` (dist/ готов).
2. В Settings > Pages: Source = Deploy from branch (main/gh-pages).
3. Или Actions workflow (.github/workflows/deploy.yml):
```yaml
name: Deploy to Pages
on: [push: main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
      - uses: actions/deploy-pages@v4
```
Push — и live за 2 мин. Homepage в package.json: `"https://username.github.io/repo"`.

## Контрибьют
- Форк, PR в main.
- Lint: `npm run lint`.
- Тест: Загрузи 10+ файлов — worker не должен лагать.
- Идеи: AVIF lossy/lossless toggle? Или batch preview thumbnails?

## Лицензия
MIT — бери, меняй, используй. Автор: [VProger](https://github.com/va-proger).  

*P.S. Если сайт грузится как черепаха — это не я, это твои 4K-иконки. Оптимизируй их здесь.*

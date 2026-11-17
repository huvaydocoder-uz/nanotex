# NANOTEX

NANOTEX — shaharlar, avtomobil yo‘llari va korxonalar uchun ko‘chma yoqilg‘i quyish shoxobchalari (AYoQSh) loyihasining sayti.

Sayt: https://nanotexazs.uz

## Tarkibi

Bu repozitoriyda saytning tayyor (build qilingan) statik fayllari joylashgan:

| Yo‘l | Vazifasi |
|---|---|
| `index.html` | Kirish sahifasi, SEO va Open Graph meta teglar |
| `assets/index-*.js`, `assets/index-*.css` | Asosiy ilova (React + Tailwind CSS, Vite orqali yig‘ilgan) |
| `assets/ContactForm-*.js` | So‘rov shakli (`POST /api/lead` ga yuboradi) |
| `assets/LogoAnimation-*.js` | Sayt ochilishidagi logo animatsiyasi |
| `assets/nanotex-theme.css` | Kunduzgi rejim, til tugmalari va bayroqlar uslublari |
| `images/` | Slayder, bo‘limlar va bajarilgan ishlar rasmlari (avif/webp, 800 va 1600 px) |
| `catalog/` | Mahsulotlar katalogi rasmlari (webp), kategoriyalar bo‘yicha papkalarda |
| `brand/`, `og.jpg`, `favicon.svg` | Logotip va ijtimoiy tarmoqlar uchun rasm |

## Imkoniyatlari

- Uch til: o‘zbekcha, ruscha, inglizcha (`?lang=uz|ru|en`), yonma-yon tugmalar va animatsiyali almashish.
- Kunduzgi va tungi rejim: 08:00–20:00 kunduzgi, 20:00–08:00 tungi; qo‘lda tanlangan rejim keyingi 08:00 yoki 20:00 gacha amal qiladi.
- Har yangi kirishda logo animatsiyasi (`?intro` bilan majburan ko‘rsatish mumkin).

## Lokal ishga tushirish

Istalgan statik server yetarli, masalan:

```bash
npx serve .
```

## Eslatmalar

- So‘rov shakli `/api/lead` serverless funksiyasiga murojaat qiladi; u ham bu repozitoriyga kirmagan.

## SEO

- `index.html` — 100+ meta teg: description, keywords, robots, Open Graph, Twitter, geo, Dublin Core, hreflang (uz/ru/en/x-default) va Schema.org (Organization, LocalBusiness, WebSite, FAQPage).
- Til versiyalari: `https://nanotexazs.uz/` (uz), `?lang=ru`, `?lang=en`. Sarlavha, tavsif, canonical va OG teglar tanlangan tilga qarab avtomatik almashadi.
- `sitemap.xml`, `robots.txt`, `site.webmanifest`.
- `vercel.json` — `www.nanotexazs.uz` → `nanotexazs.uz` 308 yo‘naltirish, xavfsizlik sarlavhalari, `?lang=ru|en` → `i18n/ru.html|en.html`.
- `i18n/ru.html`, `i18n/en.html` — robotlar JavaScript’siz ham to‘g‘ri til, sarlavha va canonical’ni ko‘rishi uchun. `index.html` dan yasaladi: **`index.html` o‘zgarganda `node tools/build-i18n.mjs` ni ishga tushiring.**
- Google Search Console va Yandex Webmaster tasdiqlash meta teglari `index.html` da (o‘chirmang). IndexNow kaliti: `c30a3eea181a4380e3ff834f913d1fe6.txt`.
- `favicon.ico`, `brand/icons/` (48, 180, 192, 512 px), `404.html`.

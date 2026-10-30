# NANOTEX

NANOTEX — shaharlar, avtomobil yo‘llari va korxonalar uchun ko‘chma yoqilg‘i quyish shoxobchalari (AYoQSh) loyihasining sayti.

Sayt: https://nanotech-eta.vercel.app

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

- Mahsulotlar katalogi rasmlari (`/catalog/...`) bu repozitoriyda yo‘q — ular alohida joylashtirilishi kerak.
- So‘rov shakli `/api/lead` serverless funksiyasiga murojaat qiladi; u ham bu repozitoriyga kirmagan.

// NANOTEX — ruscha va inglizcha sahifalarni index.html dan yasaydi.
// Qidiruv robotlari ?lang=ru va ?lang=en manzillarida JavaScript ishlamasdan ham
// to'g'ri til, sarlavha, tavsif, canonical va Schema.org ma'lumotlarini ko'radi.
// vercel.json shu manzillarni i18n/ru.html va i18n/en.html ga yo'naltiradi.
//
// index.html o'zgarganda qayta ishga tushiring:  node tools/build-i18n.mjs

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://nanotexazs.uz/';
// Windows'da git CRLF bilan chiqarishi mumkin: naqshlar LF bo'yicha yozilgan
const src = readFileSync(join(ROOT, 'index.html'), 'utf8').replace(/\r\n/g, '\n');

const UZ = {
  title: 'Ko‘chma AYoQSh ishlab chiqarish — NANOTEX | 50 tonnagacha',
  desc: 'NANOTEX — 50 tonnagacha ko‘chma yoqilg‘i quyish shoxobchalari (AYoQSh) ishlab chiqaradi: shahar, avtomobil yo‘llari va korxonalar uchun. Konstruktor, katalog, hamkorlik.',
  ogTitle: 'NANOTEX — ko‘chma AYoQSh ishlab chiqarish, 50 tonnagacha',
  ogDesc: 'Shaharlar, avtomobil yo‘llari va korxonalar uchun ko‘chma yoqilg‘i quyish shoxobchalari. NANOTEX bilan hamkorlik qiling.',
  alt: 'NANOTEX ko‘chma yoqilg‘i quyish shoxobchasi',
  pageName: 'Ko‘chma AYoQSh ishlab chiqarish — NANOTEX',
};

const LANGS = {
  ru: {
    locale: 'ru_RU',
    title: 'Мобильные АЗС под ключ — производство NANOTEX до 50 тонн',
    desc: 'NANOTEX производит мобильные АЗС до 50 тонн для городов, трасс и предприятий Узбекистана. Конструктор станции, каталог оборудования, сотрудничество.',
    ogTitle: 'NANOTEX — производство мобильных АЗС до 50 тонн',
    ogDesc: 'Мобильные автозаправочные станции для городов, трасс и предприятий. Начните сотрудничество с NANOTEX.',
    alt: 'Мобильная АЗС NANOTEX',
    pageName: 'Мобильные АЗС под ключ — NANOTEX',
    subject: 'Производство мобильных автозаправочных станций',
    summary: 'NANOTEX — производитель мобильных АЗС до 50 тонн.',
    twLabel1: 'Телефон',
    twLabel2: 'Регионы',
    twData2: 'Бухара, Самарканд, Навои, Хорезм и другие',
    noscript: {
      h1: 'NANOTEX — мобильные автозаправочные станции (АЗС)',
      p: 'NANOTEX производит мобильные АЗС до 50 тонн для городов, трасс и предприятий. Телефон:',
      js: 'Для полноценной работы сайта включите JavaScript в браузере.',
    },
    faq: [
      ['Чем занимается NANOTEX?', 'NANOTEX — проект по созданию и развитию мобильных автозаправочных станций. Мы стремимся развивать современные решения для городов и автодорог.'],
      ['Где можно разместить мобильную АЗС?', 'Могут рассматриваться участки в городах и вдоль автодорог. Конкретное место оценивается по характеристикам участка, техническим условиям и необходимым разрешениям.'],
      ['Как начать сотрудничество?', 'Оставьте заявку через форму внизу страницы: укажите имя, номер телефона и направление интереса. После рассмотрения заявки мы с вами свяжемся.'],
      ['Как определяется реализация проекта?', 'Каждый проект рассматривается отдельно: изучается участок, уточняются технические условия и необходимые разрешения, после чего стороны согласовывают условия. Цены, сроки и прочие условия заранее не определены — они обсуждаются в каждом случае отдельно.'],
    ],
  },
  en: {
    locale: 'en_US',
    title: 'Mobile Fuel Stations Manufacturer in Uzbekistan — NANOTEX',
    desc: 'NANOTEX builds mobile fuel stations up to 50 tonnes for cities, highways and businesses in Uzbekistan. Station configurator, equipment catalogue, partnerships.',
    ogTitle: 'NANOTEX — mobile fuel stations up to 50 tonnes',
    ogDesc: 'Mobile fuel stations for cities, highways and businesses. Start a partnership with NANOTEX.',
    alt: 'NANOTEX mobile fuel station',
    pageName: 'Mobile fuel stations manufacturer — NANOTEX',
    subject: 'Mobile fuel stations manufacturing',
    summary: 'NANOTEX manufactures mobile fuel stations up to 50 tonnes.',
    twLabel1: 'Phone',
    twLabel2: 'Regions',
    twData2: 'Bukhara, Samarkand, Navoiy, Khorezm and more',
    noscript: {
      h1: 'NANOTEX — mobile fuel stations',
      p: 'NANOTEX builds mobile fuel stations up to 50 tonnes for cities, highways and businesses. Phone:',
      js: 'Please enable JavaScript in your browser to use the full website.',
    },
    faq: [
      ['What does NANOTEX do?', 'NANOTEX is a project focused on creating and developing mobile fuel stations. We aim to develop modern solutions for cities and highways.'],
      ['Where can a mobile fuel station be placed?', 'Plots in cities and along highways can be considered. The exact site is assessed based on the plot’s characteristics, technical conditions and the required permits.'],
      ['How can I start a partnership?', 'Leave a request using the form at the bottom of the page: enter your name, phone number and area of interest. Once we have reviewed your request, we will get in touch.'],
      ['How is project delivery determined?', 'Each project is reviewed individually: the site is assessed, technical conditions and required permits are clarified, and then the parties agree on the terms. Prices, timelines and other terms are not fixed in advance — they are discussed case by case.'],
    ],
  },
};

// Har bir almashtirish aniq bir marta topilishi shart: index.html o'zgarib, naqsh yo'qolsa, skript to'xtaydi
function swap(html, from, to, { all = false } = {}) {
  const count = html.split(from).length - 1;
  if (count === 0) throw new Error(`index.html ichida topilmadi: ${from.slice(0, 80)}`);
  if (!all && count !== 1) throw new Error(`${count} marta topildi (1 kutilgan): ${from.slice(0, 80)}`);
  return html.split(from).join(to);
}

const attr = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function build(lang, L) {
  const url = `${BASE}?lang=${lang}`;
  let h = src;
  h = swap(h, '<html lang="uz"', `<html lang="${lang}"`);
  h = swap(h, '<meta http-equiv="content-language" content="uz" />', `<meta http-equiv="content-language" content="${lang}" />`);
  h = swap(h, '<meta name="DC.language" content="uz" />', `<meta name="DC.language" content="${lang}" />`);
  h = swap(h, `<title>${UZ.title}</title>`, `<title>${L.title}</title>`);
  h = swap(h, `<meta name="description" content="${UZ.desc}" />`, `<meta name="description" content="${attr(L.desc)}" />`);
  h = swap(h, `<meta name="subject" content="Ko‘chma yoqilg‘i quyish shoxobchalari ishlab chiqarish" />`, `<meta name="subject" content="${attr(L.subject)}" />`);
  h = swap(h, `<meta name="summary" content="NANOTEX — 50 tonnagacha ko‘chma AYoQSh ishlab chiqaruvchi kompaniya." />`, `<meta name="summary" content="${attr(L.summary)}" />`);
  h = swap(h, '<meta name="url" content="https://nanotexazs.uz/" />', `<meta name="url" content="${url}" />`);
  h = swap(h, '<meta name="identifier-URL" content="https://nanotexazs.uz/" />', `<meta name="identifier-URL" content="${url}" />`);
  h = swap(h, '<meta name="DC.identifier" content="https://nanotexazs.uz/" />', `<meta name="DC.identifier" content="${url}" />`);
  h = swap(h, '<link rel="canonical" href="https://nanotexazs.uz/" />', `<link rel="canonical" href="${url}" />`);
  h = swap(h, '<meta property="og:url" content="https://nanotexazs.uz/" />', `<meta property="og:url" content="${url}" />`);
  h = swap(h, '<meta name="twitter:url" content="https://nanotexazs.uz/" />', `<meta name="twitter:url" content="${url}" />`);
  h = swap(h, `content="${UZ.ogTitle}"`, `content="${attr(L.ogTitle)}"`, { all: true });
  h = swap(h, `content="${UZ.ogDesc}"`, `content="${attr(L.ogDesc)}"`, { all: true });
  h = swap(h, `content="${UZ.alt}"`, `content="${attr(L.alt)}"`, { all: true });
  h = swap(h, '<meta name="twitter:label1" content="Telefon" />', `<meta name="twitter:label1" content="${L.twLabel1}" />`);
  h = swap(h, '<meta name="twitter:label2" content="Hududlar" />', `<meta name="twitter:label2" content="${L.twLabel2}" />`);
  h = swap(h, '<meta name="twitter:data2" content="Buxoro, Samarqand, Navoiy, Xorazm va boshqalar" />', `<meta name="twitter:data2" content="${attr(L.twData2)}" />`);

  // og:locale: tanlangan til asosiy, qolgan ikkitasi muqobil
  const others = ['uz_UZ', 'ru_RU', 'en_US'].filter(l => l !== L.locale);
  h = swap(h, `<meta property="og:locale" content="uz_UZ" />
    <meta property="og:locale:alternate" content="ru_RU" />
    <meta property="og:locale:alternate" content="en_US" />`, `<meta property="og:locale" content="${L.locale}" />
    <meta property="og:locale:alternate" content="${others[0]}" />
    <meta property="og:locale:alternate" content="${others[1]}" />`);

  // Schema.org: WebPage va FAQPage shu tilda
  h = swap(h, `"@id": "https://nanotexazs.uz/#webpage",
            "url": "https://nanotexazs.uz/",
            "name": "${UZ.pageName}",
            "inLanguage": "uz",`, `"@id": "${url}#webpage",
            "url": "${url}",
            "name": ${JSON.stringify(L.pageName)},
            "inLanguage": "${lang}",`);
  const faqStart = h.indexOf('"@type": "FAQPage"');
  const faqEnd = h.indexOf(']', h.indexOf('"mainEntity"', faqStart));
  if (faqStart < 0 || faqEnd < 0) throw new Error('FAQPage bloki topilmadi');
  const entities = L.faq.map(([q, a]) => `              { "@type": "Question", "name": ${JSON.stringify(q)}, "acceptedAnswer": { "@type": "Answer", "text": ${JSON.stringify(a)} } }`).join(',\n');
  h = h.slice(0, faqStart) + `"@type": "FAQPage",
            "@id": "${url}#faq",
            "inLanguage": "${lang}",
            "mainEntity": [
${entities}
            ` + h.slice(faqEnd);

  // JavaScript'siz ko'rinadigan matn
  const ns = L.noscript;
  h = swap(h, '<h1>NANOTEX — ko‘chma yoqilg‘i quyish shoxobchalari (AYoQSh)</h1>', `<h1>${ns.h1}</h1>`);
  h = swap(h, '<p>NANOTEX 50 tonnagacha ko‘chma yoqilg‘i quyish shoxobchalarini ishlab chiqaradi: shaharlar, avtomobil yo‘llari va korxonalar uchun. Telefon:', `<p>${ns.p}`);
  h = swap(h, '<p>Saytdan to‘liq foydalanish uchun brauzeringizda JavaScript’ni yoqing.</p>', `<p>${ns.js}</p>`);

  JSON.parse(h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]); // JSON buzilmaganini tekshirish
  return swap(h, '<!doctype html>\n', `<!doctype html>\n<!-- Avtomatik yaratilgan: node tools/build-i18n.mjs. Qo'lda tahrirlamang, index.html ni o'zgartiring. -->\n`);
}

mkdirSync(join(ROOT, 'i18n'), { recursive: true });
for (const [lang, L] of Object.entries(LANGS)) {
  writeFileSync(join(ROOT, 'i18n', `${lang}.html`), build(lang, L));
  console.log(`i18n/${lang}.html tayyor`);
}

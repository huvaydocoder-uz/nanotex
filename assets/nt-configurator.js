// NANOTEX — ko'chma shoxobcha konstruktori.
// React bo'sh <section id="konstruktor"> chizadi, bu modul uni to'ldiradi.
// Vizual SVG'da chiziladi: o'lcham, sig'im, mahsulotlar soni, rang, brend, logotip va joylashuvga qarab o'zgaradi.

const TELEGRAM = 'kuchmaAZS';
const CAPACITIES = [5, 10, 15, 20, 30, 40, 50];
const FUELS = ['AI-92', 'AI-95', 'DT', 'AI-91', 'AI-80'];
const NOZZLE_COLORS = ['#e53935', '#1e88e5', '#2e7d32', '#f9a825', '#8d6e63'];
const COLORS = [
  { hex: '#ffc400', key: 'yellow' },
  { hex: '#e53935', key: 'red' },
  { hex: '#1e5bd8', key: 'blue' },
  { hex: '#1f9d55', key: 'green' },
  { hex: '#f57c00', key: 'orange' },
  { hex: '#23272b', key: 'black' },
];
const LOGO_MAX_BYTES = 3 * 1024 * 1024;

// Bajarilgan ishlardan eng yaqin namuna (images/work-XX)
function similarWork(cap, products) {
  if (cap <= 5) return 'work-17';
  if (cap <= 15) return 'work-18';
  if (cap <= 20) return 'work-16';
  if (cap <= 30) return products <= 2 ? 'work-16' : 'work-01';
  if (cap <= 40) return products >= 4 ? 'work-07' : 'work-08';
  return 'work-10';
}

const I18N = {
  uz: {
    eyebrow: 'Konstruktor',
    title: 'O‘zingizga mos shoxobchani yarating',
    lead: 'Ma’lumotlarni kiriting — shoxobchangizning taxminiy ko‘rinishi shu zahoti paydo bo‘ladi. Tayyor bo‘lgach, buyurtmani Telegram orqali yuboring.',
    room: 'Operator xonasi o‘lchamlari',
    roomLength: 'Uzunligi, m',
    roomWidth: 'Eni, m',
    capacity: 'Shoxobcha sig‘imi',
    tonnes: 't',
    tonnesLong: n => `${n} tonna`,
    products: 'Necha xil mahsulotga mo‘ljallangan',
    productsLong: n => `${n} xil mahsulot`,
    color: 'Asosiy rang',
    customColor: 'Boshqa rang',
    colorNames: { yellow: 'Sariq', red: 'Qizil', blue: 'Ko‘k', green: 'Yashil', orange: 'To‘q sariq', black: 'Qora' },
    brand: 'Brend nomi',
    brandPh: 'Masalan: NUR OIL',
    brandEmpty: 'BRENDINGIZ',
    logo: 'Brend logotipi',
    logoPick: 'Logotipni yuklang',
    logoHint: 'PNG, JPG yoki SVG, 3 MB gacha',
    logoRemove: 'Olib tashlash',
    logoTooBig: 'Fayl 3 MB dan katta. Kichikroq fayl tanlang.',
    logoBad: 'Bu fayl rasm emas. PNG, JPG yoki SVG tanlang.',
    location: 'Qayerda joylashadi',
    locations: { city: 'Shaharda', highway: 'Trassa bo‘yida', company: 'Korxona hududida' },
    visualTitle: 'Taxminiy ko‘rinish',
    visualNote: 'Vizualizatsiya taxminiy. Aniq loyiha maydon va texnik shartlarga qarab tayyorlanadi.',
    similar: 'Bajarilgan ishlarimizdan o‘xshash namuna',
    order: 'Buyurtma berish',
    orderIntro: '🔥 Assalomu alaykum, NANOTEX jamoasi!\n\nSaytdagi konstruktorda o‘zimga mos ko‘chma shoxobchani tanladim va uni buyurtma qilmoqchiman. 🚀',
    orderTitle: '⛽ Ko‘chma yoqilg‘i quyish shoxobchasi',
    oCapacity: 'Sig‘imi',
    oProducts: 'Mahsulot turlari',
    oRoom: 'Operator xonasi',
    oColor: 'Rang',
    oBrand: 'Brend',
    oLogo: 'Logotip',
    oLogoYes: 'bor — Telegram’da alohida yuboraman',
    oLogoNo: 'yo‘q',
    oBrandNo: 'kiritilmagan',
    oLocation: 'Joylashuv',
    orderOutro: 'Iltimos, narxi, tayyorlash va o‘rnatish muddatlari haqida ma’lumot bering. Javobingizni kutaman! 🤝',
    pcs: n => `${n} ta`,
    svgLabel: (cap, p, loc) => `Shoxobcha vizualizatsiyasi: ${cap} tonna, ${p} xil mahsulot, ${loc}`,
  },
  ru: {
    eyebrow: 'Конструктор',
    title: 'Соберите свою станцию',
    lead: 'Укажите параметры — сразу появится примерный вид вашей станции. Когда всё готово, отправьте заказ через Telegram.',
    room: 'Размеры помещения оператора',
    roomLength: 'Длина, м',
    roomWidth: 'Ширина, м',
    capacity: 'Ёмкость станции',
    tonnes: 'т',
    tonnesLong: n => `${n} тонн`,
    products: 'Сколько видов топлива',
    productsLong: n => `${n} ${n === 1 ? 'вид' : n < 5 ? 'вида' : 'видов'} топлива`,
    color: 'Основной цвет',
    customColor: 'Другой цвет',
    colorNames: { yellow: 'Жёлтый', red: 'Красный', blue: 'Синий', green: 'Зелёный', orange: 'Оранжевый', black: 'Чёрный' },
    brand: 'Название бренда',
    brandPh: 'Например: NUR OIL',
    brandEmpty: 'ВАШ БРЕНД',
    logo: 'Логотип бренда',
    logoPick: 'Загрузите логотип',
    logoHint: 'PNG, JPG или SVG, до 3 МБ',
    logoRemove: 'Удалить',
    logoTooBig: 'Файл больше 3 МБ. Выберите файл поменьше.',
    logoBad: 'Это не изображение. Выберите PNG, JPG или SVG.',
    location: 'Где будет установлена',
    locations: { city: 'В городе', highway: 'У трассы', company: 'На территории предприятия' },
    visualTitle: 'Примерный вид',
    visualNote: 'Визуализация примерная. Точный проект готовится с учётом участка и технических условий.',
    similar: 'Похожий пример из наших работ',
    order: 'Заказать',
    orderIntro: '🔥 Здравствуйте, команда NANOTEX!\n\nЯ подобрал мобильную станцию в конструкторе на сайте и хочу её заказать. 🚀',
    orderTitle: '⛽ Мобильная автозаправочная станция',
    oCapacity: 'Ёмкость',
    oProducts: 'Виды топлива',
    oRoom: 'Помещение оператора',
    oColor: 'Цвет',
    oBrand: 'Бренд',
    oLogo: 'Логотип',
    oLogoYes: 'есть — отправлю отдельно в Telegram',
    oLogoNo: 'нет',
    oBrandNo: 'не указан',
    oLocation: 'Размещение',
    orderOutro: 'Пожалуйста, сообщите цену, сроки изготовления и монтажа. Жду вашего ответа! 🤝',
    pcs: n => `${n}`,
    svgLabel: (cap, p, loc) => `Визуализация станции: ${cap} тонн, видов топлива: ${p}, ${loc}`,
  },
  en: {
    eyebrow: 'Configurator',
    title: 'Build your own station',
    lead: 'Enter the details and an approximate view of your station appears right away. When you are happy with it, send the order via Telegram.',
    room: 'Operator room size',
    roomLength: 'Length, m',
    roomWidth: 'Width, m',
    capacity: 'Station capacity',
    tonnes: 't',
    tonnesLong: n => `${n} tonnes`,
    products: 'Number of fuel types',
    productsLong: n => `${n} fuel type${n === 1 ? '' : 's'}`,
    color: 'Main colour',
    customColor: 'Other colour',
    colorNames: { yellow: 'Yellow', red: 'Red', blue: 'Blue', green: 'Green', orange: 'Orange', black: 'Black' },
    brand: 'Brand name',
    brandPh: 'For example: NUR OIL',
    brandEmpty: 'YOUR BRAND',
    logo: 'Brand logo',
    logoPick: 'Upload your logo',
    logoHint: 'PNG, JPG or SVG, up to 3 MB',
    logoRemove: 'Remove',
    logoTooBig: 'The file is larger than 3 MB. Choose a smaller one.',
    logoBad: 'This file is not an image. Choose PNG, JPG or SVG.',
    location: 'Where it will stand',
    locations: { city: 'In the city', highway: 'By the highway', company: 'On company premises' },
    visualTitle: 'Approximate view',
    visualNote: 'The visualization is approximate. The final design depends on the site and technical requirements.',
    similar: 'A similar station we have built',
    order: 'Place an order',
    orderIntro: '🔥 Hello, NANOTEX team!\n\nI configured a mobile station on your website and would like to order it. 🚀',
    orderTitle: '⛽ Mobile fuel station',
    oCapacity: 'Capacity',
    oProducts: 'Fuel types',
    oRoom: 'Operator room',
    oColor: 'Colour',
    oBrand: 'Brand',
    oLogo: 'Logo',
    oLogoYes: 'yes — I will send it separately in Telegram',
    oLogoNo: 'no',
    oBrandNo: 'not specified',
    oLocation: 'Location',
    orderOutro: 'Please let me know the price and the manufacturing and installation timelines. Looking forward to your reply! 🤝',
    pcs: n => `${n}`,
    svgLabel: (cap, p, loc) => `Station visualization: ${cap} tonnes, ${p} fuel types, ${loc}`,
  },
};

const state = {
  roomLength: 2.5,
  roomWidth: 2.4,
  capacity: 40,
  products: 3,
  color: '#ffc400',
  brand: '',
  logo: null,
  location: 'highway',
};

// ---------- yordamchilar ----------
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lang = () => (I18N[document.documentElement.lang] ? document.documentElement.lang : 'uz');
const fmtNum = (n, l) => (l === 'en' ? String(n) : String(n).replace('.', ','));

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const v = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  return [0, 2, 4].map(i => parseInt(v.slice(i, i + 2), 16));
}
const rgbToHex = rgb => '#' + rgb.map(v => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0')).join('');
const mix = (a, b, t) => rgbToHex(hexToRgb(a).map((v, i) => v + (hexToRgb(b)[i] - v) * t));
const shade = (hex, t) => (t < 0 ? mix(hex, '#000000', -t) : mix(hex, '#ffffff', t));
function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const onColor = hex => (luminance(hex) > 0.4 ? '#141414' : '#ffffff');

// Barqaror "tasodifiy" sonlar: manzara har safar bir xil chiziladi
function rng(seed) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

// ---------- manzaralar (1200 x 750) ----------
const W = 1200;
const H = 560;
const SH = 750; // manzara balandligi
const LIFT = 170; // manzara 750 balandlikda chizilgan, yuqori osmon qismi kesiladi
const GROUND = 612 - LIFT;
const PYLON_TOP = 100;
const PYLON_W = 88;
// Yo'ldan pastdagi old fon: trassada dala, shaharda yo'lak, korxonada hovli
const FLOOR = { city: '#d3cfc6', highway: '#d3c99a', company: '#cfccc3' };

function sky(loc) {
  const top = loc === 'company' ? '#8fb4d6' : '#7fb8e6';
  return `
    <linearGradient id="cfgSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${top}"/><stop offset="0.62" stop-color="#d7ebf7"/><stop offset="1" stop-color="#f2f4ee"/>
    </linearGradient>
    <radialGradient id="cfgSun" cx="0.82" cy="0.14" r="0.35">
      <stop offset="0" stop-color="#fff8dc" stop-opacity="0.95"/><stop offset="1" stop-color="#fff8dc" stop-opacity="0"/>
    </radialGradient>`;
}

function clouds(rand, vx, vy, vw, vh) {
  let out = '';
  for (let i = 0; i < 5; i++) {
    const x = vx + 40 + rand() * (vw - 80), y = vy + 30 + rand() * Math.max(40, vh * 0.2), s = (0.5 + rand() * 0.7) * Math.max(0.6, vw / 1200);
    out += `<g opacity="${0.55 + rand() * 0.3}" transform="translate(${x} ${y}) scale(${s})" fill="#fff">
      <ellipse cx="0" cy="0" rx="70" ry="20"/><ellipse cx="-30" cy="-12" rx="34" ry="22"/><ellipse cx="22" cy="-16" rx="40" ry="26"/></g>`;
  }
  return out;
}

function sceneCity() {
  const rand = rng(11);
  let far = '', near = '', windows = '';
  for (let x = -20; x < W; ) {
    const w = 50 + rand() * 70, h = 120 + rand() * 170;
    far += `<rect x="${x}" y="${470 - h}" width="${w}" height="${h + 2}" fill="#b4c4d4"/>`;
    x += w + 4;
  }
  for (let x = -10; x < W; ) {
    const w = 70 + rand() * 90, h = 70 + rand() * 120, y = 482 - h;
    near += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#93a6ba"/>`;
    for (let wy = y + 14; wy < 470; wy += 22) for (let wx = x + 10; wx < x + w - 14; wx += 18)
      if (rand() > 0.25) windows += `<rect x="${wx}" y="${wy}" width="9" height="11" fill="${rand() > 0.8 ? '#f7e8b0' : '#c9d7e4'}" opacity="0.85"/>`;
    x += w + 10;
  }
  let lamps = '', trees = '';
  for (const x of [70, 380, 820, 1130]) {
    lamps += `<g stroke="#4b5158" stroke-width="5" fill="none"><path d="M${x} 600 V430 q0 -18 22 -18 h20"/></g><rect x="${x + 34}" y="408" width="24" height="7" rx="3" fill="#4b5158"/><rect x="${x + 36}" y="414" width="20" height="4" fill="#fff3c4"/>`;
  }
  for (const [x, s] of [[200, 1], [980, 1.1], [1060, 0.85]]) {
    trees += `<g transform="translate(${x} 560) scale(${s})"><rect x="-5" y="0" width="10" height="44" fill="#6b5a45"/><circle cx="0" cy="-12" r="34" fill="#5f9b54"/><circle cx="-20" cy="2" r="22" fill="#6aa95d"/><circle cx="22" cy="0" r="24" fill="#558f4b"/></g>`;
  }
  return `
    ${far}${near}${windows}
    <rect x="0" y="470" width="${W}" height="100" fill="#d9d5cc"/>
    <rect x="0" y="566" width="${W}" height="8" fill="#bfbab0"/>
    ${trees}${lamps}
    <rect x="0" y="642" width="${W}" height="${SH - 642}" fill="#4d5156"/>
    <rect x="0" y="640" width="${W}" height="6" fill="#c9c4ba"/>
    <g fill="#f4f1e6">${Array.from({ length: 14 }, (_, i) => `<rect x="${i * 92 + 10}" y="702" width="52" height="6" rx="2"/>`).join('')}</g>`;
}

function sceneHighway() {
  const rand = rng(23);
  let poles = '';
  for (let i = 0; i < 6; i++) {
    const x = 40 + i * 230, h = 120 - i * 6;
    poles += `<rect x="${x}" y="${470 - h}" width="4" height="${h}" fill="#8a8f95"/><rect x="${x - 12}" y="${470 - h + 8}" width="28" height="3" fill="#8a8f95"/>`;
  }
  let grass = '';
  for (let i = 0; i < 60; i++) {
    const x = rand() * W, y = 480 + rand() * 120;
    grass += `<path d="M${x} ${y} l3 -9 l3 9" stroke="#a9a067" stroke-width="2" fill="none" opacity="0.7"/>`;
  }
  return `
    <path d="M0 470 L120 380 L230 430 L360 340 L520 450 L640 390 L760 440 L900 350 L1040 430 L1200 370 L1200 472 L0 472 Z" fill="#a8bccb"/>
    <path d="M0 472 L160 420 L300 458 L470 405 L640 462 L820 415 L1000 460 L1200 420 L1200 476 L0 476 Z" fill="#8ea6b5"/>
    <rect x="0" y="472" width="${W}" height="170" fill="#d6cc9e"/>
    <path d="M0 520 C300 505 700 535 1200 512 L1200 642 L0 642 Z" fill="#cdc292" opacity="0.7"/>
    ${grass}${poles}
    <rect x="0" y="642" width="${W}" height="${SH - 642}" fill="#4a4e53"/>
    <rect x="0" y="640" width="${W}" height="5" fill="#e9e5da"/>
    <g fill="#f5f2e8">${Array.from({ length: 12 }, (_, i) => `<rect x="${i * 108 + 20}" y="${SH - 40}" width="62" height="6" rx="2"/>`).join('')}</g>
    <rect x="0" y="${SH - 8}" width="${W}" height="4" fill="#f5f2e8"/>`;
}

function sceneCompany() {
  let ribs = '';
  for (let x = 60; x < 540; x += 14) ribs += `<rect x="${x}" y="318" width="3" height="152" fill="#b9bfc5"/>`;
  let ribs2 = '';
  for (let x = 770; x < 1160; x += 14) ribs2 += `<rect x="${x}" y="356" width="3" height="114" fill="#bcc3c9"/>`;
  let fence = '';
  for (let x = 0; x <= W; x += 60) fence += `<rect x="${x}" y="500" width="5" height="70" fill="#7c838a"/>`;
  return `
    <path d="M40 318 L290 262 L560 318 Z" fill="#9aa3ab"/>
    <rect x="40" y="318" width="520" height="154" fill="#cdd2d7"/>${ribs}
    <rect x="240" y="392" width="120" height="80" fill="#8d959c"/>
    <rect x="600" y="250" width="40" height="222" fill="#b7bdc2"/><rect x="596" y="244" width="48" height="10" fill="#9aa1a7"/>
    <rect x="660" y="300" width="56" height="172" rx="26" fill="#d4d8db"/><rect x="660" y="330" width="56" height="6" fill="#b2b8bd"/>
    <rect x="760" y="352" width="400" height="120" fill="#d3d8dc"/>${ribs2}
    <rect x="760" y="340" width="400" height="14" fill="#9aa3ab"/>
    <rect x="800" y="372" width="320" height="16" fill="#9fb6c8" opacity="0.8"/>
    <rect x="0" y="470" width="${W}" height="${SH - 470}" fill="#cfccc3"/>
    <g opacity="0.55" stroke="#8b9198" stroke-width="1.2">${Array.from({ length: 50 }, (_, i) => `<path d="M${i * 24} 504 l24 62 M${i * 24 + 24} 504 l-24 62"/>`).join('')}</g>
    ${fence}<rect x="0" y="500" width="${W}" height="4" fill="#7c838a"/><rect x="0" y="566" width="${W}" height="4" fill="#7c838a"/>
    <rect x="1010" y="520" width="150" height="52" fill="#2f6f9f"/><rect x="1010" y="520" width="150" height="6" fill="#255a82"/>
    <rect x="40" y="532" width="120" height="40" fill="#b24a36"/>
    <g fill="#e7c64a">${Array.from({ length: 8 }, (_, i) => `<rect x="${i * 160 + 30}" y="${SH - 60}" width="90" height="5"/>`).join('')}</g>`;
}

// ---------- shoxobcha (mahalliy koordinatalar: y=0 yer, yuqoriga manfiy) ----------
const S = 40; // 1 metr = 40 birlik

function prism(x, y, w, h, dv, front, top, side) {
  return `
    <polygon points="${x},${y} ${x + w},${y} ${x + w + dv.x},${y + dv.y} ${x + dv.x},${y + dv.y}" fill="${top}"/>
    <polygon points="${x + w},${y} ${x + w + dv.x},${y + dv.y} ${x + w + dv.x},${y + h + dv.y} ${x + w},${y + h}" fill="${side}"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${front}"/>`;
}

function logoMark(x, y, size, c) {
  // Logotip bo'lmasa: rangli doira ichida tomchi belgisi
  if (state.logo) {
    return `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="${size * 0.18}" fill="#ffffff"/>
      <image href="${state.logo}" x="${x + size * 0.08}" y="${y + size * 0.08}" width="${size * 0.84}" height="${size * 0.84}" preserveAspectRatio="xMidYMid meet"/>`;
  }
  const r = size / 2, cx = x + r, cy = y + r;
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff"/><circle cx="${cx}" cy="${cy}" r="${r * 0.84}" fill="${c}"/>
    <path d="M${cx} ${cy - r * 0.55} C${cx + r * 0.42} ${cy - r * 0.05} ${cx + r * 0.38} ${cy + r * 0.48} ${cx} ${cy + r * 0.5} C${cx - r * 0.38} ${cy + r * 0.48} ${cx - r * 0.42} ${cy - r * 0.05} ${cx} ${cy - r * 0.55} Z" fill="${onColor(c)}"/>`;
}

function brandBlock(x, y, w, h, c, textColor, t) {
  // Logotip + brend nomi berilgan to'rtburchakka sig'diriladi
  const name = (state.brand.trim() || t.brandEmpty).toUpperCase();
  const logoSize = Math.min(h * 0.9, w * 0.28);
  const gap = logoSize * 0.22;
  const textW = w - logoSize - gap;
  const fs = Math.min(h * 0.62, textW / Math.max(name.length * 0.62, 3.2));
  const total = logoSize + gap + Math.min(textW, name.length * fs * 0.62);
  const sx = x + (w - total) / 2;
  const empty = !state.brand.trim();
  return `${logoMark(sx, y + (h - logoSize) / 2, logoSize, c)}
    <text x="${sx + logoSize + gap}" y="${y + h / 2}" dominant-baseline="central" font-family="Saira, 'Barlow', Inter, sans-serif" font-weight="700" font-size="${fs}" fill="${textColor}" letter-spacing="${fs * 0.02}" opacity="${empty ? 0.55 : 1}">${esc(name)}</text>`;
}

function dispenser(x, n, startIdx, c) {
  const w = 0.78 * S, h = 1.9 * S;
  let nozzles = '';
  for (let i = 0; i < n; i++) {
    const nx = x + 0.1 * S + i * ((w - 0.2 * S) / Math.max(n, 1)) + 2;
    nozzles += `<rect x="${nx}" y="${-h * 0.5}" width="${0.13 * S}" height="${0.32 * S}" rx="2" fill="${NOZZLE_COLORS[(startIdx + i) % NOZZLE_COLORS.length]}"/>`;
  }
  return `
    <rect x="${x + 0.04 * S}" y="${-h}" width="${w}" height="${h}" fill="#d6d9dc"/>
    <rect x="${x}" y="${-h}" width="${w}" height="${h}" rx="3" fill="#f7f7f5"/>
    <rect x="${x + 0.08 * S}" y="${-h + 0.12 * S}" width="${w - 0.16 * S}" height="${0.62 * S}" rx="3" fill="#2b2f33"/>
    <rect x="${x + 0.14 * S}" y="${-h + 0.2 * S}" width="${w - 0.28 * S}" height="${0.18 * S}" fill="#9fd3e8"/>
    <rect x="${x + 0.14 * S}" y="${-h + 0.44 * S}" width="${w - 0.28 * S}" height="${0.18 * S}" fill="#9fd3e8"/>
    ${nozzles}
    <rect x="${x}" y="${-0.42 * S}" width="${w}" height="${0.14 * S}" fill="${c}"/>
    <path d="M${x + w} ${-h * 0.42} q${0.35 * S} ${0.5 * S} 0 ${0.95 * S}" stroke="#1d1f22" stroke-width="2.5" fill="none"/>
    <rect x="${x - 0.06 * S}" y="-3" width="${w + 0.12 * S}" height="6" fill="#9a9a96"/>`;
}

function fuelPlates(x, y, n, c, avail = 2.1 * S) {
  // Belgilar mavjud balandlikka sig'adi
  const ph = Math.min(0.4 * S, avail / (n * 1.25)), gap = ph * 0.25, pw = 1.05 * S;
  let out = '';
  for (let i = 0; i < n; i++) {
    const py = y + i * (ph + gap);
    out += `<rect x="${x}" y="${py}" width="${pw}" height="${ph}" rx="4" fill="#ffffff" stroke="${c}" stroke-width="2"/>
      <text x="${x + pw / 2}" y="${py + ph / 2}" dominant-baseline="central" text-anchor="middle" font-family="Saira, Inter, sans-serif" font-weight="700" font-size="${ph * 0.58}" fill="#1b1d20">${FUELS[i]}</text>`;
  }
  return out;
}

function roofSign(x, y, c, t, maxW) {
  const name = (state.brand.trim() || t.brandEmpty).toUpperCase();
  const fs = Math.min(0.95 * S, maxW / Math.max(name.length * 0.66 + 1.4, 3));
  const logo = fs * 1.15;
  const textW = name.length * fs * 0.66;
  return `
    <rect x="${x + logo * 0.4}" y="${y}" width="3" height="${0.34 * S}" fill="#6f747a"/>
    <rect x="${x + logo + textW * 0.85}" y="${y}" width="3" height="${0.34 * S}" fill="#6f747a"/>
    ${logoMark(x, y - logo * 0.82, logo, c)}
    <text x="${x + logo * 1.18}" y="${y}" font-family="Saira, 'Barlow', Inter, sans-serif" font-weight="800" font-size="${fs}" fill="${c}" stroke="#ffffff" stroke-width="${fs * 0.08}" paint-order="stroke fill" opacity="${state.brand.trim() ? 1 : 0.6}">${esc(name)}</text>`;
}

// Konteyner tipidagi shoxobcha (15 tonna va undan katta)
function containerStation(t) {
  const c = state.color, cDark = shade(c, -0.28), cLight = shade(c, 0.25);
  const D = clamp(state.roomWidth, 1.5, 6) * S * 0.55;
  const dv = { x: D * 0.7, y: -D * 0.42 };
  const Hb = 3.1 * S, roofT = 0.42 * S;
  const n = state.products;
  const Cz = (n <= 2 ? 2.8 : 3.8) * S;
  const Lr = clamp(state.roomLength, 1.5, 6) * S;
  const bodyM = { 15: 6, 20: 7.4, 30: 9.4, 40: 11.6, 50: 13.4 }[state.capacity] || 9;
  const Lb = bodyM * S;
  const L = Cz + Lr + Lb;
  const xr = Cz, xb = Cz + Lr;
  const wall = '#eceeee', wallSide = '#c9cdd0', panel = '#30353b';

  let out = '';
  // maydon va soya
  out += `<polygon points="${-0.9 * S},${0.18 * S} ${L + 0.9 * S},${0.18 * S} ${L + 0.9 * S + dv.x * 1.6},${dv.y * 1.6} ${-0.9 * S + dv.x * 1.6},${dv.y * 1.6}" fill="#d8d6cf"/>
    <polygon points="${-0.9 * S},${0.18 * S} ${L + 0.9 * S},${0.18 * S} ${L + 0.9 * S},${0.3 * S} ${-0.9 * S},${0.3 * S}" fill="#b9b6ad"/>
    <polygon points="${L},0 ${L + dv.x},${dv.y} ${L + dv.x + 1.4 * S},${dv.y + 0.1 * S} ${L + 1.4 * S},${0.12 * S}" fill="#000" opacity="0.12"/>`;
  // ochiq kanop ichi: orqa devor va pol
  out += `<polygon points="0,0 ${Cz},0 ${Cz + dv.x},${dv.y} ${dv.x},${dv.y}" fill="#c4c2bb"/>
    <rect x="${dv.x}" y="${-Hb + dv.y}" width="${Cz}" height="${Hb}" fill="#7d838a"/>
    <rect x="${dv.x}" y="${-Hb + dv.y}" width="${Cz}" height="${0.5 * S}" fill="#000" opacity="0.18"/>`;
  // orqa ustunlar
  out += `<rect x="${dv.x + 0.12 * S}" y="${-Hb + dv.y}" width="${0.2 * S}" height="${Hb}" fill="#5c6268"/>`;
  // dispenserlar
  const nD = n <= 2 ? 1 : 2;
  const per = Math.ceil(n / nD);
  for (let i = 0; i < nD; i++) {
    const dx = Cz / (nD + 1) * (i + 1) - 0.39 * S + dv.x * 0.45;
    out += `<g transform="translate(0 ${dv.y * 0.45})">${dispenser(dx, Math.min(per, n - i * per), i * per, c)}</g>`;
  }
  // operator xonasi: oyna va eshik
  out += prism(xr, -Hb, Lr, Hb, dv, '#3d434a', '#3d434a', '#2c3136');
  const doorW = Math.min(0.95 * S, Lr * 0.42);
  out += `<rect x="${xr + 0.12 * S}" y="${-Hb + 0.2 * S}" width="${doorW}" height="${Hb - 0.2 * S}" fill="url(#cfgGlass)" stroke="#555c63" stroke-width="3"/>
    <rect x="${xr + 0.12 * S + doorW - 0.18 * S}" y="${-Hb * 0.52}" width="${0.06 * S}" height="${0.5 * S}" fill="#c9ced3"/>
    <rect x="${xr + 0.24 * S + doorW}" y="${-Hb + 0.2 * S}" width="${Lr - doorW - 0.36 * S}" height="${Hb * 0.62}" fill="url(#cfgGlass)" stroke="#555c63" stroke-width="3"/>
    <path d="M${xr + 0.3 * S + doorW} ${-Hb + 0.3 * S} l${0.5 * S} 0 l${-0.9 * S} ${1.4 * S} l${-0.3 * S} 0 Z" fill="#fff" opacity="0.12"/>`;
  // asosiy korpus
  out += prism(xb, -Hb, Lb, Hb, dv, wall, wall, wallSide);
  const pad = 0.28 * S;
  out += `<rect x="${xb + pad}" y="${-Hb + pad}" width="${Lb - pad * 2}" height="${Hb - pad * 2}" fill="${c}"/>
    <rect x="${xb + pad + 0.12 * S}" y="${-Hb + pad + 0.12 * S}" width="${Lb - pad * 2 - 0.24 * S}" height="${Hb - pad * 2 - 0.24 * S}" fill="${panel}"/>`;
  // yonilg'i belgilari va brend
  const plateX = xb + 1.5 * S;
  out += fuelPlates(plateX, -Hb + pad + 0.3 * S, n, c, Hb - pad * 2 - 0.55 * S);
  const bx = plateX + 1.35 * S, bw = xb + Lb - pad - 0.4 * S - bx;
  out += brandBlock(bx, -Hb * 0.72, bw, Hb * 0.36, c, '#ffffff', t);
  out += `<path d="M${bx} ${-Hb * 0.26} H${xb + Lb - pad - 0.4 * S}" stroke="${c}" stroke-width="3" opacity="0.8"/>`;
  // diagonal aksent (xona va korpus chegarasida)
  out += `<polygon points="${xb - 0.55 * S},${-Hb} ${xb + 0.35 * S},${-Hb} ${xb + 1.05 * S},0 ${xb + 0.15 * S},0" fill="${c}"/>
    <polygon points="${xb + 0.35 * S},${-Hb} ${xb + 0.6 * S},${-Hb} ${xb + 1.3 * S},0 ${xb + 1.05 * S},0" fill="${cDark}"/>`;
  // yon tomondagi chiziq
  out += `<polygon points="${L},${-Hb * 0.5} ${L + dv.x},${-Hb * 0.5 + dv.y} ${L + dv.x},${-Hb * 0.38 + dv.y} ${L},${-Hb * 0.38}" fill="${cDark}"/>`;
  // tom va peshtoq
  out += prism(-0.25 * S, -Hb - roofT, L + 0.25 * S, roofT, dv, c, '#d9dcdf', cDark);
  out += `<rect x="${-0.25 * S}" y="${-Hb - roofT * 0.35}" width="${L + 0.25 * S}" height="${roofT * 0.12}" fill="${cLight}" opacity="0.8"/>`;
  // old ustunlar
  out += `<rect x="${0.05 * S}" y="${-Hb}" width="${0.22 * S}" height="${Hb}" fill="#4a5056"/>
    <rect x="${0.05 * S}" y="${-Hb}" width="${0.07 * S}" height="${Hb}" fill="#6a7077"/>`;
  // poydevor
  out += `<rect x="${xr}" y="${-0.2 * S}" width="${Lr + Lb}" height="${0.2 * S}" fill="#2a2e33"/>`;
  // tomdagi yozuv
  out += roofSign(0.15 * S, -Hb - roofT - 0.3 * S, c, t, Cz + Lr + Lb * 0.35);
  return { svg: out, width: L + dv.x + 1.4 * S, left: -0.9 * S, top: -Hb - roofT - 2.3 * S };
}

// Kichik shoxobcha: 5–10 tonna, korxonalar uchun
function miniStation(t) {
  const c = state.color, cDark = shade(c, -0.28);
  const D = clamp(state.roomWidth, 1.5, 6) * S * 0.45;
  const dv = { x: D * 0.7, y: -D * 0.42 };
  const Hk = 2.7 * S, K = 2.3 * S;
  const Lr = clamp(state.roomLength, 1.5, 4) * S;
  const tankL = (state.capacity === 5 ? 3.8 : 5.4) * S;
  const tankD = (state.capacity === 5 ? 1.75 : 2.25) * S;
  const n = state.products;
  const tx = K + Lr + 0.5 * S;
  let out = '';
  out += `<polygon points="${-0.6 * S},${0.16 * S} ${tx + tankL + 0.8 * S},${0.16 * S} ${tx + tankL + 0.8 * S + dv.x * 1.5},${dv.y * 1.5} ${-0.6 * S + dv.x * 1.5},${dv.y * 1.5}" fill="#d8d6cf"/>
    <rect x="${-0.6 * S}" y="${0.16 * S}" width="${tx + tankL + 1.4 * S}" height="${0.12 * S}" fill="#b9b6ad"/>`;
  // rezervuar (orqada, o'ng tomonda)
  const ty = -tankD - 0.45 * S + dv.y * 0.5;
  out += `<polygon points="${tx + 0.5 * S},${dv.y * 0.5} ${tx + 1.1 * S},${dv.y * 0.5} ${tx + 1.0 * S},${ty + tankD} ${tx + 0.6 * S},${ty + tankD}" fill="#9aa0a6"/>
    <polygon points="${tx + tankL - 1.1 * S},${dv.y * 0.5} ${tx + tankL - 0.5 * S},${dv.y * 0.5} ${tx + tankL - 0.6 * S},${ty + tankD} ${tx + tankL - 1.0 * S},${ty + tankD}" fill="#9aa0a6"/>
    <rect x="${tx}" y="${ty}" width="${tankL}" height="${tankD}" rx="${tankD * 0.18}" fill="url(#cfgTank)"/>
    <ellipse cx="${tx + tankL}" cy="${ty + tankD / 2}" rx="${tankD * 0.22}" ry="${tankD / 2}" fill="#dfe2e4"/>
    <rect x="${tx + tankL * 0.18}" y="${ty - 0.35 * S}" width="${0.5 * S}" height="${0.38 * S}" fill="#c3c7cb"/>
    <rect x="${tx + tankL * 0.55}" y="${ty - 0.6 * S}" width="${0.12 * S}" height="${0.62 * S}" fill="#9aa0a6"/>`;
  out += brandBlock(tx + tankL * 0.12, ty + tankD * 0.22, tankL * 0.76, tankD * 0.3, c, cDark, t);
  out += `<text x="${tx + tankL / 2}" y="${ty + tankD * 0.74}" text-anchor="middle" font-family="Inter, sans-serif" font-weight="700" font-size="${0.3 * S}" fill="#d43b33">ОГНЕОПАСНО</text>`;
  // kanop: oq ramka, ichida dispenser
  out += `<polygon points="0,0 ${K},0 ${K + dv.x},${dv.y} ${dv.x},${dv.y}" fill="#c4c2bb"/>
    <rect x="${dv.x}" y="${-Hk + dv.y}" width="${K}" height="${Hk}" fill="#8b9197"/>`;
  out += `<g transform="translate(${K / 2 - 0.39 * S + dv.x * 0.4} ${dv.y * 0.4})">${dispenser(0, n, 0, c)}</g>`;
  out += `<path d="M${0.22 * S} 0 V${-Hk + 0.7 * S} Q${0.22 * S} ${-Hk + 0.22 * S} ${0.7 * S} ${-Hk + 0.22 * S} H${K}" stroke="#f4f4f2" stroke-width="${0.32 * S}" fill="none"/>
    <path d="M${0.06 * S} 0 V${-Hk + 0.7 * S} Q${0.06 * S} ${-Hk + 0.06 * S} ${0.7 * S} ${-Hk + 0.06 * S} H${K}" stroke="#d9dbdc" stroke-width="2" fill="none"/>`;
  // operator kabinasi
  out += prism(K, -Hk, Lr, Hk, dv, '#62676d', '#e9ebec', '#4c5156');
  out += `<rect x="${K + 0.16 * S}" y="${-Hk + 0.35 * S}" width="${0.85 * S}" height="${Hk - 0.35 * S}" fill="#575c62" stroke="#3f4448" stroke-width="2"/>
    <rect x="${K + Lr - 0.95 * S}" y="${-Hk + 0.5 * S}" width="${0.75 * S}" height="${0.5 * S}" fill="url(#cfgGlass)"/>
    <rect x="${K}" y="${-Hk}" width="${Lr}" height="${0.22 * S}" fill="${c}"/>`;
  out += fuelPlates(K + Lr - 1.15 * S, -Hk + 1.2 * S, n, c, Hk - 1.45 * S);
  // tom
  out += prism(-0.1 * S, -Hk - 0.3 * S, K + Lr + 0.1 * S, 0.3 * S, dv, '#f4f4f2', '#dfe1e2', '#c3c6c8');
  out += `<rect x="${-0.1 * S}" y="${-Hk - 0.12 * S}" width="${K + Lr + 0.1 * S}" height="${0.08 * S}" fill="${c}"/>`;
  out += roofSign(0.1 * S, -Hk - 0.45 * S, c, t, (K + Lr) * 1.05);
  return { svg: out, width: tx + tankL + dv.x + 0.8 * S, left: -0.6 * S, top: -Hk - 2.2 * S };
}

function pylon(c, x) {
  // Narx ustuni: shahar va trassada
  const n = state.products, top = PYLON_TOP, w = PYLON_W, rowH = 28;
  const h = 96 + n * rowH;
  let rows = '';
  for (let i = 0; i < n; i++) {
    rows += `<rect x="${x + 8}" y="${top + 86 + i * rowH}" width="${w - 16}" height="${rowH - 6}" rx="3" fill="#1e2226"/>
      <text x="${x + 14}" y="${top + 86 + i * rowH + (rowH - 6) / 2}" dominant-baseline="central" font-family="Saira, Inter, sans-serif" font-weight="700" font-size="12" fill="#ffffff">${FUELS[i]}</text>
      <text x="${x + w - 14}" y="${top + 86 + i * rowH + (rowH - 6) / 2}" dominant-baseline="central" text-anchor="end" font-family="Saira, Inter, sans-serif" font-weight="700" font-size="12" fill="#ff5a4f">— —</text>`;
  }
  return `<rect x="${x + w / 2 - 7}" y="${top + h}" width="14" height="${GROUND - top - h + 4}" fill="#5d636a"/>
    <rect x="${x + 4}" y="${top + 4}" width="${w}" height="${h}" rx="8" fill="#000" opacity="0.15"/>
    <rect x="${x}" y="${top}" width="${w}" height="${h}" rx="8" fill="#ffffff"/>
    <rect x="${x}" y="${top}" width="${w}" height="76" rx="8" fill="${c}"/>
    ${logoMark(x + w / 2 - 26, top + 12, 52, c)}
    ${rows}`;
}

function buildSvg(t, aspect) {
  const loc = state.location;
  const st = state.capacity <= 10 ? miniStation(t) : containerStation(t);
  const showPylon = loc !== 'company';
  const maxW = showPylon ? 940 : 1060;
  const sc = Math.min(1.45, maxW / (st.width - st.left), 300 / -st.top);
  const left = (showPylon ? 560 : 600) - ((st.width + st.left) / 2) * sc;
  const stL = left + st.left * sc, stR = left + st.width * sc, stT = GROUND + st.top * sc;
  const pylonX = Math.min(stR + 40, W - PYLON_W - 12);

  // Kadr: shoxobcha va narx ustuni to'liq ko'rinadi, qolgan joy osmon va yer bilan to'ladi
  const x0 = stL - 30, x1 = (showPylon ? pylonX + PYLON_W : stR) + 30;
  const y0 = Math.min(stT, showPylon ? PYLON_TOP : stT) - 30, y1 = GROUND + 105;
  const cw = x1 - x0, ch = y1 - y0;
  let vx, vy, vw, vh;
  if (cw / ch > aspect) { vw = cw; vh = cw / aspect; vx = x0; vy = y0 - (vh - ch) * 0.6; }
  else { vh = ch; vw = ch * aspect; vx = x0 - (vw - cw) / 2; vy = y0; }
  if (vw > W) { vw = W; vh = W / aspect; vx = 0; vy = Math.min(vy, y1 - vh); }
  vx = clamp(vx, 0, W - vw);

  const scene = loc === 'city' ? sceneCity() : loc === 'company' ? sceneCompany() : sceneHighway();
  const label = t.svgLabel(state.capacity, state.products, t.locations[loc]);
  const floorTop = SH - LIFT;
  const f = n => Math.round(n * 10) / 10;
  return `<svg viewBox="${f(vx)} ${f(vy)} ${f(vw)} ${f(vh)}" role="img" aria-label="${esc(label)}" xmlns="http://www.w3.org/2000/svg" class="nt-cfg-svg">
    <defs>${sky(loc)}
      <linearGradient id="cfgGlass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5d7184"/><stop offset="0.5" stop-color="#26313b"/><stop offset="1" stop-color="#1a2128"/></linearGradient>
      <linearGradient id="cfgTank" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="0.45" stop-color="#eef0f1"/><stop offset="1" stop-color="#b9bec3"/></linearGradient></defs>
    <rect x="${f(vx)}" y="${f(vy)}" width="${f(vw)}" height="${f(Math.max(vh, GROUND - vy))}" fill="url(#cfgSky)"/>
    <rect x="${f(vx)}" y="${f(vy)}" width="${f(vw)}" height="${f(vh)}" fill="url(#cfgSun)"/>
    ${clouds(rng(7), vx, vy, vw, vh)}
    <g transform="translate(0 -${LIFT})">${scene}</g>
    <rect x="0" y="${floorTop}" width="${W}" height="${f(Math.max(0, vy + vh - floorTop) + 2)}" fill="${FLOOR[loc]}"/>
    ${loc === 'company' ? '' : `<rect x="0" y="${floorTop}" width="${W}" height="7" fill="#bdb8ad"/>`}
    ${showPylon ? pylon(state.color, pylonX) : ''}
    <g class="nt-cfg-station" transform="translate(${f(left)} ${GROUND}) scale(${sc})">${st.svg}</g>
  </svg>`;
}

// ---------- forma ----------
function chip(name, value, label, active, extra = '') {
  return `<button type="button" class="nt-cfg-chip" data-${name}="${value}" aria-pressed="${active}" ${extra}>${label}</button>`;
}

const ICONS = {
  city: '<path d="M3 21V9l5-3v15M8 21V4h8v17M16 21v-9h5v9M2 21h20M11 8h2M11 12h2M11 16h2"/>',
  highway: '<path d="M4 21 9 3M20 21 15 3M12 5v2M12 11v2M12 17v2"/>',
  company: '<path d="M2 21V10l6 3V10l6 3V6h4l2 15H2zM2 21h20"/>',
  upload: '<path d="M12 16V4M7 9l5-5 5 5M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
};
const icon = (k, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[k]}</svg>`;

function render(section) {
  const l = lang(), t = I18N[l];
  section.innerHTML = `
  <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl">
      <p class="mb-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-brand"><span aria-hidden="true" class="h-px w-8 bg-brand"></span>${t.eyebrow}</p>
      <h2 id="cfg-title" class="font-display text-[2rem] leading-[1.08] font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]">${t.title}</h2>
      <p class="mt-5 text-lg leading-relaxed text-pretty sm:text-xl text-white/70">${t.lead}</p>
    </div>
    <div class="nt-cfg-grid">
      <form class="nt-glow nt-works-card nt-cfg-form" novalidate>
        <fieldset class="nt-cfg-field">
          <legend>${t.room}</legend>
          <div class="nt-cfg-dims">
            <label><span>${t.roomLength}</span><input type="number" name="roomLength" inputmode="decimal" min="1.5" max="6" step="0.1" value="${state.roomLength}"></label>
            <span class="nt-cfg-times" aria-hidden="true">×</span>
            <label><span>${t.roomWidth}</span><input type="number" name="roomWidth" inputmode="decimal" min="1.5" max="6" step="0.1" value="${state.roomWidth}"></label>
          </div>
        </fieldset>
        <fieldset class="nt-cfg-field">
          <legend>${t.capacity}</legend>
          <div class="nt-cfg-chips">${CAPACITIES.map(v => chip('capacity', v, `${v} ${t.tonnes}`, state.capacity === v)).join('')}</div>
        </fieldset>
        <fieldset class="nt-cfg-field">
          <legend>${t.products}</legend>
          <div class="nt-cfg-chips">${[1, 2, 3, 4, 5].map(v => chip('products', v, String(v), state.products === v, `aria-label="${esc(t.productsLong(v))}"`)).join('')}</div>
          <p class="nt-cfg-hint" data-fuels>${FUELS.slice(0, state.products).join(' · ')}</p>
        </fieldset>
        <fieldset class="nt-cfg-field">
          <legend>${t.color}</legend>
          <div class="nt-cfg-swatches">
            ${COLORS.map(cl => `<button type="button" class="nt-cfg-swatch" data-color="${cl.hex}" style="--sw:${cl.hex}" aria-pressed="${state.color === cl.hex}" aria-label="${t.colorNames[cl.key]}" title="${t.colorNames[cl.key]}"></button>`).join('')}
            <label class="nt-cfg-swatch nt-cfg-custom" title="${t.customColor}"><span class="sr-only">${t.customColor}</span><input type="color" name="customColor" value="${state.color}"></label>
          </div>
        </fieldset>
        <fieldset class="nt-cfg-field">
          <legend>${t.brand}</legend>
          <input type="text" name="brand" maxlength="22" autocomplete="organization" placeholder="${esc(t.brandPh)}" value="${esc(state.brand)}" aria-label="${esc(t.brand)}">
        </fieldset>
        <fieldset class="nt-cfg-field">
          <legend>${t.logo}</legend>
          <div class="nt-cfg-logo">
            <label class="nt-cfg-drop">
              <input type="file" name="logo" accept="image/png,image/jpeg,image/svg+xml,image/webp" class="sr-only">
              <span class="nt-cfg-drop-preview" data-preview>${state.logo ? `<img src="${state.logo}" alt="">` : icon('upload', 'nt-cfg-ico')}</span>
              <span><strong>${t.logoPick}</strong><small>${t.logoHint}</small></span>
            </label>
            <button type="button" class="nt-cfg-remove" data-remove-logo ${state.logo ? '' : 'hidden'}>${t.logoRemove}</button>
          </div>
          <p class="nt-cfg-error" data-logo-error role="alert"></p>
        </fieldset>
        <fieldset class="nt-cfg-field">
          <legend>${t.location}</legend>
          <div class="nt-cfg-places">
            ${Object.entries(t.locations).map(([k, v]) => `<button type="button" class="nt-cfg-place" data-location="${k}" aria-pressed="${state.location === k}">${icon(k, 'nt-cfg-ico')}<span>${v}</span></button>`).join('')}
          </div>
        </fieldset>
      </form>
      <div class="nt-cfg-side">
        <div class="nt-glow nt-works-card nt-cfg-card">
          <div class="nt-cfg-visual" data-visual></div>
          <div class="nt-cfg-card-body">
            <p class="nt-cfg-summary" data-summary aria-live="polite"></p>
            <button type="button" class="nt-cfg-order" data-order>${icon('send', 'nt-cfg-ico')}<span>${t.order}</span></button>
            <p class="nt-cfg-note">${t.visualNote}</p>
          </div>
        </div>
        <a class="nt-cfg-similar" href="#ishlarimiz" data-similar>
          <img alt="" width="96" height="72" loading="lazy">
          <span><small>${t.similar}</small><strong data-similar-label></strong></span>
        </a>
      </div>
    </div>
  </div>`;
  bind(section);
  update(section, true);
  // Karta o'lchami o'zgarsa (oyna, forma balandligi) kadr qayta hisoblanadi
  const visual = section.querySelector('[data-visual]');
  let raf = 0;
  new ResizeObserver(() => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const b = visual.getBoundingClientRect();
      if (visual.dataset.size !== `${Math.round(b.width)}x${Math.round(b.height)}`) update(section, false);
    });
  }).observe(visual);
}

function update(section, swap) {
  const t = I18N[lang()];
  const visual = section.querySelector('[data-visual]');
  const box = visual.getBoundingClientRect();
  const aspect = box.width > 0 && box.height > 0 ? box.width / box.height : W / H;
  visual.innerHTML = buildSvg(t, aspect);
  visual.dataset.size = `${Math.round(box.width)}x${Math.round(box.height)}`;
  if (swap && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const g = visual.querySelector('.nt-cfg-station');
    g?.classList.add('is-swapping');
  }
  const room = `${fmtNum(state.roomLength, lang())} × ${fmtNum(state.roomWidth, lang())} m`;
  section.querySelector('[data-summary]').textContent =
    `${t.tonnesLong(state.capacity)} · ${t.productsLong(state.products)} · ${room} · ${t.locations[state.location]}`;
  section.querySelector('[data-fuels]').textContent = FUELS.slice(0, state.products).join(' · ');
  const work = similarWork(state.capacity, state.products);
  const sim = section.querySelector('[data-similar] img');
  sim.src = `/images/${work}-800.webp`;
  section.querySelector('[data-similar]').dataset.work = work;
  section.querySelector('[data-similar-label]').textContent = `${t.tonnesLong(state.capacity)} · ${t.productsLong(state.products)}`;
}

function setPressed(section, name, value) {
  section.querySelectorAll(`[data-${name}]`).forEach(b => b.setAttribute('aria-pressed', String(b.dataset[name] === String(value))));
}

function colorName(t) {
  const preset = COLORS.find(c => c.hex === state.color);
  return preset ? `${t.colorNames[preset.key]} (${state.color.toUpperCase()})` : state.color.toUpperCase();
}

function orderText() {
  const l = lang(), t = I18N[l];
  return [
    t.orderIntro,
    '',
    t.orderTitle,
    `🛢 ${t.oCapacity}: ${t.tonnesLong(state.capacity)}`,
    `🔢 ${t.oProducts}: ${t.pcs(state.products)} (${FUELS.slice(0, state.products).join(', ')})`,
    `🏠 ${t.oRoom}: ${fmtNum(state.roomLength, l)} × ${fmtNum(state.roomWidth, l)} m`,
    `🎨 ${t.oColor}: ${colorName(t)}`,
    `🏷 ${t.oBrand}: ${state.brand.trim() || t.oBrandNo}`,
    `🖼 ${t.oLogo}: ${state.logo ? t.oLogoYes : t.oLogoNo}`,
    `📍 ${t.oLocation}: ${t.locations[state.location]}`,
    '',
    t.orderOutro,
  ].join('\n');
}

function bind(section) {
  const form = section.querySelector('form');
  form.addEventListener('submit', e => e.preventDefault());

  for (const name of ['roomLength', 'roomWidth']) {
    const input = form.elements[name];
    input.addEventListener('input', () => {
      const v = parseFloat(input.value.replace(',', '.'));
      if (!Number.isFinite(v)) return;
      state[name] = Math.round(clamp(v, 1.5, 6) * 10) / 10;
      update(section, false);
    });
    input.addEventListener('change', () => { input.value = state[name]; });
  }

  section.querySelectorAll('[data-capacity]').forEach(b => b.addEventListener('click', () => {
    state.capacity = Number(b.dataset.capacity);
    setPressed(section, 'capacity', state.capacity);
    update(section, true);
  }));
  section.querySelectorAll('[data-products]').forEach(b => b.addEventListener('click', () => {
    state.products = Number(b.dataset.products);
    setPressed(section, 'products', state.products);
    update(section, true);
  }));
  section.querySelectorAll('[data-location]').forEach(b => b.addEventListener('click', () => {
    state.location = b.dataset.location;
    setPressed(section, 'location', state.location);
    update(section, true);
  }));
  section.querySelectorAll('[data-color]').forEach(b => b.addEventListener('click', () => {
    state.color = b.dataset.color;
    setPressed(section, 'color', state.color);
    form.elements.customColor.value = state.color;
    update(section, false);
  }));
  form.elements.customColor.addEventListener('input', e => {
    state.color = e.target.value.toLowerCase();
    setPressed(section, 'color', state.color);
    update(section, false);
  });
  form.elements.brand.addEventListener('input', e => {
    state.brand = e.target.value;
    update(section, false);
  });

  const t = I18N[lang()];
  const err = section.querySelector('[data-logo-error]');
  const removeBtn = section.querySelector('[data-remove-logo]');
  const preview = section.querySelector('[data-preview]');
  form.elements.logo.addEventListener('change', e => {
    const file = e.target.files?.[0];
    err.textContent = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) { err.textContent = t.logoBad; e.target.value = ''; return; }
    if (file.size > LOGO_MAX_BYTES) { err.textContent = t.logoTooBig; e.target.value = ''; return; }
    const reader = new FileReader();
    reader.onload = () => {
      state.logo = reader.result;
      preview.innerHTML = `<img src="${state.logo}" alt="">`;
      removeBtn.hidden = false;
      update(section, false);
    };
    reader.readAsDataURL(file);
  });
  removeBtn.addEventListener('click', () => {
    state.logo = null;
    form.elements.logo.value = '';
    preview.innerHTML = icon('upload', 'nt-cfg-ico');
    removeBtn.hidden = true;
    update(section, false);
  });

  section.querySelector('[data-order]').addEventListener('click', () => {
    window.open(`https://t.me/${TELEGRAM}?text=${encodeURIComponent(orderText())}`, '_blank', 'noopener');
  });

  // O'xshash namuna: Loyihalarimiz karuselida aynan shu surat ochiladi
  section.querySelector('[data-similar]').addEventListener('click', e => {
    const work = e.currentTarget.dataset.work;
    const card = document.querySelector('#ishlarimiz .nt-works-card');
    const thumb = [...document.querySelectorAll('#ishlarimiz .nt-works-thumbs button')]
      .find(b => b.querySelector('img')?.getAttribute('src')?.includes(`/${work}-`));
    if (!card || !thumb) return; // karusel topilmasa oddiy havola ishlaydi
    e.preventDefault();
    const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    card.scrollIntoView({ block: 'center', behavior: smooth ? 'smooth' : 'instant' });
    thumb.click();
    history.replaceState(null, '', '#ishlarimiz');
  });
}

// ---------- ulash ----------
function mount() {
  const section = document.getElementById('konstruktor');
  if (!section || section.dataset.ready) return !!section;
  section.dataset.ready = '1';
  render(section);
  new MutationObserver(() => render(section)).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  return true;
}

if (!mount()) {
  const obs = new MutationObserver(() => { if (mount()) obs.disconnect(); });
  obs.observe(document.getElementById('root') || document.body, { childList: true, subtree: true });
}

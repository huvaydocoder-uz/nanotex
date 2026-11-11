// NANOTEX — ko'chma shoxobcha konstruktori.
// React bo'sh <section id="konstruktor"> chizadi, bu modul uni to'ldiradi.
// Vizual SVG'da chiziladi: o'lcham, sig'im, mahsulotlar soni, rang, brend, logotip va joylashuvga qarab o'zgaradi.

const TELEGRAM = 'kuchmaAZS';
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
// Old panel (yonilg'i belgilari va brend turgan yuz qismi) ranglari
const PANELS = [
  { hex: '#30353b', key: 'black' },
  { hex: '#f4f4f2', key: 'white' },
  { hex: '#8a9097', key: 'grey' },
  { hex: '#1f3a5f', key: 'navy' },
  { hex: '#5a3e2b', key: 'brown' },
];
const LOGO_MAX_BYTES = 3 * 1024 * 1024;
// Operator xonasi o'lchami, metrda: uzunligi 0–3,5 m, eni 0–2,5 m
const ROOM_MIN = 0;
const ROOM_MAX = { roomLength: 3.5, roomWidth: 2.5 };
// Vizualizatsiyada juda kichik qiymatda shakl buzilmasligi uchun eng kichik chizma o'lchami
const ROOM_DRAW_MIN = 1;
// Sig'im, tonnada: 50 tonnadan katta shoxobchalar ishlab chiqarilmaydi
const CAP_MIN = 1;
const CAP_MAX = 50;

// Ruscha ko'plik: 1 тонна, 2 тонны, 5 тонн
const ruPlural = (n, one, few, many) => {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
};

// Telefon: faqat raqamlar; 9 xonali mahalliy raqamga +998 qo'shiladi
function normalizePhone(v) {
  let d = String(v).replace(/\D/g, '');
  if (d.length === 9) d = '998' + d;
  if (d.length < 9 || d.length > 15) return null;
  if (d.length === 12 && d.startsWith('998')) {
    return `+998 ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}`;
  }
  return '+' + d;
}

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
    roomHint: 'Uzunligi 0 dan 3,5 m gacha, eni 0 dan 2,5 m gacha',
    roomMax: { roomLength: 'Uzunligi ko‘pi bilan 3,5 m bo‘lishi mumkin.', roomWidth: 'Eni ko‘pi bilan 2,5 m bo‘lishi mumkin.' },
    capacity: 'Shoxobcha sig‘imi',
    capacityCustom: 'Sig‘imni kiriting',
    capacityUnit: 'tonna',
    capacityHint: 'Sig‘im tonnalarda kiritiladi, eng ko‘pi 50 tonna. Bundan katta sig‘imli shoxobchalar ishlab chiqarilmaydi.',
    capacityMax: 'Eng katta sig‘im 50 tonna, qiymat 50 tonnaga tushirildi.',
    phone: 'Telefon raqamingiz',
    phonePh: '+998 90 123 45 67',
    phoneHint: 'Mutaxassisimiz siz bilan shu raqam orqali bog‘lanadi.',
    phoneBad: 'Telefon raqamini to‘liq kiriting, masalan: +998 90 123 45 67',
    oPhone: 'Telefon',
    tonnes: 't',
    tonnesLong: n => `${n} tonna`,
    products: 'Necha xil mahsulotga mo‘ljallangan',
    productsLong: n => `${n} xil mahsulot`,
    color: 'Asosiy rang',
    customColor: 'Boshqa rang',
    colorNames: { yellow: 'Sariq', red: 'Qizil', blue: 'Ko‘k', green: 'Yashil', orange: 'To‘q sariq', black: 'Qora' },
    panel: 'Old panel rangi',
    panelNames: { black: 'Qora', white: 'Oq', grey: 'Kulrang', navy: 'To‘q ko‘k', brown: 'Jigarrang' },
    oPanel: 'Old panel rangi',
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
    roomHint: 'Длина от 0 до 3,5 м, ширина от 0 до 2,5 м',
    roomMax: { roomLength: 'Длина — не более 3,5 м.', roomWidth: 'Ширина — не более 2,5 м.' },
    capacity: 'Ёмкость станции',
    capacityCustom: 'Укажите ёмкость',
    capacityUnit: 'тонн',
    capacityHint: 'Ёмкость указывается в тоннах, максимум 50 тонн. Станции большей ёмкости не производятся.',
    capacityMax: 'Максимальная ёмкость — 50 тонн, значение уменьшено до 50.',
    phone: 'Ваш номер телефона',
    phonePh: '+998 90 123 45 67',
    phoneHint: 'Наш специалист свяжется с вами по этому номеру.',
    phoneBad: 'Введите номер полностью, например: +998 90 123 45 67',
    oPhone: 'Телефон',
    tonnes: 'т',
    tonnesLong: n => `${n} ${ruPlural(n, 'тонна', 'тонны', 'тонн')}`,
    products: 'Сколько видов топлива',
    productsLong: n => `${n} ${n === 1 ? 'вид' : n < 5 ? 'вида' : 'видов'} топлива`,
    color: 'Основной цвет',
    customColor: 'Другой цвет',
    colorNames: { yellow: 'Жёлтый', red: 'Красный', blue: 'Синий', green: 'Зелёный', orange: 'Оранжевый', black: 'Чёрный' },
    panel: 'Цвет фронтальной панели',
    panelNames: { black: 'Чёрный', white: 'Белый', grey: 'Серый', navy: 'Тёмно-синий', brown: 'Коричневый' },
    oPanel: 'Цвет фронтальной панели',
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
    roomHint: 'Length from 0 to 3.5 m, width from 0 to 2.5 m',
    roomMax: { roomLength: 'The length can be at most 3.5 m.', roomWidth: 'The width can be at most 2.5 m.' },
    capacity: 'Station capacity',
    capacityCustom: 'Enter the capacity',
    capacityUnit: 'tonnes',
    capacityHint: 'Capacity is entered in tonnes, up to 50 tonnes. Larger stations are not manufactured.',
    capacityMax: 'The maximum capacity is 50 tonnes, so the value was set to 50.',
    phone: 'Your phone number',
    phonePh: '+998 90 123 45 67',
    phoneHint: 'Our specialist will contact you on this number.',
    phoneBad: 'Enter the full number, for example: +998 90 123 45 67',
    oPhone: 'Phone',
    tonnes: 't',
    tonnesLong: n => `${n} tonne${n === 1 ? '' : 's'}`,
    products: 'Number of fuel types',
    productsLong: n => `${n} fuel type${n === 1 ? '' : 's'}`,
    color: 'Main colour',
    customColor: 'Other colour',
    colorNames: { yellow: 'Yellow', red: 'Red', blue: 'Blue', green: 'Green', orange: 'Orange', black: 'Black' },
    panel: 'Front panel colour',
    panelNames: { black: 'Black', white: 'White', grey: 'Grey', navy: 'Navy', brown: 'Brown' },
    oPanel: 'Front panel colour',
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
  panel: '#30353b',
  brand: '',
  logo: null,
  location: 'highway',
  phone: '',
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

// Korpus uzunligi (m) sig'imga qarab: oraliq qiymatlar chiziqli hisoblanadi
const BODY_LEN = [[10, 5], [15, 6], [20, 7.4], [30, 9.4], [40, 11.6], [50, 13.4]];
function bodyLength(cap) {
  for (let i = 1; i < BODY_LEN.length; i++) {
    const [c0, l0] = BODY_LEN[i - 1], [c1, l1] = BODY_LEN[i];
    if (cap <= c1) return l0 + ((l1 - l0) * (Math.max(cap, c0) - c0)) / (c1 - c0);
  }
  return BODY_LEN[BODY_LEN.length - 1][1];
}

// Konteyner tipidagi shoxobcha (10 tonnadan katta)
function containerStation(t) {
  const c = state.color, cDark = shade(c, -0.28), cLight = shade(c, 0.25);
  const D = clamp(state.roomWidth, ROOM_DRAW_MIN, ROOM_MAX.roomWidth) * S * 0.55;
  const dv = { x: D * 0.7, y: -D * 0.42 };
  const Hb = 3.1 * S, roofT = 0.42 * S;
  const n = state.products;
  const Cz = (n <= 2 ? 2.8 : 3.8) * S;
  const Lr = clamp(state.roomLength, ROOM_DRAW_MIN, ROOM_MAX.roomLength) * S;
  const bodyM = bodyLength(state.capacity);
  const Lb = bodyM * S;
  const L = Cz + Lr + Lb;
  const xr = Cz, xb = Cz + Lr;
  const wall = '#eceeee', wallSide = '#c9cdd0', panel = state.panel;

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
  out += brandBlock(bx, -Hb * 0.72, bw, Hb * 0.36, c, onColor(panel), t);
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
  const D = clamp(state.roomWidth, ROOM_DRAW_MIN, ROOM_MAX.roomWidth) * S * 0.45;
  const dv = { x: D * 0.7, y: -D * 0.42 };
  const Hk = 2.7 * S, K = 2.3 * S;
  const Lr = clamp(state.roomLength, ROOM_DRAW_MIN, ROOM_MAX.roomLength) * S;
  // Rezervuar: 5 t da 3,8 × 1,75 m, 10 t da 5,4 × 2,25 m, oraliqlar chiziqli
  const tankL = Math.max(2.6, 3.8 + (state.capacity - 5) * 0.32) * S;
  const tankD = Math.max(1.35, 1.75 + (state.capacity - 5) * 0.1) * S;
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
  const front = state.panel;
  out += prism(K, -Hk, Lr, Hk, dv, front, '#e9ebec', shade(front, -0.2));
  out += `<rect x="${K + 0.16 * S}" y="${-Hk + 0.35 * S}" width="${0.85 * S}" height="${Hk - 0.35 * S}" fill="${shade(front, -0.12)}" stroke="${shade(front, -0.35)}" stroke-width="2"/>
    <rect x="${K + Lr - 0.95 * S}" y="${-Hk + 0.5 * S}" width="${0.75 * S}" height="${0.5 * S}" fill="url(#cfgGlass)"/>
    <rect x="${K}" y="${-Hk}" width="${Lr}" height="${0.22 * S}" fill="${c}"/>`;
  out += fuelPlates(K + Lr - 1.15 * S, -Hk + 1.2 * S, n, c, Hk - 1.45 * S);
  // tom
  out += prism(-0.1 * S, -Hk - 0.3 * S, K + Lr + 0.1 * S, 0.3 * S, dv, '#f4f4f2', '#dfe1e2', '#c3c6c8');
  out += `<rect x="${-0.1 * S}" y="${-Hk - 0.12 * S}" width="${K + Lr + 0.1 * S}" height="${0.08 * S}" fill="${c}"/>`;
  out += roofSign(0.1 * S, -Hk - 0.45 * S, c, t, (K + Lr) * 1.05);
  return { svg: out, width: tx + tankL + dv.x + 0.8 * S, left: -0.6 * S, top: -Hk - 2.2 * S };
}

// ---------- korxonalar uchun shoxobchalar ----------
// Ishlab chiqarilgan mahsulotlar asosida: kub bak, kiosk, navisli silindr rezervuar va konteyner.
const FIRE_RED = '#d8232a';
const PLATE = '#17191c'; // qora g'adir-budir pol va poydevor

// "Yonuvchan" belgisi: qizil hoshiyali oq romb, ichida olov
function flameSign(cx, cy, r) {
  return `<g transform="translate(${cx} ${cy})">
    <polygon points="0,${-r} ${r},0 0,${r} ${-r},0" fill="#ffffff" stroke="${FIRE_RED}" stroke-width="${r * 0.14}" stroke-linejoin="round"/>
    <path d="M0 ${-r * 0.5} C${r * 0.34} ${-r * 0.16} ${r * 0.3} ${r * 0.2} 0 ${r * 0.24} C${-r * 0.3} ${r * 0.2} ${-r * 0.3} ${-r * 0.06} ${-r * 0.1} ${-r * 0.2} C${-r * 0.08} ${-r * 0.34} 0 ${-r * 0.4} 0 ${-r * 0.5} Z" fill="${FIRE_RED}"/>
    <rect x="${-r * 0.32}" y="${r * 0.32}" width="${r * 0.64}" height="${r * 0.08}" fill="${FIRE_RED}"/></g>`;
}

function noSmoking(cx, cy, r) {
  return `<g transform="translate(${cx} ${cy})"><circle r="${r}" fill="#ffffff" stroke="${FIRE_RED}" stroke-width="${r * 0.2}"/>
    <rect x="${-r * 0.5}" y="${-r * 0.1}" width="${r * 0.8}" height="${r * 0.22}" fill="#2b2f33"/>
    <path d="M${-r * 0.64} ${-r * 0.64} L${r * 0.64} ${r * 0.64}" stroke="${FIRE_RED}" stroke-width="${r * 0.2}"/></g>`;
}

// Qizil "ОГНЕОПАСНО" yozuvi: berilgan kenglikka aniq sig'adi
function fireText(cx, cy, width, italic) {
  return `<text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="central" textLength="${width}" lengthAdjust="spacingAndGlyphs" font-family="${italic ? 'Montserrat, ' : ''}Inter, Arial, sans-serif" font-weight="800" ${italic ? 'font-style="italic"' : ''} font-size="${width / 6.6}" fill="${FIRE_RED}">ОГНЕОПАСНО</text>`;
}

// Yonilg'i belgilari bir qatorda (kichik bak uchun)
function fuelRow(x, y, w, h, n, c) {
  const gap = w * 0.04, pw = (w - gap * (n - 1)) / n;
  let out = '';
  for (let i = 0; i < n; i++) {
    const px = x + i * (pw + gap);
    out += `<rect x="${px}" y="${y}" width="${pw}" height="${h}" rx="3" fill="#ffffff" stroke="${c}" stroke-width="1.5"/>
      <text x="${px + pw / 2}" y="${y + h / 2}" dominant-baseline="central" text-anchor="middle" font-family="Saira, Inter, sans-serif" font-weight="700" font-size="${Math.min(h * 0.6, pw * 0.3)}" fill="#1b1d20">${FUELS[i]}</text>`;
  }
  return out;
}

// Kolonka: oq korpus, qora boshcha, displey, qizil belgi va pastida rangli yoy
function pumpUnit(x, n, c) {
  const w = 0.72 * S, h = 1.8 * S, head = 0.58 * S;
  let nozzles = '';
  for (let i = 0; i < n; i++) {
    const nx = x + 0.08 * S + i * ((w - 0.16 * S) / n) + 1;
    nozzles += `<rect x="${nx}" y="${-h + head + 0.5 * S}" width="${Math.min(0.11 * S, (w - 0.2 * S) / n - 2)}" height="${0.26 * S}" rx="1.5" fill="${NOZZLE_COLORS[i % NOZZLE_COLORS.length]}"/>`;
  }
  return `
    <rect x="${x + 0.06 * S}" y="${-h}" width="${w}" height="${h}" fill="#c9cdd1"/>
    <rect x="${x}" y="${-h}" width="${w}" height="${h}" rx="2" fill="#f7f8f8"/>
    <path d="M${x + 0.05 * S} ${-0.14 * S} Q${x + 0.2 * S} ${-0.52 * S} ${x + w - 0.04 * S} ${-0.62 * S}" stroke="#1e5bd8" stroke-width="${0.05 * S}" fill="none"/>
    <path d="M${x + 0.14 * S} ${-0.14 * S} Q${x + 0.28 * S} ${-0.46 * S} ${x + w - 0.04 * S} ${-0.52 * S}" stroke="${FIRE_RED}" stroke-width="${0.05 * S}" fill="none"/>
    <rect x="${x}" y="${-0.1 * S}" width="${w}" height="${0.1 * S}" fill="${c}"/>
    <rect x="${x - 0.03 * S}" y="${-h}" width="${w + 0.06 * S}" height="${head}" rx="2" fill="#1f2226"/>
    <rect x="${x + 0.07 * S}" y="${-h + 0.1 * S}" width="${0.2 * S}" height="${0.3 * S}" fill="#b9c0c5"/>
    <rect x="${x + 0.34 * S}" y="${-h + 0.1 * S}" width="${0.3 * S}" height="${0.2 * S}" fill="#a9bdb0"/>
    <circle cx="${x + 0.49 * S}" cy="${-h + 0.44 * S}" r="${0.045 * S}" fill="${FIRE_RED}"/>
    <rect x="${x + w / 2 - 0.07 * S}" y="${-h + head + 0.14 * S}" width="${0.14 * S}" height="${0.18 * S}" rx="${0.05 * S}" fill="${FIRE_RED}"/>
    ${nozzles}
    <path d="M${x + w} ${-h * 0.5} q${0.3 * S} ${0.45 * S} 0 ${0.8 * S}" stroke="#17191c" stroke-width="2.5" fill="none"/>`;
}

function yardPad(x0, x1, dv, k = 1.5) {
  return `<polygon points="${x0},${0.16 * S} ${x1},${0.16 * S} ${x1 + dv.x * k},${dv.y * k} ${x0 + dv.x * k},${dv.y * k}" fill="#d8d6cf"/>
    <rect x="${x0}" y="${0.16 * S}" width="${x1 - x0}" height="${0.12 * S}" fill="#b9b6ad"/>`;
}

// 1–2 tonna: oyoqli kub bak, yon tomonida nasos va shlang
function cubeStation(t) {
  const c = state.color, panel = state.panel, cap = state.capacity, n = state.products;
  const Wb = (1.3 + cap * 0.3) * S, Hb = (1.15 + cap * 0.12) * S, leg = 0.5 * S;
  const D = Wb * 0.42;
  const dv = { x: D * 0.7, y: -D * 0.42 };
  const top = -leg - Hb;
  const legW = 0.12 * S;
  const legAt = (x, y) => `<rect x="${x}" y="${y - leg}" width="${legW}" height="${leg}" fill="#eceeef" stroke="#c3c7cb" stroke-width="1"/>`;
  let out = yardPad(-0.7 * S, Wb + 0.6 * S, dv);
  out += legAt(dv.x + 0.03 * S, dv.y) + legAt(Wb + dv.x - legW - 0.03 * S, dv.y);
  out += prism(0, top, Wb, Hb, dv, '#f5f6f6', '#ffffff', '#d3d7da');
  out += `<rect x="0" y="${-leg - 0.1 * S}" width="${Wb}" height="${0.1 * S}" fill="${c}"/>`;
  // old oyoqlar va burchak kosinkalari
  out += legAt(0.03 * S, 0) + legAt(Wb - legW - 0.03 * S, 0);
  out += `<polygon points="${0.15 * S},${-leg} ${0.5 * S},${-leg} ${0.15 * S},${-leg + 0.3 * S}" fill="#e3e5e7"/>
    <polygon points="${Wb - 0.15 * S},${-leg} ${Wb - 0.5 * S},${-leg} ${Wb - 0.15 * S},${-leg + 0.3 * S}" fill="#e3e5e7"/>`;
  // brend lavhasi va yonilg'i belgilari
  const bx = Wb * 0.42, bw = Wb * 0.52, bh = Hb * 0.26, by = top + Hb * 0.3;
  out += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="4" fill="${panel}"/>`;
  out += brandBlock(bx + bw * 0.05, by + bh * 0.12, bw * 0.9, bh * 0.76, c, onColor(panel), t);
  out += fuelRow(bx, by + bh + 0.14 * S, bw, 0.24 * S, n, c);
  // nasos, hisoblagich, shlang va pistolet
  const px = 0.12 * S, py = top + Hb * 0.16, pw = 0.5 * S, ph = 0.44 * S;
  out += `<path d="M${px + pw * 0.75} ${py + ph} C${px + pw * 1.2} ${-leg + 0.2 * S} ${px - 0.5 * S} ${-leg + 0.25 * S} ${px - 0.16 * S} ${py + ph * 0.7}" stroke="#17191c" stroke-width="${0.075 * S}" fill="none" stroke-linecap="round"/>
    <rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="3" fill="#c62828"/>
    <rect x="${px + 0.06 * S}" y="${py + 0.07 * S}" width="${pw * 0.42}" height="${ph * 0.42}" fill="#20242a"/>
    <rect x="${px + 0.09 * S}" y="${py + 0.1 * S}" width="${pw * 0.3}" height="${ph * 0.16}" fill="#9fd3e8"/>
    <g transform="translate(${px - 0.16 * S} ${py + ph * 0.7}) rotate(-28)"><rect x="${-0.34 * S}" y="${-0.07 * S}" width="${0.4 * S}" height="${0.14 * S}" rx="3" fill="${FIRE_RED}"/><rect x="${-0.52 * S}" y="${-0.03 * S}" width="${0.2 * S}" height="${0.06 * S}" fill="#9aa0a6"/></g>`;
  out += flameSign(px + pw + 0.2 * S, py + ph + 0.22 * S, 0.13 * S);
  // nafas klapani
  out += `<rect x="${Wb * 0.62 + dv.x * 0.5}" y="${top + dv.y * 0.5 - 0.3 * S}" width="${0.08 * S}" height="${0.3 * S}" fill="#aeb4b9"/>
    <rect x="${Wb * 0.62 + dv.x * 0.5 - 0.07 * S}" y="${top + dv.y * 0.5 - 0.38 * S}" width="${0.22 * S}" height="${0.1 * S}" rx="2" fill="#c9cdd1"/>`;
  return { svg: out, width: Wb + dv.x + 0.6 * S, left: -0.7 * S, top: top + dv.y - 0.55 * S };
}

// 3–5 tonna: oq ramkali kiosk — chapda kolonka, o'ngda rezervuar shkafi
function kioskStation(t) {
  const c = state.color, panel = state.panel, cap = state.capacity, n = state.products;
  const D = clamp(state.roomWidth, 1.2, ROOM_MAX.roomWidth) * S * 0.5;
  const dv = { x: D * 0.7, y: -D * 0.42 };
  const Hk = 2.3 * S, roofT = 0.26 * S, Hc = Hk - roofT;
  const K = Math.max(clamp(state.roomLength * 0.5, 1.1, 1.75), n > 3 ? 1.5 : 1.1) * S;
  const Lc = (1.2 + cap * 0.2) * S;
  const L = K + Lc;
  let out = yardPad(-0.5 * S, L + 0.7 * S, dv);
  // kolonka bo'lmasi: pol, orqa va chap devor
  out += `<polygon points="0,0 ${K},0 ${K + dv.x},${dv.y} ${dv.x},${dv.y}" fill="#2a2d31"/>
    <rect x="${dv.x}" y="${-Hk + dv.y}" width="${K}" height="${Hk}" fill="#eef0f1"/>
    <polygon points="0,0 ${dv.x},${dv.y} ${dv.x},${-Hk + dv.y} 0,${-Hk}" fill="#dfe2e4"/>`;
  out += `<g transform="translate(${dv.x * 0.45} ${dv.y * 0.45})">${pumpUnit((K - 0.72 * S) / 2 + 0.08 * S, n, c)}</g>`;
  // rezervuar shkafi
  out += prism(K, -Hc, Lc, Hc, dv, panel, panel, shade(panel, -0.22));
  out += `<path d="M${K + Lc * 0.45} ${-Hc} V0" stroke="${shade(panel, -0.18)}" stroke-width="1.5"/>
    <polygon points="${L + dv.x * 0.25},${-Hk * 0.7 + dv.y * 0.25} ${L + dv.x * 0.78},${-Hk * 0.7 + dv.y * 0.78} ${L + dv.x * 0.78},${-Hk * 0.3 + dv.y * 0.78} ${L + dv.x * 0.25},${-Hk * 0.3 + dv.y * 0.25}" fill="${shade(panel, -0.32)}" stroke="${shade(panel, -0.5)}" stroke-width="1.5"/>
    <rect x="${K}" y="${-Hc}" width="${Lc}" height="${0.05 * S}" fill="${c}"/>`;
  out += brandBlock(K + 0.15 * S, -Hc + 0.2 * S, Lc - 0.3 * S, 0.42 * S, c, onColor(panel), t);
  out += fuelPlates(K + 0.2 * S, -Hc + 0.82 * S, n, c, Hc - 1.2 * S);
  out += flameSign(L - 0.36 * S, -0.62 * S, 0.17 * S);
  // tom: ustki yuz, o'ng qiya chet va yumaloq burchakli oq ramka
  const rx1 = L + 0.32 * S;
  out += `<polygon points="${0.4 * S},${-Hk} ${rx1},${-Hk} ${rx1 + dv.x},${-Hk + dv.y} ${0.4 * S + dv.x},${-Hk + dv.y}" fill="#eef0f1"/>
    <polygon points="${rx1},${-Hk} ${rx1 + dv.x},${-Hk + dv.y} ${L + 0.08 * S + dv.x},${-Hc + dv.y} ${L + 0.08 * S},${-Hc}" fill="#cfd3d6"/>
    <path d="M${0.13 * S} 0 V${-Hk + 0.62 * S} Q${0.13 * S} ${-Hk + 0.13 * S} ${0.62 * S} ${-Hk + 0.13 * S} H${L + 0.2 * S}" stroke="#fafafa" stroke-width="${roofT}" fill="none"/>
    <polygon points="${L + 0.19 * S},${-Hk} ${rx1},${-Hk} ${L + 0.08 * S},${-Hc} ${L + 0.19 * S},${-Hc}" fill="#fafafa"/>
    <path d="M${0.27 * S} 0 V${-Hk + 0.66 * S} Q${0.27 * S} ${-Hc + 0.01 * S} ${0.66 * S} ${-Hc + 0.01 * S}" stroke="#d5d8db" stroke-width="1.5" fill="none"/>`;
  // nafas klapani va poydevor
  const vx = K + Lc * 0.62 + dv.x * 0.5, vy = -Hk + dv.y * 0.5;
  out += `<rect x="${vx}" y="${vy - 0.3 * S}" width="${0.08 * S}" height="${0.3 * S}" fill="#aeb4b9"/>
    <rect x="${vx - 0.07 * S}" y="${vy - 0.38 * S}" width="${0.22 * S}" height="${0.1 * S}" rx="2" fill="#c9cdd1"/>
    <polygon points="${L},0 ${L + dv.x},${dv.y} ${L + dv.x},${dv.y - 0.13 * S} ${L},${-0.13 * S}" fill="#0f1113"/>
    <rect x="0" y="${-0.13 * S}" width="${L}" height="${0.13 * S}" fill="${PLATE}"/>`;
  return { svg: out, width: rx1 + dv.x + 0.6 * S, left: -0.5 * S, top: -Hk + dv.y - 0.6 * S };
}

// 6–20 tonna: tayanchli gorizontal silindr rezervuar, yonida yoysimon navis ostidagi kolonka
function tankStation(t) {
  const c = state.color, panel = state.panel, cap = state.capacity, n = state.products;
  const dm = clamp(1.9 + (cap - 8) * 0.05, 1.7, 2.7);
  const d = dm * S;
  const tankL = clamp((cap * 1.2) / ((Math.PI * dm * dm) / 4), 2.6, 7.5) * S;
  const legH = 0.32 * S, ty = -legH - d;
  // Navis maydoni: uzunligi va eni operator xonasi o'lchamlaridan olinadi
  const P = clamp(state.roomLength, 1.6, ROOM_MAX.roomLength) * 0.8 * S;
  const D = clamp(state.roomWidth, 1.2, ROOM_MAX.roomWidth) * S * 0.55;
  const dv = { x: D * 0.7, y: -D * 0.42 };
  const px0 = tankL + 0.2 * S, px1 = px0 + P;
  const Hc = Math.max(2.5 * S, legH + d + 0.2 * S);
  const pt = -0.12 * S; // maydon usti
  const post = (x, y) => `<rect x="${x}" y="${y - Hc - pt}" width="${0.09 * S}" height="${Hc + pt}" fill="#f4f5f5" stroke="#c9cdd1" stroke-width="0.8"/>`;

  let out = yardPad(-1.0 * S, px1 + 0.6 * S, dv);
  // g'adir-budir po'lat maydon
  out += `<polygon points="${px0 - 0.1 * S},${pt} ${px1},${pt} ${px1 + dv.x},${pt + dv.y} ${px0 - 0.1 * S + dv.x},${pt + dv.y}" fill="#3b3f44"/>
    <polygon points="${px1},${pt} ${px1 + dv.x},${pt + dv.y} ${px1 + dv.x},${dv.y} ${px1},0" fill="#0f1113"/>
    <rect x="${px0 - 0.1 * S}" y="${pt}" width="${P + 0.1 * S}" height="${-pt}" fill="${PLATE}"/>`;
  out += post(px0 - 0.05 * S + dv.x, pt + dv.y) + post(px1 - 0.12 * S + dv.x, pt + dv.y);

  // rezervuar (maydon chuqurligining o'rtasida)
  let tank = '';
  // narvon
  const lx = -0.5 * S, lTop = ty - 0.45 * S;
  let rungs = '';
  for (let y = -0.3 * S; y > lTop + 0.1 * S; y -= 0.3 * S) rungs += `M${lx} ${y} h${0.34 * S} `;
  tank += `<path d="M${lx} 0 V${lTop} M${lx + 0.34 * S} 0 V${lTop} ${rungs}" stroke="#8d9399" stroke-width="4.5" fill="none"/>
    <path d="M${lx} 0 V${lTop} M${lx + 0.34 * S} 0 V${lTop} ${rungs}" stroke="#fafafa" stroke-width="2.5" fill="none"/>
    <path d="M${lx + 0.34 * S} ${ty + d * 0.2} H2 M${lx + 0.34 * S} ${ty + d * 0.8} H2" stroke="#e3e5e7" stroke-width="3"/>`;
  tank += `<rect x="0" y="${ty}" width="${tankL}" height="${d}" rx="${d * 0.06}" fill="url(#cfgTank)"/>
    <path d="M${tankL * 0.34} ${ty + 2} V${ty + d - 2} M${tankL * 0.67} ${ty + 2} V${ty + d - 2}" stroke="#c9cdd1" stroke-width="1.2"/>
    <rect x="0" y="${ty + d * 0.8}" width="${tankL}" height="${d * 0.045}" fill="${c}"/>
    <ellipse cx="${tankL}" cy="${ty + d / 2}" rx="${d * 0.2}" ry="${d / 2}" fill="#e9ebec" stroke="#c6cace" stroke-width="1"/>`;
  tank += flameSign(tankL + d * 0.03, ty + d * 0.42, d * 0.12);
  // tayanchlar
  for (const sx of [tankL * 0.17, tankL * 0.8]) {
    tank += `<polygon points="${sx - 0.3 * S},${-0.07 * S} ${sx + 0.3 * S},${-0.07 * S} ${sx + 0.2 * S},${ty + d * 0.74} ${sx - 0.2 * S},${ty + d * 0.74}" fill="#f1f2f3" stroke="#bfc4c8" stroke-width="1"/>
      <rect x="${sx - 0.38 * S}" y="${-0.07 * S}" width="${0.76 * S}" height="${0.07 * S}" fill="#dfe2e4"/>`;
  }
  // lyuk maydonchasi va nafas trubasi
  const mx = tankL * 0.6;
  tank += `<rect x="${mx - 0.24 * S}" y="${ty - 0.26 * S}" width="${0.48 * S}" height="${0.28 * S}" fill="#dfe2e4"/>
    <ellipse cx="${mx}" cy="${ty - 0.26 * S}" rx="${0.3 * S}" ry="${0.07 * S}" fill="#eef0f1" stroke="#b9bec3" stroke-width="1"/>
    <rect x="${mx - 0.62 * S}" y="${ty - 0.09 * S}" width="${1.24 * S}" height="${0.08 * S}" fill="#c9cdd1"/>
    <rect x="${mx + 0.74 * S}" y="${ty - 0.72 * S}" width="${0.07 * S}" height="${0.74 * S}" fill="#b9bec3"/>
    <rect x="${mx + 0.68 * S}" y="${ty - 0.8 * S}" width="${0.19 * S}" height="${0.1 * S}" rx="2" fill="#d2d6d9"/>`;
  // brend va "ОГНЕОПАСНО"
  tank += brandBlock(tankL * 0.06, ty + d * 0.13, tankL * 0.5, d * 0.17, c, '#1b1d20', t);
  const fw = Math.min(tankL * 0.62, 3.6 * S), fcx = tankL * 0.44, fcy = ty + d * 0.55;
  tank += fireText(fcx, fcy, fw, true);
  tank += flameSign(fcx + fw / 2 + fw * 0.11, fcy, fw * 0.075);
  out += `<g transform="translate(${dv.x * 0.2} ${dv.y * 0.2})">${tank}</g>`;

  // kolonka va old ustunlar
  out += `<g transform="translate(${dv.x * 0.45} ${pt + dv.y * 0.45})">${pumpUnit(px0 + Math.max(0.5 * S, (P - 0.72 * S) / 2), n, c)}</g>`;
  out += post(px0 - 0.05 * S, pt) + post(px1 - 0.12 * S, pt);
  // yoysimon tom: old chetdan orqa chetga ko'tarilib tushadi
  const rx0 = px0 - 0.45 * S, rx1 = px1 + 0.25 * S, bulge = 0.22 * S;
  const fx = -dv.x * 0.12, fy = -dv.y * 0.12, bx = dv.x * 1.12, by = dv.y * 1.12;
  const mxo = (fx + bx) / 2, myo = (fy + by) / 2 - bulge * 1.6;
  const arc = x => `M${x + fx} ${-Hc + fy} Q${x + mxo} ${-Hc + myo} ${x + bx} ${-Hc + by}`;
  let ribs = '';
  for (let i = 1; i < 7; i++) ribs += arc(rx0 + ((rx1 - rx0) * i) / 7) + ' ';
  out += `<path d="M${rx0 + fx} ${-Hc + fy} L${rx1 + fx} ${-Hc + fy} Q${rx1 + mxo} ${-Hc + myo} ${rx1 + bx} ${-Hc + by} L${rx0 + bx} ${-Hc + by} Q${rx0 + mxo} ${-Hc + myo} ${rx0 + fx} ${-Hc + fy} Z" fill="${panel}"/>
    <path d="${ribs}" stroke="${shade(panel, luminance(panel) > 0.4 ? -0.14 : 0.16)}" stroke-width="1" fill="none"/>
    <path d="${arc(rx1)}" stroke="#f4f5f5" stroke-width="${0.06 * S}" fill="none"/>
    <rect x="${rx0 + fx}" y="${-Hc + fy}" width="${rx1 - rx0}" height="${0.08 * S}" fill="#f4f5f5"/>
    <rect x="${rx0 + fx}" y="${-Hc + fy + 0.08 * S}" width="${rx1 - rx0}" height="${0.035 * S}" fill="${c}"/>`;
  const topY = Math.min(-Hc + myo, ty - 0.8 * S + dv.y * 0.2);
  return { svg: out, width: rx1 + bx + 0.5 * S, left: -1.0 * S, top: topY - 0.3 * S };
}

// 20 tonnadan katta: konteyner tipidagi shoxobcha (35 t gacha 20 futli, undan katta 40 futli)
function boxStation(t) {
  const c = state.color, panel = state.panel, n = state.products;
  const L = (state.capacity <= 35 ? 6.06 : 12.19) * S, Hc = 2.6 * S;
  const D = 2.44 * S * 0.55;
  const dv = { x: D * 0.7, y: -D * 0.42 };
  let out = yardPad(-0.5 * S, L + 0.7 * S, dv);
  out += prism(0, -Hc, L, Hc, dv, '#f5f6f6', '#fcfcfc', '#dde0e3');
  // gofra devor
  let ribs = '';
  for (let x = 0.3 * S; x < L - 0.3 * S; x += 0.3 * S) ribs += `<rect x="${x}" y="${-Hc + 0.14 * S}" width="${0.13 * S}" height="${Hc - 0.36 * S}"/>`;
  out += `<g fill="#e2e5e8">${ribs}</g>
    <rect x="0" y="${-Hc}" width="${L}" height="${0.12 * S}" fill="#eceeef"/>
    <rect x="0" y="${-0.2 * S}" width="${L}" height="${0.2 * S}" fill="${c}"/>
    <rect x="${L * 0.36}" y="${-0.16 * S}" width="${0.36 * S}" height="${0.11 * S}" fill="#17191c" opacity="0.75"/>
    <rect x="${L * 0.64 - 0.36 * S}" y="${-0.16 * S}" width="${0.36 * S}" height="${0.11 * S}" fill="#17191c" opacity="0.75"/>`;
  // burchak quymalari va ogohlantirish chiziqlari
  for (const [x, y] of [[0, -Hc], [L - 0.17 * S, -Hc], [0, -0.17 * S], [L - 0.17 * S, -0.17 * S]]) {
    out += `<rect x="${x}" y="${y}" width="${0.17 * S}" height="${0.17 * S}" fill="#d3d7da" stroke="#b5babf" stroke-width="0.8"/>`;
  }
  for (const x of [0.22 * S, L - 0.6 * S]) {
    out += `<rect x="${x}" y="${-Hc + 0.15 * S}" width="${0.38 * S}" height="${0.07 * S}" fill="#f2c200"/>
      <path d="M${x + 0.07 * S} ${-Hc + 0.15 * S} l${0.05 * S} ${0.07 * S} M${x + 0.19 * S} ${-Hc + 0.15 * S} l${0.05 * S} ${0.07 * S} M${x + 0.31 * S} ${-Hc + 0.15 * S} l${0.05 * S} ${0.07 * S}" stroke="#17191c" stroke-width="2.5"/>`;
  }
  // tavaqali eshiklar (o'ng yon tomonda)
  let rods = '';
  for (const f of [0.18, 0.36, 0.64, 0.82]) rods += `M${L + dv.x * f} ${-Hc + 0.1 * S + dv.y * f} V${-0.1 * S + dv.y * f} `;
  out += `<path d="${rods}" stroke="#b3b8bd" stroke-width="2" fill="none"/>
    <path d="M${L + dv.x * 0.5} ${-Hc + dv.y * 0.5} V${dv.y * 0.5}" stroke="#4a4f55" stroke-width="2"/>
    <polygon points="${L},0 ${L + dv.x},${dv.y} ${L + dv.x},${dv.y - 0.2 * S} ${L},${-0.2 * S}" fill="${shade(c, -0.28)}"/>`;
  // brend lavhasi va yonilg'i belgilari
  out += `<rect x="${0.3 * S}" y="${-Hc + 0.32 * S}" width="${1.5 * S}" height="${0.52 * S}" rx="4" fill="${panel}"/>`;
  out += brandBlock(0.37 * S, -Hc + 0.37 * S, 1.36 * S, 0.42 * S, c, onColor(panel), t);
  out += fuelPlates(0.52 * S, -Hc + 1.02 * S, n, c, Hc - 1.45 * S);
  // "ОГНЕОПАСНО" lavhasi, belgilar va elektr shchiti
  const sx = Math.max(2.05 * S, L * 0.3), sw = Math.min(3.6 * S, L * 0.43), sh = sw * 0.2, sy = -Hc * 0.62;
  out += `<rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" fill="#fcfcfc" stroke="#aeb4b9" stroke-width="1.5"/>`;
  out += fireText(sx + sw / 2, sy + sh / 2, sw * 0.84, false);
  out += flameSign(sx - 0.24 * S, sy + sh + 0.3 * S, 0.17 * S);
  out += noSmoking(sx + sw + 0.36 * S, sy + sh / 2 + 0.1 * S, 0.22 * S);
  const ex = L - 0.95 * S, ey = -Hc + 0.32 * S;
  out += `<rect x="${ex}" y="${ey}" width="${0.5 * S}" height="${0.55 * S}" fill="#aab0b5" stroke="#8d9399" stroke-width="1"/>
    <polygon points="${ex + 0.25 * S},${ey + 0.14 * S} ${ex + 0.37 * S},${ey + 0.36 * S} ${ex + 0.13 * S},${ey + 0.36 * S}" fill="#f2c200" stroke="#17191c" stroke-width="1"/>`;
  return { svg: out, width: L + dv.x + 0.6 * S, left: -0.5 * S, top: -Hc + dv.y - 0.45 * S };
}

// Korxona hududi: sig'imga qarab mos mahsulot turi tanlanadi
function companyStation(t) {
  const cap = state.capacity;
  if (cap <= 2) return cubeStation(t);
  if (cap <= 5) return kioskStation(t);
  if (cap <= 20) return tankStation(t);
  return boxStation(t);
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
  const st = loc === 'company' ? companyStation(t) : state.capacity <= 10 ? miniStation(t) : containerStation(t);
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
            <label><span>${t.roomLength}</span><input type="number" name="roomLength" inputmode="decimal" min="${ROOM_MIN}" max="${ROOM_MAX.roomLength}" step="0.1" value="${state.roomLength}"></label>
            <span class="nt-cfg-times" aria-hidden="true">×</span>
            <label><span>${t.roomWidth}</span><input type="number" name="roomWidth" inputmode="decimal" min="${ROOM_MIN}" max="${ROOM_MAX.roomWidth}" step="0.1" value="${state.roomWidth}"></label>
          </div>
          <p class="nt-cfg-hint">${t.roomHint}</p>
          <p class="nt-cfg-error" data-room-error role="alert"></p>
        </fieldset>
        <fieldset class="nt-cfg-field">
          <legend>${t.capacity}</legend>
          <label class="nt-cfg-cap">
            <span>${t.capacityCustom}</span>
            <span class="nt-cfg-unit">
              <input type="number" name="capacity" inputmode="numeric" min="${CAP_MIN}" max="${CAP_MAX}" step="1" value="${state.capacity}" aria-describedby="cfg-cap-hint">
              <em aria-hidden="true">${t.capacityUnit}</em>
            </span>
          </label>
          <p class="nt-cfg-hint" id="cfg-cap-hint">${t.capacityHint}</p>
          <p class="nt-cfg-error" data-cap-error role="alert"></p>
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
          <legend>${t.panel}</legend>
          <div class="nt-cfg-swatches">
            ${PANELS.map(p => `<button type="button" class="nt-cfg-swatch" data-panel="${p.hex}" style="--sw:${p.hex}" aria-pressed="${state.panel === p.hex}" aria-label="${t.panelNames[p.key]}" title="${t.panelNames[p.key]}"></button>`).join('')}
            <label class="nt-cfg-swatch nt-cfg-custom" title="${t.customColor}"><span class="sr-only">${t.panel}: ${t.customColor}</span><input type="color" name="customPanel" value="${state.panel}"></label>
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
            <label class="nt-cfg-phone">
              <span>${t.phone}</span>
              <input type="tel" name="phone" inputmode="tel" autocomplete="tel" maxlength="20" placeholder="${esc(t.phonePh)}" value="${esc(state.phone)}" aria-describedby="cfg-phone-hint" required>
            </label>
            <p class="nt-cfg-hint" id="cfg-phone-hint">${t.phoneHint}</p>
            <p class="nt-cfg-error" data-phone-error role="alert"></p>
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

function colorName(hex, presets, names) {
  const preset = presets.find(c => c.hex === hex);
  return preset ? `${names[preset.key]} (${hex.toUpperCase()})` : hex.toUpperCase();
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
    `🎨 ${t.oColor}: ${colorName(state.color, COLORS, t.colorNames)}`,
    `🖌 ${t.oPanel}: ${colorName(state.panel, PANELS, t.panelNames)}`,
    `🏷 ${t.oBrand}: ${state.brand.trim() || t.oBrandNo}`,
    `🖼 ${t.oLogo}: ${state.logo ? t.oLogoYes : t.oLogoNo}`,
    `📍 ${t.oLocation}: ${t.locations[state.location]}`,
    `📞 ${t.oPhone}: ${normalizePhone(state.phone)}`,
    '',
    t.orderOutro,
  ].join('\n');
}

function bind(section) {
  const form = section.querySelector('form');
  form.addEventListener('submit', e => e.preventDefault());

  const t = I18N[lang()];
  // Xona o'lchami: 0 dan boshlanadi, uzunligi 3,5 m, eni 2,5 m dan oshmaydi
  const roomErr = section.querySelector('[data-room-error]');
  for (const name of ['roomLength', 'roomWidth']) {
    const input = form.elements[name];
    input.addEventListener('input', () => {
      const v = parseFloat(input.value.replace(',', '.'));
      if (!Number.isFinite(v)) return;
      const max = ROOM_MAX[name];
      roomErr.textContent = v > max ? t.roomMax[name] : '';
      state[name] = Math.round(clamp(v, ROOM_MIN, max) * 10) / 10;
      update(section, false);
    });
    input.addEventListener('change', () => { input.value = state[name]; });
  }

  const capInput = form.elements.capacity;
  const capErr = section.querySelector('[data-cap-error]');
  // Qo'lda kiritilgan sig'im: butun tonna, 1 dan 50 gacha
  capInput.addEventListener('input', () => {
    const v = parseFloat(capInput.value.replace(',', '.'));
    if (!Number.isFinite(v) || v < CAP_MIN) return;
    capErr.textContent = v > CAP_MAX ? t.capacityMax : '';
    state.capacity = Math.round(clamp(v, CAP_MIN, CAP_MAX));
    update(section, false);
  });
  capInput.addEventListener('change', () => { capInput.value = state.capacity; });

  const phoneInput = section.querySelector('input[name="phone"]');
  const phoneErr = section.querySelector('[data-phone-error]');
  phoneInput.addEventListener('input', () => {
    state.phone = phoneInput.value;
    if (phoneErr.textContent && normalizePhone(state.phone)) {
      phoneErr.textContent = '';
      phoneInput.removeAttribute('aria-invalid');
    }
  });
  phoneInput.addEventListener('change', () => {
    const p = normalizePhone(phoneInput.value);
    if (p) phoneInput.value = state.phone = p;
  });
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
  section.querySelectorAll('[data-panel]').forEach(b => b.addEventListener('click', () => {
    state.panel = b.dataset.panel;
    setPressed(section, 'panel', state.panel);
    form.elements.customPanel.value = state.panel;
    update(section, false);
  }));
  form.elements.customPanel.addEventListener('input', e => {
    state.panel = e.target.value.toLowerCase();
    setPressed(section, 'panel', state.panel);
    update(section, false);
  });
  form.elements.brand.addEventListener('input', e => {
    state.brand = e.target.value;
    update(section, false);
  });

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
    // Telefon raqamisiz buyurtma yuborilmaydi
    if (!normalizePhone(state.phone)) {
      phoneErr.textContent = t.phoneBad;
      phoneInput.setAttribute('aria-invalid', 'true');
      phoneInput.focus();
      return;
    }
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

/**
 * Mock product data for the LOCAL VISUAL PREVIEW ONLY.
 * Uses the real design assets from BAV_Design/ and the trial prices agreed
 * in برومبت_بناء_موقع_Bav.md + طلبات_صاحب_المتجر.md.
 * None of this ships in the real theme — real products live in Salla's admin.
 */
const IMG = '../BAV_Design';
const FILES = '../الملفات الرقمية';

// Same Bav triangle mark used in header/footer — digital-file cards have no
// product photo in the approved design, just this watermark on a gradient.
const BAV_MARK_SVG = '<svg aria-hidden="true" width="150" height="123" viewBox="90 254 822 672"><path fill="#fff" fill-rule="evenodd" d="M367.2 548.3 L367.5 550.8 L445.4 681.7 L447.3 683.3 L469.9 646.9 L469.9 644.7 L413.7 549.0 L411.5 548.0Z M249.5 346.2 L248.9 347.1 L250.5 350.3 L256.4 359.7 L262.4 370.7 L287.5 412.1 L296.6 428.1 L297.6 429.1 L298.5 429.1 L302.6 423.4 L306.0 417.1 L320.8 393.9 L321.1 392.3 L294.7 347.1 L293.2 345.9Z M911.5 254.2 L646.6 254.2 L725.0 389.8 L755.5 339.9 L741.7 309.2 L811.7 310.7 L495.9 828.0 L477.1 796.9 L573.4 642.2 L466.4 460.5 L388.6 459.2 L427.8 392.0 L348.1 256.4 L90.4 255.8 L497.5 925.6Z M310.7 516.6 L431.3 516.3 L499.7 629.9 L508.5 646.3 L447.6 748.6 L440.1 738.5 L311.0 519.8Z M192.7 309.8 L308.2 309.2 L310.7 310.4 L358.8 391.7 L358.8 393.9 L318.3 460.5 L277.8 460.8 L275.9 459.2 L192.1 311.7Z M385.8 254.2 L461.1 382.6 L506.0 347.5 L486.5 309.5 L570.0 309.5 L589.1 343.7 L482.7 423.4 L593.2 609.2 L705.9 426.9 L606.1 253.9Z M617.4 392.0 L619.9 394.9 L637.8 425.6 L639.0 429.4 L599.2 497.5 L595.1 502.5 L588.8 493.1 L561.5 445.7 L556.2 435.3 L557.4 433.8 L612.1 395.2Z"/></svg>';

// Generic "service" icon (sliders/customization) — one consistent icon for
// any service product with no cover image, matching product-card.js.
const SERVICE_ICON_SVG = '<svg aria-hidden="true" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
  '<line x1="4" y1="6" x2="20" y2="6"/><circle cx="14" cy="6" r="2" fill="#0E0E11"/>' +
  '<line x1="4" y1="12" x2="20" y2="12"/><circle cx="8" cy="12" r="2" fill="#0E0E11"/>' +
  '<line x1="4" y1="18" x2="20" y2="18"/><circle cx="16" cy="18" r="2" fill="#0E0E11"/></svg>';

const gameProducts = [
  {
    slug: 'cp-charge', name: 'شحن CP',
    subtitle: 'بمعرّف اللاعب',
    image: `${IMG}/02_product_images/CP_2400.webp`,
    price: '3.50', oldPrice: null, startingFrom: true,
    description: 'تبي تشحن بسرعة؟ اختر الفئة اللي تناسبك، أدخل معرّف اللاعب بس، وخلك مطمئن — ما نطلب أي بيانات دخول لحسابك أبدًا. عندنا فئات تناسب الكل، من أصغر شحنة لحد الباقات الكبيرة.',
  },
  {
    slug: 'battle-pass', name: 'Battle Pass',
    subtitle: 'بمعرّف اللاعب',
    image: `${IMG}/02_product_images/Battle_Pass.webp`,
    price: '25.00', oldPrice: '26.00', badge: 'الموسم الحالي',
    description: 'ليه تفوّت مكافآت الموسم؟ فعّل الباتل باس بمعرّف اللاعب بس، وافتح كل المهام والجوائز الحصرية من غير ما تشارك أي بيانات حساب. يوصلك التفعيل على طول بعد ما يتأكد الدفع.',
  },
  {
    slug: 'battle-pass-bundle', name: 'Battle Pass Bundle',
    subtitle: 'بمعرّف اللاعب',
    image: `${IMG}/02_product_images/Battle_Pass_Bundle.webp`,
    price: '56.00', oldPrice: '59.00', badge: 'وفّر أكثر',
    description: 'ليه تدفع أكثر وانت تقدر توفّر؟ هذي الباقة تجمع لك كل مزايا الباتل باس مع محتوى حصري زيادة، بسعر أوفر بكثير من شرائهم لحالهم. خيارك الأمثل لو تبي تبدأ موسمك بأقوى شكل من أول يوم.',
  },
  {
    // From the merchant's hand-drawn product map (طلبات_صاحب_المتجر.md,
    // "Battle Pass والباقات": a third, separate combo product alongside
    // Battle Pass and Battle Pass Bundle). No combo cover image or final
    // price has arrived yet — placeholder image/price until it does.
    slug: 'battle-pass-2400-combo', name: 'Battle Pass + 2400 CP',
    subtitle: 'بمعرّف اللاعب',
    image: `${IMG}/02_product_images/Battle_Pass_Bundle.webp`,
    price: '78.00', oldPrice: null,
    description: 'باقة وحدة تجمع لك تفعيل الباتل باس مع رصيد من عملات CP — توفير حقيقي في السعر والوقت، بدل ما تطلب كل وحدة لحالها.',
  },
];

const doubleCpProducts = [
  { slug: 'double-cp-160', name: '160', unit: 'CP', image: `${IMG}/06_coin_only_renders/CP_80.webp`, price: '3.69', note: 'مرة واحدة فقط لكل حساب' },
  { slug: 'double-cp-800', name: '800', unit: 'CP', image: `${IMG}/06_coin_only_renders/CP_420.webp`, price: '17.99', note: 'مرة واحدة فقط لكل حساب' },
  { slug: 'double-cp-1600', name: '1,600', unit: 'CP', image: `${IMG}/06_coin_only_renders/CP_880.webp`, price: '36.99', note: 'مرة واحدة فقط لكل حساب' },
  { slug: 'double-cp-4000', name: '4,000', unit: 'CP', image: `${IMG}/06_coin_only_renders/CP_2400.webp`, price: '89.99', note: 'مرة واحدة فقط لكل حساب' },
].map((p) => ({
  ...p,
  description: `تحب تاخذ ضعف رصيدك من CP بنفس السعر؟ أدخل معرّف اللاعب واشحن ${p.name} ${p.unit}، وتتضاعف الكمية تلقائيًا في حسابك فور تأكيد الدفع. للعلم: الميزة دي تتفعّل مرة وحدة بس لكل حساب.`,
}));

const doubleCpGiftProducts = doubleCpProducts.map((p) => ({
  ...p, slug: `${p.slug}-gift`, gift: true, note: 'إهداء بالآيدي',
  description: `عاوز تفاجئ صديقك بهدية مختلفة؟ أهدِه مضاعفة شحنة ${p.name} ${p.unit} من غير ما تدخل بيانات حسابك إنت خالص — تكتب آيدي المستلم بس، وتتضاعف الكمية في حسابه هو مباشرة.`,
}));

const digitalFilesProducts = [
  {
    slug: 'guide-views', name: 'دليل زيادة المشاهدات والتفاعل على TikTok',
    digitalFile: true, image: `${FILES}/غلاف_دليل_المشاهدات.png`,
    price: '29.00', note: 'يصلك على بريدك بعد الدفع',
    description: 'تبي تكبّر حسابك على تيك توك؟ هذا الدليل يوريك خطوة بخطوة كيف تزيد مشاهداتك وتفاعلك بطرق مجرّبة وآمنة، من غير أي أدوات أو برامج تضر حسابك. خطوات بسيطة، ونتائج تلاحظها بسرعة.',
  },
  {
    slug: 'guide-video-quality', name: 'دليل تحسين جودة الفيديو بالجوال — مجانًا',
    digitalFile: true, image: `${FILES}/غلاف_دليل_تحسين_الجودة.png`,
    price: '0.00', note: 'يصلك على بريدك بعد الطلب',
    description: 'ما تحتاج تدفع ولا ريال عشان تطلع بفيديو احترافي! هذا الدليل المجاني يعلّمك كيف تحسّن جودة الفيديوهات اللي تصورها بجوالك، بخطوات بسيطة وأدوات متاحة مجانًا للكل. ابدأ فيه قبل لا تدفع في أي شي ثاني.',
  },
];

const servicesProducts = [
  {
    slug: 'cheap-account', name: 'إنشاء حساب رخيص السعر', subtitle: 'حساب إفريقي بشات خليجي — يمني أو أردني', price: '19.99', service: true,
    description: 'تبي تبدأ من جديد أو تضيف حساب ثاني من غير ما تدفع فيه فلوس كثير؟ عندنا حساب جاهز بسعر اقتصادي يعطيك بداية سريعة، بأقل تكلفة ممكنة.',
  },
  {
    slug: 'settings-fix', name: 'حل مشاكل الإعدادات والتحكم', subtitle: 'ضبط الحساسية والإعدادات بما يناسب أسلوب لعبك', price: '5.99', service: true,
    description: 'نضبط لك إعدادات التحكم والحساسية بما يناسب أسلوبك بالضبط، بخبرة عملية في كل التفاصيل اللي تفرق — من غير ما تضيّع وقتك تجرّب لحالك.',
  },
];

function money(v) {
  return Number(v).toFixed(2);
}

function card(p) {
  const img = p.image || `${IMG.replace('../BAV_Design', '../bav-store-theme/src/assets/images')}/placeholder.png`;
  const giftStyle = p.gift ? ' style="background:linear-gradient(160deg,#1A1208,#0F0F12 60%)"' : '';
  const giftImgStyle = p.gift ? ' style="background:radial-gradient(120% 100% at 50% 0%,#2A1409 0%,#0E0E11 60%)"' : '';
  // A zero price gets the "free" badge automatically — same rule as the
  // real theme's product-card.js, so a free product never needs p.badge
  // set by hand.
  const isFree = Number(p.price) === 0;
  const badge = p.gift ? `<span class="badge" style="background:linear-gradient(135deg,var(--accent),#FFB27A)">🎁 هدية</span>`
    : isFree ? `<span class="badge">مجانًا</span>`
    : p.badge ? `<span class="badge">${p.badge}</span>`
    : (p.digitalFile || p.service) ? `<span class="badge">تنفيذ سريع</span>` : '';
  const nameLine = p.unit
    ? `<div class="pname num">${p.name} <small>${p.unit}</small></div>`
    : `<div style="font-size:20px;font-weight:700;line-height:1.5">${p.name}</div>`;
  const sub = p.subtitle ? `<div class="psub">${p.subtitle}</div>` : '';
  const priceRow = p.oldPrice
    ? `<div class="prow"><span class="price num">${money(p.price)}</span><span class="cur">ر.س</span><s class="old">${money(p.oldPrice)}</s></div>`
    : p.startingFrom
    ? `<div class="prow"><span style="font-size:14px;color:#8E8E98">يبدأ من</span><span class="price num">${money(p.price)}</span><span class="cur">ر.س</span></div>`
    : `<div class="prow"><span class="price num">${money(p.price)}</span><span class="cur">ر.س</span>${p.note ? `<span style="margin-right:auto;font-size:13px;color:#8E8E98">${p.note}</span>` : ''}</div>`;
  const btnLabel = p.gift ? 'أهدِ الآن' : (p.unit ? 'اختر الفئة' : 'اطلب الخدمة');
  const noteLine = (!p.oldPrice && !p.startingFrom) ? '' : (p.note ? `<div style="font-size:12px;color:#8E8E98;margin-top:-6px">${p.note}</div>` : '');

  // Digital files show their own real cover image when the merchant has
  // uploaded one; services never have a product photo. Either way, a
  // missing image falls back to the same branded gradient treatment —
  // "PDF" for files, a generic service icon otherwise.
  const needsBrandedImage = (p.digitalFile || p.service) && !p.image;
  const imgBlock = needsBrandedImage
    ? `<div class="pimg" style="background:radial-gradient(120% 100% at 80% 0%,#2A1409 0%,#0E0E11 55%,#09090B 100%)">
        <div style="position:absolute;left:22px;bottom:22px;opacity:.07">${BAV_MARK_SVG}</div>
        <div style="position:absolute;inset:22px;border:1px solid #2E2E35;border-radius:16px"></div>
        <div style="position:absolute;top:44px;right:44px;left:44px;display:flex;flex-direction:column;gap:12px">
          ${p.digitalFile
            ? `<span class="num" style="font-size:44px;letter-spacing:.04em;color:var(--accent)">PDF</span>`
            : `<span style="color:var(--accent)">${SERVICE_ICON_SVG}</span>`}
          <div style="height:3px;width:64px;background:var(--accent)"></div>
          <span class="disp" style="font-size:22px;line-height:1.5;color:#E8E8EC;max-width:240px">${p.name}</span>
        </div>
        ${badge}
      </div>`
    // "Battle Pass + 2400 CP" shares its cover photo with "Battle Pass
    // Bundle" (no distinct combo photography exists yet — flagged in
    // طلبات_صاحب_المتجر.md) which made the two cards look like duplicates.
    // Until a real combo cover arrives, a coin-stack chip (built from the
    // same real coin-render asset used elsewhere) marks what's actually
    // different about this one, instead of leaving two identical-looking
    // cards for two different products.
    : `<div class="pimg${p.digitalFile ? ' pimg--contain' : ''}"${giftImgStyle}><img src="${img}" alt="${p.name}" loading="lazy">${badge}
        ${p.slug === 'battle-pass-2400-combo' ? `<span style="position:absolute;bottom:14px;left:14px;display:flex;align-items:center;gap:6px;padding:5px 11px 5px 6px;border-radius:999px;background:rgba(10,10,11,.75);border:1px solid #34343B;backdrop-filter:blur(6px)"><img src="${IMG}/06_coin_only_renders/CP_80.webp" alt="" style="width:18px;height:18px;object-fit:contain" aria-hidden="true"><span class="num" style="font-size:13px;color:#fff">+2,400 CP</span></span>` : ''}
      </div>`;

  return `
    <a href="product-${p.slug}.html" class="pcard"${giftStyle}>
        ${imgBlock}
        <div class="pbody">
            ${nameLine}
            ${sub}
            ${priceRow}
            ${noteLine}
            ${p.digitalFile ? `<div style="font-size:12px;color:#8E8E98;margin-top:-6px">ملاحظة: الملفات الرقمية غير قابلة للاسترجاع.</div>` : ''}
            <div class="pbtn">${btnLabel}</div>
        </div>
    </a>`;
}

function section(products) {
  return products.map(card).join('\n');
}

// A representative product for the standalone product-page preview — real
// theme markup/components, trial data only (real products live in Salla admin).
const productPreview = {
  id: 1001,
  name: 'شحن 2400 CP',
  subtitle: null,
  description: '<p>شحن عملات CP بمعرّف اللاعب فقط، بدون الحاجة لكلمة سر حسابك.</p>',
  url: 'product.html',
  type: 'codes',
  status: 'sale',
  price: 84.00,
  sale_price: 84.00,
  regular_price: 89.99,
  starting_price: null,
  quantity: null,
  sold_quantity: 0,
  max_quantity: 5,
  is_taxable: true,
  category: { name: 'فئات CP', url: 'index.html#choose-game' },
  images: [
    { id: 'pr1', url: `${IMG}/02_product_images/CP_2400.webp`, alt: 'شحن 2400 CP' },
    { id: 'pr2', url: `${IMG}/06_coin_only_renders/CP_880.webp`, alt: '880 CP' },
    { id: 'pr3', url: `${IMG}/02_product_images/Battle_Pass.webp`, alt: 'Battle Pass' },
  ],
  tags: [],
  rating: { count: 128, stars: 5 },
  has_read_more: false,
  can_add_note: false,
  can_upload_file: false,
  has_metadata: false,
  has_options: true,
  is_on_sale: true,
  is_hidden_quantity: false,
  is_require_shipping: false,
  base_currency_price: 84.00,
  discount_percentage: '7%',
  is_giftable: false,
  add_to_cart_label: 'أضف للسلة',
  currency: 'SAR',
};

// Visual stand-in for <salla-slider> (inert outside a live store): the big
// image + thumbnail grid, built from the same product.images the real
// component would receive. Digital files have no photo in the approved
// design, so their "gallery" is the same watermark treatment as their card.
function productGallery(product) {
  const images = product.images || [];
  if (!images.length) {
    return `
    <div style="position:relative;border-radius:26px;overflow:hidden;border:1px solid #232329;aspect-ratio:4/3;background:radial-gradient(120% 100% at 80% 0%,#2A1409 0%,#0E0E11 55%,#09090B 100%)">
      <div style="position:absolute;left:28px;bottom:28px;opacity:.07">${BAV_MARK_SVG}</div>
      <div style="position:absolute;inset:28px;border:1px solid #2E2E35;border-radius:18px"></div>
      <div style="position:absolute;top:56px;right:56px;left:56px;display:flex;flex-direction:column;gap:14px">
        ${product.type === 'digital'
          ? `<span class="num" style="font-size:54px;letter-spacing:.04em;color:var(--accent)">PDF</span>`
          : `<span style="color:var(--accent)">${SERVICE_ICON_SVG}</span>`}
        <div style="height:3px;width:80px;background:var(--accent)"></div>
        <span class="disp" style="font-size:28px;line-height:1.5;color:#E8E8EC;max-width:320px">${product.name}</span>
      </div>
    </div>`;
  }
  const main = images[0];
  // The real <salla-slider> uses `auto-height` and sizes itself to whatever
  // the image's natural ratio is — this static stand-in has to pick a fixed
  // ratio instead. Digital covers are a known 16:9 banner; forcing them into
  // the usual 4:3 product-photo box is exactly what left the big empty
  // black bars the merchant flagged, so match the cover's real ratio.
  const isDigital = product.type === 'digital';
  const fit = isDigital ? 'contain' : 'cover';
  const ratio = isDigital ? '16/9' : '4/3';
  // Real single.twig now always appends the fixed, theme-wide player-ID
  // schematic as the second (and last) gallery slide - mirror that here so
  // the preview matches what actually ships, instead of this stand-in's
  // old behaviour of just echoing however many mock images a product had.
  const explainerSlide = product.isGiftProduct
    ? { url: '../bav-store-theme/public/images/recipient-id-schematic.svg', alt: 'آيدي صديقك: روح لقائمة أصدقائك، افتح ملف صديقك، وانسخ الآيدي' }
    : { url: '../bav-store-theme/public/images/player-id-schematic.svg', alt: 'رسم توضيحي يوضح مكان معرّف اللاعب' };
  const slides = [main, explainerSlide];
  const thumbs = slides.map((img, i) => `
      <div class="thumb${i === 0 ? ' on' : ''}"><img src="${img.url}" alt="${img.alt}" style="${i === 1 ? 'object-fit:contain;background:#101014' : ''}"></div>`).join('');
  return `
    <div style="position:relative;border-radius:26px;overflow:hidden;border:1px solid #232329;aspect-ratio:${ratio};background:#09090B">
      <img src="${main.url}" alt="${main.alt}" style="width:100%;height:100%;object-fit:${fit};display:block">
      ${product.is_on_sale ? `<span class="save num" dir="ltr" style="position:absolute;top:16px;left:16px">-${product.discount_percentage}</span>` : ''}
    </div>
    <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:14px">${thumbs}
    </div>`;
}

// Converts a simple card-shape mock product into the full Product context
// shape product/single.twig expects, so every card can open its OWN
// standalone preview page instead of all of them sharing one.
const SECTION_META = {
  game: { type: 'codes', category: 'فئات CP', anchor: '#choose-game', idBase: 1000 },
  doubleCp: { type: 'codes', category: 'الدبل CP', anchor: '#double-cp', idBase: 2000 },
  doubleCpGift: { type: 'codes', category: 'إهداء الدبل CP', anchor: '#double-cp-gift', idBase: 3000 },
  digitalFiles: { type: 'digital', category: 'الملفات الرقمية', anchor: '#digital-files', idBase: 4000 },
  services: { type: 'service', category: 'الخدمات', anchor: '#services', idBase: 5000 },
};

function money(v) { return Number(v || 0); }

function toProductContext(p, sectionKey, index) {
  const meta = SECTION_META[sectionKey];
  const price = money(p.price);
  const oldPrice = p.oldPrice ? money(p.oldPrice) : null;
  const isOnSale = !!oldPrice;
  const discountPercentage = isOnSale ? `${Math.round((1 - price / oldPrice) * 100)}%` : null;
  const fullName = p.unit ? `${p.name} ${p.unit}` : p.name;

  // Real, per-product marketing copy where it's been written (p.description
  // on the mock item); a plain generic fallback otherwise so nothing ever
  // renders empty.
  let description;
  if (p.description) {
    description = `<p>${p.description}</p>`;
  } else if (meta.type === 'digital') {
    description = '<p>ملف رقمي يصلك على بريدك الإلكتروني بعد إتمام الطلب. لا حاجة لأي بيانات حساب.</p>';
  } else if (p.gift) {
    description = '<p>إهداء الدبل CP لحساب آخر — تدخل آيدي المستلم بدل معرّفك الخاص، ويُنفَّذ الطلب على نفس الحساب المُدخل.</p>';
  } else if (meta.type === 'service') {
    description = `<p>${p.subtitle || ''}</p>`;
  } else {
    description = '<p>شحن بمعرّف اللاعب فقط، بدون الحاجة لكلمة سر حسابك.</p>';
  }

  return {
    id: meta.idBase + index,
    name: fullName,
    subtitle: p.subtitle || null,
    description,
    url: `product-${p.slug}.html`,
    type: meta.type,
    status: 'sale',
    price,
    sale_price: price,
    regular_price: isOnSale ? oldPrice : price,
    starting_price: p.startingFrom ? price : null,
    quantity: null,
    sold_quantity: 0,
    max_quantity: 5,
    is_taxable: true,
    category: { name: meta.category, url: `index.html${meta.anchor}` },
    images: p.image ? [{ id: `${sectionKey}-${index}`, url: p.image, alt: fullName }] : [],
    tags: [],
    rating: null,
    has_read_more: false,
    can_add_note: false,
    can_upload_file: false,
    has_metadata: false,
    has_options: meta.type === 'codes' || meta.type === 'digital',
    // Non-empty only so the real {% if product.options|length %} guard in
    // options.twig renders <salla-product-options> at all during preview -
    // the mock swap below replaces its contents either way.
    options: (meta.type === 'codes' || meta.type === 'digital') ? [{}] : [],
    is_on_sale: isOnSale,
    is_hidden_quantity: false,
    is_require_shipping: false,
    base_currency_price: price,
    discount_percentage: discountPercentage,
    is_giftable: false,
    add_to_cart_label: p.gift ? 'أهدِ الآن' : (meta.type === 'service' ? 'اطلب الخدمة' : 'أضف للسلة'),
    currency: 'SAR',
    // Preview-only flag (not a real Salla field) so the mock options block
    // below knows whether to label the identifier field "معرّف" or "آيدي".
    isGiftProduct: !!p.gift,
  };
}

// Visual stand-in for <salla-product-options> (also inert outside a live
// store): the merchant adds these as real, required "text" options per
// product from Salla admin — this just shows what that looks like once
// configured, styled like the approved reference's Player ID field, so it's
// not just guessed at blind. Not shipped; the real component renders here
// in production and already blocks add-to-cart until required fields are
// filled in, with zero extra theme code needed.
function renderOptionFieldsPreview(product) {
  const fields = [];
  if (product.type === 'digital') {
    fields.push({ label: 'البريد الإلكتروني لاستلام الملف', placeholder: 'name@example.com', dir: 'ltr' });
  } else if (product.type === 'codes') {
    fields.push(
      product.isGiftProduct
        ? { label: 'آيدي المستلم (Recipient ID)', placeholder: '6742910358918', dir: 'ltr' }
        : { label: 'معرّف اللاعب (Player ID)', placeholder: '4PHMKA', dir: 'ltr' }
    );
  }
  if (!fields.length) return '';

  const rows = fields.map((f) => `
    <div style="margin-bottom:18px">
      <label style="display:block;font-weight:700;font-size:15px;margin-bottom:10px">${f.label} <span style="font-size:12px;font-weight:700;padding:4px 12px;border-radius:999px;background:rgba(255,90,31,.14);color:var(--accent);margin-right:8px">مطلوب</span></label>
      <input class="field" type="text" dir="${f.dir}" placeholder="${f.placeholder}" style="${f.dir === 'rtl' ? 'font-family:inherit;font-weight:500;letter-spacing:0;font-size:16px;text-align:right' : ''}">
    </div>`).join('');

  return `<div style="margin-bottom:8px">${rows}</div>`;
}

// Every product that appears on the homepage, flattened with its own
// standalone-page context, so each card's link opens a page with its own
// data instead of all of them converging on one representative product.
const allProductPages = [
  ...gameProducts.map((p, i) => ({ slug: p.slug, context: toProductContext(p, 'game', i) })),
  ...doubleCpProducts.map((p, i) => ({ slug: p.slug, context: toProductContext(p, 'doubleCp', i) })),
  ...doubleCpGiftProducts.map((p, i) => ({ slug: p.slug, context: toProductContext(p, 'doubleCpGift', i) })),
  ...digitalFilesProducts.map((p, i) => ({ slug: p.slug, context: toProductContext(p, 'digitalFiles', i) })),
  ...servicesProducts.map((p, i) => ({ slug: p.slug, context: toProductContext(p, 'services', i) })),
];

// "العروض" homepage section - whichever existing mock products already
// carry a real oldPrice (same products, not separately invented ones).
const offersProducts = [...gameProducts, ...doubleCpProducts].filter((p) => p.oldPrice);

module.exports = {
  gameProducts,
  doubleCpProducts,
  doubleCpGiftProducts,
  digitalFilesProducts,
  servicesProducts,
  offersProducts,
  renderSection: section,
  productPreview,
  productGallery,
  allProductPages,
  renderOptionFieldsPreview,
};

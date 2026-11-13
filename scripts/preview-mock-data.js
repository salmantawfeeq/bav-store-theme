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

// Wrapped-box ribbon overlay for gift products - a cross of ribbon bands
// (sized in CSS as % of the image, see .bav-gift-ribbon in bav.scss) plus
// this bow at the center. Identical markup also lives in product-card.js
// and single.twig for the real theme - keep all three in sync if changed.
const GIFT_RIBBON_HTML = `<div class="bav-gift-ribbon" aria-hidden="true">
  <span class="bav-gift-ribbon__v"></span>
  <span class="bav-gift-ribbon__h"></span>
  <span class="bav-gift-ribbon__bow"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 52C38 34 12 32 8 48c-3 14 16 20 42 4Z" fill="#D7352B"/>
    <path d="M50 52C62 34 88 32 92 48c3 14-16 20-42 4Z" fill="#D7352B"/>
    <path d="M50 52C40 40 20 39 14 48c-2 6 8 10 36 4Z" fill="#fff" opacity=".18"/>
    <path d="M50 52C60 40 80 39 86 48c2 6-8 10-36 4Z" fill="#000" opacity=".15"/>
    <path d="M44 58L38 94L48 84Z" fill="#A61B12"/>
    <path d="M56 58L62 94L52 84Z" fill="#A61B12"/>
    <rect x="42" y="42" width="16" height="16" rx="3" fill="#A61B12" transform="rotate(45 50 50)"/>
    <rect x="42" y="42" width="16" height="16" rx="3" fill="none" stroke="#7A1210" stroke-width="1.5" transform="rotate(45 50 50)"/>
  </svg></span>
</div>`;

const gameProducts = [
  // Six CP tiers per the store owner's hand-drawn product map (قسم عملات لـ
  // CP > "* الفئات:") and the trial prices already agreed in
  // برومبت_بناء_موقع_Bav.md section 13 - each a standalone product, not
  // options on one shared product (per the earlier decision logged in
  // طلبات_صاحب_المتجر.md point 1).
  {
    slug: 'cp-80', name: '80', unit: 'CP',
    subtitle: 'بمعرّف اللاعب',
    image: `${IMG}/02_product_images/CP_80.webp`,
    price: '3.50', oldPrice: '3.69',
    description: 'أصغر فئة شحن عندنا، مثالية لو تبي تجرّب أو تحتاج رصيد سريع. أدخل معرّف اللاعب بس، وما نطلب أي بيانات دخول لحسابك أبدًا.',
  },
  {
    slug: 'cp-420', name: '420', unit: 'CP',
    subtitle: 'بمعرّف اللاعب',
    image: `${IMG}/02_product_images/CP_420.webp`,
    price: '17.00', oldPrice: '17.99',
    description: 'رصيد أكبر بسعر يناسب الاستخدام المتوسط. أدخل معرّف اللاعب بس، وخلك مطمئن — ما نطلب أي بيانات دخول لحسابك أبدًا.',
  },
  {
    slug: 'cp-880', name: '880', unit: 'CP',
    subtitle: 'بمعرّف اللاعب',
    image: `${IMG}/02_product_images/CP_880.webp`,
    price: '34.00', oldPrice: '36.99',
    description: 'فئة وسط لو تبي رصيد يكفيك فترة أطول من غير ما تدفع في الفئات الكبيرة. أدخل معرّف اللاعب بس ويوصلك الشحن بعد تأكيد الدفع.',
  },
  {
    slug: 'cp-2400', name: '2,400', unit: 'CP',
    subtitle: 'بمعرّف اللاعب',
    image: `${IMG}/02_product_images/CP_2400.webp`,
    price: '84.00', oldPrice: '89.99', badge: 'الأكثر مبيعًا',
    description: 'الفئة الأكثر طلبًا عندنا — توازن ممتاز بين الكمية والسعر. أدخل معرّف اللاعب بس، وما نطلب أي بيانات دخول لحسابك أبدًا.',
  },
  {
    slug: 'cp-5000', name: '5,000', unit: 'CP',
    subtitle: 'بمعرّف اللاعب',
    image: `${IMG}/02_product_images/CP_5000.webp`,
    price: '172.00', oldPrice: '184.99',
    description: 'رصيد كبير لمن يحتاج شحن بكميات أكبر بسعر أوفر نسبيًا من الفئات الصغيرة. أدخل معرّف اللاعب بس ويوصلك الشحن فور تأكيد الدفع.',
  },
  {
    slug: 'cp-10800', name: '10,800', unit: 'CP',
    subtitle: 'بمعرّف اللاعب',
    image: `${IMG}/02_product_images/CP_10800.webp`,
    price: '345.00', oldPrice: '369.99', badge: 'أفضل قيمة',
    description: 'أكبر فئة شحن عندنا وأفضلها من ناحية القيمة مقابل السعر. أدخل معرّف اللاعب بس، وما نطلب أي بيانات دخول لحسابك أبدًا.',
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
    // Battle Pass and Battle Pass Bundle). Had no real combo photography
    // and was reusing Battle Pass Bundle's cover - designed a distinct
    // branded cover instead so it doesn't read as a duplicate product.
    // Final price still trial until the merchant sets one.
    slug: 'battle-pass-2400-combo', name: 'Battle Pass + 2400 CP',
    subtitle: 'بمعرّف اللاعب',
    image: '../bav-store-theme/public/images/battle-pass-2400-combo-cover.svg',
    price: '78.00', oldPrice: null,
    description: 'باقة وحدة تجمع لك تفعيل الباتل باس مع رصيد من عملات CP — توفير حقيقي في السعر والوقت، بدل ما تطلب كل وحدة لحالها.',
  },
];

const doubleCpProducts = [
  // Six tiers per صاحب المتجر's confirmed Double CP price table (طلبات_
  // صاحب_المتجر.md, "أسعار عملات الدبل" - these are the cost/source prices
  // he gave; he separately flagged wanting extra margin on the GIFT version
  // specifically before going live, so treat these as the trial sale prices
  // for now, same as every other trial price in this file).
  { slug: 'double-cp-160', name: '160', unit: 'CP', image: `${IMG}/06_coin_only_renders/CP_80.webp`, price: '3.69', subtitle: '+5 Bonus Strongboxes' },
  { slug: 'double-cp-800', name: '800', unit: 'CP', image: `${IMG}/06_coin_only_renders/CP_420.webp`, price: '17.99', subtitle: '+10 Bonus Strongboxes' },
  { slug: 'double-cp-1600', name: '1,600', unit: 'CP', image: `${IMG}/06_coin_only_renders/CP_880.webp`, price: '36.99', subtitle: '+15 Bonus Strongboxes' },
  { slug: 'double-cp-4000', name: '4,000', unit: 'CP', image: `${IMG}/06_coin_only_renders/CP_2400.webp`, price: '89.99', subtitle: '+20 Bonus Strongboxes' },
  { slug: 'double-cp-8000', name: '8,000', unit: 'CP', image: `${IMG}/06_coin_only_renders/CP_5000.webp`, price: '184.99', subtitle: '+60 Bonus Mythic Coins' },
  { slug: 'double-cp-16000', name: '16,000', unit: 'CP', image: `${IMG}/06_coin_only_renders/CP_10800.webp`, price: '369.99', subtitle: '+120 Bonus Mythic Coins' },
].map((p) => ({
  ...p,
  description: `تحب تاخذ ضعف رصيدك من CP بنفس السعر؟ أدخل معرّف اللاعب واشحن ${p.name} ${p.unit}، وتتضاعف الكمية تلقائيًا في حسابك فور تأكيد الدفع.`,
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
    // Both services had no real cover photo and fell back to the exact
    // same generic icon placeholder - designed each its own distinct
    // branded cover instead of leaving them visually identical.
    slug: 'cheap-account', name: 'إنشاء حساب', subtitle: 'حساب إفريقي بشات خليجي — يمني أو أردني', price: '19.99', service: true,
    image: '../bav-store-theme/public/images/service-cheap-account-cover.svg',
    description: 'تبي تبدأ من جديد أو تضيف حساب ثاني من غير ما تدفع فيه فلوس كثير؟ عندنا حساب جاهز بسعر اقتصادي يعطيك بداية سريعة، بأقل تكلفة ممكنة.',
  },
  {
    // Real description text from صاحب المتجر (2026-11-13, "انسخه نفسه بالضبط")
    // - copied verbatim per his direct instruction, including the one "COD
    // Mobile" mention it contains (طلبات_صاحب_المتجر.md has the full note on
    // this conflicting with the no-game-name rule, same pattern as بند 15).
    slug: 'settings-fix', name: 'حل مشاكل الإعدادات والتحكم', subtitle: 'ضبط الحساسية والإعدادات بما يناسب أسلوب لعبك', price: '5.99', service: true,
    image: '../bav-store-theme/public/images/service-settings-fix-cover.svg',
    description: `<p>تواجهك مشكلة في إعدادات اللعبة أو التحكم؟</p>
<p>في متجر Bav نساعدك في حل المشاكل المتعلقة بإعدادات COD Mobile، وضبط خيارات التحكم والحساسية، وتخصيص الإعدادات بما يتناسب مع أسلوب لعبك.</p>
<p>إذا واجهتك مشكلة في الإعدادات أو ما عرفت تضبط خيار معيّن، تواصل معنا ونساعدك بقدر المستطاع في الوصول للحل المناسب.</p>
<p>قبل شراء الخدمة تأكد من أن المطلوب يدخل من ضمن "المشاكل التي تشملها الخدمة"، وحتى إن دخلت ضمن النطاق لا نضمن لك حل المشكلة تمامًا.</p>
<p><strong>المشاكل التي تشملها الخدمة:</strong></p>
<ul>
<li>مشاكل إطلاق النار والتصويب (ADS).</li>
<li>إعدادات الرسومات والجودة داخل اللعبة.</li>
<li>مشاكل تخصيص الأزرار والاستجابة للمس.</li>
<li>المساعدة في ضبط إعدادات تناسب أسلوب لعبك.</li>
<li>شرح وظيفة الخيارات الموجودة داخل إعدادات اللعبة.</li>
</ul>
<p><strong>الأشياء التي لا يشملها القسم:</strong></p>
<ul>
<li>الحظر (Ban) أو رفع الحظر عن الحسابات.</li>
<li>استرجاع الحسابات المسروقة أو المفقودة.</li>
<li>مشاكل الشحن أو نقاط CP والمشتريات.</li>
<li>مشاكل الاتصال بالإنترنت أو مزود الخدمة.</li>
<li>مشاكل نظام الجهاز نفسه أو أعطاله.</li>
<li>مشاكل التهنيق أو الكراش الناتجة عن الجهاز أو اللعبة.</li>
<li>استرجاع المشتريات أو التعويضات من Activision.</li>
<li>المشاكل التقنية العامة الناتجة عن تحديثات اللعبة والتي لا نملك صلاحية معالجتها.</li>
</ul>
<p>ملاحظة: يقتصر الدعم على المشاكل المتعلقة بإعدادات اللعبة والتحكم فقط. لا يشمل القسم مشاكل الحسابات أو السيرفرات أو الأعطال التقنية الخارجة عن نطاق إعدادات اللعبة، ولا نضمن إمكانية حل جميع المشاكل.</p>
<p>يتم التواصل معك عن طريق حساب التيك توك.</p>
<p>مدة تنفيذ الخدمة: من 30 دقيقة إلى 48 ساعة، ويمكن أن يتم التنفيذ قبل الحد الأدنى. ويعتمد اختلاف التوقيت على ضغط الطلبات، أو ساعات العمل. وفي حال تأخر التنفيذ أكثر من الحد الأقصى تواصل معنا وأبشر باللي يرضيك.</p>`,
  },
];

// Preview/testing only - no real weapons products exist yet (see the
// "weapons" SECTION_META entry above). Just enough to render one standalone
// page so the weapons-calculator mini-widget (single.twig) can be checked.
const weaponsProducts = [
  {
    slug: 'legendary-weapon', name: 'السلاح الأسطوري', subtitle: 'شحن عجلة السلاح الأسطوري بمعرّف اللاعب', price: '5.00', service: true,
    description: 'شحن عجلة فتح السلاح الأسطوري على حسابك، بمعرّف اللاعب فقط. استخدم الحاسبة تحت عشان تعرف بالظبط كام CP محتاج تشحنه.',
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
  // Gift products get the wrapped-ribbon overlay instead (see imgBlock
  // below) - it's unambiguous on its own, a text badge on top would be
  // redundant clutter.
  const badge = p.gift ? ''
    : isFree ? `<span class="badge">مجانًا</span>`
    : p.badge ? `<span class="badge">${p.badge}</span>`
    : (p.digitalFile || p.service) ? `<span class="badge">تنفيذ سريع</span>` : '';
  // Same "الدبل" category convention product-card.js/single.twig use, via
  // the mock product's own slug prefix (regular and gift Double CP tiers
  // both start with "double-cp").
  const isDoubleCp = (p.slug || '').startsWith('double-cp');
  const x2Badge = isDoubleCp ? `<span class="bav-x2-badge" aria-hidden="true">×2</span>` : '';
  const nameLine = p.unit
    ? `<div class="pname num">${p.name} <small>${p.unit}</small></div>`
    : `<div style="font-size:20px;font-weight:700;line-height:1.5">${p.name}</div>`;
  const sub = p.subtitle ? `<div class="psub">${p.subtitle}</div>` : '';
  const priceRow = p.oldPrice
    ? `<div class="prow"><span class="price num">${money(p.price)}</span><span class="cur">ر.س</span><s class="old">${money(p.oldPrice)}</s></div>`
    : p.startingFrom
    ? `<div class="prow"><span style="font-size:14px;color:#8E8E98">يبدأ من</span><span class="price num">${money(p.price)}</span><span class="cur">ر.س</span></div>`
    : `<div class="prow"><span class="price num">${money(p.price)}</span><span class="cur">ر.س</span>${p.note ? `<span style="margin-right:auto;font-size:13px;color:#8E8E98">${p.note}</span>` : ''}</div>`;
  // Matches the real card's actual fallback (salla.lang.get('pages.cart.add_to_cart')
  // = "أضف للسلة") per صاحب المتجر's request (بند 1) - "اختر الفئة" never
  // existed in the real product-card.js, only here in this older preview copy.
  const btnLabel = p.gift ? 'أهدِ الآن' : (p.service ? 'اطلب الخدمة' : 'أضف للسلة');
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
    : `<div class="pimg${p.digitalFile ? ' pimg--contain' : ''}"${giftImgStyle}><img src="${img}" alt="${p.name}" loading="lazy">${badge}${p.gift ? GIFT_RIBBON_HTML : ''}${x2Badge}
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
  // Real single.twig only appends the player ID / recipient ID schematic
  // for "codes" products (currency tiers, Battle Pass, Double CP) - those
  // are the only ones that actually ask for that field. Digital files ask
  // for an email instead and services have no fixed field at all, so
  // showing this schematic there was a leftover irrelevant second photo.
  const explainerSlide = product.type !== 'codes' ? null : product.isGiftProduct
    ? { url: '../bav-store-theme/public/images/recipient-id-schematic.svg', alt: 'معرّف المستلم: ادخل على الحساب الشخصي لصديقك، وانسخ الآيدي' }
    : { url: '../bav-store-theme/public/images/player-id-schematic.svg', alt: 'رسم توضيحي يوضح مكان معرّف اللاعب' };
  const slides = explainerSlide ? [main, explainerSlide] : [main];
  const thumbs = slides.map((img, i) => `
      <div class="thumb${i === 0 ? ' on' : ''}"><img src="${img.url}" alt="${img.alt}" style="${i === 1 ? 'object-fit:contain;background:#101014' : ''}"></div>`).join('');
  return `
    <div style="position:relative;border-radius:26px;overflow:hidden;border:1px solid #232329;aspect-ratio:${ratio};background:#09090B">
      <img src="${main.url}" alt="${main.alt}" style="width:100%;height:100%;object-fit:${fit};display:block">
      ${product.is_on_sale ? `<span class="save num" dir="ltr" style="position:absolute;top:16px;left:16px">-${product.discount_percentage}</span>` : ''}
      ${product.isGiftProduct ? GIFT_RIBBON_HTML : ''}
      ${(product.category?.name || '').includes('الدبل') ? '<span class="bav-x2-badge" aria-hidden="true">×2</span>' : ''}
    </div>
    ${slides.length > 1 ? `<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:14px">${thumbs}
    </div>` : ''}`;
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
  // No real weapons products exist yet (طلبات_صاحب_المتجر.md - still
  // pending from the merchant) - this single mock entry only exists so the
  // weapons calculator mini-widget (single.twig) has a real page to render
  // on for preview/testing, not a real Bav Store product.
  weapons: { type: 'service', category: 'شحن الأسلحة', anchor: '#weapons', idBase: 6000 },
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
    // Some descriptions (like settings-fix's real text) already ship as
    // full rich HTML (multiple <p>/<ul>/<li>) - wrapping those in another
    // <p> would nest block elements inside a <p>, which is invalid HTML.
    description = /^\s*<(p|ul|ol|div)[\s>]/i.test(p.description) ? p.description : `<p>${p.description}</p>`;
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
    // "إنشاء حساب" (email+phone) and "حل مشاكل الإعدادات والتحكم" (TikTok
    // username) are the two services with real required fields per صاحب
    // المتجر - every other service still has none.
    has_options: meta.type === 'codes' || meta.type === 'digital' || p.slug === 'cheap-account' || p.slug === 'settings-fix',
    // Real option names (not just an empty placeholder object) so single.twig's
    // OWN "المستلم" detection - real server-rendered twig logic, not something
    // the mock swap below replaces - actually runs the same way here as it
    // would against a real Salla product's options.
    options: p.gift
      ? [{ name: 'معرّف المستلم (Recipient ID)', placeholder: 'UID: 7295435626912859009' }]
      : meta.type === 'codes'
        ? [{ name: 'معرّف اللاعب (Player ID)', placeholder: '4PHMKA' }]
        : meta.type === 'digital'
          ? [{ name: 'البريد الإلكتروني لاستلام الملف', placeholder: 'name@example.com' }]
          : p.slug === 'cheap-account'
            ? [
                { name: 'البريد الإلكتروني (غير مستخدم أبدًا على أي حساب Activision آخر)', placeholder: 'name@example.com' },
                { name: 'رقم جوالك (للتواصل وتسليم الحساب وكلمة المرور)', placeholder: '05xxxxxxxx' },
              ]
            : p.slug === 'settings-fix'
              ? [{ name: 'اسم المستخدم في تيك توك', placeholder: '@username' }]
              : [],
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
        ? { label: 'معرّف المستلم (Recipient ID)', placeholder: 'UID: 7295435626912859009', dir: 'ltr' }
        : { label: 'معرّف اللاعب (Player ID)', placeholder: '4PHMKA', dir: 'ltr' }
    );
  } else if (product.url === 'product-cheap-account.html') {
    // Per صاحب المتجر's direct request (2026-11-12): this one service, not
    // services in general, needs these two fields so he can personally
    // deliver the finished account and password afterwards.
    fields.push(
      { label: 'البريد الإلكتروني (غير مستخدم أبدًا على أي حساب Activision آخر)', placeholder: 'name@example.com', dir: 'ltr' },
      { label: 'رقم جوالك (للتواصل وتسليم الحساب وكلمة المرور)', placeholder: '05xxxxxxxx', dir: 'ltr' }
    );
  } else if (product.url === 'product-settings-fix.html') {
    // Per صاحب المتجر's direct request (2026-11-13): support for this
    // service happens over the store's TikTok account, so it needs the
    // shopper's own TikTok username to reach them.
    fields.push({ label: 'اسم المستخدم في تيك توك', placeholder: '@username', dir: 'ltr' });
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
  ...weaponsProducts.map((p, i) => ({ slug: p.slug, context: toProductContext(p, 'weapons', i) })),
];

// "العروض" homepage section - one standout per section (not all from the
// same category, which read as a duplicate of "اختر عملاتك" right below
// it when every slot happened to be a currency tier). Trial picks only;
// the merchant chooses the real 4 from theme settings.
const offersProducts = [
  gameProducts.find((p) => p.slug === 'cp-2400'),
  gameProducts.find((p) => p.slug === 'battle-pass-bundle'),
  digitalFilesProducts.find((p) => p.slug === 'guide-views'),
  servicesProducts.find((p) => p.slug === 'cheap-account'),
].filter(Boolean);

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

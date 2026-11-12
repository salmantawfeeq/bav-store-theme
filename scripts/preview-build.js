#!/usr/bin/env node
/**
 * Generates bav-preview/*.html FROM THE REAL theme Twig files + twilight.json + locales.
 * Single source of truth: edit src/views/**.twig, twilight.json, src/locales/*.json —
 * never edit the generated HTML directly.
 */
const fs = require('fs');
const path = require('path');
const Twig = require('twig');
// require() caches modules - fine for a one-shot run, but in --watch mode
// this file never re-requires preview-mock-data.js, so any edit there
// (product copy, mock prices, etc.) silently kept rendering the stale
// version already in memory until this whole process was restarted. Same
// root cause as the twilight.json/locale staleness fixed above - reload()
// busts the cache and re-requires it fresh on every build() call instead.
let mock;
function reloadMock() {
  delete require.cache[require.resolve('./preview-mock-data')];
  mock = require('./preview-mock-data');
}
reloadMock();

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const PREVIEW_DIR = path.join(ROOT, '..', 'bav-preview');

// ---------- twilight.json settings, locales -> re-read fresh on every build ----------
// These used to be plain top-level consts, read ONCE when this process
// first started. That's invisible in one-shot runs (`node preview-build.js`
// always starts a fresh process) but in --watch mode this same long-lived
// process just re-ran build() on every file change WITHOUT ever re-reading
// twilight.json/locales from disk again - so any setting or translation key
// added/edited after the watcher started kept silently rendering its stale
// (often missing) value, looking exactly like raw [[key]] leaks or dead
// links that a one-shot rebuild would "fix" only until the watcher's next
// auto-rebuild quietly reverted it. load() now reruns at the top of every
// single build(), one-shot or watch-triggered alike.
let twilightJson, settingsMap, ar;
function load() {
  reloadMock();
  twilightJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'twilight.json'), 'utf8'));
  settingsMap = {};
  for (const s of twilightJson.settings || []) {
    if (s.type === 'items' && s.format === 'dropdown-list') {
      settingsMap[s.id] = s.selected && s.selected.length ? s.selected : [];
    } else if (s.value !== undefined) {
      settingsMap[s.id] = s.value;
    } else {
      settingsMap[s.id] = null;
    }
  }

  // Real product selections are made by the merchant in Salla admin and don't
  // live in this repo — but we need *something* non-empty here so the {% if %}
  // guards in index.twig render the sections during local preview. The actual
  // cards are swapped in afterwards from preview-mock-data.js (real design
  // assets + the trial prices from طلبات_صاحب_المتجر.md).
  const PREVIEW_SECTION_KEYS = [
    'offers_products',
    'game_products',
    'double_cp_products',
    'double_cp_gift_products',
    'digital_files_products',
    'services_products',
  ];
  for (const key of PREVIEW_SECTION_KEYS) {
    if (!settingsMap[key] || !settingsMap[key].length) {
      // 4 placeholders, not 1 - index.twig's "اكتشف أكثر" buttons only show
      // once a section has more than 3 selected products (so the button
      // doesn't appear for a section that's already showing everything);
      // this array's LENGTH is what that check reads (the actual displayed
      // cards still come from preview-mock-data.js's real curated lists
      // below, completely unaffected by this count).
      settingsMap[key] = [{ value: 'preview-placeholder' }, { value: 'preview-placeholder' }, { value: 'preview-placeholder' }, { value: 'preview-placeholder' }];
    }
  }
  if (!settingsMap.hero_image) {
    settingsMap.hero_image = '__PREVIEW_HERO__';
  }

  // The "see more" buttons under each homepage section, and the links to the
  // dedicated info pages, are intentionally hidden on the real live store
  // until Salman pastes a real URL into these settings (there's no store on
  // Salla yet to have real category/page links for) - but that also means
  // they'd never be visible in THIS local preview either, so give them a
  // placeholder value here only, purely so the design can be reviewed now.
  // Each of these points at the actual local page built for it, so clicking
  // through in the preview really navigates somewhere instead of a dead "#" -
  // the 6 category ones share category.html since there's no per-section
  // category mock built (there's nothing real to show per-category yet).
  const PREVIEW_LINK_TARGETS = {
    offers_category_url: 'category-offers.html',
    currency_category_url: 'category.html',
    double_cp_category_url: 'category-double-cp.html',
    double_cp_gift_category_url: 'category-double-cp-gift.html',
    digital_files_category_url: 'category-digital-files.html',
    services_category_url: 'category-services.html',
    // No real weapons products/mock data exists yet (طلبات_صاحب_المتجر.md -
    // still pending from the merchant), so there's nothing of its own to
    // show; falls back to the general category page rather than a made-up
    // product list.
    weapons_category_url: 'category.html',
    find_id_page_url: 'find-id.html',
    faq_page_url: 'faq-full.html',
    about_page_url: 'about.html',
  };
  for (const key in PREVIEW_LINK_TARGETS) {
    if (!settingsMap[key]) settingsMap[key] = PREVIEW_LINK_TARGETS[key];
  }

  ar = JSON.parse(fs.readFileSync(path.join(SRC, 'locales/ar.json'), 'utf8'));
}
load();
// Base Salla platform strings this theme doesn't redefine locally (they come
// from Salla's own locale bundle on the real store) — only used so the local
// static preview doesn't show raw [[key]] placeholders for them.
const SALLA_BASE_STRINGS = {
  'pages.products.price': 'السعر',
  'pages.products.quantity': 'الكمية',
  'pages.products.tax_included': 'السعر شامل الضريبة',
  'pages.products.out_of_stock': 'نفذت الكمية',
  'pages.products.starting_price': 'يبدأ من',
  'pages.products.similar_products': 'قد يعجبك أيضًا',
  'pages.products.sku': 'رمز المنتج',
  'pages.products.barcode': 'الباركود',
  'pages.products.sold': 'تم بيع',
  'pages.products.remained': 'الكمية المتبقية',
  'pages.categories.sorting': 'ترتيب حسب',
  'pages.cart.total': 'الإجمالي',
  'pages.cart.free_shipping': 'الشحن المجاني',
  'pages.cart.free_shipping_alert': 'أضف :amount لتحصل على شحن مجاني',
  'pages.cart.gift_widget_title': 'أهدِ طلبك',
  'pages.loyalty_program.free_product': 'منتج مجاني',
  'pages.products.weight': 'الوزن',
};
function transLookup(key, params) {
  const parts = key.split('.');
  let node = ar;
  for (const p of parts) {
    if (node == null) break;
    node = node[p];
  }
  let str = typeof node === 'string' ? node : (SALLA_BASE_STRINGS[key] || `[[${key}]]`);
  if (params) {
    for (const k in params) str = str.split(':' + k).join(params[k]);
  }
  return str;
}

// ---------- Twig.js custom filters/functions ----------
Twig.extendFilter('asset', (value) => `../bav-store-theme/public/${value}`);
Twig.extendFilter('cdn', (value) => {
  if (value === '__PREVIEW_HERO__') return '../BAV_Design/03_hero/Hero_soldier.webp';
  if (!value) return '../bav-store-theme/src/assets/images/placeholder.png';
  if (/^https?:\/\//.test(value) || value.startsWith('..')) return value;
  // Salla's own global assets (icon font, etc.) live on Salla's CDN on a
  // real store, not in this theme's public/ folder - point the local
  // preview there too instead of 404ing against our own public/ dir.
  if (value.startsWith('fonts/sallaicons')) return `https://cdn.salla.network/${value}`;
  return `../bav-store-theme/public/${value}`;
});
Twig.extendFilter('money', (value) => `${Number(value || 0).toFixed(2)} ر.س`);
Twig.extendFunction('trans', (key, params) => transLookup(key, params));
Twig.extendFunction('is_page', (slug) => slug === 'index');
Twig.extendFunction('link', (p) => p || '#');

// ---------- render context ----------
function baseContext() {
  return {
    theme: {
      settings: {
        get: (key, def) => {
          const v = settingsMap[key];
          return v === undefined || v === null || v === '' ? (def !== undefined ? def : null) : v;
        },
        set: () => '',
      },
      is_rtl: true,
    },
    store: {
      url: 'index.html',
      name: 'Bav Store',
      logo: null,
      description: '',
      settings: { tax: {}, rating: { show_on_product: false } },
      scope: null,
    },
    language: { code: 'ar' },
    page: { slug: 'index', title: '' },
    user: { can_access_wallet: false },
    gifting_intro: '',
    // Non-zero on purpose: proves the rewards ladder reads this real,
    // globally-available header-context field for its initial state
    // instead of always starting at 0 until salla.cart.event.onUpdated
    // fires once client-side (which never happens for a returning visitor
    // who already has items in their cart before this page even loads).
    cart: { total: '185.50 ر.س', items_count: 2 },
  };
}

function readSrc(relPath) {
  return fs.readFileSync(path.join(SRC, relPath), 'utf8');
}

function stripHooks(str) {
  // `{% component '...' %}` is a Twilight-specific tag Twig.js's core parser
  // doesn't know at all (unlike our registered trans/is_page/link
  // functions) - it fails to even parse, not just evaluate, so any one
  // besides header.header/footer.footer (spliced in separately, before
  // this ever runs) has to be stripped rather than left for Twig to choke
  // on, the same way an unsupported {% hook %} tag already is.
  return str
    .replace(/\{%\s*hook[^%]*%\}/g, '')
    .replace(/\{%\s*component\s+'[^']*'\s*%\}/g, '');
}

// We don't register templates with Twig.js's own loader (layouts/components
// are spliced in manually below) - so a real `{% include 'dotted.id' %}`
// would fail to resolve. Dotted ids map 1:1 to view file paths, so inline
// the referenced partial's source instead, same as header/footer already are.
// `with {product: item}` (cart.twig includes the same options partial twice,
// once per loop, each aliasing a different variable to `product`) becomes a
// `{% set product = item %}` prefix so the inlined partial's own `product.*`
// references resolve to whatever was actually passed in.
function resolveIncludes(str, seen) {
  seen = seen || new Set();
  return str.replace(/\{%\s*include\s+'([^']+)'\s*(?:with\s*(\{[^}]*\}))?\s*%\}/g, (_match, tplId, withClause) => {
    // Guards against a genuine circular include (A includes A); siblings at
    // the same level (the two separate options.twig includes in cart.twig)
    // must NOT share this set, or the second one would wrongly come back
    // empty just for having the same template id as the first.
    if (seen.has(tplId)) return '';
    const nextSeen = new Set(seen);
    nextSeen.add(tplId);
    try {
      const relPath = 'views/' + tplId.replace(/\./g, '/') + '.twig';
      let partial = resolveIncludes(stripHooks(readSrc(relPath)), nextSeen);
      if (withClause) {
        const assigns = withClause.slice(1, -1).split(',').map((pair) => {
          const [k, v] = pair.split(':').map((s) => s.trim());
          return k && v ? `{% set ${k} = ${v} %}` : '';
        }).join('');
        partial = assigns + partial;
      }
      return partial;
    } catch (e) {
      return '';
    }
  });
}

function extractBlock(str, blockName) {
  const re = new RegExp(`\\{%\\s*block\\s+${blockName}\\s*%\\}([\\s\\S]*?)\\{%\\s*endblock\\s*%\\}`);
  const m = str.match(re);
  return m ? m[1] : '';
}

function buildPageHtml(pageTwigRelPath, pageSlugLabel, contextOverrides, categoryProducts) {
  const context = Object.assign(baseContext(), contextOverrides);
  let pageSrc = readSrc(pageTwigRelPath);
  pageSrc = pageSrc.replace(/\{%\s*extends[^%]*%\}/, '');

  const content = resolveIncludes(stripHooks(extractBlock(pageSrc, 'content')));
  const scripts = extractBlock(pageSrc, 'scripts');
  const styles = extractBlock(pageSrc, 'styles');

  // header.header/footer.footer have to be spliced in BEFORE stripHooks runs
  // on master - stripHooks also removes any {% component %} tag it doesn't
  // know how to render (same reason {% component 'home.testimonials' %}
  // needed stripping), so running it first would delete these two tags
  // before the replace() calls below ever got a chance to match them,
  // silently dropping the header and footer from every generated page.
  const headerTwig = stripHooks(readSrc('views/components/header/header.twig'));
  const footerTwig = stripHooks(readSrc('views/components/footer/footer.twig'));

  let master = readSrc('views/layouts/master.twig');
  master = master.replace(/\{%\s*component\s+'header\.header'\s*%\}/, () => headerTwig);
  master = master.replace(/\{%\s*component\s+'footer\.footer'\s*%\}/, () => footerTwig);
  master = stripHooks(master);
  master = master.replace(/\{%\s*block\s+head_scripts\s*%\}\{%\s*endblock\s*%\}/, '');
  master = master.replace(/\{%\s*block\s+styles\s*%\}\{%\s*endblock\s*%\}/, () => styles);
  master = master.replace(/\{%\s*block\s+content\s*%\}\{%\s*endblock\s*%\}/, () => content);
  master = master.replace(/\{%\s*block\s+scripts\s*%\}\{%\s*endblock\s*%\}/, () => scripts);

  // The merchant kept reviewing a stale page after a fix had already landed
  // (the server's Cache-Control: max-age=0 still lets some browsers reuse a
  // cached copy on back/forward navigation) - force a real revalidation on
  // every visit so "did you refresh?" stops being the first question.
  master = master.replace(
    /(<head[^>]*>)/,
    `$1\n<meta http-equiv="Cache-Control" content="no-store, no-cache, must-revalidate">\n<meta http-equiv="Pragma" content="no-cache">\n<meta http-equiv="Expires" content="0">`
  );

  // noindex + preview banner injected right after <body ...>
  master = master.replace(
    /(<body[^>]*>)/,
    `$1\n<div style="position:fixed;bottom:14px;left:14px;z-index:999;background:#17171B;border:1px solid #2A2A31;color:#8E8E98;font-size:12px;padding:8px 14px;border-radius:10px">معاينة مولّدة من كود الثيم الحقيقي — ${pageSlugLabel}</div>`
  );

  // The real wishlist button (`onclick="salla.wishlist.toggle(...)"`) is a
  // no-op here since there's no live Salla runtime in this static preview -
  // this demo-only script simulates the real toggle (is-added class +
  // the favourites count) purely so the interaction is visible while
  // reviewing the design. It never ships; product.js/wishlist.js do the
  // real, server-backed version on the live store.
  master = master.replace(/<\/body>/, () => `
  <script>
  (function () {
    var STORAGE_KEY = 'bav-preview-wishlist';
    function getSaved() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch (e) { return []; } }
    function setSaved(ids) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(ids)); } catch (e) {} }

    function apply(btn, isAdded) {
      btn.classList.toggle('is-added', isAdded);
      btn.classList.toggle('not-added', !isAdded);
    }

    var saved = getSaved();
    document.querySelectorAll('.btn--wishlist[data-id]').forEach(function (btn) {
      apply(btn, saved.indexOf(btn.getAttribute('data-id')) !== -1);
    });

    document.addEventListener('click', function (event) {
      var btn = event.target.closest('.btn--wishlist[data-id]');
      if (!btn) return;
      event.preventDefault();
      event.stopImmediatePropagation();

      var id = btn.getAttribute('data-id');
      var ids = getSaved();
      var wasAdded = ids.indexOf(id) !== -1;
      ids = wasAdded ? ids.filter(function (x) { return x !== id; }) : ids.concat([id]);
      setSaved(ids);
      document.querySelectorAll('.btn--wishlist[data-id="' + id + '"]').forEach(function (b) { apply(b, !wasAdded); });

      var countEl = document.getElementById('wishlist-count-' + id);
      if (countEl) countEl.textContent = Math.max(0, Number(countEl.textContent) + (wasAdded ? -1 : 1));
    }, true);
  })();
  </script>
  <script>
  (function () {
    // The real mobile drawer (app.js's initiateMobileMenu) only moves
    // #mobile-menu into mmenu-light's off-canvas wrapper once
    // salla.onReady() fires - that never happens here since there's no live
    // Salla runtime in this static preview, so the nav would otherwise just
    // sit inline in the page, fully visible, exactly like the real theme
    // bug this was built to fix (the drawer markup itself was missing
    // entirely - now fixed in header.twig) used to look before that fix.
    // This demo-only script positions/toggles it as a slide-in panel purely
    // so the open/close interaction can be reviewed locally; it never ships
    // - mmenu-light does the real version on the live store.
    var nav = document.getElementById('mobile-menu');
    if (!nav) return;
    // All the actual positioning/hiding is a real CSS class (.bav-preview-
    // drawer, bav.scss) instead of ~10 separate JS .style assignments -
    // simpler, and means it can be verified directly in compiled CSS rather
    // than trusting every runtime property write to have taken effect.
    nav.classList.add('bav-preview-drawer');

    var backdrop = document.createElement('div');
    backdrop.className = 'bav-preview-backdrop';
    document.body.appendChild(backdrop);

    function setOpen(isOpen) {
      nav.classList.toggle('is-open', isOpen);
      backdrop.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      document.body.classList.toggle('menu-opened', isOpen);
    }

    document.addEventListener('click', function (event) {
      if (event.target.closest('a[href="#mobile-menu"]')) { event.preventDefault(); setOpen(true); return; }
      if (nav.contains(event.target)) {
        // Picking a page link inside the drawer closes it too, same as the
        // real theme (app.js) now does. The close (×) button also lives
        // inside nav, so this single check covers both.
        if (event.target.closest('a')) { setOpen(false); }
        return;
      }
      // Anything else - the backdrop, the hero image, anywhere on the page
      // at all - closes the drawer whenever it's open. Previously only an
      // exact click on the backdrop div closed it, which could miss clicks
      // that landed on some other element sitting above it.
      setOpen(false);
    });

    // The real mmenu-light has a built-in media-query watcher that moves the
    // menu in/out of the drawer automatically as the viewport crosses the
    // mobile breakpoint - this stand-in only opens/closes on click, so
    // opening it narrow then widening the window back past the .mob/.dsk
    // breakpoint (700px) left it visually stuck open over the desktop
    // layout instead of auto-closing like the real drawer would.
    window.addEventListener('resize', function () {
      if (window.innerWidth > 700) setOpen(false);
    });
  })();
  </script>
  <script>
  (function () {
    // Category page's filter sidebar - same off-canvas drawer mechanics as
    // the header's mobile nav (reuses the same .bav-preview-drawer /
    // .bav-preview-backdrop classes), for the same reason: products.js's
    // real initiateMobileMenu() never runs without a live Salla runtime.
    var panel = document.getElementById('filters-menu');
    var trigger = document.querySelector('a[href="#filters-menu"]');
    var closeBtn = document.querySelector('button.close-filters');
    if (!panel || !trigger) return;
    var backdrop = document.createElement('div');
    backdrop.className = 'bav-preview-backdrop';
    document.body.appendChild(backdrop);
    function setOpen(isOpen) {
      panel.classList.toggle('is-open', isOpen);
      backdrop.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }
    trigger.addEventListener('click', function (e) { e.preventDefault(); setOpen(true); });
    if (closeBtn) closeBtn.addEventListener('click', function () { setOpen(false); });
    backdrop.addEventListener('click', function () { setOpen(false); });
  })();
  </script>
  <script>
  (function () {
    var input = document.getElementById('bav-preview-search');
    var resultsBox = document.getElementById('bav-preview-search-results');
    var bar = document.getElementById('bav-search-bar');
    var toggle = document.getElementById('bav-search-toggle');
    var closeBtn = document.getElementById('bav-search-close');
    if (!input || !resultsBox || !bar) return;
    var products = ${JSON.stringify(mock.allProductPages.map((p) => ({ name: p.context.name, url: 'product-' + p.slug + '.html' })))};

    function setBarOpen(isOpen) {
      bar.classList.toggle('is-open', isOpen);
      if (toggle) toggle.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) { setTimeout(function () { input.focus(); }, 260); }
      else { resultsBox.style.display = 'none'; }
    }
    if (toggle) toggle.addEventListener('click', function () { setBarOpen(!bar.classList.contains('is-open')); });
    if (closeBtn) closeBtn.addEventListener('click', function () { setBarOpen(false); });

    input.addEventListener('input', function () {
      var q = input.value.trim();
      if (!q) { resultsBox.style.display = 'none'; resultsBox.innerHTML = ''; return; }
      var matches = products.filter(function (p) { return p.name.indexOf(q) !== -1; }).slice(0, 6);
      if (!matches.length) {
        resultsBox.innerHTML = '<div style="padding:14px 16px;font-size:14px;color:#8E8E98">لا توجد نتائج</div>';
      } else {
        resultsBox.innerHTML = matches.map(function (p) {
          return '<a href="' + p.url + '" style="display:block;padding:12px 16px;font-size:14px;color:#F4F4F2;border-bottom:1px solid #232329">' + p.name + '</a>';
        }).join('');
      }
      resultsBox.style.display = 'block';
    });
    document.addEventListener('click', function (event) {
      if (!event.target.closest('.bav-search-bar') && !event.target.closest('.bav-search-toggle')) { resultsBox.style.display = 'none'; }
    });
  })();
  </script>
  <script>
  (function () {
    document.querySelectorAll('salla-quantity-input').forEach(function (el) {
      var max = Number(el.getAttribute('max')) || 99;
      var valueEl = el.querySelector('.bav-qty-value');
      el.value = 1;
      function setVal(v) {
        v = Math.max(1, Math.min(max, v));
        el.value = v;
        if (valueEl) valueEl.textContent = v;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }
      el.querySelectorAll('.bav-qty-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          setVal(Number(el.value) + (btn.dataset.action === 'increase' ? 1 : -1));
        });
      });
    });
  })();
  </script>
  </body>`);

  Twig.cache(false);
  let rendered = Twig.twig({ data: master, allowInlineIncludes: true }).render(context);

  // Swap each <salla-products-list> (a real Salla web component, inert
  // outside a live store) with real-asset mock cards, in the same order
  // the sections appear in index.twig.
  // A dedicated category page (one product list, one specific section) uses
  // ITS OWN single-item list instead of the homepage's fixed 6-section
  // order - otherwise every "اكتشف أكثر" button landed on the exact same
  // page showing the offers section regardless of which section it was
  // actually under.
  const sectionsInOrder = categoryProducts
    ? [mock.renderSection(categoryProducts)]
    : [
        mock.renderSection(mock.offersProducts),
        mock.renderSection(mock.gameProducts),
        mock.renderSection(mock.doubleCpProducts),
        mock.renderSection(mock.doubleCpGiftProducts),
        mock.renderSection(mock.digitalFilesProducts),
        mock.renderSection(mock.servicesProducts),
      ];
  let i = 0;
  rendered = rendered.replace(/<salla-products-list[\s\S]*?<\/salla-products-list>/g, () => {
    const html = sectionsInOrder[i] !== undefined ? sectionsInOrder[i] : '';
    i++;
    return html;
  });

  // <salla-menu> (header nav, footer "help" column, mobile drawer) is also a
  // real Salla web component that only renders once pages exist on a live
  // store - inert here, so swap it for a visual stand-in listing the pages
  // this theme actually has designed layouts for, purely so the footer/nav
  // aren't empty while reviewing. Never shipped - the real tag stays as-is
  // in the .twig source.
  rendered = rendered.replace(/<salla-menu[^>]*source="footer"[^>]*><\/salla-menu>/g, () => `
    <a class="flink" href="refund-policy.html">سياسة الاستبدال والاسترجاع</a>
    <a class="flink" href="terms.html">الشروط والأحكام</a>
    <a class="flink" href="https://wa.me/966564622432" target="_blank" rel="noopener noreferrer">تواصل معنا</a>`);
  rendered = rendered.replace(/<salla-menu[^>]*source="header"[^>]*><\/salla-menu>/g, () => `<a href="#preview-link-placeholder">عروض</a>`);

  // <salla-payments> shows the merchant's actually-enabled methods with
  // their real icons at runtime - inert here, so stand in with simple text
  // chips (same fallback the spec itself allows) purely for local review.
  rendered = rendered.replace(/<salla-payments[^>]*><\/salla-payments>/g, () =>
    ['مدى', 'Visa', 'Mastercard', 'Apple Pay', 'STC Pay'].map((m) =>
      `<span style="display:inline-block;padding:6px 14px;margin:0 6px 6px 0;border-radius:8px;background:#17171B;border:1px solid #2A2A31;font-size:13px;color:#C7C7CE">${m}</span>`
    ).join(''));

  // <salla-search inline> queries Salla's real search index at runtime -
  // inert here (a plain empty custom element, no input at all), so swap in
  // a real <input> wired to a small client-side filter over this preview's
  // own mock product list purely so typing something actually shows matches
  // while reviewing. Never ships; Salla's real search API powers it live.
  // There are actually TWO real <salla-search> tags in the theme: this
  // header one (data-testid="store-header-search", has the "inline" attr)
  // and a second, separate one in master.twig (data-testid="store-search-
  // modal", no "inline") that's an unrelated full-screen search modal. The
  // /g flag here used to swap BOTH with identical markup/ids, which broke
  // getElementById for this one - scope the match to the header's specific
  // data-testid so the modal one (left untouched, inert, harmless) can't
  // collide with it.
  rendered = rendered.replace(/<salla-search[^>]*data-testid="store-header-search"[^>]*><\/salla-search>/g, () =>
    `<input type="search" id="bav-preview-search" placeholder="ابحث..." autocomplete="off" style="background:transparent;border:0;outline:0;color:#F4F4F2;font-family:inherit;font-size:14px;width:100%">
     <div id="bav-preview-search-results" style="display:none;position:fixed;margin-top:60px;max-width:600px;left:50%;transform:translateX(-50%);background:#141418;border:1px solid #2A2A31;border-radius:12px;overflow:hidden;z-index:40;width:90%"></div>`);

  // <salla-quantity-input> renders its own +/- stepper from Salla's JS at
  // runtime - inert here means an empty, unclickable box, so stand in with
  // a real +/- stepper (reusing the existing, already-unused .qty CSS) that
  // keeps the real tag name and sets a real .value property + dispatches
  // input/change on it, so product.js's existing real subtotal-recompute
  // listener (initQuantitySubtotalElements, which just listens on
  // document.querySelector('salla-quantity-input')) picks it up for free.
  if (context.product) {
    rendered = rendered.replace(/(<salla-quantity-input[^>]*>)(\s*)(<\/salla-quantity-input>)/g, (m, open, ws, close) =>
      `${open}<span class="qty"><button type="button" class="bav-qty-btn" data-action="decrease" aria-label="أنقص الكمية">−</button><span class="bav-qty-value">1</span><button type="button" class="bav-qty-btn" data-action="increase" aria-label="زِد الكمية">+</button></span>${close}`);
  }

  // <salla-social-share> renders its own share icon/menu from Salla's JS at
  // runtime - inert here means an empty box, easy to mistake for a broken
  // button while reviewing, so give it a stand-in icon too.
  rendered = rendered.replace(/(<salla-social-share[^>]*>)(\s*)(<\/salla-social-share>)/g, (m, open, ws, close) =>
    `${open}<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F4F4F2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/></svg>${close}`);

  // <salla-filters> (category page sidebar) renders real merchant-defined
  // filter groups from Salla's own catalog API at runtime - inert here, and
  // its mobile trigger (products.js's own initiateMobileMenu, same mmenu-
  // light pattern as the header's drawer) never runs either without a live
  // Salla runtime, so clicking it did nothing. Stand-in content + the same
  // open/close drawer classes used for the header's mobile nav, purely so
  // the interaction can be reviewed; real filtering logic is Salla's.
  rendered = rendered.replace(/(<salla-filters[^>]*class=")([^"]*)("[^>]*id="filters-menu"[^>]*>)\s*<\/salla-filters>/, (m, pre, cls, post) =>
    `${pre}${cls} bav-preview-drawer${post}
      <div style="padding:24px 20px">
        <div style="font-weight:700;font-size:16px;margin-bottom:16px">الفئة</div>
        <label style="display:flex;align-items:center;gap:10px;padding:8px 0;font-size:14px;color:#C7C7CE"><input type="checkbox"> فئات شحن العملات</label>
        <label style="display:flex;align-items:center;gap:10px;padding:8px 0;font-size:14px;color:#C7C7CE"><input type="checkbox"> الملفات الرقمية</label>
        <label style="display:flex;align-items:center;gap:10px;padding:8px 0;font-size:14px;color:#C7C7CE"><input type="checkbox"> الخدمات</label>
        <div style="font-weight:700;font-size:16px;margin:22px 0 16px">نطاق السعر</div>
        <div style="display:flex;gap:10px">
          <input type="number" placeholder="من" style="flex:1;height:42px;border-radius:10px;border:1px solid #2A2A31;background:#17171B;color:#F4F4F2;padding:0 12px">
          <input type="number" placeholder="إلى" style="flex:1;height:42px;border-radius:10px;border:1px solid #2A2A31;background:#17171B;color:#F4F4F2;padding:0 12px">
        </div>
      </div>
    </salla-filters>`);

  // <salla-user-menu avatar-only> renders its own icon from Salla's JS at
  // runtime (no slotted markup in the .twig source to begin with) - inert
  // here means a genuinely empty box, not a styling bug in this theme, but
  // it reads as a broken button while reviewing, so give it a stand-in icon.
  rendered = rendered.replace(/(<salla-user-menu[^>]*>)(\s*)(<\/salla-user-menu>)/g, (m, open, ws, close) =>
    `${open}<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4F4F2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6"/></svg>${close}`);

  // Product page only: <salla-slider> (gallery) and <salla-products-slider>
  // (related products) are also real, inert-outside-a-live-store web
  // components — swap in a visual stand-in built from this exact page's product.
  if (context.product) {
    rendered = rendered.replace(/<salla-slider[\s\S]*?<\/salla-slider>/, () => mock.productGallery(context.product));
    rendered = rendered.replace(/<salla-product-options[^>]*><\/salla-product-options>/, () => mock.renderOptionFieldsPreview(context.product));
    // <salla-add-product-button> ships its own visual styling via Salla's
    // real runtime JS/shadow-DOM at the actual live store - outside that,
    // it's an unstyled, undefined custom element, so only its plain slotted
    // label text shows with no button box/background at all, easy to miss
    // entirely while reviewing and mistake for "the button is missing".
    rendered = rendered.replace(/<salla-add-product-button[^>]*>([\s\S]*?)<\/salla-add-product-button>/, (m, label) =>
      `<button type="submit" id="pr-add" class="btn btn-p" style="width:100%;margin-top:20px">${label.trim()}</button>`);
  }
  rendered = rendered.replace(/<salla-products-slider[\s\S]*?<\/salla-products-slider>/, () => {
    return `<div class="sechead"><h2>قد يعجبك أيضًا</h2><div class="orn"><b></b><b></b></div></div>
      <div class="g3" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px">${mock.renderSection(mock.doubleCpProducts)}</div>`;
  });

  // Cart page only: <salla-cart-summary-card> (also inert outside a live
  // store) renders the real subtotal/discount/total breakdown and the
  // checkout button — stand in with a plain, honest total since this
  // theme has no visibility into how Salla computes that breakdown itself.
  if (context.cart) {
    rendered = rendered.replace(/<salla-cart-summary-card[^>]*><\/salla-cart-summary-card>/, () => `
      <div class="bav-card-radius" style="background:var(--bg-surface-1);padding:24px">
        <div style="display:flex;justify-content:space-between;padding:10px 0;color:#9B9BA5"><span>المجموع الفرعي</span><span class="num">${context.cart.sub_total.toFixed(2)} ر.س</span></div>
        <div style="display:flex;justify-content:space-between;padding:10px 0;border-top:1px solid var(--border-1);margin-top:6px;font-size:20px;font-weight:700"><span>الإجمالي</span><span class="num" style="color:var(--accent)">${context.cart.total.toFixed(2)} ر.س</span></div>
        <a href="#" class="btn btn-p" style="width:100%;margin-top:18px">إتمام الطلب</a>
      </div>`);
  }

  return rendered;
}

function build() {
  load();
  if (!fs.existsSync(PREVIEW_DIR)) fs.mkdirSync(PREVIEW_DIR, { recursive: true });
  const indexHtml = buildPageHtml('views/pages/index.twig', 'الصفحة الرئيسية');
  fs.writeFileSync(path.join(PREVIEW_DIR, 'index.html'), indexHtml, 'utf8');

  // One real standalone page PER product, so clicking a different card on
  // the homepage opens a page with that exact product's own name/price/
  // images — not every card (or a stray bookmark) converging on one fixed
  // demo page. There's no generic product.html anymore on purpose: every
  // product has its own URL, same as the real store.
  for (const file of fs.readdirSync(PREVIEW_DIR)) {
    if (file === 'product.html' || (file.startsWith('product-') && file.endsWith('.html'))) {
      fs.unlinkSync(path.join(PREVIEW_DIR, file));
    }
  }
  for (const { slug, context: product } of mock.allProductPages) {
    const html = buildPageHtml('views/pages/product/single.twig', `صفحة المنتج — ${product.name}`, {
      product,
      page: { slug: 'product.single', title: product.name },
    });
    fs.writeFileSync(path.join(PREVIEW_DIR, `product-${slug}.html`), html, 'utf8');
  }

  // Category/listing page (product/index.twig) — real sort dropdown + real
  // salla-filters sidebar + the grid, so "اكتشف أكثر" from any homepage
  // section lands on a genuinely separate, Bav-styled page showing THAT
  // section's own products - not the same shared page for every section.
  const CATEGORY_PAGES = [
    { file: 'category.html', name: 'فئات شحن العملات', products: mock.gameProducts },
    { file: 'category-offers.html', name: 'العروض', products: mock.offersProducts },
    { file: 'category-double-cp.html', name: 'الدبل CP', products: mock.doubleCpProducts },
    { file: 'category-double-cp-gift.html', name: 'إهداء الدبل CP', products: mock.doubleCpGiftProducts },
    { file: 'category-digital-files.html', name: 'الملفات الرقمية', products: mock.digitalFilesProducts },
    { file: 'category-services.html', name: 'الخدمات', products: mock.servicesProducts },
  ];
  for (const cat of CATEGORY_PAGES) {
    const sortOptions = [
      { id: 'ourSuggest', name: 'الأنسب لك', is_selected: true },
      { id: 'bestSell', name: 'الأكثر مبيعًا', is_selected: false },
      { id: 'priceFromLowToTop', name: 'السعر: من الأقل للأعلى', is_selected: false },
      { id: 'priceFromTopToLow', name: 'السعر: من الأعلى للأقل', is_selected: false },
    ];
    const html = buildPageHtml('views/pages/product/index.twig', `صفحة التصنيف — ${cat.name}`, {
      page: { slug: 'cat.show', title: cat.name, id: 1 },
      category: { name: cat.name, url: cat.file, sub_categories: [] },
      filters: true,
      sort_options: sortOptions,
    }, cat.products);
    fs.writeFileSync(path.join(PREVIEW_DIR, cat.file), html, 'utf8');
  }

  // Cart page — real line items + the real <salla-cart-summary-card> (also
  // inert outside a live store, so it gets the same mock-swap treatment).
  const cartItem1 = mock.allProductPages.find((p) => p.slug === 'double-cp-800').context;
  const cartItem2 = mock.allProductPages.find((p) => p.slug === 'guide-views').context;
  const cartHtml = buildPageHtml('views/pages/cart.twig', 'صفحة السلة', {
    page: { slug: 'cart', title: 'السلة' },
    cart: {
      id: 'preview-cart',
      items: [
        {
          id: 1, url: cartItem1.url, quantity: 2, type: cartItem1.type,
          product_price: cartItem1.price, price: cartItem1.price, total: cartItem1.price * 2,
          product_id: cartItem1.id, is_available: true, offer: null, detailed_offers: [],
          is_on_sale: false, has_discount: false, weight_label: null,
          product_image: cartItem1.images[0]?.url, product_name: cartItem1.name,
          is_hidden_quantity: false, max_quantity: 5, can_add_note: false, can_upload_file: false,
          options: [{}],
        },
        {
          id: 2, url: cartItem2.url, quantity: 1, type: cartItem2.type,
          product_price: cartItem2.price, price: cartItem2.price, total: cartItem2.price,
          product_id: cartItem2.id, is_available: true, offer: null, detailed_offers: [],
          is_on_sale: false, has_discount: false, weight_label: null,
          product_image: cartItem2.images[0]?.url, product_name: cartItem2.name,
          is_hidden_quantity: false, max_quantity: 5, can_add_note: false, can_upload_file: false,
          options: [{}],
        },
      ],
      options: [],
      sub_total: cartItem1.price * 2 + cartItem2.price,
      discount: 0,
      total: cartItem1.price * 2 + cartItem2.price,
      tax_amount: 0,
      free_shipping_bar: null,
      is_require_shipping: false,
      has_shipping: false,
    },
  });
  fs.writeFileSync(path.join(PREVIEW_DIR, 'cart.html'), cartHtml, 'utf8');

  // page-single.twig branches by exact page.title - these three are the
  // "informative pages" Salman still needs to create for real in the Salla
  // dashboard with these exact titles (see طلبات_صاحب_المتجر.md).
  const SINGLE_PAGES = [
    { file: 'find-id.html', titleKey: 'bav.find_id_title', label: 'كيف أجد معرّفي؟' },
    { file: 'faq-full.html', titleKey: 'bav.faq_page_title', label: 'الأسئلة الشائعة (الصفحة الكاملة)' },
    { file: 'about.html', titleKey: 'bav.about_eyebrow', label: 'من نحن' },
    { file: 'refund-policy.html', titleKey: 'bav.refund_policy_title', label: 'سياسة الاستبدال والاسترجاع' },
    {
      file: 'terms.html',
      titleKey: 'bav.terms_title',
      label: 'الشروط والأحكام',
      // "الشروط والأحكام" has no dedicated design branch in page-single.twig
      // on purpose - it falls to the generic page content block and shows
      // whatever Salman writes for it in the Salla dashboard's own page
      // editor. This sample text is preview-only, just to prove that path
      // renders correctly; it is never shipped.
      content: '<p>هنا تظهر نص الشروط والأحكام بالضبط كما تكتبه في لوحة تحكم سلة (المحتوى &lt; الصفحات)، بدون أي تصميم مخصص يحجبه.</p>',
    },
  ];
  for (const sp of SINGLE_PAGES) {
    const html = buildPageHtml('views/pages/page-single.twig', sp.label, {
      page: { slug: 'page.single', title: transLookup(sp.titleKey), id: 1, type: 'normal', content: sp.content || '' },
    });
    fs.writeFileSync(path.join(PREVIEW_DIR, sp.file), html, 'utf8');
  }

  console.log(`[${new Date().toLocaleTimeString('ar')}] Built bav-preview/index.html + ${mock.allProductPages.length} product pages + category.html + cart.html + find-id.html + faq-full.html + about.html + refund-policy.html + terms.html`);
}

build();

if (process.argv.includes('--watch')) {
  const watchPaths = [
    path.join(SRC, 'views'),
    path.join(SRC, 'locales'),
    path.join(ROOT, 'twilight.json'),
    // preview-mock-data.js is hot-reloadable (reloadMock() busts its
    // require cache every build), unlike this file itself - editing
    // preview-build.js's own logic still needs a real process restart,
    // since Node can't hot-swap a script it's already mid-execution of.
    path.join(__dirname, 'preview-mock-data.js'),
  ];
  console.log('Watching for changes...', watchPaths);
  let timer = null;
  const trigger = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try { build(); } catch (e) { console.error('Build error:', e.message); }
    }, 150);
  };
  for (const p of watchPaths) {
    fs.watch(p, { recursive: true }, trigger);
  }
}

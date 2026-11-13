import BasePage from '../base-page';

// Bav triangle mark, used verbatim (same path data as the header/footer logo)
// as a faint background watermark on digital-file cards per the approved
// reference design (BAV_Design/01_final_site/index.html) - those cards have
// no product photo, just this logo treatment over a gradient.
const BAV_MARK_PATH = 'M367.2 548.3 L367.5 550.8 L445.4 681.7 L447.3 683.3 L469.9 646.9 L469.9 644.7 L413.7 549.0 L411.5 548.0Z M249.5 346.2 L248.9 347.1 L250.5 350.3 L256.4 359.7 L262.4 370.7 L287.5 412.1 L296.6 428.1 L297.6 429.1 L298.5 429.1 L302.6 423.4 L306.0 417.1 L320.8 393.9 L321.1 392.3 L294.7 347.1 L293.2 345.9Z M911.5 254.2 L646.6 254.2 L725.0 389.8 L755.5 339.9 L741.7 309.2 L811.7 310.7 L495.9 828.0 L477.1 796.9 L573.4 642.2 L466.4 460.5 L388.6 459.2 L427.8 392.0 L348.1 256.4 L90.4 255.8 L497.5 925.6Z M310.7 516.6 L431.3 516.3 L499.7 629.9 L508.5 646.3 L447.6 748.6 L440.1 738.5 L311.0 519.8Z M192.7 309.8 L308.2 309.2 L310.7 310.4 L358.8 391.7 L358.8 393.9 L318.3 460.5 L277.8 460.8 L275.9 459.2 L192.1 311.7Z M385.8 254.2 L461.1 382.6 L506.0 347.5 L486.5 309.5 L570.0 309.5 L589.1 343.7 L482.7 423.4 L593.2 609.2 L705.9 426.9 L606.1 253.9Z M617.4 392.0 L619.9 394.9 L637.8 425.6 L639.0 429.4 L599.2 497.5 L595.1 502.5 L588.8 493.1 L561.5 445.7 L556.2 435.3 L557.4 433.8 L612.1 395.2Z';
const BAV_MARK_SVG = `<svg aria-hidden="true" width="150" height="123" viewBox="90 254 822 672"><path fill="#fff" fill-rule="evenodd" d="${BAV_MARK_PATH}"/></svg>`;

// Generic "service" icon (sliders/customization) for a service product with
// no cover image - one consistent icon for any service, since the theme has
// no way to know what a specific merchant-named service is actually about.
const SERVICE_ICON_SVG = `<svg aria-hidden="true" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="4" y1="6" x2="20" y2="6"/><circle cx="14" cy="6" r="2" fill="#0E0E11"/>
  <line x1="4" y1="12" x2="20" y2="12"/><circle cx="8" cy="12" r="2" fill="#0E0E11"/>
  <line x1="4" y1="18" x2="20" y2="18"/><circle cx="16" cy="18" r="2" fill="#0E0E11"/>
</svg>`;

// Wrapped-box ribbon for gift products (see .bav-gift-ribbon in bav.scss) -
// identical markup also lives in scripts/preview-mock-data.js and
// product/single.twig; keep all three in sync if this changes.
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

class ProductCard extends HTMLElement {
  constructor(){
    super()
  }
  
  connectedCallback(){
    // Parse product data
    this.product = this.product || JSON.parse(this.getAttribute('product')); 

    if (window.app?.status === 'ready') {
      this.onReady();
    } else {
      document.addEventListener('theme::ready', () => this.onReady() )
    }
  }

  onReady(){
      this.fitImageHeight = salla.config.get('store.settings.product.fit_type');
      this.placeholder = salla.url.asset(salla.config.get('theme.settings.placeholder'));
      this.getProps()

      salla.lang.onLoaded(() => {
        // Language
        this.remained = salla.lang.get('pages.products.remained');
        this.donationAmount = salla.lang.get('pages.products.donation_amount');
        this.startingPrice = salla.lang.get('pages.products.starting_price');
        this.addToCart = salla.lang.get('pages.cart.add_to_cart');
        this.outOfStock = salla.lang.get('pages.products.out_of_stock');
        this.freeBadgeLabel = window.bavProductCardLabels?.free;
        this.digitalNoRefundNote = window.bavProductCardLabels?.digitalNote;
        this.fastExecutionBadgeLabel = window.bavProductCardLabels?.fastExecution;

        // re-render to update translations
        this.render();
      })
      
      this.render()
  }

  getPriceFormat(price) {
    if (!price || price == 0) {
      return salla.config.get('store.settings.product.show_price_as_dash')?'-':'';
    }

    return salla.money(price);
  }

  getAddButtonLabel() {
    if(this.product.has_preorder_campaign) {
        return salla.lang.get('pages.products.pre_order_now');
    }

    if (this.product.status === 'sale' && this.product.type === 'booking') {
      return salla.lang.get('pages.cart.book_now');
    }

    if (this.product.status === 'sale') {
      return salla.lang.get('pages.cart.add_to_cart');
    }

    if (this.product.type !== 'donating') {
      return salla.lang.get('pages.products.out_of_stock');
    }

    // donating
    return salla.lang.get('pages.products.donation_exceed');
  }

  getProps(){

    /**
     *  Horizontal card.
     */
    this.horizontal = this.hasAttribute('horizontal');
  
    /**
     *  Support shadow on hover.
     */
    this.shadowOnHover = this.hasAttribute('shadowOnHover');
  
    /**
     *  Hide add to cart button.
     */
    this.hideAddBtn = this.hasAttribute('hideAddBtn');
  
    /**
     *  Full image card.
     */
    this.fullImage = this.hasAttribute('fullImage');
  
    /**
     *  Minimal card.
     */
    this.minimal = this.hasAttribute('minimal');
  
    /**
     *  Special card.
     */
    this.isSpecial = this.hasAttribute('isSpecial');
  
    /**
     *  Show quantity.
     */
    this.showQuantity = this.hasAttribute('showQuantity');
  }

  escapeHTML(str = '') {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  }

  getPercentOff() {
    if (!this.product.is_on_sale || !this.product.regular_price) return 0;
    return Math.round((1 - (this.product.sale_price / this.product.regular_price)) * 100);
  }

  // A zero-priced product (free digital guide, free sample, ...) gets the
  // "free" badge automatically — no need for the merchant to set it by hand
  // via promotion_title for every such product. Because this reads the
  // product's current price every render (nothing is cached), a price
  // edited from 0 to a real amount loses the badge on its own, and a price
  // edited down to 0 gains it, with no manual toggling either way.
  isFree() {
    const effectivePrice = this.product.is_on_sale ? this.product.sale_price : this.product.price;
    return Number(effectivePrice) === 0;
  }

  // A deterministic "social proof" badge (featured / best seller / ...) for
  // products the merchant hasn't given a real promotion_title - same
  // product always gets the same badge (or none), it isn't reshuffled on
  // every page view. Purely decorative, never shown over a real badge.
  getBadgeHtml() {
    if (this.isFree()) return `<span class="badge">${this.freeBadgeLabel || 'مجانًا'}</span>`;
    if (this.product.promotion_title) return `<span class="badge">${this.escapeHTML(this.product.promotion_title)}</span>`;
    if (this.product.type === 'digital' || this.product.type === 'service') {
      return `<span class="badge">${this.fastExecutionBadgeLabel || 'تنفيذ سريع'}</span>`;
    }
    return '';
  }

  // Same detection single.twig uses for the gallery explainer image: a
  // real, merchant-configured text option whose name contains "المستلم"
  // (recipient) - that's how a gift Double CP product is told apart from
  // its identical-looking regular counterpart, not from its name/slug.
  isGiftProduct() {
    return (this.product.options || []).some((opt) => (opt.name || '').includes('المستلم'));
  }

  // Same category-name convention single.twig uses for the "×2" badge -
  // covers both the regular and gift Double CP category since both names
  // contain "الدبل".
  isDoubleCpProduct() {
    return (this.product.category?.name || '').includes('الدبل');
  }

  // Digital files and services have no product photo to show - instead the
  // image slot shows a branded gradient with the Bav mark watermarked in
  // the corner and an inset frame, same visual language either way, with
  // either the "PDF" treatment or a generic service icon up top.
  renderBrandedCardImage(alt, { eyebrow, iconSvg } = {}) {
    return `
      <div class="pimg" style="background:radial-gradient(120% 100% at 80% 0%,#2A1409 0%,#0E0E11 55%,#09090B 100%)">
        <div style="position:absolute;left:22px;bottom:22px;opacity:.07">${BAV_MARK_SVG}</div>
        <div style="position:absolute;inset:22px;border:1px solid #2E2E35;border-radius:16px"></div>
        <div style="position:absolute;top:44px;right:44px;left:44px;display:flex;flex-direction:column;gap:12px">
          ${eyebrow ? `<span class="num" style="font-size:44px;letter-spacing:.04em;color:var(--accent)">${eyebrow}</span>`
            : `<span style="color:var(--accent)">${iconSvg}</span>`}
          <div style="height:3px;width:64px;background:var(--accent)"></div>
          <span class="disp" style="font-size:22px;line-height:1.5;color:#E8E8EC;max-width:240px">${alt}</span>
        </div>
        ${this.getBadgeHtml()}
      </div>
    `;
  }

  render(){
    this.classList.add('pcard');
    this.setAttribute('id', `product-${this.product.id}`);
    const percentOff = this.getPercentOff();
    const img = this.product?.image?.url || this.placeholder || '';
    const alt = this.escapeHTML(this.product?.image?.alt || this.product.name);
    const addLabel = this.product.add_to_cart_label || this.getAddButtonLabel();
    // The branded placeholder is only a fallback for a digital file or
    // service with no cover image at all — a real uploaded cover (common
    // for digital files, rare for services) always takes priority.
    const hasRealImage = !!this.product?.image?.url;
    const isDigitalFile = this.product.type === 'digital' && !hasRealImage;
    const isService = this.product.type === 'service' && !hasRealImage;

    this.innerHTML = `
      <a href="${this.product?.url}" class="pimg-link" aria-label="${alt}">
        ${isDigitalFile ? this.renderBrandedCardImage(alt, { eyebrow: 'PDF' })
          : isService ? this.renderBrandedCardImage(alt, { iconSvg: SERVICE_ICON_SVG })
          : `
        <div class="pimg${this.product.type === 'digital' ? ' pimg--contain' : ''}">
          <img src="${img}" alt="${alt}" loading="lazy">
          ${percentOff > 0 ? `<span class="save num" dir="ltr">-${percentOff}%</span>` : ''}
          ${this.getBadgeHtml()}
          ${this.isGiftProduct() ? GIFT_RIBBON_HTML : ''}
          ${this.isDoubleCpProduct() ? '<span class="bav-x2-badge" aria-hidden="true">×2</span>' : ''}
        </div>`}
      </a>
      <div class="pbody">
        <a href="${this.product?.url}"><div class="pname">${this.escapeHTML(this.product?.name)}</div></a>
        ${this.product?.subtitle ? `<div class="psub">${this.escapeHTML(this.product.subtitle)}</div>` : ''}
        <div class="prow">
          ${this.product.is_on_sale
            ? `<span class="price num">${this.getPriceFormat(this.product.sale_price)}</span><s class="old">${this.getPriceFormat(this.product.regular_price)}</s>`
            : `<span class="price num">${this.getPriceFormat(this.product?.price)}</span>`
          }
        </div>
        ${this.product.type === 'digital' ? `<div style="font-size:12px;color:#8E8E98;margin-top:-6px">${this.digitalNoRefundNote || ''}</div>` : ''}
        <salla-add-product-button fill="outline" width="wide" class="pbtn"
          product-id="${this.product.id}"
          product-status="${this.product.status}"
          product-type="${this.product.type}">
          <span>${addLabel}</span>
        </salla-add-product-button>
      </div>
    `;
    return;
  }
}

customElements.define('custom-salla-product-card', ProductCard);

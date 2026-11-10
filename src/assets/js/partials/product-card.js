import BasePage from '../base-page';
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

  render(){
    this.classList.add('pcard');
    this.setAttribute('id', this.product.id);
    const percentOff = this.getPercentOff();
    const img = this.product?.image?.url || this.placeholder || '';
    const alt = this.escapeHTML(this.product?.image?.alt || this.product.name);
    const addLabel = this.product.add_to_cart_label || this.getAddButtonLabel();

    this.innerHTML = `
      <a href="${this.product?.url}" class="pimg-link" aria-label="${alt}">
        <div class="pimg">
          <img src="${img}" alt="${alt}" loading="lazy">
          ${percentOff > 0 ? `<span class="save num" dir="ltr">-${percentOff}%</span>` : ''}
          ${this.product.promotion_title ? `<span class="badge">${this.escapeHTML(this.product.promotion_title)}</span>` : ''}
        </div>
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

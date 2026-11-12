import 'lite-youtube-embed';
import BasePage from './base-page';
import Fslightbox from 'fslightbox';
window.fslightbox = Fslightbox;
import { zoom } from './partials/image-zoom';
import { WeaponsCalculator } from './partials/weapons-calculator';
import { WEAPON_WHEELS } from './partials/weapons-wheels-data';

class Product extends BasePage {
    onReady() {
        app.watchElements({
            totalPrice: '.total-price',
            productWeight: '.product-weight',
            beforePrice: '.before-price',
            startingPriceTitle: '.starting-price-title',
            productSku: '.product-sku',
            productBarcode: '.product-barcode',
        });

        this.initProductOptionValidations();
        this.initNativeGallery();
        this.initConfirmGate();
        this.initQuantitySubtotalElements();
        this.initWeaponsCalculator();

        if(imageZoom){
            // call the function when the page is ready
            this.initImagesZooming();
            // listen to screen resizing
            window.addEventListener('resize', () => this.initImagesZooming());
        }
    }

    initProductOptionValidations() {
      document.querySelector('.product-form')?.addEventListener('change', function(){
        // reportValidity() natively focuses/scrolls to the first empty required option mid-edit; read validity instead
        const isComplete = Array.from(this.elements).every(el => !el.willValidate || el.validity.valid);
        isComplete && salla.product.getPrice(new FormData(this));
      });
    }

    initNativeGallery() {
        const slider = document.querySelector('salla-slider.details-slider');
        const images = JSON.parse(slider?.dataset.images || '[]');
        if (!images.length) return;
        // capture phase: fslightbox binds via anchor.onclick, stopPropagation keeps it from firing
        slider.addEventListener('click', (event) => {
            const link = event.target.closest('a[data-fslightbox]');
            // swiper sets allowClick=false for the click that ends a swipe-drag
            if (!link || slider.querySelector('.swiper')?.swiper?.allowClick === false) return;
            if (!salla.mobile?.openGallery?.(images, images[+link.dataset.slidIndex])) return;
            event.preventDefault();
            event.stopPropagation();
        }, { capture: true });
    }

    /**
     * Products with options (Player ID, tier, etc.) show a confirmation
     * checkbox the customer must tick before the order is placed. The
     * add-to-cart button is dimmed while unchecked, and the submit is
     * hard-blocked in the capture phase on `document` - that runs before
     * the form's own inline `onsubmit` handler reaches the target phase,
     * so an unchecked box genuinely stops `cart.addItem` from firing.
     */
    initConfirmGate() {
        const checkbox = document.querySelector('#confirm-ok');
        const form = document.querySelector('.product-form');
        if (!checkbox || !form) return;

        const sync = () => form.classList.toggle('needs-confirm', !checkbox.checked);
        sync();
        checkbox.addEventListener('change', () => {
            sync();
            if (checkbox.checked) app.element('#confirm-err').style.display = 'none';
        });

        document.addEventListener('submit', (event) => {
            if (event.target !== form || checkbox.checked) return;
            event.preventDefault();
            event.stopImmediatePropagation();
            const err = app.element('#confirm-err');
            err.style.display = 'block';
            const wrap = checkbox.closest('.chk');
            wrap.classList.remove('shake');
            void wrap.offsetWidth; // trigger reflow so the animation can replay
            wrap.classList.add('shake');
        }, true);
    }

    /**
     * salla-add-product-button/salla-quantity-input don't multiply price by
     * quantity on their own (not documented anywhere) - this is a plain
     * line-total preview so the customer sees what they're about to pay
     * before adding to cart. It's cosmetic: the real order total is always
     * computed server-side by Salla regardless of what this shows.
     */
    initQuantitySubtotalElements() {
        this.subtotalEl = document.querySelector('#bav-line-subtotal');
        this.qtyInput = document.querySelector('salla-quantity-input');
        if (!this.subtotalEl) return;

        this.unitPrice = Number(this.subtotalEl.dataset.unitPrice) || 0;
        if (this.qtyInput) {
            ['input', 'change'].forEach((evt) => this.qtyInput.addEventListener(evt, () => this.recomputeSubtotal()));
        }
    }

    recomputeSubtotal() {
        if (!this.subtotalEl) return;
        const qty = Number(this.qtyInput?.value) || 1;
        this.subtotalEl.innerHTML = salla.money(this.unitPrice * qty);
    }

    /**
     * Mini "how much CP do I need for this weapon" calculator, embedded
     * directly in a weapon product's own page (طلبات_صاحب_المتجر.md,
     * "حاسبة شحن الأسلحة") - single.twig only renders the container div for
     * products in the weapons category, so no extra detection is needed
     * here. Locked to the first defined wheel for now since only one real
     * wheel exists; once more wheels are added, map product.slug -> wheel id
     * here instead of always using the first one.
     */
    initWeaponsCalculator() {
        const container = document.getElementById('bav-weapons-calculator-mini');
        if (!container) return;
        new WeaponsCalculator(container, { lockedWheelId: container.dataset.wheelId || WEAPON_WHEELS[0].id });
    }

    initImagesZooming() {
      // skip if the screen is not desktop or if glass magnifier
      // is already crated for the image before
      const imageZoom = document.querySelector('.image-slider .magnify-wrapper.swiper-slide-active .img-magnifier-glass');
      if (window.innerWidth  < 1024 || imageZoom) return;
      setTimeout(() => {
          // set delay after the resizing is done, start creating the glass
          // to create the glass in the proper position
          const image = document.querySelector('.image-slider .swiper-slide-active img');
          zoom(image?.id, 2);
      }, 250);
  

      document.querySelector('salla-slider.details-slider').addEventListener('slideChange', (e) => {
          // set delay till the active class is ready
          setTimeout(() => {
              const imageZoom = document.querySelector('.image-slider .swiper-slide-active .img-magnifier-glass');
    
              // if the zoom glass is already created skip
              if (window.innerWidth  < 1024 || imageZoom) return;
              const image = document.querySelector('.image-slider .magnify-wrapper.swiper-slide-active img');
              zoom(image?.id, 2);
          }, 250)
      })
    }

    /**
     * Identifier rows (SKU / barcode) follow the selected variant. An empty value hides the whole
     * row instead of leaving a labelled empty one, and a value shows it again - the parent product
     * may have none while a variant does. `undefined` means the endpoint didn't send the field at
     * all, so the row keeps whatever it is already showing.
     *
     * textContent, not innerHTML: identifiers are merchant-supplied and render as plain text
     * exactly as recorded, so there is nothing to parse as markup.
     */
    updateIdentifier(elements, wrapperSelector, value) {
        if (value === undefined) return;

        elements?.forEach((el) => {el.textContent = value || ''});
        document.querySelectorAll(wrapperSelector).forEach((el) => el.classList.toggle('hidden', !value));
    }

    /**
     * The displayed wishlist count is a stable per-product placeholder
     * rendered server-side (product.id has no real public wishlist total
     * in Salla) - but the increment/decrement itself is real, driven by
     * the actual salla.wishlist events, so it only moves on a real action.
     */
    initWishlistCounter() {
      const el = app.element('[id^="wishlist-count-"]');
      if (!el) return;
      const productId = el.closest('[data-product-id]')?.dataset.productId;
      if (!productId) return;

      const bump = (delta) => {
        const next = Math.max(0, Number(el.textContent) + delta);
        el.textContent = next;
      };

      salla.wishlist.event.onAdded((event, id) => { if (String(id) === String(productId)) bump(1); });
      salla.wishlist.event.onRemoved((response, id) => { if (String(id) === String(productId)) bump(-1); });
    }

    registerEvents() {
      this.initWishlistCounter();

      salla.event.on('product::price.updated.failed',()=>{
        app.element('.price-wrapper').classList.add('hidden');
        const outOfStock = app.element('.out-of-stock');
        outOfStock.classList.remove('hidden');
        outOfStock.classList.remove('scale-pulse');
        void outOfStock.offsetWidth; // trigger reflow
        outOfStock.classList.add('scale-pulse');
      })
      salla.product.event.onPriceUpdated((res) => {

        app.element('.out-of-stock').classList.add('hidden')
        app.element('.price-wrapper').classList.remove('hidden')

        let data = res.data,
            is_on_sale = data.has_sale_price && data.regular_price > data.price;

        app.startingPriceTitle?.classList.add('hidden');

        app.productWeight.forEach((el) => {el.innerHTML = data.weight || ''});
        app.totalPrice.forEach((el) => {el.innerHTML = salla.money(data.price)});
        app.beforePrice.forEach((el) => {el.innerHTML = salla.money(data.regular_price)});
        this.updateIdentifier(app.productSku, '.product-sku-wrapper', data.sku);
        this.updateIdentifier(app.productBarcode, '.product-barcode-wrapper', data.barcode);

        app.toggleClassIf('.price_is_on_sale','showed','hidden', ()=> is_on_sale)
        app.toggleClassIf('.starting-or-normal-price','hidden','showed', ()=> is_on_sale)

        this.unitPrice = Number(data.price) || 0;
        this.recomputeSubtotal();

        document.querySelectorAll('.total-price, .product-weight').forEach(el => {
          el.classList.remove('scale-pulse');
          void el.offsetWidth; // trigger reflow
          el.classList.add('scale-pulse');
        });
      });

      app.onClick('#btn-show-more', e => app.all('#more-content', div => {
        e.target.classList.add('is-expanded');
        div.style = `max-height:${div.scrollHeight}px`;
      }) || e.target.remove());
    }
}

Product.initiateWhenReady(['product.single']);

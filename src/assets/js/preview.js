// Static preview only. Live storefront behavior stays with Salla's components.
import Home from './home';
import { WeaponsCalculator } from './partials/weapons-calculator';

new Home().initRewardsLadder({
  formatNumber: value => Number(value).toFixed(2),
  subscribe: () => {},
});
document.querySelectorAll('#bav-weapons-calculator, #bav-weapons-calculator-mini')
  .forEach(container => new WeaponsCalculator(container));

const panel = document.getElementById('filters-menu');
const trigger = document.querySelector('[href="#filters-menu"]');
if (panel && trigger) {
  const desktop = window.matchMedia('(min-width: 1024px)');
  const backdrop = document.createElement('div');
  backdrop.className = 'bav-preview-backdrop';
  document.body.appendChild(backdrop);
  let previousOverflow = '';
  let isOpen = false;
  const setOpen = open => {
    open = open && !desktop.matches;
    if (open && !isOpen) previousOverflow = document.body.style.overflow;
    if (!open && isOpen) document.body.style.overflow = previousOverflow;
    isOpen = open;
    panel.classList.toggle('is-open', open);
    backdrop.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', String(open));
    if (open) {
      document.body.style.overflow = 'hidden';
      panel.querySelector('[data-filter-close]').focus();
    }
  };
  trigger.addEventListener('click', event => { event.preventDefault(); setOpen(true); });
  panel.querySelectorAll('[data-filter-close]').forEach(button => button.addEventListener('click', () => {
    setOpen(false);
    trigger.focus();
  }));
  backdrop.addEventListener('click', () => setOpen(false));
  desktop.addEventListener('change', () => setOpen(false));
  document.addEventListener('keydown', event => {
    if (!isOpen) return;
    if (event.key === 'Escape') { setOpen(false); trigger.focus(); }
    if (event.key === 'Tab') {
      const controls = [...panel.querySelectorAll('button, input')].filter(el => el.getClientRects().length);
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  const grid = document.querySelector('.s-products-index-grid');
  const cards = [...grid.querySelectorAll('.pcard')];
  const sort = document.getElementById('product-filter');
  const minInput = panel.querySelector('[data-filter-min]');
  const maxInput = panel.querySelector('[data-filter-max]');
  const error = panel.querySelector('[data-filter-error]');
  const empty = document.createElement('p');
  empty.className = 'bav-preview-empty';
  empty.textContent = 'ما فيه منتجات تطابق خياراتك.';
  empty.setAttribute('role', 'status');
  grid.after(empty);
  const apply = () => {
    const selected = [...panel.querySelectorAll('[data-filter-category]:checked')].map(el => el.value);
    const min = minInput.value === '' ? 0 : Number(minInput.value);
    const max = maxInput.value === '' ? Infinity : Number(maxInput.value);
    const valid = minInput.validity.valid && maxInput.validity.valid && min <= max;
    error.textContent = valid ? '' : 'تأكد أن الأسعار صحيحة وأن سعر «من» ما يتجاوز سعر «إلى».';
    let visible = 0;
    const ordered = [...cards];
    if (sort?.value === 'priceFromLowToTop') ordered.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
    if (sort?.value === 'priceFromTopToLow') ordered.sort((a, b) => Number(b.dataset.price) - Number(a.dataset.price));
    ordered.forEach(card => {
      const price = Number(card.dataset.price);
      const matches = valid && (!selected.length || selected.includes(card.dataset.category)) && price >= min && price <= max;
      card.hidden = !matches;
      if (matches) visible++;
      grid.appendChild(card);
    });
    empty.hidden = visible > 0 || !valid;
  };
  panel.addEventListener('input', apply);
  sort?.addEventListener('change', apply);
  panel.querySelector('[data-filter-reset]').addEventListener('click', () => {
    panel.querySelectorAll('input').forEach(input => { if (input.type === 'checkbox') input.checked = false; else input.value = ''; });
    apply();
  });
  // Actual sales rankings are unavailable in the static preview.
  sort?.querySelector('option[value="bestSell"]')?.remove();
  apply();
}

const form = document.querySelector('.product-form');
if (form) {
  const checkbox = document.getElementById('confirm-ok');
  const error = document.getElementById('confirm-err');
  const sync = () => {
    form.classList.toggle('needs-confirm', !!checkbox && !checkbox.checked);
    if (checkbox?.checked && error) error.style.display = 'none';
  };
  checkbox?.addEventListener('change', sync);
  sync();
  form.addEventListener('submit', event => {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (checkbox && !checkbox.checked) { if (error) error.style.display = 'block'; return; }
    let message = form.querySelector('[data-preview-checkout-note]');
    if (!message) {
      message = document.createElement('p');
      message.dataset.previewCheckoutNote = '';
      message.setAttribute('role', 'status');
      message.textContent = 'هذه معاينة للتصميم. إضافة المنتجات والدفع متاحة في متجر سلة الفعلي.';
      form.appendChild(message);
    }
  }, true);
  const subtotal = document.getElementById('bav-line-subtotal');
  const quantity = form.querySelector('salla-quantity-input');
  quantity?.addEventListener('change', () => {
    if (subtotal) subtotal.textContent = (Number(subtotal.dataset.unitPrice) * (Number(quantity.value) || 1)).toFixed(2) + ' ر.س';
  });
}

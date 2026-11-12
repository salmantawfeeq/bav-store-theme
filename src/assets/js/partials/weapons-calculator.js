import { ACCOUNT_TYPES, WEAPON_WHEELS, getWheel } from './weapons-wheels-data';

/**
 * Renders a working "how much CP do I need for this wheel" calculator into
 * a container element. Used two ways (طلبات_صاحب_المتجر.md, "حاسبة شحن
 * الأسلحة"):
 *   - full mode: a dedicated page, wheel is pickable (lockedWheelId omitted).
 *   - mini mode: embedded in one weapon's own product page, already scoped
 *     to that weapon's wheel (lockedWheelId set, no wheel dropdown shown).
 *
 * Mirrors the reference tool's own interaction model (gmlstore.app,
 * screenshot 2026-11-12): every pull starts "included" (green); clicking one
 * excludes it (red) - for a shopper who already did some pulls themselves
 * and only needs to buy the rest. The two optional fields (CP already owned,
 * % discount) reduce the total further on top of that.
 */
// Fallback Arabic strings, overridable per-instance via data-lang-* attributes
// on the container (same convention as home.js's rewards ladder), so a
// bilingual store can still localize this without touching the JS.
const DEFAULT_LANG = {
  accountType: 'نوع الحساب',
  wheelType: 'نوع العجلة',
  pullsLabel: 'اختر السحبات المطلوبة',
  pullsHint: 'اضغط على السحبة لاستبعادها — الخضراء تُحسب، الحمراء مستبعدة.',
  includeAll: 'تفعيل الكل',
  excludeAll: 'استبعاد الكل',
  ownedLabel: 'كم معك من نقاط CP في حسابك؟ (اختياري)',
  ownedNote: 'لأفضل نتيجة دقيقة، اكتب كمية CP الموجودة فعليًا في حسابك.',
  discountLabel: 'خصم على العجلة % (اختياري)',
  discountNote: 'لو فيه خصم على كل سحبة، اكتب النسبة هنا، وسيبها فاضية لو مفيش.',
  resultLabel: 'النتيجة',
};

export class WeaponsCalculator {
  constructor(container, { lockedWheelId = null } = {}) {
    this.container = container;
    this.lockedWheelId = lockedWheelId;
    this.accountType = ACCOUNT_TYPES[0].id;
    this.wheelId = lockedWheelId || WEAPON_WHEELS[0].id;
    this.excluded = new Set();
    this.ownedCp = 0;
    this.discountPercent = 0;
    this.lang = { ...DEFAULT_LANG };
    Object.keys(DEFAULT_LANG).forEach((key) => {
      const attr = container.dataset[`lang${key[0].toUpperCase()}${key.slice(1)}`];
      if (attr) this.lang[key] = attr;
    });
    this.render();
  }

  get wheel() {
    return getWheel(this.wheelId);
  }

  get pulls() {
    return this.wheel.pulls[this.accountType] || [];
  }

  compute() {
    const total = this.pulls.reduce((sum, cost, i) => (this.excluded.has(i) ? sum : sum + cost), 0);
    const afterOwned = Math.max(0, total - (Number(this.ownedCp) || 0));
    const discount = Math.min(100, Math.max(0, Number(this.discountPercent) || 0));
    return Math.round(afterOwned * (1 - discount / 100));
  }

  render() {
    const wheelOptions = WEAPON_WHEELS.map((w) => `<option value="${w.id}" ${w.id === this.wheelId ? 'selected' : ''}>${w.label}</option>`).join('');
    const accountTabs = ACCOUNT_TYPES.map((a) => `<button type="button" class="bav-wcalc-tab${a.id === this.accountType ? ' is-active' : ''}" data-account="${a.id}">${a.label}</button>`).join('');

    const t = this.lang;
    this.container.innerHTML = `
      <div class="bav-wcalc">
        <div class="bav-wcalc-row">
          <div class="bav-wcalc-label">${t.accountType}</div>
          <div class="bav-wcalc-tabs">${accountTabs}</div>
        </div>
        ${this.lockedWheelId ? '' : `
        <div class="bav-wcalc-row">
          <div class="bav-wcalc-label">${t.wheelType}</div>
          <select class="bav-wcalc-select" data-role="wheel-select">${wheelOptions}</select>
        </div>`}
        <div class="bav-wcalc-row">
          <div class="bav-wcalc-label-wrap">
            <div class="bav-wcalc-label">${t.pullsLabel}</div>
            <div class="bav-wcalc-hint">${t.pullsHint}</div>
          </div>
          <div class="bav-wcalc-bulk">
            <button type="button" class="bav-wcalc-bulk-btn is-include" data-role="include-all">${t.includeAll}</button>
            <button type="button" class="bav-wcalc-bulk-btn is-exclude" data-role="exclude-all">${t.excludeAll}</button>
          </div>
        </div>
        <div class="bav-wcalc-grid" data-role="grid"></div>
        <div class="bav-wcalc-row bav-wcalc-row--split">
          <div>
            <label class="bav-wcalc-label" for="wcalc-owned-${this._uid()}">${t.ownedLabel}</label>
            <input type="number" min="0" inputmode="numeric" class="bav-wcalc-input" data-role="owned" placeholder="0" id="wcalc-owned-${this._uid()}">
            <p class="bav-wcalc-note">${t.ownedNote}</p>
          </div>
          <div>
            <label class="bav-wcalc-label" for="wcalc-discount-${this._uid()}">${t.discountLabel}</label>
            <input type="number" min="0" max="100" inputmode="numeric" class="bav-wcalc-input" data-role="discount" placeholder="0" id="wcalc-discount-${this._uid()}">
            <p class="bav-wcalc-note">${t.discountNote}</p>
          </div>
        </div>
        <div class="bav-wcalc-result">
          <span class="bav-wcalc-result-label">${t.resultLabel}</span>
          <span class="bav-wcalc-result-value" data-role="result">0 <span class="bav-wcalc-result-cur">CP</span></span>
        </div>
      </div>
    `;

    this.bindEvents();
    this.renderGrid();
    this.renderResult();
  }

  _uid() {
    this.__uid = this.__uid || Math.random().toString(36).slice(2, 8);
    return this.__uid;
  }

  renderGrid() {
    const grid = this.container.querySelector('[data-role="grid"]');
    grid.innerHTML = this.pulls
      .map((cost, i) => `
        <button type="button" class="bav-wcalc-pull${this.excluded.has(i) ? ' is-excluded' : ''}" data-index="${i}">
          <span class="bav-wcalc-pull-n">${i + 1}</span>
          <span class="bav-wcalc-pull-cost num">${cost}<span class="bav-wcalc-pull-cur">CP</span></span>
        </button>`)
      .join('');
    grid.querySelectorAll('.bav-wcalc-pull').forEach((btn) => {
      btn.addEventListener('click', () => {
        const i = Number(btn.dataset.index);
        this.excluded.has(i) ? this.excluded.delete(i) : this.excluded.add(i);
        btn.classList.toggle('is-excluded');
        this.renderResult();
      });
    });
  }

  renderResult() {
    const resultEl = this.container.querySelector('[data-role="result"]');
    resultEl.innerHTML = `${this.compute().toLocaleString('en-US')} <span class="bav-wcalc-result-cur">CP</span>`;
  }

  bindEvents() {
    this.container.querySelectorAll('.bav-wcalc-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        this.accountType = tab.dataset.account;
        this.container.querySelectorAll('.bav-wcalc-tab').forEach((t) => t.classList.toggle('is-active', t === tab));
        this.excluded.clear();
        this.renderGrid();
        this.renderResult();
      });
    });

    const wheelSelect = this.container.querySelector('[data-role="wheel-select"]');
    if (wheelSelect) {
      wheelSelect.addEventListener('change', () => {
        this.wheelId = wheelSelect.value;
        this.excluded.clear();
        this.renderGrid();
        this.renderResult();
      });
    }

    this.container.querySelector('[data-role="include-all"]').addEventListener('click', () => {
      this.excluded.clear();
      this.renderGrid();
      this.renderResult();
    });
    this.container.querySelector('[data-role="exclude-all"]').addEventListener('click', () => {
      this.pulls.forEach((_, i) => this.excluded.add(i));
      this.renderGrid();
      this.renderResult();
    });

    this.container.querySelector('[data-role="owned"]').addEventListener('input', (e) => {
      this.ownedCp = e.currentTarget.value;
      this.renderResult();
    });
    this.container.querySelector('[data-role="discount"]').addEventListener('input', (e) => {
      this.discountPercent = e.currentTarget.value;
      this.renderResult();
    });
  }
}

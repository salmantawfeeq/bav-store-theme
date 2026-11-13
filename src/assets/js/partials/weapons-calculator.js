import { ACCOUNT_TYPES, WEAPON_WHEELS } from './weapons-wheels-data';

// Shared calculator for the live storefront and static preview.
// Fallback Arabic strings, overridable per-instance via data-lang-* attributes
// on the container (same convention as home.js's rewards ladder), so a
// bilingual store can still localize this without touching the JS.
const DEFAULT_LANG = {
  accountType: 'نوع الحساب',
  wheelType: 'نوع العجلة',
  pullsLabel: 'اختر السحبات المطلوبة',
  pullsHint: 'اضغط على السحبة لاستبعادها — البرتقالية محسوبة، والرمادية مستبعدة.',
  includeAll: 'تفعيل الكل',
  excludeAll: 'استبعاد الكل',
  ownedLabel: 'كم معك من نقاط CP في حسابك؟ (اختياري)',
  ownedNote: 'لأفضل نتيجة دقيقة، اكتب كمية CP الموجودة فعليًا في حسابك.',
  discountLabel: 'خصم على العجلة % (اختياري)',
  discountNote: 'إذا فيه خصم على السحبات، اكتب النسبة هنا، وخلّها فاضية إذا ما فيه. الخصم ما يشمل التطوير.',
  resultLabel: 'النتيجة',
};

export class WeaponsCalculator {
  constructor(container) {
    this.container = container;
    this.wheels = this._parseWheels(container.dataset.wheels) || WEAPON_WHEELS;
    this.accountType = ACCOUNT_TYPES[0].id;
    this.wheelId = this.wheels[0].id;
    this.excluded = new Set();
    this.ownedCp = 0;
    this.discountPercent = 0;
    this.upgradeId = '';
    this.lang = { ...DEFAULT_LANG };
    Object.keys(DEFAULT_LANG).forEach((key) => {
      const attr = container.dataset[`lang${key[0].toUpperCase()}${key.slice(1)}`];
      if (attr) this.lang[key] = attr;
    });
    this.render();
  }

  _parseWheels(json) {
    if (!json) return null;
    try {
      const wheels = JSON.parse(json);
      if (!Array.isArray(wheels) || !wheels.length) return null;
      return wheels.map(wheel => ({
        ...wheel,
        upgrades: WEAPON_WHEELS.find(known => known.label === wheel.label)?.upgrades || [],
      }));
    } catch (e) {
      return null;
    }
  }

  get wheel() {
    return this.wheels.find((w) => w.id === this.wheelId) || this.wheels[0];
  }

  get pulls() {
    // Prices arrive from twig as comma-separated strings (split in the
    // template, not cast there - the twig.js build used for the local
    // preview doesn't support a numeric-cast filter), so they land here as
    // strings. Number() them once, in the one place that actually sums
    // them, rather than trusting every call site to have cast correctly.
    return (this.wheel.pulls[this.accountType] || []).map(Number);
  }

  compute() {
    const total = this.pulls.reduce((sum, cost, i) => (this.excluded.has(i) ? sum : sum + cost), 0);
    const discount = Math.min(100, Math.max(0, Number(this.discountPercent) || 0));
    const upgrade = this.wheel.upgrades?.find(item => item.id === this.upgradeId);
    const upgradeCost = upgrade?.costs[this.accountType] || 0;
    const owned = Math.max(0, Number(this.ownedCp) || 0);
    return Math.max(0, Math.ceil(total * (1 - discount / 100) + upgradeCost - owned));
  }

  render() {
    const escape = value => String(value).replace(/[&<>"']/g, char => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[char]));
    const wheelOptions = this.wheels.map((w) => `<option value="${escape(w.id)}" ${w.id === this.wheelId ? 'selected' : ''}>${escape(w.label)}</option>`).join('');
    const accountTabs = ACCOUNT_TYPES.map((a) => `<button type="button" aria-pressed="${a.id === this.accountType}" class="bav-wcalc-tab${a.id === this.accountType ? ' is-active' : ''}" data-account="${a.id}">${a.label}</button>`).join('');

    const t = this.lang;
    this.container.innerHTML = `
      <div class="bav-wcalc">
        <div class="bav-wcalc-row">
          <div class="bav-wcalc-label">${t.accountType}</div>
          <div class="bav-wcalc-tabs">${accountTabs}</div>
        </div>

        <div class="bav-wcalc-row">
          <label class="bav-wcalc-label" for="wcalc-wheel-${this._uid()}">${t.wheelType}</label>
          <select id="wcalc-wheel-${this._uid()}" class="bav-wcalc-select" data-role="wheel-select">${wheelOptions}</select>
        </div>
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
        <div data-role="upgrades"></div>
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
    this.renderUpgrades();
    this.renderResult();
  }

  _uid() {
    this.__uid = this.__uid || Math.random().toString(36).slice(2, 8);
    return this.__uid;
  }

  renderGrid() {
    const grid = this.container.querySelector('[data-role="grid"]');
    if (this.pulls.length > 20 && this.pulls.every(cost => cost === this.pulls[0])) {
      const included = this.pulls.length - this.excluded.size;
      grid.style.gridTemplateColumns = 'minmax(0, 1fr)';
      grid.innerHTML = `<label class="bav-wcalc-label" for="wcalc-count-${this._uid()}">عدد السحبات المطلوبة (من 0 إلى ${this.pulls.length})</label>
        <input id="wcalc-count-${this._uid()}" class="bav-wcalc-input" type="number" min="0" max="${this.pulls.length}" step="1" value="${included}" data-role="pull-count">
        <p class="bav-wcalc-note">تكلفة السحبة: ${this.pulls[0]} CP — لكل سلاح.</p>`;
      grid.querySelector('input').addEventListener('input', event => {
        const count = Math.min(this.pulls.length, Math.max(0, Math.trunc(Number(event.target.value) || 0)));
        this.excluded = new Set(this.pulls.map((_, i) => i).filter(i => i >= count));
        this.renderResult();
      });
      return;
    }
    grid.style.gridTemplateColumns = '';
    grid.innerHTML = this.pulls
      .map((cost, i) => `
        <button type="button" aria-pressed="${!this.excluded.has(i)}" class="bav-wcalc-pull${this.excluded.has(i) ? ' is-excluded' : ''}" data-index="${i}">
          <span class="bav-wcalc-pull-n">${i + 1}</span>
          <span class="bav-wcalc-pull-cost num">${cost}<span class="bav-wcalc-pull-cur">CP</span></span>
        </button>`)
      .join('');
    grid.querySelectorAll('.bav-wcalc-pull').forEach((btn) => {
      btn.addEventListener('click', () => {
        const i = Number(btn.dataset.index);
        this.excluded.has(i) ? this.excluded.delete(i) : this.excluded.add(i);
        btn.classList.toggle('is-excluded');
        btn.setAttribute('aria-pressed', String(!this.excluded.has(i)));
        this.renderResult();
      });
    });
  }

  renderUpgrades() {
    const root = this.container.querySelector('[data-role="upgrades"]');
    root.replaceChildren();
    const upgrades = this.wheel.upgrades || [];
    if (!upgrades.length) return;
    const title = document.createElement('div');
    title.className = 'bav-wcalc-label';
    title.textContent = 'خيارات إضافية للميثك (اختياري)';
    root.appendChild(title);
    const choices = upgrades.length > 1 ? [{ id: '', label: 'بدون تطوير', costs: {} }, ...upgrades] : upgrades;
    choices.forEach(upgrade => {
      const label = document.createElement('label');
      label.className = 'bav-wcalc-upgrade';
      const input = document.createElement('input');
      input.type = upgrades.length === 1 ? 'checkbox' : 'radio';
      input.name = 'wcalc-upgrade-' + this._uid();
      input.value = upgrade.id;
      input.checked = this.upgradeId === upgrade.id;
      input.addEventListener('change', () => {
        this.upgradeId = input.checked ? upgrade.id : '';
        this.renderResult();
      });
      label.append(input, document.createTextNode(upgrade.label + (upgrade.id ? ` + ${upgrade.costs[this.accountType].toLocaleString('en-US')} CP` : '')));
      root.appendChild(label);
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
        this.container.querySelectorAll('.bav-wcalc-tab').forEach(t => {
          t.classList.toggle('is-active', t === tab);
          t.setAttribute('aria-pressed', String(t === tab));
        });
        this.excluded.clear();
        this.renderGrid();
        this.renderUpgrades();
        this.renderResult();
      });
    });

    const wheelSelect = this.container.querySelector('[data-role="wheel-select"]');
    if (wheelSelect) {
      wheelSelect.addEventListener('change', () => {
        this.wheelId = wheelSelect.value;
        this.upgradeId = '';
        this.excluded.clear();
        this.renderGrid();
        this.renderUpgrades();
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

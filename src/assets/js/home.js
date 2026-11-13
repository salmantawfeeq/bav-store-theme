import BasePage from "./base-page";

class Home extends BasePage {
    onReady() {
        this.initRewardsLadder();
    }

    /**
     * `cart.total` (the global header-context variable, real on every page -
     * not just views/pages/cart.twig's own richer `cart` object) is a
     * pre-formatted display string (currency symbol, thousands separator,
     * possibly Eastern Arabic-Indic digits), not a raw float. Converting
     * digits first then stripping everything else is what makes this safe
     * regardless of which digit set or separators the active locale uses.
     */
    parseMoneyString(value) {
        const arabicIndicDigits = '٠١٢٣٤٥٦٧٨٩';
        const normalized = String(value ?? '').replace(/[٠-٩]/g, (d) => arabicIndicDigits.indexOf(d));
        const numeric = normalized.replace(/[,٬]/g, '').replace(/٫/g, '.').match(/\d+(?:\.\d+)?/)?.[0];
        return Number(numeric) || 0;
    }

    initRewardsLadder({ formatNumber = (value) => salla.helpers.number(value, 2), subscribe = (callback) => salla.cart.event.onUpdated(callback) } = {}) {
        const ladder = document.getElementById('bav-ladder');
        if (!ladder) return;

        const levels = Array.from(ladder.querySelectorAll('.lv')).map(el => ({
            el,
            amount: Number(el.dataset.amt),
            chip: el.querySelector('.lv-chip'),
        })).sort((a, b) => a.amount - b.amount);

        const lang = {
            addMore: ladder.dataset.langAddMore,
            almostThere: ladder.dataset.langAlmostThere,
            allUnlocked: ladder.dataset.langAllUnlocked,
            unlocked: ladder.dataset.langUnlocked,
            next: ladder.dataset.langNext,
            locked: ladder.dataset.langLocked,
        };
        // "Almost there" only replaces the generic "add :amount SAR" line once
        // the shopper is genuinely close to the next level - showing it at any
        // distance would read as misleading ("one step away" while still far).
        const ALMOST_THERE_RATIO = 0.2;

        const fill = document.getElementById('bav-lad-fill');
        const text = document.getElementById('bav-lad-text');
        const total = document.getElementById('bav-lad-total');
        const maxAmount = levels.length ? levels[levels.length - 1].amount : 0;

        const render = (cartTotal) => {
            total.textContent = formatNumber(cartTotal);

            cartTotal = Math.max(0, cartTotal);
            const currentLevel = levels.filter(level => cartTotal >= level.amount).pop();
            const nextLevel = levels.find(level => cartTotal < level.amount);
            if (nextLevel) {
                const remaining = nextLevel.amount - cartTotal;
                text.textContent = (remaining <= nextLevel.amount * ALMOST_THERE_RATIO)
                    ? lang.almostThere
                    : lang.addMore.replace(':amount', formatNumber(remaining));
            } else {
                text.textContent = lang.allUnlocked;
            }

            const progress = maxAmount ? Math.min(100, (cartTotal / maxAmount) * 100) : 0;
            fill.style.width = `${progress}%`;

            levels.forEach(level => {
                const isUnlocked = level === currentLevel;
                const isNext = !isUnlocked && level === nextLevel;
                level.el.style.borderColor = isUnlocked || isNext ? 'var(--accent)' : '#232329';
                level.el.style.boxShadow = isNext ? '0 20px 60px -30px var(--accent)' : 'none';

                if (isUnlocked) {
                    level.chip.textContent = lang.unlocked;
                    level.chip.style.background = 'var(--accent)';
                    level.chip.style.border = '1px solid var(--accent)';
                    level.chip.style.color = '#0A0A0B';
                } else if (isNext) {
                    level.chip.textContent = lang.next;
                    level.chip.style.background = '#17171B';
                    level.chip.style.border = '1px solid var(--accent)';
                    level.chip.style.color = 'var(--accent)';
                } else {
                    level.chip.textContent = lang.locked;
                    level.chip.style.background = '#131316';
                    level.chip.style.border = '1px solid #2A2A31';
                    level.chip.style.color = '#6E6E78';
                }
            });
        };

        render(this.parseMoneyString(ladder.dataset.initialTotal));
        subscribe(summary => render(this.parseMoneyString(summary.total)));
    }
}

Home.initiateWhenReady(['index']);
export default Home;

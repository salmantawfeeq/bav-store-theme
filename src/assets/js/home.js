import BasePage from "./base-page";

class Home extends BasePage {
    onReady() {
        this.initRewardsLadder();
    }

    initRewardsLadder() {
        const ladder = document.getElementById('bav-ladder');
        if (!ladder) return;

        const levels = Array.from(ladder.querySelectorAll('.lv')).map(el => ({
            el,
            amount: Number(el.dataset.amt),
            chip: el.querySelector('.lv-chip'),
        })).sort((a, b) => a.amount - b.amount);

        const lang = {
            addMore: ladder.dataset.langAddMore,
            allUnlocked: ladder.dataset.langAllUnlocked,
            unlocked: ladder.dataset.langUnlocked,
            next: ladder.dataset.langNext,
            locked: ladder.dataset.langLocked,
        };

        const fill = document.getElementById('bav-lad-fill');
        const text = document.getElementById('bav-lad-text');
        const total = document.getElementById('bav-lad-total');
        const maxAmount = levels.length ? levels[levels.length - 1].amount : 0;

        const render = (cartTotal) => {
            total.textContent = salla.helpers.number(cartTotal, 2);

            const nextLevel = levels.find(level => cartTotal < level.amount);
            if (nextLevel) {
                text.textContent = lang.addMore.replace(':amount', salla.helpers.number(nextLevel.amount - cartTotal, 2));
            } else {
                text.textContent = lang.allUnlocked;
            }

            const progress = maxAmount ? Math.min(100, (cartTotal / maxAmount) * 100) : 0;
            fill.style.width = `${progress}%`;

            levels.forEach(level => {
                const isUnlocked = cartTotal >= level.amount;
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

        render(Number(ladder.dataset.initialTotal) || 0);
        salla.cart.event.onUpdated(summary => render(Number(summary.total) || 0));
    }
}

Home.initiateWhenReady(['index']);

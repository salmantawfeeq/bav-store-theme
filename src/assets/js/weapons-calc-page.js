import BasePage from './base-page';
import { WeaponsCalculator } from './partials/weapons-calculator';

class WeaponsCalcPage extends BasePage {
    onReady() {
        const container = document.getElementById('bav-weapons-calculator');
        if (!container) return;
        new WeaponsCalculator(container);
    }
}

WeaponsCalcPage.initiateWhenReady(['page.single']);

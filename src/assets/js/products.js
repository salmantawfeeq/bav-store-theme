import BasePage from './base-page';
import MobileMenu from 'mmenu-light';
class Products extends BasePage {
    onReady() {
        let productsList = app.element('salla-products-list'),
            urlParams = new URLSearchParams(window.location.search)


        // Set Sort
        if (urlParams.has('sort')) {
            app.element('#product-filter').value = urlParams.get('sort');
        }


        // Sort Products
        app.on('change', '#product-filter', async event => {
            window.history.replaceState(null, null, salla.helpers.addParamToUrl('sort', event.currentTarget.value));
            productsList.sortBy = event.currentTarget.value;
            await productsList.reload();
        });

        salla.event.on('salla-products-list::products.fetched', res=>{
            res.title && (app.element('#page-main-title').innerHTML = res.title);
        });


        this.initiateMobileMenu()
    }

    initiateMobileMenu() {
        let filters = app.element("#filters-menu"),
            trigger = app.element("a[href='#filters-menu']"),
            close = app.element("button.close-filters");

        if (!filters) {
            return;
        }
        filters = new MobileMenu(filters, "(max-width: 1023px)");
        const drawer = filters.offcanvas({ position: salla.config.get('theme.is_rtl') ? "right" : 'left' });
        const closeDrawer = () => {
            document.body.classList.remove('filters-opened');
            trigger?.setAttribute('aria-expanded', 'false');
            drawer.close();
        };
        trigger?.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.add('filters-opened');
            trigger.setAttribute('aria-expanded', 'true');
            drawer.open();
        });
        close?.addEventListener('click', closeDrawer);
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') closeDrawer();
        });
        window.matchMedia('(min-width: 1024px)').addEventListener('change', closeDrawer);
        salla.event.on('salla-filters::changed', closeDrawer);
    }
}

Products.initiateWhenReady([
    'product.index',
    'product.index.latest',
    'product.index.offers', 'product.index.search',
    'product.index.tag',
]);

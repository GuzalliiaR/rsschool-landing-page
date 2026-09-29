export function collapseController(catalog, buttonMoreCards) {
    function isCollapsed() {
        const cards = catalog.querySelectorAll('.card');
        const widthWindow = window.innerWidth;

        if (widthWindow <= 600 && cards.length > 3) return true;
        if (widthWindow <= 1320 && cards.length > 4) return true;
        if (widthWindow > 1320 && cards.length > 6) return true;

        return false;
    }

    function showButtonMoreCards() {
        if (isCollapsed()) {
            catalog.classList.add('is-collapsed');
        } else {
            catalog.classList.remove('is-collapsed');
        };
    }

    function init() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (catalog.querySelector('.card')) showButtonMoreCards();
            }, 200);
        });

        buttonMoreCards.addEventListener('click', () => {
            catalog.classList.remove('is-collapsed');
        });
    }

    return { init, showButtonMoreCards };
}
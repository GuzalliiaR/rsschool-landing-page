import { initThemeToggle } from '../shared/theme.js';
import { catalogRenderer } from '../features/catalog/render.js';
import { collapseController } from '../features/catalog/collapse.js';
import { modalCard } from '../features/catalog/modal.js';

const catalog = document.getElementById('catalog');
const templateCard = document.getElementById('card-template');
const templateModalCard = document.getElementById('modalCard__template');
const buttonMoreCards = document.getElementById('moreCards-btn');
const dialog = document.getElementById('modalCard');

async function initCatalog() {
    initThemeToggle();

    const collapse = collapseController(catalog, buttonMoreCards);
    const renderer = catalogRenderer(catalog, templateCard, collapse.showButtonMoreCards);
    const modal = modalCard(catalog, dialog, templateModalCard, renderer.getProducts);

    collapse.init();     // вешаются addEventListener('resize', fn()) и buttonMoreCards.addEventListener('click', fh()) (- это побочный side effect)
    modal.init();

    const buttonsChoiceCategory = document.querySelectorAll('.category-btn');
    buttonsChoiceCategory.forEach((button) => {
        button.addEventListener('click', () => {
            buttonsChoiceCategory.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.filter;
            renderer.renderCatalog(category);
        });
    });

    await renderer.initialRender();   // Изначальный рендер страницы каталога
}

initCatalog();

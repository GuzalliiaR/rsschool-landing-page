import { getCatalog } from './api.js';

export function catalogRenderer(catalog, templateCard, showButtonMoreCards) {
    let allProducts = null;

    function renderCatalog(category) {
        if (!Array.isArray(allProducts)) return;

        catalog.innerHTML = '';

        const filteredProducts = category === 'all'
            ? allProducts
            : allProducts.filter(product => product.category.split(' ').includes(category));
        
        filteredProducts.forEach(product => {
            const fragment = templateCard.content.cloneNode(true);

            const img = fragment.querySelector('.card img');
            img.src = product.imgSrc;
            img.alt = "Photo ".concat(product.name);
            img.width = product.width;
            img.height = product.height;

            const cardTitle = fragment.querySelector('.card h4');
            cardTitle.textContent = product.name;

            const size = fragment.querySelector('.card .size-default');
            size.textContent = product.sizeDefault;

            const price = fragment.querySelector('.card .price');
            price.textContent = product.price;

            catalog.appendChild(fragment);
        });

        showButtonMoreCards();
    }

    async function initialRender() {
        allProducts = await getCatalog();

        if (!Array.isArray(allProducts)) {
            catalog.innerHTML = '<p>Не удалось загрузить каталог</p>';
            return;
        }

        renderCatalog('all');
    }

    return { renderCatalog, initialRender };
}
// 1. Переключение темы dark light --------------------------------------------------------

const buttonThemeToggle = document.getElementById('theme-toggle');
const THEME_KEY = 'theme';

function applyTheme(theme) { 
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
};

applyTheme(localStorage.getItem(THEME_KEY) || 'light');

buttonThemeToggle.addEventListener('click', () => {
    // document.documentElement - это и есть сам корневой html тег
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

    applyTheme(nextTheme);
});



// 2. Управление отображением количества элементов в каталоге -----------------------------------

const buttonMoreCards = document.getElementById('moreCards-btn');
const catalog = document.getElementById('catalog');

function isCollapsed() {
    const countOfCards = catalog.querySelectorAll('.card');
    const widthWindow = window.innerWidth;

    if (widthWindow > 1320 && countOfCards.length > 6) return true;
    if (widthWindow <= 1320 && countOfCards.length > 600 && countOfCards > 4) return true;
    if (widthWindow <= 600 && countOfCards.length > 3) return true;

    return false;
}

function showButtonMoreCards() {
    if (isCollapsed()) {
        catalog.classList.add('is-collapsed');
    }
};

buttonMoreCards.addEventListener('click', () => {
    catalog.classList.remove('is-collapsed');
});




// 3. Создание карточек .card по шаблону и данным из products.json ---------------------------------

// Имитация обращения к серверу  (api.js)
async function fetchProducts(API_URL) {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(`Failed to load products: ${response.status}`);
    }

    return response.json();
};


// Логика рендера карточек в каталоге (catalog.js)
const API_URL = './products.json';

async function renderCatalog() {
    const templateCard = document.getElementById('card-template');
    const catalog = document.getElementById('catalog');

    try {
        const products = await fetchProducts(API_URL);

        products.forEach(product => {
            const fragment = templateCard.content.cloneNode(true);

            const article = fragment.querySelector('.card');
            article.dataset.category = product.category;

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

    } catch (error) {
        console.log(error);
        catalog.innerHTML = '<p>Не удалось загрузить каталог</p>';
    }
};


renderCatalog();




// 4. Рендер каталога ------------------------------------------------------------------------------------

const buttonsChoiceCategory = document.querySelectorAll('.category-btn');

buttonsChoiceCategory.forEach((button) => {
    button.addEventListener('click', () => {
        buttonsChoiceCategory.forEach(button => button.classList.remove('active'));
        button.classList.add('active');

        // Здесь можно делать действия после клика по кнопке категории
    });
})

console.log(buttonsChoiceCategory);

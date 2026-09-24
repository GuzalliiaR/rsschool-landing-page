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

if (isCollapsed()) {
    catalog.classList.add('is-collapsed')
}

buttonMoreCards.addEventListener('click', () => {
    catalog.classList.remove('is-collapsed');
});


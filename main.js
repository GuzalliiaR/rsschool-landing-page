const buttonThemeToggle = document.getElementById('theme-toggle');
const THEME_KEY = 'theme';

function applyTheme(theme) { 
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    // запись в кнопку атрибут aria-pressed со значением true или false (если =false, то кнопка выкл, если =true, то вкл)
    // выкл = 'light' тема, вкл = 'dark' тема
    buttonThemeToggle.setAttribute('aria-pressed', theme === 'dark');
};

applyTheme(localStorage.getItem(THEME_KEY) || 'light');

buttonThemeToggle.addEventListener('click', () => {
    // document.documentElement - это и есть сам корневой html тег
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

    applyTheme(nextTheme);
});
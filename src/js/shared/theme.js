const THEME_KEY = 'theme';

export function initThemeToggle() {
    const buttonThemeToggle = document.getElementById('theme-toggle');
    const htmlRoot = document.documentElement;  // document.documentElement - это и есть сам корневой html тег

    function applyTheme(theme) {
        htmlRoot.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
    };

    const isDarkModeDefault = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultSystemTheme = isDarkModeDefault ? 'dark' : 'light';

    applyTheme(localStorage.getItem(THEME_KEY) || defaultSystemTheme);

    buttonThemeToggle.addEventListener('click', () => {
        const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

        applyTheme(nextTheme);
    });
}
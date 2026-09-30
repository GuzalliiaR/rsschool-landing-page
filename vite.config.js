import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import injectHTML from 'vite-plugin-html-inject';

export default defineConfig({
    // base: базовый путь, по которому сайт будет развёрнут.
    // './' → относительные URL ассетов → сайт работает из любой папки
    // (в т.ч. GitHub Pages /rsschool-landing-page/). '/' → только из корня.
    base: './',

    // plugins: список расширений Vite. injectHTML() добавляет поддержку
    // HTML-инклюдов (вынос header/footer/burger в отдельные файлы).
    plugins: [injectHTML()],

    // server: настройки dev-сервера (команда `vite`).
    server: {
        open: true,     // автоматически открыть браузер
        port: 5173,     // порт dev-сервера
    },

    // build: настройки production-сборки (команда `vite build`).
    build: {
        outDir: 'dist',        // куда складывать результат
        emptyOutDir: true,     // очищать dist перед каждой сборкой
        rollupOptions: {
            // input: точки входа. Приложение многостраничное (MPA),
            // поэтому объявляем ДВА html-файла → Rollup соберёт два выхода.
            input: {
                main: fileURLToPath(new URL('./index.html', import.meta.url)),
                catalog: fileURLToPath(new URL('./catalog.html', import.meta.url)),
            },
        },
    },
});

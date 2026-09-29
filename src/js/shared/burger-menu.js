export function initBurgerMenu() {
    const dialog = document.getElementById('burgerMenu');
    const burgerBtn = document.getElementById('burger__btn');

    function openMenu() {
        dialog.show();
        burgerBtn.classList.add('is-active');
        burgerBtn.title = "Close menu";
        burgerBtn.setAttribute('aria-label', "Close menu");
    }

    function closeMenu() {
        if (!dialog.open) return;
        dialog.close();
        burgerBtn.classList.remove('is-active');
        burgerBtn.title = "Open menu";
        burgerBtn.setAttribute('aria-label', "Open menu");
    }

    burgerBtn.addEventListener('click', () => {
        dialog.open ? closeMenu() : openMenu();
    });

    document.addEventListener('keydown', e => {
        if (e.key === "Escape" && dialog.open) closeMenu();
    });

    dialog.addEventListener('click', e => {
        if (e.target.closest('a')) closeMenu();
    });
}
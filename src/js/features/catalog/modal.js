export function modalCard(catalog, dialog, templateModalCard, getProducts) {

    function openModal(cardName) {
        const products = getProducts();
        const fragment = templateModalCard.content.cloneNode(true);
        const product = products.find(pr => pr.name === cardName);

        const addSelectionButtons = (prop, propName, btnOrig, container) => {
            product[prop].forEach(option => {
                const cloneBtn = btnOrig.cloneNode(true);
                cloneBtn.classList.remove('visually-hidden');
                cloneBtn.textContent = option[propName];
                container.appendChild(cloneBtn);
            });
        };

        const img = fragment.querySelector('img');
        img.src = product.imgSrc;
        img.alt = "Photo ".concat(product.name);
        img.width = product.width;
        img.height = product.height;

        const modalTitle = fragment.querySelector('.modalCard__title');
        modalTitle.textContent = product.name;

        const description = fragment.querySelector('.modalCard__description');
        description.textContent = product.description;

        const choseSize = fragment.querySelector('.modalCard__choseSize');
        const bntSize = fragment.querySelector('.btnSize');
        addSelectionButtons('sizes', 'size', bntSize, choseSize);

        const choseSkinType = fragment.querySelector('.modalCard__choseSkinType');
        const btnSkinType = fragment.querySelector('.btnSkinType');
        addSelectionButtons('skinType', 'type', btnSkinType, choseSkinType);

        const choseSmell = fragment.querySelector('.modalCard__choseSmell');
        const btnSmell = fragment.querySelector('.btnSmell');
        addSelectionButtons('fragrance', 'nameFragrance', btnSmell, choseSmell);
       
        const price = fragment.querySelector('.price');
        price.textContent = product.price;

        dialog.innerHTML = '';
        dialog.appendChild(fragment);
        dialog.showModal();
    }

    function init() {
        catalog.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            if (!card) return;
            openModal(card.dataset.cardName);
        });

        dialog.addEventListener('click', (e) => {
            // закрытие модального окна по клику на кнопку Close
            if (e.target.closest('#closeModalCardBtn')) {
                dialog.close();
                return;
            }

            // закрытие модального окна по клику вне контейнера модального окна
            // (dialog::backdrop занимает все пространство снаружи модалки)
            if (e.target === dialog) {
                dialog.close();
                return;
            }
        });
    }
    
    return { init };
}
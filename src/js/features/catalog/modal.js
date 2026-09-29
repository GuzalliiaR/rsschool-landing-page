export function modalCard(catalog, dialog, templateModalCard, getProducts) {
    let product = null;
    let extraPrice = {
        size: 0,
        skinType: 0,
        smell: 0
    };

    function addSelectionButtons(prop, propName, defaultVal, btnOrig, container) {
        product[prop].forEach(option => {
            const cloneBtn = btnOrig.cloneNode(true);
            cloneBtn.classList.remove('visually-hidden');
            cloneBtn.textContent = option[propName];
            if (option[propName] === defaultVal) cloneBtn.classList.add('isActive');
            container.appendChild(cloneBtn);
        });
    };

    function openModal(cardName) {
        const products = getProducts();
        if (!Array.isArray(products)) return;

        product = products.find(pr => pr.name === cardName);
        if (!product) return;

        extraPrice = {
            size: 0,
            skinType: 0,
            smell: 0
        };

        const fragment = templateModalCard.content.cloneNode(true);

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
        addSelectionButtons('sizes', 'size', product.sizeDefault, bntSize, choseSize);

        const choseSkinType = fragment.querySelector('.modalCard__choseSkinType');
        const btnSkinType = fragment.querySelector('.btnSkinType');
        addSelectionButtons('skinType', 'type', product.skinTypeDefault, btnSkinType, choseSkinType);

        const choseSmell = fragment.querySelector('.modalCard__choseSmell');
        const btnSmell = fragment.querySelector('.btnSmell');
        addSelectionButtons('fragrance', 'nameFragrance', product.fragranceDefault, btnSmell, choseSmell);
       
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

            // Обработка событий нажатия любой button в модальном окне карточки
            if ((e.target.closest('.btnSize')) || (e.target.closest('.btnSkinType')) || (e.target.closest('.btnSmell'))) {
                const clickedElement = e.target;
                const siblings = Array.from(clickedElement.parentElement.children);
                siblings.forEach(button => button.classList.remove('isActive'));

                if (e.target.closest('.btnSize')) {
                    extraPrice.size = Number(product.sizes.find(sizeObj => sizeObj.size === clickedElement.textContent).addPrice);
                    clickedElement.classList.add('isActive');
                }

                if (e.target.closest('.btnSkinType')) {
                    extraPrice.skinType = Number(product.skinType.find(typeObj => typeObj.type === clickedElement.textContent).addPrice); 
                    clickedElement.classList.add('isActive');
                }
                
                if (e.target.closest('.btnSmell')) {
                    extraPrice.smell = Number(product.fragrance.find(fragranceObj => fragranceObj.nameFragrance === clickedElement.textContent).addPrice);
                    clickedElement.classList.add('isActive');
                }
                
                const extraPriceTotal = Object.values(extraPrice).reduce((sum, current) => sum + current, 0);
                const TotalPrice = Number(product.price) + extraPriceTotal;

                dialog.querySelector('.modalCard__totalPrice .price').textContent = TotalPrice.toFixed(2);
            }
        });
    }
    
    return { init };
}
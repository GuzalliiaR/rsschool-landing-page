import { initThemeToggle } from '../shared/theme.js';

initThemeToggle();


// Новый код:
const slider = document.querySelector('.reviews-section__slider');
const slide = document.getElementsByClassName('reviews-section__slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
const numberSlides = slide.length;
console.log(slider);

function updateSliderPosition() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
};

nextBtn.addEventListener('click', () => {
    if (currentIndex < numberSlides - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;  // Возврат к первому слайду
    }
    updateSliderPosition();
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = numberSlides - 1;  // Переход на последний слайд
    }
    updateSliderPosition();
})
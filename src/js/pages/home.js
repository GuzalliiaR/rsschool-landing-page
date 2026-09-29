import { initThemeToggle } from '../shared/theme.js';
import { createSlider } from '../features/home/slider.js';
import { initBurgerMenu } from '../shared/burger-menu.js';

const slider = document.querySelector('.reviews-section__slider');
const slide = document.getElementsByClassName('reviews-section__slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

initThemeToggle();
initBurgerMenu();

const createSliderInPage = createSlider(slider, slide, prevBtn, nextBtn);
createSliderInPage.init();
export function createSlider(slider, slide, prevBtn, nextBtn) {
    let currentIndex = 0;
    const numberSlides = slide.length;

    function updateSliderPosition() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function init() {
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
        });
    }

    return { init };
}
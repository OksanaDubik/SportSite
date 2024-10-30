let cardIfFirst = ['до конца лета', 'при покупке двух карт', 'до конца лета', 'при покупке трёх карт', 'до конца лета', 'при покупке трёх карт']
let cardIfSecond = ['', '14 месяцев', '', '14 месяцев', '', '14 месяцев']
let cardAnons = ['безлимит', 'безлимит', 'безлимит', 'безлимит', 'утренний абонемент', 'дневной абонемент']
let cardPrice = ['5800 ₽', '12000 ₽', '12000 ₽', '18000 ₽', '2000 ₽', '2000 ₽']

let sliders = document.querySelector('.slides')//общий слайдер

let newsCard = []//массив под одинарные блоки для слайдера

for (let i = 0; i <= 6; i++) {
    newsCard.push(
        `<div class="news__card">
              <p class="news-card__if">${cardIfFirst[i]}
              <br>${cardIfSecond[i]}</p>
              <p class="news-card__anons">${cardAnons[i]}</p>
              <p class="news-card__price">${cardPrice[i]}</p>
              <button class=" news__btn openModal">забронировать</button>
            </div> `
    )
}

let newsCards = [] //массив под сдвоенные блоки для слайдера
let innerWidth = window.innerWidth//узнаем ширину окна

if(innerWidth > 1024 ){//если окно шире 1024px, в слайдере по два блока

    for(let i = 0; i < newsCard.length; i += 2){
        if(i + 1 < newsCard.length){
            newsCards.push(` <div class="news__cards slide">${newsCard[i]}${newsCard[i + 1]}</div>`)
        }
    }
}
if(innerWidth <= 1024 ){//если окно уже, или равно 1024px, в слайдере по одному блоку
    for(let i = 0; i < newsCard.length; i ++){
        if(i + 1 < newsCard.length){
            newsCards.push(` <div class="news__cards slide">${newsCard[i]}</div>`)
        }
    }
}

sliders.insertAdjacentHTML("afterbegin", newsCards.join('').toString())//в slides затолкали slide

let currentIndex = 0;
const slides = document.querySelectorAll('.slide');

const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    currentIndex = (index + slides.length) % slides.length;

    const slideWidth = slides[currentIndex].clientWidth;
    const slidesContainer = document.querySelector('.slides');
    slidesContainer.style.transform = `translateX(${-currentIndex * slideWidth}px)`;

    // Обновить пагинацию
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

// Слушатели событий для управления пагинацией
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Поддержка мыши и тачскрина
let startX, endX;

document.querySelector('.slider').addEventListener('mousedown', (event) => {
    startX = event.clientX;
});

document.querySelector('.slider').addEventListener('mouseup', (event) => {
    endX = event.clientX;
    if (startX > endX + 50) {
        nextSlide();
    } else if (startX < endX - 50) {
        prevSlide();
    }
});

document.querySelector('.slider').addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
});

document.querySelector('.slider').addEventListener('touchend', (event) => {
    endX = event.changedTouches[0].clientX;
    if (startX > endX + 50) {
        nextSlide();
    } else if (startX < endX - 50) {
        prevSlide();
    }
});


/**
 * ф-я позволяет открыть слайдер только после того, как слайды находятся в зоне видимости
 * */

document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const slides = document.querySelector('.slides')

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function checkSlidesVisibility() {
        if (isInViewport(slider)) {
            slides.style.cssText = 'display: flex; justify-content: space-around;'
            slider.style.cssText = 'animation: opacitySlider 3s;'

            window.removeEventListener('scroll', checkSlidesVisibility); // Удаляем слушатель

            modalFile();//подключаем ф-ю открытия модального окна из modal.js
        }
    }

    window.addEventListener('scroll', checkSlidesVisibility);
    setTimeout(checkSlidesVisibility, 10000);
})





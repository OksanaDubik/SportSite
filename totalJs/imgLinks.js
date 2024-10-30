const imgLinks = document.querySelector('.links__content')
const imgText = ['Стретчинг', 'Мини-группы', 'Йога', 'Солярий', 'Массажный кабинет', 'Сауна', 'Спортивный бар', 'Фитнес-тестирование']

const imgContentModal = ['00руб/час Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, nisi.',
    '1000руб/час Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae cum debitis deserunt distinctio dolore fuga hic ipsa reiciendis. Accusantium at aut autem cumque dolores ex, maxime molestias neque omnis voluptas?\n.',
    '300руб/час Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, nisi.',
    '100руб/мин Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, nisi.',
    '1000руб/час Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae cum debitis deserunt distinctio dolore fuga hic ipsa reiciendis. Accusantium at aut autem cumque dolores ex, maxime molestias neque omnis voluptas?\n.',
    '00руб/час Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, nisi.',
    '300руб/час Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae cum debitis deserunt distinctio dolore fuga hic ipsa reiciendis. Accusantium at aut autem cumque dolores ex, maxime molestias neque omnis voluptas?\n.',
    '400руб/час Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, nisi.']

let innerWidthImg = window.innerWidth//ширина окна

for (let i = 0; i <= 7; i++) {
    if (innerWidthImg > 414) {
        imgLinks.insertAdjacentHTML("beforeend",
            `<div id="${[i]}"
                  class="img__link"
                  style="background: url('./img-links/images/${[i + 1]}i.jpg') no-repeat,
                  url('./img-links/images/${[i + 1]}i.webp') no-repeat;">
                   <p class="img__title">${imgText[i]} </p>
                   <p class="img__text" style = "color: black">${imgText[i]}<br>${imgContentModal[i]}</p>
            </div>`
        )
    }

    if (innerWidthImg <= 414) {
        imgLinks.insertAdjacentHTML("beforeend",
            `<div id="${[i]}"
 class="img__link"
  style="background: url('./img-links/images/${[i + 1]}i.jpg') no-repeat, url('./img-links/images/${[i + 1]}i.webp') no-repeat; background-size: cover"
>
<p class="img__title">${imgText[i]}</p>
<p class="img__text" style = "color: black">${imgText[i]}<br>${imgContentModal[i]}</p>
</div>`
        )
    }
}

let hover = document.querySelectorAll('.img__link')
hover.forEach(el => {
    el.addEventListener('mouseover', function (event) {
        event.currentTarget.querySelector('.img__text').style.display = "block"
    })
    el.addEventListener('mouseout', function (event) {
        event.currentTarget.querySelector('.img__text').style.display = "none"
    })
})

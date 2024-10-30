let calendar = document.querySelector('.calendar');
const timetable = {
    trainingDirection: ['', 'Аэробные тренировки', 'Силовые тренировки', 'Смешанные тренировки', 'Танцевальные тренировки', 'Низкоударные тренировки'],
    trainingTime: ['', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
    trainingDay: ['', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    trainingPlace: ['', 'Студия йоги', 'Тренажерный зал', 'Зал групповых программ', 'Зона кардиотренажеров'],
    trainer: ['', 'Мария Иванова', 'Петр Сидоров', 'Татьяна Ким', 'Ли Сан', 'Федор Петров'],

}

/*
* ф-я отрисовывает выпадающие пункты
* */
function render(clName, idName, road) {
    let nameClass = document.querySelector(clName)
    for (let i = 1; i < road.length; i++) {
        nameClass.innerHTML += `<div class="dropDownParagraph" >${road[i]}</div>`
    }
    document.querySelector(idName).addEventListener('click', function (event) {
        nameClass.classList.toggle('visibleBlock')
    })
}

render('.invisible__left', '#instrP', timetable.trainer)
render('.invisible__right', '#directionP', timetable.trainingDirection)
render('.invisible__left', '#instructorsImg', timetable.trainer)
render('.invisible__right', '#directionImg', timetable.trainingDirection)


function closeInvisibleBlock() {
    let righteBlock = document.querySelector('.invisible__right')
    let lefBlock = document.querySelector('.invisible__left')

    let dropDirection = document.querySelector('#direction')
    let dropInstructors = document.querySelector('#instructors')

    let dropDirP = document.getElementById('directionP')
    let dropInstrP = document.getElementById('instrP')

    let dropDirImg = document.getElementById('directionImg')
    let dropInstrImg = document.getElementById('instructorsImg')
    
    window.onclick = function (event) {

        if (event.target !== righteBlock &&
            event.target !== lefBlock &&
            event.target !== dropDirection &&
            event.target !== dropInstructors &&
            event.target !== dropDirImg &&
            event.target !== dropInstrImg &&
            event.target !== dropDirP &&
            event.target !== dropInstrP) {
            righteBlock.classList.remove('visibleBlock')
            lefBlock.classList.remove('visibleBlock')
        }
    }
}

closeInvisibleBlock()

let pagIinnerWidth = window.innerWidth//узнаем ширину окна
//присваиваем классы ячейкам, чтобы добиться выделения четн/нечетн строк

for (let i = 1; i < 105; i++) {
    let cell = document.createElement('div')
    cell.id = `${i}`

    if ((Number(cell.id) / 8) % 2 <= 1 && (Number(cell.id) / 8) % 2 !== 0 && Number(cell.id) !== 1) {
        cell.className = 'cell'
    } else cell.className = 'cellDark'

    if (cell.id === "1") {
        cell.className = 'cellTransperent'
    }

    calendar.appendChild(cell)
}

/**
 * ф-я getDatesOfCurrentWeek создает даты текущей недели
 */
const datesOfWeek = [];
function getDatesOfCurrentWeek() {
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // 0 - воскресенье, 1 - понедельник, ..., 6 - суббота
    const startOfWeek = new Date(currentDate);

    // Устанавливаем дату начала недели (понедельник)
    startOfWeek.setDate(currentDate.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);

        // Форматируем дату в нужный формат (дд.мм.гггг)
        const formattedDate = date.toLocaleDateString('ru-RU');
        datesOfWeek.push(formattedDate);
    }
}
getDatesOfCurrentWeek()

function fillCalendar(dataId, direction, place, trainer, day, time) {
    let innerCalendar = document.getElementById(dataId)

    innerCalendar.innerHTML = `
                                <p class="content__direction">${timetable.trainingDirection[direction]}</p>
                                <p class="content__place">${timetable.trainingPlace[place]}</p>
                                <p  class="content__trainer">${timetable.trainer[trainer]}</p>
                                <p class="content__day">${timetable.trainingDay[day]}</p>
                                <p class="content__time">${timetable.trainingTime[time]}</p>
                            `
}


//присваиваем id ячейкам
let mapId = []

calendar.childNodes.forEach(el => {
    mapId.push(el.id)
})

//выбираем id ячеек первого столбца (время начала занятий),
// по вызову ф-ии fillCalendar заполняем ячейки
mapId.forEach((el) => {
    if (el % 8 === 1) {
        fillCalendar(el, 0, 0, 0, 0, (el - 1) / 8)//время
    }
})
mapId.forEach((el) => {
    if (el > 1 && el < 9) {

        fillCalendar(el, 0, 0, 0, el - 1, 0)//дни недели        
    }
})

// Функция для загрузки данных из JSON файла
async function loadJSON() {

    try {
        const response = await fetch('.././timeTable.json'); // Укажите путь к вашему JSON файлу
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        let data = await response.json(); // Парсинг JSON данных
        // Вывод данных в консоль (или используйте их по необходимости)

        let arr = Object.values(data).map(i => Object.values(i));
        arr.map(element => element.map(el => {
            fillCalendar(el[0], +el[1], el[2], el[3], el[4], el[5])//вызовом ф-ии fillCalendar заполняем ячейки календаря
        }))

    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }

}

loadJSON()


//добавляем дату к строке день недели. В ячейке сегодняшнего дня добавляется слово "Сегодня"
let day = document.querySelectorAll('.content__day')
for (let i = 1; i < 8; i++) {
    if (new Date().toLocaleDateString('ru-RU') === datesOfWeek[i - 1]) {
        day[i].insertAdjacentHTML("afterbegin", ` <span class ='content__day'> сегодня, </span><br> <span class ='content__day'> ${datesOfWeek[i - 1]} </span> <br>`)
    }
    else day[i].insertAdjacentHTML("afterbegin", ` <span class ='content__day'> ${datesOfWeek[i - 1]} </p> `)
}


/**
 * ф-я findElement(paragraph, cont)  выделяет  ячейки красным фоном, соответствующие выбранным пунктам    
 * paragraph - пункт в списке dropdown
 * cont - соответствующая строка в ячейке                     
 */
let count = 0
function findElement(paragraph, cont) {
    let dropDownParagraph = document.querySelectorAll(paragraph)
    dropDownParagraph.forEach(el => {
        el.addEventListener('click', function (event) {
            count++
            if (count / 2 > 1) {
                let FindElem = document.querySelectorAll('.find__elem')
                FindElem.forEach(element => element.classList.remove('find__elem'))
                count -= 2
            }
            let content = event.target.textContent
            let trainerFind = document.querySelectorAll(cont)
            trainerFind.forEach(elTrainer => {
                if (content === elTrainer.textContent) {
                    elTrainer.parentElement.classList.add('find__elem')
                }
            })
        })
    })
}
findElement('.dropDownParagraph', '.content__trainer')
findElement('.dropDownParagraph', '.content__direction')

/**
 * ф-я показывает зафиксированную первую строку с днями недели при прокрутке вниз 
 */
for (let i = 2; i <= 8; i++) {
    document.getElementById(200 + i).innerText =
        document.getElementById(i).innerText
    let blockWidth = document.getElementById(i).offsetWidth
    document.getElementById(200 + i).style.width = (blockWidth - 10) + "px"
}

let widthFirstColumn = document.getElementById(1).offsetWidth //ширина первой колонки (с часами)

const hiddenBlock = document.querySelector('.hidden-string');//скрытый блок
hiddenBlock.style.marginLeft = (widthFirstColumn + 20) + 'px'//смещаем скрытый блок на ширину первой колонки

window.addEventListener('scroll', function () {

    const scrollY = window.scrollY;
    if (pagIinnerWidth > 1440) {
        if (scrollY > 850 && pagIinnerWidth > 768) {
            hiddenBlock.style.display = 'flex';
        } else {
            hiddenBlock.style.display = 'none';
        }
    }
    if (pagIinnerWidth <= 1440) {
        if (scrollY > 700 && pagIinnerWidth > 768) {
            hiddenBlock.style.display = 'flex';
            hiddenBlock.style.marginLeft = (widthFirstColumn + 14) + 'px'
        } else {
            hiddenBlock.style.display = 'none';
        }
    }
    if (pagIinnerWidth <= 1024) {
        if (scrollY > 650 && pagIinnerWidth > 768) {
            hiddenBlock.style.display = 'flex';
            hiddenBlock.style.marginLeft = (widthFirstColumn + 12) + 'px'
        } else {
            hiddenBlock.style.display = 'none';
        }
    }
});
const menuIcon = document.getElementById('menu-icon');
const navbar = document.getElementById('navbar');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active'); // Переключение класса активного состояния
    menuIcon.innerHTML = navbar.classList.contains('active') ? '&times;' : '&#9776;'; // Изменение иконки на крестик
});

//открываем содержимое меню
let navItems = document.querySelectorAll('.dropdown')

navItems.forEach(el => {
    el.addEventListener('click', function (event) {
        let ddLength = document.querySelectorAll('.open-dropdown').length
        if (ddLength >= 1) {
            document.querySelector('.open-dropdown').classList.remove('open-dropdown')
        }
        event.target.querySelector('.dropdown-content').classList.add('open-dropdown')
    })
})
//прячем содержимое меню по клику на экран вне меню
window.addEventListener("click", function (event) {
    const dropdownContent = document.querySelectorAll('.open-dropdown')
    if (event.target.className !== 'open-dropdown' && event.target.className !== 'dropdown') {
        dropdownContent.forEach(el => {
            el.classList.remove('open-dropdown')
        })
    }
})
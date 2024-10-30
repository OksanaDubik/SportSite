 function modalFile (){
    // Получаем элементы
    let modal = document.querySelector(".myModal");
    let btn = document.querySelectorAll(".openModal");
    let span = document.getElementsByClassName("close")[0];



// Когда пользователь нажимает кнопку, открываем модальное окно
    btn.forEach(el => {
        el.addEventListener('click', function (){
            modal.style.display = "block";
        })
    })


// Когда пользователь нажимает на (x), закрываем модальное окно
    span.onclick = function() {
        modal.style.display = "none";
    }

// Когда пользователь нажимает в любом месте вне окна, закрываем модальное окно
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}
modalFile()




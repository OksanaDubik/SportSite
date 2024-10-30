// указываем стоимость абонемента
document.querySelectorAll('.subscription-option').forEach(el => {
    el.addEventListener('click', function (event) {
        let elem = event.currentTarget.querySelector('input')
        document.querySelector('.form_label__checked').textContent = `Стоимость абонемента:  ${elem.dataset.price}`
    })
})

document.querySelector('.orderForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Останавливаем отправку формы
    let el = document.querySelector('input[type="radio"]:checked');
    // Получение значений полей
    let firstName = document.querySelector('.firstName');
    let lastName = document.querySelector('.lastName');
    let middleName = document.querySelector('.middleName');
    let email = document.querySelector('.email');
    let phone = document.querySelector('.phone');
    let subscription = document.querySelector('input[name="subscription"]:checked');

    // Проверка валидности
    let errorMessage = document.querySelector('.errorMsg');
    errorMessage.textContent = ""; // Очищаем предыдущее сообщение об ошибке


    if (!firstName.value.trim() || !lastName.value.trim() || !middleName.value.trim() || !email.value.trim() || !phone.value.trim() || !subscription) {
        errorMessage.textContent = "Пожалуйста, заполните все поля.";
        return;
    }

    const phonePattern = /^[0-9]{10,15}$/;
    if (!phonePattern.test(phone.value.trim())) {
        errorMessage.textContent = "Номер телефона должен содержать от 10 до 15 цифр.";
        return;
    }

    alert("Заявка отправлена успешно!");
    //Обнуляем поля
    firstName.value = ''
    lastName.value = ''
    middleName.value = ''
    email.value = ''
    phone.value = ''
    subscription.checked = false
    errorMessage.textContent = ''

});

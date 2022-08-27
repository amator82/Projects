const items = document.querySelectorAll('.countdown-item > h4') //querySelectorAll - дает псевдомассив
const countdownElement = document.querySelector('.countdown')

// Назначаем дату отсчета
let countdownDate = new Date(2023, 01, 20, 0, 0, 0).getTime() //год, месяц, число, часы, минуты, секунды //getTime - миллисекунды
console.log('Заданное время до события в мс = ' + countdownDate)

function getCountTime() {
    // Получить текущее время
    const now = new Date().getTime()
    console.log('Текущее время = ' + now)

    // Получить разницу во времени
    const distance = countdownDate - now
    console.log('Разница во времени = ' + distance)

    // 1с = 1000мс
    // 1м = 60с
    // 1ч = 60м
    // 1д = 24ч

    // Создаем переменные в миллисекундах
    const oneDay = 24 * 60 * 60 * 1000 // 86 400 000
    const oneHour = 60 * 60 * 1000 // 3 600 000
    const oneMinute = 60 * 1000 // 60 000

    // Подсчет для дней, часов, минут и секунд
    let days = Math.floor(distance / oneDay)
    let hours = Math.floor((distance % oneDay) / oneHour)
    let minutes = Math.floor((distance % oneHour) / oneMinute)
    let seconds = Math.floor((distance % oneMinute) / 1000)

    // Создаем массив с переменными
    const values = [days, hours, minutes, seconds]
    console.log(
        'Время до события = ' +
            values[0] +
            ' дней ' +
            values[1] +
            ' часов ' +
            values[2] +
            ' минут ' +
            values[3] +
            ' секунд'
    )

    // Добавляем значение переменных на страницу
    items.forEach(function (item, index) {
        item.textContent = values[index]
    })

    if (distance < 0) {
        clearInterval(countdown)
        countdownElement.innerHTML = "<h4 class='expired'>Время вышло</h4>" // innerHTML
    }
}

// Обновление счетчика каждую секунду
let countdown = setInterval(getCountTime, 1000)

// Иницилизация текущего времени
getCountTime()

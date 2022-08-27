let button = document.getElementById('finishTest')

button.addEventListener('click', checkTest)

function checkTest() {
    let result = 0

    let answer1 = document.getElementById('question1').value
    if (answer1 === "12") {
        result++
    }

    let answer2 = document.getElementById('question2').value
    if (answer2 === "60") {
        result++
    }

    let answer3 = document.getElementById('question3').value
    if (answer3 === "104") {
        result++
    }

    let answer4 = document.getElementById('question4').value
    if (answer4 === "5") {
        result++
    }

    let answer5 = document.getElementById('question5').value
    if (answer5 === "60") {
        result++
    }

    alert('Количество правильных ответов: ' + result)
}

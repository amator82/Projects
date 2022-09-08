const container = document.getElementById('board')
const SQUARE_NUMBER = 400

for (let i = 0; i < SQUARE_NUMBER; i++) {
    const square = document.createElement('div')
    square.classList.add('square')

    square.addEventListener('click', (el) => {
        el.target.style.opacity = 0
    })

    square.addEventListener('mouseover', () => {
        setColor(square)
    })
    square.addEventListener('mouseleave', () => {
        removeColor(square)
    })

    container.append(square)

}

function setColor(el) {
    const color = getRandomColor()

    el.style.backgroundColor = `${color}`
    el.style.boxShadow = ` 0 0 10px ${color}`
}

function removeColor(el) {
    setTimeout(() => {
        el.style.backgroundColor = '#adaaaa'
        el.style.boxShadow = '0 0 2px #fff'
    }, 500)
}

function getRandomColor() {
    const randomColor = (Math.random().toString(16) + '000000').substring(2,8).toUpperCase()
    console.log(randomColor);

    return randomColor
}
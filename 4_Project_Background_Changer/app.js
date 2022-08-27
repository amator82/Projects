const button = document.getElementById('btn')
const color = document.querySelector('.color')


const hex = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F'
]

button.addEventListener('click', () => {
    // let hexColor = colors[getRandomNumber()]
    let hexColor = generateHex()
    document.body.style.backgroundColor = hexColor
    color.textContent = hexColor
})

function generateHex() {
    let hexColor = "#";
    
    for( let num = 0; num < 6; num++) {
        hexColor += hex[getRandomNumber()]
    }
    
    return hexColor
}

function getRandomNumber() {
    return Math.floor(Math.random() * hex.length)
}

// const colors = [
//     '#FF5733',
//     '#F9FF33',
//     '#3371FF',
//     'red',
//     'green',
//     'rgb(85, 255, 51)'
// ]
function isWebp() {
    function testWebP(callback) {
        let webP = new Image()
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2)
        }
        webP.src =
            'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
    }

    testWebP(function (support) {
        let className = support === true ? 'webp' : 'no-webp'
        document.documentElement.classList.add(className)
    })
}
isWebp()

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const width = 10
    const scoreDisplay = document.getElementById('score')
    const startBtn = document.getElementById('start-button')

    let squares = Array.from(document.querySelectorAll('.grid div'))
    let nextRandom = 0
    let timerId
    let score = 0

    const colors = ['orange', 'red', 'purple', 'green', 'blue']

    //* The Tetrominoes
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]

    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ]

    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]

    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]

    const theTetrominoes = [
        lTetromino,
        zTetromino,
        tTetromino,
        oTetromino,
        iTetromino
    ]

    let currentPosition = 5
    let currentRotation = 0

    //* Randomly select a Tetromino and its first position
    let random = Math.floor(Math.random() * theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation]

    //* Draw the tetromino
    function draw() {
        current.forEach((index) => {
            squares[currentPosition + index].classList.add('tetromino')

            squares[currentPosition + index].style.backgroundColor =
                colors[random]
        })
    }

    //* Undraw the Tetromino
    function undraw() {
        current.forEach((index) => {
            squares[currentPosition + index].classList.remove('tetromino')
            squares[currentPosition + index].style.backgroundColor = ''
        })
    }

    //* Assign functions to keyCodess
    function control(e) {
        if (e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        }
    }

    document.addEventListener('keyup', control)

    //* Move down function
    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    //* Freeze function
    function freeze() {
        if (
            current.some((index) =>
                squares[currentPosition + index + width].classList.contains(
                    'taken'
                )
            )
        ) {
            current.forEach((index) =>
                squares[currentPosition + index].classList.add('taken')
            )
            //* start a new tetromino falling
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
            gameOver()
        }
    }

    //* Move the tetromino left, unless is at the edge or there is a blockage
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(
            (index) => (currentPosition + index) % width === 0
        )
        if (!isAtLeftEdge) currentPosition -= 1

        if (
            current.some((index) =>
                squares[currentPosition + index].classList.contains('taken')
            )
        ) {
            currentPosition += 1
        }

        draw()
    }

    //* Move the tetromino right, unless is at the edge or there is a blockage
    function moveRight() {
        undraw()

        const isAtRightEdge = current.some(
            (index) => (currentPosition + index) % width === width - 1
        )

        if (!isAtRightEdge) currentPosition += 1

        if (
            current.some((index) =>
                squares[currentPosition + index].classList.contains('taken')
            )
        ) {
            currentPosition -= 1
        }

        draw()
    }

    //* Rotate the tetromino
    function rotate() {
        undraw()
        currentRotation++

        if (currentRotation === current.length) {
            currentRotation = 0
        }
        current = theTetrominoes[random][currentRotation]
        draw()
    }

    //* Show up-next tetromino in mini-grid
    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4

    let displayIndex = 0

    //* The tetrominos without rotations
    const upNextTetrominoes = [
        //? lTetromino
        [1, displayWidth + 1, displayWidth * 2 + 1, 2],

        //? zTetromino
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],

        //? tTetromino
        [1, displayWidth, displayWidth + 1, displayWidth + 2],

        //? oTetromino
        [0, 1, displayWidth, displayWidth + 1],

        //? iTetromino
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1]
    ]

    //* Display the shape in the mini-grid display
    function displayShape() {
        displaySquares.forEach((square) => {
            square.classList.remove('tetromino')
            square.style.backgroundColor = ''
        })

        upNextTetrominoes[nextRandom].forEach((index) => {
            displaySquares[displayIndex + index].classList.add('tetromino')
            displaySquares[displayIndex + index].style.backgroundColor =
                colors[nextRandom]
        })
    }

    //* Add functionality to the button
    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            draw()

            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)

            displayShape()
        }
    })

    //* Add score
    function addScore() {
        for (let i = 0; i < 199; i += width) {
            const row = [
                i,
                i + 1,
                i + 2,
                i + 3,
                i + 4,
                i + 5,
                i + 6,
                i + 7,
                i + 8,
                i + 9
            ]

            if (
                row.every((index) => squares[index].classList.contains('taken'))
            ) {
                score += 10
                scoreDisplay.innerHTML = score

                row.forEach((index) => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetromino')
                    squares[index].style.backgroundColor = ''
                })

                const squareRemoved = squares.splice(i, width)

                squares = squareRemoved.concat(squares)
                squares.forEach((cell) => grid.appendChild(cell))
            }
        }
    }

    //* Game over
    function gameOver() {
        if (
            current.some((index) =>
                squares[currentPosition + index].classList.contains('taken')
            )
        ) {
            scoreDisplay.innerHTML = 'end'
            clearInterval(timerId)
        }
    }
})

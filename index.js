const gameBoard = document.querySelector('.sky')

class Obstacle {
    constructor(direction, height) {
        if (direction === 'down') {
            this.bottom = 0
            this.height = height
        }
        else if(direction === 'up') {
            this.bottom = height + obstacleGap
            this.height = screenHeight - this.bottom
        }
        this.direction = direction
        this.width = obstacleWidth
        this.left = screenWidth
        this.active = true

        this.visual = document.createElement('div')
        this.visual.classList.add('obstacle')
        this.visual.style.width = `${this.width}px`
        this.visual.style.height = `${this.height}px`
        this.visual.style.bottom = `${this.bottom}px`
        this.visual.style.left = `${this.left}px`

        gameBoard.appendChild(this.visual)
    }
}
class Bird {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.bottom = (screenHeight/2)-(this.height/2)
        this.left = 200

        this.visual = document.createElement('div')
        this.visual.classList.add('bird')
        this.visual.style.width = `${this.width}px`
        this.visual.style.height = `${this.height}px`
        this.visual.style.bottom = `${this.bottom}px`
        this.visual.style.left = `${this.left}px`

        gameBoard.appendChild(this.visual)
    }
}

const [screenWidth, screenHeight] = [1000, 650]
const [birdWidth, birdHeight] = [50, 50]
const obstacleGap = 250
const obstacleWidth = 50
const intervalSpeed = 30
const fallingSpeed = 5
const jumpingSpeed = 10
const movingSpeed = 7
const jumpingHeight = 100
const obstacles = []
const creatingDistance = 700

let fallingId
let jumpingId
let movingId
let scoreShowingId

let score = 0
let canJump = false
let isJumping = false
let isCreating = false

const falling = () => {
    fallingId = setInterval(() => {
        if(bird.bottom > 0) {
            bird.bottom -= fallingSpeed
            bird.visual.style.bottom = `${bird.bottom}px`
        }
        else {
            clearInterval(fallingId)
            document.removeEventListener('keydown', listenerKeyDown)
            document.removeEventListener('keyup', listenerKeyUp)

            showScore()
        }
    },intervalSpeed)
}

const jumping = () => {
    clearInterval(fallingId)
    const startingHeight = bird.bottom + bird.height
    jumpingId = setInterval(() => {
    const currentHeight = bird.bottom + bird.height
        if (startingHeight + jumpingHeight > currentHeight
            && currentHeight <= screenHeight - jumpingSpeed) {
            bird.bottom += jumpingSpeed
            bird.visual.style.bottom = `${bird.bottom}px`
            if(bird.bottom + bird.height >= screenHeight) {
                clearInterval(jumpingId)
                falling()
            }
        }
        else {
            clearInterval(jumpingId)
            falling()
        }
    },intervalSpeed)
}

const createAndMoveObstacles = () => {
    const height = Math.random() * 400
    const newObstacleDown = new Obstacle('down', height)
    const newObstacleUp = new Obstacle('up', height)
    obstacles.push(newObstacleDown)
    obstacles.push(newObstacleUp)

    movingId = setInterval(() => {
        if(bird.bottom > 0) {
            obstacles.forEach((obst, index, obArray) => {
                obst.left -= movingSpeed
                obst.visual.style.left = `${obst.left}px`

                if(
                    ((     obst.direction === 'down'
                        && bird.bottom <= obst.height)
                    ||
                    (      obst.direction === 'up'
                        && bird.bottom + bird.height >= obst.bottom)
                    )
                    && bird.left + bird.width >= obst.left
                    && bird.left <= obst.left + obst.width
                ) {
                    clearInterval(movingId)
                    clearInterval(fallingId)
                    document.removeEventListener('keydown', listenerKeyDown)
                    document.removeEventListener('keyup', listenerKeyUp)

                    showScore()
                }

                if(index === obArray.length - 1
                    &&  obst.left < creatingDistance + movingSpeed
                    &&  obst.left > creatingDistance - movingSpeed) {
                        const height = Math.random() * 400

                        const newObstacleDown = new Obstacle('down', height)
                        const newObstacleUp = new Obstacle('up', height)
                        obstacles.push(newObstacleDown)
                        obstacles.push(newObstacleUp)
                }

                if(obst.left + obst.width < bird.left && obst.active
                     && obst.direction == 'up') {
                    score++
                    obst.active = false
                }
            })
        }
    },intervalSpeed)

}

const listenerKeyDown = (e) => {
    if(!canJump && e.key === 'ArrowUp') {
        canJump = true
        clearInterval(jumpingId)
        jumping()
    }
}

const listenerKeyUp = (e) => {
    if(e.key === 'ArrowUp') {
        canJump = false
    }
}

const showScore = () => {
    scoreShowingId = setTimeout(() => {
        const scoreDiv = document.createElement('div')
        scoreDiv.classList.add('score-container')
        const scoreText = document.createElement('p')
        scoreText.classList.add('score')
        scoreText.innerText = `Your score: ${score}`

        scoreDiv.appendChild(scoreText)
        gameBoard.appendChild(scoreDiv)
    }, 400)
}
const startGame = () => {
    falling()
    createAndMoveObstacles()

    document.addEventListener('keydown', listenerKeyDown)
    document.addEventListener('keyup', listenerKeyUp)
}

const bird = new Bird(birdWidth, birdHeight)
startGame()

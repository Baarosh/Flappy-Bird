const gameBoard = document.querySelector('.sky')

class Obstacle {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.bottom = 0
        this.left = screenWidth

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
const [obstacleWidth, obstacleHeight] = [50, 200]
const intervalSpeed = 100
const fallingSpeed = 5
const jumpingSpeed = 20
const movingSpeed = 10
const jumpingHeight = 100
const obstacles = []

let fallingId
let jumpingId
let movingId

let canJump = false
let isJumping = false

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
        }
    },intervalSpeed)
}

const jumping = () => {
    clearInterval(fallingId)
    const currentHeight = bird.bottom + bird.height
    jumpingId = setInterval(() => {
        if (currentHeight + jumpingHeight > bird.bottom + bird.height) {
            bird.bottom += jumpingSpeed
            bird.visual.style.bottom = `${bird.bottom}px`
        }
        else {
            clearInterval(jumpingId)
            falling()
        }
    },intervalSpeed)
}

const createAndMoveObstacles = () => {
    const newObstacle = new Obstacle(obstacleWidth, obstacleHeight)
    obstacles.push(newObstacle)

    movingId = setInterval(() => {
        if(bird.bottom > 0) {
            obstacles.forEach((obst) => {
                obst.left -= movingSpeed
                obst.visual.style.left = `${obst.left}px`


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

const startGame = () => {
    falling()
    createAndMoveObstacles()

    document.addEventListener('keydown', listenerKeyDown)
    document.addEventListener('keyup', listenerKeyUp)
}

const bird = new Bird(birdWidth, birdHeight)
startGame()

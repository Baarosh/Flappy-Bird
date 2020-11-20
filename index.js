const gameBoard = document.querySelector('.sky')

class Obstacle {
    constructor() {

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

let fallingId
let jumpingId

let canJump = false
let isJumping = false

const falling = () => {
    fallingId = setInterval(() => {
        if(bird.bottom > 0) {
            bird.bottom -= 5
            bird.visual.style.bottom = `${bird.bottom}px`
        }
        else {
            clearInterval(fallingId)
            document.removeEventListener('keydown', listenerKeyDown)
            document.removeEventListener('keyup', listenerKeyUp)
        }
    },50)
}

const jumping = () => {
    clearInterval(fallingId)
    const currentHeight = bird.bottom + bird.height
    jumpingId = setInterval(() => {
        if (currentHeight+100 > bird.bottom + bird.height) {
            bird.bottom += 20
            bird.visual.style.bottom = `${bird.bottom}px`
        }
        else {
            clearInterval(jumpingId)
            falling()
        }
    },50)
}

const createObstacles = () => {
}

const removeListeners = () => {
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

    document.addEventListener('keydown', listenerKeyDown)
    document.addEventListener('keyup', listenerKeyUp)
}

const bird = new Bird(birdWidth, birdHeight)
startGame()

const gameBoard = document.querySelector('.sky')
const bird = document.querySelector('.bird')

class Obstacle {
    constructor() {
        this.upOrDown = Math.floor(Math.random() * 2)
        this.height = 400 - (Math.random() * 150)
        this.visual = document.createElement('div')
        this.left = 1000

        this.visual.classList.add('obstacle')
        this.visual.style.width = '70px'
        this.visual.style.left = `${this.left}px`
        this.visual.style.height = `${this.height}px`

        if(this.upOrDown === 0) this.visual.style.top = 0
        else this.visual.style.bottom = 0

        gameBoard.appendChild(this.visual)
    }
}

let birdBottom
let birdLeft
const gravity = 2
const jumping = 5
const jumpHigh = 100
let gravityIntervalId
let jumpIntervalId
let isJumping = false
let isKeyDown = false
const obstacles = [new Obstacle()]
let obstacleIntervalId
const obstaclesSpeed = 4



const startGravity = () => {
    gravityIntervalId = setInterval(() => {
        if(birdBottom > 0) {
            birdBottom -= gravity
            bird.style.bottom = `${birdBottom}px`
        }
        else clearInterval(gravityIntervalId)
    }, 10)
}

const jump = () => {
    clearInterval(gravityIntervalId)
    clearInterval(jumpIntervalId)

        if (birdBottom > 0) {
            birdPosition = birdBottom

            jumpIntervalId = setInterval(() => {

              if(birdBottom < birdPosition + jumpHigh && birdBottom < 595) {
                  birdBottom += jumping
                  bird.style.bottom = `${birdBottom}px`
                  isJumping = true
              }
              else {
                  isJumping = false
                  clearInterval(jumpIntervalId)
              }
            }, 10)
        }

    startGravity()
}

const createObstacles = () => {
    obstacleIntervalId = setInterval(() => {
        if(birdBottom > 0) {

            obstacles.forEach((ob) => {
                if (ob.left === 500) {
                    const obs = new Obstacle()
                    obstacles.push(obs)
                }

                if (ob.left < -30) {
                    ob.visual.classList.remove('obstacle')
                    // obstacles.shift()

                } else {
                    ob.left -= obstaclesSpeed
                    ob.visual.style.left = `${ob.left}px`

                    if((ob.left >= 50)
                    && (ob.left <= 120)
                    && ((ob.upOrDown === 0 && birdBottom >= ob.height - 50)
                    || (ob.upOrDown === 1 && birdBottom <= ob.height))
                    ) {
                        clearInterval(obstacleIntervalId)
                        removeListeners()
                    }
                }
            })
        }
        else {
            clearInterval(obstacleIntervalId)
            removeListeners()
        }
    }, 10)
}

const removeListeners = () => {
    document.removeEventListener('keydown', controlUp)
    document.removeEventListener('keyup', controlDown)
}

const controlUp = (e) => {
    if(!isKeyDown && e.key === "ArrowUp") {
        isKeyDown = true
        jump()
    }
}

const controlDown = (e) => {
    if (e.key === "ArrowUp") isKeyDown = false
}

const startGame = () => {
    bird.style.left = '50px'
    bird.style.bottom = '320px'
    birdLeft = 50
    birdBottom = 320

    startGravity()
    createObstacles()

    document.addEventListener('keydown',controlUp)
    document.addEventListener('keyup', controlDown)
}

startGame()

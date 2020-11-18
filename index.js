const gameBoard = document.querySelector('.sky')
const bird = document.querySelector('.bird')
let birdBottom
let birdLeft
const gravity = 2
const jumping = 10
const jumpHigh = 100
let gravityIntervalId
let jumpIntervalId
let isJumping = false
let isKeyDown = false
const obstacles = []

class Obstacle {
    constructor() {
        this.upOrDown = Math.floor(Math.random() * 2)
        this.height = 400 - (Math.random() * 150)
        console.log(this.height)
        this.visual = document.createElement('div')
        this.visual.classList.add('obstacle')
        this.visual.style.width = '70px'
        this.visual.style.left = '1000px'
        this.visual.style.height = `${this.height}px`

        if(this.upOrDown === 0) this.visual.style.top = 0
        else this.visual.style.bottom = 0

        gameBoard.appendChild(this.visual)
    }
}

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


const startGame = () => {
    bird.style.left = '50px'
    bird.style.bottom = '320px'
    birdLeft = 50
    birdBottom = 320

    startGravity()



    document.addEventListener('keydown', (e) => {
        if(!isKeyDown && e.key === "ArrowUp") {
            isKeyDown = true
            jump()
        }
    })
    document.addEventListener('keyup', (e) => {
        if (e.key === "ArrowUp") isKeyDown = false

    })
}

startGame()

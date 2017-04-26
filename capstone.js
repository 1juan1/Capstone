var mouse = {x: 0, y: 0 }

var score = 0
var scoreText = makeText("Score: -", 660, 50, 25, "sans-serif", "white", 1)

var house1
var house2
var house3
var house4

var player = makeImage("images/spaceship.png", 100, 150, 40, 40, 1)

var enemies = []

var missiles = []

var gameOver = false

function drawPlayer(){
    setX(player, mouse.x)
    setY(player, mouse.y)
}

function drawEverything(){
    drawPlayer()
    drawEnemies()
    drawMissiles()
    checkCollisionsPlayer()
    checkCollisionsMissiles()
      if(gameOver == false){
        requestAnimationFrame(drawEverything)
    }

}

function makeEnemies(){
    var enemy = makeImage("images/alien space ship.png", 100, 150, 40, 40, 1)
    setX(enemy, random(0, 800))
    enemies.push(enemy)
   if(gameOver == false){
    setTimeout(makeEnemies, 3000)

}
}

function drawEnemies(){
    for(var i = 0; i < enemies.length; i++) {
    move(enemies[i], 0,5 )

    if(getY(enemies[i]) > 400){
        setY(enemies[i], 0)
    }
  }
}


function fireMissile() {
    var width = 7
    var rocket = makeImage("images/rocket.png", 100, 150, 40, 40, 1)
    setY(rocket, getY(player) + width + 10)
    setX(rocket, getX(player) + width + 10)
    missiles.push(rocket)


}

 document.addEventListener("click", fireMissile)

function drawMissiles(){
    for(var i = 0; i < missiles.length; i++){
        move(missiles[i], 0, -3)
    }
}

function checkCollisionsPlayer() {
    for(var i = 0; i < enemies.length; i++){
        if(collide(player, enemies[i]) == true){
        removeElement(player)
        removeArrayElement(enemies, i)
        gameOver = true
        }
    }
}


function checkCollisionsMissiles() {
    for (var j = 0; j < enemies.length; j++) {
        for (var i = 0; i < missiles.length; i++) {
          if (missiles[i] != undefined && enemies[j] != undefined) {
          if (collide(missiles[i], enemies[j], 0, -20) == true) {
                // YOUR CODE HERE
                drawExplosion(getX(missiles[i]),getY(missiles[i]))
                removeArrayElement(missiles,i)
                 removeArrayElement(enemies,j)
                 i = i + 1
                 j = j + 1
                 score = score +1
                 scoreText.textContent =  "score: " + score
            }
        }
      }
    }
}

drawEverything()
makeEnemies()

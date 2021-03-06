let ship
let temp1
let temp2
let asteroids
let margin = 40
let bullets
let i
let lives = 3


function preload() {
  temp1 = loadImage("Assets/ship1.png")
  temp2 = loadImage("Assets/y-bullet.png")
}

function setup() {
  createCanvas(1440, 800);

  ship = createSprite(width / 2, height / 2);
  ship.addImage("normal", temp1)
  ship.addAnimation("thrust", "Assets/ship1.png", "Assets/ship4.png")
  ship.setCollider("circle", 0, 0, 150)
  ship.debug = false
  ship.scale = .25
  ship.maxSpeed = 6
  ship.friction = 0.1

  asteroids = new Group()
  bullets = new Group()

  for (let i = 0; i < 10; i++) {
    //let s = createSprite(random(width), random(height))
    //s.setSpeed(random(3, 5), random(360))
    //asteroids.add(s)

    let px = random(width)
    let py = random(height)

    createAsteroid(3, px, py)
  }
}

function draw() {
  background(50);


  fill(255);
  textAlign(CENTER);
  text("Controls: Arrow keys + x", width / 2, 20)

  for (let i = 0; i < allSprites.length; i++) {
    let s = allSprites[i]

    if (s.position.x > width + margin) {
      s.position.x = -margin
    }

    if (s.position.x < -margin) {
      s.position.x = width + margin
    }

    if (s.position.y > height + margin) {
      s.position.y = -margin
    }

    if (s.position.y < -margin) {
      s.position.y = height + margin
    }
  }

  if (keyDown(LEFT_ARROW)) {
    ship.rotation = ship.rotation - 4
  }

  if (keyDown(RIGHT_ARROW)) {
    ship.rotation = ship.rotation + 4
  }

  if (keyDown(UP_ARROW)) {
    ship.changeAnimation("thrust")
    ship.addSpeed(0.7, ship.rotation - 90)
  } else {
    ship.changeAnimation("normal")
  }

  if (keyWentDown("x")) {
    let b = createSprite(ship.position.x, ship.position.y)
    b.addImage(temp2)
    b.scale = 0.3
    b.setSpeed(10 + ship.getSpeed(), ship.rotation - 90)
    b.life = 80
    bullets.add(b)
  }

  asteroids.overlap(bullets, asteroidHit)

  ship.bounce(asteroids, () => {
    lives = lives - 1
  })

  drawSprites()

  if (lives == 3) {
    stroke(192, 57, 43)
    fill(192, 57, 43)
    ellipse(56, 46, 55, 55)
    ellipse(116, 46, 55, 55)
    ellipse(176, 46, 55, 55)
  } else if (lives == 2) {
    stroke(192, 57, 43)
    noFill()
    ellipse(56, 46, 55, 55)
    fill(192, 57, 43)
    ellipse(116, 46, 55, 55)
    ellipse(176, 46, 55, 55)
  } else if (lives == 1) {
    stroke(192, 57, 43)
    noFill()
    ellipse(56, 46, 55, 55)
    ellipse(116, 46, 55, 55)
    fill(192, 57, 43)
    ellipse(176, 46, 55, 55)
  } else if (lives == 0) {
    noFill()
    stroke(192, 57, 43)
    ellipse(56, 46, 55, 55)
    ellipse(116, 46, 55, 55)
    ellipse(176, 46, 55, 55)
    noLoop()
    textSize(60)
    fill(192, 57, 43)
    textAlign(CENTER)
    text("Game Over!", width / 2, height / 2)
  }

  if (asteroids.length == 0) {
    textSize(60)
    fill(192, 57, 43)
    textAlign(CENTER)
    text("You Win!", width / 2, height / 2)
    noLoop()
  }

}

function createAsteroid(type, x, y) {
  let a = createSprite(x, y)
  let img = loadImage("Assets/asteroid" + floor(random(1, 5)) + ".png")
  a.addImage(img)
  a.setSpeed(2.5 - type / 2, random(0, 360))
  a.rotationSpeed = random(-0.5, 0.5)
  a.debug = false
  a.type = type

  if (type == 3) {
    a.scale = .5
  }

  if (type == 2) {
    a.scale = .3
  }

  if (type == 1) {
    a.scale = .15
  }

  a.mass = 2 + a.scale
  a.setCollider("circle", 0, 0, 80)
  asteroids.add(a)
}

function asteroidHit(asteroid, bullet) {
  let newType = asteroid.type - 1

  if (newType > 0) {
    createAsteroid(newType, asteroid.position.x, asteroid.position.y)
    createAsteroid(newType, asteroid.position.x, asteroid.position.y)
  }

  bullet.remove()
  asteroid.remove()
}

if (i == 0) {
  textAlign(CENTER);
  text("Controls: Arrow keys + x", width / 20, 20);
}
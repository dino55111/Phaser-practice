var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);

var snake, apples, apple, cursors;
var score, scoreText;

function preload() {
  this.load.image("snakeHead", "./assets/snakeHead.png");
  this.load.image("snakeBody", "./assets/snakeBody.png");
  this.load.image("apple", "./assets/apple.png");
  this.load.json("data", "./assets/data.json");
}
function create() {
  datas = this.cache.json.get("data");
  console.log(datas);
  snake = [];
  for (let i = 0; i < 5; i++) {
    snake[i] = this.physics.add.sprite(
      400,
      300 - i * 15,
      i === 0 ? "snakeHead" : "snakeBody"
    );
    snake[i].displayWidth = 15;
    snake[i].displayHeight = 15;
  }
  snake[0].setCollideWorldBounds(true);
  snake[0].setVelocity(0, 160);
  cursors = this.input.keyboard.createCursorKeys();

  apples = this.physics.add.group();
  apple = apples.create(
    Phaser.Math.Between(0, 800),
    Phaser.Math.Between(0, 600),
    "apple"
  );
  apple.displayWidth = 15;
  apple.displayHeight = 15;
  this.physics.add.collider(snake[0], apples);

  //   this.physics.add.collider(snake[0], apples, getApple, null, this);
  scoreText = this.add.text(16, 16, "score: 0", {
    fontSize: "24px",
    fill: "#fff",
  });
}
function update() {
  if (cursors.left.isDown) {
    snake[0].setVelocity(-160, 0);

    // player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    snake[0].setVelocity(160, 0);

    // player.anims.play("right", true);
  } else if (cursors.up.isDown) {
    snake[0].setVelocity(0, -160);

    // player.anims.play("turn");
  } else if (cursors.down.isDown) {
    snake[0].setVelocity(0, 160);

    // player.anims.play("turn");
  }
}

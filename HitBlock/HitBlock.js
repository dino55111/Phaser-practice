var board, blocks, ball, props, lifeText, lives, gameStartText, gameOverText;
let speed = 160;
let direction = 1;
let life = 3;
let isGameStart = false;
let isGameOver = false;
const blockColorMap = [
  "blueBlock",
  "greenBlock",
  "greyBlock",
  "purpleBlock",
  "redBlock",
  "yellowBlock",
];
const propMap = ["minus", "pause", "reverse", "speedUp", "speedDown", "plus"];

const stage = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function stage() {
    Phaser.Scene.call(this, { key: "stage" });
  },
  preload: function () {
    //背景
    this.load.image("bg", "./assets/img/bg.png");
    //球
    this.load.image("ball", "./assets/img/ball.png");
    //板子
    this.load.image("board", "./assets/img/board.png");
    //很多顏色的磚塊ＸＤ
    this.load.image("blueBlock", "./assets/img/blueBlock.png");
    this.load.image("greenBlock", "./assets/img/greenBlock.png");
    this.load.image("greyBlock", "./assets/img/greyBlock.png");
    this.load.image("purpleBlock", "./assets/img/purpleBlock.png");
    this.load.image("redBlock", "./assets/img/redBlock.png");
    this.load.image("yellowBlock", "./assets/img/yellowBlock.png");
    // 各式各樣的道具
    this.load.image("minus", "./assets/img/minus.png");
    this.load.image("plus", "./assets/img/plus.png");
    this.load.image("pause", "./assets/img/pause.png");
    this.load.image("reverse", "./assets/img/reverse.png");
    this.load.image("speedUp", "./assets/img/speedUp.png");
    this.load.image("speedDown", "./assets/img/speedDown.png");
  },
  create: function () {
    this.make.image({
      x: 400,
      y: 300,
      key: "bg",
      scale: { x: 0.75, y: 1 },
      add: true,
    });
    board = this.physics.add.image(400, 550, "board").setScale(0.5, 0.3);
    // 板子碰撞後不被移動
    board.body.immovable = true;
    // 不要讓板子離開我們的世界
    board.setCollideWorldBounds(true);
    blocks = this.physics.add.group();
    for (let i = 0; i < 200; i++) {
      blocks.create(
        30 + 39 * (i % 20),
        35 + 18 * Math.floor(i / 20),
        blockColorMap[Math.floor(i / 20) % 6]
      );
    }
    blocks.children.iterate((block) => {
      block.setScale(0.6);
      block.body.immovable = true;
    });

    ball = this.physics.add.sprite(400, 500, "ball").setScale(0.7);
    //碰撞係數
    ball.setBounce(1);
    //碰撞體改變成圓形
    ball.body.setCircle(10);
    //初始速度
    ball.setVelocityY(200);
    // 世界碰撞
    ball.setCollideWorldBounds(true);
    // 不與下方碰撞
    this.physics.world.checkCollision.down = false;
    this.physics.add.collider(ball, blocks, blockBounce, null, this);
    this.physics.add.collider(ball, board, boardBounce, null, this);

    //加上鍵盤控制物件
    cursors = this.input.keyboard.createCursorKeys();
    props = this.physics.add.group();
    this.physics.add.overlap(board, props, getProp, null, this);
    lifeText = this.add.text(10, 5, "Life: ");
    lives = this.physics.add.group({
      key: "ball",
      repeat: life - 1, // 這邊原先他就會幫你佈置一個，所以我們只需要重複 2 個可以佈置 3 個了
      setXY: { x: 65, y: 13, stepX: 15 },
      setScale: { x: 0.5, y: 0.5 },
    });
    gameStartText = this.add.text(300, 300, "Press space to start");
    gameOverText = this.add.text(300, 300, "Game Over", {
      fontSize: "40px",
      color: "#ff0000",
    });
    gameOverText.visible = false;
    this.physics.pause();
  },
  update: function () {
    if (isGameStart && !isGameOver) {
      this.physics.resume();
    }
    if (cursors.space.isDown && !isGameStart && !isGameOver) {
      isGameStart = true;
      gameStartText.visible = !isGameStart;
      ball.setVelocityY(200);
    }
    //   增加 direction 變數來控制方向
    if (cursors.left.isDown) {
      board.setVelocityX(speed * direction * -1);
    } else if (cursors.right.isDown) {
      board.setVelocityX(speed * direction);
    } else {
      board.setVelocityX(0);
    }
    // 遊戲結束
    if (life === 0) {
      isGameStart = false;
      isGameOver = true;
      gameStartText.visible = false;
      gameOverText.visible = true;
    }
    if (ball.body.y > 600) {
      this.physics.pause();
      // 刪除一顆場景內的生命值
      lives.getChildren()[lives.getChildren().length - 1].destroy();
      // 重置球跟板子
      ball.enableBody(true, 400, 500, true, true);
      board.enableBody(true, 400, 550, true, true);
      board.displayWidth = 95;
      board.setTint(0xffffff);
      speed = 160;
      direction = 1;
      life -= 1;
    }
  },
});

function blockBounce(ball, block) {
  // 打到之後讓方塊消失
  block.disableBody(true, true);
  // 是否產生道具
  let createSuccess = Math.random() < 0.3;
  if (createSuccess) {
    // 隨機產生一種道具
    let temp = Phaser.Math.Between(0, 5);
    let prop = props.create(block.x, block.y, propMap[temp]).setScale(0.5);
    // 改變道具顏色 好的道具是綠色 不好的是紅色
    prop.setTint(temp < 3 ? 0xff0000 : 0x00ff00);
    // 給道具一個初始向下掉落的速度
    prop.setVelocityY(150);
  }
}

function boardBounce(ball, board) {
  // 透過計算看他打在板子的哪一邊給他一個向左或向右的速度
  ball.body.setVelocityX((190 * (ball.x - board.x)) / board.width);
}

function getProp(board, prop) {
  let feature = prop.texture.key;
  if (feature === "speedUp") {
    // 調整速度
    speed += 70;
  } else if (feature === "speedDown") {
    // 調整速度
    speed -= 50;
  } else if (feature === "minus") {
    // 調整寬度
    board.displayWidth -= 35;
  } else if (feature === "plus") {
    // 調整寬度
    board.displayWidth += 35;
  } else if (feature === "reverse") {
    // 改變方向
    direction = -1;
    // 調成紫色
    board.setTint(0xff00ff);
    setTimeout(() => {
      direction = 1;
      board.setTint(0xffffff);
    }, 3000);
  } else if (feature === "pause") {
    // 不給移動
    direction = 0;
    // 調成紅色
    board.setTint(0xff0000);
    setTimeout(() => {
      direction = 1;
      board.setTint(0xffffff);
    }, 1000);
  }
  prop.destroy();
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {},
      debug: false,
    },
  },
  scene: [stage],
};
var game = new Phaser.Game(config);

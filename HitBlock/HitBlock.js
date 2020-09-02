let speed = 160;
const blockColorMap = [
  "blueBlock",
  "greenBlock",
  "greyBlock",
  "purpleBlock",
  "redBlock",
  "yellowBlock",
];

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
  },
  update: function () {
    if (cursors.left.isDown) {
      board.setVelocityX(speed * -1);
    } else if (cursors.right.isDown) {
      board.setVelocityX(speed);
    } else {
      board.setVelocityX(0);
    }
  },
});

function blockBounce(ball, block) {
  block.disableBody(true, true);
}

function boardBounce(ball, board) {
  // 透過計算看他打在板子的哪一邊給他一個向左或向右的速度
  ball.body.setVelocityX((190 * (ball.x - board.x)) / board.width);
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

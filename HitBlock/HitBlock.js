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
  },
  update: function () {},
});
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

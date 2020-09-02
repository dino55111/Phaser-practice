const stage = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function stage() {
    Phaser.Scene.call(this, { key: "stage" });
  },
  preload: function () {},
  create: function () {},
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

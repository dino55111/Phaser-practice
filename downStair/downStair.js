var config = {
  type: Phaser.AUTO,
  width: 600,
  height: 800,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 },
      debug: false,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

var game = new Phaser.Game(config);
var player, cursors, grounds, ground, spikes, lifeBar;
let life = 10;
// 扣血的 trigger
let isHurtOnce = false;
let groundCollision = {
  none: false,
  up: true,
  down: false,
  left: false,
  right: false,
};
function preload() {
  this.load.image("bg", "assets/background.png");
  this.load.image("ground", "assets/ground_grass.png");
  this.load.image("spikes", "assets/spikes.png");
  this.load.spritesheet("player", "assets/man.png", {
    frameWidth: 80,
    frameHeight: 110,
  });
}
function create() {
  this.add.image(300, 400, "bg");
  player = this.physics.add.sprite(300, 500, "player").setScale(0.5);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: "walking",
    frames: this.anims.generateFrameNumbers("player", { start: 1, end: 2 }),
    frameRate: 10,
    repeat: -1,
  });
  grounds = this.physics.add.group();
  // 加上碰撞後的callback
  this.physics.add.collider(player, grounds, heal, null, this);
  grounds.create(100, 200, "ground").setScale(0.5);
  grounds.create(200, 400, "ground").setScale(0.5);
  grounds.create(300, 600, "ground").setScale(0.5);
  grounds.create(500, 800, "ground").setScale(0.5);
  grounds.create(400, 1000, "ground").setScale(0.5);

  grounds.getChildren().forEach((el) => {
    el.body.immovable = true;
    el.body.checkCollision = groundCollision;
    el.isHeal = false;
  });
  spikes = this.physics.add.staticGroup();
  // 加上碰撞後的callback
  this.physics.add.collider(player, spikes, hurt, null, this);
  for (let i = 0; i < 20; i++) {
    spikes
      .create(0 + 30 * i, 0, "spikes")
      .setScale(0.5)
      .setOrigin(0, 0);
  }
  cursors = this.input.keyboard.createCursorKeys();
  lifeBar = [];
  for (let i = 0; i < 10; i++) {
    let aLife = this.add.rectangle(20 + 15 * i, 55, 10, 30, "0x00ee00");
    // 將生命值設定在前方
    aLife.setDepth(1);
    lifeBar.push(aLife);
  }
}
function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.flipX = true;

    player.anims.play("walking", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.flipX = false;

    player.anims.play("walking", true);
  } else {
    player.setVelocityX(0);

    player.anims.stop("walking");

    player.setFrame(0);
  }
  grounds.getChildren().forEach((el) => el.setVelocityY(-100));

  grounds.getChildren().forEach((el) => {
    if (el.y < 0) {
      el.destroy();

      ground = grounds
        .create(
          Phaser.Math.Between(0, 600),
          Phaser.Math.Between(1200, 1250),
          "ground"
        )
        .setScale(0.5);
      //加上不被移動以及只有上方的物理碰撞偵測
      ground.body.immovable = true;
      ground.body.checkCollision = groundCollision;
      ground.isHeal = false;
    }
  });
  lifeBar.forEach((el, idx) => {
    if (idx + 1 > life) {
      el.fillColor = "0x555555";
    } else {
      el.fillColor = "0x00ee00";
    }
  });
  // 碰觸完尖刺也做完扣血機制後，恢復主角與下方的碰撞偵測
  if (!player.body.touching.up) {
    player.body.checkCollision.down = true;
  }
}

// 扣血機制的callback
function hurt(player, spike) {
  // 生命值在 trigger 開啟時扣 4
  life -= isHurtOnce ? 0 : 4;
  // 被尖刺碰到後，移除主角與下方的碰撞偵測，已讓她脫離目前的樓梯
  player.body.checkCollision.down = false;
  // 關閉 trigger
  isHurtOnce = true;
  // 1秒後再次開啟 trigger
  setTimeout(() => (isHurtOnce = false), 1000);
}

function heal(player, ground) {
  // 確認是否滿血並且樓梯沒有被踩過補過血
  life += life === 10 || ground.isHeal ? 0 : 1;
  // 補完把屬性轉成 true
  ground.isHeal = true;
}

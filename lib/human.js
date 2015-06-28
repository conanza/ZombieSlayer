(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var Human = ZombieSlayer.Human = function (options) {
    options.color = Human.COLOR;
    options.radius = Human.RADIUS;
    options.vel = [0, 0];

    ZombieSlayer.MovingObject.call(this, options);

    if (options.girl) {
      this.person = ZombieSlayer.Util.loadImage("./assets/girl.png");
    } else {
      this.person = ZombieSlayer.Util.loadImage("./assets/boy.png");
    }
  };

  ZombieSlayer.Util.inherits(Human, ZombieSlayer.MovingObject);

  Human.RADIUS = 26;

  Human.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof ZombieSlayer.Zombie) {
      this.remove();
    }
  };

  Human.prototype.fireBullet = function () {
    var humanVel = this.vel;
    var norm = ZombieSlayer.Util.norm(this.vel);

    if (norm === 0) {
      norm = ZombieSlayer.Util.norm([0, -4]);
    }

    if (humanVel[0] === 0 && humanVel[1] === 0) {
      humanVel = [0, -4];
    }

    var relVel = ZombieSlayer.Util.scale(
      ZombieSlayer.Util.dir(humanVel),
      ZombieSlayer.Bullet.SPEED
    );

    var bulletVel = [
      relVel[0] + humanVel[0], relVel[1] + humanVel[1]
    ];

    var bullet = new ZombieSlayer.Bullet({
      pos: this.positionBullet(),
      vel: bulletVel,
      game: this.game
    });

    this.game.add(bullet);
  };

  Human.prototype.draw = function (ctx) {
    if (this.isUp()) {
      ctx.drawImage(this.person, 0, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    } else if (this.isDown()) {
      ctx.drawImage(this.person, 208, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    } else if (this.isRight()) {
      ctx.drawImage(this.person, 104, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    } else if (this.isLeft()) {
      ctx.drawImage(this.person, 312, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    } else if (this.isUpLeft()) {
      ctx.drawImage(this.person, 364, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    } else if (this.isUpRight()) {
      ctx.drawImage(this.person, 52, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    } else if (this.isDownLeft()) {
      ctx.drawImage(this.person, 260, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    } else if (this.isDownRight()) {
      ctx.drawImage(this.person, 156, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    } else {
      ctx.drawImage(this.person, 0, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    }
  };

  Human.prototype.relocate = function () {
    this.pos = this.game.randomPosition(); // change to a furthest position
  };

  Human.prototype.positionBullet = function () {
    var bulletPos;
    if (this.isUp()) {
      bulletPos = [this.pos[0] + 6, this.pos[1] - 20];
    } else if (this.isDown()) {
      bulletPos = [this.pos[0] + 6, this.pos[1] + 32];
    } else if (this.isRight()) {
      bulletPos = [this.pos[0] + 32, this.pos[1] + 6];
    } else if (this.isLeft()) {
      bulletPos = [this.pos[0] - 20, this.pos[1] + 6];
    } else if (this.isUpLeft()) {
      bulletPos = [this.pos[0] - 20, this.pos[1] - 20];
    } else if (this.isUpRight()) {
      bulletPos = [this.pos[0] + 32, this.pos[1] - 20];
    } else if (this.isDownLeft()) {
      bulletPos = [this.pos[0] - 20, this.pos[1] + 32];
    } else if (this.isDownRight()) {
      bulletPos = [this.pos[0] + 32, this.pos[1] + 32];
    } else {
      bulletPos = [this.pos[0] + 6, this.pos[1] - 20];
    }

    return bulletPos;
  };
})();

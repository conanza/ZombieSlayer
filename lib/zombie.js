(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var Zombie = ZombieSlayer.Zombie = function (options) {
    options.color = Zombie.COLOR;
    options.radius = Zombie.RADIUS;
    options.vel = [Zombie.SPEED, Zombie.SPEED];

    ZombieSlayer.MovingObject.call(this, options);

    this.zombie = ZombieSlayer.Util.loadImage("./assets/zombie.png");
  };

  ZombieSlayer.Util.inherits(Zombie, ZombieSlayer.MovingObject);

  Zombie.RADIUS = 26;
  Zombie.SPEED = 1;

  Zombie.prototype.collideWith = function (otherObject) {
    // if collide with bullet instead
    // if (otherObject instanceof ZombieSlayer.Human) {
    //   this.remove();
    // }
  };

  Zombie.prototype.draw = function (ctx) {
    if (this.isUp()) {
      ctx.drawImage(this.zombie, 0, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    } else if (this.isDown()) {
      ctx.drawImage(this.zombie, 208, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    } else if (this.isRight()) {
      ctx.drawImage(this.zombie, 104, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    } else if (this.isLeft()) {
      ctx.drawImage(this.zombie, 312, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    } else if (this.isUpLeft()) {
      ctx.drawImage(this.zombie, 364, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    } else if (this.isUpRight()) {
      ctx.drawImage(this.zombie, 52, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    } else if (this.isDownLeft()) {
      ctx.drawImage(this.zombie, 260, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    } else if (this.isDownRight()) {
      ctx.drawImage(this.zombie, 156, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    } else {
      ctx.drawImage(this.zombie, 0, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    }
  };

  Zombie.prototype.move = function () {
    var newDir = this.dirToHuman();

    this.vel = [newDir[0], newDir[1]];
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];

    this.pos = this.game.wrap(this.pos);
  };

  Zombie.prototype.dirToHuman = function () {
    var human = this.game.humans[0];
    var newVec = [
      human.pos[0] - this.pos[0],
      human.pos[1] - this.pos[1]
    ];

    return ZombieSlayer.Util.dir(newVec);
  };
})();

(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var Bullet = ZombieSlayer.Bullet = function (options) {
    options.radius = Bullet.RADIUS;
    options.color = Bullet.COLOR;

    ZombieSlayer.MovingObject.call(this, options);

    this.bullet = ZombieSlayer.Util.loadImage("./assets/bullets.png");
  };

  Bullet.RADIUS = 20;
  Bullet.SPEED = 15;
  Bullet.COLOR = "orange";

  ZombieSlayer.Util.inherits(Bullet, ZombieSlayer.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
  };

  Bullet.prototype.isWrappable = false;

  Bullet.prototype.draw = function (ctx) {
    if (this.isUp()) {
      ctx.drawImage(this.bullet, 0, 0, 40, 40, this.pos[0], this.pos[1], 40, 40);
    } else if (this.isDown()) {
      ctx.drawImage(this.bullet, 160, 0, 40, 40, this.pos[0], this.pos[1], 40, 40);
    } else if (this.isRight()) {
      ctx.drawImage(this.bullet, 80, 0, 40, 40, this.pos[0], this.pos[1], 40, 40);
    } else if (this.isLeft()) {
      ctx.drawImage(this.bullet, 240, 0, 40, 40, this.pos[0], this.pos[1], 40, 40);
    } else if (this.isUpLeft()) {
      ctx.drawImage(this.bullet, 280, 0, 40, 40, this.pos[0], this.pos[1], 40, 40);
    } else if (this.isUpRight()) {
      ctx.drawImage(this.bullet, 40, 0, 40, 40, this.pos[0], this.pos[1], 40, 40);
    } else if (this.isDownLeft()) {
      ctx.drawImage(this.bullet, 200, 0, 40, 40, this.pos[0], this.pos[1], 40, 40);
    } else if (this.isDownRight()) {
      ctx.drawImage(this.bullet, 120, 0, 40, 40, this.pos[0], this.pos[1], 40, 40);
    } else {
      ctx.drawImage(this.bullet, 0, 0, 40, 40, this.pos[0], this.pos[1], 40, 40);
    }
  };
})();

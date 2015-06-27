(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var MovingObject = ZombieSlayer.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  };

  MovingObject.prototype.collideWith = function (otherObject) {
  };

  MovingObject.prototype.isWrappable = true;

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var centerDist = ZombieSlayer.Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  };

  MovingObject.prototype.move = function () {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];

    if (this.isOutOfBounds()) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.remove();
      }
    }
  };

  MovingObject.prototype.remove = function () {
    this.game.remove(this);
  };

  MovingObject.prototype.isOutOfBounds = function () {
    return (this.pos[0] < 0) || (this.pos[1] < 0)
      || (this.pos[0] > this.game.DIM_X) || (this.pos[1] > this.game.DIM_Y);
  };

  MovingObject.prototype.isUp = function () {
    return this.vel[0] === 0 && this.vel[1] < 0;
  };

  MovingObject.prototype.isDown = function () {
    return this.vel[0] === 0 && this.vel[1] > 0;
  };

  MovingObject.prototype.isRight = function () {
    return this.vel[0] > 0 && this.vel[1] === 0;
  };

  MovingObject.prototype.isLeft = function () {
    return this.vel[0] < 0 && this.vel[1] === 0;
  };

  MovingObject.prototype.isUpLeft = function () {
    return this.vel[0] < 0 && this.vel[1] < 0;
  };

  MovingObject.prototype.isUpRight = function () {
    return this.vel[0] > 0 && this.vel[1] < 0;
  };

  MovingObject.prototype.isDownLeft = function () {
    return this.vel[0] < 0 && this.vel[1] > 0;
  };

  MovingObject.prototype.isDownRight = function () {
    return this.vel[0] > 0 && this.vel[1] > 0;
  };
})();

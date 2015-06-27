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

    this.pos = this.game.wrap(this.pos);
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

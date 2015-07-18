(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var PowerupObject = ZombieSlayer.PowerupObject = function (options) {
    this.pos = options.pos;
    this.vel = [0, 0];
    this.radius = 20;
    this.color = options.color;
    this.game = options.game;
  };

  PowerupObject.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof ZombieSlayer.Human) {
      this.remove();
    }
  };

  PowerupObject.prototype.isWrappable = false;

  PowerupObject.prototype.isCollidedWith = function (otherObject) {
    var centerDist = ZombieSlayer.Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  };

  PowerupObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0] + 10, this.pos[1] + 10, this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  };

  PowerupObject.prototype.move = function () {
  };

  PowerupObject.prototype.remove = function () {
    this.game.remove(this);
  };
})();

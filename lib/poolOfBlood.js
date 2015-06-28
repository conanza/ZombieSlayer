(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var PoolOfBlood = ZombieSlayer.PoolOfBlood = function (options) {
    options.vel = [0, 0];
    options.radius = 26;

    ZombieSlayer.MovingObject.call(this, options);

    this.blood = ZombieSlayer.Util.loadImage("./assets/blood.png");
  };

  ZombieSlayer.Util.inherits(PoolOfBlood, ZombieSlayer.MovingObject);

  PoolOfBlood.prototype.isCollidedWith = function () {};

  PoolOfBlood.prototype.draw = function (ctx) {
    ctx.drawImage(this.blood, 0, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
  };
})();

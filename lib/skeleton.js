(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var Skeleton = ZombieSlayer.Skeleton = function (options) {
    options.vel = [0, 0];
    options.radius = 26;

    ZombieSlayer.MovingObject.call(this, options);

    this.skeleton = ZombieSlayer.Util.loadImage("./assets/skeleton.png");
  };

  ZombieSlayer.Util.inherits(Skeleton, ZombieSlayer.MovingObject);

  Skeleton.prototype.draw = function (ctx) {
    ctx.drawImage(this.skeleton, 0, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
  };

  Skeleton.prototype.isCollidedWith = function () {};
})();

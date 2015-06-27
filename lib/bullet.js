(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var Bullet = ZombieSlayer.Bullet = function (options) {
    options.radius = Bullet.RADIUS;
    options.color = Bullet.COLOR;

    ZombieSlayer.MovingObject.call(this, options);
  };

  Bullet.RADIUS = 26;
  Bullet.SPEED = 15;
  Bullet.COLOR = "orange";

  ZombieSlayer.Util.inherits(Bullet, ZombieSlayer.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
  };

  Bullet.prototype.isWrappable = false;
})();

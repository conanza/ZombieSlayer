(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var Zombie = ZombieSlayer.Zombie = function (options) {
    options.color = Zombie.COLOR;
    options.radius = Zombie.RADIUS;
    options.vel = [1, 1]; // randomize?

    ZombieSlayer.MovingObject.call(this, options);
  };

  ZombieSlayer.Util.inherits(Zombie, ZombieSlayer.MovingObject);

  Zombie.COLOR = "#FFFFFF";
  Zombie.RADIUS = 26;
  Zombie.SPEED = 4;
})();

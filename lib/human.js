(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var Human = ZombieSlayer.Human = function (options) {
    options.color = Human.COLOR;
    options.radius = Human.RADIUS;
    options.vel = [-1, -1];

    ZombieSlayer.MovingObject.call(this, options);
  };

  ZombieSlayer.Util.inherits(Human, ZombieSlayer.MovingObject);

  Human.COLOR = "red";
  Human.RADIUS = 10;
})();

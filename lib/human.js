(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var Human = ZombieSlayer.Human = function (options) {
    options.color = Human.COLOR;
    options.radius = Human.RADIUS;
    options.vel = [0, 0];

    ZombieSlayer.MovingObject.call(this, options);

    this.img = ZombieSlayer.Util.loadImage("./assets/cop.png");
  };

  ZombieSlayer.Util.inherits(Human, ZombieSlayer.MovingObject);

  Human.COLOR = "red";
  Human.RADIUS = 20;

  Human.prototype.draw = function (ctx) {
    ctx.drawImage(this.img, this.pos[0], this.pos[1]);
  };


})();

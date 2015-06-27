(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var Human = ZombieSlayer.Human = function (options) {
    options.color = Human.COLOR;
    options.radius = Human.RADIUS;
    options.vel = [0, 0];

    ZombieSlayer.MovingObject.call(this, options);

    this.girl = ZombieSlayer.Util.loadImage("./assets/girl.png");
    this.boy = ZombieSlayer.Util.loadImage("./assets/boy.png");
  };

  ZombieSlayer.Util.inherits(Human, ZombieSlayer.MovingObject);

  Human.COLOR = "red";
  Human.RADIUS = 26;

  Human.prototype.draw = function (ctx) {
    ctx.drawImage(this.girl, 0, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
  };


})();

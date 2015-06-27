(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var Zombie = ZombieSlayer.Zombie = function (options) {
    options.color = Zombie.COLOR;
    options.radius = Zombie.RADIUS;
    options.vel = [1, 1];

    ZombieSlayer.MovingObject.call(this, options);

    this.zombie = ZombieSlayer.Util.loadImage("./assets/zombie.png");
  };

  ZombieSlayer.Util.inherits(Zombie, ZombieSlayer.MovingObject);

  Zombie.COLOR = "#FFFFFF";
  Zombie.RADIUS = 26;
  Zombie.SPEED = 4;

  Zombie.prototype.draw = function (ctx) {
    ctx.drawImage(this.zombie, 0, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
  };

  Zombie.prototype.move = function () {
    var newDir = this.dirToHuman();

    this.vel = [newDir[0], newDir[1]];
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];

    this.pos = this.game.wrap(this.pos);

  };

  Zombie.prototype.dirToHuman = function () {
    var human = this.game.humans[0];
    var newVec = [
      human.pos[0] - this.pos[0],
      human.pos[1] - this.pos[1]
    ];

    return ZombieSlayer.Util.dir(newVec);
  };
})();

(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var Nuke = ZombieSlayer.Nuke = function (options) {
    options.color = "black";
    this.boom = new Audio("./sounds/bomb.wav");
    this.tacNuke = ZombieSlayer.Util.loadImage("./assets/nuke.gif");

    ZombieSlayer.PowerupObject.call(this, options);
  };

  ZombieSlayer.Util.inherits(Nuke, ZombieSlayer.PowerupObject);

  Nuke.prototype.goBoom = function () {
    this.boom.play();
  };

  Nuke.prototype.draw = function (ctx) {
    ctx.drawImage(this.tacNuke, 0, 0, 33, 33, this.pos[0], this.pos[1], 40, 40);
  };
})();

(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var HealthUp = ZombieSlayer.HealthUp = function (options) {
    options.color = "red";

    this.heart = ZombieSlayer.Util.loadImage("./assets/heart.png");

    ZombieSlayer.PowerupObject.call(this, options);
  };

  ZombieSlayer.Util.inherits(HealthUp, ZombieSlayer.PowerupObject);

  HealthUp.prototype.draw = function (ctx) {
    ctx.drawImage(this.heart, 0, 0, 200, 200, this.pos[0], this.pos[1], 40, 40);
  };
})();

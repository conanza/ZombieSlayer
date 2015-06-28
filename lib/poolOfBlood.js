(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var PoolOfBlood = ZombieSlayer.PoolOfBlood = function (options) {
    this.pos = options.pos;
    this.game = options.game;

    this.blood = ZombieSlayer.Util.loadImage("./assets/blood.png");
  };

  PoolOfBlood.prototype.draw = function (ctx) {
    ctx.drawImage(this.blood, 0, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
  };

  PoolOfBlood.prototype.remove = function () {
    this.game.remove(this);
  };
})();

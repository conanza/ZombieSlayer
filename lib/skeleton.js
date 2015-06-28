(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var Skeleton = ZombieSlayer.Skeleton = function (options) {
    this.pos = options.pos;
    this.game = options.game;

    this.skeleton = ZombieSlayer.Util.loadImage("./assets/skeleton.png");
  };

  Skeleton.prototype.draw = function (ctx) {
    ctx.drawImage(this.skeleton, 0, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
  };

  Skeleton.prototype.remove = function () {
    this.game.remove(this);
  };
})();

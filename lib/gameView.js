(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var GameView = ZombieSlayer.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
  };

  GameView.prototype.start = function () {
    setInterval(function () {
      this.game.moveObjects();
      this.game.draw(this.ctx);
    }.bind(this), 20);
  };
})();

(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var Gameover = ZombieSlayer.Gameover = function (options) {
    this.ctx = options.ctx;
  };

  Gameover.prototype.bindKeyHandlers = function () {
    $(document).on("keydown", function (event) {
      if (event.defaultPrevented) {
        return;
      }

      if (event.keyCode === 32) {
        event.preventDefault();
      }
    }.bind(this));
  };

  Gameover.prototype.draw = function (ctx) {

  };

  Gameover.prototype.start = function () {
    debugger
    this.draw(this.ctx);

    this.bindKeyHandlers();
  };

  Gameover.prototype.stop = function (options) {
    $(document).off();

    var game = new ZombieSlayer.Game();
    new ZombieSlayer.GameView({
      game: game,
      ctx: this.ctx,
      gender: this.playerGender,
      name: this.playerName
    }).start();

    new ZombieSlayer.MenuView({ ctx: this.ctx }).start();
  };
})();

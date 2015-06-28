(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var Instructions = ZombieSlayer.Instructions = function (options) {
    this.ctx = options.ctx;
    this.playerName = options.player.name;
    this.playerGender = options.player.gender;
    this.instructions = ZombieSlayer.Util.loadImage("./assets/instructions.jpg");
  };

  Instructions.prototype.bindKeyHandlers = function () {
    $(document).on("keydown", function (event) {
      if (event.defaultPrevented) {
        return;
      }

      if (event.keyCode === 32) {
        this.stop();
        event.preventDefault();
      }
    }.bind(this));
  };

  Instructions.prototype.draw = function (ctx) {
    (this.instructions).onload = function () {
      ctx.drawImage(this.instructions, 0, 0);
    }.bind(this);
  };

  Instructions.prototype.start = function () {
    this.draw(this.ctx);

    this.bindKeyHandlers();
  };

  Instructions.prototype.stop = function (options) {
    $(document).off();

    var game = new ZombieSlayer.Game();
    new ZombieSlayer.GameView({
      game: game,
      ctx: this.ctx,
      gender: this.playerGender,
      name: this.playerName
    }).start();
  };
})();

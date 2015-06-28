(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var CharacterSelect = ZombieSlayer.CharacterSelect = function (options) {
    this.ctx = options.ctx;
    this.canvas = $(document).find("canvas")[0];
  };

  CharacterSelect.prototype.bindKeyHandlers = function () {
    $(document).on("click", function (event) {
      if (event.defaultPrevented) {
        return;
      }

      // if (event.keyCode === 13) {
        this.stop();
        event.preventDefault();
      // }
    }.bind(this));
  };

  CharacterSelect.prototype.start = function () {
    this.draw(this.ctx);

    this.bindKeyHandlers();
  };

  CharacterSelect.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, ZombieSlayer.Game.DIM_X, ZombieSlayer.Game.DIM_Y);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ZombieSlayer.Game.DIM_X, ZombieSlayer.Game.DIM_Y);

    ctx.font = "bold 20px eurostile";
    ctx.fillStyle = "white";
    ctx.fillText("Enter your name here: ", 282, 50);
    var input = new CanvasInput({
      canvas: this.canvas,
      x: 282,
      y: 75,
      width: 200
    });

    ctx.fillText("Click and choose a character to continue...", 170, 200);
  };

  CharacterSelect.prototype.stop = function () {
    $(document).off();

    var game = new ZombieSlayer.Game();
    new ZombieSlayer.GameView({
      game: game,
      ctx: this.ctx,
      gender: "F"
    }).start();
  };
})();

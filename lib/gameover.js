(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var Gameover = ZombieSlayer.Gameover = function (options) {
    this.ctx = options.ctx;

    var localScores = JSON.parse(window.localStorage.getItem("scores"));
    this.topTen = ZombieSlayer.Util.sortedScores(localScores).slice(0,10);
  };

  Gameover.prototype.bindKeyHandlers = function () {
    $(document).on("keydown", function (event) {
      if (event.defaultPrevented) {
        return;
      }
// esc:27
      if (event.keyCode === 32) {
        event.preventDefault();
      }
    }.bind(this));
  };

  Gameover.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, ZombieSlayer.Game.DIM_X, ZombieSlayer.Game.DIM_Y);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ZombieSlayer.Game.DIM_X, ZombieSlayer.Game.DIM_Y);

    ctx.font = "bold 40px eurostile";
    ctx.fillStyle = "white";
    ctx.fillText("LOCAL LEADERBOARD", 200, 40);

    ctx.font = "bold 20px eurostile";
    ctx.fillText("NAME", 231, 100);
    ctx.fillText("SCORE", 462, 100);

    this.topTen.forEach(function (score, i) {
      ctx.fillText(i + 1 + ". ", 200, 140 + i * 40);
      ctx.fillText("" + score.name, 231, 140 + i * 40);
      ctx.fillText("" + score.score, 462, 140 + i * 40);
    });
  };

  Gameover.prototype.start = function () {
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

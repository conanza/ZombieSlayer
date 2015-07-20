(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var Gameover = ZombieSlayer.Gameover = function (options) {
    this.ctx = options.ctx;

    var localScores = JSON.parse(window.localStorage.getItem("scores"));
    this.topTen = ZombieSlayer.Util.sortedScores(localScores).slice(0, 10);
  };

  Gameover.prototype.bindKeyHandlers = function () {
    $(document).on("keydown", function (event) {
      if (event.defaultPrevented) {
        return;
      }
      // 27:esc
      if (event.keyCode === 27) {
        window.localStorage.clear();
        this.topTen = [];
        this.drawLeaderboard(this.ctx);
        event.preventDefault();
      }
      // 13:enter
      if (event.keyCode === 13) {
        this.stop();
        event.preventDefault();
      }
    }.bind(this));
  };

  Gameover.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, ZombieSlayer.Game.DIM_X, ZombieSlayer.Game.DIM_Y);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ZombieSlayer.Game.DIM_X, ZombieSlayer.Game.DIM_Y);

    ctx.font = "80px eurostile-bold";
    ctx.fillStyle = "red";
    ctx.fillText("GAME OVER", 180, 300);

    ctx.font = "30px eurostile-bold";
    ctx.fillStyle = "white";
    ctx.fillText("Omnomnomnom. Zombie chow.", 193, 350);

    setTimeout(function () {
      this.drawLeaderboard(ctx);
    }.bind(this), 1750);
  };

  Gameover.prototype.drawLeaderboard = function (ctx) {
    ctx.clearRect(0, 0, ZombieSlayer.Game.DIM_X, ZombieSlayer.Game.DIM_Y);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ZombieSlayer.Game.DIM_X, ZombieSlayer.Game.DIM_Y);

    ctx.font = "40px eurostile-bold";
    ctx.fillStyle = "white";
    ctx.fillText("LOCAL LEADERBOARD", 200, 40);

    ctx.font = "20px eurostile-bold";
    ctx.fillText("NAME", 231, 100);
    ctx.fillText("SCORE", 462, 100);

    this.topTen.forEach(function (score, i) {
      ctx.fillText(i + 1 + ". ", 200, 140 + i * 40);
      ctx.fillText("" + score.name, 231, 140 + i * 40);
      ctx.fillText("" + score.score, 462, 140 + i * 40);
    });

    ctx.fillText(
      "Press 'ESC' to clear scores",
      20,
      ZombieSlayer.Game.DIM_Y - 20
    );
    ctx.fillText(
      "Press 'ENTER' to return to menu",
      ZombieSlayer.Game.DIM_X - 300,
      ZombieSlayer.Game.DIM_Y - 20
    );
  };

  Gameover.prototype.start = function () {
    this.draw(this.ctx);

    this.bindKeyHandlers();
  };

  Gameover.prototype.stop = function (options) {
    $(document).off();

    new ZombieSlayer.MenuView({ ctx: this.ctx }).start();
  };
})();

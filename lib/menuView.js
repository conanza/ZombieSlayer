(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var MenuView = ZombieSlayer.MenuView = function (options) {
    this.ctx = options.ctx;

    this.menu = ZombieSlayer.Util.loadImage("./assets/menu.jpg");
  };

  MenuView.prototype.bindKeyHandlers = function () {
    $(document).on("keydown", function (event) {
      if (event.defaultPrevented) {
        return;
      }

      if (event.keyCode === 13) {
        this.stop();
        event.preventDefault();
      }
    }.bind(this));
  };

  MenuView.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, ZombieSlayer.Game.DIM_X, ZombieSlayer.Game.DIM_Y);

    (this.menu).onload = function () {
      ctx.drawImage(this.menu, 0, 0);
    }.bind(this);
  };

  MenuView.prototype.start = function () {
    this.draw(this.ctx);

    this.bindKeyHandlers();
  };

  MenuView.prototype.stop = function () {
    $(document).off();

    new ZombieSlayer.CharacterSelect({
      ctx: this.ctx
    }).start();
  };
})();

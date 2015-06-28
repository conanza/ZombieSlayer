(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var CharacterSelect = ZombieSlayer.CharacterSelect = function (options) {
    this.ctx = options.ctx;
    this.canvas = $(document).find("canvas")[0];
    this.human1 = ZombieSlayer.Util.loadImage("./assets/girl.png");
    this.human2 = ZombieSlayer.Util.loadImage("./assets/boy.png");
  };

  CharacterSelect.prototype.bindKeyHandlers = function () {
    $(document).on("click", function (event) {
      if (event.defaultPrevented) {
        return;
      }

      debugger

        this.stop();

      event.preventDefault();
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
    ctx.fillText("Enter your name here:", 300, 30);
    ctx.fillText("(Hit enter to save)", 300, 50);
    this.input = new CanvasInput({
      canvas: this.canvas,
      x: 290,
      y: 75,
      width: 200,
      value: "Player",
      onsubmit: function () {
        this.playerName = this.input.value();
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 100, ZombieSlayer.Game.DIM_X, 40);
        this.ctx.fillStyle = "white";
        this.ctx.fillText("I hope you're ready, " + this.input.value(), 290, 120);
      }.bind(this)
    });
    this.input.focus();

    ctx.fillText("Click and choose a character to continue...", 215, 200);

    var sprite_x = 0;
    this.charSelectInt = setInterval(function () {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 300, ZombieSlayer.Game.DIM_X, ZombieSlayer.Game.DIM_Y);
      ctx.drawImage(this.human1, sprite_x, 0, 52, 52, 200, 300, 52, 52);
      ctx.drawImage(this.human2, sprite_x, 0, 52, 52, 543, 300, 52, 52);

      ctx.fillStyle = "white";
      ctx.font = "bold 15px eurostile";
      ctx.fillText("Name: Maggie", 170, 380);
      ctx.fillText("Age: 24", 170, 400);
      ctx.fillText("Occupation: Farm Hand", 170, 420);
      ctx.fillText("Total Kill Count: 48", 170, 440);
      ctx.fillText('"Why does he get the riot', 170, 480);
      ctx.fillText('gear all the time?"', 170, 500);

      ctx.fillText("Name: Glenn", 513, 380);
      ctx.fillText("Age: Mid 20s", 513, 400);
      ctx.fillText("Occupation: Pizza Boy", 513, 420);
      ctx.fillText("Total Kill Count: 129", 513, 440);
      ctx.fillText('"Where is the safety?"', 513, 480);

      sprite_x = (sprite_x + 52) % 416;
    }.bind(this), 500);
  };

  CharacterSelect.prototype.stop = function () {
    $(document).off();
    clearInterval(this.charSelectInt);
    this.input.destroy();

    var game = new ZombieSlayer.Game();
    new ZombieSlayer.GameView({
      game: game,
      ctx: this.ctx,
      gender: "F"
    }).start();
  };
})();

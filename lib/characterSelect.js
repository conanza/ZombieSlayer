(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var CharacterSelect = ZombieSlayer.CharacterSelect = function (options) {
    this.ctx = options.ctx;
    this.canvas = $(document).find("canvas")[0];
    this.human1 = ZombieSlayer.Util.loadImage("./assets/girl.png");
    this.human2 = ZombieSlayer.Util.loadImage("./assets/boy.png");
    this.playerName = "Player";
  };

  CharacterSelect.prototype.bindKeyHandlers = function () {
    $(document).on("click keydown", function (event) {
      if (event.defaultPrevented) {
        return;
      }

      if (
        event.offsetX > 100
        && event.offsetX < 300
        && event.offsetY > 200
        && event.offsetY < 400) {
          event.preventDefault();
          this.stop({ player: "F" });
      } else if (
        event.offsetX > 300
        && event.offsetX < 500
        && event.offsetY > 200
        && event.offsetY < 400) {
          event.preventDefault();
          this.stop({ player: "M" });
      } else if (event.keyCode === 13) {
        event.preventDefault();

        this.playerName = $(".player-name").val();
        $(".player-name").remove();
        $(".not-ready").text("I hope you're ready, " + this.playerName);
        $(".not-ready").addClass("player-ready").removeClass("not-ready");
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, ZombieSlayer.Game.DIM_X, 61);
      }
    }.bind(this));
  };

  CharacterSelect.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, ZombieSlayer.Game.DIM_X, ZombieSlayer.Game.DIM_Y);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ZombieSlayer.Game.DIM_X, ZombieSlayer.Game.DIM_Y);

    ctx.font = "20px eurostile-bold";
    ctx.fillStyle = "white";
    ctx.fillText("Enter your name here:", 300, 30);
    ctx.fillText("Press 'ENTER' to save", 300, 60);

    var nameInput = $("<input class='player-name'>");
    var ready = $("<div class='not-ready'>");
    nameInput.attr("value", "Player");
    nameInput.attr("type", "text");
    $(".container").prepend(nameInput).prepend(ready);
    $(".player-name").focus();

    ctx.fillText("Click and choose a character to continue...", 215, 200);

    var sprite_x = 0;
    this.charSelectInt = setInterval(function () {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 300, ZombieSlayer.Game.DIM_X, ZombieSlayer.Game.DIM_Y);
      ctx.drawImage(this.human1, sprite_x, 0, 52, 52, 200, 300, 52, 52);
      ctx.drawImage(this.human2, sprite_x, 0, 52, 52, 543, 300, 52, 52);

      ctx.fillStyle = "white";
      ctx.font = "15px eurostile-bold";
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

  CharacterSelect.prototype.start = function () {
    this.draw(this.ctx);

    this.bindKeyHandlers();
  };

  CharacterSelect.prototype.stop = function (options) {
    $(document).off();
    clearInterval(this.charSelectInt);
    $(".player-name").remove();
    $(".player-ready").remove();
    $(".not-ready").remove();

    var playerOptions = {
      name: this.playerName,
      gender: options.player
    };

    new ZombieSlayer.Instructions({
      ctx: this.ctx,
      player: playerOptions
    }).start();
  };
})();

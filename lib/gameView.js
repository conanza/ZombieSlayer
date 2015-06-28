(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var GameView = ZombieSlayer.GameView = function (options) {
    this.ctx = options.ctx;
    this.game = options.game;
    this.human = this.game.addHuman({ gender: options.gender });
    this.playerName = options.name;
  };

  GameView.prototype.bindKeyHandlers = function () {
    var human = this.human;
    var keysPressed = {32: false, 38: false, 40: false, 37: false, 39: false};
    // --- KEYCODES ---
    // 65:A, 87:W, 68:D, 83:S
    // 32:space, 38:up, 40:down, 37:left, 39:right
    $(document).keydown(function (event) {
      if (event.defaultPrevented) {
        return;
      }

      var key = event.keyCode;
      if (key in keysPressed) {
        keysPressed[key] = true;

        if (keysPressed[38] && keysPressed[37]) { // upleft
          human.vel = [-2.8, -2.8];
        } else if (keysPressed[38] && keysPressed[39]) { // upright
          human.vel = [2.8, -2.8];
        } else if (keysPressed[40] && keysPressed[37]) { // downleft
          human.vel = [-2.8, 2.8];
        } else if (keysPressed[40] && keysPressed[39]) { // downright
          human.vel = [2.8, 2.8];
        } else if (keysPressed[38]) { // up
          human.vel = [0, -4];
        } else if (keysPressed[40]) { // down
          human.vel = [0, 4];
        } else if (keysPressed[37]) { // left
          human.vel = [-4, 0];
        } else if (keysPressed[39]) { // right
          human.vel = [4, 0];
        }
        //  else {
        //   human.vel = [0, 0];
        // }
        if (keysPressed[32]) {
          human.fireBullet();
        }

        event.preventDefault();
      }
    }).keyup(function (event) {
      if (event.keyCode in keysPressed) {
        keysPressed[event.keyCode] = false;
        var lastKey = event.keyCode;

        // stop movement if no keys pressed
        // if (!keysPressed[38] && !keysPressed[38] && !keysPressed[38] && !keysPressed[38]) {
        //   human.vel = [0, 0];
        // }
      }
    });
  };

  GameView.prototype.start = function () {
    this.gameViewInt = setInterval(function () {
      this.game.step();
      this.game.draw(this.ctx);

      if (this.game.over) {
        this.stop();
      }
    }.bind(this), 20);

    this.bindKeyHandlers();
  };

  GameView.prototype.stop = function () {
    $(document).off();
    clearInterval(this.gameViewInt);

    var score = { name: this.playerName, score: this.game.gameScore };
    if (!!window.localStorage.getItem("scores")) {
      var scores = JSON.parse(window.localStorage.getItem("scores"));
      scores.push(score);

      window.localStorage.setItem("scores", JSON.stringify(scores));
    } else {
      window.localStorage.setItem("scores", JSON.stringify([score]));
    }

    new ZombieSlayer.Gameover({ ctx: this.ctx }).start();
  };
})();

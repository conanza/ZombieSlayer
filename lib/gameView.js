(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var GameView = ZombieSlayer.GameView = function (options) {
    this.ctx = options.ctx;
    this.game = options.game;
    this.human = this.game.addHuman({ gender: options.gender });
  };

  GameView.prototype.bindKeyHandlers = function () {
    var human = this.human;
    var keysPressed = {32: false, 38: false, 40: false, 37: false, 39: false};
    $(document).keydown(function (event) {
      if (event.defaultPrevented) {
        return;
      }

      var key = event.keyCode;
      if (key in keysPressed) {
        keysPressed[key] = true;

        if (keysPressed[38] && keysPressed[37]) {
          human.vel = [-2.8, -2.8];
        } else if (keysPressed[38] && keysPressed[39]) {
          human.vel = [2.8, -2.8];
        } else if (keysPressed[40] && keysPressed[37]) {
          human.vel = [-2.8, 2.8];
        } else if (keysPressed[40] && keysPressed[39]) {
          human.vel = [2.8, 2.8];
        } else if (keysPressed[38]) {
          human.vel = [0, -4];
        } else if (keysPressed[40]) {
          human.vel = [0, 4];
        } else if (keysPressed[37]) {
          human.vel = [-4, 0];
        } else if (keysPressed[39]) {
          human.vel = [4, 0];
        }
        //  else {
        //   human.vel = [0, 0];
        // }

        event.preventDefault();
      }
    }).keyup(function (event) {
      if (event.keyCode in keysPressed) {
        keysPressed[event.keyCode] = false;
        var lastKey = event.keyCode;

        // if (!keysPressed[38] && !keysPressed[38] && !keysPressed[38] && !keysPressed[38]) {
        //   human.vel = [0, 0];
        // }
      }
    });



// space 32
// A 65
// W 87
// D 68
// S 83
  };

  GameView.prototype.start = function () {
    setInterval(function () {
      this.game.step();
      this.game.draw(this.ctx);
    }.bind(this), 20);

    this.bindKeyHandlers();
  };
})();

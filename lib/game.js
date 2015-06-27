  (function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var Game = ZombieSlayer.Game = function () {
    this.zombies = [];
    this.humans = [];

    this.human = new ZombieSlayer.Human({
      pos: [Math.floor(Game.DIM_X / 2), Math.floor(Game.DIM_Y / 2)],
      game: this
    });

    this.addZombies();
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 1000;
  Game.NUM_ZOMBIES = 5;
  Game.BG_COLOR = "#000000";

  Game.prototype.addZombies = function () {
    for (var i = 0; i < Game.NUM_ZOMBIES; i++) {
      var zombie = new ZombieSlayer.Zombie({
        pos: this.randomPosition(),
        game: this
      });

      this.zombies.push(zombie);
    }
  };

  Game.prototype.allObjects = function () {
    return []
      .concat(this.zombies)
      .concat(this.human);
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.randomPosition = function () {
    return [
      Math.floor(Game.DIM_X * Math.random()),
      Math.floor(Game.DIM_Y * Math.random())
    ];
  };

  Game.prototype.wrap = function (pos) {
    return [
      wrap(pos[0], Game.DIM_X), wrap(pos[1], Game.DIM_Y)
    ];

    function wrap (coord, max) {
      if (coord < 0) {
        return max - (coord % max);
      } else if (coord > max) {
        return coord % max;
      } else {
        return coord;
      }
    }
  };
})();

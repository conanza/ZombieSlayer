  (function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var Game = ZombieSlayer.Game = function () {
    this.zombies = [];
    this.humans = [];
    this.bullets = [];

    this.addZombies();
  };

  Game.DIM_X = 800;
  Game.DIM_Y = 800;
  Game.NUM_ZOMBIES = 5;
  Game.BG = ZombieSlayer.Util.loadImage("./assets/background.jpg");

  Game.prototype.addHuman = function (options) {
    var girl = options.gender === "F" ? true : false;
    var human = new ZombieSlayer.Human({
      pos: [Math.floor(Game.DIM_X / 2) - 26, Math.floor(Game.DIM_Y / 2) - 26],
      game: this,
      girl: girl
    });

    this.humans.push(human);

    return human;
  };

  Game.prototype.addZombies = function () {
    for (var i = 0; i < Game.NUM_ZOMBIES; i++) {
      var randPosition = this.randomPosition();

      var zombie = new ZombieSlayer.Zombie({
        pos: randPosition,
        game: this,
        vel: [1, -1]
      });

      this.zombies.push(zombie);
    }
  };

  Game.prototype.allObjects = function () {
    return []
      .concat(this.zombies)
      .concat(this.humans);
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.drawImage(Game.BG, 0, 0);
    // ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

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

  Game.prototype.step = function () {
    this.moveObjects();
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

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
  Game.NUM_ZOMBIES = 10;
  Game.BG = ZombieSlayer.Util.loadImage("./assets/background.jpg");

  Game.prototype.add = function (object) {
    if (object instanceof ZombieSlayer.Zombie) {
      this.zombies.push(object);
    } else if (object instanceof ZombieSlayer.Human) {
      this.humans.push(object);
    } else {
      throw "???";
    }
  };

  Game.prototype.addHuman = function (options) {
    var girl = options.gender === "F" ? true : false;
    var human = new ZombieSlayer.Human({
      pos: [Math.floor(Game.DIM_X / 2) - 26, Math.floor(Game.DIM_Y / 2) - 26],
      game: this,
      girl: girl
    });

    this.add(human);

    return human;
  };

  Game.prototype.addZombies = function () {
    for (var i = 0; i < Game.NUM_ZOMBIES; i++) {
      var randPosition = this.randomPosition();

      var zombie = new ZombieSlayer.Zombie({
        pos: randPosition,
        game: this
      });

      this.add(zombie);
    }
  };

  Game.prototype.allObjects = function () {
    return []
      .concat(this.zombies)
      .concat(this.humans);
  };

  Game.prototype.checkCollisions = function () {
    var game = this;
    game.allObjects().forEach(function (obj1) {
      game.allObjects().forEach(function (obj2) {
        if (obj1 == obj2) {
          return;
        }

        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      });
    });
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.drawImage(Game.BG, 0, 0);

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

  Game.prototype.remove = function (object) {
    if (object instanceof ZombieSlayer.Zombie) {
      var idx = this.zombies.indexOf(object);
      this.zombies[idx] = new ZombieSlayer.Zombie({
        pos: this.randomPosition(),
        game: this
      });
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
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

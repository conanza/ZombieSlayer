  (function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var Game = ZombieSlayer.Game = function () {
    this.zombies = [];
    this.humans = [];
    this.bullets = [];
    this.playerLives = 15;
    this.gameScore = 0;
    this.bloodpools = [];
    this.skeletons = [];
    this.over = false;
    this.stage = 1;

    this.num_zombies = 10;

    this.addZombies();
  };

  Game.DIM_X = 795;
  Game.DIM_Y = 795;
  Game.NUM_ZOMBIES = 10;
  Game.BG = ZombieSlayer.Util.loadImage("./assets/background.jpg");

  Game.prototype.add = function (object) {
    if (object instanceof ZombieSlayer.Zombie) {
      this.zombies.push(object);
    } else if (object instanceof ZombieSlayer.Human) {
      this.humans.push(object);
    } else if (object instanceof ZombieSlayer.Bullet) {
      this.bullets.push(object);
    } else if (object instanceof ZombieSlayer.PoolOfBlood) {
      this.bloodpools.push(object);
    } else if (object instanceof ZombieSlayer.Skeleton) {
      this.skeletons.push(object);
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
      .concat(this.bloodpools)
      .concat(this.skeletons)
      .concat(this.zombies)
      .concat(this.humans)
      .concat(this.bullets);
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

  Game.prototype.checkLives = function () {
    if (this.playerLives <= 0) {
      this.over = true;
    }
  };

  Game.prototype.checkScore = function () {
    if (this.gameScore >= 200) {
      this.num_zombies = 50;
      this.stage = 4;
    } else if (this.gameScore >= 100) {
      this.num_zombies = 30;
      this.stage = 3;
    } else if (this.gameScore >= 20) {
      this.num_zombies = 15;
      this.stage = 2;
    }
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.drawImage(Game.BG, 0, 0);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });

    ctx.fillStyle = "black";
    ctx.font = "bold 40px eurostile";
    ctx.fillText("STAGE " + this.stage, 5, 40);

    ctx.font = "bold 20px eurostile";
    ctx.fillText("ZOMBIES SLAYED: ", 5, 60);
    ctx.fillStyle = "blue";
    ctx.fillText("" + this.gameScore, 175, 60);

    ctx.fillStyle = "black";
    ctx.fillText("HP: ", 5, 80);

    for (var i = 0; i < this.playerLives; i++) {
      if (this.playerLives > 10) {
        ctx.fillStyle = "green";
      } else if (this.playerLives > 4) {
        ctx.fillStyle = "orange";
      } else {
        ctx.fillStyle = "red";
      }
      ctx.fillText("I ", 40 + (i * 5), 80);
    }
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
    var game = this;

    if (object instanceof ZombieSlayer.Zombie) {
      var idx = this.zombies.indexOf(object);
      this.zombies[idx] = new ZombieSlayer.Zombie({
        pos: this.randomPosition(),
        game: this
      });

      this.gameScore += 1;

      var blood = new ZombieSlayer.PoolOfBlood({
        pos: object.pos,
        game: this
      });

      this.add(blood);
      blood.remove();
    } else if (object instanceof ZombieSlayer.Human) {
      this.playerLives -= 1;

      var skeleton = new ZombieSlayer.Skeleton({
        pos: object.pos,
        game: this
      });
      this.add(skeleton);
      skeleton.remove();
      object.relocate();
    } else if (object instanceof ZombieSlayer.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof ZombieSlayer.Skeleton) {
      setTimeout(function () {
        game.skeletons.splice(game.skeletons.indexOf(object), 1);
      }, 5000);
    } else if (object instanceof ZombieSlayer.PoolOfBlood) {
      setTimeout(function () {
        game.bloodpools.splice(game.bloodpools.indexOf(object), 1);
      }, 15000);
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
    this.checkLives();
    this.checkScore();
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

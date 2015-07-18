(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var Human = ZombieSlayer.Human = function (options) {
    options.color = Human.COLOR;
    options.radius = Human.RADIUS;
    options.vel = [0, 0];

    ZombieSlayer.MovingObject.call(this, options);

    if (options.girl) {
      this.person = ZombieSlayer.Util.loadImage("./assets/girl.png");
    } else {
      this.person = ZombieSlayer.Util.loadImage("./assets/boy.png");
    }
  };

  ZombieSlayer.Util.inherits(Human, ZombieSlayer.MovingObject);

  Human.RADIUS = 26;

  Human.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof ZombieSlayer.Zombie) {
      this.remove();
    }
  };

  Human.prototype.draw = function (ctx) {
    if (this.isUp()) {
      ctx.drawImage(this.person, 0, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    } else if (this.isDown()) {
      ctx.drawImage(this.person, 208, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    } else if (this.isRight()) {
      ctx.drawImage(this.person, 104, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    } else if (this.isLeft()) {
      ctx.drawImage(this.person, 312, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    } else if (this.isUpLeft()) {
      ctx.drawImage(this.person, 364, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    } else if (this.isUpRight()) {
      ctx.drawImage(this.person, 52, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    } else if (this.isDownLeft()) {
      ctx.drawImage(this.person, 260, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    } else if (this.isDownRight()) {
      ctx.drawImage(this.person, 156, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    } else {
      ctx.drawImage(this.person, 0, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);
    }
  };

  Human.prototype.fireBullet = function () {
    var humanVel = this.vel;
    var norm = ZombieSlayer.Util.norm(this.vel);

    if (norm === 0) {
      norm = ZombieSlayer.Util.norm([0, -4]);
    }

    if (humanVel[0] === 0 && humanVel[1] === 0) {
      humanVel = [0, -4];
    }

    var relVel = ZombieSlayer.Util.scale(
      ZombieSlayer.Util.dir(humanVel),
      ZombieSlayer.Bullet.SPEED
    );

    var bulletVel = [
      relVel[0] + humanVel[0], relVel[1] + humanVel[1]
    ];

    var bullet = new ZombieSlayer.Bullet({
      pos: this.positionBullet(),
      vel: bulletVel,
      game: this.game
    });

    this.game.add(bullet);
    (new Audio("./sounds/gunshot.wav")).play();
  };

  Human.prototype.positionBullet = function () {
    var bulletPos;
    if (this.isUp()) {
      bulletPos = [this.pos[0] + 6, this.pos[1] - 20];
    } else if (this.isDown()) {
      bulletPos = [this.pos[0] + 6, this.pos[1] + 32];
    } else if (this.isRight()) {
      bulletPos = [this.pos[0] + 32, this.pos[1] + 6];
    } else if (this.isLeft()) {
      bulletPos = [this.pos[0] - 20, this.pos[1] + 6];
    } else if (this.isUpLeft()) {
      bulletPos = [this.pos[0] - 20, this.pos[1] - 20];
    } else if (this.isUpRight()) {
      bulletPos = [this.pos[0] + 32, this.pos[1] - 20];
    } else if (this.isDownLeft()) {
      bulletPos = [this.pos[0] - 20, this.pos[1] + 32];
    } else if (this.isDownRight()) {
      bulletPos = [this.pos[0] + 32, this.pos[1] + 32];
    } else {
      bulletPos = [this.pos[0] + 6, this.pos[1] - 20];
    }

    return bulletPos;
  };

  Human.prototype.relocate = function () {
    this.pos = this.randomPosition();
    this.vel = [0, 0];
  };

  Human.prototype.randomPosition = function () {
    var xDimHalved = ZombieSlayer.Game.DIM_X / 2;
    var yDimHalved = ZombieSlayer.Game.DIM_Y / 2;

    // find the centroid of the zombies and weight of each quad
    var totalX = 0;
    var totalY = 0;
    var quadWeight = [0, 0, 0, 0];

// todo: find zombie centroid for each quad
// then, find safest point in safest quad
// => furthest from quad's zombiecentroid && overall zombiecentroid
    this.game.zombies.forEach(function (zombie) {
      totalX += zombie.pos[0];
      totalY += zombie.pos[1];

      if (zombie.pos[0] < xDimHalved && zombie.pos[1] < yDimHalved) {
        quadWeight[0] += 1;
      } else if (zombie.pos[0] >= xDimHalved && zombie.pos[1] < yDimHalved) {
        quadWeight[1] += 1;
      } else if (zombie.pos[0] >= xDimHalved && zombie.pos[1] >= yDimHalved) {
        quadWeight[2] += 1;
      } else {
        quadWeight[3] += 1;
      }
    });

    var zombieCentroid = [
      totalX / this.game.zombies.length,
      totalY / this.game.zombies.length
    ];

    quadWeight = quadWeight.map(function (weight) {
      return (weight / this.game.zombies.length);
    }.bind(this));

    var safestQuad = quadWeight.indexOf(Math.min.apply(null, quadWeight));

    // build random pos in safest quad
    var randomPositions = [];
    for (var i = 0; i < 8; i++) {
      if (safestQuad === 0) {
        randomPositions.push([
          Math.random() * (xDimHalved),
          Math.random() * (yDimHalved)
        ]);
      } else if (safestQuad === 1) {
        randomPositions.push([
          Math.random() * (xDimHalved) + xDimHalved,
          Math.random() * (yDimHalved)
        ]);
      } else if (safestQuad === 2) {
        randomPositions.push([
          Math.random() * (xDimHalved) + xDimHalved,
          Math.random() * (yDimHalved) + yDimHalved
        ]);
      } else {
        randomPositions.push([
          Math.random() * (xDimHalved),
          Math.random() * (yDimHalved) + yDimHalved
        ]);
      }
    }

    var distances = randomPositions.map(function (pos) {
      return ZombieSlayer.Util.dist(zombieCentroid, pos);
    });

    var safePosIdx = distances.indexOf(Math.max.apply(null, distances));

    return randomPositions[safePosIdx];
  };
})();

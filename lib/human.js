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
    }





     else {
      ctx.drawImage(this.person, 0, 0, 52, 52, this.pos[0], this.pos[1], 52, 52);

    }

  };
})();

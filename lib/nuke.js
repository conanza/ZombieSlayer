(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var Nuke = ZombieSlayer.Nuke = function (options) {
    options.color = "black";
    this.boom = new Audio("./sounds/bomb.wav");

    ZombieSlayer.PowerupObject.call(this, options);
  };

  ZombieSlayer.Util.inherits(Nuke, ZombieSlayer.PowerupObject);

  Nuke.prototype.goBoom = function () {
    this.boom.play();
  };
  
  // Nuke.prototype.draw = function (ctx) {
  // };
})();

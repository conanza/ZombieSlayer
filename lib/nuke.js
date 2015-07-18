(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var Nuke = ZombieSlayer.Nuke = function (options) {
    options.color = "black";

    ZombieSlayer.PowerupObject.call(this, options);
  };

  ZombieSlayer.Util.inherits(Nuke, ZombieSlayer.PowerupObject);

  // Nuke.prototype.draw = function (ctx) {
  // };
})();

(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var HealthUp = ZombieSlayer.HealthUp = function (options) {
    options.color = "red";

    ZombieSlayer.PowerupObject.call(this, options);
  };

  ZombieSlayer.Util.inherits(HealthUp, ZombieSlayer.PowerupObject);

  // HealthUp.prototype.draw = function (ctx) {
  // };
})();

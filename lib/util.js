(function () {
  if (typeof ZombieSlayer === "undefined") {
    window.ZombieSlayer = {};
  }

  var Util = ZombieSlayer.Util = {};

  Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate () {
      this.constructor = ChildClass;
    }

    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Util.loadImage = function (img_path) {
    var img = new Image();
    img.src = img_path;

    return img;
  };

  Util.sortedScores = function (scoreArr) {
    return scoreArr.sort(function (score1, score2) {
      return score2.score - score1.score;
    });
  };

  // Vector Math
  var dir = Util.dir = function (vec) {
    var norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  };

  var dist = Util.dist = function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };

  var norm = Util.norm = function (vec) {
    return Util.dist([0, 0], vec);
  };

  var scale = Util.scale = function (vec, m) {
    return [vec[0] * m, vec[1] * m];
  };
})();


var eyeamaman = {};

function Desp() {
  eyeamaman.scripts = {};

  var add = function() {
    var str = arguments[0];
    var dependencies = arguments[1];
    var func = arguments[2];

    var waiting = function() {
      var def = new Deferred();

      def.resolve(this);
    };

    // add to scripts object
    if (dependencies.length < 1) {
      eyeamaman.scripts[str.toLowerCase()] = func();
      //console.log(Object.size(eyeamaman.scripts));
    }
    else {
      // set a ready function for if the dependencies have loaded
      waiting().resolve(function() {
      });
    }
  };

  return {
    add: add
  }
}

var Yo = new Desp();

Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};


function Deferred(){
  this._done = [];
  this._fail = [];
}

Deferred.prototype = {
  execute: function(list, args){
    var i = list.length;

    // convert arguments to an array
    // so they can be sent to the
    // callbacks via the apply method
    args = Array.prototype.slice.call(args);

    while(i--) list[i].apply(null, args);
  },
  resolve: function(){
    this.execute(this._done, arguments);
  },
  reject: function(){
    this.execute(this._fail, arguments);
  },
  done: function(callback){
    this._done.push(callback);
  },
  fail: function(callback){
    this._fail.push(callback);
  }
};


var v;

var setVal = function() {
  var d = new Deferred();
  setTimeout(function() {
    v = 'a value';
    d.resolve(this);
  }, 5000);
  return d;
};

setVal().done(function() {
  console.log('all done :' + v);
});












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













Yo.add('Test', [], function(egg) {
  //egg.output();
  return {
  }
});


Yo.add('Egg', [], function() {
  var output = function() {
    console.log('Egg is loaded');
  };

  return {
    output: output
  }
});


Yo.add('Cheese', [], function() {
  var output = function() {
    console.log('Cheese is loaded');
  };

  return {
    output: output
  }
});
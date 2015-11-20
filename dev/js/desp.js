
var namespace = {};

function Desp() {
  namespace.scripts = {};

  // namespace.loadedState.tooltip.{
  //    loaded: boolean
  //    loadedFunc: function
  //    arrayList: [function, function, function]
  // }
  namespace.loadedState = {};

  var add = function() {
    var str = arguments[0].toLowerCase();
    var dependencies = arguments[1];
    var func = arguments[2];
    var noDependencies = dependencies.length < 1;

    var addToScripts = function() {
      // Set namespace scripts to returned function
      namespace.scripts[str] = func();

      // Check if loadState exists already
      // then set the basics or run the arrayList
      // function and set the loaded to true
      if(!namespace.loadedState[str]) {
        namespace.loadedState[str] = {
          loaded: true,
          loadedFunc: function() {
          },
          arrayList: []
        }
      }
      else {
        // set loaded to true
        namespace.loadedState[str].loaded = true;

        // Run all functions stored by dependencies
        namespace.loadedState[str].arrayList.forEach(function(func) {
          func();
        });
      }
    };

    // add to scripts object
    if (noDependencies) {
      addToScripts();
    }
    else {
      // add an array of functions ready to fire
      // when the dependency loads
      dependencies.forEach(function(entry) {
        if(!namespace.loadedState[entry]) {
          namespace.loadedState[entry] = {
            loaded: false,
            loadedFunc: function() {
            },
            arrayList: []
          };
        }
        namespace.loadedState[entry].arrayList.push(addToScripts);
      });
    }
  };

  return {
    add: add
  }
}

var Yo = new Desp();
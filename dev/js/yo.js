
var Yo = function(ns) {
  ns.scripts = {};

  // namespace.loadedState.tooltip.{
  //    loaded: boolean
  //    loadedFunc: function
  //    arrayList: [function, function, function],
  //    dependencies: [object, object, object]
  // }
  ns.loadedState = {};

  var add = function() {
    var str = arguments[0].toLowerCase();
    var dependencies = arguments[1];
    var func = arguments[2];

    var noDependencies = dependencies.length < 1;
    var allLoaded = true;

    var pushFunction = function() {
      ns.scripts[str] = func.apply(null, dependencies.map(function(str) {
        return ns.scripts[str];
      }));
      addToScripts();
    };

    var addToScripts = function() {
      // Set namespace scripts to returned function

      if (noDependencies) {
        ns.scripts[str] = func();
      }

      // Check if loadState exists already
      // then set the basics or run the arrayList
      // function and set the loaded to true
      if(!ns.loadedState[str]) {
        ns.loadedState[str] = {
          loaded: true,
          arrayList: []
        }
      }
      else {
        // set loaded to true
        ns.loadedState[str].loaded = true;

        // Run all functions stored by dependencies
        ns.loadedState[str].arrayList.forEach(function(initFunct) {
          initFunct();
        });
        // reset all functions
        ns.loadedState[str].arrayList = [];
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
        // Generate loadState for all dependencies
        // if not already.
        if(!ns.loadedState[entry]) {
          ns.loadedState[entry] = {
            loaded: false,
            arrayList: []
          };
          allLoaded = false;
        }
      });

      if (allLoaded) {
        pushFunction();
      }
      else {
        // add the main activation script to
        // the last dependency array.
        ns.loadedState[dependencies[dependencies.length-1]].arrayList.push(pushFunction);
      }
    }
  };

  return {
    add: add
  }
}(namespace);
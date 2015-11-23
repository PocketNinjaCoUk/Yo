
var Yo;

Yo = function(ns) {
  ns.scripts = {};

  // namespace.loadedState.tooltip.{
  //    loaded: boolean
  //    loadedFunc: function
  //    arrayList: [function],
  //    dependencies: [object]
  //    dependencyList: [string]
  // }
  ns.loadedState = {};

  var add = function() {
    var str;
    var dependencies;
    var func;

    var noDependencies;
    var allLoaded = true;

    // Check the argument count to see if
    // 2 or 3 params were entered.
    // String, Array, Function
    if(arguments && arguments.length > 2) {
      str = arguments[0].toLowerCase();
      dependencies = arguments[1];
      func = arguments[2];
      noDependencies = dependencies.length < 1;
    }
    // String, Function
    else if(typeof arguments[0] === 'string' && typeof arguments[1] === 'function') {
      str = arguments[0].toLowerCase();
      func = arguments[1];
      noDependencies = true;
    }
    else {
      console.log('incorrect params added', arguments);
      return false;
    }

    var pushFunction = function() {
      // Pushes the dependencies to the function
      ns.scripts[str] = func.apply(null, dependencies.map(function(str) {
        return ns.scripts[str];
      }));
      addToScripts();
    };

    var createBasicLoadState = function(scriptName, dependencies) {
      ns.loadedState[scriptName] = {
        loaded: true,
        arrayList: [],
        dependencyList: dependencies
      }
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
        createBasicLoadState(str, dependencies);
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
        console.log('SCRIPT: ' + str + ': Dependency ' + entry);

        if(!ns.loadedState[entry]) {
          createBasicLoadState(entry, []);
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

/*
Yo.add('$', function() {
  // code in here to load the plugin
});*/
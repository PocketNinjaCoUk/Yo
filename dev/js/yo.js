
var Yo;

Yo = function(ns) {
  ns.scripts = {};

  // namespace.loadedState.tooltip.{
  //    loaded: boolean
  //    loadedFunc: function
  //    arrayList: [function, function, function],
  //    dependencies: [string, string, string]
  // }
  ns.loadedState = {};

  var add = function() {

    // Main params
    var scriptName;
    var scriptDependencies = [];
    var scriptCallback;

    var hasNoDependencies = true;
    var allLoaded = true;

    var pushFunction = function() {
      ns.scripts[scriptName] = scriptCallback.apply(null, scriptDependencies.map(function(str) {
        return ns.scripts[str];
      }));
      addToScripts();
    };

    var createBasicLoadState = function(scriptName, dependencies) {
      ns.loadedState[scriptName] = {
        loaded: true,
        arrayList: [],
        dependencies: dependencies
      }
    };

    var addToScripts = function() {
      // Check if loadState exists already
      // then set the basics or run the arrayList
      // function and set the loaded to true
      if(!ns.loadedState[scriptName]) {
        createBasicLoadState(scriptName, scriptDependencies);
      }
      else {
        // set loaded to true
        ns.loadedState[scriptName].loaded = true;

        // Run all functions stored by dependencies
        ns.loadedState[scriptName].arrayList.forEach(function(initFunct) {
          initFunct();
        });

        // empty all functions
        ns.loadedState[scriptName].arrayList = [];
      }
    };



    // Check and match the argument length
    // 3: String, Array, Function
    // 2: String, Function
    if(arguments && arguments.length > 2) {
      scriptName = arguments[0].toLowerCase();
      scriptDependencies = arguments[1];
      scriptCallback = arguments[2];
      hasNoDependencies = scriptDependencies.length < 1;
    }
    else if(typeof arguments[0] === 'string' && typeof arguments[1] === 'function') {
      scriptName = arguments[0].toLowerCase();
      scriptCallback = arguments[1];
    }
    else {
      console.log('incorrect params added', arguments);
      return false;
    }



    if (hasNoDependencies) {
      // If no then add script directly to the loadedState
      ns.scripts[scriptName] = scriptCallback();
      addToScripts();
    }
    else {
      // add an array of functions ready to fire
      // when the dependency loads

      scriptDependencies.forEach(function(dependencyItem) {
        // Generate loadState for all dependencies
        // if not already.
        if(!ns.loadedState[dependencyItem]) {
          createBasicLoadState(dependencyItem, []);
          allLoaded = false;
        }
        else {
          // Check if the dependencyItem has dependencies too
          // and if it conflicts by requiring back.
          if(ns.loadedState[dependencyItem].dependencies.length > 0) {
            ns.loadedState[dependencyItem].dependencies.forEach(function(dependencyScriptName) {
              if(dependencyScriptName === scriptName) {
                console.log('SCRIPT: ' + scriptName + ' is using and also used as a dependency by '
                  + dependencyScriptName);
              }
            });
          }
        }
      });

      if (allLoaded) {
        pushFunction();
      }
      else {
        // add the main activation script to
        // the last dependency array.
        ns.loadedState[scriptDependencies[scriptDependencies.length-1]].arrayList.push(pushFunction);
      }
    }
  };

  return {
    add: add
  }
}(namespace);
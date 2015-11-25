/*

  What does this do?

  1. Creates a new script
  2. Does script have dependencies?
  3. NO:    Saves script and save LoadedState as true
  4. YES:   Saves basic loaded state with true
  5.        Check if each dependency has loaded
  6.        Create new basic load states for unloaded ones
  7.        Push it's addToScript and activation function to the last dependency
 */





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
      addToLoadState();
    };

    var createBasicLoadState = function(scriptName, dependencies, loaded) {
      ns.loadedState[scriptName] = {
        loaded: loaded || true,
        arrayList: [],
        dependencies: dependencies
      }
    };

    var addToLoadState = function() {
      // Check if loadState exists already
      // then set the basics or run the arrayList
      // function and set the loaded to true
      if(!ns.loadedState[scriptName]) {
        createBasicLoadState(scriptName, scriptDependencies);
      }
      else {
        // set loaded to true
        ns.loadedState[scriptName].loaded = true;

        // Run all functions stored by scripts
        // dependent
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
      // Save script straight away
      ns.scripts[scriptName] = scriptCallback();

      // Check and add to loadstate
      addToLoadState();
    }
    else {
      // add an array of functions ready to fire
      // when the dependency loads
      //createBasicLoadState(scriptName, scriptDependencies, false);

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



Yo = function(ns) {
  // namespace.loadedState.tooltip.{
  //    loaded: boolean
  //    loadedFunc: function
  //    dependedBy: [string],
  //    dependencies: [string]
  // }
  ns.loadedState = {};
  ns.scripts = {};

  var add = function() {

    // Main params
    var scriptName;
    var scriptDependencies = [];
    var scriptCallback;

    var hasNoDependencies = true;

    var pushFunction = function() {
      ns.loadedState[scriptName].loaded = true;
      ns.scripts[scriptName] = scriptCallback.apply(null, scriptDependencies.map(function(_scriptName) {
        return ns.scripts[_scriptName];
      }));
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
      // Save the script straight away
      ns.scripts[scriptName] = scriptCallback();
      // ns.loadedState[scriptName] = {};
      // 1. save to ns.loadedState if not done already
      if(!ns.loadedState[scriptName]) {
        ns.loadedState[scriptName] = {
          loaded: true,
          dependedBy: [],
          dependencies: []
        }
      }
      // 2. if ns.loadedState exists
      else {
        //    a) set loaded = true
        //    b) loop dependedBy entries and remove itself from each one
        //    c) if it is the last dependBy then run it's activate function

        ns.loadedState[scriptName].loaded = true;

        ns.loadedState[scriptName].dependedBy.forEach(function(dependByScriptName) {
          // remove script from dependedBy
          for(var i = 0; i < ns.loadedState[scriptName].dependedBy.length; i++) {
            if (ns.loadedState[dependByScriptName].dependencies[i] === scriptName) {
              ns.loadedState[dependByScriptName].dependencies.splice(i, 1);
              ns.loadedState[scriptName].dependedBy.splice(i, 1);
              break;
            }
          }

          if (ns.loadedState[dependByScriptName].dependencies.length < 1) {
            ns.loadedState[dependByScriptName].loadedFunc();
          }
        });
      }
    }
    else {
      // if has dependencies
      // 1. save to ns.loadedState {
      //    loaded: false,
      //    loadedFunc: activateFunction,
      //    dependencies: [string]
      // }
      if(!ns.loadedState[scriptName]) {
        ns.loadedState[scriptName] = {
          loaded: false,
          loadedFunc: pushFunction,
          dependedBy: [],
          dependencies: scriptDependencies
        }
      }
      else {
        ns.loadedState[scriptName].loadedFunc = pushFunction;
        ns.loadedState[scriptName].dependencies = scriptDependencies;
      }

      // 2. check if each dependency exists and either
      //    a) check if is loaded
      scriptDependencies.forEach(function(dependencyScriptName) {
        if(!ns.loadedState[dependencyScriptName]) {
          ns.loadedState[dependencyScriptName] = {
            loaded: false,
            loadedFunc: function(){},
            dependedBy: [],
            dependencies: []
          }
        }
        if(!ns.loadedState[dependencyScriptName].loaded) {
          ns.loadedState[dependencyScriptName].dependedBy.push(scriptName);
        }
        else {
          pushFunction();
        }
      });

      // 3. if all dependencies are loaded then
      //    a) save the script straight away
      //    b) save
    }
  };

  return {
    add: add
  }
}(namespace);

// namespace.loadedState.tooltip.{
//    loaded: boolean
//    loadedFunc: function
//    dependedBy: [string],
//    dependencies: [string]
// }
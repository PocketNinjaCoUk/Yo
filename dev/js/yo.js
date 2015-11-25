
var Yo;

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
      ns.loadedState[scriptName].loadedFunc = function() {
        console.log('already loaded');
      };
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

        // Check if dependency is dependent on this script
        // Circular dependency
        for (var i = 0; i < ns.loadedState[dependencyScriptName].dependencies.length; i++) {
          if(ns.loadedState[dependencyScriptName].dependencies[i] === scriptName) {
            console.log('ERROR: You have 1 or more scripts with circular dependencies');
            console.log('SCRIPT: ' + scriptName + ', DEPENDENCY: ' + dependencyScriptName);
            break;
          }
        }

        if(!ns.loadedState[dependencyScriptName].loaded) {
          ns.loadedState[dependencyScriptName].dependedBy.push(scriptName);
        }
        else {
          ns.loadedState[scriptName].loadedFunc();
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
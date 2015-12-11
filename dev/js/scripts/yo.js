


/**
 * Yo, the single page dependency management script created by pocketninja for his own amusement
 *
 * @module Yo
 * @returns {object} public functions
 */
var Yo = function() {
  // namespace.loadedState.tooltip.{
  //    loaded: boolean
  //    loadedFunc: function
  //    dependedBy: [string],
  //    dependencies: [string]
  // }

  /**
   * container of the namespace object provided by the user with Yo.init()
   * @private
   * @var {object} ns
   */
  var ns;


  /**
   * After creating Yo you need to provide it with your main namespace to any level within it. Like "company" or "company.cool.scripts"
   *
   * @method init
   * @param {object} data - initial data object.
   * @param {object} data.namespace - users main script namespace.
   *
   * @example
   * Yo.init({
   *   namespace: your.script.name.space
   * });
   */
  var init = function(data){
    ns = data.namespace;
    ns.loadedState = {};
    ns.scripts = {};
  };


  /**
   * For adding new scripts with their own dependencies
   *
   * @method add
   * @param {string} scriptName Script name
   * @param {array} [scriptDependencies=undefined] Script list of dependencies
   * @param {function} scriptCallback Script module callback
   *
   * @example
   * Yo.add('WidgetName', ['dependency1', 'dependency2', 'etc'], function() {
   *   // your code in here
   *   return {}
   * });
   */
  var add = function() {

    // Main params
    var scriptName;
    var scriptDependencies = [];
    var scriptCallback;

    var hasNoDependencies = true;

    var extend = function() {
      for(var i=1; i < arguments.length; i++) {
        for(var key in arguments[i]) {
          if(arguments[i].hasOwnProperty(key)) {
            arguments[0][key] = arguments[i][key];
          }
        }
      }
      return arguments[0];
    };

    var createOrEditLoadedState = function(data, script) {
      var script = script || scriptName;
      ns.loadedState[script] = extend({
        loaded: false,
        loadedFunc: function(){},
        dependedBy: [],
        dependencies: [],
        dependencyCheckList: []
      }, ns.loadedState[script], data);
    };

    /**
     * Callback added to loadState[scriptName].loadedFunc which is run once all of it's dependencies have loaded
     *
     * @function pushFunction
     * @private
     */
    var pushFunction = function() {
      createOrEditLoadedState({
        loaded: true,
        loadedFunc: function() { console.log(scriptName + ' called and already loaded'); }
      });
      ns.scripts[scriptName] = scriptCallback.apply(null, scriptDependencies.map(function(_scriptName) {
        return ns.scripts[_scriptName];
      }));
    };

    var checkDependedBy = function() {
      ns.loadedState[scriptName].dependedBy.forEach(function(otherScript) {
        // remove itself from dependedBy
        for(var i = 0; i < ns.loadedState[scriptName].dependedBy.length; i++) {
          if (ns.loadedState[otherScript].dependencyCheckList[i] === scriptName) {
            ns.loadedState[otherScript].dependencyCheckList.splice(i, 1);
            ns.loadedState[scriptName].dependedBy.splice(i, 1);
            break;
          }
        }

        if (ns.loadedState[otherScript].dependencyCheckList.length < 1) {
          ns.loadedState[otherScript].loaded = true;
          ns.loadedState[otherScript].loadedFunc();
        }
      });
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
      // Run and save output of script callback
      ns.scripts[scriptName] = scriptCallback();

      // Create object key if it doesn't appear in loadState
      createOrEditLoadedState({
        loaded: true
      });
      checkDependedBy();
    }
    else {
      // if has dependencies
      // 1. save to ns.loadedState {
      //    loaded: false,
      //    loadedFunc: activateFunction,
      //    dependencies: [string]
      // }
      createOrEditLoadedState({
        loadedFunc: pushFunction,
        dependencies: scriptDependencies,
        dependencyCheckList: scriptDependencies
      });

      // 2. check if each dependency exists and either
      //    a) check if is loaded
      scriptDependencies.forEach(function(dependencyScriptName) {
        if(!ns.loadedState[dependencyScriptName]) {
          createOrEditLoadedState({}, dependencyScriptName);
        }
/*
        // Check if dependency is dependent on this script
        // Circular dependency
        for (var i = 0; i < ns.loadedState[dependencyScriptName].dependencies.length; i++) {
          if(ns.loadedState[dependencyScriptName].dependencies[i] === scriptName) {
            console.log('ERROR: You have 1 or more scripts with circular dependencies');
            console.log('SCRIPT: ' + scriptName + ', DEPENDENCY: ' + dependencyScriptName);
            break;
          }
        }*/
        if(ns.loadedState[dependencyScriptName].loaded) {
          // 3. if all dependencies are loaded then
          ns.loadedState[scriptName].loadedFunc();
        }
        else {
          // Add scriptName to the dependency loadedState.dependBy array
          ns.loadedState[dependencyScriptName].dependedBy.push(scriptName);
        }
      });

      checkDependedBy();
    }
  };

  return {
    init: init,
    add: add
  }
}();



/**
 * Yo, the single page dependency management script created by pocketninja for his own amusement
 *
 * @module Yo
 * @returns {object} public functions
 */
var Yo = function() {
  // Yo.loadedState.tooltip.{
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
    Yo.loadedState = {};
    ns.scripts = {};
  };

  var isTypeOf = function(str, obj) {
    return '[object ' + str + ']' === Object.prototype.toString.call(obj);
  };

  var argumentChecker = function(args, argSequence) {
    if(args.length === argSequence.length) {
      var i, val;
      for (i = 0; i < args.length; i++) {
        val = args[i];
        if (!isTypeOf(argSequence[i], val))   {
          console.log('Error with value comparison: ' + val + ', EXPECTED: ' + argSequence[i] );
          return false;
        }
      }

      return true;
    }
    else {
      return false;
    }
  };

  var arrayClone = function(arr) {
    return arr.slice(0);
  };

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

    var scriptName;
    var scriptDependencies = [];
    var scriptCallback;
    var hasNoDependencies = true;

    var createOrEditLoadedState = function(data, script) {
      script = script || scriptName;
      Yo.loadedState[script] = extend({
        loaded: false,
        loadedFunc: function(){},
        dependedBy: [],
        dependencies: []
      }, Yo.loadedState[script], data);
    };

    var addToNameSpace = function(str) {
      var namespaceArr = str.split('.');
      var currentObj = ns.scripts;

      for(var i = 0; i < namespaceArr.length; i++) {
        if(currentObj[namespaceArr[i]] === undefined) {
          currentObj[namespaceArr[i]] = {};
        }
        currentObj = currentObj[namespaceArr[i]];
      }
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
      return scriptCallback.apply(null, scriptDependencies.map(function(_scriptName) {
        return ns.scripts[_scriptName];
      }));
    };

    var activateScript = function(script) {
      if(Yo.loadedState[script].loaded) {
        ns.scripts[script] = Yo.loadedState[script].loadedFunc();
      }
    };


    var checkDependedBy = function() {
      var dependedBy = Yo.loadedState[scriptName].dependedBy;

      dependedBy.forEach(function(otherScript) {
        for(var i = 0; i < dependedBy.length; i++) {
          if (Yo.loadedState[otherScript].dependencies[i] === scriptName) {
            Yo.loadedState[otherScript].dependencies.splice(i, 1);
            dependedBy.splice(i, 1);
            break;
          }
        }

        if (Yo.loadedState[otherScript].dependencies.length < 1) {
          Yo.loadedState[otherScript].loaded = true;
          activateScript(otherScript);
        }
      });
    };


    var checkDependencies = function() {
      var allDependenciesLoaded = true;
      var scriptDependents = Yo.loadedState[scriptName].dependencies;
      var dependencyScriptName;

      var looper = function() {
        for(var i = 0; i < scriptDependents.length; i++) {
          dependencyScriptName = scriptDependents[i];
          // If script name loadState doesn't
          // exist then create one
          if(!Yo.loadedState[dependencyScriptName]) {
            createOrEditLoadedState({}, dependencyScriptName);
          }

          if(!Yo.loadedState[dependencyScriptName].loaded) {
            Yo.loadedState[dependencyScriptName].dependedBy.push(scriptName);
            allDependenciesLoaded = false;
          }
          else {
            scriptDependents.splice(i, 1);
            looper();
            break;
          }
        }
      };

      looper();

      if(allDependenciesLoaded) {
        Yo.loadedState[scriptName].loaded = true;
      }
    };


    if(argumentChecker(arguments, ['String', 'Array', 'Function'])) {
      scriptName = arguments[0].toLowerCase();
      scriptDependencies = arguments[1];
      scriptCallback = arguments[2];
      hasNoDependencies = scriptDependencies.length < 1;
    }
    else if(argumentChecker(arguments, ['String', 'Function'])) {
      scriptName = arguments[0].toLowerCase();
      scriptCallback = arguments[1];
    }
    else {
      console.log('incorrect params added', arguments);
      return false;
    }

    //console.log('YO.ADD: ' + scriptName);

    if (hasNoDependencies) {
      createOrEditLoadedState({
        loaded: true,
        loadedFunc: scriptCallback
      });
      activateScript(scriptName);
      checkDependedBy();
    }
    else {
      createOrEditLoadedState({
        loadedFunc: pushFunction,
        dependencies: arrayClone(scriptDependencies)
      });
      checkDependencies();
      activateScript(scriptName);
      checkDependedBy();
    }
  };

  return {
    init: init,
    add: add,
    isTypeOf: isTypeOf,
    argumentChecker: argumentChecker,
    arrayClone: arrayClone,
    extend: extend
  }
}();
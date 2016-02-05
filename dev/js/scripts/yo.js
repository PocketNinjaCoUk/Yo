


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
  var scriptRoot = 'modules';


  /**
   * After creating Yo you need to provide it with your main namespace to any level within it. Like "company" or "company.cool.scripts"
   *
   * @method init
   * @param {object} data - initial data object.
   * @param {object} data.namespace - users main script namespace.
   *
   * @example
   * Yo.init({
   *   namespace: your.script.name.space,
   *   scriptRoot: 'cheese'
   * });
   */
  var init = function(data){
    ns = data.namespace || Yo;
    Yo.loadedState = {};
    if(data.scriptRoot) {
      scriptRoot = data.scriptRoot;
    }
    ns[scriptRoot] = {};
  };

  var isTypeOf = function(str, obj) {
    return '[object ' + str + ']' === Object.prototype.toString.call(obj);
  };

  var argumentChecker = function(args, argSequence) {
    if(args.length === argSequence.length) {
      var i, val;
      for (i = 0; i < args.length; i++) {
        val = args[i];
        if (!isTypeOf(argSequence[i], val)) {
          console.log('Error with value comparison: ' + val + ', EXPECTED: ' + argSequence[i]);
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

    var nsMngr = function() {
      var keyArr;
      var currentObj;

      var get = function(_nsObject, _nsStr) {
        keyArr = _nsStr.split('.');
        currentObj = _nsObject;

        for(var i = 0; i < namespaceArr.length; i++) {
          if (!currentObj[namespaceArr[i]]) {
            return false;
          }
          currentObj = currentObj[namespaceArr[i]];
        }

        return currentObj;
      };

      var set = function(_nsObject, _str) {
      };

      return {
        get: get,
        set: set
      };
    };



    // Returns false or Object
    var nsGet = function(_nsStr, _nsObject) {
      var keyArr = _nsStr.split('.');
      var currentObj = _nsObject;

      for(var i = 0; i < keyArr.length; i++) {
        if (!currentObj[keyArr[i]]) {
          return false;
        }
        currentObj = currentObj[keyArr[i]];
      }

      return currentObj;
    };




    /**
     * Set new branches to your namespace tree
     * WIll run through the
     *
     * @method add
     * @param {string} _nsStr Script namespace or name
     * @param {array} [scriptDependencies=undefined] Script list of dependencies
     *
     * @returns {object} functions
     *
     */
    var nsSet = function(_nsStr, _nsObject) {
      var keyArr = _nsStr.split('.');
      var currentObj = _nsObject;

      for(var i = 0; i < keyArr.length; i++) {
        if (!currentObj[keyArr[i]]) {
          currentObj[keyArr[i]] = {};
        }
        currentObj = currentObj[keyArr[i]];
      }

      return currentObj;
    };






    var checkLoadedState = function(_script) {
      var namespaceArr = _script.split('.');
      var currentObj = Yo.loadedState;

      for(var i = 0; i < namespaceArr.length; i++) {
        if (!currentObj[namespaceArr[i]]) {
          return false;
        }
        currentObj = currentObj[namespaceArr[i]];
      }

      return currentObj;
    };

    var getLoadedState = function(_script) {
      var namespaceArr = _script.split('.');
      var currentObj = Yo.loadedState;

      for(var i = 0; i < namespaceArr.length; i++) {
        if (!currentObj[namespaceArr[i]]) {
          currentObj[namespaceArr[i]] = {};
        }
        currentObj = currentObj[namespaceArr[i]];
      }

      return currentObj;
    };

    var setLoadedState = function(_script, _data) {
      extend(nsGet(_script, Yo.loadedState), _data);
    };

    var getScriptRoot = function(_script) {
      return addToNameSpace(_script);
      //return ns[scriptRoot][_script];
    };

    var setScriptRoot = function(_script, _function) {
      var namespaceArr = _script.split('.');
      var currentObj = ns[scriptRoot];

      if (namespaceArr.length < 2) {
        currentObj[_script] = _function();
      }
      else {
        for(var i = 0; i < namespaceArr.length; i++) {
          if (!currentObj[namespaceArr[i]]) {
            currentObj[namespaceArr[i]] = {};
          }
          currentObj = currentObj[namespaceArr[i]];
        }
        currentObj = _function();
      }
    };

    var addToNameSpace = function(_str, _nsObject) {
      var namespaceArr = _str.split('.');
      var currentObj = _nsObject || ns[scriptRoot];

      if (namespaceArr.length < 2) {
        return currentObj[_str];
      }
      else {
        for(var i = 0; i < namespaceArr.length; i++) {
          if (!currentObj[namespaceArr[i]]) {
            currentObj[namespaceArr[i]] = {};
          }
          currentObj = currentObj[namespaceArr[i]];
        }
      }

      return currentObj;
    };

    var createOrEditLoadedState = function(data, script) {
      script = script || scriptName;

      setLoadedState(script, extend({
        loaded: false,
        loadedFunc: function(){},
        dependedBy: [],
        dependencies: []
      }, nsGet(script, Yo.loadedState), data));
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
        return getScriptRoot(_scriptName);
      }));
    };

    var activateScript = function(script) {
      //var scriptRoot = getScriptRoot(script);
      if(getLoadedState(script).loaded) {
        setScriptRoot(script, getLoadedState(script).loadedFunc);
        //ns[scriptRoot][script] = getLoadedState(script).loadedFunc();
      }
    };


    var checkDependedBy = function() {
      var dependedBy = getLoadedState(scriptName).dependedBy;

      dependedBy.forEach(function(otherScript) {
        for(var i = 0; i < dependedBy.length; i++) {
          if (getLoadedState(otherScript).dependencies[i] === scriptName) {
            getLoadedState(otherScript).dependencies.splice(i, 1);
            dependedBy.splice(i, 1);
            break;
          }
        }

        if (getLoadedState(otherScript).dependencies.length < 1) {
          getLoadedState(otherScript).loaded = true;
          activateScript(otherScript);
        }
      });
    };


    var checkDependencies = function() {
      var allDependenciesLoaded = true;
      var scriptDependents = getLoadedState(scriptName).dependencies;
      var dependencyScriptName;

      var looper = function() {
        for(var i = 0; i < scriptDependents.length; i++) {
          dependencyScriptName = scriptDependents[i];
          // If script name loadState doesn't
          // exist then create one
          if(!checkLoadedState(dependencyScriptName)) {
            createOrEditLoadedState({}, dependencyScriptName);
          }

          if(!getLoadedState(dependencyScriptName).loaded) {
            getLoadedState(dependencyScriptName).dependedBy.push(scriptName);
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
        getLoadedState(scriptName).loaded = true;
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

    console.log('YO.ADD: ' + scriptName);

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
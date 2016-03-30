


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
    ns[scriptRoot] = ns[scriptRoot] || {};
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
   * Gets either and object or false
   *
   * @method add
   * @param {string} _nsStr Script namespace or name
   * @param {object} _nsObject Namespace object
   * @param {boolean} _getObjectRoot What does this mean !!!?
   *
   * @returns {object || boolean} functions
   *
   */
  var nsGet = function(_nsStr, _nsObject, _getObjectRoot) {
    var keyArr = _nsStr.split('.');
    var currentObj = _nsObject;
    _getObjectRoot = _getObjectRoot || false;

    for(var i = 0; i < keyArr.length; i++) {
      if (!currentObj[keyArr[i]]) {
        return false;
      }
      if(_getObjectRoot && (i === keyArr.length - 1)) {
        return currentObj;
      }
      currentObj = currentObj[keyArr[i]];
    }

    return currentObj;
  };



  /**
   * Set new branches to your namespace tree
   * WIll run through the object tree creating
   * everything that doesn't exist.
   *
   * @method add
   * @param {string} _nsStr Script namespace or name
   * @param {object} _nsObject Namespace object
   * @param {boolean} _getObjectRoot What does this mean, find out?!?!?
   *
   * @returns {object} Section of the object param
   *
   */
  var nsSet = function(_nsStr, _nsObject, _getObjectRoot) {
    var keyArr = _nsStr.split('.');
    var currentObj = _nsObject;
    _getObjectRoot = _getObjectRoot || false;

    if (keyArr.length < 2) {
      if(!currentObj[_nsStr]) {
        currentObj[_nsStr] = {};
      }
      if(_getObjectRoot) {
        return _nsObject;
      }
      return currentObj[_nsStr];
    }
    else {
      for(var i = 0; i < keyArr.length; i++) {
        if (!currentObj[keyArr[i]]) {
          currentObj[keyArr[i]] = {};
        }
        if(_getObjectRoot && (i === keyArr.length - 1)) {
          return currentObj;
        }
        currentObj = currentObj[keyArr[i]];
      }
    }

    return currentObj;
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

    var getLoadedState = function(_script) {
      return nsGet(_script, Yo.loadedState);
    };

    var setLoadedState = function(_script, _data) {
      extend(nsSet(_script, Yo.loadedState), _data);
    };

    var activateScript = function(_script) {
      var nsLocation = nsSet(_script, ns[scriptRoot], true);
      var lastNameSpace = _script.split('.');
      lastNameSpace = lastNameSpace[lastNameSpace.length - 1];

      if(getLoadedState(_script).loaded) {
        nsLocation[lastNameSpace] = getLoadedState(_script).loadedFunc();
        getLoadedState(_script).runAfterActivation();
      }
    };

    var getScript = function(_script) {
      return nsSet(_script, ns[scriptRoot]);
    };



    var createOrEditLoadedState = function(_data, _script) {
      _script = _script || scriptName;

      setLoadedState(_script, extend({
        loaded: false,
        loadedFunc: function(){},
        runAfterActivation: function(){},
        dependedBy: [],
        dependencies: []
      }, nsSet(_script, Yo.loadedState) || {}, _data));
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
        return getScript(_scriptName);
      }));
    };


    var checkDependedBy = function() {
      var dependedBy = getLoadedState(scriptName).dependedBy;

      dependedBy.forEach(function(otherScript) {
        for(var i = 0; i < dependedBy.length; i++) {
          for(var a = 0; a < getLoadedState(otherScript).dependencies.length; a++) {
            if (getLoadedState(otherScript).dependencies[a] === scriptName) {
              getLoadedState(otherScript).dependencies.splice(a, 1);
              dependedBy.splice(i, 1);
              break;
            }
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
          if(!nsGet(dependencyScriptName, Yo.loadedState)) {
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
        dependencies: arrayClone(scriptDependencies),
        runAfterActivation: function() {
          checkDependedBy();
        }
      });
      checkDependencies();
      activateScript(scriptName);
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
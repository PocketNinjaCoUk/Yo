
Yow.prototype.add = function() {
  var _this = this;

  var scriptName = '';
  var scriptDependencies = [];
  var scriptCallback = undefined;
  var hasNoDependencies = true;

  this.getLoadedState = function(_script) {
    return this.nsGet(_script, Yow.loadedState);
  };

  this.setLoadedState = function(_script, _data) {
    this.extend(this.nsSet(_script, Yow.loadedState), _data);
  };

  this.activateScript = function(_script) {
    var nsLocation = this.nsSet(_script, this.ns[this.scriptRoot], true);
    var lastNameSpace = _script.split('.');
    lastNameSpace = lastNameSpace[lastNameSpace.length - 1];

    if(this.getLoadedState(_script).loaded) {
      nsLocation[lastNameSpace] = this.getLoadedState(_script).loadedFunc();

      // The next few lines run after the script function has run
      this.getLoadedState(_script).runAfterActivation();
      this.done();
    }
  };

  this.done = function() {
    console.log('Normal ADD');
  };

  this.getScript = function(_script) {
    return this.nsSet(_script, this.ns[scriptRoot]);
  };

  this.createOrEditLoadedState = function(_data, _script) {
    _script = _script || scriptName;

    this.setLoadedState(_script, this.extend({
      loaded: false,
      loadedFunc: function(){},
      runAfterActivation: function(){},
      dependedBy: [],
      dependencies: []
    }, this.nsSet(_script, Yow.loadedState) || {}, _data));
  };

  this.pushFunction = function() {
    this.createOrEditLoadedState({
      loaded: true,
      loadedFunc: function() { console.log(scriptName + ' called and already loaded'); }
    });

    return scriptCallback.apply(null, scriptDependencies.map(function(_scriptName) {
      return _this.getScript(_scriptName);
    }));
  };

  this.checkDependedBy = function() {
    var dependedBy = _this.getLoadedState(scriptName).dependedBy;

    dependedBy.forEach(function(otherScript) {
      for(var i = 0; i < dependedBy.length; i++) {
        for(var a = 0; a < _this.getLoadedState(otherScript).dependencies.length; a++) {
          if (_this.getLoadedState(otherScript).dependencies[a] === scriptName) {
            _this.getLoadedState(otherScript).dependencies.splice(a, 1);
            dependedBy.splice(i, 1);
            break;
          }
        }
      }

      if (_this.getLoadedState(otherScript).dependencies.length < 1) {
        _this.getLoadedState(otherScript).loaded = true;
        _this.activateScript(otherScript);
      }
    });
  };

  this.checkDependencies = function() {
    var allDependenciesLoaded = true;
    var scriptDependents = this.getLoadedState(scriptName).dependencies;
    var dependencyScriptName;

    var looper = function() {
      for(var i = 0; i < scriptDependents.length; i++) {
        dependencyScriptName = scriptDependents[i];
        // If script name loadState doesn't
        // exist then create one
        if(!this.nsGet(dependencyScriptName, Yo.loadedState)) {
          _this.createOrEditLoadedState({}, dependencyScriptName);
        }

        if(!_this.getLoadedState(dependencyScriptName).loaded) {
          _this.getLoadedState(dependencyScriptName).dependedBy.push(scriptName);
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
      this.getLoadedState(scriptName).loaded = true;
    }
  };

  if(this.argumentChecker(arguments, ['String', 'Array', 'Function'])) {
    scriptName = arguments[0].toLowerCase();
    scriptDependencies = arguments[1];
    scriptCallback = arguments[2];
    hasNoDependencies = scriptDependencies.length < 1;
  }
  else if(this.argumentChecker(arguments, ['String', 'Function'])) {
    scriptName = arguments[0].toLowerCase();
    scriptCallback = arguments[1];
  }
  else {
    console.log('incorrect params added', arguments);
    return false;
  }

  console.log('YOW.ADD: ' + scriptName);

  if (hasNoDependencies) {
    this.createOrEditLoadedState({
      loaded: true,
      loadedFunc: scriptCallback
    });
    this.activateScript(scriptName);
    this.checkDependedBy();
  }
  else {
    this.createOrEditLoadedState({
      loadedFunc: this.pushFunction,
      dependencies: this.arrayClone(scriptDependencies),
      runAfterActivation: function() {
        _this.checkDependedBy();
      }
    });
    this.checkDependencies();
    this.activateScript(scriptName);
  }
};
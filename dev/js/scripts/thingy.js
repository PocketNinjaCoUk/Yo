
Thingy = function() {
  var CreateModule = function() {
    this.sayScriptType = function(_type) {
      console.log('Script type is ' + _type);
    };

    this.activateScript = function(_script){
      console.log('script ' + _script + 'activate');
      this.done();
    };

    this.done = function() {
      console.log('Done FIRST STATE.');
    };
  };

  CreateModule.prototype.add = function(_scriptName) {
    var scriptName = _scriptName;
    var type = 'add';

    this.done = function() {
      console.log('Done is now done and gone!!!');
    };

    //this.sayScriptType(type);
    this.activateScript(scriptName);
  };

  CreateModule.prototype.directive = function(_scriptName) {
    var scriptName = _scriptName;
    var type = 'directive';

    //this.sayScriptType(type);
    this.activateScript(scriptName);
  };

  this.CreateModule = new CreateModule();
};

Thingy.prototype.add = function() {
  this.CreateModule.add();
};

Thingy.prototype.directive = function() {
  this.CreateModule.directive();
};



var the = new Thingy();

the.add('crazyScript');
the.directive('directive Script');
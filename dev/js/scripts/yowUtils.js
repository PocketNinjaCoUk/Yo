
Yow.prototype.isTypeOf = function(str, obj) {
  return '[object ' + str + ']' === Object.prototype.toString.call(obj);
};

Yow.prototype.argumentChecker = function(args, argSequence) {
  if(args.length === argSequence.length) {
    var i, val;
    for (i = 0; i < args.length; i++) {
      val = args[i];
      if (!this.isTypeOf(argSequence[i], val)) {
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

Yow.prototype.arrayClone = function(arr) {
  return arr.slice(0);
};

Yow.prototype.extend = function() {
  for(var i=1; i < arguments.length; i++) {
    for(var key in arguments[i]) {
      if(arguments[i].hasOwnProperty(key)) {
        arguments[0][key] = arguments[i][key];
      }
    }
  }
  return arguments[0];
};

Yow.prototype.nsGet = function(_nsStr, _nsObject, _getObjectRoot) {
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

Yow.prototype.nsSet = function(_nsStr, _nsObject, _getObjectRoot) {
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
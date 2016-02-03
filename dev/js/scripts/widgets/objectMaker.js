
Yo.add('objectMaker', function() {

  var egg = {};

  egg.cheese = {
    firstName: 'Duncan',
    lastName: 'Gossage'
  };

  var createNameSpace = function(str) {
    var objArr = str.split('.');
    var currentObj = egg;

    for(var i = 0; i < objArr.length; i++) {
      if(egg[objArr[i]] === undefined) {
        currentObj[objArr[i]] = {};
      }
      currentObj = currentObj[objArr[i]];
    }

    return egg;
  };

  return {
    createNameSpace: createNameSpace
  };
});
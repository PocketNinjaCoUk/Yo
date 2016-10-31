

describe('A Basic Script', function() {

  Yo.init({});
  Yo.add('hello', function() {
    return "World";
  });

  it('Should return "World"', function() {
    expect(Yo.modules.hello).toBe('World');
  });
});



describe('Simple Dependency Connections', function() {
  Yo.init({});
  Yo.add('script1', function() {
    return {
      getScriptName: function() {
        return 'Pocketninja';
      }
    };
  });

  Yo.add('script2', ['script1'], function(script1) {
    var getScriptName = function() {
      return 'Dr Menard';
    };
    var displayScript1Name = function() {
      return script1.getScriptName();
    };

    return {
      getScriptName: getScriptName,
      displayScript1Name: displayScript1Name
    };
  });

  Yo.add('script3', ['script1', 'script2'], function(script1, script2) {
    var displayScript1Name = function() {
      return script1.getScriptName();
    };

    var displayScript2Name = function() {
      return script2.getScriptName();
    };

    return {
      displayScript1Name: displayScript1Name,
      displayScript2Name: displayScript2Name
    };
  });



  it('Should return "Pocketninja" from dependency', function() {
    expect(Yo.modules.script2.displayScript1Name()).toBe('Pocketninja');
  });

  it('Should return "Dr Menard" when script 2 is called by script3', function() {
    expect(Yo.modules.script3.displayScript2Name()).toBe('Dr Menard');
  });

  it('Should return "Pocketninja" when script 1 is called by script3', function() {
    expect(Yo.modules.script3.displayScript1Name()).toBe('Pocketninja');
  });
});



describe('Dependencies first', function() {

  Yo.init({});

  Yo.add('script6', ['script4', 'script5'], function(script4, script5) {
    var displayScript4Name = function() {
      return script4.getScriptName();
    };

    var displayScript5Name = function() {
      return script5.getScriptName();
    };

    return {
      displayScript4Name: displayScript4Name,
      displayScript5Name: displayScript5Name
    };
  });

  Yo.add('script5', ['script4'], function(script4) {
    var getScriptName = function() {
      return 'Dr Menard';
    };
    var displayScript4Name = function() {
      return script4.getScriptName();
    };

    return {
      getScriptName: getScriptName,
      displayScript4Name: displayScript4Name
    };
  });

  Yo.add('script4', function() {
    return {
      getScriptName: function() {
        return 'Pocketninja';
      }
    };
  });



  it('Should return "Pocketninja" from dependency', function() {
    expect(Yo.modules.script5.displayScript4Name()).toBe('Pocketninja');
  });

  it('Should return "Dr Menard" when script 2 is called by script3', function() {
    expect(Yo.modules.script6.displayScript5Name()).toBe('Dr Menard');
  });

  it('Should return "Pocketninja" when script 1 is called by script3', function() {
    expect(Yo.modules.script6.displayScript4Name()).toBe('Pocketninja');
  });
});
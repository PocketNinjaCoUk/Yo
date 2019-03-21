

describe('A Basic Script', function() {
  beforeEach(function() {
    this.company = {};
    Yo.init({
      namespace: this.company
    });
  });


  it('Should return "World"', function() {
    Yo.add('hello', function() {
      return "World";
    });

    expect(this.company.modules.hello).toBe('World');
  });
});


describe('Uses a global Dependency', function() {
  beforeEach(function() {
    this.company = {};

    Yo.init({
      namespace: this.company,
      globalDependencies: {
        globalScript: 'globalScript'
      }
    });
  });



  it('Should return "World"', function () {
    Yo.add('hello', function () {
      return "World";
    });
  
    Yo.add('globalScript');

    expect(this.company.modules.hello).toBe('World');
  });


  
  it('Should return "Hello World" from global Script', function () {
    Yo.add('hello', function (dep) {
      return dep.globalScript;
    });
  
    Yo.add('globalScript', function () {
      return 'Hello World';
    });

    expect(this.company.modules.hello).toBe('Hello World');
  });
});
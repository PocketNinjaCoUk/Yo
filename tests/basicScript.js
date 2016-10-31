

describe('makeBasicScript', function() {

  Yo.init({});
  Yo.add('hello', function() {
    return "Hello!";
  });

  it('Should return "Hello!"', function() {
    expect(Yo.modules.hello).toBe('Hello!');
  });
});
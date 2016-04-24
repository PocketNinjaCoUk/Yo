Yo.directive({
  target: 'directive-test',
  options: {
    test: 'title text',
    id: 100
  },
  fullPass: true,
  args: ['DirectiveTest', function() {
    var hello = function() {
      console.log('Hello from me');
    };

    var DirectiveTest = function() {
      
    };

    console.log('Hello directive has loaded');

    return {
      DirectiveTest: DirectiveTest,
      hello: hello
    };
  }]
});
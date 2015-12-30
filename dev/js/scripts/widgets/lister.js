
Yo.add('Lister', ['something', 'different'], function(something, different) {
  console.log('Widget: Lister active');

  something.getMe();
  different.getMe();

  var output = function() {
    console.log('lister output');
  };

  return {
    output: output
  };
});
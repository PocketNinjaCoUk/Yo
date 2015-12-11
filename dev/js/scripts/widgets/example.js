
Yo.add('Lister', ['something', 'different'], function(something, different) {
  console.log('Lister active');

  //something.getMe();
  //different.getMe();

  var output = function() {
    console.log('lister output');
  };

  return {
    output: output
  };
});
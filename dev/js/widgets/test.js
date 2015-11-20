Yo.add('Test', ['egg'], function(egg) {
  console.log('test active');
  egg.output()

  var output = function() {
    console.log('output from test');
  };

  return {
    output: output
  }
});
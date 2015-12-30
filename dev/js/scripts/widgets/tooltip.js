Yo.add('Tooltip', ['test'], function(test) {
  console.log('Widget: Tooltip active');

  test.output(' from tooltip');

  var output = function() {
    console.log('output from tooltip');
  };

  return {
    output: output
  }
});
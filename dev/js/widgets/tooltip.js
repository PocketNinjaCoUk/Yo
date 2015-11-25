Yo.add('Tooltip', ['test'], function(test) {
  console.log('tooltip active');
  test.output();

  var output = function() {
    console.log('output from tooltip');
  };

  return {
    output: output
  }
});
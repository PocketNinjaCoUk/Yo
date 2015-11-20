Yo.add('Tooltip', [], function() {
  console.log('tooltip active');

  var output = function() {
    console.log('output from tooltip');
  };

  return {
    output: output
  }
});
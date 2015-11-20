Yo.add('Dropdown', [], function() {
  console.log('dropdown active');

  var output = function() {
    console.log('output from dropdown');
  };

  return {
    output: output
  }
});
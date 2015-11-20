Yo.add('Dropdown', ['test'], function(test) {
  console.log('dropdown active');
  test.output();
  console.log('dropdown num: ' + test.getNumber());
  //test.setNumber(1000);

  var output = function() {
    console.log('output from dropdown');
  };

  return {
    output: output
  }
});
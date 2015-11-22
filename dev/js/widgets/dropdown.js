Yo.add('Dropdown', ['test', 'utilities'], function(test, utils) {
  console.log('dropdown active');
  test.output();
  console.log('dropdown num: ' + test.getNumber());
  //test.setNumber(1000);
  console.log('UTILITIES func add10: ' + utils.add10(100));

  //console.log($('body').html());

  var output = function() {
    console.log('output from dropdown');
  };

  return {
    output: output
  }
});
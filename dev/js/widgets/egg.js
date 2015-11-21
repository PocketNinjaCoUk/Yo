Yo.add('Egg', ['test'], function(test) {
  console.log('egg active');
  test.output();
  console.log('egg num: ' + test.getNumber() + ' Now lets change it and see it called by other scripts, should be 1000');
  test.setNumber(1000);

  var output = function() {
    console.log('output from egg');
  };

  return {
    output: output
  }
});
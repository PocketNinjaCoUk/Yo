Yo.add('Egg', ['tooltip'], function(tooltip) {
  console.log('egg active');

  tooltip.output();
  /*test.output();
  console.log('egg num: ' + test.getNumber() + ' Now lets change it and see it called by other scripts, should be 1000');
  test.setNumber(1000);*/

  var output = function() {
    console.log('output from egg');
  };

  return {
    output: output
  }
});
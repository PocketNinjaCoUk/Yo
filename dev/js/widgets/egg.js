Yo.add('Egg', [], function() {
  console.log('egg active');

  var output = function() {
    console.log('output from egg');
  };

  return {
    output: output
  }
});
Yo.add('Utilities', function() {
  console.log('Utilities active');

  var
    add10 = function(num) {
      return num + 10;
    };

  return {
    add10: add10
  }
});
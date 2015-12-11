Yo.add('Test', ['utilities'], function() {

  console.log('test active');

  var
    number = 10,

    output = function() {
      console.log('output from test');
    },
    setNumber = function(num) {
      number = num;
    },
    getNumber = function() {
      return number;
    };

  return {
    output: output,
    setNumber: setNumber,
    getNumber: getNumber
  }
});
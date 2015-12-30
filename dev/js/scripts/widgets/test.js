Yo.add('Test', function() {

  console.log('Widget: Test active');

  var
    number = 10,

    output = function(str) {
      console.log('output from test' + str);
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

Yo.add('Something', function() {
  console.log('Something active');

  var getMe = function() {
    console.log('say HI from something');
  };

  return {
    getMe: getMe
  }
});
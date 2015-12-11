
Yo.add('Different', function() {
  console.log('Different active');

  var getMe = function() {
    console.log('say HI from different');
  };
  return {
    getMe: getMe
  }
});

Yo.add('Different', function() {
  console.log('Widget: Different active');

  var getMe = function() {
    console.log('say HI from different');
  };
  return {
    getMe: getMe
  }
});
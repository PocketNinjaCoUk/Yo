Yo.add('utils.device', function() {
  var scriptName = 'utils.device';
  var init = function(str) {
    console.log('Hello from utils.device, called by ' + str);
  };

  return {
    init: init
  };
});
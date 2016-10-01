Yo.add('widgets.popup', ['utils.device'], function(utilsDevice) {
  var scriptName = 'widgets.popup';
  var init = function(str) {
    console.log('Hello from utils.device, called by ' + str);
  };

  utilsDevice.init(scriptName);

  return {
    init: init
  };
});
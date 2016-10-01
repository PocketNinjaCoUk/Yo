Yo.add('upsell', ['widgets.popup'], function(widgetsPopup) {
  var scriptName = 'upsell';
  var init = function(str) {
    console.log('Hello from upsell, called by ' + str);
  };

  widgetsPopup.init(scriptName);

  init('MYSELF');

  return {
    init: init
  };
});
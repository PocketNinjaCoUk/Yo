Yo.add('cart.service', ['utils.gotopage'], function(utilsGoToPage) {
  var scriptName = 'cart.service';
  var init = function(str) {
    console.log('Hello from cart.service, called by ' + str);
  };

  utilsGoToPage.init(scriptName);

  return {
    init: init
  };
});
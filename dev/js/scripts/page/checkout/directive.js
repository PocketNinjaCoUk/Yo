Yo.add('page.checkout.directive', ['cart.additem', 'upsell'], function(cartAddItem, upsell) {
  var scriptName = 'page.checkout.directive';
  var init = function(str) {
    console.log('Hello from utils.device, called by ' + str);
  };

  cartAddItem.init(scriptName);
  upsell.init(scriptName);

  return {
    init: init
  };
});
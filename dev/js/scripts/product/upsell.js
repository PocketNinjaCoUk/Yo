Yo.add('product.upsell', ['cart.additem'], function(cartAddItem) {
  var scriptName = 'product.upsell';
  var init = function(str) {
    console.log('Hello from utils.device, called by ' + str);
  };

  cartAddItem.init(scriptName);

  return {
    init: init
  };
});
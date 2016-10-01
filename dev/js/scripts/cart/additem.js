Yo.add('cart.addItem', ['cart.service'], function(cartService) {
  var scriptName = 'cart.addItem';
  var init = function(str) {
    console.log('Hello from cart.additem, called by ' + str);
  };

  cartService.init(scriptName);

  return {
    init: init
  };
});
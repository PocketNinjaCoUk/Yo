Yo.add('crosssell', ['utils.gotopage', 'cart.additem'], function(utilsGotoPage, cartAddItem) {
  var scriptName = 'crosssell';
  var init = function(str) {
    console.log('Hello from crosssell, called by ' + str);
  };

  init('MYSELF');
  utilsGotoPage.init(scriptName);
  cartAddItem.init(scriptName);

  return {
    init: init
  };
});
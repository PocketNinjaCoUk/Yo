
// TEST EMPTY WIDGETS


//#= require scripts/utils/device.js
//#= require scripts/utils/gotopage.js

//#= require scripts/product/upsell.js
//#= require scripts/upsell.js
//#= require scripts/crosssell.js
//#= require scripts/widgets/popup.js

//#= require scripts/cart/addItem.js
//#= require scripts/cart/service.js

//#= require scripts/page/checkout/directive.js

var arseDependencies = [
  { pony: 'pony' },
  { egg: 'egg' }
];

Yo.add('arse', ['pony', 'egg'], function (dep) {
  console.log(dep);
  // console.log(dep.pony);
  // console.log(dep.egg);
});


Yo.add('pony', function () {
  return 'Hello World';
});

Yo.add('egg', function () {
  return {
    egg: 'egg'
  }
});

Yo.add('pants', function () {
  return {
    pants: 'pants'
  }
});

Yo.add('jQuery');
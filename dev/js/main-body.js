
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

var arseDependencies = {
  pony: 'pony',
  shitHeadEggFarmer: 'component.egg'
};

Yo.add('arse', arseDependencies, function (dep) {
  console.log('arse dependencies: ', dep);
  // console.log(dep.pony);
  // console.log(dep.egg);
});

Yo.add('duncan', false, function () {
  
})


Yo.add('pony', { fartEggMan: 'component.egg' }, function (dep) {

  console.log('pony dependencies: ', dep);

  function helloWorld () {
    console.log('Hello World');
  }

  return {
    helloWorld: helloWorld
  };
});

Yo.add('component.egg', function () {

  function sayEgg () {
    console.log('pants');
  }

  return {
    sayEgg: sayEgg
  }
});



// Global Functions

Yo.add('pants', function () {

  function sayPants () {
    console.log('pants');
  }

  return {
    something: sayPants
  }
});

Yo.add('jQuery');


var arseDependencies = {
  pony: 'pony',
  shitHeadEggFarmer: 'component.egg'
};

Yo.add('arse', arseDependencies, function (dep) {
  console.log('arse dependencies: ', dep);
  console.log(dep.pony);
  console.log(dep.shitHeadEggFarmer);
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

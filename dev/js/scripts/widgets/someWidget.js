Yo.add('widgets.SomeWidget', ['utils.all'], function(utilsAll) {
  console.log(utilsAll.hello('Duncan'));
  console.log(utilsAll.chicken('potatoes'));

  return {
  }
});
Yo.add('widgets.SomeWidget', ['utils.all'], function(utils) {

  console.log(utils.hello('Duncan'));
  console.log(utils.chicken('potatoes'));

  return {
  }
});
Yowie.add('TestScript', function() {

  console.log('coeeeeee');

  return {
    egg: function() {
      console.log('egg from Test Script');
    }
  };
});



Yowie.directive('What', function() {

  console.log('You what');

  return {
    egg: function() {
      console.log('egg from What');
    }
  };
});
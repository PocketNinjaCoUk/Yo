Yo.add('utils.gotopage', function() {

  var init = function(str) {
    console.log('Hello from utils.gotopage, called by ' + str);
  };

  return {
    init: init
  };
});
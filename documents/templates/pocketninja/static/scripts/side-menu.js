
$(function() {

  var $body = $('body');
  var $sideNav = $('#sideNav');

  var setFromPageSelect = function(str) {
    $sideNav.find('.side-menu-item').removeClass('active');
    $sideNav.find('.' + str).addClass('active');
  };

  if ($body.data('select')) {
    setFromPageSelect($body.data('select'));
  }
});
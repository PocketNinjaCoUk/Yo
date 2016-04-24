
Yo.add('Something', function() {

  console.log('Widget: Something active');

  var primaryOptions = {
    test: 'check it out',
    id: 1
  };

  var Something = function(options) {
    options = $.extend(primaryOptions, options);
    console.log('Widget: Something', options);
  };

  var getMe = function() {
    console.log('say HI from something');
  };

  var maker = function(element, _data) {
    $(element || 'body').find('[data-something]').each(function() {
      Something($.extend(
        $(this).data('something'),
        _data)
      );
    });
  };

  $.fn.Something = function(_data) {
    Something($.extend(
      $(this).data('something'),
      _data)
    );

    return this;
  };

  $.fn.Something_maker = function(_data) {
    maker(this, _data);
    return this;
  };

  return {
    Something: Something,
    getMe: getMe,
    maker: maker
  }
});
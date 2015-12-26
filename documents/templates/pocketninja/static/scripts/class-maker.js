

// data-class-maker
$(function() {
  $('[data-class-maker]').each(function() {
    var $this = $(this);
    var data = $.extend({
      text: '',
      generateSelectedData: false
    }, $this.data('class-maker'));

    var dataStr = data.text.toLowerCase()
      .replace(/\b(module|event|namespace):/g, '')
      .replace(/\//g, '-')
      .replace(/ /g, '').toLowerCase();
    $this.addClass(dataStr);

    if(data.generateSelectedData) {
      $this.attr('data-select', dataStr);
    }
  });
});

$(function() {

  var $subNav = $('#subNav');
  var $articleSubSections = $('.article-sub-section');

  if($articleSubSections.length > 0) {
    $('#main').css('width', '60%');
    $subNav.addClass('displayed');
    $('#sideNav').css('width', '25%');

    $articleSubSections.each(function() {
      var $this = $(this);
      var $sectionTitle = $this.find('.subsection-title');
      var text = $sectionTitle.html();
      var $subMenuSection = $('<div class="sub-menu-section"></div>').appendTo($subNav);

      $sectionTitle.prepend('<a id="' + text.toLowerCase() + '"></a>');

      var $subItem = $('<div class="sub-menu-header"></div>');

      $subItem
        .on('click', function() {
          $('.sub-menu-header, .sub-menu-item').removeClass('active');
          $(this).addClass('active');
          $('html, body')
            .animate({
              scrollTop: $this.offset().top
            }, 'slow')
        });

      $subMenuSection.append($subItem.append(text));

      $this.find('h4.name').each(function() {
        var $this = $(this);
        var $subMenuItem = $('<div class="sub-menu-item"></div>').append($this.html());

        $subMenuItem.find('.type-signature, .signature').remove();
        $this.prepend('<a id="' + $subMenuItem.html().toLowerCase() + '"></a>');
        $subMenuSection.append($subMenuItem);

        $subMenuItem
          .on('click', function() {
            $('.sub-menu-header, .sub-menu-item').removeClass('active');
            $(this).addClass('active');
            $('html, body')
              .animate({
                scrollTop: $this.offset().top
              }, 'slow')
          });
      });
    });
  }
});
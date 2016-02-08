
Yo.add('page.Home', function() {
  console.log('Widget: Home page is started');

  if($('#pageHome').length > 0) {
    console.log('Home page is now active');
    $('#output').html('Widget: Home page is active');
  }

  return {
  }
});

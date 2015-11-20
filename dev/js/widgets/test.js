Yo.add('Test', ['egg', 'tooltip', 'dropdown'], function(egg, tooltip, dropdown) {
  console.log('test active');
  console.log(egg.output());
  console.log(tooltip.output());
  console.log(dropdown.output());
});
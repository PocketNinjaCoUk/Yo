/**
 * Dropdown widget module.
 *
 * @module Dropdown
 *
 * @param {object} test - module dependency
 * @param {object} utils - module dependency
 * @returns {object} public functions
 */
Yo.add('widgets.Dropdown', ['test', 'utilities'], function(test, utils) {
  console.log('Widget: Dropdown active');
  test.output(' from dropdown');

  /**
   * dropdown test function
   *
   * @function output
   */
  var output = function() {
    console.log('output from dropdown');
  };

  return {
    output: output
  }
});
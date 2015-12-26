/**
 * Dropdown widget module.
 *
 * @module Dropdown
 *
 * @param {object} test - module dependency
 * @param {object} utils - module dependency
 * @returns {object} public functions
 */
Yo.add('Dropdown', ['test', 'utilities'], function(test, utils) {
  //console.log('dropdown active');
  //test.output();
  //console.log('dropdown num: ' + test.getNumber());
  //test.setNumber(1000);
  //console.log('UTILITIES func add10: ' + utils.add10(100));

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
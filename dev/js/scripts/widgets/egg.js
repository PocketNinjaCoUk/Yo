/**
 * Represents a egg.
 *
 * @module Egg
 *
 * @param {string} test - The title of the book.
 * @returns {object} functions
 */
Yo.add('Egg', ['test', 'tooltip', 'dropdown'], function(test, tooltip, dropdown) {
  console.log('Widget: Egg active');
  test.output(' from egg');
  tooltip.output();
  dropdown.output();

  /**
   * Egg test output function
   *
   * @function output
   * @param {string} [str=""] - text to append to output sentence
   */
  var output = function(str) {
    str = str || '';
    console.log('output from egg ' + str);
  };

  /**
   * Egg layer
   *
   * @function lay
   * @param {number} [amount=0] - number of eggs to lay
   */
  var lay = function(amount) {
    amount = amount || 0;
    console.log('Chicken lays ' + amount + ' eggs.');
  };

  return {
    output: output,
    lay: lay
  }
});
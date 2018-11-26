/* @flow */
const path = require('path')

module.exports = function(
  ...pathComponents /*: Array<string> */
) /*: string */ {
  return path.resolve(__dirname, ...pathComponents)
}

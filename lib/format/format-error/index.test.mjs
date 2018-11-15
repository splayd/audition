/* @flow */
import { example } from '../../../'
import assert from 'assert'
import formatError from './'

example('printing errors', () => {
  const formattedError = formatError(new Error('Something Went Wrong'))

  assert(formattedError.includes('Error: Something Went Wrong'))
  assert(formattedError.includes('- lib/format/format-error/index.test.mjs:7'))

  assert(!formattedError.includes('internal'))
  assert(!formattedError.includes('node_modules'))
})

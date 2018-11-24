/* @flow */
import { example } from '../../..'
import assert from 'assert'
import formatResult from './'

example('formatting a passing test result', () => {
  assert.deepStrictEqual(
    formatResult({
      file: 'test.mjs',
      description: 'doing math',
      duration: 10
    }),
    ' PASS  test.mjs › doing math (10ms)'
  )
})

example('formatting a failing test result', () => {
  assert.deepStrictEqual(
    formatResult({
      file: 'test.mjs',
      description: 'doing math',
      error: 'Assertion Failed',
      duration: 10
    }),
    ' FAIL  test.mjs › doing math (10ms)\nAssertion Failed'
  )
})

example('formatting an unexpected exception', () => {
  assert.deepStrictEqual(
    formatResult({
      file: 'test.mjs',
      error: 'Assertion Failed'
    }),
    ' FAIL  test.mjs\nAssertion Failed'
  )
})

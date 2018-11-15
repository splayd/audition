/* @flow */
import { example } from '../'
import assert from 'assert'

example('failing an assertion', () => {
  assert(1 + 1 === 3)
})

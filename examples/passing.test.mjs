/* @flow */
import { example } from '../'
import assert from 'assert'

example('doing math', () => {
  assert(1 + 1 === 2)
})

example('doing more math', () => {
  assert(2 + 2 === 4)
})

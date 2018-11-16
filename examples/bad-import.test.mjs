/* @flow */
import { example } from '../'
import assert from 'assert'
/* $FlowFixMe */
import 'library-that-does-not-exist'

example('passing, but with a bad import', () => {
  assert(true)
})

/* @flow */
import test from 'ava'
import greeting from 'audition'

test('exporting "Hello World!"', t => {
  t.is(greeting, 'Hello World!')
})

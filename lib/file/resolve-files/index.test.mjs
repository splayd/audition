/* @flow */
import { example } from '../../../'
import assert from 'assert'
import resolveFiles from './'

example('resolving globs', async () => {
  const files = await resolveFiles(['examples/*.test.mjs'])
  assert.deepStrictEqual(files, [
    'examples/bad-import.test.mjs',
    'examples/failing.test.mjs',
    'examples/passing.test.mjs'
  ])
})

example('resolving multiple patterns', async () => {
  const files = await resolveFiles([
    'examples/passing.test.mjs',
    'examples/failing.test.mjs'
  ])
  assert.deepStrictEqual(files, [
    'examples/passing.test.mjs',
    'examples/failing.test.mjs'
  ])
})

example('excluding node_modules', async () => {
  const files = await resolveFiles([
    'node_modules/sewn/**/*.test.mjs',
  ])
  assert.deepStrictEqual(files, [])
})

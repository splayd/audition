/* @flow */
import { example } from '../../../'
import assert from 'assert'
import runFiles from './'
import { pipe, toArray } from 'heliograph'

example('running test files', async () => {
  const results = await pipe(
    runFiles(['examples/passing.test.mjs']),
    toArray
  )
  assert.strictEqual(results[0].description, 'doing math')
  assert.strictEqual(results[1].description, 'doing more math')
})

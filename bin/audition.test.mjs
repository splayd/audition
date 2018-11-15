/* @flow */
import { example } from '../'
import assert from 'assert'
import * as childProcess from 'child_process'
import { promisify } from 'util'

const exec = promisify(childProcess.exec)

example('executing test cases', async () => {
  try {
    await exec('node --experimental-modules --experimental-worker --no-warnings bin/audition.mjs examples/failing.test.mjs')
    throw new Error('Expected failure')
  } catch (error) {
    assert(error.code === 1)
    assert(error.stdout.includes('FAIL examples/failing.test.mjs failing an assertion'))
  }
})

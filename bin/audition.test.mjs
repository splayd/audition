/* @flow */
import { example } from '../'
import assert from 'assert'
import * as childProcess from 'child_process'
import { promisify } from 'util'

const exec = promisify(childProcess.exec)

example('showing test failures', async () => {
  try {
    await exec('bin/audition examples/failing.test.mjs')
    throw new Error('Expected failure')
  } catch (error) {
    assert(error.code === 1)
    assert(error.stdout.includes('FAIL examples/failing.test.mjs failing an assertion'))
  }
})

example('showing errors outside of test cases', async () => {
  let passed = false
  try {
    const { stdout } = await exec('bin/audition examples/bad-import.test.mjs')
    passed = true
  } catch (error) {
    assert(error.code === 1)
    assert(error.stdout.includes('FAIL examples/bad-import.test.mjs\n'))
    assert(error.stdout.includes('Cannot find module'))
  }

  assert(!passed, 'examples/bad-import.test.mjs should fail')
})

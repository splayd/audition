/* @flow */
import { example } from '../'
import assert from 'assert'
import * as childProcess from 'child_process'
import { promisify } from 'util'

const exec = promisify(childProcess.exec)

example('running test cases', async () => {
  const { stdout } = await exec('bin/audition examples/passing.test.mjs')
  assert(stdout.includes('PASS examples/passing.test.mjs doing math'))
  assert(stdout.includes('PASS examples/passing.test.mjs doing more math'))
})

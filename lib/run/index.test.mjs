/* @flow */
import { example } from '../..'
import assert from 'assert'
import run from './'

example('running test cases', async () => {
  const results = run('examples/passing.test.mjs')

  await assertResult(results, {
    file: 'examples/passing.test.mjs',
    description: 'doing math'
  })
  await assertResult(results, {
    file: 'examples/passing.test.mjs',
    description: 'doing more math'
  })
})

example('handling test failures', async () => {
  const results = run('examples/failing.test.mjs')

  await assertResult(results, {
    file: 'examples/failing.test.mjs',
    description: 'failing an assertion',
    error: 'AssertionError'
  })
})

example('handling errors outside of test cases', async () => {
  const results = run('examples/bad-import.test.mjs')

  await assertResult(results, {
    file: 'examples/bad-import.test.mjs',
    error: 'Cannot find module'
  })
})

async function assertResult(iterator, expected) {
  const { value: result } = await iterator.next()

  if (!result) {
    throw new Error('No result emitted')
  }

  if (expected.file) {
    assert.strictEqual(result.file, expected.file)
  }
  if (expected.description) {
    /* $FlowFixMe */
    assert.strictEqual(result.description, expected.description)
  }
  if (expected.error) {
    /* $FlowFixMe */
    assert(result.error.includes(expected.error))
  }
}

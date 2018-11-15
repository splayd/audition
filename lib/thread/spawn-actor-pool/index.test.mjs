/* @flow */
import { example } from '../../../'
import assert from 'assert'
import * as path from 'path'
import basePath from '../../../base-path.js'
import spawnActorPool from './'

example('coordinating multiple actors', async () => {
  const sumPath = path.join(
    basePath,
    'lib/thread/spawn-actor-pool/fixtures/sum.mjs'
  )
  const pool = spawnActorPool(sumPath)

  pool.send({ id: 1, action: 'add', data: [3, 3] })
  pool.send({ id: 2, action: 'subtract', data: [2, 1] })
  pool.send({ id: 3, action: 'multiply', data: [3, 3] })
  pool.send({ id: 4, action: 'divide', data: [4, 2] })
  pool.send({ id: 5, action: 'add', data: [4, 2] })
  pool.send({ id: 6, action: 'subtract', data: [4, 2] })
  pool.send({ id: 7, action: 'multiply', data: [4, 2] })
  pool.send({ id: 8, action: 'divide', data: [5, 2] })
  pool.send({ id: 9, action: 'add', data: [5, 2] })
  pool.end()

  for await (const { id, action, data } of pool) {
    assert.strictEqual(action, 'result')
    if (id === 1) assert.strictEqual(data, 6)
    if (id === 2) assert.strictEqual(data, 1)
    if (id === 3) assert.strictEqual(data, 9)
    if (id === 4) assert.strictEqual(data, 2)
    if (id === 5) assert.strictEqual(data, 6)
    if (id === 6) assert.strictEqual(data, 2)
    if (id === 7) assert.strictEqual(data, 8)
    if (id === 8) assert.strictEqual(data, 2.5)
    if (id === 9) assert.strictEqual(data, 7)
  }
})

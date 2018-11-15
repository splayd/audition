/* @flow */
import { example } from '../../../'
import assert from 'assert'
import * as path from 'path'
import basePath from '../../../base-path.js'
import spawnActor from './'

example('delegating work to an actor', async () => {
  const sumPath = path.join(basePath, 'lib/thread/spawn-actor/fixtures/sum.mjs')
  const actor = spawnActor /*:: <{}, {}> */ (sumPath)

  actor.send({ action: 'add', data: [3, 3] })
  assert.deepStrictEqual(
    (await actor.next()).value,
    { action: 'result', data: 6 }
  )

  actor.send({ action: 'subtract', data: [3, 2] })
  assert.deepStrictEqual(
    (await actor.next()).value,
    { action: 'result', data: 1 }
  )

  actor.send({ action: 'multiply', data: [3, 2] })
  assert.deepStrictEqual(
    (await actor.next()).value,
    { action: 'result', data: 6 }
  )

  actor.send({ action: 'divide', data: [6, 2] })
  assert.deepStrictEqual(
    (await actor.next()).value,
    { action: 'result', data: 3 }
  )

  actor.end()
  assert.deepStrictEqual(await actor.next(), { done: true })
})

/* @flow */
/*:: import type { Result } from '../' */
import { spawnThreadPool } from 'sewn'
import resolvePath from './resolve-path.js'

export default function(
  files /*: Array<string> */
) /*: AsyncIterator<Result> */ {
  const threadPool = spawnThreadPool(resolvePath('worker.mjs'))

  for (const file of files) {
    threadPool.send({ file })
  }
  threadPool.end()

  return threadPool
}

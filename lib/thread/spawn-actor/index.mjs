/* @flow */
/* $FlowFixMe */
import { Worker } from 'worker_threads'
import { fromEventEmitter } from 'heliograph'
import * as path from 'path'
import basePath from '../../../base-path.js'

export default function /*:: <Incoming, Outgoing> */(
  modulePath /*: string */
) /*: AsyncIterator<Outgoing> & {
  send: (Incoming) => void,
  end: () => void
} */ {
  const workerPath = path.join(basePath, 'lib', 'thread', 'spawn-actor', 'worker.mjs')
  const worker = new Worker(workerPath, { workerData: modulePath })
  const iterator = fromEventEmitter(worker, 'message', 'exit', 'error')

  return {
    ...iterator,
    send: message => worker.postMessage({ type: 'MESSAGE', message }),
    end: () => worker.postMessage({ type: 'END' })
  }
}

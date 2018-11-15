/* @flow */
import { promisify } from 'util'
import * as os from 'os'
import { spawnActor } from '../'
import { fromQueue, fork, merge, zip, pipe, map, filter, observe, consume } from 'heliograph'

const sleep = promisify(setTimeout)

export default function(
  modulePath /*: string */
) /*: AsyncIterator<any> & {
  send: any => void,
  end: () => void
} */ {
  const actors = os.cpus().map(() => spawnActor(modulePath))

  const idleActors = fromQueue()
  actors.forEach(actor => idleActors.push(actor))

  const outgoingIterators = actors.map(actor => pipe(
    actor,
    observe(message => {
      if (message.action === 'ready') {
        idleActors.push(actor)
      }
    }),
    filter(message => message.action !== 'ready')
  ))

  const incoming = fromQueue()
  pipe(
    zip(incoming, idleActors),
    consume(([message, actor]) => actor.send(message))
  ).then(() => actors.forEach(actor => actor.end()))

  return {
    ...merge(...outgoingIterators),
    send: message => incoming.push(message),
    end: () => incoming.end()
  }
}

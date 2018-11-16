/* @flow */
import * as path from 'path'
import tasks from '../../kinds/tasks.mjs'
import { formatError } from '../format'

export default async function(
  parent /*: AsyncIterator<{ file: string }> & {
    send: ({ action: string }) => void
  } */
) {
  for await (const { file } of parent) {
    try {
      /* $FlowFixMe */
      await import(path.resolve(file))

      for (const task of tasks) {
        parent.send({ action: 'result', file, ...(await task.definition()) })
      }
    } catch (error) {
      parent.send({ action: 'result', file, error: formatError(error) })
    }

    parent.send({ action: 'ready' })
  }
}

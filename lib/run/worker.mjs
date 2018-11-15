/* @flow */
import * as path from 'path'
import tasks from '../../kinds/tasks.mjs'

export default async function(
  parent /*: AsyncIterator<{ file: string }> & {
    send: ({ action: string }) => void
  } */
) {
  for await (const { file } of parent) {
    /* $FlowFixMe */
    await import(path.resolve(file))

    for (const task of tasks) {
      parent.send({ file, ...(await task.definition()) })
    }

    parent.send({ action: 'ready' })
  }
}

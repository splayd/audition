/* @flow */
import * as path from 'path'
import { formatError } from '../format'
import tasks from '../../kinds/tasks.mjs'

/*::
type Result =
  | { file: string, description: string, duration: number }
  | { file: string, description: string, error: string, duration: number }
  | { file: string, error: string }
*/

export default async function*(
  file /*: string */
) /*: AsyncIterator<Result> */ {
  try {
    /* $FlowFixMe */
    await import(path.resolve(file))

    for (const task of tasks.splice(0)) {
      yield { file, ...(await task.definition()) }
    }
  } catch (error) {
    yield { file, error: formatError(error) }
  }
}

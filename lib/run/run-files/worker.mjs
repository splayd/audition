/* @flow */
import { runFile } from '../'

export default async function(
  parent /*: AsyncIterator<{ file: string }> & {
    send: (mixed) => void
  } */
) {
  for await (const { file } of parent) {
    for await (const result of runFile(file)) {
      parent.send(result)
    }
  }
}

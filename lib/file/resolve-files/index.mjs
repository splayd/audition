/* @flow */
import { promisify } from 'util'
import globCb from 'glob'

const glob = promisify(globCb)

export default async function(
  patterns /*: Array<string> */
) /*: Promise<Array<string>> */ {
  const files = []
  for (const pattern of patterns) {
    files.push(...(await glob(pattern)))
  }
  return files
}

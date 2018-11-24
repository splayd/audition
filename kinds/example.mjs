/* @flow */
import tasks from './tasks.mjs'
import { formatError } from '../lib/format'

export default async function(
  description /* : string */,
  definition /*: () => void | Promise<void> */
) {
  tasks.push({
    description,
    definition: async () => {
      const startTime = process.hrtime.bigint()

      try {
        await definition()
        return {
          description,
          duration: msSince(startTime)
        }
      } catch (error) {
        return {
          description,
          error: formatError(error),
          duration: msSince(startTime)
        }
      }
    }
  })
}

function msSince(hrtime) {
  /* $FlowFixMe */
  return Number((process.hrtime.bigint() - hrtime) / BigInt(1e6))
}

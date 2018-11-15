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
      try {
        await definition()
        return { description }
      } catch (error) {
        return {
          description,
          error: formatError(error)
        }
      }
    }
  })
}

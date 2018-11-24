/* @flow */
import chalk from 'chalk'

/*::
type Result =
  | { file: string, description: string, error?: empty, duration: number }
  | { file: string, description: string, error: string, duration: number }
  | { file: string, description?: empty, error: string, duration?: empty }
*/

const pass = chalk.bgGreen.whiteBright.bold(' PASS ')
const fail = chalk.bgRed.whiteBright.bold(' FAIL ')

export default function(result /*: Result */) /*: string */ {
  if (result.error) {
    if (result.description) {
      return `${fail} ${result.file} › ${result.description}${formatDuration(result)}\n${result.error}`
    } else {
      return `${fail} ${result.file}\n${result.error}`
    }
  } else if (
    result.description &&
    Number.isInteger(result.duration)
  ) {
    return `${pass} ${result.file} › ${result.description}${formatDuration(result)}`
  } else {
    throw new Error('Unexpected arguments')
  }
}

function formatDuration(result) {
  if (!Number.isInteger(result.duration)) {
    return ''
  }

  return chalk.gray(` (${result.duration}ms)`)
}

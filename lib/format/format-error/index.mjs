/* @flow */
import * as path from 'path'
import * as url from 'url'
import PrettyError from 'pretty-error'

const pe = new PrettyError()

pe.skip(traceLine => {
  return (
    traceLine.packageName !== '[current]' ||
    !traceLine.path ||
    traceLine.path.startsWith('internal')
  )
})

// $FlowFixMe
pe.filter(traceLine => {
  traceLine.file = path.relative(path.resolve(), url.parse(traceLine.path).path || '')
})

pe.withoutColors()
pe.appendStyle({
  'pretty-error > trace > item': {
    marginBottom: 0
  },
  'pretty-error > trace > item > footer > addr': {
    display: 'none'
  }
})

export default function(error /*: Error */) /*: string */ {
  return pe.render(error)
}

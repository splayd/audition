/* @flow */

export default async function(
  parent /*: AsyncIterator<{ action: string, data: [number, number] }> & {
    send: ({ action: string, data: number }) => void
  } */
) {
  for await (const { action, data: [x, y] } of parent) {
    if (action === 'add') {
      parent.send({ action: 'result', data: x + y })
    } else if (action === 'subtract') {
      parent.send({ action: 'result', data: x - y })
    } else if (action === 'multiply') {
      parent.send({ action: 'result', data: x * y })
    } else if (action === 'divide') {
      parent.send({ action: 'result', data: x / y })
    }
  }
}

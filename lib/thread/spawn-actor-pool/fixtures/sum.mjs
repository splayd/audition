/* @flow */

export default async function(
  parent /*: AsyncIterator<{ id: number, action: string, data: [number, number] }> & {
    send: ({ action: string }) => void
  } */
) {
  for await (const { id, action, data: [x, y] } of parent) {
    if (action === 'add') {
      parent.send({ id, action: 'result', data: x + y })
    } else if (action === 'subtract') {
      parent.send({ id, action: 'result', data: x - y })
    } else if (action === 'multiply') {
      parent.send({ id, action: 'result', data: x * y })
    } else if (action === 'divide') {
      parent.send({ id, action: 'result', data: x / y })
    }
    parent.send({ action: 'ready' })
  }
}

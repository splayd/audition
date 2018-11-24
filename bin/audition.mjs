#!/usr/bin/env node
/* @flow */
import * as path from 'path'
import { promisify } from 'util'
import { spawnThreadPool } from 'sewn'
import globCb from 'glob'
import basePath from '../base-path.js'
import { formatResult } from '../lib/format'

const glob = promisify(globCb)

async function run() {
  const testFiles = []
  for (const testFileGlob of process.argv.slice(2)) {
    testFiles.push(...(await glob(testFileGlob)))
  }

  const threadPool = spawnThreadPool(path.join(basePath, 'lib', 'run', 'worker.mjs'))

  for (const file of testFiles) {
    threadPool.send({ file })
  }
  threadPool.end()

  let failed = false
  for await (const result of threadPool) {
    failed = failed || Boolean(result.error)
    console.log(formatResult(result))
  }

  if (failed) {
    process.exit(1)
  }
}

run()

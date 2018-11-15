#!/usr/bin/env node
/* @flow */
import * as path from 'path'
import { promisify } from 'util'
import { spawnActorPool } from '../lib/thread'
import basePath from '../base-path.js'
import globCb from 'glob'

const glob = promisify(globCb)

async function run() {
  const testFiles = []
  for (const testFileGlob of process.argv.slice(2)) {
    testFiles.push(...(await glob(testFileGlob)))
  }

  const pool = spawnActorPool(path.join(basePath, 'lib', 'run', 'worker.mjs'))
  for (const file of testFiles) {
    pool.send({ file })
  }
  pool.end()

  let failed = false
  for await (const { file, description, error } of pool) {
    if (error) {
      failed = true
      console.log(`FAIL ${file} ${description}\n${error}`)
    } else {
      console.log(`PASS ${file} ${description}`)
    }
  }

  if (failed) {
    process.exit(1)
  }
}

run()

#!/usr/bin/env node
/* @flow */
import { promisify } from 'util'
import globCb from 'glob'
import { formatResult } from '../lib/format'
import { runFiles } from '../lib/run'

const glob = promisify(globCb)

async function run() {
  const testFiles = []
  for (const testFileGlob of process.argv.slice(2)) {
    testFiles.push(...(await glob(testFileGlob)))
  }

  const results = runFiles(testFiles)

  let failed = false
  for await (const result of results) {
    failed = failed || Boolean(result.error)
    console.log(formatResult(result))
  }

  if (failed) {
    process.exit(1)
  }
}

run()

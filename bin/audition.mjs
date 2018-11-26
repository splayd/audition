#!/usr/bin/env node
/* @flow */
import { promisify } from 'util'
import globCb from 'glob'
import { formatResult } from '../lib/format'
import { runFiles } from '../lib/run'
import { resolveFiles } from '../lib/file'

async function run() {
  const testFiles = await resolveFiles(process.argv.slice(2))
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

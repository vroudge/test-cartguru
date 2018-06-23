'use strict'

const { inputParser } = require('./src/lib/inputParser')
const { findVictoryConditions } = require('./src/game')
const { logger, getFinalOutput } = require('./src/lib/logger')

// TODO: case of no possible victory whatsoever is not spec'd
// TODO: entry with CLI args, without commander or some other lib it's way too much of a hassle

// Entry point is in IIFE since we use async/await
;(async () => {

  try {
    const argvLocation = process.argv[2] ? process.argv[2].replace('--location=', '') : undefined
    console.log(`Running with ${__dirname}${argvLocation || '/input'}`)

    const { towerRange, bots } = await inputParser(`${__dirname}${argvLocation || '/input'}`)
    findVictoryConditions({ towerRange, bots })

    // get output from the logger
    const report = getFinalOutput()
    const allReportStrings = report.slice(Math.max(report.length - Object.keys(bots).length - 2, 1))

    //print the output
    allReportStrings.forEach(({ color, text }) => {
      logger(color, text, true)
    })
  } catch (e) {
    console.error(e)
  }
})()

process.on('unhandledRejection', (data, promise) => {
  console.error(data, promise)
})

'use strict'

const { inputParser } = require('./src/lib/inputParser')
const { findVictoryConditions } = require('./src/game')
const logger = require('./src/lib/logger')

// TODO: case of no possible victory whatsoever?
// TODO: entry with CLI args

// Entry point is in IIFE since we use async/await
;(async () => {
  try {
    const { towerRange, bots } = await inputParser(`${__dirname}/input`)
    findVictoryConditions({ towerRange, bots })
  } catch (e) {
    logger('red', e)
  }
})()

process.on('unhandledRejection', (data, promise) => {
  console.error(data, promise)
})

const _cloneDeep = require('lodash.clonedeep')

const logger = require('./lib/logger')
const { inputParser } = require('./lib/inputParser')

  // TODO: case of no possible victory whatsoever?
  // TODO: entry with CLI args

;(async () => {
  try {
    const { towerRange, bots } = await inputParser(`${__dirname}/../input`)

    // we could recurse instead of looping
    // but readability would be severly impaired
    // lets loop instead

    let gameVictory = false
    // use retries as increments for the tower range, for the case we're looking for victory
    let tries = 0

    while (!gameVictory) {
      // run a deep copy of bots or we might get issues with referencing ;)
      gameVictory = run({ towerRange: towerRange + tries, bots: _cloneDeep(bots) })
      ++tries
    }

  } catch (e) {
    logger('red', e)
  }
})()

const run = ({ towerRange, bots }) => {
  logger('white', `Tower range is ${towerRange}m`)

  // init flag for gameloop
  let init = false
  // current game turn
  let currentTurn = 1

  // get bot ids so we can work properly with the dictionnary
  let botIds = Object.keys(bots)
  let leftEnemies = undefined

  while (!init || leftEnemies) {
    // the game has started
    init = true
    // are there any alive enemies left
    leftEnemies = areThereAliveBots(bots, botIds)

    //if no emies left left, victory!
    if (!leftEnemies) {
      logger('green', `You win in ${currentTurn - 1} turn${currentTurn > 1 ? 's' : ''}`)
      return true
    }

    // can we fire, and on whom
    const { canFire, targetBotId } = towerFireOnEnemy(towerRange, bots, botIds)

    // we can fire, one of the bots gets killed
    if (canFire) {
      const botKilled = bots[targetBotId]
      botKilled.isAlive = false
      logger('magenta', `Turn ${currentTurn}: Kill ${botKilled.name} at ${botKilled.currentDistance}m`)
    }

    // for all alive bots move them for their speed value
    // and check if they reach the tower
    const { updatedBotList, defeat } = moveBots(bots, botIds)

    if (defeat) {
      logger('red', `You lose in ${currentTurn} turn${currentTurn > 1 ? 's' : ''}`)
      return false
    }

    botList = { ...updatedBotList }

    ++currentTurn
  }

}

// is there at least one alive bot
const areThereAliveBots = (bots, botIds) => botIds.reduce((acc, elem) => bots[elem].isAlive || acc, false)

// if tower can fire
// it fires on the closest enemy
const towerFireOnEnemy = (towerRange, bots, botIds) => {
  let canFire = false
  let targetBotId = undefined

  for (let botId of botIds) {
    const currentBot = bots[botId]
    // check that we can fire on the bot
    const botIsInRange = currentBot.currentDistance <= towerRange && currentBot.currentDistance !== 0
    // bot is in range, bot is alive, and we either have no target
    // or the previous target is further from the tower than the target we're checking now
    if (botIsInRange
      && currentBot.isAlive
      && (!targetBotId || bots[targetBotId].currentDistance > currentBot.currentDistance)) {
      targetBotId = botId
      canFire = true
    }
  }

  return { canFire, targetBotId }
}

// move bots of their speed
const moveBots = (bots, botIds) => {
  let defeat = false

  for (let botId of botIds) {
    const currentBot = bots[botId]

    if (currentBot.isAlive) {
      // move bot
      currentBot.currentDistance -= currentBot.speed
      // distance should not be negative, we're still in a normal universe!
      currentBot.currentDistance = currentBot.currentDistance <= 0 ? 0 : currentBot.currentDistance
      // a bot has reached the tower
      if (currentBot.currentDistance <= 0) {
        defeat = true
        break
      }
    }
  }

  return { updatedBotList: bots, defeat }
}

process.on('unhandledRejection', (data, promise) => {
  console.error(data, promise)
})

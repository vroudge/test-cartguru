const inputParser = require('./lib/inputParser')
const logger = require('./lib/logger')

;(async () => {
  try {
    const parsedBotInput = await inputParser(`${__dirname}/../input`)
    // freeze parsed input so we dont accidentally mutate it further down the line
    run(Object.freeze(parsedBotInput))

  } catch (e) {
    console.error(e)
  }
})()

const run = ({ towerRange, bots }) => {
  logger('green', `Tower range is ${towerRange}m`)

  let gameRunning = false
  // current game turn
  let currentTurn = 1
  // get bot ids so we can work properly with the dictionnary
  let botIds = Object.keys(bots)
  // create a new botlist
  let botList = { ...bots }
  let leftEnemies = undefined

  while (!gameRunning || leftEnemies) {
    gameRunning = true
    leftEnemies = areThereAliveBots(bots, botIds)
    if (!leftEnemies) {
      logger('green', `You win in ${currentTurn-1} turns`)
      break
    }
    const { canFire, targetBotId } = towerFireOnEnemy(towerRange, botList, botIds)

    if (canFire) {
      const botKilled = botList[targetBotId]
      botKilled.isAlive = false
      logger('red', `Turn ${currentTurn}: Kill ${botKilled.name} at ${botKilled.currentDistance}m`)
    }

    // for all alive bots move them for their speed value
    const newBotList = moveBots(botList, botIds)
    botList = { ...newBotList }

    if (currentTurn > 10) {
      break
    }
    currentTurn++
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
    const botIsInRange = currentBot.currentDistance <= towerRange
    // bot is in range, bot is alive, and we either have no target
    // or the previous selected target is further from the tower than the target we're checking
    if (botIsInRange && currentBot.isAlive && (!targetBotId || bots[targetBotId].currentDistance > currentBot.currentDistance)) {
      targetBotId = botId
      canFire = true
    }
  }

  return { canFire, targetBotId }
}

// move bots of their speed
const moveBots = (bots, botIds) => {
  for (let botId of botIds) {
    const currentBot = bots[botId]

    if (currentBot.isAlive) {
      currentBot.currentDistance -= currentBot.speed
    }
  }

  return bots
}

process.on('unhandledRejection', (data, promise) => {
  console.error(data, promise)
})

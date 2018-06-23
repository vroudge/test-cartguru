const should = require('should')
const {
  run,
  areThereAliveBots,
  towerFireOnEnemy,
  moveBots,
} = require('../src')

describe('Game', () => {
  xdescribe('run()', () => {

  })

  xdescribe('areThereAliveBots()', () => {
    it('should return true if there are alive bots', function () {

    })

    it('should return false if no bots are alive', function () {

    })
  })

  xdescribe('towerFireOnEnemy()', () => {
    describe('When a bot is in range', () => {
      it('should return a target ID and whether it can fire', function () {

      })
    })

    describe('When multiple bots are in range', () => {
      it('should return a target ID and whether it can fire', function () {

      })
    })

    describe('When no bot is in range', () => {
      it('should return no target ID and whether it can fire', function () {

      })
    })

  })

  xdescribe('moveBots()', () => {
    describe('When multiple bots are alive', () => {
      it('should move bots toward the tower', function () {

      })

      describe('if a bot reaches the tower', () => {
        it('should return the botList', function () {

        })

        it('should declare defeat as true', function () {

        })
      })

      describe('if no bot reaches the tower', () => {
        it('should return the botList', function () {

        })

        it('should declare defeat as false', function () {

        })
      })
    })

    describe('When a bot is alive', () => {
      it('should move bot toward the tower', function () {

      })

      describe('if the bot reaches the tower', () => {
        it('should return the botList', function () {

        })

        it('should declare defeat as true', function () {

        })
      })

      describe('if the bot does not reach the tower', () => {
        it('should return the botList', function () {

        })

        it('should declare defeat as false', function () {

        })
      })
    })

    describe('When no bot is alive', () => {
      it('should not move bots toward the tower', function () {

      })

      it('should should not declare defeat as true', function () {

      })
    })
  })
})

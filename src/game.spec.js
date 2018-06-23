const should = require('should')
const {
  initGame,
  areThereAliveBots,
  towerFireOnEnemy,
  moveBots,
} = require('./game')

describe('Game', () => {
  xdescribe('run()', () => {

  })

  describe('areThereAliveBots()', () => {
    const aliveBots = {
      1: {
        isAlive: true
      },
      2: {
        isAlive: true
      },
      3: {
        isAlive: true
      },
    }
    const mixedAliveBots = {
      1: {
        isAlive: false
      },
      2: {
        isAlive: true
      },
      3: {
        isAlive: false
      }
    }
    const allDeadBots = {
      1: {
        isAlive: false
      },
      2: {
        isAlive: false
      },
      3: {
        isAlive: false
      }
    }

    it('should return true if there are alive bots', function () {
      const bots = areThereAliveBots(aliveBots, [1, 2, 3])
      const bots2 = areThereAliveBots(mixedAliveBots, [1, 2, 3])

      bots.should.be.true()
      bots2.should.be.true()
    })

    it('should return false if no bots are alive', function () {
      const bots = areThereAliveBots(allDeadBots, [1, 2, 3])

      bots.should.be.false()
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

const should = require('should')
const {
  findVictoryConditions,
  initGame,
  areThereAliveBots,
  towerFireOnEnemy,
  moveBots,
} = require('./game')

describe('Game', () => {
  describe('findVictoryConditions()', () => {
    describe('Game can be won', () => {
      context('On first run', () => {
        const gameParams = {
          towerRange: 20,
          bots: {
            '1': { name: 'Valentin', currentDistance: 5, speed: 1, isAlive: true },
            '2': { name: 'John', currentDistance: 10, speed: 1, isAlive: true }
          }
        }
        const { gameVictory, tries } = findVictoryConditions(gameParams)

        it('should be victorious', function () {
          gameVictory.should.be.true()
          tries.should.be.eql(1)
        })
      })
      context('On a later run', () => {
        const gameParams = {
          towerRange: 5,
          bots: {
            '1': { name: 'Valentin', currentDistance: 30, speed: 10, isAlive: true },
            '2': { name: 'John', currentDistance: 20, speed: 10, isAlive: true }
          }
        }
        const { gameVictory, tries } = findVictoryConditions(gameParams)

        it('should be victorious', function () {
          gameVictory.should.be.true()
          tries.should.be.eql(6)
        })
      })
    })

    xdescribe('Game cannot be won (NO DETAILS IN ASSIGNMENT ON THIS CASE)', () => {
      xit('should lower bots speed until it finds winnable conditions', function () {

      })
      xit('should raise bots starting spot until it finds winnable conditions', function () {

      })
    })
  })

  describe('initGame()', () => {
    describe('Game will end up in victory', () => {
      const gameParams = {
        towerRange: 10,
        bots: {
          1: { name: 'Valentin', currentDistance: 20, speed: 1, isAlive: true },
          2: { name: 'John', currentDistance: 20, speed: 1, isAlive: true }
        }
      }
      const { victory, bots, currentTurn } = initGame(gameParams)

      it('should declare a victory and show all bots dead with a turn count', function () {
        victory.should.be.true()
        currentTurn.should.be.eql(13)
        bots.should.be.eql({
          '1': { name: 'Valentin', currentDistance: 10, speed: 1, isAlive: false },
          '2': { name: 'John', currentDistance: 9, speed: 1, isAlive: false }
        })
      })
    })

    describe('Game will end up in defeat', () => {
      const gameParams = {
        towerRange: 5,
        bots: {
          1: { name: 'Valentin', currentDistance: 30, speed: 10, isAlive: true },
          2: { name: 'John', currentDistance: 20, speed: 10, isAlive: true }
        }
      }
      const { victory, bots, currentTurn } = initGame(gameParams)

      it('should declare a victory and show all bots dead with a turn count', function () {
        victory.should.be.false()
        currentTurn.should.be.eql(2)
        bots.should.be.eql({
          '1': { name: 'Valentin', currentDistance: 10, speed: 10, isAlive: true },
          '2': { name: 'John', currentDistance: 0, speed: 10, isAlive: true }
        })
      })
    })
  })

  describe('areThereAliveBots()', () => {
    const botIds = [1, 2, 3]
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
      const bots = areThereAliveBots(aliveBots, botIds)
      const bots2 = areThereAliveBots(mixedAliveBots, botIds)

      bots.should.be.true()
      bots2.should.be.true()
    })

    it('should return false if no bots are alive', function () {
      const bots = areThereAliveBots(allDeadBots, botIds)

      bots.should.be.false()
    })
  })

  describe('towerFireOnEnemy()', () => {
    let bots = undefined
    let botIds = undefined

    beforeEach(() => {
      bots = {
        1: {
          name: 'foo',
          currentDistance: 40,
          isAlive: true,
          speed: 1,
        },
        2: {
          name: 'bar',
          currentDistance: 20,
          isAlive: true,
          speed: 2,
        }
      }
      botIds = Object.keys(bots)
    })

    context('When a bot is in range', () => {
      it('should return a target ID and whether it can fire', function () {
        const { canFire, targetBotId } = towerFireOnEnemy(50, { '2': { ...bots['2'] } }, ['2'])
        canFire.should.be.true()
        targetBotId.should.be.eql('2')
      })
    })

    context('When multiple bots are in range', () => {
      it(`should return the closest bot's target ID and whether it can fire`, function () {
        const { canFire, targetBotId } = towerFireOnEnemy(50, bots, botIds)
        canFire.should.be.true()
        targetBotId.should.be.eql('2')
      })
    })

    context('When no bot is in range', () => {
      it('should return no target ID and whether it can fire', function () {
        const { canFire, targetBotId } = towerFireOnEnemy(1, bots, botIds)
        canFire.should.be.false()
        should(targetBotId).be.undefined()
      })
    })

  })

  describe('moveBots()', () => {

    describe('When multiple bots are alive', () => {
      let bots = undefined
      let botIds = undefined

      beforeEach(() => {
        bots = {
          1: {
            name: 'foo',
            currentDistance: 10,
            isAlive: true,
            speed: 1,
          },
          2: {
            name: 'bar',
            currentDistance: 20,
            isAlive: true,
            speed: 2,
          }
        }
        botIds = Object.keys(bots)
      })

      it('should move bots toward the tower according to their speed', function () {
        const firstMove = moveBots(bots, botIds)
        firstMove.updatedBotList.should.eql(
          {
            '1': { name: 'foo', currentDistance: 9, isAlive: true, speed: 1 },
            '2':
              { name: 'bar', currentDistance: 18, isAlive: true, speed: 2 }
          },
        )
        const secondMove = moveBots(bots, botIds)
        secondMove.updatedBotList.should.eql(
          {
            '1': {
              name: 'foo', currentDistance: 8, isAlive: true, speed: 1
            },
            '2':
              { name: 'bar', currentDistance: 16, isAlive: true, speed: 2 }
          },
        )
      })

      context('if a bot reaches the tower', () => {

        it('should return the botList and declare defeat', function () {
          bots[1].speed = bots[1].currentDistance // instant-move to tower
          const { defeat, updatedBotList } = moveBots(bots, botIds)

          updatedBotList.should.be.eql(
            {
              '1':
                { name: 'foo', currentDistance: 0, isAlive: true, speed: 10 },
              '2':
                { name: 'bar', currentDistance: 20, isAlive: true, speed: 2 }
            },
          )
          defeat.should.be.true()
        })
      })

      context('if no bot reaches the tower and not declare defeat', () => {
        it('should return the botList', function () {
          bots[1].speed = 0 // instant-move to tower
          bots[2].speed = 0 // instant-move to tower
          const firstMove = moveBots(bots, botIds)
          const secondMove = moveBots(firstMove.updatedBotList, botIds)
          const thirdMove = moveBots(secondMove.updatedBotList, botIds)
          const { updatedBotList, defeat } = moveBots(thirdMove.updatedBotList, botIds)

          updatedBotList.should.be.eql(
            {
              '1':
                { name: 'foo', currentDistance: 10, isAlive: true, speed: 0 },
              '2':
                { name: 'bar', currentDistance: 20, isAlive: true, speed: 0 }
            },
          )
          defeat.should.be.false()
        })
      })
    })

    describe('When a bot is alive', () => {
      let bots = undefined
      let botIds = undefined

      beforeEach(() => {
        bots = {
          1: {
            name: 'foo',
            currentDistance: 10,
            isAlive: true,
            speed: 1,
          },
          2: {
            name: 'bar',
            currentDistance: 20,
            isAlive: false,
            speed: 2,
          }
        }
        botIds = Object.keys(bots)
      })

      it('should move bots toward the tower according to their speed', function () {
        const firstMove = moveBots(bots, botIds)
        firstMove.updatedBotList.should.eql(
          {
            '1': { name: 'foo', currentDistance: 9, isAlive: true, speed: 1 },
            '2':
              { name: 'bar', currentDistance: 20, isAlive: false, speed: 2 }
          },
        )
        const secondMove = moveBots(bots, botIds)
        secondMove.updatedBotList.should.eql(
          {
            '1': {
              name: 'foo', currentDistance: 8, isAlive: true, speed: 1
            },
            '2':
              { name: 'bar', currentDistance: 20, isAlive: false, speed: 2 }
          },
        )
      })

      context('if a bot reaches the tower', () => {

        it('should return the botList and declare defeat', function () {
          bots[1].speed = bots[1].currentDistance // instant-move to tower
          const { defeat, updatedBotList } = moveBots(bots, botIds)

          updatedBotList.should.be.eql(
            {
              '1':
                { name: 'foo', currentDistance: 0, isAlive: true, speed: 10 },
              '2':
                { name: 'bar', currentDistance: 20, isAlive: false, speed: 2 }
            },
          )
          defeat.should.be.true()
        })
      })

      context('if no bot reaches the tower and not declare defeat', () => {
        it('should return the botList', function () {
          bots[1].speed = 0 // instant-move to tower
          bots[2].speed = 0 // instant-move to tower
          const firstMove = moveBots(bots, botIds)
          const secondMove = moveBots(firstMove.updatedBotList, botIds)
          const thirdMove = moveBots(secondMove.updatedBotList, botIds)
          const { updatedBotList, defeat } = moveBots(thirdMove.updatedBotList, botIds)

          updatedBotList.should.be.eql(
            {
              '1':
                { name: 'foo', currentDistance: 10, isAlive: true, speed: 0 },
              '2':
                { name: 'bar', currentDistance: 20, isAlive: false, speed: 0 }
            },
          )
          defeat.should.be.false()
        })
      })
    })

    describe('When no bot is alive', () => {
      let bots = undefined
      let botIds = undefined

      beforeEach(() => {
        bots = {
          1: {
            name: 'foo',
            currentDistance: 10,
            isAlive: false,
            speed: 1,
          },
          2: {
            name: 'bar',
            currentDistance: 20,
            isAlive: false,
            speed: 2,
          }
        }
        botIds = Object.keys(bots)
      })

      it('should not move bots toward the tower and declare defeat', function () {
        const { updatedBotList, defeat } = moveBots(bots, botIds)
        updatedBotList.should.eql(
          {
            '1': { name: 'foo', currentDistance: 10, isAlive: false, speed: 1 },
            '2':
              { name: 'bar', currentDistance: 20, isAlive: false, speed: 2 }
          },
        )
        defeat.should.be.false()
      })
    })
  })
})

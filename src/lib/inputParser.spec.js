const should = require('should')
const {
  validateTowerRangeFormat,
  validatebotExpectedFormat,
  meterStringToInteger,
  createBotFromArrayOfParameters,
  inputParser
} = require('./inputParser')

describe('inputParser', () => {

  describe('validateTowerRangeFormat()', () => {
    it('should match a properly formatted tower range format', () => {
      const format = validateTowerRangeFormat('10m')
      const format2 = validateTowerRangeFormat('1290m')

      format.should.eql('10m')
      format2.should.eql('1290m')
    })
    it('should not match an invalid formatted tower range format', () => {
      const invalidTowerRangeFormat = 'INVALID_TOWER_RANGE_FORMAT'

      should(() => validateTowerRangeFormat('m10m')).throw(Error, { message: invalidTowerRangeFormat })
      should(() => validateTowerRangeFormat('10z')).throw(Error, { message: invalidTowerRangeFormat })
      should(() => validateTowerRangeFormat('123asd10z')).throw(Error, { message: invalidTowerRangeFormat })
      should(() => validateTowerRangeFormat('asd123')).throw(Error, { message: invalidTowerRangeFormat })
      should(() => validateTowerRangeFormat('asd123asd')).throw(Error, { message: invalidTowerRangeFormat })
    })
  })

  describe('validatebotExpectedFormat()', () => {
    it('should match a properly formatted bot line format', () => {
      const format = validatebotExpectedFormat('MonBoRobo 10m 20m')
      const format2 = validatebotExpectedFormat('testBot 1000m 200m')
      const format3 = validatebotExpectedFormat('goldorak 1m 2m')

      format.should.eql('MonBoRobo 10m 20m')
      format2.should.eql('testBot 1000m 200m')
      format3.should.eql('goldorak 1m 2m')
    })
    it('should not match an invalid formatted tower range format', () => {
      const invalidBotFormat = 'INVALID_BOT_FORMAT'

      should(() => validatebotExpectedFormat('10m 20m')).throw(Error, { message: invalidBotFormat })
      should(() => validatebotExpectedFormat('MonBoRobo 10m ')).throw(Error, { message: invalidBotFormat })
      should(() => validatebotExpectedFormat('  MonBoRobo 10 10')).throw(Error, { message: invalidBotFormat })
      should(() => validatebotExpectedFormat('MonBoRobo 10m 10   ')).throw(Error, { message: invalidBotFormat })
      should(() => validatebotExpectedFormat('   MonBoRobo 10 10m   ')).throw(Error, { message: invalidBotFormat })
    })
  })

  describe('meterStringToInteger()', () => {
    it('should convert a meter value to an integer value', () => {
      const integerFromString = meterStringToInteger('10m')
      const integerFromString2 = meterStringToInteger('1999m')

      integerFromString.should.eql(10)
      integerFromString2.should.eql(1999)
    })
  })

  describe('createBotFromArrayOfParameters()', () => {
    it('should create a literal bot object from an array', () => {
      const arrayOfParams = ['MonBoRobo', '10m', '10m']
      const bot = createBotFromArrayOfParameters(arrayOfParams)

      bot.should.eql({
        name: 'MonBoRobo',
        isAlive: true,
        initialDistance: 10,
        currentDistance: 10,
        speed: 10
      })
    })
  })

  describe('inputParser()', () => {
    const specInputsLocation = './src/lib/test'

    describe('Through file system', () => {

      it('should read an input file and return a bot dictionnary and a tower range in a flat object', async () => {
        const parsedData = await inputParser(`${specInputsLocation}/correct.input.spec`)
        parsedData.should.eql({
          towerRange: 1,
          bots:
            {
              '1':
                {
                  name: 'BotAqwe',
                  isAlive: true,
                  initialDistance: 10,
                  currentDistance: 10,
                  speed: 2
                },
              '2':
                {
                  name: 'BotB123',
                  isAlive: true,
                  initialDistance: 20,
                  currentDistance: 20,
                  speed: 5
                },
              '3':
                {
                  name: 'BotCasd',
                  isAlive: true,
                  initialDistance: 15,
                  currentDistance: 15,
                  speed: 1
                },
              '4':
                {
                  name: '123BotC123',
                  isAlive: true,
                  initialDistance: 1000,
                  currentDistance: 1000,
                  speed: 19
                }
            }
        })
      })

      it('should throw an error if location is wrong', async () => {
        const invalidTowerRangeFormat = { message: 'FILE_NOT_FOUND' }

        await inputParser('./foo/bar').should.be.rejectedWith(Error, invalidTowerRangeFormat)
      })

      it('should throw an error if input is empty', async () => {
        const emptyFileError = { message: 'EMPTY_FILE' }

        await inputParser(`${specInputsLocation}/incorrect.input.0.spec`).should.be.rejectedWith(Error, emptyFileError)
      })

      it('should throw an error if format is missing tower range', async () => {
        const invalidTowerRangeFormat = { message: 'INVALID_TOWER_RANGE_FORMAT' }

        await inputParser(`${specInputsLocation}/incorrect.input.1.spec`).should.be.rejectedWith(Error, invalidTowerRangeFormat)
      })

      it('should throw an error if format is missing bot list', async () => {
        const botlessFileError = { message: 'NO_BOTS_IN_INPUT_FILE' }

        await inputParser(`${specInputsLocation}/incorrect.input.2.spec`).should.be.rejectedWith(Error, botlessFileError)
      })

    })

    xdescribe('Through CLI', () => {
      xit('should read an input file and return a bot object and a tower range', () => {

      })
    })
  })
})

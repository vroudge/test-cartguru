const { readFile } = require('fs')
const { promisify } = require('util')
const _compact = require('lodash.compact')

const readFileAsync = promisify(readFile)

// Look for: a meter distance
const validateTowerRangeFormat = format => format && format.trim().match(/^([0-9]+m)\s?/gi)[0]

// Look for: a word, whitespace, a meter distance, whitespace, another meter distance
const validatebotExpectedFormat = format => format && format.trim().match(/([a-z0-9]+){1}\s([0-9]+m(\s)?){2}/gi)[0]

// Remove m from string and cast to integer
const meterStringToInteger = string => parseInt(string.replace(/m/, ''), 10)

const createBotFromArrayOfParameters = arrayOfParameters => {
  const initialDistance = meterStringToInteger(arrayOfParameters[1])
  return {
    name: arrayOfParameters[0],
    isAlive: true,
    initialDistance,
    currentDistance: initialDistance,
    speed: meterStringToInteger(arrayOfParameters[2])
  }
}

const inputParser = async (location = './input') => {
  let file
  const parsedData = {
    towerRange: 0,
    bots: []
  }

  // Falsey location provided
  if (!location) {
    throw new Error('NO_INPUT')
  }

  try {
    file = await readFileAsync(location, { encoding: 'utf8' })
  } catch (e) {
    // Couldn't read file because either location is wrong or encoding is screwed
    throw new Error('FILE_NOT_FOUND')
  }

  try {
    // Split text file using its new lines
    const lines = _compact(file.split('\n'))

    // first line is range of tower
    const towerRange = validateTowerRangeFormat(lines[0])
    parsedData.towerRange = meterStringToInteger(towerRange)

    parsedData.bots = lines.slice(1).reduce((acc, elem, index) => {
      // validate format and extract parameters
      const newBotRawData = validatebotExpectedFormat(elem)

      // split to get all the different parameters as array
      const botParams = newBotRawData.split(/\s/)
      // create bot if expected parameters are there with an unique id
      // (bots might have identical names)
      acc[index + 1] = createBotFromArrayOfParameters(botParams)
      return acc
    }, {})
    return parsedData
  } catch (e) {
    throw new Error('WRONG_INPUT')
  }
}

module.exports = inputParser

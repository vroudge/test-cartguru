// No chalk module, no problem

const colors = {
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
}

const output = []
const noop = () => {}

const getFinalOutput = () => {
  return output
}

const logger = (color = 'white', text = '', enforceLoggingToConsole) => {
  if (process.env.OUTPUT_MODE === 'stream' || enforceLoggingToConsole) {
    console.log(colors[color] || colors['white'], text)
  } else {
    output.push({ color, text })
  }
}

module.exports = {
  logger: process.env.NODE_ENV !== 'test' ? logger : noop,
  getFinalOutput
}


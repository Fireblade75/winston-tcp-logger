const winston = require('winston')
const TcpTransport = require('./tcplog')
const syslogLevels = require('./syslog-levels')

/**
 * Create a wiston logger that loggs over a tcp connection
 * 
 * Options:
 *  - host: the ip/hostname of the tcp server
 *  - port: the port of the tcp server
 *  - tcp: the minimum syslog level for the tcp transport
 *  - console: the minimum syslog level for the console tranpsort
 * 
 * If the tcp or console level is empty this transport will be disabled
 * By default the tcp transport tries to connect to localhost:3012
 * 
 * @param {object} options the configruation options
 * @returns {winston.Logger} a winston logger
 */
function createLogger(options) {
  const logger = winston.createLogger({
    levels: syslogLevels
  })

  const host = options.host || 'localhost'
  const port = options.port || 3012

  // TCP configuration
  if(options.console) {
    logger.add(
      new TcpTransport({
        host: host,
        port: port,
        level: options.tcp
      })
    )
  }

  // Console configuration
  if(options.console) {
    logger.add(
      new winston.transports.Console({
        level: options.console
      })
    )
  }

  return logger
}

module.exports = createLogger
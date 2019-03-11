const net = require('net')
const ip = require('ip')
const os = require('os')
const osName = require('os-name')
const Transport = require('winston-transport')

function getSystem() {
  return {
    ip: ip.address(),
    hostname: os.hostname,
    platform: os.platform,
    nosjs: process.version,
    os: {
      name: osName(),
      version: os.release()
    }
  }
}

module.exports = class TcpTransport extends Transport {
  constructor(opts) {
    super(opts)
    this.client = new net.Socket()
    this.client.connect(opts.port, opts.host)
  }

  log(info, callback) {
    this.client.write(
      `${JSON.stringify({
        message: info.message,
        level: info.level,
        enviroment: process.env.NODE_ENV,
        system: getSystem()
      })}\n`,
      () => callback()
    )
  }

  close() {
    this.client.end()
  }
}

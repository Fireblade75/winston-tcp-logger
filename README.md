# Winston TCP logger
This module was created to log to splunk by sending all the information using JSON.
It makes it easy to create a logger and log all data to both the console and a remote TCP server.

## Log levels
This logger supports the syslog log levels:
* emerg (emergency)
* alert
* crit (critical)
* err (error)
* warning
* notice
* info
* debug

## Creating the logger
When creating the 

```js
const { createLogger } = require('winston-tcp-logger')

const logger = createLogger({
    host: '192.168.2.10',
    port: 4020,
    console: debug,
    tcp: warning
})

logger.info('This is logged to the console')
logger.warning('This is logged to both the console and the tcp server')
logger.error({
  fileName: 'bundle.js'
  lineNumber: 44
  message: 'data.length is undefined'
  name: 'TypeError'
})
```


'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./narwhal-sdk.cjs.production.min.js')
} else {
  module.exports = require('./narwhal-sdk.cjs.development.js')
}

'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class TextMessageException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle () {}
}

module.exports = TextMessageException

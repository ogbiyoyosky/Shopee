'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ImageUploadException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle () {}
}

module.exports = ImageUploadException

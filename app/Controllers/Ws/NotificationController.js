'use strict'

class NotificationController {
  constructor ({ socket, request, auth }) {
    this.socket = socket
    this.request = request
    this.auth = auth

    console.log('A new subscription for room topic', socket.topic)
  }

  onMessage (message) {
    console.log('got message', message)
  }

  onClose () {
    console.log('Closing subscription for room topic', this.socket.topic)
  }
}

module.exports = NotificationController

const Ws = use('Ws')

function broadcast (id, type, data) {
  const channel = Ws.getChannel('notification:*')
  if (!channel) return

  const topic = channel.topic(`notification:${id}`)
  if (!topic) {
    console.error('Has no topic')
    return
  }

  // emit, broadcast, broadcastToAll
  topic.broadcast(`message`, {
    type,
    data
  });
}

module.exports = {
  broadcast
}

const Notification = use('App/Models/Notification')

async function sendNotification (to, message, notification_type_id, title) {
  const notification = new Notification()
  notification.title = title
  notification.message = message
  notification.notification_type_id = notification_type_id
  await notification.save()
  await notification.user_notifications().attach([to])
}

module.exports = {
    sendNotification
}

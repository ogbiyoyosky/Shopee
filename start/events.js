const Event = use('Event')
const Mail = use('Mail')
const Env = use('Env')
const twilioAccountSid = Env.get('TWILIOSID')
const twilioAuthToken = Env.get('TWILIOAUTHTOKEN')
const SmsClient = require('twilio')(twilioAccountSid, twilioAuthToken)
const sender = Env.get('SHORT_CODE')

Event.on('new::customer', async (mailDetails) => {
  await Mail.send(
    "emails.customer_registration_email", mailDetails, message => {
      message
        .to(mailDetails.user.email, mailDetails.profile.first_name + " " + mailDetails.profile.last_name)
        .from("support@timeshoppy.com", "Shopee")
        .subject("Shoppy Platform Registration Information")
    }
  )

})

Event.on('new::order', async (mailDetails) => {

  await Mail.send(
    "emails.order_confirmation", mailDetails, message => {
      message
        .to(mailDetails.user.email, mailDetails.user.first_name + " " + mailDetails.user.last_name)
        .from("support@timeshoppy.com", "Shopee")
        .subject("Order Confirmation")
    }
  )

})

Event.on('new::merchant', async (mailDetails) => {
  await Mail.send(
    "emails.merchant_registration_email", mailDetails, message => {
      message
        .to(mailDetails.user.email, mailDetails.profile.first_name + " " + mailDetails.profile.last_name)
        .from("support@timeshoppy.com", "Shopee")
        .subject("Shoppy Platform Registration Information")
    }
  )

})

Event.on('new::passwordReset', async (mailDetails) => {
  await Mail.send(
    "emails.reset_password", mailDetails, message => {
      message
        .to(mailDetails.user.email, mailDetails.profile.first_name + " " + mailDetails.profile.last_name)
        .from("support@timeshoppy.com", "Shopee")
        .subject("Shoppy Password Reset link")
    }
  )

})

Event.on('new::regtext', async (textDetails) => {
  try {
    console.log(textDetails.sms_recipient)
    await SmsClient.messages
      .create({
        body: `Hi there!, your verification code is ${textDetails.user.confirmation_token} `,
        from: `${sender}`,
        to: textDetails.sms_recipient
      })

  } catch (error) {
    console.log(error)

  }
})

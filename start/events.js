const Event = use('Event')
const Mail = use('Mail')

Event.on('new::customer', async (mailDetails) => {
  await Mail.send(
    "emails.customer_registration_email", mailDetails, message => {
      message
        .to(mailDetails.user.email, mailDetails.user.first_name + " " + mailDetails.user.last_name)
        .from("info@shoppy.com", "Shopee")
        .subject("Shoppy Platform Registration Information")
    }
  )
})

Event.on('new::merchant', async (mailDetails) => {
  await Mail.send(
    "emails.merchant_registration_email", mailDetails, message => {
      message
        .to(mailDetails.user.email, mailDetails.user.first_name + " " + mailDetails.user.last_name)
        .from("info@shoppy.com", "Shopee")
        .subject("Shoppy Platform Registration Information")
    }
  )
})

Event.on('new::passwordReset', async (mailDetails) => {
  await Mail.send(
    "emails.reset_password", mailDetails, message => {
      message
        .to(mailDetails.user.email, mailDetails.user.first_name + " " + mailDetails.user.last_name)
        .from("info@shoppy.com", "Shopee")
        .subject("Shoppy Password Reset link")
    }
  )
})
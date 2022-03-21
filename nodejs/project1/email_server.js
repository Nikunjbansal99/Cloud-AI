const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('<sendgrid api key>')

const msg = {
  to: '<recipient>', // Change to your recipient
  from: '<sender>', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

sgMail
  .send(msg)
  .then((response) => {
    console.log(response[0].statusCode)
    console.log(response[0].headers)
  })
  .catch((error) => {
    console.error(error)
  })

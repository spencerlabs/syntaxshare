import * as nodemailer from 'nodemailer'

interface Options {
  to: string | string[]
  subject: string
  text: string
  html: string
}

export async function sendEmail({ to, subject, text, html }: Options) {
  // create reusable transporter object using SendInBlue for SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'morgan@spencer.dev',
      pass: process.env.SEND_IN_BLUE_KEY,
    },
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Morgan from Syntax Snap" <morgan@spencer.dev>',
    to: Array.isArray(to) ? to : [to], // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  })

  return info
}

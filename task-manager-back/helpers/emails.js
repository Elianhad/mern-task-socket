import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {
  const { email, name, token } = datos
  console.log(datos)
  const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '9ff51fb27bbea3',
      pass: 'e32c469745b9f6'
    }
  })
  // información del email
  const info = await transport.sendMail({
    from: ' "IITASK - ADMINISTRADOR DE PROYECTOS" <cuentas@IITask.com>',
    to: email,
    subject: 'IITASK, confirma tu cuenta',
    text: 'Comprueba tu cuenta de IITASK',
    html: `
          <h2>Hola ${name}!!, comprueba tu cuenta en IITASK </h2>
          <p>Debes validar tu cuenta haciendo click en el siguiente enlace:</p>
          <a href="${process.env.FRONT_URL}/account/confirm-account/${token}">Verificar cuenta</a>
          <small>Si no creaste la cuenta, ignora el mensaje</small>
    `

  })
}

import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {
  const { email, name, token } = datos
  const transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
  })
  // información del email
  const info = await transport.sendMail({
    from: ' "IITASK - ADMINISTRADOR DE PROYECTOS" <cuentas@IITask.com>',
    to: email,
    subject: 'IITASK, confirma tu cuenta',
    text: 'Comprueba tu cuenta de IITASK',
    html: `
        <div style='width: 80%; padding: 1rem; margin-top: 2rem;' >
          <h2  style='margin: 2rem 0; color: rgb(12 74 110); '>Hola ${name}!!, comprueba tu cuenta en IITASK </h2>
          <p>Debes validar tu cuenta haciendo click en el siguiente enlace:</p>
          <a href="${process.env.FRONT_URL}/account/confirm-account/${token}">Verificar cuenta</a>
          <small>Si no creaste la cuenta, ignora el mensaje</small>
        </div>
    `

  })
}

export const emailForgotPass = async (datos) => {
  const { email, name, token } = datos
  const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
  })
  // información del email
  const info = await transport.sendMail({
    from: ' "IITASK - ADMINISTRADOR DE PROYECTOS" <cuentas@IITask.com>',
    to: email,
    subject: 'IITASK, restablecer contraseña',
    text: 'Comprueba tu cuenta de IITASK',
    html: `
        <div style='width: 80%; padding: 1rem; margin: 2rem auto;' >
          <h2 style='margin: 2rem 0; color: rgb(12 74 110); '>Hola ${name}!!, inicia tu proceso de cambio de contraseña en IITASK </h2>
          <p>Debes revalidar tu cuenta haciendo click en el siguiente enlace:</p>
          <a href="${process.env.FRONT_URL}/account/forgotten-password/${token}">Continuar con cambio de contraseña</a>
        </div>
    `

  })
}

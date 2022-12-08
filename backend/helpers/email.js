import nodemailer from "nodemailer";

export const emailRegistro = async ({ nombre, email, token }) => {

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transport.sendMail({
    from: '"PortafolioWeb - Adminsitrador de cuentas" <romera02rrs@gmail.com>',
    to: email,
    subject: 'PortafolioWeb - Confirma tu cuenta',
    text: 'Confirma tu cuenta de PortafolioWeb',
    html: `
      <h1>¡Bienvenido ${nombre}!</h1>
      <p>Confirma tu cuenta de portafolio web, haciendo click en el siguiente enlace</p>
      <a href="${process.env.FRONTEND_URL}/usuarios/confirmar/${token}">¡Comienza a disfrutar de tus ventajas cuanto antes, haz click aqui!</a>
      <p>Si no has creado una cuenta en <a href="${process.env.FRONTEND_URL}">${process.env.FRONTEND_URL}</a>, puedes ignorar este mensaje</p>
    `
  })
};

export const emailOlvidePassword = async ({ nombre, email, token }) => {

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transport.sendMail({
    from: '"PortafolioWeb - Recuperador de cuentas" <romera02rrs@gmail.com>',
    to: email,
    subject: 'PortafolioWeb - Recupera tu cuenta',
    text: 'Reestablece tu password de tu cuenta en PortafolioWeb',
    html: `
      <h1>¡Hola ${nombre}!</h1>
      <p>Reestablece la contraseña de tu cuenta en portafolioWeb, haciendo click en el siguiente enlace</p>
      <a href="${process.env.FRONTEND_URL}/usuarios/olvide-password/${token}">¡Reestablce tu contraseña haciendo click en el siguiente enlace!</a>
      <p>Si no has creado una cuenta en <a href="${process.env.FRONTEND_URL}">${process.env.FRONTEND_URL}</a>, puedes ignorar este mensaje</p>
    `
  })
};

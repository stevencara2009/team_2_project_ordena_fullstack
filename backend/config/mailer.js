import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.ETHEREAL_USER,
    pass: process.env.ETHEREAL_PASS,
  },
});

export const sendResetEmail = async ({ to, token }) => {

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  const info = await transporter.sendMail({
    from: '"Ordena" <no-reply@ordena.com>',
    to,
    subject: "Recuperación de contraseña",
    html: `
      <p>Recibimos una solicitud para restablecer tu contraseña.</p>
      <p>Haz clic en el siguiente enlace (válido por 1 hora):</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>Si no solicitaste esto, ignora este correo.</p>
    `,
  });

  // Esto es lo importante para pruebas: te da el link para "ver" el correo
  console.log("📧 Vista previa del correo:", nodemailer.getTestMessageUrl(info));
};
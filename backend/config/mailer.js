import nodemailer from "nodemailer";

let transporterPromise = null;

// Crea (una sola vez) una cuenta de prueba de Ethereal y el transporter
const getTransporter = () => {
  if (!transporterPromise) {
    transporterPromise = nodemailer.createTestAccount().then((testAccount) => {
      return nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    });
  }
  return transporterPromise;
};

export const sendResetEmail = async ({ to, token }) => {
  const transporter = await getTransporter();
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
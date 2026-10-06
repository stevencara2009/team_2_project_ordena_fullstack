import nodemailer from "nodemailer";

// Función para obtener/crear el transporter dinámicamente
const createTransporter = async () => {
  // Si tienes credenciales en el .env las usa, de lo contrario genera una cuenta de prueba al vuelo
  if (process.env.ETHEREAL_USER && process.env.ETHEREAL_PASS) {
    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: process.env.ETHEREAL_USER,
        pass: process.env.ETHEREAL_PASS,
      },
    });
  }

  // Genera cuenta de prueba temporal automáticamente si no hay en .env
  const testAccount = await nodemailer.createTestAccount();
  console.log("🛠️ Cuenta de prueba de Ethereal creada:");
  console.log(`  User: ${testAccount.user}`);
  console.log(`  Pass: ${testAccount.pass}`);

  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
};

export const sendResetEmail = async ({ to, token }) => {
  const transporter = await createTransporter();
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

  console.log("📧 Vista previa del correo:", nodemailer.getTestMessageUrl(info));
};
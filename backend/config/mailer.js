import nodemailer from "nodemailer";

export const sendResetEmail = async ({ to, token }) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  // 1. Intentar enviar vía Resend si la API Key existe
  if (process.env.RESEND_API_KEY) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Ordena <onboarding@resend.dev>",
          to: [to],
          subject: "Recuperación de contraseña",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2>Recuperación de Contraseña</h2>
              <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta en <strong>Ordena</strong>.</p>
              <p>Haz clic en el siguiente botón para continuar (enlace válido por 1 hora):</p>
              <p style="margin: 25px 0;">
                <a href="${resetUrl}" 
                   style="background-color: #2563eb; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                  Restablecer Contraseña
                </a>
              </p>
              <p style="font-size: 0.9em; color: #666;">Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
              <p style="font-size: 0.9em; color: #2563eb;">${resetUrl}</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="font-size: 0.8em; color: #999;">Si no solicitaste este cambio, puedes ignorar este correo de forma segura.</p>
            </div>
          `,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("❌ Resend API Error:", data);
        throw new Error(data.message || "Error al enviar desde Resend");
      }

      console.log("📧 Correo enviado con éxito vía Resend. ID:", data.id);
      return data;
    } catch (error) {
      console.warn("⚠️ Falló el envío vía Resend, intentando vía Ethereal...", error.message);
    }
  }

  // 2. ENTORNO DE DESARROLLO / LOCAL (Ethereal Fallback)
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Ordena" <no-reply@ordena.com>',
    to,
    subject: "Recuperación de contraseña (Local)",
    html: `
      <p>Recibimos una solicitud para restablecer tu contraseña.</p>
      <p>Haz clic en el siguiente enlace (válido por 1 hora):</p>
      <a href="${resetUrl}">${resetUrl}</a>
    `,
  });

  console.log(
    "📧 Vista previa del correo (Ethereal):",
    nodemailer.getTestMessageUrl(info),
  );

  return info;
};
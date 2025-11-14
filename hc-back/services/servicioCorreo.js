import nodemailer from 'nodemailer';

export async function enviarCorreoRecuperacion(recipient, token) {
  try {
    // Genera una cuenta de prueba en Ethereal
    const testAccount = await nodemailer.createTestAccount();

    // Configura el transporter con los datos de Ethereal
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true para 465
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const mailOptions = {
      from: '<noreply@healthcloud.com>',
      to: recipient,
      subject: 'Recuperación de contraseña',
      html: `
        <h1>Para recuperar tu contraseña, haz clic en el siguiente enlace:</h1>
        <a href="http://localhost:5173/cambiar?token=${token}">
        Recuperar contraseña
        </a>
        <h3>Si no solicitaste este cambio, ignora este correo.</h3>
    `,

    };

    // Envía el correo
    let info = await transporter.sendMail(mailOptions);
    console.log('Mensaje enviado: %s', info.messageId);
    console.log('Vista previa en Ethereal: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error en enviarCorreoRecuperacion:', error);
    throw error;
  }
}
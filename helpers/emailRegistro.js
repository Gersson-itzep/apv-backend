import nodemailer from 'nodemailer'

const emailRegistro = async (datos) =>{
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const {email,nombre,token} = datos;
      //enviar email
      const info = await transporter.sendMail({
        from: "APV - Administrador de Pacientes Veterinaria",
        to: email,
        subject: "Confirma tu cuenta en APV",
        text: "Confirma tu cuenta en APV",
        html:`
          <p>Hola:${nombre}, confirma tu cuenta en APV</p>
          <p>Tu cuenta ya esta listo para utilizar, solo debes de confirmarlo en
          en el siguiente enlace:
          <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar Cuenta</a></p>

          <p>Si no creaste una cuenta en APV ignora este correo</p>
        `
      });

      console.log("Correo enviado: %s",  info.messageId);

};

export default emailRegistro
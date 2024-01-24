import nodemailer from 'nodemailer'

const emailOlvidePassword = async (datos) =>{
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
        subject: "Reestablace tu password",
        text: "Reestablace tu password",
        html:`
          <p>Hola:${nombre}, has solicitado reestablecer tu password</p>

          <p>Sigue el siguiente enlace para generar una nueva password:
          <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer password</a></p>

          <p>Si no creaste una cuenta en APV ignora este correo</p>
        `
      });

      console.log("Correo enviado: %s",  info.messageId);

};

export default emailOlvidePassword
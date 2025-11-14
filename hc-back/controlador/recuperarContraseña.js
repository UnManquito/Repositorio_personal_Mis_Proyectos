import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { enviarCorreoRecuperacion } from '../services/servicioCorreo.js';
import User from '../modelo/autModelo.js'; // Asegúrate de importar tu modelo de usuario
// Supongamos que ya tienes un proceso para verificar que el usuario existe,
// etc. Aquí mostramos un ejemplo básico:
export async function recuperarContrasena(req, res) {
  try {
    // Extrae el correo del usuario que solicita la recuperación
    const { email } = req.body;

    // Aquí deberías validar que el usuario existe en la base de datos
    const userFound = await User.findOne({ email })
    if (!userFound)
        return res.status(400).json({
            message: ["El correo no está registrado"],
        })
    // Verifica si el usuario está activo
    if (!userFound.activo) {
        return res.status(403).json({ message: ["El usuario está desactivado o baneado"] })
        }
    // y generar un token, por ejemplo, con JWT:
    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });

    // Llama al servicio para enviar el correo de recuperación
    await enviarCorreoRecuperacion(email, token);

    res.json({ message: 'Correo de recuperación enviado.' });
  } catch (error) {
    console.error('Error en recuperarContrasena:', error);
    res.status(500).json({ message: 'Error al enviar correo de recuperación.' });
  }
}

export const cambiarContraseña = async (req, res) => {
  try {
    const { token, nuevaContraseña } = req.body;
    if (!token || !nuevaContraseña) {
      return res.status(400).json({ message: "Token y nueva contraseña son requeridos" });
    }

    // Verificar y decodificar el token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    } catch (err) {
      return res.status(400).json({ message: "Token inválido o expirado" });
    }
    // Extraer el email del token decodificado
    const { email } = decoded;

    // Buscar el usuario por email (o usar _id si lo incluiste)
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    // Validar que la nueva contraseña cumpla con los requisitos
    const isSamePassword = await bcrypt.compare(nuevaContraseña, userFound.password);
    if (isSamePassword) {
      return res.status(400).json({ message: "La nueva contraseña no puede ser igual a la anterior" });
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(nuevaContraseña, 10);

    // Actualizar la contraseña del usuario
    // Puedes actualizar usando findByIdAndUpdate, si tienes el _id, o directamente
    // modificando la propiedad y guardando:
    userFound.password = hashedPassword;
    const updatedUser = await userFound.save();

    res.json({
      message: "Contraseña actualizada exitosamente",
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
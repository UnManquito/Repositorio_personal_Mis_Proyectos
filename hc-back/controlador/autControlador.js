import User from "../modelo/autModelo.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";
import Documento from "../modelo/documentoModelo.js";
import mongoose from "mongoose";

{/* Para desactivar usuarios*/}
export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await User.find({
            role: { $ne: "administrador" }
        });
        res.json(usuarios);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message });
    }
}

{/* Para subir documentos */}

export const subirDocumento = async (req, res) => {
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);
    if (!req.file) {
        return res.status(400).json({ message: "No se ha subido ningún archivo" });
    }
    let tipo = "defecto";
    if (req.file.mimetype === "application/pdf") tipo = "pdf";
    else if (
        req.file.mimetype === "application/msword" ||
        req.file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) tipo = "word";
    else if (req.file.mimetype.startsWith("image/")) tipo = "imagen";
    console.log("nombre del archivo:", req.file.nombre)
    const nuevoDocumento = new Documento({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion || "",
        tipo,
        carpeta: req.body.carpeta,
        usuario: req.user.id,
        peso: req.file.size,
        archivo: req.file.filename
    });

    try {
        await nuevoDocumento.save();
        res.json({ message: "Archivo subido exitosamente", file: req.file });
    } catch (error) {
        console.error("Error al guardar el documento:", error);
        res.status(500).json({ message: error.message });
    }
}

export const DocumentosUsuario = async (req, res) => {
    try {
        const documentos = await Documento.find({ usuario: req.user.id })
        res.json(documentos)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const eliminarDocumento = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "ID no proporcionado" });

        const doc = await Documento.findByIdAndDelete(id);
        if (!doc) return res.status(404).json({ message: "Documento no encontrado" });

        res.json({ message: "Documento eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar documento:", error);
        res.status(500).json({ message: error.message });
    }
}

export const register = async (req, res) => {
    try {
        const{
            tipo,
            nombre,
            rut,
            email,
            telefono,
            direccion,
            sexo,
            fnacimiento,
            password,
            telefonoEmergencia,
            prevision,
            especialidad,
            establecimiento
        }= req.body;

        if (!["paciente", "medico","administrador"].includes(tipo)) {
            return res.status(400).json({ message: "Tipo de usuario inválido" });
        }

        const emailExist = await User.findOne({email});

        if (emailExist)
            return res.status(400).json({ 
                message: ["El correo electrónico ya está en uso"] 
            });
        
        const rutExist = await User.findOne({rut});

        if (rutExist)
            return res.status(400).json({ 
                message: ["El RUT ya está en uso"] 
            });
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            tipo,
            nombre,
            rut,
            email,
            telefono,
            direccion,
            sexo,
            fnacimiento,
            password: hashedPassword,
            role: tipo === "administrador" ? "administrador" : "cliente",
            telefonoEmergencia:["paciente","administrador"].includes(tipo) ? telefonoEmergencia : undefined,
            prevision:["paciente", "administrador" ].includes(tipo) ? prevision : undefined,
            especialidad: ["medico", "administrador" ].includes(tipo) ? especialidad : undefined,
            establecimiento:["medico", "administrador"].includes(tipo) ? establecimiento : undefined
        });

        const userSaved = await newUser.save();

        const token = await createAccessToken({
            id: userSaved._id,
            tipo: userSaved.tipo,
            role: userSaved.role
        });

        res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "strict",
        });

        res.json({
            message: "Usuario registrado exitosamente",
            user: {
                id: userSaved._id,
                nombre: userSaved.nombre,
                email: userSaved.email,
                rut: userSaved.rut,
                tipo: userSaved.tipo,
                role: userSaved.role,
            }
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
export const login = async (req, res) => {
    try {
        const { rut, password } = req.body;
        const userFound = await User.findOne({ rut });

        if (!userFound) 
            return res.status(400).json({ 
                message: ["El rut no está registrado"],
            });
        if (!userFound.activo) {
            return res.status(403).json({ message: ["El usuario está desactivado o baneado"] });
        }

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json({ 
                message: ["Contraseña incorrecta"],
            });
        }

        const token = await createAccessToken({
            id: userFound._id,
            nombre: userFound.nombre,
            tipo: userFound.tipo,
            role: userFound.role
        });

        res.cookie("token", token);

        res.json({
            message: "Inicio de sesión exitoso",
            user: {
                id: userFound._id,
                nombre: userFound.nombre,
                rut: userFound.rut,
                tipo: userFound.tipo,
                role: userFound.role,
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}
export const verifyToken = async (req, res) => {
    const {token} = req.cookies;
    if (!token) return res.status(401).json({ message: "No se ha proporcionado un token" });
    jwt.verify(token, TOKEN_SECRET,  async (error, user) => {
        if (error) return res.sendStatus(401);

        const userFound = await User.findById(user.id);
        if (!userFound) return res.sendStatus(401);

        res.json({
            id: userFound._id,
            nombre: userFound.nombre,
            email: userFound.email,
            rut: userFound.rut,
            tipo: userFound.tipo,
            role: userFound.role
        });
    });
        
};
export const logout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
    });
    return res.sendStatus(200);
};
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { tipo, role, password, ...updateData } = req.body;

        

        if (role && !["administrador", "cliente"].includes(role)) {
            return res.status(400).json({ message: "Rol inválido" });
        }

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "Usuario no encontrado" });

        res.json({message: "Usuario actualizado exitosamente", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ message: "Usuario no encontrado" });

        res.json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const desactivarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, { activo: false }, { new: true });
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        res.json({ message: "Usuario desactivado correctamente", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const activarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, { activo: true }, { new: true });
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        res.json({ message: "Usuario activado correctamente", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





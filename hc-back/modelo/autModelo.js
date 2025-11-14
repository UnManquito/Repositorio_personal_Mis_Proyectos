import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    tipo: {
        type: String,
        enum: ["paciente", "medico","administrador"],
        required: true,
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    rut : {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    telefono: {
        type: String,
        required: true,
        trim: true,
    },
    direccion: {
        type: String,
        required: true,
        trim: true,
    },
    sexo: {
        type: String,
        required: true,
        enum: ["masculino", "femenino"],
    },
    fnacimiento: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["cliente", "administrador"],
        default: "cliente",   
    },


    // Campos de solo pacientes
    telefonoEmergencia: String,
    prevision: String,
    // Campos de solo médicos
    especialidad: String,
    establecimiento: String,

    activo: {
        type: Boolean,
        default: true,
    },  
}, {
    timestamps: true,
});

export default mongoose.model("User", userSchema);
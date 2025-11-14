import { z } from 'zod';


export const registerSchema = z.object({
    tipo: z.enum(["paciente", "medico", "administrador"], {
        required_error: "Tipo de usuario es requerido",
        invalid_type_error: "Tipo de usuario debe ser uno de los siguientes: paciente, medico, administrador"
    }),
    
    nombre: z.string({
        required_error:"El nombre completo es requerido"
    }),
    rut: z.string({
        required_error: "El RUT es requerido",
    })
    .min(1,{
        message: "El RUT no puede estar vacío"
    }),
    email: z.string().email({
        required_error: "Por favor, ingrese un correo electrónico válido"
    }),
    telefono: z.string({
        required_error: "El número de teléfono es requerido"
    }),
    direccion: z.string({
        required_error: "La dirección es requerida"
    }),
    sexo: z.string({
        required_error: "El sexo es requerido"
    }),
    fnacimiento: z.string({
        required_error: "La fecha de nacimiento es requerida"
    }),
    password: z.string({
        required_error: "La contraseña es requerida"
    }).min(8, {
        message: "La contraseña debe tener al menos 8 caracteres"
    }),

    telefonoEmergencia: z.string().optional().nullable(),
    prevision: z.string().optional().nullable(),
    especialidad: z.string().optional().nullable(),
    establecimiento: z.string().optional().nullable()
}).superRefine((data, ctx) => {
    const { tipo } = data;

    if (tipo === "paciente" || tipo === "administrador") {
        if (!data.telefonoEmergencia) {
            ctx.addIssue({
                path: ["telefonoEmergencia"],
                code: z.ZodIssueCode.custom,
                message: "El teléfono de emergencia es requerido",
            });
        }
        if (!data.prevision) {
            ctx.addIssue({
                path: ["prevision"],
                code: z.ZodIssueCode.custom,
                message: "La previsión es requerida",
            });
        }
    }

    if (tipo === "medico" || tipo === "administrador") {
        if (!data.especialidad) {
            ctx.addIssue({
                path: ["especialidad"],
                code: z.ZodIssueCode.custom,
                message: "La especialidad es requerida",
            });
        }
        if (!data.establecimiento) {
            ctx.addIssue({
                path: ["establecimiento"],
                code: z.ZodIssueCode.custom,
                message: "El establecimiento es requerido",
            });
        }
    }
});

export const loginSchema = z.object({
    rut: z.string().min(1, {message: "El RUT es requerido"}),
    password: z.string().min(8, {message: "La contraseña debe tener al menos 8 caracteres"})
});

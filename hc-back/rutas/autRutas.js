import { Router } from "express";
import {register, login, verifyToken, logout, updateUser, deleteUser, desactivarUsuario, activarUsuario, getUsuarios} from "../controlador/autControlador.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { registerSchema, loginSchema } from "../schema/auth.Schema.js";
import upload from "../middlewares/SubirDocumentos.js"
import { subirDocumento, DocumentosUsuario, eliminarDocumento } from "../controlador/autControlador.js"
import { auth}  from "../middlewares/auth.middlewares.js"
import { soloAdmin } from "../middlewares/SoloAdmin.js";
import { recuperarContrasena, cambiarContraseña } from "../controlador/recuperarContraseña.js";

const router = Router();

router.get("/usuarios", auth, soloAdmin, getUsuarios);
router.post("/registro", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/verify", verifyToken);
router.post("/logout", verifyToken, logout);
router.put("/actualizar/:id", updateUser);
router.delete("/eliminar/:id", deleteUser);
router.put("/desactivar/:id", desactivarUsuario);
router.put("/activar/:id", activarUsuario);
router.post("/documento", upload.single("documento"), auth, subirDocumento)
router.get("/documento", auth, DocumentosUsuario)
router.delete("/documento/:id", auth, eliminarDocumento)
router.post("/recuperar-contrasena", recuperarContrasena)
router.put("/cambiar-contrasena", cambiarContraseña);

export default router;

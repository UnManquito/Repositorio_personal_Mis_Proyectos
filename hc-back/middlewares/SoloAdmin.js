export function soloAdmin(req, res, next) {
    if (req.user.role !== "administrador") {
        return res.status(403).json({ message: "Acceso denegado: Solo administradores pueden realizar esta acción." });
    }
    next();
}
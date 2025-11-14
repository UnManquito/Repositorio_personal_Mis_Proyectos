import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"

export function BarraDesplegable() {
    const [abierto, setAbierto] = useState(false)
    const { user } = useAuth()
    const { logout } = useAuth()
    const navigate = useNavigate()
    const handleLogout = async () => {
    await logout()
    navigate("/")
    }
    return (
    <div>
        <button onClick={() => setAbierto(true)} className="absolute right-2 top-6 p-2 z-30">
        <img src="/menu-abierto.png" alt="Menu" className="w-10" />
        </button>
        {abierto && (
        <div className="fixed inset-0 z-40 flex">
            {/* Fondo semitransparente (25%) */}
            <div className="flex-1 bg-black opacity-80" onClick={() => setAbierto(false)}></div>
            {/* Menú deslizante (75%) */}
        <div className="w-3/4 bg-white relative flex flex-col">
            <button onClick={() => setAbierto(false)} className="absolute top-4 right-4 z-50">
                <img src="cerrar.png" alt="cerrar menu" className="w-8" />
            </button>
            <div className="mt-4 flex flex-col justify-around pb-0 w-full h-full">
                <img src="/LogoHC.png" alt="Logo" className=" shadow w-4/5 max-w-72 max-h-1/4 h-3/5 self-center" />
                <ul className="flex flex-col gap-2 ">
                    <li>
                        <Link to="/inicio" className="text-2xl font-semibold flex items-center gap-7 text-black hover:bg-cyan-300 py-2 px-4">
                            <img src="/pagina-de-inicio.png" alt="Inicio" className="w-12" />
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link to="/perfil" className="text-2xl font-semibold flex items-center gap-7 text-black hover:bg-cyan-300 py-2 px-4">
                            <img src="/usuario.png" alt="Perfil" className="w-12" />
                            Perfil
                        </Link>
                    </li>
                    <li>
                        <Link to="/centros" className="text-2xl font-semibold flex items-center gap-7 text-black hover:bg-cyan-300 py-2 px-4">
                            <img src="/centro-medico.png" alt="Agendamiento" className="w-12" />
                            Agendamiento
                        </Link>
                    </li>
                    <li>
                        <Link to="/cita" className="text-2xl font-semibold flex items-center text-black gap-7 hover:bg-cyan-300 py-2 px-4">
                            <img src="/dia-mundial-de-la-salud.png" alt="Gestionar cita" className="w-12" />
                            Gestionar Cita
                        </Link>
                    </li>
                    <li>
                        <Link to="/cita" className="text-2xl font-semibold flex items-center text-black gap-7 hover:bg-cyan-300 py-2 px-4">
                            <img src="/lista-de-verificacion.png" alt="Gestionar cita" className="w-12" />
                            Registro De Auditoria
                        </Link>
                    </li>
                    {user?.role === "administrador" && (
                        <Link to="/desactivar" className="text-2xl font-semibold flex items-center gap-7 text-black hover:bg-cyan-300 py-2 px-4">
                                <img src="/falso.png" alt="Desactivar Usuarios" className="w-12" />
                                Desactivar Usuarios
                        </Link>
                    )}
                </ul>
            </div>
            <div className="mb-8 flex justify-center">
                <button className="bg-red-500 text-white text-2xl py-2 px-5 rounded hover:bg-red-700 transition-colors duration-300 mt-auto " onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </div>
            </div>
        </div>
        )}
    </div>
    )
}
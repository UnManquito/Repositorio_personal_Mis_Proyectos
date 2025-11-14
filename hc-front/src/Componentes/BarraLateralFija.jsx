import React from 'react'
import { Link } from "react-router-dom";


export function BarraLateralFija() {
    return (
        <div className="w-1/5 bg-white min-h-screen flex flex-col items-center justify-between border-r-2">
            <div className="mt-4 flex flex-col justify-center pb-5 gap-10 w-full">
                <img src="/LogoHC.png" alt="Logo" className="h-auto shadow-lg w-auto" />
                <ul className="flex flex-col gap-8">
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
                        <Link to="/qr" className="text-2xl font-semibold flex items-center gap-7 text-black hover:bg-cyan-300 py-2 px-4">
                            <img src="/escaneo-de-codigo-qr.png" alt="Generar QR" className="w-12" />
                            Generar QR
                        </Link>
                    </li>
                    <li>
                        <Link to="/cita" className="text-2xl font-semibold flex items-center text-black gap-7 hover:bg-cyan-300 py-2 px-4">
                            <img src="/dia-mundial-de-la-salud.png" alt="Gestionar cita" className="w-12" />
                            Gestionar Cita
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="mb-4">
                <button className="bg-red-500 text-white text-2xl py-2 px-5 rounded hover:bg-red-700 transition-colors duration-300 mt-auto">
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}
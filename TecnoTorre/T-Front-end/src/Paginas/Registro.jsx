import React, {useState} from "react";
import { Link } from "react-router-dom";

export function Registro() {
    const [paso, setpaso] = useState(1);
    const [tipoUsuario, setTipoUsuario] = useState("");

    return (
        <div className="flex flex-row items-center justify-between bg-green-500">
            <img src="lia-angg-QnJNgeV5Bpg-unsplash.jpg" alt="Imagen de condominio" className="lg:w-2/3 sm:w-1/2 w-1/3 h-screen"/>
            <div className="flex flex-col items-center justify-center mr-5">
                <div className="flex items-center justify-center">
                    <img src="edificio-negro.png" alt="" className="sm:w-16 w-8" />
                    <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold cursor-default">TecnoTorre</h1>
                    <img src="edificio-negro.png" alt="" className="sm:w-16 w-8" />
                </div>
                <div className="bg-white p-3 rounded-lg shadow-lg flex flex-col items-center">
                    <div className="flex flex-col sm:flex-row justify-between items-center md:gap-6 sm:gap-3 gap-1">
                        <div className="flex items-center gap-1">
                          <input type="checkbox" id="admin" checked={tipoUsuario === "admin"} onChange={() => setTipoUsuario("admin")} className="hidden"/>
                          <label htmlFor="admin"
                            className={`bg-green-500 text-white py-1.5 px-1 rounded cursor-pointer flex items-center gap-2 ${tipoUsuario === "admin" ? 'ring-2 ring-black' : ''}`}
                          >
                            Administrador
                            {tipoUsuario === "admin" && (
                              <img src="check-negro.png" alt="Check" className="w-6" />
                            )}
                            {tipoUsuario !== "admin" && (
                              <img src="circulo-negro.png" alt="NoCheck" className="w-6" />
                            )}
                          </label>
                        </div>
                        <div className="flex items-center gap-1">
                          <input type="checkbox" id="copropietario" checked={tipoUsuario === "copropietario"} onChange={() => setTipoUsuario("copropietario")} className="hidden"/>
                          <label htmlFor="copropietario"
                            className={`bg-black text-white py-1.5 px-1 rounded cursor-pointer flex items-center gap-2 ${tipoUsuario === "copropietario" ? 'ring-2 ring-gray-600' : ''}`}
                          >
                            Copropietario
                            {tipoUsuario === "copropietario" && (
                              <img src="check-blanco.png" alt="Check" className="w-6" />
                            )}
                            {tipoUsuario !== "copropietario" && (
                              <img src="circulo-blanco.png" alt="NoCheck" className="w-6" />
                            )}
                          </label>
                        </div>
                    </div>
                    <div className="flex flex-col mt-4 md:w-2/3 sm:w-1/2">
                        {paso === 1 && (
                            <>
                                <input type="text" className="border border-gray-300 p-2 rounded mb-4 placeholder-gray-400 text-sm" placeholder="Ingrese su rut"/>
                                <input type="text" className="border border-gray-300 p-2 rounded mb-4 placeholder-gray-400 text-sm" placeholder="Ingrese su nombre"/>
                                <input type="text" className="border border-gray-300 p-2 rounded mb-4 placeholder-gray-400 text-sm" placeholder="Ingrese su apellido"/>
                                <input type="date" className="border border-gray-300 p-2 rounded mb-4 placeholder-gray-400 text-sm" placeholder="Ingrese su fecha de nacimiento"/>
                                <button onClick={() => setpaso(2)} className="bg-black text-white rounded  cursor-pointer flex items-center justify-center gap-2 mt-4">
                                Siguiente
                                <img src="flecha-derecha.png" alt="flecha apuntando a la derecha" className="w-12" />
                                </button>
                                <Link to={"/"} className="text-blue-500 self-center py-2 hover:underline">
                                    ¿Volver al inicio?
                                </Link>
                            </>
                        )}
                        {paso === 2 && (
                            <>
                                <input type="email" className="border border-gray-300 p-2 rounded mb-4 placeholder-gray-400" placeholder="Ingrese su correo electrónico" />
                                <input type="password" className="border border-gray-300 p-2 rounded mb-4 placeholder-gray-400" placeholder="Ingrese su contraseña" />
                                <input type="password" className="border border-gray-300 p-2 rounded mb-4 placeholder-gray-400" placeholder="Confirme su contraseña" />
                                <input type="number" className="border border-gray-300 p-2 rounded mb-4 placeholder-gray-400" placeholder="Ingrese su telefono" />
                                <button onClick={() => setpaso(1)} className="bg-black text-white rounded cursor-pointer flex items-center justify-center mb-5">
                                Regresar
                                <img src="flecha-izquierda.png" alt="flecha apuntando a la izquierda" className="w-12" />
                                </button>
                                <Link to={"/gastos"} className="bg-black text-white px-4 py-2 rounded cursor-pointer flex items-center justify-center gap-2">
                                    <img src="agregar-usuario-Blanco.png" alt="" className="w-8" />
                                    Registrarse
                                </Link>
                                <Link to={"/"} className="text-blue-500 self-center py-2 hover:underline">
                                    ¿Volver al inicio?
                                </Link>
                            </>

                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
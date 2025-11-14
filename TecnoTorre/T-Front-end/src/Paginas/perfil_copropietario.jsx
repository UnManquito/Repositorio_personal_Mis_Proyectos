import React, {useState} from "react";
import { Link } from "react-router-dom";

export function PerfilCopropietario() {
    const [mostrarRiesgo, setMostrarRiesgo] = useState(true);
    const [usuario, setUsuario] = useState({
        nombre: "Nombre Apellido",
        correo: "correo@ejemplo.com",
        rut: "12.345.678-9",
        piso: "5",
        Torre: "A",
        rol_unidad: "propietario",
        unidad: "502",
        telefono: "+56 9 1234 5678"
    });
    return (
        <div className="flex items-center overflow-hidden h-screen w-screen justify-start bg-green-500">
            {/* Barra lateral */}
            <div className="flex flex-col items-center justify-between bg-gray-900 w-4/12  lg:w-3/12 xl:w-3/12 h-screen">
                <div className="flex flex-row items-center justify-center h-3/12 w-full p-3 border-b-2 border-green-500 gap-3">
                    <img src="/edificio-verde.png" alt="" className="w-10 md:w-15 lg:w-20" />
                    <span className="text-white text-2xl md:text-3xl font-bold cursor-default">TecnoTorre</span>
                </div>
                <div className="flex h-full w-full">
                    <ul className="flex flex-col items-center w-full justify-between pb-3 ">
                        <li className="w-full ">
                            <Link to="/gastos" className="text-white flex items-center text-xl lg:text-2xl hover:bg-gray-950 px-3 py-2 gap-10 w-full h-full relative">
                            <img src="/gastos-comunes-casa.png" alt="" className="w-10 md:w-14"/>
                            <img src="/gastos-comunes.png" alt="" className="absolute w-8 md:w-12 top-8 left-13" />
                                Gastos Comunes
                            </Link>
                        </li>
                        <li className="w-full ">
                            <Link to="/espacio_comun" className="text-white flex items-center text-xl lg:text-2xl hover:bg-gray-950 px-5 py-2 gap-2">
                            <img src="espacio-comun.png" alt="" className="w-10 md:w-14"/>
                                Espacio Común
                            </Link>
                        </li>
                        <li className="w-full">
                            <Link to="/comunicacion" className="text-white flex items-center text-xl lg:text-2xl hover:bg-gray-950 px-3 gap-2">
                            <img src="/comunicacion.png" alt="" className="w-10 md:w-16"/>
                                Comunicación
                            </Link>
                        </li>
                        <li className="w-full">
                            <Link to="/perfil" className="text-white flex items-center text-xl lg:text-2xl hover:bg-gray-950 px-3 gap-2">
                            <img src="/perfil-usuario.png" alt="" className="w-10 md:w-15"/>
                                Perfil de Usuario
                            </Link>
                        </li>
                        <li className="w-full">
                            <Link to="/finanzas" className="text-white flex items-center text-xl lg:text-2xl hover:bg-gray-950 px-3 gap-2">
                            <img src="/finanzas.png" alt="" className="w-10 md:w-15"/>
                                Finanzas
                            </Link>
                        </li>
                        {/*
                        <button className="bg-red-600 text-white text-xl lg:text-2xl hover:bg-red-800 px-4 py-2 rounded cursor-pointer">
                            Cerrar sesión
                        </button>
                        */}
                        <Link to={"/"} className="bg-red-600 text-white text-xl lg:text-2xl hover:bg-red-800 px-4 py-2 rounded cursor-pointer">
                            Cerrar sesión
                        </Link>
                    </ul>
                </div>
            </div>
            {/* Contenido principal */}
            <div className="flex flex-1 flex-col items-start justify-start max-w-full h-full px-10 py-5 gap-5">
                <h1 className="text-black text-4xl tracking-wider font-bold">
                    Perfil Copropietario
                </h1>
                <div className="bg-white border-2 flex flex-col w-full h-full rounded-lg shadow-lg">
                    <div className="flex w-full justify-between items-center px-5">
                        <img src="/flecha-izquierda.png" alt="" className="w-24 md:w-28 lg:w-32" />
                        <div className="flex items-start justify-center relative">
                            <img src="/perfil-usuario.png" alt="" className="w-24" />
                            <img src="/editar.png" alt="" className="w-8 absolute self-center cursor-pointer translate-x-full top-0.5" />
                        </div>
                        <button className="bg-black cursor-pointer hover:bg-gray-800 text-base md:text-lg md:px-2 text-white rounded-xl " onClick={() => setMostrarRiesgo(prev => !prev)}>
                            Uso del Prototipo <br /> IA
                        </button>
                    </div>
                    <div className="flex flex-1 border-t-2 overflow-y-auto px-4 py-4 gap-4">
                        <div className="flex flex-col w-1/2 h-full border-2 rounded-3xl items-center justify-between">
                            <h3 className="font-semibold text-sm lg:text-xl border-b-2">Información Personal</h3>
                            <div className="flex lg:flex-wrap overflow-x-auto flex-col lg:flex-row w-full h-full items-center justify-between gap-5 px-4">   
                                <div className="flex flex-col items-center border-2 w-full lg:w-1/2 rounded lg:rounded-3xl">
                                    <h2 className="font-semibold">Nombre:</h2>
                                    <p className="text-gray-900">{usuario.nombre}</p>
                                </div>
                                <div className="flex flex-col items-center border-2 w-full lg:w-5/12 rounded lg:rounded-full">
                                    <h2 className="font-semibold">RUT:</h2>
                                    <p className="text-gray-900">{usuario.rut}</p>
                                </div>
                                <div className="flex flex-col items-center border-2 w-full lg:w-5/12 rounded lg:rounded-full">
                                    <h2 className="font-semibold">Teléfono:</h2>
                                    <p className="text-gray-900 lg:text-sm xl:text-base">{usuario.telefono}</p>
                                </div>
                                <div className="flex flex-col items-center border-2 w-full lg:w-1/2 rounded lg:rounded-full">
                                    <h2 className="font-semibold">Correo:</h2>
                                    <p className="text-gray-900">{usuario.correo}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-1/2 h-full border-2 rounded-3xl items-center justify-between">
                            <h3 className="font-semibold text-sm lg:text-xl border-b-2">Información Adicional</h3>
                            <div className="flex flex-col overflow-y-auto lg:flex-wrap lg:flex-row justify-between w-full gap-5 h-full items-center px-4">
                                <div className="flex flex-col items-center border-2 w-full lg:w-1/2 rounded lg:rounded-full">
                                    <h2 className=" font-semibold">Piso:</h2>
                                    <p className="text-gray-900">{usuario.piso}</p>
                                </div>
                                <div className="flex flex-col items-center border-2 w-full lg:w-5/12 rounded lg:rounded-full">
                                    <h2 className="font-semibold">Torre:</h2>
                                    <p className="text-gray-900">{usuario.Torre}</p>
                                </div>
                                <div className="flex flex-col items-center border-2 w-full lg:w-1/2 rounded lg:rounded-full">
                                    <h2 className="font-semibold">Rol:</h2>
                                    <p className="text-gray-900">{usuario.rol_unidad}</p>
                                </div>
                                <div className="flex flex-col items-center border-2 w-full lg:w-5/12 rounded lg:rounded-full">
                                    <h2 className="font-semibold">Unidad:</h2>
                                    <p className="text-gray-900">{usuario.unidad}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-t-2 justify-between items-center gap-4 px-4 py-4">
                        <div className=" rounded-3xl border-2 px-4 py-5 flex flex-col items-center">
                            <span className="text-gray-600  font-semibold text-sm md:text-base lg:text-xl ">Morosidad:</span>
                            <span className=" font-bold text-red-600 text-sm md:text-base lg:text-xl ">$ 2.000.000</span>
                        </div>
                        {mostrarRiesgo && (
                            <div className=" rounded-3xl border-2 px-4 py-5 flex flex-col items-center">
                                <span className="text-gray-600  font-semibold text-sm md:text-base lg:text-xl  ">Riesgo de mora:</span>
                                <span className=" font-bold text-red-600 text-sm md:text-base lg:text-xl ">% X</span>
                            </div>
                        )}
                        <div className=" rounded-3xl border-2 px-4 py-5 flex flex-col items-center">
                            <span className="text-gray-600 text-sm md:text-base lg:text-xl font-semibold ">Casos Morosos:</span>
                            <span className="text-sm md:text-base lg:text-xl font-bold text-red-600">10 Copropietarios </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

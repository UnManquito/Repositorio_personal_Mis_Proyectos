import React, {useState} from "react";
import { Link } from "react-router-dom";

export function Finanzas_Torre() {
    const [Torre, setTorre] = useState ([
        {nombre: "Torre A", deuda: 1250000, casosMorosos: 5},
        {nombre: "Torre B", deuda: 950000, casosMorosos: 3},
        {nombre: "Torre C", deuda: 780000, casosMorosos: 2},
        {nombre: "Torre D", deuda: 430000, casosMorosos: 1},
        {nombre: "Torre E", deuda: 670000, casosMorosos: 4},
        {nombre: "Torre F", deuda: 890000, casosMorosos: 2},
    ]);

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-green-500">
            {/* Barra lateral */}
            <div className="flex flex-col items-center justify-between bg-gray-900 w-4/12 lg:w-3/12 xl:w-3/12 h-full flex-shrink-0">
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
                            <img src="/espacio-comun.png" alt="" className="w-10 md:w-14"/>
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
            <div className="flex flex-col items-start justify-start flex-1 h-full px-10 py-3 gap-10 max-w-full overflow-x-hidden">
                <h1 className="text-black text-4xl tracking-wider font-bold">
                    Finanzas
                </h1>
                <div className="bg-white w-full h-full border-2 rounded-lg shadow-lg max-w-full max-h-full overflow-hidden">
                    <div className="flex items-center w-full justify-center h-2/11 border-b-2 relative">
                        <img src="/flecha-izquierda.png" alt="" className="absolute left-0 w-20 lg:w-24 xl:w-28"/>
                        <span className="text-black text-2xl md:text-3xl lg:text-4xl font-semibold">
                            Deuda Total <br /> $ 1.250.000
                        </span>
                    </div>
                    <div className="flex h-9/11 overflow-x-auto px-4 flex-nowrap gap-10 items-center justify-start max-w-full">
                        {Torre.map((torre, index) => (
                            <div key={index} className="min-w-[220px] md:min-w-[260px] lg:min-w-[320px] h-11/12 rounded-3xl flex flex-col items-center justify-between border-2 p-3 bg-white">
                                <div className="flex items-center justify-center gap-1">
                                    <img src="/edificio-verde.png" alt="" className="w-8 md:w-10 lg:w-12"/>
                                    <span className="text-2xl lg:text-3xl xl:text-4xl border-b-2 font-semibold">{torre.nombre}</span>
                                    <img src="/edificio-negro.png" alt="" className="w-9.5 md:w-11.5 lg:w-14" />
                                </div>
                                <div className="flex flex-col items-center justify-center gap-5 w-9/12">
                                    <span className="border-2 rounded-3xl text-lg text-center w-full py-4">Deuda: <br /> ${torre.deuda.toLocaleString()}</span>
                                    <span className="border-2 rounded-3xl text-lg text-center w-full py-4">Casos Morosos: <br /> {torre.casosMorosos}</span>
                                </div>
                                <button className="bg-black flex w-full lg:w-9/12 text-white text-lg px-4 py-1 rounded hover:bg-gray-900 cursor-pointer">
                                    <img src="/detalle.png" alt="" className="w-0 lg:w-12 mr-2"/>
                                    Ver Detalle
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
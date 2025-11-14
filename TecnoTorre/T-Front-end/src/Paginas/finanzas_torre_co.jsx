import React, {useState} from "react";
import { Link } from "react-router-dom";

export function Finanzas_Torre_Co() {
    const [copropietario, setCopropietario] = useState ([
        {nombre: "Juan Pérez", piso: 10},
        {nombre: "María Gómez", piso: 12},
        {nombre: "Carlos Rodríguez", piso: 8},
        {nombre: "Ana Martínez", piso: 15},
        {nombre: "Luis Fernández", piso: 5},
        {nombre: "Sofía López", piso: 20},
        {nombre: "Miguel Torres", piso: 7},
        {nombre: "Laura Sánchez", piso: 14},
        {nombre: "Diego Ramírez", piso: 9},
        {nombre: "Elena Cruz", piso: 11},
        {nombre: "Javier Morales", piso: 6},
        {nombre: "Marta Jiménez", piso: 13},
        {nombre: "Andrés Ruiz", piso: 4},
        {nombre: "Carmen Díaz", piso: 3},
        {nombre: "Fernando Castillo", piso: 2},
        {nombre: "Isabel Vega", piso: 1},
        {nombre: "Ricardo Silva", piso: 16},
        {nombre: "Patricia Moreno", piso: 17},
        {nombre: "Sergio Ortiz", piso: 18},
        {nombre: "Natalia Herrera", piso: 19},
        {nombre: "Valentina Castro", piso: 21},
        {nombre: "Tomás Rojas", piso: 22},
        {nombre: "Gabriela Flores", piso: 23},
        {nombre: "Sebastián Peña", piso: 24},
        {nombre: "Camila Soto", piso: 25},
        {nombre: "Matías Aguirre", piso: 26},
        {nombre: "Juan Pérez", piso: 10},
        {nombre: "María Gómez", piso: 12},
        {nombre: "Carlos Rodríguez", piso: 8},
        {nombre: "Ana Martínez", piso: 15},
        {nombre: "Luis Fernández", piso: 5},
        {nombre: "Sofía López", piso: 20},
        {nombre: "Miguel Torres", piso: 7},
        {nombre: "Laura Sánchez", piso: 14},
        {nombre: "Diego Ramírez", piso: 9},
        {nombre: "Elena Cruz", piso: 11},
        {nombre: "Javier Morales", piso: 6},
        {nombre: "Marta Jiménez", piso: 13},
        {nombre: "Andrés Ruiz", piso: 4},
        {nombre: "Carmen Díaz", piso: 3},
        {nombre: "Fernando Castillo", piso: 2},
        {nombre: "Isabel Vega", piso: 1},
        {nombre: "Ricardo Silva", piso: 16},
        {nombre: "Patricia Moreno", piso: 17},
        {nombre: "Sergio Ortiz", piso: 18},
        {nombre: "Natalia Herrera", piso: 19},
        {nombre: "Valentina Castro", piso: 21},
        {nombre: "Tomás Rojas", piso: 22},
        {nombre: "Gabriela Flores", piso: 23},
        {nombre: "Sebastián Peña", piso: 24},
        {nombre: "Camila Soto", piso: 25},
        {nombre: "Matías Aguirre", piso: 26},
    ]);
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
            <div className="flex flex-1 flex-col items-start justify-start max-w-full h-full px-10 py-0 gap-5">
                <h1 className="text-black text-4xl tracking-wider font-bold">
                    Finanzas
                </h1>
                <div className="bg-white flex flex-col w-full h-full max-w-full max-h-full border-2 rounded-lg shadow-lg py-2 ">
                    <div className="flex items-center w-full justify-center border-b-2 h-2/14 relative">
                        <img src="/flecha-izquierda.png" alt="" className="absolute left-0 w-18 lg:w-24 xl:w-28"/>
                        <span className="text-black text-2xl md:text-3xl lg:text-4xl font-bold">
                            Torre A    
                        </span>
                    </div>
                    <div className="flex flex-row items-center justify-evenly h-1/11 border-b-2 ">
                        <div className="flex items-center w-1/3 lg:w-1/4 relative">
                            <input type="text" placeholder="Buscar..." className="w-full pl-12 pr-4 py-2 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"/>
                            <img src="/lupa.png" alt="Buscar" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <label htmlFor="ordenar" className="text-gray-700 font-semibold">Ordenar por:</label>
                            <select id="ordenar" className="border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                                <option value="morosidad">Morosidad</option>
                                <option value="nombre-az">Nombre (A-Z)</option>
                                <option value="nombre-za">Nombre (Z-A)</option>
                                <option value="riesgo-alto">Riesgo: Alto</option>
                                <option value="riesgo-medio">Riesgo: Medio</option>
                                <option value="riesgo-bajo">Riesgo: Bajo</option>
                            </select>
                        </div>
                        <button className="bg-black text-white hover:bg-cyan-800 lg:px-2 lg:py-2 rounded cursor-pointer">
                            Añadir Copropietario
                        </button>
                    </div>
                    <div className="flex flex-wrap items-start justify-around gap-y-5 px-4 py-2 w-full h-7/13 overflow-y-auto">
                        {copropietario.map((copropietario, index) => (
                            <div key={index} className="flex items-start min-w-[280px] cursor-pointer border-2 rounded-full">
                                <div className="flex w-full items-center rounded-full hover:bg-blue-200 justify-between">
                                    <img src="/perfil-usuario.png" alt="" className="w-8 md:w-15 lg:w-20"/>
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="text-gray-800 font-semibold">{copropietario.nombre}</span>
                                        <span className="text-gray-600">Piso: {copropietario.piso}</span>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex h-2/14 items-center justify-evenly w-full border-t-2 ">
                        <div className=" rounded-3xl text-base md:text-xl border-2 px-4 py-2 flex flex-col items-center">
                            <span className="text-gray-600  font-semibold ">Morosidad:</span>
                            <span className=" font-bold text-red-600">$ 2.000.000</span>
                        </div>
                        <div className=" rounded-3xl border-2 px-4 py-2 flex flex-col items-center">
                            <span className="text-gray-600 text-base md:text-xl  font-semibold ">Casos Morosos:</span>
                            <span className="text-base md:text-xl font-bold text-red-600">10 Copropietarios </span>
                        </div>
                        <button className="bg-black text-base md:text-xl text-white hover:bg-cyan-800 lg:px-2 lg:py-2 rounded cursor-pointer">
                            Uso del <br />prototipo IA
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
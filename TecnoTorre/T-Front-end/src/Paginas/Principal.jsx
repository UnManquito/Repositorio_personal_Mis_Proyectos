import React from "react";
import { Link } from "react-router-dom";

export function Principal() {
  return (
    <div className="flex flex-col h-screen">
      {/* Parte superior */}
      <div className="bg-black h-1/10 px-10 flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <img src="edificio-verde.png" alt="" className="w-10" />
          <span className="text-white text-2xl font-bold cursor-default">TecnoTorre</span>
          <img src="edificio-verde.png" alt="" className="w-10" />
        </div>
        <div className="flex gap-5">
          <Link to={"/sesion"} className="bg-white text-black px-2.5 py-0.5 rounded hover:bg-gray-300 cursor-pointer">
            <img src="Inicio-sesion.png" alt="" className="inline-block w-9" />
            Iniciar sesión
            </Link>
          <Link to={"/registro"} className="bg-blue-500 text-white px-2.5 py-0.5 rounded hover:bg-blue-600 cursor-pointer ">
            <img src="agregar-usuario.png" alt="" className="inline-block w-9" />
            Registrarse
            </Link>
        </div>
      </div>
      {/* Parte central */}
      <div className="bg-green-500 sm:flex-1  sm:flex flex-row flex items-center justify-between px-5">
        <div className="flex flex-col items-center justify-center ml-40 mb-15 gap-y-10">
          <h1 className="text-black font-bold cursor-default sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl">TecnoTorre</h1>
          <span className="text-black text-center cursor-default sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">Plataforma Web para la gestión de <br /> condominios</span>
        </div>
        <img src="Condominio-Inicio.png" alt="" className="w-5/11"/>
      </div>
      {/* Parte inferior */}
      <div className="bg-black flex h-1/10" />
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";

export function Inicio_sesion() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-green-500 min-h-screen">
      {/* Imagen lateral */}
      <img src="lia-angg-QnJNgeV5Bpg-unsplash.jpg" alt="Imagen de condominio" className="w-full md:w-2/3 h-64 md:h-screen object-cover"/>
      {/* Formulario */}
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-6">
        <div className="flex items-center lg:gap-4 md:gap-2 mb-8">
          <img src="edificio-negro.png" alt="" className="lg:w-16 md:w-12 sm:w-10 w-10" />
          <h1 className="text-white lg:text-3xl md:text-2xl font-bold cursor-default text-2xl">TecnoTorre</h1>
          <img src="edificio-negro.png" alt="" className="lg:w-16 md:w-12 sm:w-10 w-10" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
          <h1 className="text-xl text-center">Inicio de sesión</h1>
          <div className="flex flex-col mt-4 items-center">
            <input type="email" className="border border-gray-400 p-2 rounded mb-5 " placeholder="Ingrese su correo electrónico"/>
            <input type="password" className="border border-gray-400 p-2 rounded mb-5 mt-3" placeholder="Ingrese su contraseña"/>
            <Link to={"/gastos"} className="bg-black text-white px-8 py-2 rounded cursor-pointer hover:bg-gray-800  flex items-center justify-center gap-2">
              <img src="Inicio-sesion-blanco.png" alt="" className="w-7" />
              Iniciar Sesión
            </Link>
            <span className="text-black mt-4 text-center">¿No tienes una cuenta?{"    "}
                <Link to="/registro" className="text-blue-500 hover:underline">
                  Regístrate aquí
                </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";

export function Comunicacion() {
    const [mensajes, setMensajes] = React.useState([
        { titulo: "Mantenimiento Ascensor", fecha: "2024-10-01", unidad: "Apto 101" },
        { titulo: "Reunión de Condominio", fecha: "2024-10-05", unidad: "Apto 202" },
        { titulo: "Actualización de Normas", fecha: "2024-10-10", unidad: "Apto 303" },
        { titulo: "Fiesta de Fin de Año", fecha: "2024-12-20", unidad: "Apto 404" },
        { titulo: "Cambio de Proveedor de Seguridad", fecha: "2024-11-15", unidad: "Apto 505" },
        { titulo: "Renovación de Contrato de Limpieza", fecha: "2024-11-30", unidad: "Apto 606" },
        { titulo: "Instalación de Cámaras de Seguridad", fecha: "2024-12-05", unidad: "Apto 707" },
        { titulo: "Actualización de Reglamento Interno", fecha: "2024-12-15", unidad: "Apto 808" },
        { titulo: "Aviso de Corte de Agua", fecha: "2024-10-20", unidad: "Apto 909" },
        { titulo: "Encuesta de Satisfacción", fecha: "2024-11-10", unidad: "Apto 1001" },
    ]);
    const [busqueda, setBusqueda] = React.useState("");

    const mensajesFiltrados = mensajes.filter((mensaje) =>
        mensaje.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );

    const truncarNombre = (nombre) => {
        const maxLength = 30;
        if (nombre.length > maxLength) {
            return nombre.slice(0, maxLength) + "...";
        }
        return nombre;
    };

    return (
        <div className="flex items-center h-screen w-screen overflow-hidden justify-start bg-green-500">
            {/* Barra lateral */}
            <div className="flex flex-col items-center justify-between bg-gray-900 w-4/12  lg:w-3/12 xl:w-3/12 h-screen">
                <div className="flex flex-row items-center justify-center h-3/12 w-full p-3 border-b-2 border-green-500 gap-3">
                    <img src="edificio-verde.png" alt="" className="w-10 md:w-15 lg:w-20" />
                    <span className="text-white text-2xl md:text-3xl font-bold cursor-default">TecnoTorre</span>
                </div>
                <div className="flex h-full w-full">
                    <ul className="flex flex-col items-center w-full justify-between pb-3 ">
                        <li className="w-full ">
                            <Link to="/gastos" className="text-white flex items-center text-xl lg:text-2xl hover:bg-gray-950 px-3 py-2 gap-10 w-full h-full relative">
                            <img src="gastos-comunes-casa.png" alt="" className="w-10 md:w-14"/>
                            <img src="gastos-comunes.png" alt="" className="absolute w-8 md:w-12 top-8 left-13" />
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
                            <img src="comunicacion.png" alt="" className="w-10 md:w-16"/>
                                Comunicación
                            </Link>
                        </li>
                        <li className="w-full">
                            <Link to="/perfil" className="text-white flex items-center text-xl lg:text-2xl hover:bg-gray-950 px-3 gap-2">
                            <img src="perfil-usuario.png" alt="" className="w-10 md:w-15"/>
                                Perfil de Usuario
                            </Link>
                        </li>
                        <li className="w-full">
                            <Link to="/finanzas" className="text-white flex items-center text-xl lg:text-2xl hover:bg-gray-950 px-3 gap-2">
                            <img src="finanzas.png" alt="" className="w-10 md:w-15"/>
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
            <div className="flex flex-col items-start justify-start flex-1 max-w-full h-full px-10 gap-10">
                <h1 className="text-black tracking-wider text-4xl font-bold">
                    Comunicación
                </h1>
                <div className="flex w-full justify-between h-6/7 rounded-xl shadow-lg">
                    <div className="flex flex-col h-full w-4/6 bg-white rounded-lg border-2 ">
                            <div className="flex items-center justify-between p-5 gap-2">
                                <label htmlFor="buscador" className=""></label>
                                <div className="relative w-full flex items-center">
                                    <input type="text" id="buscador" placeholder="Buscar..." className="border-l-2 border-y-2  border-gray-700 py-2 p-3"/>
                                    <img src="lupa.png" alt="Buscar" className="border-2 border-gray-700 hover:bg-gray-200 cursor-pointer py-0.5 absolute w-10 left-50" />
                                </div>
                                <button className="bg-black rounded-3xl w-2/7 px-0  py-2 hover:bg-gray-800 cursor-pointer text-white">
                                    Enviar un Correo
                                </button>
                            </div>
                        <div className="flex items-center h-1/9 self-end justify-between pr-11 md:pl-10 pl-5 w-5/6 lg:w-2/3 ">
                            <span className="text-xl">Titulo</span>
                            <span className="text-xl">Fecha</span>
                        </div>
                        <div className="flex-1 overflow-auto flex flex-col items-center w-full">
                            {mensajesFiltrados.map((mensaje, index) => (
                                <div key={index} className="flex items-center cursor-pointer hover:bg-gray-200 justify-between w-full px-2">
                                    <img src="correo-electronico.png" alt="Imagen de correo" className="w-8 md:w-12 lg:w-16" />
                                    <span>{truncarNombre(mensaje.titulo)}</span>
                                    <span>{mensaje.fecha}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col h-full w-3/10 bg-white rounded-2xl border-2 ">
                        <h2 className="flex flex-col lg:flex-row items-center justify-center text-lg md:text-lg lg:text-2xl font-bold mb-4">
                            <img src="alerta.png" alt="Signo de alerta" className="w-8 md:w-10"/>
                            Notificaciones
                        </h2>
                        <div className="flex-1 overflow-auto">
                            {/* Aquí se mapearían las notificaciones */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
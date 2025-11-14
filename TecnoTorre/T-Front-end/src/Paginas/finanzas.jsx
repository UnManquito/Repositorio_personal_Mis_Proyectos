import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Modal } from "../Componentes/Modal";

export function Finanzas() {
    const [condominios, setCondominios] = useState([
        // Ejemplo de datos de condominios
        { nombre: "Condominio A", direccion: "Calle 1", torres: 1, deuda: 5000, morosos: 20 },
        { nombre: "Condominio B", direccion: "Calle 2", torres: 2, deuda: 3000, morosos: 10 },
        { nombre: "Condominio C", direccion: "Calle 3", torres: 3, deuda: 7000, morosos: 30 },
        { nombre: "Condominio D", direccion: "Calle 4", torres: 4, deuda: 2000, morosos: 5 },
        { nombre: "Condominio E", direccion: "Calle 5", torres: 5, deuda: 6000, morosos: 25 },
        { nombre: "Condominio F", direccion: "Calle 6", torres: 6, deuda: 4000, morosos: 15 },
        { nombre: "Condominio G", direccion: "Calle 7", torres: 7, deuda: 8000, morosos: 35 },
        { nombre: "Condominio H", direccion: "Calle 8", torres: 8, deuda: 9000, morosos: 40 },
        { nombre: "Condominio I", direccion: "Calle 9", torres: 9, deuda: 1000, morosos: 2 },
        { nombre: "Condominio J", direccion: "Calle 10", torres: 10, deuda: 11000, morosos: 50 },
        { nombre: "Condominio K", direccion: "Calle 11", torres: 11, deuda: 12000, morosos: 55 },
        { nombre: "Condominio L", direccion: "Calle 12", torres: 12, deuda: 13000, morosos: 60 },
        { nombre: "Condominio M", direccion: "Calle 13", torres: 13, deuda: 14000, morosos: 65 },
        { nombre: "Condominio N", direccion: "Calle 14", torres: 14, deuda: 15000, morosos: 70 },
        { nombre: "Condominio O", direccion: "Calle 15", torres: 15, deuda: 16000, morosos: 75 },
        { nombre: "Condominio P", direccion: "Calle 16", torres: 16, deuda: 17000, morosos: 80 },
        { nombre: "Condominio Q", direccion: "Calle 17", torres: 17, deuda: 18000, morosos: 85 },
        { nombre: "Condominio R", direccion: "Calle 18", torres: 18, deuda: 19000, morosos: 90 },
        { nombre: "Condominio S", direccion: "Calle 19", torres: 19, deuda: 20000, morosos: 95 },
        { nombre: "Condominio T", direccion: "Calle 20", torres: 20, deuda: 21000, morosos: 100 },
        { nombre: "Condominio U", direccion: "Calle 21", torres: 21, deuda: 22000, morosos: 105 },
        { nombre: "Condominio V", direccion: "Calle 22", torres: 22, deuda: 23000, morosos: 110 },
        { nombre: "Condominio W", direccion: "Calle 23", torres: 23, deuda: 24000, morosos: 115 },
        { nombre: "Condominio X", direccion: "Calle 24", torres: 24, deuda: 25000, morosos: 120 },
        { nombre: "Condominio Y", direccion: "Calle 25", torres: 25, deuda: 26000, morosos: 125 },
        { nombre: "Condominio Z", direccion: "Calle 26", torres: 26, deuda: 27000, morosos: 130 },

    ]);
    const regionesChile = {
        "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
        "Tarapacá": ["Iquique", "Alto Hospicio", "Pica", "Pozo Almonte"],
        "Antofagasta": ["Antofagasta", "Calama", "Tocopilla", "Mejillones"],
        "Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral"],
        "Coquimbo": ["La Serena", "Coquimbo", "Vicuña", "Illapel"],
        "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"],
        "Metropolitana": ["Santiago", "Puente Alto", "Maipú", "Las Condes"],
        "O'Higgins": ["Rancagua", "Machalí", "San Vicente", "Pichilemu"],
        "Maule": ["Talca", "Curicó", "Linares", " Constitución"],
        "Biobío": ["Concepción", "Talcahuano", "Los Ángeles", "Chillán"],
        "La Araucanía": ["Temuco", "Pucón", "Villarrica", "Freire"],
        "Los Ríos": ["Valdivia", "La Unión", "Río Bueno", "Lago Ranco"],
        "Los Lagos": ["Puerto Montt", "Osorno", "Puerto Varas", "Castro"],
        "Aysén": ["Coyhaique", "Puerto Aysén", "Chile Chico", "Cisnes"],
        "Magallanes": ["Punta Arenas", "Puerto Natales", "Porvenir", "Cabo de Hornos"]
    };

    const [mostrarModal, setMostrarModal] = useState(false);
    const [modalTipo, setModalTipo] = useState("")
    const [regionSeleccionada, setRegionSeleccionada] = useState("");
    const [comunas, setComunas] = useState([]);

    const handleAgregar = (e) => {
        e.preventDefault();
        setModalTipo("agregar");
        setMostrarModal(true);
    }
    return (
        <div className="flex h-screen w-screen overflow-hidden items-center justify-start bg-green-500">
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
            <div className="flex flex-1 flex-col items-start justify-start max-w-full h-full p-10 gap-5">
                <h1 className="text-black tracking-wider text-4xl font-bold">
                    Finanzas
                </h1>
                <div className="bg-white flex flex-col w-full h-7/8 border-2 rounded-lg shadow-lg py-2 pb-15">
                    <p className="text-black text-xl md:text-2xl pb-3 lg:text-3xl self-center">Condominios</p>
                    <div className="flex flex-col items-start border-t-2 justify-start h-full w-full">
                        <div className="flex w-full justify-around my-2 h-1/9">
                            <button className="flex items-center gap-2 bg-red-600 border-1 border-black text-white text-lg md:text-xl hover:bg-red-800 px-2 rounded cursor-pointer">
                                <span className="text-lg">Eliminar</span>
                                <img src="eliminar.png" alt=""  className="w-5 md:w-8 lg:w-8" />
                            </button>
                            <button className="flex items-center gap-2 border-1 border-black bg-green-600 text-white text-lg md:text-xl hover:bg-green-800 px-2 rounded cursor-pointer" onClick={() => {setModalTipo("agregar"); setMostrarModal(true)}}>
                                <span className="text-lg">Agregar</span>
                                <img src="check-negro.png" alt=""  className="w-5 md:w-8 lg:w-8" />
                            </button>
                            <Modal visible={mostrarModal} onClose={() => setMostrarModal(false)} modalTipo={modalTipo}>
                                {modalTipo === "agregar" && (
                                    <div className="flex flex-col items-center justify-around w-full h-full py-5">
                                        <div className="flex relative">
                                            <img src="editar.png" alt="" className="w-10 absolute cursor-pointer left-22" />
                                            <img src="icono-imagen.png" alt="" className="w-28 md:w-28 lg:w-28" />
                                        </div>
                                        <div className="flex flex-col gap-10">
                                            <div className="flex gap-4 ">
                                                <input type="text" className="border-2 border-gray-600 p-2 rounded-lg" placeholder="Nombre del condominio" />
                                                <input type="text" className="border-2 border-gray-600 p-2 rounded-lg" placeholder="Ciudad" />
                                                <input type="text" className="border-2 border-gray-600 p-2 rounded-lg" placeholder="Región" />
                                            </div>
                                            <div className="flex gap-4">
                                                <input type="text" className="border-2 border-gray-600 p-2 rounded-lg" placeholder="Comuna" />
                                                <input type="text" className="border-2 border-gray-600 p-2 rounded-lg" placeholder="Correo electronico" />
                                                <input type="text" className="border-2 border-gray-600 p-2 rounded-lg" placeholder="Telefono" />
                                            </div>
                                        </div>
                                        <div className="flex justify-between w-full px-10">
                                            <button className="bg-red-600 hover:bg-red-800 text-white text-2xl cursor-pointer px-4 py-2 rounded" onClick={() => setMostrarModal(false)}>Cancelar</button>
                                            <button className="bg-black text-white hover:bg-gray-900 text-2xl cursor-pointer px-6 py-2 rounded" onClick={handleAgregar}>Crear</button>
                                        </div>
                                    </div>
                                )}
                            </Modal>
                        </div>
                        <div className="flex-1 flex flex-col w-full h-full border-t-1 gap-4 overflow-auto">
                            {condominios.map((condominio) => (
                                <div key={condominio.id} className="flex items-center justify-between px-2 ">
                                    <div>
                                        <p className="font-bold">{condominio.nombre}</p>
                                        <p className="text-base">{condominio.direccion}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-base"><span className="font-bold">Torres: </span> {condominio.torres}</span>
                                        <span className="text-base"><span className="font-bold">Deuda: </span>${condominio.deuda}</span>
                                        <span className="text-base"><span className="font-bold">Morosos detectados: </span>{condominio.morosos}</span>
                                    </div>
                                    <button className="bg-black text-white md:text-lg hover:bg-gray-800 px-2 py-2 rounded cursor-pointer">
                                        Más detalles
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Modal } from "../Componentes/Modal";

export function Gastos_comunes() {
    const [gastos, setGastos] = useState([
        {Estado: "Pagado", Nombre: "Boleta-123467", Fecha: "12/03/2023", Unidad: "101"},
        {Estado: "Pendiente", Nombre: "Boleta-123468", Fecha: "12/04/2023", Unidad: "101"},
        {Estado: "Rechazado", Nombre: "Boleta-123469", Fecha: "12/05/2023", Unidad: "101"},
        {Estado: "Pagado", Nombre: "Boleta-123470", Fecha: "12/06/2023", Unidad: "101"},
        {Estado: "Pendiente", Nombre: "Boleta-123471", Fecha: "12/07/2023", Unidad: "101"},
        {Estado: "Rechazado", Nombre: "Boleta-123472", Fecha: "12/08/2023", Unidad: "101"},
    ]);
    const [historial, setHistorial] = useState([
        {Nombre: "Comprobante-123467", Rut: "12.345.678-9"},
        {Nombre: "Comprobante-123468", Rut: "12.345.678-9"},
        {Nombre: "Comprobante-123469", Rut: "12.345.678-9"},
        {Nombre: "Comprobante-123470", Rut: "12.345.678-9"},
        {Nombre: "Comprobante-123471", Rut: "12.345.678-9"},
        {Nombre: "Comprobante-123472", Rut: "12.345.678-9"},
        {Nombre: "Comprobante-123473", Rut: "12.345.678-9"},
    ]);
    const [tipoBoleta, setTipoBoleta] = useState("")
    const [mostrarModal, setMostrarModal] = useState(false);
    const [modalTipo, setModalTipo] = useState(""); // Entre "historial" y "agregar"
    const [archivo, setArchivo] = useState([]);

    const truncarNombre = (archivo, max = 25) => {
        const nombre = archivo.name;
        const tipo = nombre.includes('.') ? '.' + nombre.split('.').pop() : '';
        const base = nombre.replace(tipo, '');
        if (base.length > max) {
            return base.slice(0, max) + "..." + tipo;
        }
        return base + tipo;
    };

    const handleEliminarArchivo = (index) => {
        setArchivo(archivo.filter((_, i) => i !== index));
    }

    const handleArchivo = (event) => {
        const nuevoArchivos = Array.from(event.target.files);
        setArchivo(prev => [...prev, ...nuevoArchivos]);
    };

    return (
        <div className="flex items-center h-screen w-screen overflow-hidden justify-start bg-green-500">
            {/* Barra lateral */}
            <div className="flex flex-col items-center justify-between bg-gray-900 md:w-5/12 lg:w-4/12 xl:w-3/12 h-screen">
                <div className="flex flex-row items-center justify-center h-3/12 w-full p-3 border-b-2 border-green-500 gap-3">
                    <img src="edificio-verde.png" alt="" className="w-10 md:w-15 lg:w-20" />
                    <span className="text-white sm:text-lg md:text-2xl lg:text-3xl font-bold cursor-default">TecnoTorre</span>
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
                            <Link to="/comunicacion" className="text-white flex items-center text-xl lg:text-2xl hover:bg-gray-950 px-3 gap-2 ">
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
            <div className="flex flex-1 flex-col items-start justify-start max-w-full h-full p-10 gap-10">
                <h1 className="text-black tracking-wider text-4xl font-bold">
                    Gastos Comunes
                </h1>
                <div className="bg-white flex flex-col border-2 w-full h-8/9 rounded-lg shadow-lg ">
                    <div className="border-b-2 h-1/7 flex items-center justify-between px-10">
                        <span className="text-xl">Estado</span>
                        <span className="text-xl">Nombre</span>
                        <span className="text-xl">Fecha</span>
                        <span className="text-xl">Unidad</span>
                    </div>
                    {/* Aquí se mapean los gastos comunes */}
                    <div className="border-b-2 flex-1 flex-col overflow-auto px-10 items-center justify-between">
                        {gastos.map((gasto, index) => (
                            <div key={index} className="flex items-center justify-between py-5 ">
                                <div className="">
                                    {gasto.Estado === "Pagado" && <img src="pago-check.png" alt="Pagado" className="w-8 md:w-12 lg:w-18" />}
                                    {gasto.Estado === "Pendiente" && <div className="flex relative">
                                            <img src="pago.png" alt="Pendiente" className="w-8 md:w-12 lg:w-18" />
                                            <img src="pendiente.png" alt="Pendiente" className="absolute top-3 left-2 w-8 md:w-12 md:top-4 md:left-4 lg:w-14 lg:top-8 lg:left-7" />
                                        </div>}
                                    {gasto.Estado === "Rechazado" && <div className="flex relative">
                                            <img src="pago-check.png" alt="Rechazado" className="w-8 md:w-12 lg:w-18" />
                                            <img src="X-rojo.png" alt="Rechazado" className="absolute w-3 bottom-4 right-5 md:w-4.5 md:bottom-6 md:right-8 lg:w-7 lg:bottom-8.5 lg:right-11.5" />
                                        </div>}
                                </div>
                                <span className="text-xl">{gasto.Nombre}</span>
                                <span className="text-xl">{gasto.Fecha}</span>
                                <span className="text-xl">{gasto.Unidad}</span>
                            </div>
                        ))}
                    </div>
                    <div className=" h-1/5 justify-between items-center px-10 flex">
                        <div className="rounded-xl border-2 flex flex-col p-2">
                            <span className="text-xl">Morosidad</span>
                            <span className="text-xl">$ 2000000</span>
                        </div>
                        <div className="flex gap-3">
                            <button className="bg-white border-2 border-black text-white text-xl hover:bg-gray-300 px-0.5 py-0.5 rounded cursor-pointer relative" onClick={() => { setMostrarModal(true); setModalTipo("historial"); }}>
                                <img src="pago.png" alt="" className="w-17" />
                                <img src="pendiente.png" alt="" className="absolute inset-0 top-8.5 left-8 w-11" />
                            </button>
                            <button className="bg-white border-2 border-black text-white text-xl hover:bg-gray-300 px-0.5 py-0.5 rounded cursor-pointer relative" onClick={() => { setMostrarModal(true); setModalTipo("agregarComprobante"); }}>
                                <img src="pago.png" alt="" className="w-17" />
                                <img src="boton-agregar.png" alt="" className="absolute inset-0 top-7.5 left-7 w-13" />
                            </button>
                        </div>
                    </div>
                    <Modal visible={mostrarModal} onClose={() => setMostrarModal(false)} modalTipo={modalTipo}>
                        {modalTipo === "historial" && (
                            <div className="flex h-full w-full flex-col relative">
                                <h2 className="text-2xl self-center sm:text-3xl font-bold mb-4">Panel de Comprobantes</h2>
                                <button className="bg-red-500 border-2 border-black text-white px-4 ml-4 py-2 rounded absolute hover:bg-red-600 cursor-pointer" onClick={() => setMostrarModal(false)}>
                                    <img src="X.png" alt="Cerrar" className="w-5" />
                                </button>
                                <div className="h-1/7 flex items-end self-end justify-around w-4/5">
                                    <span className="text-xl">Nombre</span>
                                    <span className="text-xl">Rut</span>
                                    <span className="text-xl">Acciones</span>
                                </div>
                                <div className="flex-1 flex flex-col overflow-auto w-full px-0 items-center border-t-2 justify-between">
                                    {historial.map((item, index) => (
                                        <div key={index} className="flex items-center justify-around py-5 w-full">
                                            <img src="pago.png" alt="imagen de una boleta" className="w-8 lg:w-20" />
                                            <span className="text-lg md:text-xl">{item.Nombre}</span>
                                            <span className="text-lg md:text-xl">{item.Rut}</span>
                                            <div className="flex gap-5">
                                                <button className="border-2 bg-green-500 border-black text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer">
                                                    <img src="check-negro.png" alt="visto bueno de color negro" className="w-5" />
                                                </button>
                                                <button className="border-2 border-black bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer">
                                                    <img src="X.png" alt="visto bueno de color negro" className="w-5" />
                                                </button>
                                                <button className="border-2 border-black bg-black text-white px-4 py-2 rounded hover:bg-gray-900 cursor-pointer">
                                                    <img src="descargar-blanco.png" alt="visto bueno de color negro" className="w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {modalTipo === "agregarComprobante" && (
                            <div className="flex flex-col items-center h-full w-full justify-between">
                                <h2 className="text-2xl font-bold mb-4">Subir Comprobante</h2>
                                <div className="bg-white flex flex-col border-2 px-8 py-4 rounded-lg overflow-auto h-2/4 w-11/12">
                                    {archivo.length > 0 ? (
                                        <>
                                            {archivo.map((archivo, index) => (
                                                <div key={index} className="flex items-center justify-between w-full rounded border-2 p-2">
                                                    <span>{truncarNombre(archivo)}</span>
                                                    <button className="text-white px-2 py-1 rounded cursor-pointer hover:bg-gray-300  ml-2 border-2 border-black" onClick={() => handleEliminarArchivo(index)}>
                                                        <img src="X.png" alt="" className="w-4 " />
                                                    </button>
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <span className="">No se ha seleccionado ningún archivo</span>
                                    )}
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 cursor-pointer" onClick={() => setMostrarModal(false)}>Cancelar</button>
                                    <label htmlFor="file-upload" className="cursor-pointer bg-black py-1 px-2 text-white rounded hover:bg-gray-900 flex items-center ">
                                        <span className="text-center">Adjuntar <br /> Comprobante</span>
                                        <input id="file-upload" type="file" multiple className="hidden" onChange={handleArchivo}/>
                                    </label>
                                    <button className="bg-black text-white px-7 py-2 rounded hover:bg-gray-900 cursor-pointer">Subir</button>
                                </div>
                            </div>
                        )}
                    </Modal>
                </div>
            </div>
        </div>
    );
}
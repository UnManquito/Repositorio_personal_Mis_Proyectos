import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { BarraDesplegable } from "../componentes/BarraDesplegable"
import { Link } from "react-router-dom"
import { useAuth } from "../context/authContext"
import axios from "../api/axios"

export function Documentos() {
  {/* Solo del telefono un mini menu */}
  const [mostrarOverlay, setMostrarOverlay] = useState(true)
  {/* Modal para subir archivos */}
  const [mostrarModal, setMostrarModal] = useState(false)
  {/* Estado para manejar la carpeta actual */}
  const [carpetaActual, setCarpetaActual] = useState(null)
  const [carpetaSeleccionada, setCarpetaSeleccionada] = useState("")
  {/* Estado para manejar el tipo de archivo seleccionado */}
  const [tipoArchivo, setTipoArchivo] = useState("defecto") 
  const [filtros, setFiltros] = useState(false) //Aun no
  const [archivos, setArchivos] = useState([])
  const [archivo, setArchivo] = useState(null);
  const cerrarVistaArchivo = () => setArchivoVista(null);
  const [archivoVista, setArchivoVista] = useState(null);
  const [nombreArchivo, setNombreArchivo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const navigate = useNavigate()
  const esMovil = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const {logout} = useAuth()
  const {user} = useAuth()

  const carpetas = [
    { nombre: "Recetas", icono: "/carpeta.png", archivos: ["receta1.pdf", "receta2.pdf"] },
    { nombre: "Laboratorio", icono: "/carpeta.png", archivos: ["analisis1.pdf", "analisis2.pdf"] },
    { nombre: "Notas", icono: "/carpeta.png", archivos: ["nota1.pdf", "nota2.pdf"] },
  ]

  useEffect(() => {
    const fetchArchivos = async () => {
      try {
        const res = await axios.get("/documento");
        setArchivos(res.data);
      } catch (err) {
        console.error("Error al obtener archivos:", err);
      }
    };
    fetchArchivos();
  }, []);

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  // Manejar selección de archivo
  const handleDocumentoChange = (e) => {
    const file = e.target.files[0]
    setArchivo(file)
    if (!file) {
      setTipoArchivo("defecto")
      return
    }
    if (file.type === "application/pdf") setTipoArchivo("pdf")
    else if (
      file.type === "application/msword" ||
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) setTipoArchivo("word");
    else if (file.type.startsWith("image/")) setTipoArchivo("imagen")
    else setTipoArchivo("defecto");
  }

  const eliminarArchivo = async (_id) => {
    if (!window.confirm("¿Estás seguro de eliminar este archivo?")) return;
    try {
      await axios.delete(`/documento/${_id}`, { withCredentials: true });
      setArchivos(archivos.filter((archivo) => archivo._id !== _id));
    } catch (err) {
      console.error("Error al eliminar archivo:", err);
    }
  }

  // Manejar subida de archivo
  const handleSubirArchivo = async (e) => {
    e.preventDefault();
    if (!archivo || !carpetaSeleccionada || !nombreArchivo) {
      alert("Completa todos los campos y selecciona un archivo.");
      return;
    }
    const formData = new FormData();
    formData.append("documento", archivo);
    formData.append("carpeta", carpetaSeleccionada);
    formData.append("nombre", nombreArchivo);
    formData.append("descripcion", descripcion);

    try {
      await axios.post("/documento", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Archivo subido correctamente");
      setArchivo(null);
      setNombreArchivo("");
      setDescripcion("");
      setCarpetaSeleccionada("");
      setTipoArchivo("defecto");
      setMostrarModal(false);
      // Refresca la lista de archivos
      const res = await axios.get("/documento");
      setArchivos(res.data);
    } catch (err) {
      console.error("Error al subir el archivo:", err);
      alert("Error al subir el archivo");
    }
  };

  {/*}
  if (carpetaActual) {
    const carpeta = carpetas.find((carpeta) => carpeta.nombre === carpetaActual)
    return (
      <div className="relative min-h-screen w-full bg-[url('/FondoRegistro.png')] lg:hidden bg-cover flex flex-col items-center justify-start">
        <button className="mt-8 mb-4 px-4 py-2 bg-white rounded shadow hover:bg-gray-200" onClick={() => setCarpetaActual(null)}>
          Regresar
        </button>
        <h2 className="text-2xl font-bold text-white mb-6">{carpeta.nombre}</h2>
        <div className="bg-white rounded shadow p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">Archivos:</h3>
          <ul>
            {carpeta.archivos.map((archivo) => (
              <li key={archivo} className="mb-2">{archivo}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
*/}
  return (
  <> 
    {/* MODAL DE VISTA PREVIA DE ARCHIVO */}
      {archivoVista && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
         <div className="bg-white rounded-lg p-6 max-w-2xl w-full relative">
            <button
              className="absolute top-2 right-2 text-2xl"
              onClick={cerrarVistaArchivo}
            >
              ✕
            </button>
            <div className="flex flex-col items-start mb-4">
              <button
                className="text-xl bg-gray-200 rounded px-2 py-1 hover:bg-gray-300 mb-2 pl-0"
                onClick={() => {
                  const elem = document.getElementById('vista-archivo');
                  if (elem.requestFullscreen) elem.requestFullscreen();
                  else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
                  else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
                }}
              >
                ⛶ Pantalla completa
              </button>
              <h2 className="text-xl font-bold pl-1">{archivoVista.nombre}</h2>
            </div>
            {archivoVista.tipo === "pdf" ? (
                esMovil ? (
                  <a
                    href={`http://localhost:3000/uploads/${archivoVista.archivo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center text-blue-600 underline text-lg py-4"
                  >
                    Ver PDF en una nueva pestaña
                  </a>
                ) : (
                  <iframe
                    id="vista-archivo"
                    src={`http://localhost:3000/uploads/${archivoVista.archivo}`}
                    title={archivoVista.nombre}
                    className="w-full h-96"
                  />
                )
              ) : archivoVista.tipo === "imagen" ? (
                <img
                  id="vista-archivo"
                  src={`http://localhost:3000/uploads/${archivoVista.archivo}`}
                  alt={archivoVista.nombre}
                  className="max-w-full max-h-96 mx-auto"
                />
              ) : (
                <p>
                  <a
                    href={`http://localhost:3000/uploads/${archivoVista.archivo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Descargar o ver archivo
                  </a>
                </p>
              )}
          </div>
        </div>
      )}
    {/* Diseño de movil y Tablests */}
    <div className="block lg:hidden">
      {!carpetaActual ? (
        <div className="relative min-h-screen w-full bg-[url('/FondoRegistro.png')] bg-cover flex flex-col items-center justify-start px-2">
          <BarraDesplegable />
            {mostrarModal && (
              <div className="fixed inset-0 z-50 bg-[url('/FondoRegistro.png')] bg-cover flex items-center justify-center">
                {/* Botón cerrar */}
                <button onClick={() => setMostrarModal(false)} className="absolute top-6 right-8 text-3xl font-bold text-gray-700 hover:text-red-500" aria-label="Cerrar">
                  <img src="cerrar.png" alt="cerrar menu" className="w-8" />
                </button>
                {/* Contenido centrado */}
                <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center gap-6 p-8 rounded-lg shadow-lg">
                  {/* Iconos del tipo de archivo*/}
                  <div className="mb-10">
                    {tipoArchivo === "defecto" && <img src="/enviar.png" alt="documento por defecto" className="w-36 border-4 rounded-full p-1"/>}
                    {tipoArchivo === "pdf" && <img src="/pdf.png" alt="PDF" className="w-36 border-4 rounded-full p-1"/>}
                    {tipoArchivo === "word" && <img src="/doc.png" alt="Word" className="w-36 border-4 rounded-full p-1"/>}
                    {tipoArchivo === "imagen" && <img src="/png.png" alt="Imagen" className="w-36 border-4 rounded-full p-1"/>}
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer border-2 border-black bg-red-500 text-white px-4 py-2 rounded hover:bg-cyan-600">
                    <span>Adjuntar archivo</span>
                    <input type="file" className="hidden" onChange={handleDocumentoChange} />
                  </label>
                  <label className="w-full mb-4">
                    <span className="block mb-1 font-semibold text-black">Selecciona carpeta</span>
                    <select value={carpetaSeleccionada} onChange={e => setCarpetaSeleccionada(e.target.value)} className="w-full border-2 border-black rounded px-4 py-2 bg-white" required>
                      <option value="">Elige una carpeta</option>
                      {carpetas.map((carpeta) => (
                        <option key={carpeta.nombre} value={carpeta.nombre}>
                          {carpeta.nombre}
                        </option>
                      ))}
                    </select>
                  </label>
                  {/* Campos de texto */}
                  <input type="text" placeholder="Nombre del archivo" className="w-full border-2 border-black rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white" value={nombreArchivo} onChange={e => setNombreArchivo(e.target.value)}/>
                  <textarea placeholder="Descripción del archivo" className="w-full border-2 border-black rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none bg-white" rows={3} value={descripcion} onChange={e => setDescripcion(e.target.value)}/>
                  {/* Botones de subir/cancelar */}
                  <div className="flex w-full justify-between gap-4">
                    <button className="flex-1 bg-red-500 text-white border-black border-2 py-2 rounded hover:bg-red-700 transition" onClick={handleSubirArchivo}>Subir archivo</button>
                    <button
                      className="flex-1 bg-gray-300 text-gray-700 py-2 border-black border-2 rounded hover:bg-gray-400 transition"
                      onClick={() => setMostrarModal(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          <div className="flex flex-col gap-4 w-full">
            <div className="w-full py-6 px-4 mt-3 bg-white shadow-md">
              <h1 className="text-2xl font-bold text-center">Inicio</h1>
            </div>
            <div className="w-full bg-white shadow-md rounded-lg">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-start pl-3 pt-1.5">Tus archivos</h2>
                <img src="/LogoHC.png" alt="Logo" className="h-16" />
              </div>
              {/* Contenedor de carpetas */}
              <div className="flex flex-wrap justify-evenly mt-3 border-t-4">
                {carpetas.map((carpeta) => (
                  <button key={carpeta.nombre} onClick={() => setCarpetaActual(carpeta.nombre)} className="flex flex-col items-center focus:outline-none cursor-pointer mt-3">
                  <img src={carpeta.icono} alt={carpeta.nombre} className="w-24 sm:w-28 md:w-32 h-auto mb-2" />
                  <span className="font-semibold">{carpeta.nombre}</span>
                  </button>
                ))}
              </div>
              <div className="mt-6">
                <h2 className="text-xl font-bold text-start pl-3 pt-1.5">Archivos recién subidos</h2>
                <ul className="px-4 pb-4">
                  {archivos
                    .slice()
                    .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion))
                    .slice(0, 5)
                    .map((archivo) => (
                      <li key={archivo._id} className="mb-3 flex items-center gap-3 border-b pb-2">
                        {archivo.tipo === "pdf" && <img src="/pdf.png" alt="PDF" className="w-6 h-6" />}
                        {archivo.tipo === "word" && <img src="/doc.png" alt="Word" className="w-6 h-6" />}
                        {archivo.tipo === "imagen" && <img src="/png.png" alt="Imagen" className="w-6 h-6" />}
                        <button
                          onClick={() => setArchivoVista(archivo)}
                          className="hover:underline text-blue-600"
                        >
                          {archivo.nombre}
                        </button>
                        <span className="text-sm text-gray-500 ml-auto">
                          {new Date(archivo.fechaCreacion).toLocaleDateString()}
                        </span>
                      </li>
                    ))}
                  {archivos.length === 0 && (
                    <li className="text-gray-500">No hay archivos subidos aún.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          {/* Botones fijados */}
          <button className="fixed bottom-16 right-1/8 translate-x-1/3 z-10 focus:outline-none cursor-pointer" onClick={() => setMostrarModal(true)}>
            <video src="/subir.mp4" autoPlay loop muted className="w-24 rounded-2xl border-2" />
          </button>
          {/* Overlay semitransparente */}
          {mostrarOverlay && (
            <div className="absolute inset-0 opacity-95 bg-[url('/FondoRegistro.png')] bg-cover flex items-center justify-center z-30 overflow-y-auto py-2">
              <div className="flex flex-col gap-3">
                <h2 className="text-4xl font-sans text-black text-center">ʙɪᴇɴᴠᴇɴɪᴅᴏ</h2>
                <p className="text-2xl font-sans text-black text-center">¿Que necesitas?</p>
                <button onClick={() => setMostrarOverlay(false)} className="bg-white text-black text-2xl flex flex-col items-center justify-center rounded border-2 border-black hover:border-4">
                    <video src="/carpeta-gif.mp4" autoPlay loop muted className="w-32 h-auto" />

                    <span>Subir y ver tus Documentos</span>
                </button>
                <button onClick={() => setMostrarOverlay(false)} className="bg-white text-black text-2xl flex flex-col items-center justify-center rounded border-2 border-black hover:border-4">
                    <video src="/cuenta-de-usuario.mp4" autoPlay loop muted className="w-32 h-auto" />
                    <span>Ver tu Perfil</span>
                </button>
                <button onClick={() => setMostrarOverlay(false)} className="bg-white text-black flex flex-col items-center justify-center text-2xl rounded border-2 border-black hover:border-4">
                    <video src="/lista.mp4" autoPlay loop muted className="w-32" />
                    <span>Registro De Auditoria</span>
                </button>
                <button onClick={() => {setMostrarOverlay(false); navigate("/centros");
                  }} className="bg-white text-black flex flex-col items-center justify-center text-2xl rounded border-2 border-black hover:border-4">
                  <video src="/hospital.mp4" autoPlay loop muted className="w-28" />
                  <span>Agendamiento</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="relative min-h-screen w-full bg-[url('/FondoRegistro.png')] lg:hidden bg-cover flex flex-col items-center justify-start">
          <button className="mt-8 mb-4 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-gray-200" onClick={() => setCarpetaActual(null)}>
            Regresar
          </button>
          <h2 className="text-2xl font-bold text-white mb-6">{carpetaActual}</h2>
          <div className="bg-white rounded shadow p-2 w-full max-w-3xl">
            <h3 className="text-lg font-semibold mb-4">Archivos:</h3>
            <ul>
              {archivos
                .filter(a => a.carpeta === carpetaActual)
                .map((archivo) => (
                  <li key={archivo._id} className="mb-2 flex items-center gap-0 justify-between">
                    {archivo.tipo === "defecto" && <img src="/enviar.png" alt="Archivo por defecto" className="w-12 md:w-20" />}
                    {archivo.tipo === "pdf" && <img src="/pdf.png" alt="PDF" className="w-12 md:w-20" />}
                    {archivo.tipo === "word" && <img src="/doc.png" alt="Word" className="w-12 md:w-20" />}
                    {archivo.tipo === "imagen" && <img src="/png.png" alt="Imagen" className="w-12 md:w-20" />}
                    {archivo.nombre && (
                      <span className="text-black text-sm md:text-lg">{archivo.nombre}</span>
                    )}
                    {archivo.tipo === "pdf" && <span className="text-black ml-2 text-sm md:text-lg">PDF</span>}
                    {archivo.tipo === "word" && <span className="text-black ml-2 text-sm md:text-lg">Word</span>}
                    {archivo.tipo === "imagen" && <span className="text-black ml-2 text-sm md:text-lg">Imagen</span>}
                    {archivo.tipo === "defecto" && <span className="text-black ml-2 text-sm md:text-lg">Otro</span>}
                    {archivo.fechaCreacion && <span className="text-black ml-2 text-sm md:text-lg">({new Date(archivo.fechaCreacion).toLocaleDateString()})</span>}
                    {archivo.peso && <span className="text-black text-sm md:text-lg ml-2">({(archivo.peso / 1024).toFixed(2)} KB)</span>}
                    <button
                      className="text-blue-600 underline"
                      onClick={() => setArchivoVista(archivo)}
                    >
                      
                    </button>
                    {/* Botón de descarga */}
                    <a
                      href={`http://localhost:3000/descargar/${archivo.archivo}`}
                      download={archivo.nombre}
                      className="ml-2 text-green-600 hover:underline flex items-center"
                      title="Descargar archivo"
                      rel="noopener noreferrer"
                    >
                      <img src="/descargas.png" alt="Descargar" className="w-10 md:w-16" />
                    </a>
                    <button className="ml-2 text-red-500 hover:text-red-700" onClick={() => eliminarArchivo(archivo._id)}>
                      <img src="/borrar.png" alt="Eliminar" className="w-10 md:w-16" />
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
    {/* Diseño de PC */}
    <div className="hidden lg:flex">
      {!carpetaActual ? (
        <div className="flex min-h-screen">
          {/* Lado izquierdo rojo (20%) */}
          <div className="w-1/5 bg-white min-h-screen flex flex-col items-center justify-between border-r-2">
            <div className="mt-4 flex flex-col justify-center pb-5 gap-10 w-full">
              <img src="/LogoHC.png" alt="Logo" className="h-auto shadow-lg w-auto" />
              <ul className="flex flex-col gap-6">
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
                    <Link to="/centros" className="text-2xl font-semibold flex items-center gap-7 text-black hover:bg-cyan-300 py-2 px-4">
                        <img src="/centro-medico.png" alt="Agendamiento" className="w-12" />
                        Agendamiento
                    </Link>
                </li>
                <li>
                    <Link to="/cita" className="text-2xl font-semibold flex items-center text-black gap-7 hover:bg-cyan-300 py-2 px-4">
                        <img src="/dia-mundial-de-la-salud.png" alt="Gestionar cita" className="w-12" />
                        Gestionar Cita
                    </Link>
                </li>
                <li>
                    <Link to="/cita" className="text-2xl font-semibold flex items-center text-black gap-7 hover:bg-cyan-300 py-2 px-4">
                        <img src="/lista-de-verificacion.png" alt="Gestionar cita" className="w-12" />
                        Registro De Auditoria
                    </Link>
                </li>
                  {user?.role === "administrador" && (
                    <Link to="/desactivar" className="text-2xl font-semibold flex items-center gap-7 text-black hover:bg-cyan-300 py-2 px-4">
                        <img src="/falso.png" alt="Desactivar Usuarios" className="w-12" />
                        Desactivar Usuarios
                    </Link>
                  )}
              </ul>
            </div>
            <div className=" mb-4">
              <button className="bg-red-500 text-white text-2xl py-2 px-5 rounded hover:bg-red-700 transition-colors duration-300 mt-auto" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </div>
          </div>
          {/* Lado derecho blanco (80%) */}
          <div className="w-4/5 bg-[url('/FondoRegistro.png')] bg-cover min-h-screen flex gap-7">
            {/* Columna principal */}
            <div className="flex flex-col justify-start gap-10 w-3/5 ml-3 mt-3">
              <div className="bg-white border border-gray-300 rounded-lg shadow-md w-full h-auto">
                {!carpetaActual ? (
                  <>
                    <h1 className="text-2xl font-bold text-center py-8">INICIO</h1>
                    <div className="flex flex-wrap justify-evenly mt-3 border-t-4">
                      {carpetas.map((carpeta) => (
                        <button
                          key={carpeta.nombre}
                          onClick={() => setCarpetaActual(carpeta.nombre)}
                          className="flex flex-col items-center focus:outline-none cursor-pointer mt-3"
                        >
                          <img src={carpeta.icono} alt={carpeta.nombre} className="w-24 sm:w-28 md:w-32 h-auto mb-2" />
                          <span className="font-semibold">{carpeta.nombre}</span>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                  </>
                )}
              </div>
              <div className="bg-white border border-gray-300 rounded-lg shadow-md w-full h-3/5 overflow-y-auto">
                <h2 className="text-xl font-bold text-start py-8 ml-10">Archivos recién subidos</h2>
                  <ul className="px-10 pb-8">
                    {archivos
                      .slice()
                      .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion))
                      .slice(0, 5)
                      .map((archivo) => (
                        <li key={archivo._id} className="mb-3 flex items-center gap-3 border-b pb-2">
                          {archivo.tipo === "pdf" && <img src="/pdf.png" alt="PDF" className="w-6 h-6" />}
                          {archivo.tipo === "word" && <img src="/doc.png" alt="Word" className="w-6 h-6" />}
                          {archivo.tipo === "imagen" && <img src="/png.png" alt="Imagen" className="w-6 h-6" />}
                          <button
                            onClick={() => setArchivoVista(archivo)}
                            className="hover:underline text-blue-600"
                          >
                            {archivo.nombre}
                          </button>
                          <span className="text-sm text-gray-500 ml-auto">
                            {new Date(archivo.fechaCreacion).toLocaleDateString()}
                          </span>
                        </li>
                      ))}
                    {archivos.length === 0 && (
                      <li className="text-gray-500">No hay archivos subidos aún.</li>
                    )}
                  </ul>
              </div>

            </div>
            {/* Lateral derecho fijo con formulario */}
            <div className="flex items-center justify-center w-2/6 h-full">
              <div className="w-full flex flex-col items-center justify-center gap-3 p-4 rounded-lg shadow-lg bg-white ">
                {/* Iconos del tipo de archivo */}
                <div className="mb-10">
                  {tipoArchivo === "defecto" && <img src="/enviar.png" alt="documento por defecto" className="w-36 border-4 rounded-full p-1"/>}
                  {tipoArchivo === "pdf" && <img src="/pdf.png" alt="PDF" className="w-36 border-4 rounded-full p-1"/>}
                  {tipoArchivo === "word" && <img src="/doc.png" alt="Word" className="w-36 border-4 rounded-full p-1"/>}
                  {tipoArchivo === "imagen" && <img src="/png.png" alt="Imagen" className="w-36 border-4 rounded-full p-1"/>}
                </div>
                <label className="flex items-center gap-2 cursor-pointer border-2 border-black bg-red-500 text-white px-4 py-2 rounded hover:bg-cyan-600">
                  <span>Adjuntar archivo</span>
                  <input type="file" className="hidden" onChange={handleDocumentoChange} />
                </label>
                <label className="w-full mb-4">
                  <span className="block mb-1 font-semibold text-black">Selecciona carpeta</span>
                  <select value={carpetaSeleccionada} onChange={e => setCarpetaSeleccionada(e.target.value)} className="w-full border-2 border-black rounded px-4 py-2 bg-white" required>
                    <option value="">Elige una carpeta</option>
                    {carpetas.map((carpeta) => (
                      <option key={carpeta.nombre} value={carpeta.nombre}>
                        {carpeta.nombre}
                      </option>
                    ))}
                  </select>
                </label>
                <input type="text" placeholder="Nombre del archivo" className="w-full border-2 border-black rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white" value={nombreArchivo} onChange={e => setNombreArchivo(e.target.value)}/>
                <textarea placeholder="Descripción del archivo" className="w-full border-2 border-black rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none bg-white" rows={3} value={descripcion} onChange={e => setDescripcion(e.target.value)}/>
                <div className="flex w-full justify-between gap-4">
                  <button className="flex-1 bg-red-500 text-white border-black border-2 py-2 rounded hover:bg-red-700 transition" onClick={handleSubirArchivo}>Subir archivo</button>
                  <button
                    className="flex-1 bg-gray-300 text-gray-700 py-2 border-black border-2 rounded hover:bg-gray-400 transition"
                    // Puedes agregar aquí lógica para limpiar el formulario si lo deseas
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Vista de carpeta actual en PC (Osea cuando se habre una carpeta y aparezca como si se habriera de adentro)
        <div className="flex min-h-screen">
          {/* Lado izquierdo rojo (20%) */}
          <div className="w-1/5 bg-white min-h-screen flex flex-col items-center justify-between border-r-2">
            <div className="mt-4 flex flex-col justify-center pb-5 gap-10 w-full">
              <img src="/LogoHC.png" alt="Logo" className="h-auto shadow-lg w-auto" />
              <ul className="flex flex-col gap-7">
                <li>
                  <a href="/inicio" className="text-2xl font-semibold flex items-center gap-7  text-black hover:bg-cyan-300  py-2 px-4">
                  <img src="/pagina-de-inicio.png" alt="Inicio" className="w-12" />
                  Inicio
                  </a>
                </li>
                <li>
                  <a href="/perfil" className="text-2xl font-semibold flex items-center gap-7  text-black hover:bg-cyan-300  py-2 px-4">
                  <img src="/usuario.png" alt="Perfil" className="w-12" />
                  Perfil
                  </a>
                </li>
                <li>
                  <a href="/centros" className="text-2xl font-semibold flex items-center gap-7 text-black hover:bg-cyan-300 py-2 px-4">
                  <img src="/centro-medico.png" alt="Agendamiento" className="w-12" />
                  Agendamiento
                  </a>
                </li>
                 <li>
                  <a href="/inicio" className="text-2xl font-semibold flex items-center text-black gap-7 hover:bg-cyan-300 py-2 px-4">
                  <img src="/dia-mundial-de-la-salud.png" alt="Gestionar cita" className="w-12" />
                  Gestionar Cita
                  </a>
                </li>
                <li>
                  <a href="/inicio" className="text-2xl font-semibold flex items-center text-black gap-7 hover:bg-cyan-300 py-2 px-4">
                  <img src="/lista-de-verificacion.png" alt="Gestionar cita" className="w-12" />
                  Registro De Auditoria
                  </a>
                </li>
                {user?.role === "administrador" && (
                  <li>
                    <a href="/desactivar" className="text-2xl font-semibold flex items-center gap-7 text-black hover:bg-cyan-300 py-2 px-4">
                      <img src="/falso.png" alt="Desactivar" className="w-12" />
                      Desactivar Usuario
                    </a>
                  </li>
                )}
              </ul>
            </div>
            <div className=" mb-4">
              <button className="bg-red-500 text-white text-2xl py-2 px-5 rounded hover:bg-red-700 transition-colors duration-300 mt-auto" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </div>
          </div>
          {/* Lado derecho blanco (80%) */}
          <div className="w-4/5 bg-[url('/FondoRegistro.png')] bg-cover min-h-screen flex gap-7">
            {/* Columna principal */}
            <div className="flex flex-col justify-start gap-10 w-3/5 ml-3 mt-3">
              <div className="bg-white border border-gray-300 rounded-lg shadow-md w-full h-auto">
                {!carpetaActual ? (
                  <>
                    <h1 className="text-2xl font-bold text-center py-8">Inicio</h1>
                    <div className="flex flex-wrap justify-evenly mt-3 border-t-4">
                      {carpetas.map((carpeta) => (
                        <button
                          key={carpeta.nombre}
                          onClick={() => setCarpetaActual(carpeta.nombre)}
                          className="flex flex-col items-center focus:outline-none cursor-pointer mt-3"
                        >
                          <img src={carpeta.icono} alt={carpeta.nombre} className="w-24 sm:w-28 md:w-32 h-auto mb-2" />
                          <span className="font-semibold">{carpeta.nombre}</span>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      className="mt-3 ml-5 p-3 bg-red-500 text-white rounded border-2 border-black hover:bg-red-600"
                      onClick={() => setCarpetaActual(null)}
                    >
                      Regresar
                    </button>
                    <h2 className="text-4xl font-bold text-center py-4">{carpetaActual}</h2>
                    <div className="flex flex-col items-start border-t-1">
                      <h3 className="text-lg self-center font-semibold mb-4">Archivos:</h3>
                      <ul>
                        {archivos
                          .filter(a => a.carpeta === carpetaActual)
                          .map((archivo) => (
                            <li key={archivo._id} className="mb-2 flex items-center justify-between ml-5 hover:bg-gray-100 hover:border-x-1 p-2 cursor-pointer">
                              <button
                                onClick={() => setArchivoVista(archivo)}
                                className="flex items-center gap-1 xl:text-lg text-blue-600 underline"
                              >
                                {archivo.tipo === "defecto" && <img src="/enviar.png" alt="Documento por defecto" className="w-1/8 h-auto" />}
                                {archivo.tipo === "pdf" && <img src="/pdf.png" alt="PDF" className="w-1/8 h-auto" />}
                                {archivo.tipo === "word" && <img src="/doc.png" alt="Word" className="w-1/8 h-auto" />}
                                {archivo.tipo === "imagen" && <img src="/png.png" alt="Imagen" className="w-1/8 h-auto" />}
                                {archivo.nombre}
                                {archivo.tipo === "pdf" && <span className="text-black ml-2">PDF</span>}
                                {archivo.tipo === "word" && <span className="text-black ml-2">Word</span>}
                                {archivo.tipo === "imagen" && <span className="text-black ml-2">Imagen</span>}
                                {archivo.tipo === "defecto" && <span className="text-black ml-2">Otro</span>}
                                {archivo.fechaCreacion && <span className="text-black ml-2">({new Date(archivo.fechaCreacion).toLocaleDateString()})</span>}
                                {archivo.peso && <span className="text-black ml-2">({(archivo.peso / 1024).toFixed(2)} KB)</span>}
                              </button>
                              {/* Botón de descarga */}
                              <a
                                href={`http://localhost:3000/descargar/${archivo.archivo}`}  // <-- CAMBIADO A LA NUEVA RUTA
                                className="ml-2 text-green-600 hover:underline flex items-center"
                                title="Descargar archivo"
                                rel="noopener noreferrer"
                              >
                                <img src="/descargas.png" alt="Descargar" className="w-13 h-8" />
                              </a>
                              <button className="ml-2 text-red-500 hover:text-red-700" onClick={() => eliminarArchivo(archivo._id)}>
                                <img src="/borrar.png" alt="Eliminar" className="w-20 h-10 xl:max-w-fit" />
                              </button>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
              <div className="bg-white border border-gray-300 rounded-lg shadow-md w-full h-3/5">
                <h2 className="text-xl font-bold text-start py-8 ml-10">Archivos recien subidos</h2>
                <ul className="px-10 pb-8">
                    {archivos
                      .slice()
                      .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion))
                      .slice(0, 5)
                      .map((archivo) => (
                        <li key={archivo._id} className="mb-3 flex items-center gap-3 border-b pb-2">
                          {archivo.tipo === "pdf" && <img src="/pdf.png" alt="PDF" className="w-6 h-6" />}
                          {archivo.tipo === "word" && <img src="/doc.png" alt="Word" className="w-6 h-6" />}
                          {archivo.tipo === "imagen" && <img src="/png.png" alt="Imagen" className="w-6 h-6" />}
                          <button
                            onClick={() => setArchivoVista(archivo)}
                            className="hover:underline text-blue-600"
                          >
                            {archivo.nombre}
                          </button>
                          <span className="text-sm text-gray-500 ml-auto">
                            {new Date(archivo.fechaCreacion).toLocaleDateString()}
                          </span>
                        </li>
                      ))}
                    {archivos.length === 0 && (
                      <li className="text-gray-500">No hay archivos subidos aún.</li>
                    )}
                  </ul>
              </div>
            </div>
            {/* Lateral derecho fijo con formulario */}
            <div className="flex items-center justify-center w-2/6 h-full">
              <div className="w-full flex flex-col items-center justify-center gap-3 p-4 rounded-lg shadow-lg bg-white ">
                {/* Iconos del tipo de archivo */}
                <div className="mb-10">
                  {tipoArchivo === "defecto" && <img src="/enviar.png" alt="documento por defecto" className="w-36 border-4 rounded-full p-1"/>}
                  {tipoArchivo === "pdf" && <img src="/pdf.png" alt="PDF" className="w-36 border-4 rounded-full p-1"/>}
                  {tipoArchivo === "word" && <img src="/doc.png" alt="Word" className="w-36 border-4 rounded-full p-1"/>}
                  {tipoArchivo === "imagen" && <img src="/png.png" alt="Imagen" className="w-36 border-4 rounded-full p-1"/>}
                </div>
                <label className="flex items-center gap-2 cursor-pointer border-2 border-black bg-red-500 text-white px-4 py-2 rounded hover:bg-cyan-600">
                  <span>Adjuntar archivo</span>
                  <input type="file" className="hidden" name="documento" onChange={handleDocumentoChange} />
                </label>
                <label className="w-full mb-4">
                  <span className="block mb-1 font-semibold text-black">Selecciona carpeta</span>
                  <select value={carpetaSeleccionada} onChange={e => setCarpetaSeleccionada(e.target.value)} className="w-full border-2 border-black rounded px-4 py-2 bg-white" required>
                    <option value="">Elige una carpeta</option>
                    {carpetas.map((carpeta) => (
                      <option key={carpeta.nombre} value={carpeta.nombre}>
                        {carpeta.nombre}
                      </option>
                    ))}
                  </select>
                </label>
                <input type="text" placeholder="Nombre del archivo" className="w-full border-2 border-black rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white" value={nombreArchivo} onChange={e => setNombreArchivo(e.target.value)}/>
                <textarea placeholder="Descripción del archivo" className="w-full border-2 border-black rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none bg-white" rows={3} value={descripcion} onChange={e => setDescripcion(e.target.value)}/>
                <div className="flex w-full justify-between gap-4">
                  <button className="flex-1 bg-red-500 text-white border-black border-2 py-2 rounded hover:bg-red-700 transition" onClick={handleSubirArchivo}>Subir archivo</button>
                  <button
                    className="flex-1 bg-gray-300 text-gray-700 py-2 border-black border-2 rounded hover:bg-gray-400 transition"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </>
  )

}
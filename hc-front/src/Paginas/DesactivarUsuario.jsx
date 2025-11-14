import React, { useState, useEffect } from "react"
import { useAuth } from "../context/authContext"
import axios from "axios"
import { Link } from "react-router-dom"

export function DesactivarUsuario() {
  const { desactivarUsuario, activarUsuario } = useAuth()
  const [usuarios, setUsuarios] = useState([])
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)
  const [ordenASC, setOrdenASC] = useState(true)
  const [ordenarPor, setOrdenarPor] = useState("nombre")
  const [ordenTipoAsc, setOrdenTipoAsc] = useState(true)
  const [busquedaId, setBusquedaId] = useState("")

  // Cargar usuarios al montar
  useEffect(() => {
    cargarUsuarios()
  }, [])

  const cargarUsuarios = async () => {
    const res = await axios.get("http://localhost:3000/api/usuarios", {
      withCredentials: true
    })
    setUsuarios(res.data)
  }

  const handleToggle = async () => {
    if (!usuarioSeleccionado) return
    if (usuarioSeleccionado.activo) {
      await desactivarUsuario(usuarioSeleccionado._id)
    } else {
      await activarUsuario(usuarioSeleccionado._id)
    }
    setMostrarConfirmacion(false)
    setUsuarioSeleccionado(null)
    cargarUsuarios()
  }
  const ordenarUsuarios = (usuarios, campo) => {
    return usuarios.sort((a, b) => {
      if (a[campo] < b[campo]) return ordenASC ? -1 : 1
      if (a[campo] > b[campo]) return ordenASC ? 1 : -1
      return 0
    })
  }
  const ordenarPorTipo = () => {
    setOrdenTipoAsc((prev) => !prev);
    setUsuarios((prevUsuarios) =>
      [...prevUsuarios].sort((a, b) => {
        if (ordenTipoAsc) {
          // Orden ascendente: médico antes que paciente
          return a.tipo.localeCompare(b.tipo);
        } else {
          // Orden descendente: paciente antes que médico
          return b.tipo.localeCompare(a.tipo);
        }
      })
    );
  };

  const ordenarPorEstado = () => {
    setOrdenASC((prev) => !prev)
    setUsuarios((prevUsuarios) => ordenarUsuarios([...prevUsuarios], "activo"))
  }

  const usuariosFiltrados = usuarios.filter(usuario =>
    usuario._id && usuario._id.toLowerCase().includes(busquedaId.toLowerCase())
  )

  return (
    <div className="min-h-screen w-full bg-white flex items-center bg-[url('/FondoRegistro.png')] bg-cover justify-center px-2 py-8">
      <div className="w-full max-w-5xl bg-gray-100 rounded-lg shadow-lg p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6 text-center">Administrar Usuarios</h1>
        <Link to="/inicio" className="self-start border-1 border-black mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 cursor-pointer">
          Regresar a la pagina de inicio
        </Link>
        <div className="w-full">
          <div className="flex justify-start mb-4">
            <input type="text" placeholder="Buscar por ID" value={busquedaId} onChange={(e) => setBusquedaId(e.target.value)} className="border-1 rounded px-4 py-2"/>
          </div>
          <table className="w-full bg-white rounded-lg shadow text-center">
            <thead>
              <tr className="bg-cyan-600 text-white">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Nombre y Apellido</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4 cursor-pointer hover:bg-cyan-700" onClick={ordenarPorTipo}>
                  Tipo {ordenTipoAsc ? "↑" : "↓"}
                </th>
                <th className="py-2 px-4 cursor-pointer hover:bg-cyan-700" onClick={ordenarPorEstado}>
                  Estado {ordenASC ? "↑" : "↓"}
                </th>
                <th className="py-2 px-4">Acción</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((usuario) => (
                <tr key={usuario._id}>
                  <td className="py-2 px-4">{usuario._id}</td>
                  <td className="py-2 px-4">{usuario.nombre}</td>
                  <td className="py-2 px-4">{usuario.email}</td>
                  <td className="py-2 px-4">{usuario.tipo}</td>
                  <td className="py-2 px-4">
                    <span className={usuario.activo ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                      {usuario.activo ? "Activo" : "Desactivado"}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      className={`px-4 py-2 rounded cursor-pointer text-white transition ${
                        usuario.activo
                          ? "bg-red-500 hover:bg-red-700"
                          : "bg-green-500 hover:bg-green-700"
                      }`}
                      onClick={() => {
                        setUsuarioSeleccionado(usuario)
                        setMostrarConfirmacion(true)
                      }}
                    >
                      {usuario.activo ? "Desactivar" : "Activar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal de confirmación */}
      {mostrarConfirmacion && (
        <div className="fixed inset-0 bg-black opacity-95 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
            <p className="text-xl mb-6">¿Estas seguro?</p>
            <div className="flex gap-4">
              <button
                className="px-6 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
                onClick={handleToggle}
              >
                Sí
              </button>
              <button
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={() => setMostrarConfirmacion(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
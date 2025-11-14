import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Recuperar } from './Paginas/RecuperarContraseña'
import { PagLogin } from './Paginas/paglogin'
import { Cambiar } from './Paginas/CambiarContraseña'
import { Documentos } from './Paginas/Inicio(Documentos)'
import { DesactivarUsuario } from './Paginas/DesactivarUsuario'
import { AuthProvider } from './context/authContext'
import {RegistroPaciente} from './Paginas/Paciente'
import {RegistroMedico} from './Paginas/Medico'

function App() {
  return <div>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PagLogin/>} />
          <Route path="/paciente" element={<RegistroPaciente/>} />
          <Route path="/medico" element={<RegistroMedico/>} />
          <Route path="/recuperar" element={<Recuperar/>} />
          <Route path="/cambiar" element={<Cambiar/>} />
          <Route path="/inicio" element={<Documentos/>} />
          <Route path="/desactivar" element={<DesactivarUsuario/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </div>
}

export default App


import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Principal } from './Paginas/Principal';
import { Inicio_sesion } from './Paginas/iniciar_sesion';
import { Registro } from './Paginas/Registro';
import {Gastos_comunes} from './Paginas/gastos_comunes';
import {Comunicacion} from './Paginas/comunicacion';
import { Perfil_usuario } from './Paginas/perfil_usuario';
import { Finanzas } from './Paginas/finanzas';
import { Finanzas_Torre } from './Paginas/finanzas_torre';
import { Finanzas_Torre_Co } from './Paginas/finanzas_torre_co';
import { PerfilCopropietario } from './Paginas/perfil_copropietario';
import { EspacioComun } from './Paginas/espacio_comun';

function App() {
  return <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/sesion" element={<Inicio_sesion />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/gastos" element={<Gastos_comunes />} />
          <Route path="/comunicacion" element={<Comunicacion />} />
          <Route path="/perfil" element={<Perfil_usuario />} />
          <Route path="/finanzas" element={<Finanzas />} />
          <Route path="/finanzas/torre" element={<Finanzas_Torre />} />
          <Route path="/finanzas/torre_2" element={<Finanzas_Torre_Co />} />
          <Route path="/finanzas/copropietario" element={<PerfilCopropietario />} />
          <Route path="/espacio_comun" element={<EspacioComun />} />
        </Routes>
      </BrowserRouter>
  </div>
}

export default App

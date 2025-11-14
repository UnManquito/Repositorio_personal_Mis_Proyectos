import React, { useState } from "react";
import { Link } from "react-router-dom";

function generarHoras(inicio, fin, intervalo) {
  const resultado = [];
  let [h, m] = inicio.split(":").map(Number);
  const [hFin, mFin] = fin.split(":").map(Number);

  while (h < hFin || (h === hFin && m < mFin)) {
    const inicioStr = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    m += intervalo;
    if (m >= 60) {
      h += Math.floor(m / 60);
      m = m % 60;
    }
    const finStr = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    resultado.push(`${inicioStr} - ${finStr}`);
  }
  return resultado;
}

function estaReservado(dia, bloqueInicio, bloqueFin) {
  return reservasAgenda.some(r =>
    r.dia === dia &&
    r.inicio <= bloqueInicio &&
    r.fin > bloqueInicio
  );
}

export function EspacioComun() {
  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const reservasAgenda = [
    { dia: "Martes", inicio: "10:00", fin:"12:00", espacio: "Gimnasio", usuario: "Juan Pérez", unidad: "101" },
    { dia: "Jueves", inicio: "14:00", fin:"16:00", espacio: "Sala de Reuniones", usuario: "María Gómez", unidad: "202" },
    { dia: "Viernes", inicio: "18:00", fin:"20:00", espacio: "Quincho", usuario: "Carlos Ruiz", unidad: "303" },
  ];
  const horasPosibles = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
  ];

  // Estados para hora de inicio, término e intervalo
  const [horaInicio, setHoraInicio] = useState("08:00");
  const [horaFin, setHoraFin] = useState("22:00");
  const [intervalo, setIntervalo] = useState(60);

  // Genera los bloques de horas dinámicamente
  const horasDia = generarHoras(horaInicio, horaFin, intervalo);

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
              <img src="espacio-comun.png" alt="" className="w-10 md:w-14"/>
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
      <div className="flex flex-1 flex-col items-start justify-start max-w-full h-full px-5 py-5 gap-5">
        <h1 className="text-black text-4xl tracking-wider font-bold">
          Espacio Común
        </h1>
        <div className="flex overflow-auto max-w-full items-stretch max-h-full h-[120vh] w-full rounded-lg border-2 bg-white p-4">
          {/* Controles para horario */}
          <div className="flex flex-col items-start h-full">
            <div className="flex gap-4 w-full h-full mb-4">
                <div>
                  <label className="block font-semibold mb-1">Hora inicio:</label>
                  <select value={horaInicio} onChange={e => setHoraInicio(e.target.value)} className="border rounded px-2 py-1">
                    {horasPosibles.map(hora => (
                      <option key={hora} value={hora}>{hora}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Hora término:</label>
                  <select value={horaFin} onChange={e => setHoraFin(e.target.value)} className="border rounded px-2 py-1">
                    {horasPosibles.map(hora => (
                      <option key={hora} value={hora}>{hora}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Intervalo:</label>
                  <select value={intervalo} onChange={e => setIntervalo(Number(e.target.value))} className="border rounded px-2 py-1">
                    <option value={30}>30 minutos</option>
                    <option value={45}>45 minutos</option>
                    <option value={60}>1 hora</option>
                  </select>
                </div>
                <button className="bg-green-600 text-white px-4 py-2 mt-6 rounded hover:bg-green-800">
                  Agendar
                </button>
                <button className="bg-black text-white px-4 py-2 mt-6 rounded hover:bg-gray-800">
                  Gestionar Reservas
                </button>
              </div>
              <table className="w-3/12  border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border px-3 py-1 min-h-[10px] bg-gray-100">Hora</th>
                    {diasSemana.map(dia => (
                      <th key={dia} className="border px-3 min-h-[180px] bg-gray-100">{dia}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {horasDia.map(bloque => {
                    const [bloqueInicio, bloqueFin] = bloque.split(" - ");
                    return (
                      <tr key={bloque}>
                      <td className="border px-3 py-5 font-semibold bg-gray-50">{bloque}</td>
                      {diasSemana.map(dia => {
                        const reserva = reservasAgenda.find(r => r.dia === dia && r.inicio <= bloqueInicio && r.fin > bloqueInicio);
                        return (
                          <td key={dia} className="border px-2 py-1 text-center">
                            {reserva ? (
                              <span className="rounded px-2 py-1 text-sm">
                                <img src="/espacio-comun.png" alt="" className="ml-2 w-10"/>
                                {reserva.espacio}<br />{reserva.unidad}
                              </span>
                            ) : ""}
                          </td>
                        );
                      })}
                    </tr>
                  )})}
                </tbody>
              </table>
          </div>
          <div className="flex flex-col border-2 ml-4 justify-start gap-5 h-fit items-center sticky top-0 p-2">
            <div className="flex flex-col justify-start p-2">
              <h2 className="text-black text-2xl text-center tracking-wider font-bold">
                Reservas de la semana
              </h2>
              <ul className="list-disc pl-5">
                {reservasAgenda.map((reserva, index) => (
                  <li key={index} className="mb-2">
                    {reserva.espacio} - {reserva.unidad} ({reserva.dia} {reserva.inicio} - {reserva.fin})
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-start p-2">
              <h2 className="text-black text-2xl text-center tracking-wider font-bold">
                Tus reservas
              </h2>
              <ul className="list-disc pl-5">
                {reservasAgenda.map((reserva, index) => (
                  <li key={index} className="mb-2">
                    {reserva.espacio} - {reserva.unidad} ({reserva.dia} {reserva.inicio} - {reserva.fin})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema0 } from "../schema/auth.js";

export function PagRegistro() {
  const [tipo, setTipo] = useState("paciente");
  const { handleSubmit, formState: { errors }, register } = useForm({
    resolver: zodResolver(registerSchema0),
    defaultValues: {
      tipo: "paciente",
      paciente: {
        nombre: "",
        rut: "",
        email: "",
        telefono: "",
        emergencia: "",
        direccion: "",
        sexo: "",
        prevision: "",
        password: "",
        terminos: false,
      },
      medico: {
        nombre: "",
        rut: "",
        email: "",
        telefono: "",
        direccion: "",
        sexo: "",
        especialidad: "",
        establecimiento: "",
        password: "",
        terminos: false,
      },
    },
  });

  const onSubmit = async (values) => {
    console.log("Tipo seleccionado:", tipo);
    const data = {
      tipo,
      datos: tipo === "paciente" ? values.paciente : values.medico,
    };
    console.log("Datos procesados:", data);
    
  };

  return (
    <div className="min-h-screen bg-[url('/FondoRegistro.png')] bg-cover bg-center flex items-center justify-center px-4">
      <div className="absolute top-4 left-4">
        <img src="/LogoHC.png" alt="Logo" className="h-26" />
      </div>
      <div className="relative bg-white w-full max-w-md min-h-[500px] rounded-3xl shadow-lg overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Toggle */}
          <div className="flex justify-center mt-6 -mb-3 space-x-2 z-10 relative">
            <button
              type="button"
              onClick={() => setTipo("paciente")}
              className={`px-5 py-2 rounded-full font-semibold ${
                tipo === "paciente" ? "bg-red-600 text-white" : "bg-gray-200"
              } transition`}
            >
              Paciente
            </button>
            <button
              type="button"
              onClick={() => setTipo("medico")}
              className={`px-5 py-2 rounded-full font-semibold ${
                tipo === "medico" ? "bg-red-600 text-white" : "bg-gray-200"
              } transition`}
            >
              Médico
            </button>
          </div>

          {/* Slide container */}
          <div
            className="flex w-[200%] transition-transform duration-500 ease-in-out"
            style={{ transform: tipo === "paciente" ? "translateX(0)" : "translateX(-50%)" }}
          >
            {/* Formulario Paciente */}
            <div className="w-1/2 px-8 py-12 flex flex-col items-center justify-center gap-4">
              <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">Registro Paciente</h2>
              <input {...register("paciente.nombre")} type="text" placeholder="Nombre completo" className="w-8/12 border rounded px-4 py-2" />
              {errors.paciente?.nombre && <p className="text-red-500 text-xs">{errors.paciente.nombre.message}</p>}
              
              <input {...register("paciente.rut")} type="text" placeholder="Rut" className="w-8/12 border rounded px-4 py-2" />
              {errors.paciente?.rut && <p className="text-red-500 text-xs">{errors.paciente.rut.message}</p>}
              
              <input {...register("paciente.email")} type="email" placeholder="Correo electrónico" className="w-8/12 border rounded px-4 py-2" />
              {errors.paciente?.email && <p className="text-red-500 text-xs">{errors.paciente.email.message}</p>}
              
              <input {...register("paciente.telefono")} type="tel" placeholder="Teléfono" className="w-8/12 border rounded px-4 py-2" />
              {errors.paciente?.telefono && <p className="text-red-500 text-xs">{errors.paciente.telefono.message}</p>}
              
              <input {...register("paciente.emergencia")} type="tel" placeholder="Teléfono de emergencia" className="w-8/12 border rounded px-4 py-2" />
              {errors.paciente?.emergencia && <p className="text-red-500 text-xs">{errors.paciente.emergencia.message}</p>}
              
              <input {...register("paciente.direccion")} type="text" placeholder="Dirección" className="w-8/12 border rounded px-4 py-2" />
              {errors.paciente?.direccion && <p className="text-red-500 text-xs">{errors.paciente.direccion.message}</p>}
              
              <select {...register("paciente.sexo")} className="w-8/12 border rounded px-4 py-2">
                <option value="">Seleccione su sexo</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
              </select>
              {errors.paciente?.sexo && <p className="text-red-500 text-xs">{errors.paciente.sexo.message}</p>}
              
              <select {...register("paciente.prevision")} className="w-8/12 border rounded px-4 py-2">
                <option value="">Previsión de Salud:</option>
                <option value="fonasa">Fonasa</option>
                <option value="isapres">Isapres</option>
              </select>
              {errors.paciente?.prevision && <p className="text-red-500 text-xs">{errors.paciente.prevision.message}</p>}
              
              <input {...register("paciente.password")} type="password" placeholder="Contraseña" className="w-8/12 border rounded px-4 py-2" />
              {errors.paciente?.password && <p className="text-red-500 text-xs">{errors.paciente.password.message}</p>}
              
              <div className="flex items-center gap-2">
                <input type="checkbox" {...register("paciente.terminos")} className="w-4 h-4" />
                <label className="text-black text-sm">He leído y acepto los términos y condiciones.</label>
              </div>
              {errors.paciente?.terminos && <p className="text-red-500 text-xs">{errors.paciente.terminos.message}</p>}
              
              <button type="submit" className="bg-red-600 px-20 py-2 rounded-xl text-white">
                Registrarse
              </button>
            </div>

            {/* Formulario Médico */}
            <div className="w-1/2 px-8 py-12 flex flex-col items-center justify-center gap-4">
              <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">Registro Médico</h2>
              <input {...register("medico.nombre")} type="text" placeholder="Nombre completo" className="w-8/12 border rounded px-4 py-2" />
              {errors.medico?.nombre && <p className="text-red-500 text-xs">{errors.medico.nombre.message}</p>}
              
              <input {...register("medico.rut")} type="text" placeholder="Rut" className="w-8/12 border rounded px-4 py-2" />
              {errors.medico?.rut && <p className="text-red-500 text-xs">{errors.medico.rut.message}</p>}
              
              <input {...register("medico.email")} type="email" placeholder="Correo electrónico" className="w-8/12 border rounded px-4 py-2" />
              {errors.medico?.email && <p className="text-red-500 text-xs">{errors.medico.email.message}</p>}
              
              <input {...register("medico.telefono")} type="tel" placeholder="Teléfono" className="w-8/12 border rounded px-4 py-2" />
              {errors.medico?.telefono && <p className="text-red-500 text-xs">{errors.medico.telefono.message}</p>}
              
              <input {...register("medico.direccion")} type="text" placeholder="Dirección" className="w-8/12 border rounded px-4 py-2" />
              {errors.medico?.direccion && <p className="text-red-500 text-xs">{errors.medico.direccion.message}</p>}
              
              <select {...register("medico.sexo")} className="w-8/12 border rounded px-4 py-2">
                <option value="">Seleccione su sexo</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
              </select>
              {errors.medico?.sexo && <p className="text-red-500 text-xs">{errors.medico.sexo.message}</p>}
              
              <input {...register("medico.especialidad")} type="text" placeholder="Especialidad" className="w-8/12 border rounded px-4 py-2" />
              {errors.medico?.especialidad && <p className="text-red-500 text-xs">{errors.medico.especialidad.message}</p>}
              
              <input {...register("medico.establecimiento")} type="text" placeholder="Establecimiento de atención" className="w-8/12 border rounded px-4 py-2" />
              {errors.medico?.establecimiento && <p className="text-red-500 text-xs">{errors.medico.establecimiento.message}</p>}
              
              <input {...register("medico.password")} type="password" placeholder="Contraseña" className="w-8/12 border rounded px-4 py-2" />
              {errors.medico?.password && <p className="text-red-500 text-xs">{errors.medico.password.message}</p>}
              
              <div className="flex items-center gap-2">
                <input type="checkbox" {...register("medico.terminos")} className="w-4 h-4" />
                <label className="text-black text-sm">He leído y acepto los términos y condiciones.</label>
              </div>
              {errors.medico?.terminos && <p className="text-red-500 text-xs">{errors.medico.terminos.message}</p>}
              
              <button type="submit" className="bg-red-600 px-20 py-2 rounded-xl text-white">
                Registrarse
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchemapaciente } from "../schema/auth.js";
import { ArrowLeft} from "lucide-react";
import { useAuth } from "../context/authContext.jsx";
import { use } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


export function RegistroPaciente() {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchemapaciente),
});


  const onSubmit = async (values) => {
    const data = {
      tipo: "paciente",
      ...values,
    };
    await signup(data);
    console.log(data);
  };

  useEffect(() => {
      if (isAuthenticated) {
        toast.success('Registro exitoso', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        setTimeout(() => navigate('/inicio'), 3000); // Navegar después de 3 segundos
      }
    }, [isAuthenticated, navigate]);
  

  return (
    <div className="min-h-screen bg-[url('/FondoRegistro.png')] bg-cover bg-center flex items-center justify-center px-4">
      <div className="absolute top-4 left-4">
        <img src="/LogoHC.png" alt="Logo" className="h-14 sm:h-20" />
      </div>
      <div className="relative bg-white w-full max-w-md min-h-[500px] rounded-3xl shadow-lg overflow-hidden my-10">
         {/* Flecha de regreso */}
            <button
              onClick={() => window.history.back()}
              className="absolute top-4 left-4 text-red-600 hover:text-red-800 transition-colors"
              aria-label="Volver"
            >
              <ArrowLeft className="w-8 h-8 stroke-[2.5]" />
            </button>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-8 py-7 flex flex-col items-center justify-center gap-1">
          <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">Registro Paciente</h2>

          <input {...register("nombre")} type="text" className="w-8/12 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nombre completo" />
          {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre.message}</span>}

          <input {...register("rut")} type="text" className="w-8/12 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="RUT" />
          {errors.rut && <span className="text-red-500 text-sm">{errors.rut.message}</span>}

          <input {...register("email")} type="email" className="w-8/12 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Correo electrónico" />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

          <input {...register("telefono")} type="tel" className="w-8/12 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Teléfono" />
          {errors.telefono && <span className="text-red-500 text-sm">{errors.telefono.message}</span>}

          <input {...register("telefonoEmergencia")} type="tel" className="w-8/12 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Teléfono de emergencia" />
          {errors.telefonoEmergencia && <span className="text-red-500 text-sm">{errors.telefonoEmergencia.message}</span>}

          <input {...register("direccion")} type="text" className="w-8/12 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Dirección" />
          {errors.direccion && <span className="text-red-500 text-sm">{errors.direccion.message}</span>}

          <select {...register("sexo")} className="w-8/12 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Seleccione su sexo</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
          {errors.sexo && <span className="text-red-500 text-sm">{errors.sexo.message}</span>}

          <input {...register("fnacimiento")} type="date" className="w-8/12 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Fecha de nacimiento"/>
          {errors.fnacimiento && <span className="text-red-500 text-sm">{errors.fnacimiento.message}</span>}

          <select {...register("prevision")} className="w-8/12 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Previsión de Salud</option>
            <option value="fonasa">Fonasa</option>
            <option value="isapre">Isapre</option>
          </select>
          {errors.prevision && <span className="text-red-500 text-sm">{errors.prevision.message}</span>}

          <input {...register("password")} type="password" className="w-8/12 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Contraseña" />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("terminos", { required: true })} className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500" />
            <label className="text-black text-sm">
            He leído y acepto los <a href="/terminos" className="text-red-600 underline">términos</a> y la <a href="/privacidad" className="text-red-600 underline">política de privacidad</a>.</label>
               
          {errors.terminos && <span className="text-red-500 text-sm">Debe aceptar los términos.</span>}
          </div>
          <button type="submit" className="bg-red-600 hover:bg-red-800 px-20 py-2 rounded-xl text-white">Registrarse</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema/auth.js";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

export function PagLogin() { 
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) {
      toast.success('Inicio de sesión exitoso', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      setTimeout(() => navigate('/inicio'), 3000);
    }
  }, [isAuthenticated, navigate]);

  const [modalAbierto, setModalAbierto] = useState(false);

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  const irARegistro = (tipo) => {
    cerrarModal();
    navigate(`/${tipo}`);
  };

  return (
    <div className="min-h-screen bg-[url('/FondoRegistro.png')] bg-cover bg-center flex items-center justify-center px-4">
      <div className="absolute top-4 left-4">
        <img src="/LogoHC.png" alt="Logo" className="h-14 sm:h-20" /> 
      </div>
      <div className="relative bg-white w-full max-w-md h-[450px] rounded-3xl shadow-lg overflow-hidden flex flex-col justify-center p-8">
        {/* Flecha de regreso */}
        <button
          onClick={() => window.history.back()}
          className="absolute top-4 left-4 text-red-600 hover:text-red-800 transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="w-8 h-8 stroke-[2.5]" />
        </button>

        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Iniciar Sesión</h2>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col items-center">
            <input
              type="text"
              {...register("rut", { required: true })}
              className="w-8/12 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Rut"
            />
            <p className="text-red-500 text-sm mt-1">{formState.errors.rut?.message}</p>
          </div>

          <div className="flex flex-col items-center">
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-8/12 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contraseña"
            />
            <p className="text-red-500 text-sm mt-1">{formState.errors.password?.message}</p>
          </div>

          <button className="bg-red-600 px-6 py-2 rounded-xl text-white font-semibold mt-4">
            Iniciar Sesión
          </button>

          {/* Mostrar errores del backend */}
          {loginErrors.length > 0 && (
            <div className="mt-2 text-sm text-red-600 text-center space-y-1">
              {loginErrors.map((err, i) => (
                <p key={i}>{err}</p>
              ))}
            </div>
          )}
        </form>

        {/* Link para registrarse */}
        <p className="text-center text-sm text-gray-600 mt-4">
          ¿No tienes cuenta?{" "}
          <button
            type="button"
            onClick={abrirModal}
            className="text-red-600 font-semibold hover:underline"
          >
            Regístrate
          </button>
        </p>
      </div>

      {/* Modal de registro */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-[url('/FondoRegistro.png')] bg-cover bg-center min-h-screen flex items-center justify-center z-50">
          <div className="absolute top-4 left-4">
            <img src="/LogoHC.png" alt="Logo HealthCloud" className="h-14 sm:h-20" />
          </div>
          <div className="bg-white rounded-2xl p-8 w-80 shadow-lg text-center space-y-4">
            <h2 className="text-xl font-semibold text-red-600">¿Cómo deseas registrarte?</h2>
            <button
              onClick={() => irARegistro("paciente")}
              className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Como Paciente
            </button>
            <button
              onClick={() => irARegistro("medico")}
              className="w-full border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition"
            >
              Como Médico
            </button>
            <button
              onClick={cerrarModal}
              className="text-gray-500 text-sm underline hover:text-gray-700"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
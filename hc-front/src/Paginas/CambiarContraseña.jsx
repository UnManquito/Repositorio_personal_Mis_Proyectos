import React from "react"
import { useState} from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cambiarSchema } from "../schema/auth"
import { useNavigate } from "react-router-dom"
import axios from "../api/axios"
import { useSearchParams } from "react-router-dom"

export function Cambiar() {
  const [mensaje, setMensaje] = useState("")
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(cambiarSchema),
  })
  const nuevaContraseña = watch("contraseña") || ""
  const confirmarContraseña = watch("confirmar_contraseña") || ""
  const contraseñaIguales = nuevaContraseña === confirmarContraseña
  const contraseñaValida = nuevaContraseña.length >= 8

  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")

  const onSubmit = async (data) => {
    try {
      const payload = {
        token, // Extraído previamente de la URL.
        nuevaContraseña: data.contraseña,
      }
      await axios.put("/cambiar-contrasena", payload)
      setMensaje("Contraseña actualizada correctamente")
      setTimeout(() => {
        setMensaje("");
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      if (error.response && error.response.data) {
        const errMsg = Array.isArray(error.response.data.message)
          ? error.response.data.message.join(" ")
          : error.response.data.message;
        setMensaje(errMsg);
      } else {
        setMensaje("Error al actualizar la contraseña, intenta más tarde.");
      }
    }
  }


  return (
    <div className="h-screen flex items-center justify-center bg-[url('/FondoRegistro.png')] bg-cover bg-center">
      <div className="absolute top-4 left-4">
        <img src="/LogoHC.png" alt="Logo" className="h-16" />
      </div>
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-4 text-red-500 text-center">Cambiar Contraseña</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-2 text-lg">Nueva Contraseña:</label>
          <input
            {...register("contraseña")}
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Ingresa tu nueva contraseña"
          />
          <div className="mt-2 text-base">
            <p>La nueva contraseña debe:</p>
            <div className="flex items-center">
              <span>8 caracteres</span>
              <span className="ml-2">
                {contraseñaValida ? (

                  <img src="/comprobado.png" alt="Check" className="inline w-7" />
                ) : (

                  <img src="/boton-x.png" alt="Uncheck" className="inline w-7" />
                )}
              </span>
            </div>
          </div>
          {errors.contraseña && <p className="text-red-500">{errors.contraseña.message}</p>}

          <label className="block mt-4 mb-2 text-lg">Confirmar Contraseña:</label>
          <input
            {...register("confirmar_contraseña")}
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Confirma tu nueva contraseña"
          />
          <div className="mt-2 text-base">
            <p>Las contraseñas deben coincidir:</p>
            <div className="flex items-center">
              <span className="mr-2">Coincidir con la nueva contraseña</span>
              {contraseñaIguales ? (

                  <img src="/comprobado.png" alt="Check" className="inline w-7" />
              ) : (

                  <img src="/boton-x.png" alt="Uncheck" className="inline w-7" />
              )}
            </div>
          </div>
          {errors.confirmar_contraseña && <p className="text-red-500">{errors.confirmar_contraseña.message}</p>}

          <button type="submit" className="mt-4 bg-red-500 text-white p-2 rounded w-full hover:bg-red-700 cursor-pointer">
            Cambiar Contraseña
          </button>
        </form>

        {mensaje && <p className="mt-4 text-center">{mensaje}</p>}
      </div>
    </div>
  )
}

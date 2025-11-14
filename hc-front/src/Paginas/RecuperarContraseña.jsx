import React from "react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { recuperarSchema } from "../schema/auth" 
import axios from "../api/axios"

export function Recuperar() {
  const [mensaje, setMensaje] = useState("")
  const [pausa, setpausa] = useState(false)
  const [recarga, setrecarga] = useState(30)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(recuperarSchema)
  })

  useEffect (() => {
    if (recarga && pausa > 0) {
      const tiempo = setTimeout(() => setrecarga(recarga -1), 1000)
      return () => clearTimeout(tiempo)
    } else if (recarga == 0) {
      setpausa(false)
      setrecarga(30) // Ajuste del tiempo de espera
    }
  }, [recarga, pausa])

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/recuperar-contrasena", { email: data.email });
      setMensaje(`Se ha enviado un enlace de recuperación a ${data.email}`);
    } catch (error) {
      console.error("Error al enviar correo de recuperación:", error);
      // Comprueba si el error viene del response del servidor
      if (error.response && error.response.data) {
        // Si error.response.data.message es un arreglo, convíertelo a string
        const errMsg = Array.isArray(error.response.data.message)
          ? error.response.data.message.join(" ")
          : error.response.data.message;
        setMensaje(errMsg);
      } else {
        setMensaje("Error al enviar el correo, intenta más tarde.");
      }
    }
    setpausa(true);
    setrecarga(60);
    setTimeout(() => setMensaje(""), 10000);
  };


  return (
    <div className="flex h-screen items-center justify-center bg-[url('/FondoRegistro.png')] bg-cover bg-center">
      <div className="absolute top-4 left-4">
        <img src="/LogoHC.png" alt="Logo" className="h-16" />
      </div>
      <div className="max-w-md mx-auto p-6 bg-white shadow-2xl border-2 border-gray-200 rounded">
        <h2 className="text-2xl font-bold mb-4 text-red-500">Pasos para la recuperación de su cuenta</h2>
        <ol className="list-decimal px-3 py-2 space-y-4">
        <li>Ingresa la direccion de correo electronico</li>
        <li>Presione el boton de <span className="bg-red-500 text-white p-2 rounded">Enviar</span></li>
        <li>Se le enviara un correo con un enlace para continuar con el proceso</li>
        </ol>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email")}
            type="email"
            className="w-full p-2 border rounded my-3"
            placeholder="Ingresa tu direccion de correo electronico"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <div className="flex justify-center">
          <button type="submit" disabled={pausa} className={` text-2xl py-2 px-16 rounded ${pausa ? "cursor-progress bg-gray-500 text-white hover:bg-gray-700" : "bg-red-500 hover:bg-red-700 text-white cursor-pointer"}`}> {pausa ? `Espere ${recarga}s` : "Enviar"}</button>
        </div>
        </form>
        {mensaje && <p className="mt-4 ">{mensaje}</p>}
      </div>
    </div>
  )
}
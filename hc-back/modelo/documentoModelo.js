import mongoose from "mongoose"

const documentoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, default: "" },
  tipo: { type: String, required: true },
  carpeta: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  peso: { type: Number, required: true },
  archivo: {type: String, required: true} 
})

export default mongoose.model("Documento", documentoSchema)
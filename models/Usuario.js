import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
    nombre: String,
    email: String,
});

export default mongoose.models.Usuario || mongoose.model("Usuario", UsuarioSchema);

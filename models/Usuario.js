const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
    nombre: String,
    email: String,
});

module.exports = mongoose.models.Usuario || mongoose.model("Usuario", UsuarioSchema);

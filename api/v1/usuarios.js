const { connectDB } = require("../../lib/mongodb");
const Usuario = require("../../models/Usuario");

async function handler(req, res) {
    await connectDB();

    try {
        const usuarios = await Usuario.find({});
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: "Error obteniendo usuarios", error });
    }
}

module.exports = handler;

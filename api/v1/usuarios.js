import mongoose from "mongoose";

const MONGODB_URI =
    "mongodb+srv://ruboms_db_user:gxdc4cVJdGQKznaz@cluster0.u1r0xio.mongodb.net/mi_base?retryWrites=true&w=majority";

    // --- Conexión inline (obligatorio para Vercel) ---
    async function connectDB() {
        if (mongoose.connection.readyState === 1) return;

    await mongoose.connect(MONGODB_URI, {
        bufferCommands: false,
    });
    }

    // --- Modelo inline (obligatorio para Vercel) ---
    const UsuarioSchema = new mongoose.Schema({
        nombre: String,
        email: String,
    });

    const Usuario =
        mongoose.models.Usuario || mongoose.model("Usuario", UsuarioSchema);

    // --- Handler ---
    export default async function handler(req, res) {
        await connectDB();

        if (req.method === "GET") {
            try {
            const usuarios = await Usuario.find({});
            return res.status(200).json(usuarios);
            } catch (error) {
            return res.status(500).json({ mensaje: "Error obteniendo usuarios", error });
            }
        }

        if (req.method === "POST") {
            const { nombre, email } = req.body;

            if (!nombre || !email) {
                return res.status(400).json({
                    mensaje: "Debes proporcionar nombre y email"
                });
            }

            try {
            const nuevoUsuario = await Usuario.create({ nombre, email });
            return res.status(201).json({
                mensaje: "Usuario creado correctamente",
                usuario: nuevoUsuario
            });
            } catch (error) {
                return res.status(500).json({ mensaje: "Error creando usuario", error });
            }
        }

    return res.status(405).json({ mensaje: "Método no permitido" });
}

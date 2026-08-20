const { connectDB } = require("../../lib/mongodb.js");
const Usuario = require("../../models/Usuario.js");
const { verificarToken } = require("../../lib/auth.js");

async function handler(req, res) {
    if (!['GET', 'POST'].includes(req.method)) {
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ mensaje: 'Método no permitido' });
    }

    if (!verificarToken(req, res)) return;

    try {
        await connectDB();

        if (req.method === 'GET') {
            const usuarios = await Usuario.find({}).lean();
            return res.status(200).json(usuarios);
        }

        const { nombre, email } = req.body || {};

        if (typeof nombre !== 'string' || !nombre.trim() ||
            typeof email !== 'string' || !email.trim()) {
            return res.status(400).json({
                mensaje: 'Debes proporcionar nombre y email como texto'
            });
        }

        const nuevoUsuario = await Usuario.create({
            nombre: nombre.trim(),
            email: email.trim().toLowerCase(),
        });

        return res.status(201).json({
            mensaje: 'Usuario creado correctamente',
            usuario: nuevoUsuario,
        });
    } catch (error) {
        console.error('Error en /api/v1/usuarios:', error);
        return res.status(500).json({
            mensaje: 'Error interno al acceder a MongoDB',
            error: process.env.NODE_ENV === 'production' ? undefined : error.message,
        });
    }
}

module.exports = handler;

const jwt = require('jsonwebtoken');

async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ mensaje: 'Método no permitido' });
    }

    const { usuario, email, password } = req.body || {};
    const identificador = usuario || email;
    const secret = process.env.CLAVE_SECRETA;
    const loginUsuario = process.env.LOGIN_USUARIO;
    const loginPassword = process.env.LOGIN_PASSWORD;

    if (!secret || !loginUsuario || !loginPassword) {
        console.error('Faltan CLAVE_SECRETA, LOGIN_USUARIO o LOGIN_PASSWORD');
        return res.status(500).json({ mensaje: 'El login no está configurado' });
    }

    if (identificador !== loginUsuario || password !== loginPassword) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ usuario: identificador }, secret, { expiresIn: '1h' });
    return res.status(200).json({ token });
}

module.exports = handler;

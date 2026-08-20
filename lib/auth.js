const jwt = require('jsonwebtoken');

function verificarToken(req, res) {
    const authorization = req.headers.authorization;
    const secret = process.env.CLAVE_SECRETA;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        res.status(401).json({ mensaje: 'Token no proporcionado' });
        return false;
    }

    if (!secret) {
        console.error('Falta la variable de entorno CLAVE_SECRETA');
        res.status(500).json({ mensaje: 'La autenticación no está configurada' });
        return false;
    }

    const token = authorization.slice('Bearer '.length).trim();

    try {
        req.usuario = jwt.verify(token, secret);
        return true;
    } catch (error) {
        res.status(401).json({ mensaje: 'Token inválido o expirado' });
        return false;
    }
}

module.exports = { verificarToken };
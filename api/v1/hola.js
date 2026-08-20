function handler(req, res) {
    res.status(200).json({
        mensaje: process.env.MENSAJE_BIENVENIDA
    });
}

module.exports = handler;


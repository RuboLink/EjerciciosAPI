function handler(req, res) {
    const { nombre } = req.query;

    if (!nombre) {
        return res.status(400).json({
            mensaje: "Debes proporcionar un nombre en la consulta. Ejemplo: /api/v1/saludo?nombre=Ruben"
        });
    }

    res.status(200).json({
        mensaje: `Hola, ${nombre}!`
    });
}

module.exports = handler;

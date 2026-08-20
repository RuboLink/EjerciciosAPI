const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load(path.join(__dirname, '..', 'swagger.yaml'));

function handler(req, res) {
	if (req.method !== 'GET') {
		res.setHeader('Allow', 'GET');
		return res.status(405).json({ mensaje: 'Método no permitido' });
	}

	return res.status(200).send(swaggerUi.generateHTML(swaggerDocument));
}

module.exports = handler;
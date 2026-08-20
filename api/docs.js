const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load(path.join(__dirname, '..', 'swagger.yaml'));

function handler(req, res) {
	if (req.method !== 'GET') {
		res.setHeader('Allow', 'GET');
		return res.status(405).json({ mensaje: 'Método no permitido' });
	}

	const initScript = `
window.onload = function () {
	window.ui = SwaggerUIBundle({
		spec: ${JSON.stringify(swaggerDocument)},
		dom_id: '#swagger-ui',
		deepLinking: true,
		presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
		plugins: [SwaggerUIBundle.plugins.DownloadUrl],
		layout: 'StandaloneLayout'
	});
};`;

	const html = swaggerUi.generateHTML(swaggerDocument)
		.replace('./swagger-ui.css', 'https://unpkg.com/swagger-ui-dist@5/swagger-ui.css')
		.replace('./swagger-ui-bundle.js', 'https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js')
		.replace('./swagger-ui-standalone-preset.js', 'https://unpkg.com/swagger-ui-dist@5/swagger-ui-standalone-preset.js')
		.replace('./swagger-ui-init.js', 'data:text/javascript,' + encodeURIComponent(initScript))
		.replace(/\s*<link rel="icon"[^>]+>/g, '');

	return res.status(200).send(html);
}

module.exports = handler;
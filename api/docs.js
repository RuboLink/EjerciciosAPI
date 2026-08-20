const path = require('path');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '..', 'swagger.yaml'));

app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(swaggerDocument));

module.exports = app;
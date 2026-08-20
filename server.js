require("dotenv").config();

const path = require('path');
const express = require('express');
const jsonTexto = require('./api/v1/hola.js');
const saludo = require('./api/v1/saludo.js');
const usuarios = require('./api/v1/usuarios.js');
const login = require('./api/v1/login.js');
const { connectDB } = require('./lib/mongodb.js');

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));

const app = express();
const port = 3000;

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  jsonTexto(req, res);
});

app.get('/api/v1/saludo', saludo);
app.post('/api/v1/login', login);

app.route('/api/v1/usuarios')
  .get(usuarios)
  .post(usuarios);

function start() {
  app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
    console.log(`Documentación disponible en http://localhost:${port}/docs`);
  });
}

if (require.main === module) {
  start();
}

module.exports = app;

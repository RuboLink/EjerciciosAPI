require("dotenv").config();

const express = require('express');
const jsonTexto = require('./api/v1/hola.js')
const saludo = require('./api/v1/saludo.js');
const usuarios = require('./api/v1/usuarios.js');
const { connectDB } = require('./lib/mongodb.js');
const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
  jsonTexto(req, res)
})

app.get('/api/v1/saludo', saludo);
app.route('/api/v1/usuarios')
  .get(usuarios)
  .post(usuarios);

async function start() {
  app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error('No se pudo conectar con MongoDB Atlas:', error.message);
  process.exit(1);
});

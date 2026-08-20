// import express from 'express'
// import jsonTexto from 'hola.js'

const express = require('express');
const jsonTexto = require('./hola.js')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(jsonTexto)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

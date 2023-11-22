// app.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const oauthServer = require('./node_modules/oauth2-server'); // Reemplaza con la ruta correcta a tu archivo oauth.js

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta protegida con autenticación JWT
app.get('/recurso-protegido', verifyToken, (req, res) => {
  res.json({ mensaje: 'Este es un recurso protegido.' });
});

function verifyToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. Falta el token.' });
  }

  jwt.verify(token, 'secreto', (err, usuario) => {
    if (err) {
      return res.status(401).json({ mensaje: 'Token no válido.' });
    }
    req.usuario = usuario;
    next();
  });
}

app.listen(3001, () => {
  console.log('Aplicación Express escuchando en http://localhost:3001');
});

// server.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para registrar un nuevo usuario
app.post('/register', (req, res) => {
  const { username, password, year } = req.body;
  db.run("INSERT INTO users (username, password, year) VALUES (?, ?, ?)", [username, password, year], function(err) {
    if (err) {
      return res.status(500).send("Error al registrar el usuario");
    }
    res.status(200).send("Usuario registrado con éxito");
  });
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, row) => {
    if (err || !row) {
      return res.status(401).send("Credenciales incorrectas");
    }
    res.status(200).send("Inicio de sesión exitoso");
  });
});

// Ruta para agregar notas
app.post('/add-grade', (req, res) => {
  const { user_id, subject, grade } = req.body;
  db.run("INSERT INTO grades (user_id, subject, grade) VALUES (?, ?, ?)", [user_id, subject, grade], function(err) {
    if (err) {
      return res.status(500).send("Error al agregar la nota");
    }
    res.status(200).send("Nota agregada con éxito");
  });
});

// Ruta para obtener el promedio de notas
app.get('/average/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  db.all("SELECT AVG(grade) as average FROM grades WHERE user_id = ?", [user_id], (err, rows) => {
    if (err) {
      return res.status(500).send("Error al obtener el promedio");
    }
    res.status(200).json(rows);
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

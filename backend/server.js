const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const app = express();
const cors = require('cors');


app.use(cors({
    origin: 'http://localhost:8100' // URL de tu frontend
}));

app.use(bodyParser.json());

// Configura tu conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ionic'
});

// Conectar a la base de datos
db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

// Registro de usuario
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Usuario registrado');
    });
});

// Login de usuario
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Username:', username);
    console.log('Password:', password); // Asegúrate de no mostrar contraseñas en producción

    const query = 'SELECT * FROM usuarios WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length > 0) {
            const user = results[0];
            if (bcrypt.compareSync(password, user.password)) {
                res.status(200).send(user);
            } else {
                console.log('Contraseña incorrecta');
                res.status(401).send('Credenciales incorrectas');
            }
        } else {
            console.log('Usuario no encontrado');
            res.status(401).send('Credenciales incorrectas');
        }
    });
});


// Registrar transacción
app.post('/api/transactions', (req, res) => {
    const { description, amount, type, user_id } = req.body;
    const query = 'INSERT INTO transacciones (description, amount, type, user_id) VALUES (?, ?, ?, ?)';
    
    db.query(query, [description, amount, type, user_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message }); // Devuelve error en formato JSON
        }
        res.status(201).json({ message: 'Transacción registrada', id: result.insertId }); // Asegúrate de que sea JSON
    });
});



// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

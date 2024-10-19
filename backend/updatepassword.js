const bcrypt = require('bcrypt');
const mysql = require('mysql');

// Configura tu conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia esto según tu configuración
    password: '', // Cambia esto según tu configuración
    database: 'ionic' // Cambia esto al nombre de tu base de datos
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

// Consulta para obtener todos los usuarios
db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) throw err;

    results.forEach((user) => {
        const hashedPassword = bcrypt.hashSync(user.password, 10); // Hashea la contraseña

        // Actualiza la contraseña en la base de datos
        db.query('UPDATE usuarios SET password = 12345678 WHERE id = 1', [hashedPassword, user.id], (err) => {
            if (err) {
                console.error('Error al actualizar la contraseña para el usuario', user.username);
            } else {
                console.log(`Contraseña actualizada para ${user.username}`);
            }
        });
    });
});

const mongoose = require('mongoose');

/**
 * Establece la conexion asincrona a la base de datos MongoDB usando Mongoose.
 */
const conectarDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gestion_eventos_db';
        const conn = await mongoose.connect(mongoURI);
        console.log(`[MongoDB] Conectado exitosamente a la base de datos: ${conn.connection.host}`);
    } catch (error) {
        console.error(`[MongoDB Error] Error al conectar a la base de datos: ${error.message}`);
        // Finaliza el proceso si falla la conexion inicial a la base de datos
        process.exit(1);
    }
};

module.exports = conectarDB;

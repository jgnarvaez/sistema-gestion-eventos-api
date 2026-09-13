const mongoose = require('mongoose');
const dns = require('dns');

// Configurar los servidores DNS a Cloudflare / Google para evitar el bloqueo DNS SRV del ISP en Windows
try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
    // Ignorar si el sistema no permite sobreescribir los servidores DNS
}

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


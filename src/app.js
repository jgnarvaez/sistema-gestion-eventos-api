const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const conectarDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const eventoRoutes = require('./routes/eventoRoutes');
const errorHandler = require('./middleware/errorHandler');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Inicializar la aplicacion Express
const app = express();

// Puerto de ejecucion
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos MongoDB
conectarDB();

// Middlewares Globales
app.use(cors()); // Habilitar CORS para consumo desde Angular u otros clientes
app.use(express.json()); // Parsing de solicitudes en formato JSON

// Definicion de Rutas Principales
app.use('/api/auth', authRoutes);
app.use('/api/eventos', eventoRoutes);

// Ruta base para comprobacion de estado del servidor
app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'API REST - Sistema de Gestión de Eventos (GA7-220501096-AA5-EV01)',
        estado: 'Activo',
        autores: 'Camila Conde - Jose Narvaez'
    });
});

// Middleware Global de Manejo de Errores (debe ir al final de las rutas)
app.use(errorHandler);

// Iniciar servidor HTTP
app.listen(PORT, () => {
    console.log(`[Express] Servidor ejecutándose exitosamente en http://localhost:${PORT}`);
});

module.exports = app;

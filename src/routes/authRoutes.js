const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario } = require('../controllers/authController');

/**
 * Rutas asociadas a la Autenticación de usuarios.
 * Requerimientos de la evidencia GA7-220501096-AA5-EV01.
 */

// Endpoint No.1: Registro de Usuarios
router.post('/registro', registrarUsuario);

// Endpoint No.2: Inicio de Sesión
router.post('/login', loginUsuario);

module.exports = router;

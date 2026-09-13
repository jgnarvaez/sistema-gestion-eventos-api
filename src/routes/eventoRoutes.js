const express = require('express');
const router = express.Router();
const { obtenerEventos, crearEvento } = require('../controllers/eventoController');

/**
 * Rutas asociadas a la Gestion de Eventos (Continuidad AA3-EV01).
 */

router.get('/', obtenerEventos);
router.post('/', crearEvento);

module.exports = router;

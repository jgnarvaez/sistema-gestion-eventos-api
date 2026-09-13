const Evento = require('../models/Evento');

/**
 * Eventos mock de respaldo para mantener la integracion de la evidencia AA3
 */
const eventosMock = [
    {
        id: 1,
        nombre: 'Conferencia de Tecnologia e Innovacion ADSO 2025',
        descripcion: 'Evento sobre tendencias de desarrollo de software, inteligencia artificial y servicios web.',
        fecha: '2025-11-20',
        lugar: 'Auditorio Principal SENA',
        capacidad: 250
    },
    {
        id: 2,
        nombre: 'Taller Práctico de Node.js y Express',
        descripcion: 'Capacitacion técnica sobre construcción de APIs REST con MongoDB y Mongoose.',
        fecha: '2025-12-05',
        lugar: 'Laboratorio de Sistemas 302',
        capacidad: 40
    }
];

/**
 * @route   GET /api/eventos
 * @desc    Obtener lista de eventos registrados
 * @access  Public
 */
const obtenerEventos = async (req, res, next) => {
    try {
        const eventosDB = await Evento.find();
        if (eventosDB && eventosDB.length > 0) {
            return res.status(200).json(eventosDB);
        }
        return res.status(200).json(eventosMock);
    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/eventos
 * @desc    Registrar un nuevo evento
 * @access  Public
 */
const crearEvento = async (req, res, next) => {
    try {
        const { nombre, descripcion, fecha, lugar, capacidad } = req.body;

        if (!nombre || !descripcion || !fecha || !lugar || !capacidad) {
            return res.status(400).json({ error: 'Todos los campos del evento son requeridos' });
        }

        const nuevoEvento = new Evento({
            nombre,
            descripcion,
            fecha,
            lugar,
            capacidad
        });

        await nuevoEvento.save();
        return res.status(201).json({ mensaje: 'Evento creado exitosamente', evento: nuevoEvento });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    obtenerEventos,
    crearEvento
};

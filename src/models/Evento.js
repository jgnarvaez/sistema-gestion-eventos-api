const mongoose = require('mongoose');

/**
 * Esquema Mongoose para la entidad Evento.
 * Mantiene la continuidad con la evidencia GA7-220501096-AA3-EV01.
 */
const eventoSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre del evento es obligatorio'],
            trim: true
        },
        descripcion: {
            type: String,
            required: [true, 'La descripcion del evento es obligatoria'],
            trim: true
        },
        fecha: {
            type: String,
            required: [true, 'La fecha del evento es obligatoria']
        },
        lugar: {
            type: String,
            required: [true, 'El lugar del evento es obligatorio'],
            trim: true
        },
        capacidad: {
            type: Number,
            required: [true, 'La capacidad del evento es obligatoria'],
            min: [1, 'La capacidad debe ser al menos 1']
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('Evento', eventoSchema);

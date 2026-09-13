const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Esquema Mongoose para la entidad Usuario.
 * Sigue los requerimientos de la evidencia GA7-220501096-AA5-EV01.
 */
const usuarioSchema = new mongoose.Schema(
    {
        usuario: {
            type: String,
            required: [true, 'El campo usuario es obligatorio'],
            unique: true,
            trim: true,
            lowercase: true,
            minlength: [3, 'El nombre de usuario debe tener al menos 3 caracteres']
        },
        contrasena: {
            type: String,
            required: [true, 'El campo contrasena es obligatorio'],
            minlength: [4, 'La contrasena debe tener al menos 4 caracteres']
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

/**
 * Middleware pre-save: Encripta la contrasena usando bcryptjs antes de guardar en MongoDB.
 */
usuarioSchema.pre('save', async function (next) {
    // Solo encriptar si la contrasena ha sido modificada o es nueva
    if (!this.isModified('contrasena')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.contrasena = await bcrypt.hash(this.contrasena, salt);
        next();
    } catch (error) {
        next(error);
    }
});

/**
 * Metodo de instancia para comparar contraseñas enviadas contra la encriptada.
 */
usuarioSchema.methods.compararContrasena = async function (contrasenaCandidata) {
    return await bcrypt.compare(contrasenaCandidata, this.contrasena);
};

module.exports = mongoose.model('Usuario', usuarioSchema);

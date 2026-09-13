/**
 * Middleware centralizado para manejo de errores en Express.
 */
const errorHandler = (err, req, res, next) => {
    console.error(`[Error Handler] Stack: ${err.stack}`);

    // Error de clave duplicada en MongoDB (ejemplo: usuario ya existente)
    if (err.code === 11000) {
        return res.status(400).json({
            error: 'El usuario ya existe'
        });
    }

    // Error de validacion de Mongoose
    if (err.name === 'ValidationError') {
        const mensajes = Object.values(err.errors).map((val) => val.message);
        return res.status(400).json({
            error: mensajes.join(', ')
        });
    }

    // Error interno del servidor por defecto
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    return res.status(statusCode).json({
        error: err.message || 'Error interno en el servidor'
    });
};

module.exports = errorHandler;

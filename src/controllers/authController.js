const Usuario = require('../models/Usuario');

/**
 * Controladores para las operaciones de Autenticacion (Registro e Inicio de Sesion).
 */

/**
 * @route   POST /api/auth/registro
 * @desc    Registrar un nuevo usuario en el sistema
 * @access  Public
 */
const registrarUsuario = async (req, res, next) => {
    try {
        const { usuario, contrasena } = req.body;

        // Validacion [No.3]: Campos obligatorios
        if (!usuario || !contrasena) {
            return res.status(400).json({
                error: 'Debe proporcionar usuario y contrasena'
            });
        }

        // Validar si el usuario ya existe en la base de datos
        const usuarioExistente = await Usuario.findOne({ usuario: usuario.trim().toLowerCase() });
        if (usuarioExistente) {
            return res.status(400).json({
                error: 'El usuario ya existe'
            });
        }

        // Crear nuevo usuario
        const nuevoUsuario = new Usuario({
            usuario: usuario.trim(),
            contrasena
        });

        // Guardar en MongoDB (el middleware pre-save encriptara la contrasena)
        await nuevoUsuario.save();

        return res.status(201).json({
            mensaje: 'Usuario registrado exitosamente',
            usuario: nuevoUsuario.usuario
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/auth/login
 * @desc    Autenticar un usuario existente
 * @access  Public
 */
const loginUsuario = async (req, res, next) => {
    try {
        const { usuario, contrasena } = req.body;

        // Validacion [No.3]: Campos obligatorios
        if (!usuario || !contrasena) {
            return res.status(400).json({
                error: 'Error en la autenticación'
            });
        }

        // Buscar usuario en MongoDB
        const usuarioEncontrado = await Usuario.findOne({ usuario: usuario.trim().toLowerCase() });
        if (!usuarioEncontrado) {
            return res.status(401).json({
                error: 'Error en la autenticación'
            });
        }

        // Validacion [No.3]: Verificar contraseña contra hash bcrypt
        const esContrasenaValida = await usuarioEncontrado.compararContrasena(contrasena);
        if (!esContrasenaValida) {
            return res.status(401).json({
                error: 'Error en la autenticación'
            });
        }

        // Autenticacion satisfactoria
        return res.status(200).json({
            mensaje: 'Autenticación satisfactoria',
            usuario: usuarioEncontrado.usuario
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registrarUsuario,
    loginUsuario
};

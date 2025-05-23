const { ApiError } = require('../utils/ApiError');

/**
 * Controlador para manejar rutas no encontradas (404)
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 * @param {Function} next - Función next de Express
 */
const handleNotFound = (req, res, next) => {
  next(new ApiError(404, 'Ruta no encontrada - La URL solicitada no existe en este servidor'));
};

module.exports = { handleNotFound };
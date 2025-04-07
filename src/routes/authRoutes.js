const express = require('express');
const router = express.Router();
const { generateAuthToken } = require('../config/firebase');
const { ApiError } = require('../utils/ApiError');

// Ruta interna para generar tokens
router.post('/internal/token', async (req, res, next) => {
  try {
    const { uid, apiKey } = req.body;

    // Verificar API key interna (deberías implementar una validación más robusta)
    if (apiKey !== process.env.INTERNAL_API_KEY) {
      throw new ApiError(401, 'API key inválida');
    }

    if (!uid) {
      throw new ApiError(400, 'Se requiere el UID del usuario');
    }

    const token = await generateAuthToken(uid);
    
    res.json({
      success: true,
      token
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const propertyRoutes = require('./propertyRoutes');
const authRoutes = require('./authRoutes');
const { handleNotFound } = require('../controllers/notFoundController');

// Ruta de prueba básica
router.get('/', (req, res) => {
  res.json({ message: 'API is working' });
});

// Rutas de autenticación
router.use('/auth', authRoutes);

// Rutas de propiedades
router.use('/properties', propertyRoutes);

// Ruta wildcard para manejar rutas no encontradas (404)
// Esta debe ser la última ruta
router.all('*', handleNotFound);

module.exports = router;
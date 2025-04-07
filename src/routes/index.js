const express = require('express');
const router = express.Router();
const propertyRoutes = require('./propertyRoutes');
const authRoutes = require('./authRoutes');

// Ruta de prueba básica
router.get('/', (req, res) => {
  res.json({ message: 'API is working' });
});

// Rutas de autenticación
router.use('/auth', authRoutes);

// Rutas de propiedades
router.use('/properties', propertyRoutes);

module.exports = router;
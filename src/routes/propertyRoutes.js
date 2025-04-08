const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController');
const catalogController = require('../controllers/catalogController');

/**
 * @swagger
 * tags:
 *   - name: Propiedades
 *     description: Endpoints para gestión de propiedades
 *   - name: Catálogos
 *     description: Endpoints para gestión de catálogos
 */

// --- RUTAS PÚBLICAS ---

/**
 * @swagger
 * /properties:
 *   get:
 *     tags: [Propiedades]
 *     summary: Obtener todas las propiedades
 *     responses:
 *       200:
 *         description: Lista de propiedades
 */
router.get('/', getAllProperties);

/**
 * @swagger
 * /properties/{id}:
 *   get:
 *     tags: [Propiedades]
 *     summary: Obtener una propiedad por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles de la propiedad
 */
router.get('/:id', getPropertyById);


router.get('/catalogs/property-types', catalogController.getPropertyTypes);


router.get('/catalogs/sale-types', catalogController.getSaleTypes);


router.get('/catalogs/legal-statuses', catalogController.getLegalStatuses);

router.get('/catalogs/states', catalogController.getStates);

router.get('/catalogs/municipalities', catalogController.getMunicipalitiesByState);

router.get('/catalogs/colonies', catalogController.getColoniesByMunicipality);

// Rutas de catálogos públicas
router.get('/catalogs/property-types', catalogController.getPropertyTypes);
router.get('/catalogs/sale-types', catalogController.getSaleTypes);
router.get('/catalogs/legal-statuses', catalogController.getLegalStatuses);
router.get('/catalogs/states', catalogController.getStates);

// Después van las rutas protegidas
router.use(authenticate);

/**
 * @swagger
 * /properties:
 *   post:
 *     tags: [Propiedades]
 *     summary: Crear una nueva propiedad
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               client: "Emmanuel"
 *               property_code: "TEST-001"
 *               property_type_id: 1
 *               sale_type_id: 1
 *               legal_status_id: 1
 *               sale_value: 2000000
 *               commercial_value: 2500000
 *               street: "Av. Siempre Viva"
 *               exterior_number: "123"
 *               interior_number: "B"
 *               postal_code: "12345"
 *               extra_address: "Cerca del parque"
 *               observation_id: 1
 *               land_size: 100.5
 *               construction_size: 200.5
 *               bedrooms: 3
 *               bathrooms: 2
 *               parking_spaces: 1
 *               has_garden: true
 *               has_study: false
 *               has_service_room: false
 *               is_condominium: false
 *               additional_info: "Casa nueva"
 *               title: "Casa en venta"
 *               description: "Descripción detallada"
 *               main_image: "https://ejemplo.com/casa.jpg"
 *               state_id: 1
 *               municipality_id: 1
 *               colony_id: 1
 *     responses:
 *       201:
 *         description: Propiedad creada
 */
router.post('/', createProperty);

/**
 * @swagger
 * /properties/{id}:
 *   put:
 *     tags: [Propiedades]
 *     summary: Actualizar propiedad por ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la propiedad a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               client: "Emmanuel"
 *               property_code: "CNK-001-UPD"
 *               property_type_id: 2
 *               sale_type_id: 1
 *               legal_status_id: 1
 *               sale_value: 3500000.00
 *               commercial_value: 4000000.00
 *               street: "Calle actualizada"
 *               exterior_number: "99"
 *               interior_number: "B"
 *               postal_code: "12345"
 *               extra_address: "Actualización"
 *               observation_id: 1
 *               land_size: 180.5
 *               construction_size: 160.5
 *               bedrooms: 4
 *               bathrooms: 2
 *               parking_spaces: 1
 *               has_garden: true
 *               has_study: false
 *               has_service_room: false
 *               is_condominium: false
 *               additional_info: "Actualizada"
 *               title: "Casa actualizada"
 *               description: "Casa actualizada con mejoras"
 *               main_image: "https://ejemplo.com/casa-actualizada.jpg"
 *               state_id: 1
 *               municipality_id: 1
 *               colony_id: 1
 *     responses:
 *       200:
 *         description: Propiedad actualizada
 */


router.put('/:id', updateProperty);

/**
 * @swagger
 * /properties/{id}:
 *   delete:
 *     tags: [Propiedades]
 *     summary: Eliminar propiedad por ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Propiedad eliminada
 */
router.delete('/:id', deleteProperty);

// Rutas protegidas de catálogos
router.post('/catalogs/property-types', catalogController.createPropertyType);
router.put('/catalogs/property-types/:id', catalogController.updatePropertyType);
router.delete('/catalogs/property-types/:id', catalogController.deletePropertyType);

router.post('/catalogs/sale-types', catalogController.createSaleType);
router.put('/catalogs/sale-types/:id', catalogController.updateSaleType);
router.delete('/catalogs/sale-types/:id', catalogController.deleteSaleType);

router.post('/catalogs/legal-statuses', catalogController.createLegalStatus);
router.put('/catalogs/legal-statuses/:id', catalogController.updateLegalStatus);
router.delete('/catalogs/legal-statuses/:id', catalogController.deleteLegalStatus);

module.exports = router;

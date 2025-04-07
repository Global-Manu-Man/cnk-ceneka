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

/**
 * @swagger
 * /properties/catalogs/property-types:
 *   get:
 *     tags: [Catálogos]
 *     summary: Obtener tipos de propiedad
 *     responses:
 *       200:
 *         description: Lista de tipos de propiedad
 */
router.get('/properties/catalogs/property-types', catalogController.getPropertyTypes);


/**
 * @swagger
 * /catalogs/sale-types:
 *   get:
 *     tags: [Catálogos]
 *     summary: Obtener tipos de venta
 *     responses:
 *       200:
 *         description: Lista de tipos de venta
 */
router.get('/catalogs/sale-types', catalogController.getSaleTypes);

/**
 * @swagger
 * /catalogs/legal-statuses:
 *   get:
 *     tags: [Catálogos]
 *     summary: Obtener estatus legales
 *     responses:
 *       200:
 *         description: Lista de estatus legales
 */
router.get('/catalogs/legal-statuses', catalogController.getLegalStatuses);

/**
 * @swagger
 * /catalogs/states:
 *   get:
 *     tags: [Catálogos]
 *     summary: Obtener estados
 *     responses:
 *       200:
 *         description: Lista de estados
 */
router.get('/catalogs/states', catalogController.getStates);

/**
 * @swagger
 * /catalogs/municipalities:
 *   get:
 *     tags: [Catálogos]
 *     summary: Obtener municipios por estado
 *     parameters:
 *       - name: state_id
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de municipios
 */
router.get('/catalogs/municipalities', catalogController.getMunicipalitiesByState);

/**
 * @swagger
 * /catalogs/colonies:
 *   get:
 *     tags: [Catálogos]
 *     summary: Obtener colonias por municipio
 *     parameters:
 *       - name: municipality_id
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de colonias
 */
router.get('/catalogs/colonies', catalogController.getColoniesByMunicipality);

// --- RUTAS PROTEGIDAS ---
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

// Las rutas protegidas de catálogos puedes seguir el mismo patrón agregando documentación para POST, PUT y DELETE.

// ... (el resto del archivo hasta las rutas protegidas se mantiene igual)

// Rutas protegidas - administración de catálogos

/**
 * @swagger
 * /catalogs/property-types:
 *   post:
 *     tags: [Catálogos]
 *     summary: Crear un tipo de propiedad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tipo de propiedad creado
 */
router.post('/catalogs/property-types', catalogController.createPropertyType);

/**
 * @swagger
 * /catalogs/property-types/{id}:
 *   put:
 *     tags: [Catálogos]
 *     summary: Actualizar tipo de propiedad
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tipo de propiedad actualizado
 */
router.put('/catalogs/property-types/:id', catalogController.updatePropertyType);

/**
 * @swagger
 * /catalogs/property-types/{id}:
 *   delete:
 *     tags: [Catálogos]
 *     summary: Eliminar tipo de propiedad
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tipo de propiedad eliminado
 */
router.delete('/catalogs/property-types/:id', catalogController.deletePropertyType);

/**
 * @swagger
 * /catalogs/sale-types:
 *   post:
 *     tags: [Catálogos]
 *     summary: Crear tipo de venta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tipo de venta creado
 */
router.post('/catalogs/sale-types', catalogController.createSaleType);

/**
 * @swagger
 * /catalogs/sale-types/{id}:
 *   put:
 *     tags: [Catálogos]
 *     summary: Actualizar tipo de venta
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tipo de venta actualizado
 */
router.put('/catalogs/sale-types/:id', catalogController.updateSaleType);

/**
 * @swagger
 * /catalogs/sale-types/{id}:
 *   delete:
 *     tags: [Catálogos]
 *     summary: Eliminar tipo de venta
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tipo de venta eliminado
 */
router.delete('/catalogs/sale-types/:id', catalogController.deleteSaleType);

/**
 * @swagger
 * /catalogs/legal-statuses:
 *   post:
 *     tags: [Catálogos]
 *     summary: Crear estatus legal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Estatus legal creado
 */
router.post('/catalogs/legal-statuses', catalogController.createLegalStatus);

/**
 * @swagger
 * /catalogs/legal-statuses/{id}:
 *   put:
 *     tags: [Catálogos]
 *     summary: Actualizar estatus legal
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Estatus legal actualizado
 */
router.put('/catalogs/legal-statuses/:id', catalogController.updateLegalStatus);

/**
 * @swagger
 * /catalogs/legal-statuses/{id}:
 *   delete:
 *     tags: [Catálogos]
 *     summary: Eliminar estatus legal
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estatus legal eliminado
 */
router.delete('/catalogs/legal-statuses/:id', catalogController.deleteLegalStatus);


module.exports = router;

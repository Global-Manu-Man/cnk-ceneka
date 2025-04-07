const { pool } = require('../config/database');
const { ApiError } = require('../utils/ApiError');
const { logger } = require('../utils/logger');

// Función para limpiar y validar valores
const cleanValue = (value, type = 'string') => {
  if (value === undefined || value === null) return null;
  
  switch (type) {
    case 'number':
      const num = Number(value);
      return isNaN(num) ? null : num;
    case 'boolean':
      return Boolean(value);
    case 'string':
      return typeof value === 'string' && value.trim() === '' ? null : value.trim();
    default:
      return value;
  }
};

// Función para validar y transformar los datos de la propiedad
const validateAndTransformPropertyData = (data) => {
  const propertyData = {
    interior_number: null,
    extra_address: null,
    observation_id: null,
    additional_info: null,
    has_garden: false,
    has_study: false,
    has_service_room: false,
    is_condominium: false,
    ...data
  };

  const fieldTypes = {
    client: 'string',
    property_code: 'string',
    property_type_id: 'number',
    sale_type_id: 'number',
    legal_status_id: 'number',
    sale_value: 'number',
    commercial_value: 'number',
    street: 'string',
    exterior_number: 'string',
    interior_number: 'string',
    postal_code: 'string',
    extra_address: 'string',
    observation_id: 'number',
    land_size: 'number',
    construction_size: 'number',
    bedrooms: 'number',
    bathrooms: 'number',
    parking_spaces: 'number',
    has_garden: 'boolean',
    has_study: 'boolean',
    has_service_room: 'boolean',
    is_condominium: 'boolean',
    additional_info: 'string',
    title: 'string',
    description: 'string',
    main_image: 'string',
    state_id: 'number',
    municipality_id: 'number',
    colony_id: 'number'
  };

  const cleanedData = {};
  const missingFields = [];
  const invalidFields = [];

  for (const [field, type] of Object.entries(fieldTypes)) {
    const value = cleanValue(propertyData[field], type);
    cleanedData[field] = value;

    if ([
      'client', 'property_code', 'property_type_id', 'sale_type_id', 
      'legal_status_id', 'sale_value', 'commercial_value', 'street', 
      'exterior_number', 'postal_code', 'land_size', 'construction_size',
      'bedrooms', 'bathrooms', 'parking_spaces', 'title', 'description',
      'main_image', 'state_id', 'municipality_id', 'colony_id'
    ].includes(field)) {
      if (value === null) {
        missingFields.push(field);
      }
    }

    if (type === 'number' && value !== null && isNaN(value)) {
      invalidFields.push(`${field} debe ser un número válido`);
    }
  }

  if (missingFields.length > 0 || invalidFields.length > 0) {
    const errors = [];
    if (missingFields.length > 0) {
      errors.push(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
    }
    if (invalidFields.length > 0) {
      errors.push(invalidFields.join(', '));
    }
    throw new ApiError(400, errors.join('. '));
  }

  return cleanedData;
};

const getAllProperties = async (req, res, next) => {
  try {
    const [properties] = await pool.execute('SELECT * FROM properties');
    res.json({ success: true, data: properties });
  } catch (error) {
    logger.error(`Error al obtener las propiedades: ${error.message}`);
    next(new ApiError(500, 'Error al obtener las propiedades'));
  }
};

const getPropertyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [properties] = await pool.execute('SELECT * FROM properties WHERE id = ?', [id]);

    if (properties.length === 0) {
      return next(new ApiError(404, 'Propiedad no encontrada'));
    }

    res.json({ success: true, data: properties[0] });
  } catch (error) {
    logger.error(`Error al obtener la propiedad: ${error.message}`);
    next(new ApiError(500, 'Error al obtener la propiedad'));
  }
};

const createProperty = async (req, res, next) => {
  try {
    logger.info('Iniciando creación de propiedad');
    logger.info('Headers recibidos:', req.headers);
    logger.info('Body recibido:', JSON.stringify(req.body, null, 2));

    if (!req.body || Object.keys(req.body).length === 0) {
      throw new ApiError(400, 'No se recibieron datos para crear la propiedad');
    }

    const propertyData = validateAndTransformPropertyData(req.body);
    logger.info('Datos de propiedad procesados:', JSON.stringify(propertyData, null, 2));

    const query = `
      INSERT INTO properties (
        client, property_code, property_type_id, sale_type_id, legal_status_id,
        sale_value, commercial_value, street, exterior_number, interior_number,
        postal_code, extra_address, observation_id, land_size, construction_size,
        bedrooms, bathrooms, parking_spaces, has_garden, has_study,
        has_service_room, is_condominium, additional_info, title, description,
        main_image, state_id, municipality_id, colony_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = Object.values(propertyData);
    const [result] = await pool.execute(query, values);
    logger.info('Propiedad creada exitosamente:', result);

    res.status(201).json({
      success: true,
      message: 'Propiedad creada exitosamente',
      data: { propertyId: result.insertId }
    });
  } catch (error) {
    logger.error(`Error al crear la propiedad: ${error.message}`);
    next(error instanceof ApiError ? error : new ApiError(500, 'Error al crear la propiedad'));
  }
};

const updateProperty = async (req, res, next) => {
  try {
    const { id } = req.params;

    logger.info(`🔄 Intentando actualizar propiedad con ID: ${id}`);
    logger.info('🧾 Body recibido para actualización:', JSON.stringify(req.body, null, 2));

    if (!req.body || Object.keys(req.body).length === 0) {
      throw new ApiError(400, 'No se recibieron datos para actualizar la propiedad');
    }

    // Validar y transformar datos
    const propertyData = validateAndTransformPropertyData(req.body);

    logger.info('🛠 Campos limpios para actualización:', JSON.stringify(propertyData, null, 2));

    // Verificar si existe la propiedad antes de intentar actualizar
    const [existing] = await pool.execute('SELECT id FROM properties WHERE id = ?', [id]);
    if (existing.length === 0) {
      return next(new ApiError(404, 'Propiedad no encontrada para actualizar'));
    }

    const fields = Object.keys(propertyData).map(field => `${field} = ?`).join(', ');
    const values = Object.values(propertyData);

    const [result] = await pool.execute(
      `UPDATE properties SET ${fields} WHERE id = ?`,
      [...values, id]
    );

    logger.info(`✅ Resultado del UPDATE: ${JSON.stringify(result)}`);

    if (result.affectedRows === 0) {
      return next(new ApiError(400, 'No se realizó ninguna actualización'));
    }

    res.json({
      success: true,
      message: 'Propiedad actualizada exitosamente'
    });
  } catch (error) {
    logger.error(`❌ Error al actualizar la propiedad: ${error.message}`);
    next(error instanceof ApiError ? error : new ApiError(500, 'Error al actualizar la propiedad'));
  }
};


const deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Eliminar registros relacionados antes de la propiedad principal
    await pool.execute('DELETE FROM property_features WHERE property_id = ?', [id]);
    await pool.execute('DELETE FROM property_images WHERE property_id = ?', [id]);

    const [result] = await pool.execute('DELETE FROM properties WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return next(new ApiError(404, 'Propiedad no encontrada para eliminar'));
    }

    res.json({
      success: true,
      message: 'Propiedad eliminada exitosamente'
    });
  } catch (error) {
    logger.error(`Error al eliminar la propiedad: ${error.message}`);
    next(new ApiError(500, 'Error al eliminar la propiedad'));
  }
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
};
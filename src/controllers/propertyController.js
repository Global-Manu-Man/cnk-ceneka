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
    state: 'string',
    municipality: 'string',
    colony: 'string',

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
      'state', 'municipality', 'colony'
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [countResult] = await pool.query('SELECT COUNT(*) AS total FROM properties');
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    const [properties] = await pool.query(
      `SELECT 
        id, client, property_code, property_type_id, sale_type_id, legal_status_id,
        sale_value, commercial_value, street, exterior_number, interior_number,
        postal_code, extra_address, observation_id, land_size, construction_size,
        bedrooms, bathrooms, parking_spaces, has_garden, has_study,
        has_service_room, is_condominium, additional_info, title, description,
        state, municipality, colony
      FROM properties 
      ORDER BY id DESC 
      LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    if (!properties.length) {
      return res.status(200).json({
        success: true,
        data: [],
        pagination: {
          page,
          limit,
          total,
          pages: totalPages
        },
        message: "No hay más resultados disponibles"
      });
    }

    const propertyIds = properties.map(p => p.id);
    const placeholders = propertyIds.map(() => '?').join(', ');

    // 🔍 Obtener imágenes
    const [imageResults] = await pool.query(
      `SELECT property_id, id AS image_id, image_url 
       FROM property_images 
       WHERE property_id IN (${placeholders})`,
      propertyIds
    );

    // 🔍 Obtener features
    const [featureResults] = await pool.query(
      `SELECT property_id, feature 
       FROM property_features 
       WHERE property_id IN (${placeholders})`,
      propertyIds
    );

    // 🧠 Enriquecer propiedades con imágenes y features
    const enrichedProperties = properties.map(property => {
      const images = imageResults
        .filter(img => img.property_id === property.id)
        .map(img => ({
          id: img.image_id,
          url: img.image_url
        }));

      const features = featureResults
        .filter(f => f.property_id === property.id)
        .map(f => f.feature);

      return {
        ...property,
        images,
        features
      };
    });

    return res.status(200).json({
      success: true,
      data: enrichedProperties,
      pagination: {
        page,
        limit,
        total,
        pages: totalPages
      }
    });

  } catch (error) {
    logger.error(`Error al obtener las propiedades: ${error.message}`);
    next(new ApiError(500, 'Error al obtener las propiedades'));
  }
};




const getPropertyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Obtener la propiedad sin el campo main_image
    const [properties] = await pool.execute(`
      SELECT 
        id, client, property_code, property_type_id, sale_type_id, legal_status_id,
        sale_value, commercial_value, street, exterior_number, interior_number,
        postal_code, extra_address, observation_id, land_size, construction_size,
        bedrooms, bathrooms, parking_spaces, has_garden, has_study,
        has_service_room, is_condominium, additional_info, title, description,
        state, municipality, colony
      FROM properties
      WHERE id = ?
    `, [id]);

    if (properties.length === 0) {
      return next(new ApiError(404, 'Propiedad no encontrada'));
    }

    const property = properties[0];

    // Obtener imágenes relacionadas
    const [images] = await pool.execute(
      'SELECT id AS image_id, image_url FROM property_images WHERE property_id = ?',
      [id]
    );

    const imageList = images.map(img => ({
      id: img.image_id,
      url: img.image_url
    }));

    // ✅ Obtener features relacionados
    const [features] = await pool.execute(
      'SELECT feature FROM property_features WHERE property_id = ?',
      [id]
    );

    const featureList = features.map(f => f.feature);

    // Respuesta completa
    res.json({
      success: true,
      data: {
        ...property,
        images: imageList,
        features: featureList
      }
    });
  } catch (error) {
    logger.error(`Error al obtener la propiedad: ${error.message}`);
    next(new ApiError(500, 'Error al obtener la propiedad'));
  }
};




const createProperty = async (req, res, next) => {
  try {
    logger.info('Iniciando creación de propiedad');
    logger.info('Body recibido:', JSON.stringify(req.body, null, 2));

    if (!req.body || Object.keys(req.body).length === 0) {
      throw new ApiError(400, 'No se recibieron datos para crear la propiedad');
    }

    // =========================
    // Validar imágenes (mínimo 1) y definir portada
    // =========================
    console.log('req.files:', req.files);
    if (!Array.isArray(req.files) || req.files.length === 0) {
      throw new ApiError(400, 'Debes proporcionar al menos una imagen para registrar la propiedad');
    }

    const portada = req.files[0]; // La primera imagen será la portada

    // 🔁 Renombrar campos esperados desde el frontend
    const transformedInput = {
      ...req.body,
      sale_value: req.body.price,
      construction_size: req.body.sqft,
      state: req.body.state,
      municipality: req.body.municipality,
      colony: req.body.colony
    };

    logger.info('Input transformado:', JSON.stringify(transformedInput, null, 2));

    // Validar campos requeridos y transformar el objeto
    const propertyData = validateAndTransformPropertyData(transformedInput);

    logger.info('Datos listos para insertar:', JSON.stringify(propertyData, null, 2));

    // DEBUG: Verifica que haya 31 valores
    console.log('propertyData:', propertyData);
    //console.log('Valores a insertar:', Object.values(propertyData));
    console.log('Total de valores:', Object.values(propertyData).length);

    // Insertar en la tabla 'properties'
    const insertPropertyQuery = `
  INSERT INTO properties (
    client, property_code, property_type_id, sale_type_id, legal_status_id,
    sale_value, commercial_value, street, exterior_number, interior_number,
    postal_code, extra_address, observation_id, land_size, construction_size,
    bedrooms, bathrooms, parking_spaces, has_garden, has_study,
    has_service_room, is_condominium, additional_info, title, description,
    state, municipality, colony
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

  
    const values = Object.values(propertyData);
    const [result] = await pool.execute(insertPropertyQuery, values);
    const propertyId = result.insertId;

    // =========================
    // Guardar features
    // =========================
    if (Array.isArray(req.body.features)) {
      const featureInsertQuery = 'INSERT INTO property_features (property_id, feature) VALUES (?, ?)';
      for (const feature of req.body.features) {
        await pool.execute(featureInsertQuery, [propertyId, feature]);
      }
    }

    // =========================
    // Guardar imágenes adicionales
    // =========================
    const imagePaths = req.files.map(file => file.path);
    const imageInsertQuery = 'INSERT INTO property_images (property_id, image_url) VALUES (?, ?)';
    for (const imageUrl of imagePaths) {
      await pool.execute(imageInsertQuery, [propertyId, imageUrl]);
    }

    // =========================
    // Recuperar la propiedad creada con JOINs
    // =========================
    const [propertyRows] = await pool.execute(`
      SELECT 
        p.*, 
        pt.descripcion AS property_type, 
        st.descripcion AS sale_type, 
        ls.descripcion AS legal_status
      FROM properties p
      LEFT JOIN property_type pt ON p.property_type_id = pt.id
      LEFT JOIN sale_type st ON p.sale_type_id = st.id
      LEFT JOIN legal_status ls ON p.legal_status_id = ls.id
      WHERE p.id = ?
    `, [propertyId]);

    const property = propertyRows[0];

    // Obtener features
    const [featuresRows] = await pool.execute(
      'SELECT feature FROM property_features WHERE property_id = ?', [propertyId]
    );
    const features = featuresRows.map(f => f.feature);

    // Obtener imágenes adicionales
    const [imageRows] = await pool.execute(
      'SELECT image_url FROM property_images WHERE property_id = ?', [propertyId]
    );
    const images = imageRows.map(img => img.image_url);

    // Armar la respuesta final para el frontend
    const formatted = {
      id: property.id,
      title: property.title,
      price: `$${parseFloat(property.sale_value).toLocaleString('es-MX')}`,
      beds: property.bedrooms,
      baths: property.bathrooms,
      sqft: property.construction_size,
      description: property.description,
      features,
      location: `${property.colony}, ${property.municipality}, ${property.state}`,
      images,
      propertyType: property.property_type,
      saleType: property.sale_type,
      legalStatus: property.legal_status,
      commercialValue: `$${parseFloat(property.commercial_value).toLocaleString('es-MX')}`,
      state: property.state,
      municipality: property.municipality,
      colony: property.colony,
      street: property.street,
      landSize: property.land_size,
      constructionSize: property.construction_size,
      hasGarden: !!property.has_garden,
      hasStudy: !!property.has_study,
      hasServiceRoom: !!property.has_service_room,
      hasCondominium: !!property.is_condominium
    };

    res.status(201).json({
      success: true,
      message: 'Propiedad creada exitosamente',
      data: formatted
    });
  } catch (error) {
    logger.error(`Error al crear la propiedad: ${error.message}`);
    next(error instanceof ApiError ? error : new ApiError(500, 'Error al crear la propiedad'));
  }
};


const updateProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    logger.info(`🔄 Iniciando actualización de propiedad ID: ${id}`);
    logger.info('Body recibido:', JSON.stringify(req.body, null, 2));

    if (!req.body || Object.keys(req.body).length === 0) {
      throw new ApiError(400, 'No se recibieron datos para actualizar la propiedad');
    }

    // =========================
    // Validar imágenes si se envían
    // =========================
    if (req.files) {
      console.log('Archivos recibidos:', req.files);
      if (!Array.isArray(req.files) || req.files.length === 0) {
        throw new ApiError(400, 'Debes proporcionar al menos una imagen para actualizar la propiedad');
      }
    }

    // 🔁 Renombrar campos esperados desde el frontend
    const transformedInput = {
      ...req.body,
      sale_value: req.body.price,
      construction_size: req.body.sqft,
      state: req.body.state,
      municipality: req.body.municipality,
      colony: req.body.colony
    };

    logger.info('Input transformado:', JSON.stringify(transformedInput, null, 2));

    // Validar campos requeridos y transformar el objeto
    const propertyData = validateAndTransformPropertyData(transformedInput);

    logger.info('Datos listos para actualizar:', JSON.stringify(propertyData, null, 2));

    // Verificar si existe la propiedad antes de actualizar
    const [existing] = await pool.execute('SELECT id FROM properties WHERE id = ?', [id]);
    if (existing.length === 0) {
      return next(new ApiError(404, 'Propiedad no encontrada para actualizar'));
    }

    // Construir la consulta de actualización dinámicamente
    const fields = Object.keys(propertyData).map(field => `${field} = ?`).join(', ');
    const values = Object.values(propertyData);

    // Actualizar la propiedad
    const [result] = await pool.execute(
      `UPDATE properties SET ${fields} WHERE id = ?`,
      [...values, id]
    );

    if (result.affectedRows === 0) {
      return next(new ApiError(400, 'No se realizó ninguna actualización'));
    }

    // =========================
    // Actualizar features si se envían
    // =========================
    if (Array.isArray(req.body.features)) {
      // Eliminar features existentes
      await pool.execute('DELETE FROM property_features WHERE property_id = ?', [id]);
      
      // Insertar nuevos features
      const featureInsertQuery = 'INSERT INTO property_features (property_id, feature) VALUES (?, ?)';
      for (const feature of req.body.features) {
        await pool.execute(featureInsertQuery, [id, feature]);
      }
    }

    // =========================
    // Actualizar imágenes si se envían
    // =========================
    if (req.files && req.files.length > 0) {
      // Eliminar imágenes existentes
      await pool.execute('DELETE FROM property_images WHERE property_id = ?', [id]);
      
      // Insertar nuevas imágenes
      const imagePaths = req.files.map(file => file.path);
      const imageInsertQuery = 'INSERT INTO property_images (property_id, image_url) VALUES (?, ?)';
      for (const imageUrl of imagePaths) {
        await pool.execute(imageInsertQuery, [id, imageUrl]);
      }
    }

    // =========================
    // Recuperar la propiedad actualizada con JOINs
    // =========================
    const [propertyRows] = await pool.execute(`
      SELECT 
        p.*, 
        pt.descripcion AS property_type, 
        st.descripcion AS sale_type, 
        ls.descripcion AS legal_status
      FROM properties p
      LEFT JOIN property_type pt ON p.property_type_id = pt.id
      LEFT JOIN sale_type st ON p.sale_type_id = st.id
      LEFT JOIN legal_status ls ON p.legal_status_id = ls.id
      WHERE p.id = ?
    `, [id]);

    const property = propertyRows[0];

    // Obtener features actualizados
    const [featuresRows] = await pool.execute(
      'SELECT feature FROM property_features WHERE property_id = ?', [id]
    );
    const features = featuresRows.map(f => f.feature);

    // Obtener imágenes actualizadas
    const [imageRows] = await pool.execute(
      'SELECT image_url FROM property_images WHERE property_id = ?', [id]
    );
    const images = imageRows.map(img => img.image_url);

    // Formatear la respuesta
    const formatted = {
      id: property.id,
      title: property.title,
      price: `$${parseFloat(property.sale_value).toLocaleString('es-MX')}`,
      beds: property.bedrooms,
      baths: property.bathrooms,
      sqft: property.construction_size,
      description: property.description,
      features,
      location: `${property.colony}, ${property.municipality}, ${property.state}`,
      images,
      propertyType: property.property_type,
      saleType: property.sale_type,
      legalStatus: property.legal_status,
      commercialValue: `$${parseFloat(property.commercial_value).toLocaleString('es-MX')}`,
      state: property.state,
      municipality: property.municipality,
      colony: property.colony,
      street: property.street,
      landSize: property.land_size,
      constructionSize: property.construction_size,
      hasGarden: !!property.has_garden,
      hasStudy: !!property.has_study,
      hasServiceRoom: !!property.has_service_room,
      hasCondominium: !!property.is_condominium
    };

    res.json({
      success: true,
      message: 'Propiedad actualizada exitosamente',
      data: formatted
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
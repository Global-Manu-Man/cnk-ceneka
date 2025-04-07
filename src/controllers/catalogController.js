const { pool } = require('../config/database');
const { ApiError } = require('../utils/ApiError');
const { logger } = require('../utils/logger');

const getCatalog = (table, label = 'catalogo') => async (req, res, next) => {
  try {
    const [rows] = await pool.execute(`SELECT * FROM ${table}`);
    res.json({ success: true, data: rows });
  } catch (error) {
    logger.error(`Error al obtener ${label}: ${error.message}`);
    next(new ApiError(500, `Error al obtener ${label}`));
  }
};

const getMunicipalitiesByState = async (req, res, next) => {
  try {
    const { state_id } = req.query;
    if (!state_id) return next(new ApiError(400, 'Se requiere state_id'));

    const [rows] = await pool.execute('SELECT * FROM municipalities WHERE state_id = ?', [state_id]);
    res.json({ success: true, data: rows });
  } catch (error) {
    logger.error(`Error al obtener municipios: ${error.message}`);
    next(new ApiError(500, 'Error al obtener municipios'));
  }
};

const getColoniesByMunicipality = async (req, res, next) => {
  try {
    const { municipality_id } = req.query;
    if (!municipality_id) return next(new ApiError(400, 'Se requiere municipality_id'));

    const [rows] = await pool.execute('SELECT * FROM colonies WHERE municipality_id = ?', [municipality_id]);
    res.json({ success: true, data: rows });
  } catch (error) {
    logger.error(`Error al obtener colonias: ${error.message}`);
    next(new ApiError(500, 'Error al obtener colonias'));
  }
};

// Métodos CRUD para property_type
const createPropertyType = async (req, res, next) => {
  try {
    const { descripcion } = req.body;
    if (!descripcion) return next(new ApiError(400, 'La descripción es obligatoria'));

    const [result] = await pool.execute('INSERT INTO property_type (descripcion) VALUES (?)', [descripcion]);
    res.status(201).json({ success: true, id: result.insertId });
  } catch (error) {
    logger.error(`Error al crear tipo de propiedad: ${error.message}`);
    next(new ApiError(500, 'Error al crear tipo de propiedad'));
  }
};

const updatePropertyType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { descripcion } = req.body;
    if (!descripcion) return next(new ApiError(400, 'La descripción es obligatoria'));

    const [result] = await pool.execute('UPDATE property_type SET descripcion = ? WHERE id = ?', [descripcion, id]);
    if (result.affectedRows === 0) return next(new ApiError(404, 'Tipo de propiedad no encontrado'));

    res.json({ success: true });
  } catch (error) {
    logger.error(`Error al actualizar tipo de propiedad: ${error.message}`);
    next(new ApiError(500, 'Error al actualizar tipo de propiedad'));
  }
};

const deletePropertyType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute('DELETE FROM property_type WHERE id = ?', [id]);
    if (result.affectedRows === 0) return next(new ApiError(404, 'Tipo de propiedad no encontrado'));

    res.json({ success: true });
  } catch (error) {
    logger.error(`Error al eliminar tipo de propiedad: ${error.message}`);
    next(new ApiError(500, 'Error al eliminar tipo de propiedad'));
  }
};


// Obtener todos los tipos de propiedad
const getAllPropertyTypes = async (req, res, next) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM property_type');
    res.json({ success: true, data: rows });
  } catch (error) {
    logger.error(`Error al obtener tipos de propiedad: ${error.message}`);
    next(new ApiError(500, 'Error al obtener tipos de propiedad'));
  }
};

// Obtener tipo de propiedad por ID
const getPropertyTypeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute('SELECT * FROM property_type WHERE id = ?', [id]);

    if (rows.length === 0) return next(new ApiError(404, 'Tipo de propiedad no encontrado'));

    res.json({ success: true, data: rows[0] });
  } catch (error) {
    logger.error(`Error al obtener tipo de propiedad por ID: ${error.message}`);
    next(new ApiError(500, 'Error al obtener tipo de propiedad'));
  }
};


// Métodos CRUD para sale_type
const createSaleType = async (req, res, next) => {
  try {
    const { descripcion } = req.body;
    if (!descripcion) return next(new ApiError(400, 'La descripción es obligatoria'));

    const [result] = await pool.execute('INSERT INTO sale_type (descripcion) VALUES (?)', [descripcion]);
    res.status(201).json({ success: true, id: result.insertId });
  } catch (error) {
    logger.error(`Error al crear tipo de venta: ${error.message}`);
    next(new ApiError(500, 'Error al crear tipo de venta'));
  }
};

const updateSaleType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { descripcion } = req.body;
    if (!descripcion) return next(new ApiError(400, 'La descripción es obligatoria'));

    const [result] = await pool.execute('UPDATE sale_type SET descripcion = ? WHERE id = ?', [descripcion, id]);
    if (result.affectedRows === 0) return next(new ApiError(404, 'Tipo de venta no encontrado'));

    res.json({ success: true });
  } catch (error) {
    logger.error(`Error al actualizar tipo de venta: ${error.message}`);
    next(new ApiError(500, 'Error al actualizar tipo de venta'));
  }
};

const deleteSaleType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute('DELETE FROM sale_type WHERE id = ?', [id]);
    if (result.affectedRows === 0) return next(new ApiError(404, 'Tipo de venta no encontrado'));

    res.json({ success: true });
  } catch (error) {
    logger.error(`Error al eliminar tipo de venta: ${error.message}`);
    next(new ApiError(500, 'Error al eliminar tipo de venta'));
  }
};

// Métodos CRUD para legal_status
const createLegalStatus = async (req, res, next) => {
  try {
    const { descripcion } = req.body;
    if (!descripcion) return next(new ApiError(400, 'La descripción es obligatoria'));

    const [result] = await pool.execute('INSERT INTO legal_status (descripcion) VALUES (?)', [descripcion]);
    res.status(201).json({ success: true, id: result.insertId });
  } catch (error) {
    logger.error(`Error al crear estatus legal: ${error.message}`);
    next(new ApiError(500, 'Error al crear estatus legal'));
  }
};

const updateLegalStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { descripcion } = req.body;
    if (!descripcion) return next(new ApiError(400, 'La descripción es obligatoria'));

    const [result] = await pool.execute('UPDATE legal_status SET descripcion = ? WHERE id = ?', [descripcion, id]);
    if (result.affectedRows === 0) return next(new ApiError(404, 'Estatus legal no encontrado'));

    res.json({ success: true });
  } catch (error) {
    logger.error(`Error al actualizar estatus legal: ${error.message}`);
    next(new ApiError(500, 'Error al actualizar estatus legal'));
  }
};

const deleteLegalStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute('DELETE FROM legal_status WHERE id = ?', [id]);
    if (result.affectedRows === 0) return next(new ApiError(404, 'Estatus legal no encontrado'));

    res.json({ success: true });
  } catch (error) {
    logger.error(`Error al eliminar estatus legal: ${error.message}`);
    next(new ApiError(500, 'Error al eliminar estatus legal'));
  }
};

// CRUD para states
const createState = async (req, res, next) => {
    try {
      const { name } = req.body;
      if (!name) return next(new ApiError(400, 'El nombre es obligatorio'));
  
      const [result] = await pool.execute('INSERT INTO states (name) VALUES (?)', [name]);
      res.status(201).json({ success: true, id: result.insertId });
    } catch (error) {
      logger.error(`Error al crear estado: ${error.message}`);
      next(new ApiError(500, 'Error al crear estado'));
    }
  };
  
  const updateState = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      if (!name) return next(new ApiError(400, 'El nombre es obligatorio'));
  
      const [result] = await pool.execute('UPDATE states SET name = ? WHERE id = ?', [name, id]);
      if (result.affectedRows === 0) return next(new ApiError(404, 'Estado no encontrado'));
  
      res.json({ success: true });
    } catch (error) {
      logger.error(`Error al actualizar estado: ${error.message}`);
      next(new ApiError(500, 'Error al actualizar estado'));
    }
  };
  
  const deleteState = async (req, res, next) => {
    try {
      const { id } = req.params;
      const [result] = await pool.execute('DELETE FROM states WHERE id = ?', [id]);
      if (result.affectedRows === 0) return next(new ApiError(404, 'Estado no encontrado'));
  
      res.json({ success: true });
    } catch (error) {
      logger.error(`Error al eliminar estado: ${error.message}`);
      next(new ApiError(500, 'Error al eliminar estado'));
    }
  };
  
  // CRUD para municipalities
  const createMunicipality = async (req, res, next) => {
    try {
      const { name, state_id } = req.body;
      if (!name || !state_id) return next(new ApiError(400, 'Nombre y state_id son obligatorios'));
  
      const [result] = await pool.execute('INSERT INTO municipalities (name, state_id) VALUES (?, ?)', [name, state_id]);
      res.status(201).json({ success: true, id: result.insertId });
    } catch (error) {
      logger.error(`Error al crear municipio: ${error.message}`);
      next(new ApiError(500, 'Error al crear municipio'));
    }
  };
  
  const updateMunicipality = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, state_id } = req.body;
      if (!name || !state_id) return next(new ApiError(400, 'Nombre y state_id son obligatorios'));
  
      const [result] = await pool.execute('UPDATE municipalities SET name = ?, state_id = ? WHERE id = ?', [name, state_id, id]);
      if (result.affectedRows === 0) return next(new ApiError(404, 'Municipio no encontrado'));
  
      res.json({ success: true });
    } catch (error) {
      logger.error(`Error al actualizar municipio: ${error.message}`);
      next(new ApiError(500, 'Error al actualizar municipio'));
    }
  };
  
  const deleteMunicipality = async (req, res, next) => {
    try {
      const { id } = req.params;
      const [result] = await pool.execute('DELETE FROM municipalities WHERE id = ?', [id]);
      if (result.affectedRows === 0) return next(new ApiError(404, 'Municipio no encontrado'));
  
      res.json({ success: true });
    } catch (error) {
      logger.error(`Error al eliminar municipio: ${error.message}`);
      next(new ApiError(500, 'Error al eliminar municipio'));
    }
  };
  
  // CRUD para colonies
  const createColony = async (req, res, next) => {
    try {
      const { name, municipality_id } = req.body;
      if (!name || !municipality_id) return next(new ApiError(400, 'Nombre y municipality_id son obligatorios'));
  
      const [result] = await pool.execute('INSERT INTO colonies (name, municipality_id) VALUES (?, ?)', [name, municipality_id]);
      res.status(201).json({ success: true, id: result.insertId });
    } catch (error) {
      logger.error(`Error al crear colonia: ${error.message}`);
      next(new ApiError(500, 'Error al crear colonia'));
    }
  };
  
  const updateColony = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, municipality_id } = req.body;
      if (!name || !municipality_id) return next(new ApiError(400, 'Nombre y municipality_id son obligatorios'));
  
      const [result] = await pool.execute('UPDATE colonies SET name = ?, municipality_id = ? WHERE id = ?', [name, municipality_id, id]);
      if (result.affectedRows === 0) return next(new ApiError(404, 'Colonia no encontrada'));
  
      res.json({ success: true });
    } catch (error) {
      logger.error(`Error al actualizar colonia: ${error.message}`);
      next(new ApiError(500, 'Error al actualizar colonia'));
    }
  };
  
  const deleteColony = async (req, res, next) => {
    try {
      const { id } = req.params;
      const [result] = await pool.execute('DELETE FROM colonies WHERE id = ?', [id]);
      if (result.affectedRows === 0) return next(new ApiError(404, 'Colonia no encontrada'));
  
      res.json({ success: true });
    } catch (error) {
      logger.error(`Error al eliminar colonia: ${error.message}`);
      next(new ApiError(500, 'Error al eliminar colonia'));
    }
  };
  

module.exports = {
  getPropertyTypes: getCatalog('property_type', 'tipos de propiedad'),
  getSaleTypes: getCatalog('sale_type', 'tipos de venta'),
  getLegalStatuses: getCatalog('legal_status', 'estatus legales'),
  getStates: getCatalog('states', 'estados'),
  getMunicipalitiesByState,
  getColoniesByMunicipality,
  createPropertyType,
  updatePropertyType,
  deletePropertyType,
  getAllPropertyTypes,
  getPropertyTypeById,
  createSaleType,
  updateSaleType,
  deleteSaleType,
  createLegalStatus,
  updateLegalStatus,
  deleteLegalStatus,
  createState,
  updateState,
  deleteState,
  createMunicipality,
  updateMunicipality,
  deleteMunicipality,
  createColony,
  updateColony,
  deleteColony
};

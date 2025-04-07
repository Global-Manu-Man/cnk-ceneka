const mysql = require('mysql2/promise');
const { logger } = require('../utils/logger');

// Validar que todas las variables necesarias estén definidas
const requiredEnvVars = [
  'DATABASE_HOST',
  'DATABASE_PORT',
  'DATABASE_USER',
  'DATABASE_PASSWORD',
  'DATABASE_NAME'
];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    logger.error(`❌ Falta la variable de entorno: ${key}`);
    process.exit(1); // Detener la app si falta una variable importante
  }
});

// Crear pool de conexiones
const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false // requerido por muchos servicios cloud como filess.io
  }
});

// Verificar la conexión y mostrar información útil
const checkDatabaseConnection = async () => {
  try {
    const connection = await pool.getConnection();
    logger.info(`✅ Conexión exitosa a la base de datos MySQL 🐬
    - Host: ${process.env.DATABASE_HOST}
    - Puerto: ${process.env.DATABASE_PORT}
    - Usuario: ${process.env.DATABASE_USER}
    - Base de datos: ${process.env.DATABASE_NAME}`);

    // Verificar versión del servidor
    const [serverInfo] = await connection.query('SELECT VERSION() as version');
    logger.info(`📦 Versión del servidor MySQL: ${serverInfo[0].version}`);

    connection.release();
  } catch (error) {
    logger.error(`❌ Error conectando a la base de datos: ${error.message}`);
    throw error;
  }
};

// Función de prueba rápida de consulta
const testQuery = async () => {
  try {
    const [rows] = await pool.query('SELECT NOW() AS now');
    logger.info(`🕒 Prueba de consulta exitosa, fecha actual: ${rows[0].now}`);
  } catch (err) {
    logger.error(`⚠️ Error al hacer testQuery: ${err.message}`);
  }
};

module.exports = {
  pool,
  checkDatabaseConnection,
  testQuery
};
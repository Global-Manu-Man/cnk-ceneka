require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const { errorHandler } = require('./middleware/errorHandler');
const routes = require('./routes');
const { logger } = require('./utils/logger');
const { initializeFirebase } = require('./config/firebase');
const { checkDatabaseConnection } = require('./config/database');
const { handleNotFound } = require('./controllers/notFoundController');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Firebase Admin
initializeFirebase();

// Verificar conexión a la base de datos
checkDatabaseConnection()
  .catch(error => {
    logger.error('No se pudo inicializar la conexión a la base de datos');
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Configuración de Swagger UI sin autenticación
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    tryItOutEnabled: true
  },
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "API de Propiedades - Documentación"
}));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api', routes);

// Manejo de rutas no encontradas para cualquier otra ruta
app.all('*', handleNotFound);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  logger.info(`API Documentation available at http://localhost:${PORT}/api-docs`);
});
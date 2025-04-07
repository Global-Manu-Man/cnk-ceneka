const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Real Estate API',
      version: '1.0.0',
      description: 'API para gestión de propiedades inmobiliarias y catálogos relacionados',
      contact: {
        name: 'API Support',
        email: 'support@realestate.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Property: {
          type: 'object',
          required: [
            'client',
            'property_code',
            'property_type_id',
            'sale_type_id',
            'legal_status_id',
            'sale_value',
            'commercial_value',
            'street',
            'exterior_number',
            'postal_code',
            'land_size',
            'construction_size',
            'bedrooms',
            'bathrooms',
            'parking_spaces',
            'title',
            'description',
            'main_image',
            'state_id',
            'municipality_id',
            'colony_id'
          ],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único de la propiedad',
              example: 1
            },
            client: {
              type: 'string',
              description: 'Nombre del cliente',
              example: 'Juan Pérez'
            },
            property_code: {
              type: 'string',
              description: 'Código único de la propiedad',
              example: 'PROP-001'
            },
            property_type_id: {
              type: 'integer',
              description: 'ID del tipo de propiedad',
              example: 1
            },
            sale_type_id: {
              type: 'integer',
              description: 'ID del tipo de venta',
              example: 1
            },
            legal_status_id: {
              type: 'integer',
              description: 'ID del estado legal',
              example: 1
            },
            sale_value: {
              type: 'number',
              format: 'float',
              description: 'Valor de venta',
              example: 500000.50
            },
            commercial_value: {
              type: 'number',
              format: 'float',
              description: 'Valor comercial',
              example: 550000.00
            },
            street: {
              type: 'string',
              description: 'Nombre de la calle',
              example: 'Av. Reforma'
            },
            exterior_number: {
              type: 'string',
              description: 'Número exterior',
              example: '123'
            },
            interior_number: {
              type: 'string',
              description: 'Número interior (opcional)',
              example: 'A'
            },
            postal_code: {
              type: 'string',
              description: 'Código postal',
              example: '06600'
            },
            extra_address: {
              type: 'string',
              description: 'Información adicional de dirección (opcional)',
              example: 'Entre calles Juárez e Hidalgo'
            },
            observation_id: {
              type: 'integer',
              description: 'ID de observación (opcional)',
              example: 1
            },
            land_size: {
              type: 'number',
              format: 'float',
              description: 'Tamaño del terreno en m²',
              example: 250.5
            },
            construction_size: {
              type: 'number',
              format: 'float',
              description: 'Tamaño de la construcción en m²',
              example: 180.0
            },
            bedrooms: {
              type: 'integer',
              description: 'Número de habitaciones',
              example: 3
            },
            bathrooms: {
              type: 'integer',
              description: 'Número de baños',
              example: 2
            },
            parking_spaces: {
              type: 'integer',
              description: 'Número de espacios de estacionamiento',
              example: 1
            },
            has_garden: {
              type: 'boolean',
              description: 'Indica si tiene jardín',
              example: true
            },
            has_study: {
              type: 'boolean',
              description: 'Indica si tiene estudio',
              example: false
            },
            has_service_room: {
              type: 'boolean',
              description: 'Indica si tiene cuarto de servicio',
              example: true
            },
            is_condominium: {
              type: 'boolean',
              description: 'Indica si es condominio',
              example: false
            },
            additional_info: {
              type: 'string',
              description: 'Información adicional (opcional)',
              example: 'La propiedad cuenta con alarma y cámaras de seguridad'
            },
            title: {
              type: 'string',
              description: 'Título de la propiedad',
              example: 'Hermosa casa en zona residencial'
            },
            description: {
              type: 'string',
              description: 'Descripción detallada',
              example: 'Amplia casa con 3 recámaras, 2 baños completos, cocina integral, jardín frontal y trasero.'
            },
            main_image: {
              type: 'string',
              format: 'uri',
              description: 'URL de la imagen principal',
              example: 'https://example.com/images/property1.jpg'
            },
            state_id: {
              type: 'integer',
              description: 'ID del estado',
              example: 9
            },
            municipality_id: {
              type: 'integer',
              description: 'ID del municipio',
              example: 120
            },
            colony_id: {
              type: 'integer',
              description: 'ID de la colonia',
              example: 3456
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
              example: '2023-01-15T10:30:00Z'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización',
              example: '2023-01-20T15:45:00Z'
            }
          }
        },
        CatalogItem: {
          type: 'object',
          required: ['descripcion'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único del elemento del catálogo',
              example: 1
            },
            descripcion: {
              type: 'string',
              description: 'Descripción del elemento del catálogo',
              example: 'Casa'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
              example: '2023-01-10T12:00:00Z'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización',
              example: '2023-01-10T12:00:00Z'
            }
          }
        },
        LocationItem: {
          type: 'object',
          required: ['name'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único de la ubicación',
              example: 1
            },
            name: {
              type: 'string',
              description: 'Nombre de la ubicación',
              example: 'Ciudad de México'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
              example: '2023-01-05T09:00:00Z'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización',
              example: '2023-01-05T09:00:00Z'
            }
          }
        },
        Municipality: {
          allOf: [
            { $ref: '#/components/schemas/LocationItem' },
            {
              type: 'object',
              properties: {
                state_id: {
                  type: 'integer',
                  description: 'ID del estado al que pertenece',
                  example: 9
                }
              }
            }
          ]
        },
        Colony: {
          allOf: [
            { $ref: '#/components/schemas/LocationItem' },
            {
              type: 'object',
              properties: {
                municipality_id: {
                  type: 'integer',
                  description: 'ID del municipio al que pertenece',
                  example: 120
                }
              }
            }
          ]
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Error message describing what went wrong'
            },
            errors: {
              type: 'array',
              items: {
                type: 'string'
              },
              example: ['Field "name" is required', 'Field "email" must be valid']
            }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Operation completed successfully'
            },
            data: {
              type: 'object',
              additionalProperties: true
            }
          }
        }
      },
      parameters: {
        propertyId: {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID de la propiedad'
        },
        catalogItemId: {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID del elemento del catálogo'
        },
        stateIdQuery: {
          in: 'query',
          name: 'state_id',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID del estado'
        },
        municipalityIdQuery: {
          in: 'query',
          name: 'municipality_id',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID del municipio'
        }
      }
    },
  },
  apis: ['./src/routes/*.js'],
  paths: {
    // Property endpoints
    '/properties': {
      get: {
        tags: ['Propiedades'],
        summary: 'Obtiene todas las propiedades',
        description: 'Retorna una lista de todas las propiedades registradas en el sistema',
        responses: {
          200: {
            description: 'Lista de propiedades obtenida exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true
                    },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Property'
                      }
                    }
                  }
                }
              }
            }
          },
          500: {
            description: 'Error del servidor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Propiedades'],
        summary: 'Crea una nueva propiedad',
        description: 'Crea un nuevo registro de propiedad con los datos proporcionados',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          description: 'Datos de la propiedad a crear',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Property'
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Propiedad creada exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse'
                }
              }
            }
          },
          400: {
            description: 'Datos inválidos o faltantes',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          },
          401: {
            description: 'No autorizado - Se requiere autenticación'
          },
          500: {
            description: 'Error del servidor al crear la propiedad'
          }
        }
      }
    },
    '/properties/{id}': {
      get: {
        tags: ['Propiedades'],
        summary: 'Obtiene una propiedad por ID',
        description: 'Retorna los detalles de una propiedad específica según su ID',
        parameters: [{ $ref: '#/components/parameters/propertyId' }],
        responses: {
          200: {
            description: 'Propiedad encontrada',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true
                    },
                    data: {
                      $ref: '#/components/schemas/Property'
                    }
                  }
                }
              }
            }
          },
          404: {
            description: 'Propiedad no encontrada',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          },
          500: {
            description: 'Error del servidor'
          }
        }
      },
      put: {
        tags: ['Propiedades'],
        summary: 'Actualiza una propiedad existente',
        description: 'Actualiza los datos de una propiedad existente según su ID',
        security: [{ BearerAuth: [] }],
        parameters: [{ $ref: '#/components/parameters/propertyId' }],
        requestBody: {
          required: true,
          description: 'Datos actualizados de la propiedad',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Property'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Propiedad actualizada exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse'
                }
              }
            }
          },
          400: {
            description: 'Datos inválidos o faltantes'
          },
          401: {
            description: 'No autorizado'
          },
          404: {
            description: 'Propiedad no encontrada'
          },
          500: {
            description: 'Error del servidor'
          }
        }
      },
      delete: {
        tags: ['Propiedades'],
        summary: 'Elimina una propiedad',
        description: 'Elimina una propiedad existente según su ID',
        security: [{ BearerAuth: [] }],
        parameters: [{ $ref: '#/components/parameters/propertyId' }],
        responses: {
          200: {
            description: 'Propiedad eliminada exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse'
                }
              }
            }
          },
          401: {
            description: 'No autorizado'
          },
          404: {
            description: 'Propiedad no encontrada'
          },
          500: {
            description: 'Error del servidor'
          }
        }
      }
    },

    // Property Types Catalog
    '/properties/catalogs/property-types': {
      get: {
        tags: ['Tipos de Propiedad'],
        summary: 'Obtiene todos los tipos de propiedad',
        description: 'Retorna una lista de todos los tipos de propiedad disponibles en el sistema',
        responses: {
          200: {
            description: 'Lista de tipos de propiedad obtenida exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true
                    },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/CatalogItem'
                      }
                    }
                  }
                }
              }
            }
          },
          500: {
            description: 'Error del servidor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Tipos de Propiedad'],
        summary: 'Crea un nuevo tipo de propiedad',
        description: 'Crea un nuevo registro en el catálogo de tipos de propiedad',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          description: 'Datos del tipo de propiedad a crear',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CatalogItem'
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Tipo de propiedad creado exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse'
                }
              }
            }
          },
          400: {
            description: 'Datos inválidos o faltantes',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          },
          401: {
            description: 'No autorizado'
          },
          500: {
            description: 'Error del servidor'
          }
        }
      }
    },
    '/properties/catalogs/property-types/{id}': {
      put: {
        tags: ['Tipos de Propiedad'],
        summary: 'Actualiza un tipo de propiedad',
        description: 'Actualiza la descripción de un tipo de propiedad existente',
        security: [{ BearerAuth: [] }],
        parameters: [{ $ref: '#/components/parameters/catalogItemId' }],
        requestBody: {
          required: true,
          description: 'Nueva descripción para el tipo de propiedad',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CatalogItem'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Tipo de propiedad actualizado exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse'
                }
              }
            }
          },
          400: {
            description: 'Datos inválidos o faltantes'
          },
          401: {
            description: 'No autorizado'
          },
          404: {
            description: 'Tipo de propiedad no encontrado'
          },
          500: {
            description: 'Error del servidor'
          }
        }
      },
      delete: {
        tags: ['Tipos de Propiedad'],
        summary: 'Elimina un tipo de propiedad',
        description: 'Elimina un tipo de propiedad del catálogo',
        security: [{ BearerAuth: [] }],
        parameters: [{ $ref: '#/components/parameters/catalogItemId' }],
        responses: {
          200: {
            description: 'Tipo de propiedad eliminado exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse'
                }
              }
            }
          },
          401: {
            description: 'No autorizado'
          },
          404: {
            description: 'Tipo de propiedad no encontrado'
          },
          500: {
            description: 'Error del servidor'
          }
        }
      }
    },

    // Sale Types Catalog
    '/properties/catalogs/sale-types': {
      get: {
        tags: ['Tipos de Venta'],
        summary: 'Obtiene todos los tipos de venta',
        description: 'Retorna una lista de todos los tipos de venta disponibles en el sistema',
        responses: {
          200: {
            description: 'Lista de tipos de venta obtenida exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true
                    },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/CatalogItem'
                      }
                    }
                  }
                }
              }
            }
          },
          500: {
            description: 'Error del servidor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Tipos de Venta'],
        summary: 'Crea un nuevo tipo de venta',
        description: 'Crea un nuevo registro en el catálogo de tipos de venta',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          description: 'Datos del tipo de venta a crear',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CatalogItem'
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Tipo de venta creado exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse'
                }
              }
            }
          },
          400: {
            description: 'Datos inválidos o faltantes'
          },
          401: {
            description: 'No autorizado'
          },
          500: {
            description: 'Error del servidor'
          }
        }
      }
    },
    '/properties/catalogs/sale-types/{id}': {
      put: {
        tags: ['Tipos de Venta'],
        summary: 'Actualiza un tipo de venta',
        description: 'Actualiza la descripción de un tipo de venta existente',
        security: [{ BearerAuth: [] }],
        parameters: [{ $ref: '#/components/parameters/catalogItemId' }],
        requestBody: {
          required: true,
          description: 'Nueva descripción para el tipo de venta',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CatalogItem'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Tipo de venta actualizado exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse'
                }
              }
            }
          },
          400: {
            description: 'Datos inválidos o faltantes'
          },
          401: {
            description: 'No autorizado'
          },
          404: {
            description: 'Tipo de venta no encontrado'
          },
          500: {
            description: 'Error del servidor'
          }
        }
      },
      delete: {
        tags: ['Tipos de Venta'],
        summary: 'Elimina un tipo de venta',
        description: 'Elimina un tipo de venta del catálogo',
        security: [{ BearerAuth: [] }],
        parameters: [{ $ref: '#/components/parameters/catalogItemId' }],
        responses: {
          200: {
            description: 'Tipo de venta eliminado exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse'
                }
              }
            }
          },
          401: {
            description: 'No autorizado'
          },
          404: {
            description: 'Tipo de venta no encontrado'
          },
          500: {
            description: 'Error del servidor'
          }
        }
      }
    },

    // Legal Statuses Catalog
    '/properties/catalogs/legal-statuses': {
      get: {
        tags: ['Estatus Legales'],
        summary: 'Obtiene todos los estatus legales',
        description: 'Retorna una lista de todos los estatus legales disponibles en el sistema',
        responses: {
          200: {
            description: 'Lista de estatus legales obtenida exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true
                    },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/CatalogItem'
                      }
                    }
                  }
                }
              }
            }
          },
          500: {
            description: 'Error del servidor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Estatus Legales'],
        summary: 'Crea un nuevo estatus legal',
        description: 'Crea un nuevo registro en el catálogo de estatus legales',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          description: 'Datos del estatus legal a crear',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CatalogItem'
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Estatus legal creado exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse'
                }
              }
            }
          },
          400: {
            description: 'Datos inválidos o faltantes'
          },
          401: {
            description: 'No autorizado'
          },
          500: {
            description: 'Error del servidor'
          }
        }
      }
    },
    '/properties/catalogs/legal-statuses/{id}': {
      put: {
        tags: ['Estatus Legales'],
        summary: 'Actualiza un estatus legal',
        description: 'Actualiza la descripción de un estatus legal existente',
        security: [{ BearerAuth: [] }],
        parameters: [{ $ref: '#/components/parameters/catalogItemId' }],
        requestBody: {
          required: true,
          description: 'Nueva descripción para el estatus legal',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CatalogItem'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Estatus legal actualizado exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse'
                }
              }
            }
          },
          400: {
            description: 'Datos inválidos o faltantes'
          },
          401: {
            description: 'No autorizado'
          },
          404: {
            description: 'Estatus legal no encontrado'
          },
          500: {
            description: 'Error del servidor'
          }
        }
      },
      delete: {
        tags: ['Estatus Legales'],
        summary: 'Elimina un estatus legal',
        description: 'Elimina un estatus legal del catálogo',
        security: [{ BearerAuth: [] }],
        parameters: [{ $ref: '#/components/parameters/catalogItemId' }],
        responses: {
          200: {
            description: 'Estatus legal eliminado exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse'
                }
              }
            }
          },
          401: {
            description: 'No autorizado'
          },
          404: {
            description: 'Estatus legal no encontrado'
          },
          500: {
            description: 'Error del servidor'
          }
        }
      }
    },

    // States Catalog
    '/properties/catalogs/states': {
      get: {
        tags: ['Estados'],
        summary: 'Obtiene todos los estados',
        description: 'Retorna una lista de todos los estados disponibles en el sistema',
        responses: {
          200: {
            description: 'Lista de estados obtenida exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true
                    },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/LocationItem'
                      }
                    }
                  }
                }
              }
            }
          },
          500: {
            description: 'Error del servidor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Estados'],
        summary: 'Crea un nuevo estado',
        description: 'Crea un nuevo registro en el catálogo de estados',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          description: 'Datos del estado a crear',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LocationItem'
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Estado creado exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse'
                }
              }
            }
          },
          400: {
            description: 'Datos inválidos o faltantes'
          },
          401: {
            description: 'No autorizado'
          },
          500: {
            description: 'Error del servidor'
          }
        }
      }
    },
    '/properties/catalogs/states/{id}': {
      put: {
        tags: ['Estados'],
        summary: 'Actualiza un estado',
        description: 'Actualiza el nombre de un estado existente',
        security: [{ BearerAuth: [] }],
        parameters: [{ $ref: '#/components/parameters/catalogItemId' }],
        requestBody: {
          required: true,
          description: 'Nuevo nombre para el estado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LocationItem'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Estado actualizado exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse'
                }
              }
            }
          },
          400: {
            description: 'Datos inválidos o faltantes'
          },
          401: {
            description: 'No autorizado'
          },
          404: {
            description: 'Estado no encontrado'
          },
          500: {
            description: 'Error del servidor'
          }
        }
      },
      delete: {
        tags: ['Estados'],
        summary: 'Elimina un estado',
        description: 'Elimina un estado del catálogo',
        security: [{ BearerAuth: [] }],
        parameters: [{ $ref: '#/components/parameters/catalogItemId' }],
        responses: {
          200: {
            description: 'Estado eliminado exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse'
                }
              }
            }
          },
          401: {
            description: 'No autorizado'
          },
          404: {
            description: 'Estado no encontrado'
          },
          500: {
            description: 'Error del servidor'
          }
        }
      }
    },

    // Municipalities Catalog
    '/properties/catalogs/municipalities': {
      get: {
        tags: ['Municipios'],
        summary: 'Obtiene municipios por estado',
        description: 'Retorna una lista de municipios filtrados por ID de estado',
        parameters: [{ $ref: '#/components/parameters/stateIdQuery' }],
        responses: {
          200: {
            description: 'Lista de municipios obtenida exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true
                    },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Municipality'
                      }
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'Se requiere el parámetro state_id',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          },
          500: {
            description: 'Error del servidor'
          }
        }
      },
      post: {
        tags: ['Municipios'],
        summary: 'Crea un nuevo municipio',
        description: 'Crea un nuevo registro en el catálogo de municipios',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          description: 'Datos del municipio a crear',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'state_id'],
                properties: {
                  name: {
                    type: 'string',
                    example: 'Benito Juárez'
                  },
                  state_id: {
                    type: 'integer',
                    example: 9
                  }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Municipio creado exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse'
                }
              }
            }
          },
          400: {
            description: 'Datos inválidos o faltantes'
          },
          401: {
            description: 'No autorizado'
          },
          500: {
            description: 'Error del servidor'
          }
        }
      }
    },
    '/properties/catalogs/municipalities/{id}': {
      put: {
        tags: ['Municipios'],
        summary: 'Actualiza un municipio',
        description: 'Actualiza los datos de un municipio existente',
        security: [{ BearerAuth: [] }],
        parameters: [{ $ref: '#/components/parameters/catalogItemId' }],
        requestBody: {
          required: true,
          description: 'Nuevos datos para el municipio',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'state_id'],
                properties: {
                  name: {
                    type: 'string',
                    example: 'Benito Juárez'
                  },
                  state_id: {
                    type: 'integer',
                    example: 9
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Municipio actualizado exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse'
                }
              }
            }
          },
          400: {
            description: 'Datos inválidos o faltantes'
          },
          401: {
            description: 'No autorizado'
          },
          404: {
            description: 'Municipio no encontrado'
          },
          500: {
            description: 'Error del servidor'
          }
        }
      },
      delete: {
        tags: ['Municipios'],
        summary: 'Elimina un municipio',
        description: 'Elimina un municipio del catálogo',
        security: [{ BearerAuth: [] }],
        parameters: [{ $ref: '#/components/parameters/catalogItemId' }],
        responses: {
          200: {
            description: 'Municipio eliminado exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse'
                }
              }
            }
          },
          401: {
            description: 'No autorizado'
          },
          404: {
            description: 'Municipio no encontrado'
          },
          500: {
            description: 'Error del servidor'
          }
        }
      }
    },

    // Colonies Catalog
    '/properties/catalogs/colonies': {
      get: {
        tags: ['Colonias'],
        summary: 'Obtiene colonias por municipio',
        description: 'Retorna una lista de colonias filtradas por ID de municipio',
        parameters: [{ $ref: '#/components/parameters/municipalityIdQuery' }],
        responses: {
          200: {
            description: 'Lista de colonias obtenida exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true
                    },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Colony'
                      }
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'Se requiere el parámetro municipality_id',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          },
          500: {
            description: 'Error del servidor'
          }
        }
      },
      post: {
        tags: ['Colonias'],
        summary: 'Crea una nueva colonia',
        description: 'Crea un nuevo registro en el catálogo de colonias',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          description: 'Datos de la colonia a crear',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'municipality_id'],
                properties: {
                  name: {
                    type: 'string',
                    example: 'Nápoles'
                  },
                  municipality_id: {
                    type: 'integer',
                    example: 120
                  }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Colonia creada exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse'
                }
              }
            }
          },
          400: {
            description: 'Datos inválidos o faltantes'
          },
          401: {
            description: 'No autorizado'
          },
          500: {
            description: 'Error del servidor'
          }
        }
      }
    },
    '/properties/catalogs/colonies/{id}': {
      put: {
        tags: ['Colonias'],
        summary: 'Actualiza una colonia',
        description: 'Actualiza los datos de una colonia existente',
        security: [{ BearerAuth: [] }],
        parameters: [{ $ref: '#/components/parameters/catalogItemId' }],
        requestBody: {
          required: true,
          description: 'Nuevos datos para la colonia',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'municipality_id'],
                properties: {
                  name: {
                    type: 'string',
                    example: 'Nápoles'
                  },
                  municipality_id: {
                    type: 'integer',
                    example: 120
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Colonia actualizada exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse'
                }
              }
            }
          },
          400: {
            description: 'Datos inválidos o faltantes'
          },
          401: {
            description: 'No autorizado'
          },
          404: {
            description: 'Colonia no encontrada'
          },
          500: {
            description: 'Error del servidor'
          }
        }
      },
      delete: {
        tags: ['Colonias'],
        summary: 'Elimina una colonia',
        description: 'Elimina una colonia del catálogo',
        security: [{ BearerAuth: [] }],
        parameters: [{ $ref: '#/components/parameters/catalogItemId' }],
        responses: {
          200: {
            description: 'Colonia eliminada exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse'
                }
              }
            }
          },
          401: {
            description: 'No autorizado'
          },
          404: {
            description: 'Colonia no encontrada'
          },
          500: {
            description: 'Error del servidor'
          }
        }
      }
    }
  }
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
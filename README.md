# 🏠 Property API - Documentación

Esta API REST permite realizar operaciones CRUD básicas para la gestión de propiedades inmobiliarias, incluyendo alta, consulta general, consulta por ID y eliminación.

---

## 🔧 Tecnologías
- Node.js + Express
- MySQL
- mysql2 / pool

---

## 📦 Endpoints disponibles

### 1. 🚀 Crear una nueva propiedad

**POST** `/api/properties`

#### ✅ Campos esperados en el body:
```json
{
  "client": "Emmanuel",
  "property_code": "COD-001",
  "property_type_id": 1,
  "sale_type_id": 2,
  "legal_status_id": 1,
  "price": "2500000.00",
  "commercial_value": "2800000.00",
  "street": "Av. Siempre Viva",
  "exterior_number": "123",
  "interior_number": null,
  "postal_code": "12345",
  "extra_address": null,
  "observation_id": null,
  "land_size": 100.5,
  "sqft": 180.0,
  "bedrooms": 3,
  "bathrooms": 2,
  "parking_spaces": 1,
  "has_garden": true,
  "has_study": true,
  "has_service_room": true,
  "is_condominium": false,
  "additional_info": "Zona centrica",
  "title": "Casa familiar",
  "description": "Hermosa casa moderna",
  "state_id": 1,
  "municipality_id": 1,
  "colony_id": 1,
  "state": "TLAXCALA",
  "municipality": "IXTENCO",
  "colony": "BARRIO DE RESURRECCION",
  "features": ["Terraza", "Jardín"],
  "images": ["https://url1", "https://url2", ..., "https://url10"]
}
```

#### 📝 Notas:
- Mínimo 10 imágenes en el array `images`
- `state`, `municipality` y `colony` ahora se guardan como nombres (ya no solo ID)

#### 🟢 Respuesta exitosa:
```json
{
  "success": true,
  "message": "Propiedad creada exitosamente",
  "data": { ...propiedad creada... }
}
```

---

### 2. 🔍 Consultar propiedades (paginado)

**GET** `/api/properties?page=1&limit=10`

#### 🔄 Respuesta:
```json
{
  "success": true,
  "data": [ ...lista de propiedades... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

---

### 3. 🔎 Consultar propiedad por ID

**GET** `/api/properties/:id`

#### Ejemplo:
`GET /api/properties/19`

#### Respuesta:
```json
{
  "success": true,
  "data": {
    "id": 19,
    "title": "Casa moderna",
    "state": "TLAXCALA",
    "municipality": "IXTENCO",
    "colony": "BARRIO DE RESURRECCION",
    ...otros campos...
  }
}
```

---

### 4. ❌ Eliminar propiedad

**DELETE** `/api/properties/:id`

#### Ejemplo:
`DELETE /api/properties/19`

#### Respuesta:
```json
{
  "success": true,
  "message": "Propiedad eliminada correctamente"
}
```

---

## 📘 Notas adicionales
- El campo `location` se genera combinando: `colony`, `municipality`, `state`
- Los valores como `property_type`, `sale_type` y `legal_status` se obtienen con `JOIN` al momento de consulta por ID o listado general.
- La API soporta validaciones y logs mediante `logger` y `try/catch`

---

## 🧪 Pruebas sugeridas
- Crear una propiedad completa ✅
- Crear una propiedad sin 10 imágenes ❌
- Consultar propiedades paginadas ✅
- Consultar propiedad por ID ✅
- Eliminar propiedad y verificar que ya no aparezca ✅

---

## 📄 Licencia
Distribuido bajo la licencia MIT. Ver `LICENSE` para más detalles.

---

❤️ Creado con amor por [Emmanuel ](https://github.com/Global-Manu-Man) - ¡Que el amor siempre guíe tu código! 🚀
```


🧑‍💻 Derechos del desarrollador

Este sistema fue diseñado y documentado por Emmanuel Sandoval Morales. Todos los derechos de desarrollo, arquitectura de la API y lógica de negocio están protegidos.

Puedes utilizar esta API con fines educativos, comerciales o integrarla a un frontend personalizado, siempre dando crédito al autor.

Para soporte, sugerencias o contribuciones, contacta a: sandoval.morales.emmanuel@gmail.com



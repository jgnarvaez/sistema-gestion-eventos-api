# Sistema de Gestión de Eventos - API REST

## Información General
- **Evidencia:** GA7-220501096-AA5-EV01 - Diseño y desarrollo de servicios web - caso
- **Tecnologías:** Node.js, Express.js, MongoDB, Mongoose, bcryptjs
- **Autores:** Camila Conde & Jose Narvaez
- **Programa:** Análisis y Desarrollo de Software (ADSO) - SENA

---

## Descripción del Proyecto
Esta API REST corresponde a la extensión del Sistema de Gestión de Eventos (desarrollado previamente en la evidencia GA7-220501096-AA3-EV01). En esta entrega se implementan los servicios web necesarios para el **Registro de Usuarios** y el **Inicio de Sesión (Login)** con validación de credenciales encriptadas mediante `bcryptjs` en MongoDB.

---

## Tecnologías Utilizadas
- **Node.js** (v18+)
- **Express.js** (Framework web backend)
- **MongoDB** & **Mongoose** (Base de datos NoSQL y ODM)
- **bcryptjs** (Encriptación segura de contraseñas)
- **dotenv** (Manejo de variables de entorno)
- **cors** (Intercambio de recursos de origen cruzado para conexión con frontend Angular)
- **nodemon** (Servidor de desarrollo con recarga automática)

---

## Estructura del Proyecto

```text
sistema-gestion-eventos-api/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── eventoController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Evento.js
│   │   └── Usuario.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── eventoRoutes.js
│   └── app.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## Requisitos Previos
1. Tener instalado **Node.js** (v18 o superior).
2. Tener ejecutándose **MongoDB** en puerto por defecto (`mongodb://127.0.0.1:27017`) o configurar la variable `MONGODB_URI` en el archivo `.env`.

---

## Instalación y Ejecución

1. Abrir la terminal e ingresar a la carpeta del proyecto:
```bash
cd sistema-gestion-eventos-api
```

2. Instalar dependencias:
```bash
npm install
```

3. Modo Desarrollo (con Nodemon):
```bash
npm run dev
```

4. Modo Producción:
```bash
npm start
```

---

## Especificación de Endpoints y Pruebas (cURL / Postman)

### 1. Registro de Usuario (`POST /api/auth/registro`)

#### Solicitud (cURL):
```bash
curl -X POST http://localhost:3000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{
    "usuario": "admin",
    "contrasena": "123456"
  }'
```

#### Respuesta Exitosa (HTTP 201):
```json
{
  "mensaje": "Usuario registrado exitosamente",
  "usuario": "admin"
}
```

#### Respuesta Error (HTTP 400 - Usuario Ya Existe):
```json
{
  "error": "El usuario ya existe"
}
```

---

### 2. Inicio de Sesión (`POST /api/auth/login`)

#### Solicitud (cURL):
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "usuario": "admin",
    "contrasena": "123456"
  }'
```

#### Respuesta Exitosa (HTTP 200):
```json
{
  "mensaje": "Autenticación satisfactoria",
  "usuario": "admin"
}
```

#### Respuesta Error (HTTP 401 - Credenciales Incorrectas):
```json
{
  "error": "Error en la autenticación"
}
```

---

### 3. Listar Eventos (`GET /api/eventos`)

#### Solicitud (cURL):
```bash
curl -X GET http://localhost:3000/api/eventos
```

#### Respuesta Exitosa (HTTP 200):
```json
[
  {
    "id": 1,
    "nombre": "Conferencia de Tecnologia e Innovacion ADSO 2025",
    "descripcion": "Evento sobre tendencias de desarrollo de software, inteligencia artificial y servicios web.",
    "fecha": "2025-11-20",
    "lugar": "Auditorio Principal SENA",
    "capacidad": 250
  }
]
```

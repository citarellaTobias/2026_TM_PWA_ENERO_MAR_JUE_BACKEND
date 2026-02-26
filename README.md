# Clon de Slack
## descripcion de la idea/app/solucion
Esta es la API RESTful para un clon de Slack, desarrollada como proyecto final para la diplomatura de Full-Stack Developer de la UTN. Proporciona toda la lógica del lado del servidor para gestionar usuarios, autenticación, espacios de trabajo (workspaces) y sus respectivos miembros, sentando las bases para una aplicación de mensajería completa.
tecnologias utilizadas
- Express: Lo usamos para crear el servidor y las rutas
- MongoDB: Lo usamos para guardar los datos
- JWT: Lo usamos para autenticar usuarios
- CORS: Lo usamos para permitir peticiones desde otros dominios
- Nodemailer: Lo usamos para enviar correos
- Bcrypt: Lo usamos para encriptar contraseñas
- Mongoose
## Tipo de Autenticación
La API utiliza autenticación basada en tokens a través de JWT. Al iniciar sesión, el usuario recibe un token que debe ser enviado en los headers de las peticiones para acceder a las rutas protegidas.

## Qué permite la API
Esta API REST permite gestionar las entidades principales de la aplicación:

- Registro e inicio de sesión de usuarios.

- Creación, visualización y eliminación de espacios de trabajo.

- Administración de los miembros que pertenecen a cada espacio de trabajo.

- Creacion, eliminacion y modificacion de canales

- Envío, lectura y borrado (soft delete) de mensajes dentro de los canales.
  
## Endpoints
- POST /api/auth/register: Registra un nuevo usuario ejemplo de body: { "username": "usuario", "email": "[EMAIL_ADDRESS]", "password": "[PASSWORD]" }

ejemplo de respuesta: { "ok": true, "status": 201, "message": "Usuario registrado correctamente", "data": { "user": { "_id": "60d5ec49f1c2d3a4b5c6d7e8", "username": "usuario", "email": "[EMAIL_ADDRESS]", "createdAt": "2022-01-01T00:00:00.000Z", "updatedAt": "2022-01-01T00:00:00.000Z" } } }

- POST /api/auth/login: Inicia sesion

- GET /api/workspace: Obtiene los espacios de trabajo del usuario

- POST /api/workspace: Crea un nuevo espacio de trabajo

- GET /api/workspace/:id: Obtiene un espacio de trabajo específico.

- PUT /api/workspace/:id: Actualiza un espacio de trabajo.

- DELETE /api/workspace/:id: Elimina un espacio de trabajo

- POST /api/workspace/:id/members: Agrega un miembro al espacio de trabajo

- GET /api/workspace/:id/members: Obtiene los miembros del espacio de trabajo

- PUT /api/workspace/:id/members/:member_id/role: Actualiza el rol de un miembro.

- GET /api/workspace/:id/members/:id: Obtiene un miembro del espacio de trabajo

- DELETE /api/workspace/:id/members/:id: Elimina un miembro del espacio de trabajo

- GET /api/workspace/:id/channels: Obtiene los canales del workspace.

- POST /api/workspace/:id/channels: Crea un canal.

- DELETE /api/workspace/:id/channels/:channel_id: Elimina un canal.

- GET /api/workspace/:id/channels/:channel_id/messages: Obtiene los mensajes de un canal.

- POST /api/workspace/:id/channels/:channel_id/messages: Crea un nuevo mensaje.

## Instrucciones para ejecutar la API
### configurar las variables de entorno en el archivo .env

- MONGO_DB_URI=tu_uri_de_mongo
- MONGO_DB_NAME=nombre_de_tu_db
- JWT_SECRET_KEY=tu_clave_secreta
- GMAIL_USERNAME=tu_correo
- GMAIL_PASSWORD=tu_contraseña_de_aplicacion
- URL_FRONTEND=http://localhost:3000
- URL_BACKEND=http://localhost:8080
- API_KEY=tu_api_key

npm install

npm run dev

Backend for NestJS CRUD Blog (Abraham Santos Torres)
Este proyecto es el backend de una aplicación de blog que permite realizar operaciones CRUD (Crear, Leer, Actualizar, Borrar) desde la perspectiva de un administrador o superusuario.

Tecnologías Utilizadas
Node.js
NestJS
TypeORM
PostgreSQL

Requisitos Previos
Antes de iniciar, asegúrate de tener instalado Node.js, que incluye npm, y PostgreSQL en tu sistema.

Configuración del Proyecto
Clonar el Repositorio
Para obtener el proyecto, clona el repositorio desde GitHub.
git clone https://github.com/abrahamsantos-developer/back-nestjs-crud-blog.git
cd back-nestjs-crud-blog

Instalación de Dependencias
Instala las dependencias necesarias ejecutando:
npm install


Configuración de la Base de Datos
Deberás crear una base de datos PostgreSQL antes de iniciar la aplicación y asegurarte de que las credenciales de conexión coincidan con las configuradas en tu archivo .env.

Ejemplo de configuración de la base de datos:

DB_HOST: localhost (mantén este valor)
DB_PORT: 5432 (verifica este puerto según tu configuración de PostgreSQL)
DB_USERNAME: example_user (cambia esto por tu usuario de PostgreSQL)
DB_PASSWORD: example_password (cambia esto por tu contraseña de PostgreSQL)
DB_DATABASE: example_db (asegúrate de crear esta base de datos antes de iniciar la aplicación)


Archivo .env
Copia el archivo dotenv.example a un nuevo archivo llamado .env y actualiza las variables según tu entorno local:

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=example_user
DB_PASSWORD=example_password
DB_DATABASE=example_db
PORT=3000
FRONTEND_URL='http://localhost:5500'

Ejecutar la Aplicación
Para iniciar la aplicación en modo de desarrollo, usa:
npm run start:dev

Características
CRUD Completo: Crea, lee, actualiza y elimina posts.
Búsqueda Avanzada: Filtra posts por autor, título o contenido.

Futuras Mejoras
Mejorar la interfaz a un diseño más avanzado.

Implementar autenticación con JWT.
Establecer propietarios(users) de posts para definir permisos de edición y borrado.

Contribuciones
Las contribuciones son bienvenidas. Si tienes mejoras o correcciones, por favor considera enviar un pull request.


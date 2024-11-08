Configuración del Backend
Entra en el directorio del backend:

cd backend
Instala las dependencias del servidor:

npm install
Crea un archivo .env en el directorio raíz del backend con las siguientes variables de entorno:

MONGO_URI=mongodb://localhost:27017/todolist
JWT_SECRET=tu_secreto_de_jwt
PORT=5000
MONGO_URI: La URI de conexión a tu base de datos MongoDB.
JWT_SECRET: Un secreto para firmar los tokens JWT.
PORT: El puerto en el que se ejecutará el servidor (por defecto es 5000).
Inicia el servidor:

npm start
El servidor de Express debería estar corriendo en http://localhost:5000.

Configuración del Frontend
Entra en el directorio del frontend:

cd frontend
Instala las dependencias del cliente:

npm install
Crea un archivo .env.local en el directorio raíz del frontend con las siguientes variables de entorno:

NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_API_URL: La URL de la API de Express que estará corriendo en el puerto 5000.
Inicia el cliente:

npm run dev
La aplicación del cliente debería estar corriendo en http://localhost:3000.

Estructura del Proyecto

todo-list-app/
├── backend/                   # Backend (API)
│   ├── controllers/            # Controladores de las rutas (funciones para manejar la lógica)
│   ├── models/                 # Modelos de MongoDB (Tareas, Subtareas, Usuarios)
│   ├── routes/                 # Rutas de la API (autenticación, tareas, subtareas)
│   ├── .env                    # Variables de entorno del servidor
│   └── server.js               # Configuración y arranque del servidor Express
│
├── frontend/                   # Frontend (Cliente React/Next.js)
│   ├── components/             # Componentes de la interfaz de usuario
│   ├── pages/                  # Páginas de Next.js
│   ├── .env.local              # Variables de entorno del cliente
│   └── tailwind.config.js      # Configuración de Tailwind CSS
│
├── .gitignore                  # Archivos que no se deben subir al repositorio
├── README.md                   # Documentación del proyecto
└── package.json                # Dependencias y scripts del proyecto
Funciones del Proyecto
Frontend
Crear, editar y eliminar tareas.
Agregar, editar y eliminar subtareas.
Marcar tareas y subtareas como completadas o pendientes.
Filtrar tareas por estado: pendientes o completadas.
Autenticación de usuario: los usuarios pueden registrarse, iniciar sesión y gestionar sus tareas.
Interfaz de usuario responsiva utilizando Tailwind CSS.
Backend
Rutas de autenticación: los usuarios pueden registrarse, iniciar sesión y obtener un token JWT para autenticar sus solicitudes.
Rutas de tareas: los usuarios pueden crear, editar, eliminar y obtener tareas.
Rutas de subtareas: los usuarios pueden agregar, editar, eliminar y obtener subtareas.
Autenticación y autorización: todas las rutas protegidas requieren un token JWT válido para acceder.
Rutas del Backend
Autenticación
POST /api/auth/register: Registrar un nuevo usuario.
POST /api/auth/login: Iniciar sesión y obtener un token JWT.
Tareas
GET /api/tasks: Obtener todas las tareas del usuario autenticado.
POST /api/tasks: Crear una nueva tarea.
PUT /api/tasks/
: Editar una tarea (título, subtareas, estado).
DELETE /api/tasks/
: Eliminar una tarea.
Subtareas
POST /api/tasks/
/subtasks: Agregar una nueva subtarea a una tarea.
PUT /api/tasks/
/subtasks/
: Editar el estado de una subtarea.
DELETE /api/tasks/
/subtasks/
: Eliminar una subtarea.
Autenticación con JWT
Registro: Cuando un usuario se registra, se le crea un token JWT.
Inicio de sesión: El token JWT se devuelve cuando el usuario inicia sesión correctamente.
Acceso a rutas protegidas: El token JWT se incluye en las solicitudes al backend para verificar que el usuario está autenticado.
Desarrollo
Backend
Para agregar nuevas funcionalidades en el backend, puedes crear nuevos controladores dentro de la carpeta controllers, modelos dentro de models y rutas dentro de routes.
Frontend
Para agregar nuevas funcionalidades en el frontend, puedes crear nuevos componentes dentro de la carpeta components y nuevas páginas dentro de pages.
Contribución
Haz un fork de este repositorio.
Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
Realiza tus cambios y asegúrate de que el código funciona correctamente.
Haz commit de tus cambios (git commit -am 'Añadir nueva funcionalidad').
Haz push de tu rama (git push origin feature/nueva-funcionalidad).
Abre un pull request.

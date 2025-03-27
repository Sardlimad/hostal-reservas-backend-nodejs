# 🏨 Hostal Reservas

## Descripción
Este proyecto es un sistema de gestión de reservas para un hostal, desarrollado con Node.js y Express. Permite gestionar habitaciones, verificar disponibilidad y realizar reservas de manera eficiente.

## 🌟 Funcionalidades
- Gestión de habitaciones (crear, listar, actualizar disponibilidad)
- Verificación de disponibilidad de habitaciones por fecha
- Gestión de reservas
- Documentación de API con Swagger

## 🛠️ Tecnologías Utilizadas
- Node.js
- Express.js
- Sequelize (ORM)
- PostgreSQL
- Swagger para documentación de API

## 🚀 Cómo Empezar

### Requisitos Previos
- Node.js (v14 o superior)
- PostgreSQL
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/Sardlimad/hostal-reservas-backend-nodejs.git

# Instalar dependencias
cd hostal-reservas-backend-nodejs
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar la aplicación
npm run dev
```

## 📁 Estructura del Proyecto
```
hostal-reservas/
├── src/
│   ├── controllers/    # Controladores de las rutas
│   ├── models/         # Modelos de Sequelize
│   ├── routes/         # Definición de rutas
│   ├── middleware/     # Middlewares personalizados
│   └── config/         # Configuración de la base de datos
└── server.js           # Archivo principal del proyecto
```

## 🔑 Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=hostal_reservas
JWT_SECRET=tu_secreto_jwt
```

## 📝 Documentación de la API
La API está documentada con Swagger. Una vez que la aplicación esté en ejecución, puedes acceder a la documentación en:
```
http://localhost:5000/api-docs
```

### Endpoints Principales
| Endpoint                  | Método | Descripción                                   |
|---------------------------|--------|-----------------------------------------------|
| `/api/rooms`              | GET    | Obtener todas las habitaciones                |
| `/api/rooms`              | POST   | Crear una nueva habitación                    |
| `/api/rooms/:id/toggle`   | PUT    | Cambiar el estado de disponibilidad de una habitación |
| `/api/rooms/available`    | GET    | Obtener habitaciones disponibles para una fecha específica |

## 👥 Contribuciones
¡Las contribuciones son bienvenidas! Si deseas contribuir, por favor abre un Pull Request.

## 📄 Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## 🤝 Contacto
- GitHub: [@sardlimad](https://github.com/sardlimad)
- Email: sardlimad08@gmail.com

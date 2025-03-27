require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const sequelize = require('./config/db');
const roomRoutes = require('./routes/room.routes');
const reservationRoutes = require('./routes/reservation.routes');
const authRoutes = require('./routes/auth.routes');
const { initializeAdmin } = require('./controllers/auth.controller');

const app = express();
app.use(express.json());
app.use(cors());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/rooms', roomRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/auth', authRoutes);

// Inicializar usuario admin
initializeAdmin().then(() => {
  console.log('Verificación de usuario admin completada');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));






sequelize.sync({ force: false }) // Cambia a true si quieres reiniciar la BD cada vez
  .then(() => console.log('Tablas sincronizadas'))
  .catch(err => console.error('Error sincronizando:', err));

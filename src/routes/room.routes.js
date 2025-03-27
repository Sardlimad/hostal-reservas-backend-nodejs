const express = require('express');
const { getRooms, createRoom, toggleAvailability, getAvailableRooms } = require('../controllers/room.controller');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       required:
 *         - number
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado de la habitación
 *         number:
 *           type: integer
 *           description: Número de la habitación
 *         isAvailable:
 *           type: boolean
 *           description: Estado de disponibilidad de la habitación
 *           default: true
 */

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Obtener todas las habitaciones
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Lista de habitaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 */
router.get('/', getRooms);

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Crear una nueva habitación
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - number
 *             properties:
 *               number:
 *                 type: integer
 *                 description: Número de la habitación
 *     responses:
 *       200:
 *         description: Habitación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 room:
 *                   $ref: '#/components/schemas/Room'
 *       401:
 *         description: No autorizado - Token requerido
 */
router.post('/', auth, createRoom);

/**
 * @swagger
 * /api/rooms/{id}/toggle:
 *   put:
 *     summary: Cambiar el estado de disponibilidad de una habitación
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la habitación a actualizar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estado de la habitación actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 room:
 *                   $ref: '#/components/schemas/Room'
 *       404:
 *         description: Habitación no encontrada
 *       401:
 *         description: No autorizado - Token requerido
 */
router.put('/:id/toggle', auth, toggleAvailability);

/**
 * @swagger
 * /api/rooms/available:
 *   get:
 *     summary: Obtener habitaciones disponibles para una fecha específica
 *     tags: [Rooms]
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha para verificar disponibilidad (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Lista de habitaciones disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       400:
 *         description: Fecha no proporcionada
 *       500:
 *         description: Error del servidor
 */
router.get('/available', getAvailableRooms);

module.exports = router;

const express = require('express');
const { createReservation, getReservations } = require('../controllers/reservation.controller');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - roomNumber
 *         - date
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado de la reserva
 *         name:
 *           type: string
 *           description: Nombre del huésped
 *         email:
 *           type: string
 *           description: Email del huésped
 *         phone:
 *           type: string
 *           description: Teléfono de contacto
 *         roomNumber:
 *           type: integer
 *           description: Número de la habitación reservada
 *         date:
 *           type: string
 *           format: date
 *           description: Fecha de la reserva (YYYY-MM-DD)
 */

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Crear una nueva reserva
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Reserva creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 reservation:
 *                   $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Datos inválidos en la solicitud
 */
router.post('/', createReservation);

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Obtener todas las reservas
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas las reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       401:
 *         description: No autorizado - Token JWT requerido
 */
router.get('/', auth, getReservations);

module.exports = router;

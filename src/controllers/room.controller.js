const Room = require('../models/Room');
const Reservation = require('../models/Reservation');
const { Op } = require('sequelize');

const getRooms = async (req, res) => {
    const rooms = await Room.findAll();
    res.json(rooms);
};

const createRoom = async (req, res) => {
    const newRoom = await Room.create(req.body);
    res.json({ message: 'Habitación creada', room: newRoom });
};

const toggleAvailability = async (req, res) => {
    const room = await Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ message: 'Habitación no encontrada' });

    room.isAvailable = !room.isAvailable;
    await room.save();
    res.json({ message: 'Estado actualizado', room });
};

const getAvailableRooms = async (req, res) => {
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ message: 'La fecha es requerida' });
        }

        // Obtener todas las habitaciones
        const rooms = await Room.findAll({
            where: {
                isAvailable: true
            }
        });

        // Obtener las reservas para la fecha especificada
        const reservations = await Reservation.findAll({
            where: {
                date: date
            }
        });

        // Filtrar las habitaciones que no están reservadas para esa fecha
        const reservedRoomNumbers = reservations.map(reservation => reservation.roomNumber);
        const availableRooms = rooms.filter(room => !reservedRoomNumbers.includes(room.number));

        res.json(availableRooms);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener habitaciones disponibles', error: error.message });
    }
};

module.exports = { 
    getRooms, 
    createRoom, 
    toggleAvailability,
    getAvailableRooms 
};
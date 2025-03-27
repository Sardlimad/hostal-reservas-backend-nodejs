const Reservation = require('../models/Reservation');

exports.createReservation = async (req, res) => {
  const newReservation = await Reservation.create(req.body);
  res.json({ message: 'Reserva creada', reservation: newReservation });
};

exports.getReservations = async (req, res) => {
  const reservations = await Reservation.findAll();
  res.json(reservations);
};

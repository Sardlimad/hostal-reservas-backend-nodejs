const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Room = sequelize.define('Room', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  number: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  isAvailable: { type: DataTypes.BOOLEAN, defaultValue: true },
});

module.exports = Room;

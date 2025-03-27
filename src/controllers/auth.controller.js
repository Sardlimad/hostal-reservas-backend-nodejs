const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Función para inicializar el usuario admin
exports.initializeAdmin = async () => {
  try {
    const adminExists = await User.findOne({ where: { username: 'admin' } });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin', 10);
      await User.create({
        username: 'admin',
        password: hashedPassword
      });
      console.log('Usuario admin creado exitosamente');
    }
  } catch (error) {
    console.error('Error creando usuario admin:', error);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ where: { username } });
    if (userExists) {
      return res.status(400).json({ message: 'El nombre de usuario ya existe' });
    }

    // Crear el nuevo usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword
    });

    res.status(201).json({ 
      message: 'Usuario creado exitosamente',
      userId: newUser.id 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
};
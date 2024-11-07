const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Asegúrate de que este modelo exista

// Registro de usuario
const registerUser = async (req, res) => {
  const { username, password } = req.body;
  console.log("Username:", username); // Verificar que el username no sea nulo
  console.log("Password:", password); // Verificar que el password no sea nulo

  try {
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Crear un nuevo usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hash generado:", hashedPassword);
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Guardar el nuevo usuario
    await newUser.save();

    // Generar un token JWT
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });

    // Enviar la respuesta
    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      token: token,
    });
  } catch (error) {
    console.error("Error al registrar el usuario: ", error);
    return res.status(500).json({
      message: "Error al registrar el usuario",
      error: error.message, // Agregado para obtener más detalles
    });
  }
};

// Inicio de sesión
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log("Contraseña recibida:", password);

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ username });
    console.log("Contraseña almacenada en BD:", user.password);
    if (!user) {
      return res.status(400).json({ message: "Usuario incorrecto" });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password.trim(), user.password.trim());
    console.log("Coincidencia de contraseñas:", isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Generar un token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });

    // Enviar la respuesta con el token
    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      token: token,
    });
  } catch (error) {
    console.error("Error al iniciar sesión: ", error);
    return res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

module.exports = { registerUser, loginUser };
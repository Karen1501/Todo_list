const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "El nombre de usuario es obligatorio"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
});

// Encriptar la contraseña antes de guardarla en la base de datos
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10); // Encriptar la contraseña
  next();
});

// Comparar la contraseña almacenada con la proporcionada por el usuario
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Comparar las contraseñas
};

// Generar un token JWT
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "10h",
  });
};

module.exports = mongoose.model("User", userSchema);

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("./config");
const userService = require("../services/UserService");

async function authenticateUser(email, password) {
  const user = await userService.getUserByName(email);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Contraseña incorrecta");
  }

  const token = generateJwtToken(user);
  return { user, token };
}

function generateJwtToken(user) {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    config.jwtSecret,
    { expiresIn: config.jwtExpiration }
  );
}

module.exports = { authenticateUser };

const jwt = require("jsonwebtoken");
const config = require("../auth/config");

function jwtMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]; // Obtener el token de los headers

    if (!token) {
        return res.status(401).json({ error: "No se proporcionó un token" });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }

}

module.exports = {
    jwtMiddleware
};
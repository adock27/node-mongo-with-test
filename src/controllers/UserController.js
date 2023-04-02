const userService = require("../services/UserService");
const handlePromise = require("../utils/handlePromise");

exports.getAllUsers = (req, res) => handlePromise(userService.getAllUsers(), res);

exports.createUser = (req, res) => handlePromise(userService.createUser(req.body), res);

exports.getUserById = (req, res) => handlePromise(userService.getUserById(req.params.id),res);

exports.updateUser = (req, res) => handlePromise(userService.updateUser(req.params.id, req.body), res);

exports.deleteUser = (req, res) => handlePromise(userService.deleteUser(req.params.id), res);



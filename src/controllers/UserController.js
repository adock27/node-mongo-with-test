const userService = require("../services/UserService");


exports.getAllUsers = (req, res) => handlePromise(userService.getAllUsers(), res);

exports.createUser = (req, res) => handlePromise(userService.createUser(req.body), res);

exports.getUserById = (req, res) => handlePromise(userService.getUserById(req.params.id));

exports.updateUser = (req, res) => handlePromise(userService.updateUser(req.params.id, req.body), res);

exports.deleteUser = (req, res) => handlePromise(userService.deleteUser(req.params.id), res);



// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await userService.getAllUsers();
//     res.json({ data: users, status: "success" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }

// };

// exports.createUser = async (req, res) => {
//   try {
//     const user = await userService.createUser(req.body);
//     res.json({ data: user, status: "success" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getUserById = async (req, res) => {
//   try {
//     const user = await userService.getUserById(req.params.id);
//     res.json({ data: user, status: "success" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.updateUser = async (req, res) => {
//   try {
//     const user = await userService.updateUser(req.params.id, req.body);
//     res.json({ data: user, status: "success" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     const user = await userService.deleteUser(req.params.id);
//     res.json({ data: user, status: "success" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
const express = require("express");
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");

const {getBlogsFromUserId} = require('../controllers/BlogController');
 
const router = express.Router();
 
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
router.route("/:id/posts").get(getBlogsFromUserId);
 
module.exports = router;
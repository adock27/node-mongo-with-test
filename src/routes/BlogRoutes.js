const express = require("express");
const {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  getAllBlogsWithAuthor,
  getBlogsFromUserId
} = require("../controllers/BlogController");

const { validateBlog } = require('../middlewares/BlogValidator')

const router = express.Router();



router.route("/").get(getAllBlogs).post(validateBlog,createBlog);
router.route("/author").get(getAllBlogsWithAuthor);
router.route("/:id/posts").get(getBlogsFromUserId);
router.route("/:id").get(getBlogById).put(updateBlog).delete(deleteBlog);

module.exports = router;
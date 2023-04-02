const blogService = require("../services/BlogService");
const handlePromise = require("../utils/handlePromise");


exports.getAllBlogs = (req, res) => handlePromise(blogService.getAllBlogs(), res);

exports.getAllBlogsWithAuthor = (req, res) => handlePromise(blogService.getBlogsWithAuthor(), res);

exports.createBlog = (req, res) => handlePromise(blogService.createBlog(req.body), res);

exports.getBlogById = (req, res) => handlePromise(blogService.getBlogById(req.params.id),res);

exports.updateBlog = (req, res) => handlePromise(blogService.updateBlog(req.params.id, req.body), res);

exports.deleteBlog = (req, res) => handlePromise(blogService.deleteBlog(req.params.id), res);


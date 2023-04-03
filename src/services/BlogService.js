const mongoose = require('mongoose');
const BlogModel = require("../models/Blog");
exports.getAllBlogs = async () => {
  return await BlogModel.find();
};

exports.createBlog = async (blog) => {
  return await BlogModel.create(blog);
};

exports.getBlogById = async (id) => {
  return await BlogModel.findById(id);
};

exports.updateBlog = async (id, blog) => {
  return await BlogModel.findByIdAndUpdate(id, blog);
};

exports.deleteBlog = async (id) => {
  return await BlogModel.findByIdAndDelete(id);


};

exports.getBlogsWithAuthor = async () => {
  return await BlogModel.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'author',
        foreignField: '_id',
        as: 'author'
      }
    },
    {
      $unwind: '$author'
    }
  ]);
};

exports.getBlogsFromUserId = async (id) => {

  return await BlogModel.aggregate([
    {
      $match: { author: new mongoose.Types.ObjectId(id) } // macth de tipo object id
    },
    {
      $lookup: {
        from: 'users', // de mi tabla
        localField: 'author', // mi campo 
        foreignField: '_id', // el campo de join
        as: 'author' // alias del campo
      }
    },
    {
      $unwind: '$author' // para reescribir la data del autor
    },
    {
      $project: { // limitar los campos recibidos
        // 'author.name': 1,
        // 'author.email': 1
        'author.password': 0,
        'author.date': 0
      }
    }
  ]);
};

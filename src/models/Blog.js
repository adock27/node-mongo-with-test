const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: String,
    body: String,
    image: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    author: {
      type: mongoose.Types.ObjectId, // saving the reference from user collection
      // ref: 'User',
      required: true
    },
    tags: [String],
    comments: [
      {
        content: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        creation_date: { type: Date, default: Date.now }
      }
    ]

  }, {
  versionKey: false
}
);

module.exports = mongoose.model("Blog", blogSchema);
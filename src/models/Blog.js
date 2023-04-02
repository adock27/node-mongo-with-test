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
      type: mongoose.Types.ObjectId // saving the reference from user collection
    }

  }, {
  versionKey: false
}
);

module.exports = mongoose.model("Blog", blogSchema);
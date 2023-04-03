const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  date: {
    type: Date,
    default: Date.now
  },
  profile: {
    bio: String,
    profile_image: String,
    social_media: {
      twitter: String,
      facebook: String,
      instagram: String
    }
  }
}, {
  versionKey: false
});

module.exports = mongoose.model("User", userSchema);
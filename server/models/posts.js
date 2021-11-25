const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  postid: { type: mongoose.SchemaTypes.ObjectId },
  body: { required: true, type: String },
  images: { required: true, type: Array },
  likes: [
    {
      type: { required: true, type: String },
      userid: { required: true, type: mongoose.SchemaTypes.ObjectId },
      created_date: {
        type: Date,
        required: true,
        default: Date.now,
      },
    },
  ],
  comments: [
    {
      body: { required: true, type: String },
      userid: { required: true, type: mongoose.SchemaTypes.ObjectId },
      created_date: {
        type: Date,
        required: true,
        default: Date.now,
      },
    },
  ],
  userid: { required: true, type: mongoose.SchemaTypes.ObjectId },
  created_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("posts", postSchema);

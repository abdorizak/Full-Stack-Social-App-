const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userid: { type: mongoose.SchemaTypes.ObjectId },
  name: { required: true, type: String },
  username: { required: true, type: String },
  photo: { required: true, type: String },
  password: { required: true, type: String },
  created_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", userSchema);

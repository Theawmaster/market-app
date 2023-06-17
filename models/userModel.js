const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  password: { type: String, required: true },
  approved: { type: Boolean, require: false},
}, {timestamps : true});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
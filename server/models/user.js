const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  name: String,
  email: String,
  password: String,
});
module.exports = mongoose.model("users", UserSchema, "users");

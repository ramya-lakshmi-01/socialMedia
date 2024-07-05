const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  // title: { type: String, required: true },
  content: { type: String},
  
});

module.exports = mongoose.model("posts", postSchema, "posts");

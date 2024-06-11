const express = require("express");
const router = express.Router();
const Post = require("../models/post");



const createPost = async (req, res) => {
    new Post(req.body).save();
    res.status(200).json({ message: "Post added successfully" });
};

const getPostsByUserId = async (req, res) => {
    const { user_id } = req.params;

    const posts = await Post.find({ user_id:user_id });
    res.status(200).json(posts);
};
const editPost = async (req, res) => {
    const { post_id } = req.params;

    await Post.findByIdAndUpdate(post_id, req.body);
    res.status(200).json({ message: "Post updated successfully" });
};
const deletePost = async (req, res) => {
    const { post_id } = req.params;
    await Post.findByIdAndDelete(post_id);
    res.status(200).json({ message: "Post deleted successfully" });
};
router.post("/add-new-post", createPost);
router.get("/get-posts-by-id/:user_id", getPostsByUserId);
router.put("/edit/:post_id", editPost);
router.delete("/delete/:post_id", deletePost);

module.exports = router;

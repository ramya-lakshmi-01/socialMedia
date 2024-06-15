const express = require("express");
const router = express.Router();
// const followController = require("../../controllers/follow2"); // Adjust the path to your follow controller
const Follow = require("../models/follow")

const followUser = async (req, res) => {
  
    try {
      const followrecord = await Follow.findOne({
        follower: req.params.uId,
        followee: req.body.followId,
      });
  
      if (followrecord) {
        return res
          .status(500)
          .json({ error: "You are already following this user" });
      }
  
       await new Follow({
        follower: uId,
        followee: followId,
      }).save();
  
      return res.status(200).json({ status: true });
    } catch (error) {
      return res.status(500).json({ error: error?.message ?? "" });
    }
  };
  
  const unfollowUser = async (req, res) => {
    try {
      await Follow.findOneAndDelete({
        follower: req.params.uId,
        followee: req.body.unfollowId,
      });
      return res
        .status(200).json({status:true})
    } catch (error) {
      return res.status(500).json({ error: error?.message ?? "" });
    }
  };
  
  const getUserFollowers = async (req, res) => {
    try {
      console.log('req.params.uId: ', req.params.uId);
      const allFollowers = await Follow.find({
        followee: req.params.uId,
      }).populate("follower");
  
      return res.status(200).json(allFollowers);
    } catch (error) {
      return res.status(500).json({
        error: error?.message,
      });
    }
  };
  
  const getUserFollowing = async (req, res) => {
    try {
      const allFollowing = await Follow.find({
        follower: req.params.uId,
      }).populate("followee");
  
      return res.status(200).json(allFollowing);
    } catch (error) {
      return res.status(500).json({
        error: error?.message ?? "",
      });
    }
  };

router.post("/follow/:uId", followUser);
router.post("/unfollow/:uId", unfollowUser);
router.post("/getUserFollowers/:uId", getUserFollowers);
router.post("/getUserFollowing/:uId", getUserFollowing);

module.exports = router;

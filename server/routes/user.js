
const express = require("express");

// const Users = require("../../controllers/users");
const router = express.Router();
const User = require("../models/user");

const bcrypt = require("bcrypt");


const salt = process.env.password_salt;

const createUser = async (req, res) => {
  const { username, password, name, email } = req.body;
  let newUserData = {
    username,
    name,
    email,
    password,
  };
  bcrypt.hash(password, salt, async function (err, hashed_password) {
    if (!err) {
      newUserData.password = hashed_password;
      const currUser = await User.find({ username });
      if (currUser.length > 0) {
        res.status(500).json({ message: "User already exists" });
      } else {
        let addeduser = new User(newUserData).save();
        res.status(200).json({ message: "User added sucessfully" });
      }
    } else {
      res.status(500).json(err.message);
    }
  });
};

const getUserById = async (req, res) => {
  const { user_id } = req.params;

  const userDoc = await User.findById(user_id, { password: 0 });

  if (userDoc) res.status(200).json(userDoc);
  else res.status(500).json({ message: "User not found" });
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.find({ username });
    if (!(existingUser.length > 0)) {
      res.status(404).json({ message: "No User found" });
    } else {
      bcrypt.compare(
        password,
        existingUser[0]?.password,
        function (err, result) {
          if (result) {

            existingUser[0].password = "";
            res.status(200).json(existingUser?.[0]);
          } else {
            res.status(500).json({ message: "Password is incorrect!!!" });
          }
        }
      );
    }
  } catch (error) {
    console.log("error", error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const deletedUser = await User.findByIdAndDelete(user_id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("error: ", error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updateUser = await User.findByIdAndUpdate(id, data);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log("error: ", error);
  }
};



router.get("/get-user/:user_id", getUserById);
router.post("/add-new-user", createUser);
router.post("/login", login);
router.delete("/delete/:user_id", deleteUser);
router.put("/edit/:id", updateUser);
module.exports = router;




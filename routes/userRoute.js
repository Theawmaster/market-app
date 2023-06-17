const express = require("express");
const UserModel = require("../models/userModel");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    await UserModel.findOne({userId : req.body.userId, password : req.body.password, verified : true});
    res.send("Login successfully!");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/register", async (req, res) => {
    try {
      const newUser = new UserModel(req.body);
      await newUser.save();
      res.send("Account registered successfully!");
    } catch (error) {
      res.status(400).json(error);
    }
  });

module.exports = router;

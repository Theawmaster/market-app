const express = require("express");
const UserModel = require("../models/userModel");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({
      userId: req.body.userId,
      password: req.body.password,
      verified: true,
    });
    if (user) res.send(user);
    else res.status(400).json({ message: "Invalid login credentials" });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = await UserModel.findOne({ userId: req.body.userId });
    if (user) {
      return res.status(400).json({ message: "User ID is taken" });
    }
    const newUser = new UserModel({ ...req.body, verified: false });
    await newUser.save();
    res.send("Account registered successfully!");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/current-password", async (req, res) => {
  try {
    const user = await UserModel.findOne({ userId: req.query.userId });
    if (user) {
      res.json({ password: user.password });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/update-password", async (req, res) => {
  try {
    const { userId, newPassword } = req.body;

    // Find the user by userId
    const user = await UserModel.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the password
    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;

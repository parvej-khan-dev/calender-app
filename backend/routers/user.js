const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const {JwtAuth} = require('../controllers/auth')
const bcrypt = require("bcrypt");
// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create a new user
router.post("/",JwtAuth, async (req, res) => {
  try {
    console.log(req.body)
    let user = new User(req.body);
    user.password = bcrypt.hashSync(user.password, 8);
    user = await user.save();
    console.log(user, "user")
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get user By ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update user By ID
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        key: value,
      },
      { new: true }
    );
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete user By ID
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;

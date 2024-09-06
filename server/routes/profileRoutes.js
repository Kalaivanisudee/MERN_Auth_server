const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

const authToken = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
      req.user = user;
      next();
    });
  }
};

router.get("/", authToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.json(500).json({ error: "profile Fetching Error" });
  }
});

module.exports = router;
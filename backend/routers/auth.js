const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
// const config = require('../config/config');
require("dotenv").config();
const { login, JwtAuth } = require("../controllers/auth");
const cors = require("cors");

const User = require("../models/user");
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

router.get("/google", (req, res) => {
  const url = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar"],
  });

  res.redirect(url);
  // res.send(url);
});

router.get("/google/redirect", async (req, res) => {
  const { code } = req.query;
  // const { code } = req.url;
  console.log(code, "code ------------------------------");
  res.set("Access-Control-Allow-Origin", "*");

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    

    // Save the tokens in the database
    // const decodedToken = jwt.verify(
    //   // req.headers.authorization.split(" ")[1],
    //   token,
    //   process.env.SECRET_KEY
    // );
    // console.log(decodedToken,"decodeToken");
    // const user = await User.findById(decodedToken.userId);
    // Save the tokens in the database
    let userID = '641ece0038c304718cd3addf'
    // const user = await User.findById(req.user._id);
    const user = await User.findById(userID);
    user.tokens = tokens;
    console.log(user, "user");
    await user.save();

    res.send("Tokens received. You can now close this tab.");
  } catch (error) {
    console.error("Error getting OAuth tokens:", error.message);
    res.status(500).send("Failed to retrieve Google OAuth tokens");
  }
});

router.post("/login", login);

module.exports = router;

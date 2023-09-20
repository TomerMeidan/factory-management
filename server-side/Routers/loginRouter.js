// Main Entry Point: localhost:PORT/login

// Imports
require("dotenv").config();
const express = require("express");
const loginBLL = require("../BLL/loginBLL");
const jwt = require("jsonwebtoken");
const loginRouter = express.Router();

// DO NOT DO THIS IN PRODUCTION
// Save all refresh tokens in the database for each user
let refreshTokens = [];

// Refresh Token Handler
loginRouter.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  // check if the token even exists
  if (refreshToken == null) return res.sendStatus(401);

  // Check if user's refresh token is still valid
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  // Verify refresh token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden from access
    const newAccessToken = generateAccessToken({
      username: user.username,
      password: user.password,
    });
    res.json({ accessToken: newAccessToken });
  });
});

// Logout Handler
loginRouter.delete("/logout", (req, res) => {
  // Usually we would delete the refresh token from the database but here we will just remove it from the array
  refreshTokens = refreshTokens.filter(
    (token) => token.refreshToken != req.body.token
  );
  res.sendStatus(204); // logged out
});

// Login Handler
loginRouter.post("/", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;

  // Authenticate the user with web service
  const userData = await loginBLL.checkUserCredentials(username, email);

  if (!userData) {
    const errMsg = `Failed login attempt for user:${username} email:${email}, used was not found.`;
    console.log(errMsg);
    return res.sendStatus(404);
  }
  // Continue here if the user exists on the web service
  const user = { username: username, email: email };

  // Create public key for certain user with the secret (ACCESS_TOKEN_SECRET)
  const accessToken = generateAccessToken(user);
  const refreshAccessToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  // this is acting as if we were saving the refresh token on the database
  refreshTokens.push(refreshAccessToken);
  // provide the user with the public key for him to use
  res.json({
    userData: userData,
    accessToken: accessToken,
    refreshToken: refreshAccessToken,
  });
});

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
};

module.exports = loginRouter;

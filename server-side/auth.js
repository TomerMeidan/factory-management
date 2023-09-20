// This is the main entry point of the authentication stage

// Imports
const express = require("express");
const loginRouter = require("./Routers/loginRouter");
const app = express();
const port = 4000;
const jwt = require("jsonwebtoken");
const cors = require('cors')
require("dotenv").config();

// Middlewares
app.use(express.json());
app.use(cors());

// DO NOT DO THIS IN PRODUCTION
// Save all refresh tokens in the database for each user
let refreshTokens = [];

// Refresh Token Handler
app.post('/token', (req,res) => {
  const refreshToken = req.body.token
  // check if the token even exists
  if(refreshToken == null) return res.sendStatus(401)

  // Check if user's refresh token is still valid
  if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

  // Verify refresh token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err,user) => {
    if(err) return res.sendStatus(403) // Forbidden from access
    const newAccessToken = generateAccessToken({username :user.username, password: user.password})
    res.json({accessToken: newAccessToken})
  })
})

// Logout Handler
app.delete("/logout", (req, res) => {
  // Usually we would delete the refresh token from the database but here we will just remove it from the array
  refreshTokens = refreshTokens.filter(
    (token) => token.refreshToken != req.body.token
  );
  res.sendStatus(204); // logged out
});

// Login Handler
app.post("/login", (req, res) => {
  // Authenticate the user with DB
  // ....


  // Continue here if the user is authenticated on the db
  const username = req.body.username;
  const password = req.body.password;
  const user = { username: username, password: password };

  // Create public key for certain user with the secret (ACCESS_TOKEN_SECRET)
  const accessToken = generateAccessToken(user);
  const refreshAccessToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshAccessToken); // this is acting as if we were saving the refresh token on the database
  // provide the user with the public key for him to use
  res.json({ accessToken: accessToken, refreshToken: refreshAccessToken });
});

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
};

// Server Connection
app.listen(port, () => {
  console.log(`Factory Authentication Server is listening on port ${port}...`);
});

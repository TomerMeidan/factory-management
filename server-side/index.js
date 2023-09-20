// This is the main entry point of the Factory Management backend

// Imports & Global Variables
require("dotenv").config();
const express = require("express");
const loginRouter = require("./Routers/loginRouter");
const jwt = require("jsonwebtoken");
const db = require('./configs/db')
const app = express();
const port = 3000;
const cors = require('cors')
const connectionString = "mongodb://127.0.0.1:27017/factoryUsers"

// Database Connection
db.connectDB(connectionString);

// Middlewares
// Middleware to authencticate the token on user actions
const authenticateToken = (req, res, next) => {
  // The token header 'authorization' is going to start with the key word Bearer and then comes the token
  // Bearer TOKEN

  const authHeader = req.headers["authorization"];
  // if user authorized, then authHeader != undefined
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  // Verify the token is still valid or if tampered
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
app.use(express.json());
app.use(cors());

// Routers
// TODO Create Welcome Page Router

// Server Connection
app.listen(port, () => {
  console.log(`Factory Management Server is listening on port ${port}...`);
});

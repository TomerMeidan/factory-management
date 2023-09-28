// This is the main entry point of the Factory Management backend

// NPM Imports
require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const db = require('./configs/db')
const app = express();
const cors = require('cors');

// Routers imports
const loginRouter = require("./Routers/loginRouter");
const welcomeRouter = require("./Routers/welcomeRouter");
const employeesRouter = require("./Routers/employeesRouter")

// Static variables
const port = 3000;
const connectionString = "mongodb://127.0.0.1:27017/factory-users"

// Database Connection
db.connectDB(connectionString);

// Middlewares
app.use(express.json());
app.use(cors());

const authenticateToken = (req, res, next) => {
  // Middleware to authenticate the token on user actions
  // Token header ['authorization' Bearer TOKEN]

  const authHeader = req.headers["authorization"];
  // if user authorized, then authHeader != undefined
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) 
    return res.sendStatus(401);

  // Verify the token is still valid or if tampered
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routers
// Login Router
app.use('/login', loginRouter);

// TODO Create Welcome Page Router
app.use('/welcome', authenticateToken, welcomeRouter);

// TODO Create Employees page router
// TODO add authenticateToken later
app.use('/employees', employeesRouter);



// Server Connection
app.listen(port, () => {
  console.log(`Factory Management Server is listening on port ${port}...`);
});

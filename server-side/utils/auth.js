const express = require("express");
const session = require("express-session");
const app = express();

// Middleware : isAuth middleware verifies and clears only logged-in users
const isAuth = (req, res, next) => {
    if (req.session.isAuth) next();
    else res.render("login.html");
  };

module.exports = isAuth
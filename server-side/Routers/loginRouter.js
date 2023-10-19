// Imports
const express = require("express");
const loginBLL = require("../BLL/loginBLL");
const loginRouter = express.Router();
const session = require("express-session");

// Entry Point: localhost:PORT/login

loginRouter.post("/", async (req, res) => {
  const { email, username } = req.body;
  const user = await loginBLL.checkUserCredentials(username, email);
  if (!user) return res.json({ status: "No Auth" });
  console.log(`User id ${user.id} is now logged in with session id ${req.sessionID}`);

  req.session.user = user;
  req.session.isAuth = true;
  req.session.maxActions = user.numOfActions;
  req.session.currentActions = user.currentActions;

  res.json(user);
});

loginRouter.get("/", (req, res) => {
  if (res.session.isAuth) res.render("welcome.html");
  else res.render("login.html");
});


module.exports = loginRouter;

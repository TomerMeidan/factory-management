

// Imports
const express = require("express");
const loginBLL = require("../BLL/loginBLL");
const loginRouter = express.Router();
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);

// Entry Point: localhost:PORT/login

loginRouter.post('/', async (req,res) => {
    const {email, username} = req.body
    const user = await loginBLL.checkUserCredentials(username, email)
    if(!user) return res.json({status: "No Auth"})
    console.log(`Requesting user ${req.sessionID}`)
    req.session.user = user
    req.session.isAuth = true
    res.json(user)
})

loginRouter.get('/logout', (req,res)=> {
    req.session.destroy()
    res.render('login.html')
})


module.exports = loginRouter;
